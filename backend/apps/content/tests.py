"""Tests for the seed command and the translation fallback helpers."""
import json
import tempfile
from io import StringIO
from pathlib import Path

from django.conf import settings
from django.core.management import call_command
from django.core.management.base import CommandError
from django.test import TestCase

from apps.careers.models import CareerBenefit, JobOpening
from apps.content.bundle import build_site_bundle
from apps.content.models import Leader, NavItem, Section, Service, Stat
from apps.core.models import SiteImage, SiteSettings
from apps.leads.models import ProjectType
from apps.projects.models import Project, ProjectCategory

SEED_FILE = Path(settings.BASE_DIR) / "seed" / "site-data.json"


class TranslationFallbackTests(TestCase):
    def test_tr_falls_back_to_the_other_language(self):
        service = Service(title_en="Water Networks")
        self.assertEqual(service.tr("title", "en"), "Water Networks")
        self.assertEqual(service.tr("title", "ar"), "Water Networks")

    def test_tr_prefers_the_requested_language(self):
        service = Service(title_ar="شبكات المياه", title_en="Water Networks")
        self.assertEqual(service.tr("title", "ar"), "شبكات المياه")

    def test_tr_list_splits_on_newlines_and_drops_blanks(self):
        service = Service(capabilities_en="Main lines\n\n  Pumping stations  \n")
        self.assertEqual(service.tr_list("capabilities", "en"), ["Main lines", "Pumping stations"])

    def test_unknown_language_is_rejected(self):
        with self.assertRaises(ValueError):
            Service(title_en="x").tr("title", "fr")


class SeedContentCommandTests(TestCase):
    """Runs against the real seed file, so a change to the site copy that breaks
    the importer fails here rather than in production."""

    @classmethod
    def setUpTestData(cls):
        call_command("seed_content", verbosity=0)

    def test_seed_file_is_present(self):
        self.assertTrue(SEED_FILE.exists(), f"missing seed file at {SEED_FILE}")

    def test_company_details_are_imported(self):
        row = SiteSettings.load()
        self.assertEqual(row.phone, "+966 14 848 4014")
        self.assertEqual(row.commercial_registration, "4650242007")
        self.assertTrue(row.brand_line_ar)
        self.assertTrue(row.brand_line_en)

    def test_all_content_rows_are_imported(self):
        data = json.loads(SEED_FILE.read_text(encoding="utf-8"))
        self.assertEqual(NavItem.objects.count(), len(data["en"]["nav"]))
        self.assertEqual(Stat.objects.count(), len(data["en"]["stats"]))
        self.assertEqual(Service.objects.count(), len(data["en"]["services"]["items"]))
        self.assertEqual(Project.objects.count(), len(data["en"]["projects"]["items"]))
        self.assertEqual(Leader.objects.count(), len(data["en"]["leadership"]["leaders"]))
        self.assertEqual(ProjectType.objects.count(), len(data["en"]["contact"]["types"]))
        self.assertEqual(JobOpening.objects.count(), len(data["en"]["careers"]["roles"]))
        self.assertEqual(CareerBenefit.objects.count(), len(data["en"]["careers"]["why"]))
        # The 'all' chip is rendered by the frontend and is not stored.
        self.assertEqual(
            ProjectCategory.objects.count(), len(data["en"]["projects"]["categories"]) - 1
        )
        self.assertEqual(Section.objects.count(), len(Section.Key.choices))

    def test_both_languages_are_populated(self):
        for service in Service.objects.all():
            self.assertTrue(service.title_ar, "Arabic service title missing")
            self.assertTrue(service.title_en, "English service title missing")

    def test_project_status_labels_are_mapped_to_choices(self):
        statuses = set(Project.objects.values_list("status", flat=True))
        self.assertTrue(statuses <= set(Project.Status.values), statuses)
        self.assertIn(Project.Status.IN_PROGRESS, statuses)

    def test_images_are_imported_into_slots(self):
        self.assertTrue(SiteImage.objects.filter(slot=SiteImage.Slot.HERO).exists())
        self.assertEqual(SiteImage.objects.filter(slot=SiteImage.Slot.PROJECT).count(), 6)

    def test_running_twice_does_not_duplicate_rows(self):
        before = {
            "services": Service.objects.count(),
            "projects": Project.objects.count(),
            "openings": JobOpening.objects.count(),
            "sections": Section.objects.count(),
        }
        call_command("seed_content", verbosity=0)
        self.assertEqual(Service.objects.count(), before["services"])
        self.assertEqual(Project.objects.count(), before["projects"])
        self.assertEqual(JobOpening.objects.count(), before["openings"])
        self.assertEqual(Section.objects.count(), before["sections"])

    def test_seeded_bundle_reproduces_the_original_payload(self):
        """The API must return what ``site-data.js`` contained, key for key."""
        original = json.loads(SEED_FILE.read_text(encoding="utf-8"))
        bundle = build_site_bundle()

        self.assertEqual(bundle["company"], original["company"])
        for lang in ("ar", "en"):
            source, built = original[lang], bundle[lang]
            self.assertEqual(built["brandLine"], source["brandLine"])
            self.assertEqual(built["hero"], source["hero"])
            self.assertEqual(built["stats"], source["stats"])
            self.assertEqual(built["intro"], source["intro"])
            self.assertEqual(built["why"], source["why"])
            self.assertEqual(built["services"]["items"], source["services"]["items"])
            self.assertEqual(built["equipment"]["categories"], source["equipment"]["categories"])
            self.assertEqual(built["equipment"]["features"], source["equipment"]["features"])
            self.assertEqual(built["certifications"]["iso"], source["certifications"]["iso"])
            self.assertEqual(built["certifications"]["approvals"], source["certifications"]["approvals"])
            self.assertEqual(built["journey"]["milestones"], source["journey"]["milestones"])
            self.assertEqual(built["journey"]["values"], source["journey"]["values"])
            self.assertEqual(built["contact"]["types"], source["contact"]["types"])
            self.assertEqual(built["contact"]["hours"], source["contact"]["hours"])
            self.assertEqual(built["footer"]["certs"], source["footer"]["certs"])
            self.assertEqual(built["nav"], source["nav"])


