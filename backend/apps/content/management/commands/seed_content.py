"""Load the site's existing copy into PostgreSQL.

Reads ``backend/seed/site-data.json`` — the JSON form of the ``site-data.js``
the static build shipped with — and writes it across the content models. The
Arabic and English trees are structurally identical, so paired lists are zipped
by position.

Idempotent: every row is matched on a stable key (an anchor, a slug, or its
position in the list), so re-running updates in place rather than duplicating.
Existing rows are updated, not wiped, so editorial changes made in the admin to
rows that are still present are overwritten only for the fields this file owns.
"""
import json
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils.text import slugify

from apps.careers.models import CareerBenefit, JobOpening
from apps.content.models import (
    Certification,
    CoreValue,
    EquipmentFeature,
    HeroSection,
    Leader,
    Milestone,
    NavItem,
    Section,
    Service,
    Stat,
)
from apps.core.models import SiteImage, SiteSettings
from apps.leads.models import ProjectType
from apps.projects.models import Project, ProjectCategory

DEFAULT_SEED = Path(settings.BASE_DIR) / "seed" / "site-data.json"

# The seeded status strings, mapped back onto the model's choices.
STATUS_BY_LABEL = {
    "مكتمل": Project.Status.COMPLETED,
    "Completed": Project.Status.COMPLETED,
    "قيد التنفيذ": Project.Status.IN_PROGRESS,
    "In Progress": Project.Status.IN_PROGRESS,
}


def joined(values) -> str:
    """Render a JSON list as the one-item-per-line text the models store."""
    return "\n".join(values or [])