class CheckTranslationsCommandTests(TestCase):
    """The seeded content must be complete in both languages — this is the
    guard that keeps Arabic from silently rotting after launch."""

    def test_seeded_content_is_fully_bilingual(self):
        call_command("seed_content", verbosity=0)
        out = StringIO()
        # --fail-on-missing raises CommandError if anything is untranslated.
        call_command("check_translations", "--fail-on-missing", stdout=out)
        self.assertIn("present in both languages", out.getvalue())

    def test_missing_translation_is_reported(self):
        call_command("seed_content", verbosity=0)
        service = Service.objects.first()
        service.title_ar = ""
        service.save(update_fields=["title_ar"])

        out = StringIO()
        with self.assertRaises(CommandError):
            call_command("check_translations", "--lang", "ar", "--fail-on-missing", stdout=out)
        self.assertIn("missing Arabic", out.getvalue())


class ExportSiteDataCommandTests(TestCase):
    """The static frontend keeps loading site-data.js, so the export has to stay
    shape-compatible with the file the page already parses."""

    @classmethod
    def setUpTestData(cls):
        call_command("seed_content", verbosity=0)

    def test_export_writes_the_window_assignment(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / "site-data.js"
            call_command("export_site_data", "--output", str(target), verbosity=0)

            content = target.read_text(encoding="utf-8")
            self.assertTrue(content.lstrip().startswith("/*"))
            self.assertIn("window.SACC_SITE = {", content)
            self.assertTrue(content.rstrip().endswith("};"))

    def test_exported_payload_matches_the_api_bundle(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / "site-data.json"
            call_command("export_site_data", "--output", str(target), "--json", verbosity=0)
            exported = json.loads(target.read_text(encoding="utf-8"))

        self.assertEqual(exported, build_site_bundle())
        self.assertEqual(exported["company"]["email"], "info@saccgroup.net")
        self.assertEqual(exported["ar"]["dir"], "rtl")
        self.assertEqual(exported["en"]["dir"], "ltr")

    def test_check_mode_detects_a_stale_file(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / "site-data.js"
            call_command("export_site_data", "--output", str(target), verbosity=0)

            # Up to date: passes.
            call_command("export_site_data", "--output", str(target), "--check", verbosity=0)

            # Content edited in the admin but never re-exported: fails.
            Service.objects.filter(order=0).update(title_en="Renamed service")
            with self.assertRaises(SystemExit):
                call_command("export_site_data", "--output", str(target), "--check", verbosity=0)