class Command(BaseCommand):
    help = "Populate the database with the site's bilingual content from seed/site-data.json."

    def add_arguments(self, parser):
        parser.add_argument(
            "--path",
            default=str(DEFAULT_SEED),
            help="Path to the seed JSON file.",
        )
        parser.add_argument(
            "--flush",
            action="store_true",
            help="Delete existing content rows first. Submitted leads and applications are never touched.",
        )

    def handle(self, *args, **options):
        path = Path(options["path"])
        if not path.exists():
            raise CommandError(f"Seed file not found: {path}")

        data = json.loads(path.read_text(encoding="utf-8"))
        for key in ("company", "images", "ar", "en"):
            if key not in data:
                raise CommandError(f"Seed file is missing the '{key}' block.")

        with transaction.atomic():
            if options["flush"]:
                self._flush()
            counts = self._seed(data)

        self.stdout.write(self.style.SUCCESS("Content seeded:"))
        for label, count in counts.items():
            self.stdout.write(f"  {label:<22} {count}")

    def _flush(self):
        # Content only — QuoteRequest and JobApplication hold real submissions.
        for model in (
            Project,
            ProjectCategory,
            Service,
            EquipmentFeature,
            Certification,
            Milestone,
            CoreValue,
            Leader,
            Stat,
            NavItem,
            CareerBenefit,
            ProjectType,
            SiteImage,
            Section,
        ):
            model.objects.all().delete()
        JobOpening.objects.filter(applications__isnull=True).delete()
        self.stdout.write(self.style.WARNING("Existing content rows deleted."))

    def _seed(self, data) -> dict:
        ar, en = data["ar"], data["en"]
        counts = {}

        self._seed_settings(data, ar, en)
        counts["site images"] = self._seed_images(data["images"])
        counts["navigation items"] = self._seed_nav(ar["nav"], en["nav"])
        self._seed_hero(ar["hero"], en["hero"])
        counts["headline stats"] = self._seed_stats(ar["stats"], en["stats"])
        counts["sections"] = self._seed_sections(ar, en)
        counts["services"] = self._seed_services(ar["services"]["items"], en["services"]["items"])
        counts["project categories"], counts["projects"] = self._seed_projects(
            ar["projects"], en["projects"], data["images"].get("projects", [])
        )
        counts["equipment features"] = self._seed_equipment_features(
            ar["equipment"]["features"], en["equipment"]["features"]
        )
        counts["certifications"] = self._seed_certifications(
            ar["certifications"]["iso"], en["certifications"]["iso"]
        )
        counts["milestones"] = self._seed_milestones(
            ar["journey"]["milestones"], en["journey"]["milestones"]
        )
        counts["core values"] = self._seed_values(ar["journey"]["values"], en["journey"]["values"])
        counts["leaders"] = self._seed_leaders(
            ar["leadership"]["leaders"], en["leadership"]["leaders"], data["images"]
        )
        counts["project types"] = self._seed_project_types(
            ar["contact"]["types"], en["contact"]["types"]
        )
        counts["career benefits"] = self._seed_career_benefits(
            ar["careers"]["why"], en["careers"]["why"]
        )
        counts["job openings"] = self._seed_openings(ar["careers"]["roles"], en["careers"]["roles"])
        return counts

    # --- individual blocks -------------------------------------------------

    def _seed_settings(self, data, ar, en):
        company = data["company"]
        row = SiteSettings.load()
        row.phone = company.get("phone", "")
        row.mobile = company.get("mobile", "")
        row.email = company.get("email", "")
        row.commercial_registration = company.get("cr", "")
        row.logo_url = company.get("logo", "")
        row.logo_mark_url = company.get("mark", "")
        row.brand_line_ar = ar.get("brandLine", "")
        row.brand_line_en = en.get("brandLine", "")
        row.address_ar = ar["contact"].get("address", "")
        row.address_en = en["contact"].get("address", "")
        row.tagline_ar = ar["footer"].get("tagline", "")
        row.tagline_en = en["footer"].get("tagline", "")
        row.rights_ar = ar["footer"].get("rights", "")
        row.rights_en = en["footer"].get("rights", "")
        row.save()

    def _seed_images(self, images) -> int:
        count = 0
        singles = {
            "hero": SiteImage.Slot.HERO,
            "equipment": SiteImage.Slot.EQUIPMENT,
            "water": SiteImage.Slot.WATER,
            "urban": SiteImage.Slot.URBAN,
            "careers": SiteImage.Slot.CAREERS,
            "chairman": SiteImage.Slot.CHAIRMAN,
            "gm": SiteImage.Slot.GM,
        }
        for key, slot in singles.items():
            url = images.get(key)
            if not url:
                continue
            SiteImage.objects.update_or_create(
                slot=slot, order=0, defaults={"external_url": url}
            )
            count += 1
        for index, url in enumerate(images.get("projects", [])):
            SiteImage.objects.update_or_create(
                slot=SiteImage.Slot.PROJECT, order=index, defaults={"external_url": url}
            )
            count += 1
        return count

    def _seed_nav(self, ar_items, en_items) -> int:
        for index, (a, e) in enumerate(zip(ar_items, en_items)):
            NavItem.objects.update_or_create(
                anchor=a["id"],
                defaults={"label_ar": a["label"], "label_en": e["label"], "order": index},
            )
        return len(ar_items)

    def _seed_hero(self, ar_hero, en_hero):
        hero = HeroSection.load()
        hero.badge_ar, hero.badge_en = ar_hero["badge"], en_hero["badge"]
        hero.title_ar, hero.title_en = ar_hero["title"], en_hero["title"]
        hero.lead_ar, hero.lead_en = ar_hero["lead"], en_hero["lead"]
        hero.cta_primary_ar, hero.cta_primary_en = ar_hero["cta1"], en_hero["cta1"]
        hero.cta_secondary_ar, hero.cta_secondary_en = ar_hero["cta2"], en_hero["cta2"]
        hero.scroll_hint_ar, hero.scroll_hint_en = ar_hero["scroll"], en_hero["scroll"]
        hero.save()

    def _seed_stats(self, ar_stats, en_stats) -> int:
        for index, (a, e) in enumerate(zip(ar_stats, en_stats)):
            Stat.objects.update_or_create(
                order=index,
                defaults={"value": a["value"], "label_ar": a["label"], "label_en": e["label"]},
            )
        return len(ar_stats)

    def _seed_sections(self, ar, en) -> int:
        def upsert(key, **fields):
            Section.objects.update_or_create(key=key, defaults=fields)

        upsert(
            Section.Key.INTRO,
            eyebrow_ar=ar["intro"]["eyebrow"], eyebrow_en=en["intro"]["eyebrow"],
            title_ar=ar["intro"]["title"], title_en=en["intro"]["title"],
            body_1_ar=ar["intro"]["p1"], body_1_en=en["intro"]["p1"],
            body_2_ar=ar["intro"]["p2"], body_2_en=en["intro"]["p2"],
            body_3_ar=ar["intro"]["p3"], body_3_en=en["intro"]["p3"],
        )
        upsert(
            Section.Key.WHY,
            title_ar=ar["why"]["title"], title_en=en["why"]["title"],
            lead_ar=ar["why"]["lead"], lead_en=en["why"]["lead"],
            list_ar=joined(ar["why"]["items"]), list_en=joined(en["why"]["items"]),
        )
        upsert(
            Section.Key.SERVICES,
            eyebrow_ar=ar["services"]["eyebrow"], eyebrow_en=en["services"]["eyebrow"],
            title_ar=ar["services"]["title"], title_en=en["services"]["title"],
            lead_ar=ar["services"]["lead"], lead_en=en["services"]["lead"],
        )
        upsert(
            Section.Key.PROJECTS,
            eyebrow_ar=ar["projects"]["eyebrow"], eyebrow_en=en["projects"]["eyebrow"],
            title_ar=ar["projects"]["title"], title_en=en["projects"]["title"],
            lead_ar=ar["projects"]["lead"], lead_en=en["projects"]["lead"],
        )
        upsert(
            Section.Key.EQUIPMENT,
            eyebrow_ar=ar["equipment"]["eyebrow"], eyebrow_en=en["equipment"]["eyebrow"],
            title_ar=ar["equipment"]["title"], title_en=en["equipment"]["title"],
            lead_ar=ar["equipment"]["lead"], lead_en=en["equipment"]["lead"],
            body_1_ar=ar["equipment"]["p1"], body_1_en=en["equipment"]["p1"],
            body_2_ar=ar["equipment"]["p2"], body_2_en=en["equipment"]["p2"],
            cta_ar=ar["equipment"]["cta"], cta_en=en["equipment"]["cta"],
            list_heading_ar=ar["equipment"]["categoriesHeading"],
            list_heading_en=en["equipment"]["categoriesHeading"],
            list_ar=joined(ar["equipment"]["categories"]),
            list_en=joined(en["equipment"]["categories"]),
        )
        upsert(
            Section.Key.CERTIFICATIONS,
            eyebrow_ar=ar["certifications"]["eyebrow"], eyebrow_en=en["certifications"]["eyebrow"],
            title_ar=ar["certifications"]["title"], title_en=en["certifications"]["title"],
            lead_ar=ar["certifications"]["lead"], lead_en=en["certifications"]["lead"],
            callout_title_ar=ar["certifications"]["commitmentTitle"],
            callout_title_en=en["certifications"]["commitmentTitle"],
            callout_body_ar=ar["certifications"]["commitmentBody"],
            callout_body_en=en["certifications"]["commitmentBody"],
            list_heading_ar=ar["certifications"]["approvalsHeading"],
            list_heading_en=en["certifications"]["approvalsHeading"],
            list_ar=joined(ar["certifications"]["approvals"]),
            list_en=joined(en["certifications"]["approvals"]),
            cta_ar=ar["certifications"]["cta"], cta_en=en["certifications"]["cta"],
        )
        upsert(
            Section.Key.JOURNEY,
            eyebrow_ar=ar["journey"]["eyebrow"], eyebrow_en=en["journey"]["eyebrow"],
            title_ar=ar["journey"]["title"], title_en=en["journey"]["title"],
            lead_ar=ar["journey"]["lead"], lead_en=en["journey"]["lead"],
        )
        upsert(
            Section.Key.LEADERSHIP,
            eyebrow_ar=ar["leadership"]["eyebrow"], eyebrow_en=en["leadership"]["eyebrow"],
            title_ar=ar["leadership"]["title"], title_en=en["leadership"]["title"],
            lead_ar=ar["leadership"]["lead"], lead_en=en["leadership"]["lead"],
            callout_body_ar=ar["leadership"]["quote"], callout_body_en=en["leadership"]["quote"],
        )
        upsert(
            Section.Key.CONTACT,
            eyebrow_ar=ar["contact"]["eyebrow"], eyebrow_en=en["contact"]["eyebrow"],
            title_ar=ar["contact"]["title"], title_en=en["contact"]["title"],
            lead_ar=ar["contact"]["lead"], lead_en=en["contact"]["lead"],
            list_heading_ar=ar["contact"]["hoursHeading"],
            list_heading_en=en["contact"]["hoursHeading"],
            list_ar=joined(ar["contact"]["hours"]), list_en=joined(en["contact"]["hours"]),
        )
        upsert(
            Section.Key.CAREERS,
            eyebrow_ar=ar["careers"]["badge"], eyebrow_en=en["careers"]["badge"],
            title_ar=ar["careers"]["title"], title_en=en["careers"]["title"],
            lead_ar=ar["careers"]["lead"], lead_en=en["careers"]["lead"],
            cta_ar=ar["careers"]["cta"], cta_en=en["careers"]["cta"],
        )
        upsert(
            Section.Key.FOOTER,
            list_heading_ar=ar["footer"]["certsHeading"],
            list_heading_en=en["footer"]["certsHeading"],
            list_ar=joined(ar["footer"]["certs"]), list_en=joined(en["footer"]["certs"]),
        )
        return Section.objects.count()

    def _seed_services(self, ar_items, en_items) -> int:
        for index, (a, e) in enumerate(zip(ar_items, en_items)):
            Service.objects.update_or_create(
                order=index,
                defaults={
                    "icon": a.get("icon", ""),
                    "title_ar": a["title"], "title_en": e["title"],
                    "description_ar": a["desc"], "description_en": e["desc"],
                    "capabilities_ar": joined(a.get("capabilities")),
                    "capabilities_en": joined(e.get("capabilities")),
                },
            )
        return len(ar_items)

    def _seed_projects(self, ar_projects, en_projects, project_images) -> tuple[int, int]:
        categories = {}
        order = 0
        for a, e in zip(ar_projects["categories"], en_projects["categories"]):
            if a["key"] == "all":  # rendered by the frontend, not stored
                continue
            category, _ = ProjectCategory.objects.update_or_create(
                key=a["key"],
                defaults={"label_ar": a["label"], "label_en": e["label"], "order": order},
            )
            categories[a["key"]] = category
            order += 1

        for index, (a, e) in enumerate(zip(ar_projects["items"], en_projects["items"])):
            image = project_images[index] if index < len(project_images) else ""
            Project.objects.update_or_create(
                order=index,
                defaults={
                    "category": categories[a["key"]],
                    "status": STATUS_BY_LABEL.get(e["status"], Project.Status.COMPLETED),
                    "title_ar": a["title"], "title_en": e["title"],
                    "location_ar": a["location"], "location_en": e["location"],
                    "client_ar": a["client"], "client_en": e["client"],
                    "description_ar": a["desc"], "description_en": e["desc"],
                    "scope_ar": joined(a.get("scope")), "scope_en": joined(e.get("scope")),
                    "image_url": image,
                },
            )
        return len(categories), len(ar_projects["items"])

    def _seed_equipment_features(self, ar_items, en_items) -> int:
        for index, (a, e) in enumerate(zip(ar_items, en_items)):
            EquipmentFeature.objects.update_or_create(
                order=index,
                defaults={
                    "icon": a.get("icon", ""),
                    "title_ar": a["title"], "title_en": e["title"],
                    "description_ar": a["desc"], "description_en": e["desc"],
                },
            )
        return len(ar_items)

    def _seed_certifications(self, ar_items, en_items) -> int:
        for index, (a, e) in enumerate(zip(ar_items, en_items)):
            Certification.objects.update_or_create(
                order=index,
                defaults={
                    "title_ar": a["title"], "title_en": e["title"],
                    "description_ar": a["desc"], "description_en": e["desc"],
                },
            )
        return len(ar_items)

    def _seed_milestones(self, ar_items, en_items) -> int:
        for index, (a, e) in enumerate(zip(ar_items, en_items)):
            Milestone.objects.update_or_create(
                order=index,
                defaults={
                    "year_ar": a["year"], "year_en": e["year"],
                    "title_ar": a["title"], "title_en": e["title"],
                    "description_ar": a["desc"], "description_en": e["desc"],
                },
            )
        return len(ar_items)

    def _seed_values(self, ar_items, en_items) -> int:
        for index, (a, e) in enumerate(zip(ar_items, en_items)):
            CoreValue.objects.update_or_create(
                order=index,
                defaults={
                    "title_ar": a["title"], "title_en": e["title"],
                    "description_ar": a["desc"], "description_en": e["desc"],
                },
            )
        return len(ar_items)

    def _seed_leaders(self, ar_items, en_items, images) -> int:
        # The first two leaders are the chairman and the general manager, whose
        # portraits are named slots rather than a gallery.
        photos = [images.get("chairman", ""), images.get("gm", "")]
        for index, (a, e) in enumerate(zip(ar_items, en_items)):
            Leader.objects.update_or_create(
                order=index,
                defaults={
                    "name_ar": a["name"], "name_en": e["name"],
                    "title_ar": a["title"], "title_en": e["title"],
                    "bio_ar": a["bio"], "bio_en": e["bio"],
                    "expertise_ar": joined(a.get("expertise")),
                    "expertise_en": joined(e.get("expertise")),
                    "photo_url": photos[index] if index < len(photos) else "",
                },
            )
        return len(ar_items)

    def _seed_project_types(self, ar_types, en_types) -> int:
        for index, (a, e) in enumerate(zip(ar_types, en_types)):
            ProjectType.objects.update_or_create(
                key=slugify(e) or f"type-{index}",
                defaults={"label_ar": a, "label_en": e, "order": index},
            )
        return len(ar_types)

    def _seed_career_benefits(self, ar_items, en_items) -> int:
        for index, (a, e) in enumerate(zip(ar_items, en_items)):
            CareerBenefit.objects.update_or_create(
                order=index,
                defaults={
                    "icon": a.get("icon", ""),
                    "title_ar": a["title"], "title_en": e["title"],
                    "description_ar": a["desc"], "description_en": e["desc"],
                },
            )
        return len(ar_items)

    def _seed_openings(self, ar_roles, en_roles) -> int:
        for index, (a, e) in enumerate(zip(ar_roles, en_roles)):
            JobOpening.objects.update_or_create(
                slug=slugify(e["title"]) or f"role-{index}",
                defaults={
                    "title_ar": a["title"], "title_en": e["title"],
                    "department_ar": a["dept"], "department_en": e["dept"],
                    "location_ar": a["location"], "location_en": e["location"],
                    "employment_type_ar": a["type"], "employment_type_en": e["type"],
                    "experience_ar": a["exp"], "experience_en": e["exp"],
                    "order": index,
                },
            )
        return len(ar_roles)
