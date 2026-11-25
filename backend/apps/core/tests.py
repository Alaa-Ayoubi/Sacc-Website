"""Tests for the aggregated site bundle."""
from django.core.cache import cache
from django.test import TestCase
from django.urls import reverse

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


class SiteBundleTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        settings_row = SiteSettings.load()
        settings_row.phone = "+966 14 848 4014"
        settings_row.email = "info@saccgroup.net"
        settings_row.commercial_registration = "4650242007"
        settings_row.brand_line_ar = "شركة سنا الأوائل للمقاولات"
        settings_row.brand_line_en = "Sana Al-Awael Contracting"
        settings_row.address_ar = "المدينة المنورة"
        settings_row.address_en = "Al Madinah"
        settings_row.tagline_en = "Building the future."
        settings_row.rights_en = "All rights reserved."
        settings_row.logo_url = "./assets/logo-full.webp"
        settings_row.save()

        hero = HeroSection.load()
        hero.title_ar = "صناعة المستقبل"
        hero.title_en = "Building the future"
        hero.lead_en = "Integrated infrastructure solutions."
        hero.save()

        SiteImage.objects.create(slot=SiteImage.Slot.HERO, external_url="/hero.jpg")
        SiteImage.objects.create(slot=SiteImage.Slot.PROJECT, external_url="/p1.jpg", order=0)

        NavItem.objects.create(anchor="services", label_ar="الخدمات", label_en="Services")
        Stat.objects.create(value="2007", label_ar="سنة التأسيس", label_en="Founded")

        Section.objects.create(
            key=Section.Key.WHY,
            title_en="Why SACC",
            list_en="ISO certified\nNWC approved",
            list_ar="حاصلون على شهادات\nمقاول معتمد",
        )
        Section.objects.create(
            key=Section.Key.EQUIPMENT,
            title_en="Fleet",
            list_heading_en="Equipment Categories",
            list_en="Excavators\nBulldozers",
        )
        Section.objects.create(
            key=Section.Key.LEADERSHIP, title_en="Leadership", callout_body_en="A quote."
        )
        Section.objects.create(
            key=Section.Key.CONTACT,
            title_en="Request a Quote",
            list_heading_en="Business Hours",
            list_en="Sun-Thu 08:00-17:00\nFri-Sat closed",
        )
        Section.objects.create(
            key=Section.Key.FOOTER, list_heading_en="Certifications", list_en="ISO 9001"
        )

        Service.objects.create(
            icon="Droplets",
            title_en="Water Networks",
            description_en="Design and installation.",
            capabilities_en="Main lines\nPumping stations",
        )
        EquipmentFeature.objects.create(icon="Wrench", title_en="Preventive maintenance")
        Certification.objects.create(title_en="ISO 9001:2015", description_en="Quality")
        Milestone.objects.create(year_en="2007", title_en="Founded")
        CoreValue.objects.create(title_en="Integrity")
        Leader.objects.create(
            name_en="Eng. Wasef Zeitoun",
            title_en="Chairman",
            expertise_en="Strategy\nGovernance",
        )

        category = ProjectCategory.objects.create(key="water", label_ar="المياه", label_en="Water")
        Project.objects.create(
            category=category,
            title_en="ISTP3 Outfall",
            title_ar="خط التصريف",
            client_en="National Water Company",
            location_en="Al Madinah",
            scope_en="Deep excavation\nPipe installation",
            status=Project.Status.COMPLETED,
        )

        ProjectType.objects.create(key="water", label_ar="شبكات المياه", label_en="Water networks")
        CareerBenefit.objects.create(icon="Layers", title_en="National projects")
        JobOpening.objects.create(slug="civil-engineer", title_en="Civil Engineer")

    def setUp(self):
        cache.clear()

    def test_bundle_matches_the_frontend_payload_shape(self):
        response = self.client.get(reverse("v1:site-bundle"))
        self.assertEqual(response.status_code, 200)
        payload = response.json()

        self.assertEqual(set(payload) >= {"company", "images", "ar", "en"}, True)
        for lang in ("ar", "en"):
            block = payload[lang]
            for key in (
                "dir", "langBtn", "brandLine", "nav", "hero", "stats", "intro", "why",
                "services", "projects", "equipment", "certifications", "journey",
                "leadership", "contact", "careers", "footer",
            ):
                self.assertIn(key, block, f"{lang}.{key} missing from the bundle")

    def test_company_and_images_are_populated(self):
        payload = self.client.get(reverse("v1:site-bundle")).json()
        self.assertEqual(payload["company"]["cr"], "4650242007")
        self.assertEqual(payload["company"]["logo"], "./assets/logo-full.webp")
        self.assertEqual(payload["images"]["hero"], "/hero.jpg")
        self.assertEqual(payload["images"]["projects"], ["/p1.jpg"])

    def test_bullet_lists_are_split_into_arrays(self):
        payload = self.client.get(reverse("v1:site-bundle")).json()
        self.assertEqual(payload["en"]["why"]["items"], ["ISO certified", "NWC approved"])
        self.assertEqual(payload["en"]["equipment"]["categories"], ["Excavators", "Bulldozers"])
        self.assertEqual(payload["en"]["services"]["items"][0]["capabilities"],
                         ["Main lines", "Pumping stations"])
        self.assertEqual(payload["en"]["footer"]["certs"], ["ISO 9001"])
        self.assertEqual(len(payload["en"]["contact"]["hours"]), 2)

    def test_projects_include_an_all_chip_and_localized_status(self):
        payload = self.client.get(reverse("v1:site-bundle")).json()
        categories = payload["en"]["projects"]["categories"]
        self.assertEqual(categories[0]["key"], "all")
        self.assertEqual([c["key"] for c in categories[1:]], ["water"])

        item = payload["en"]["projects"]["items"][0]
        self.assertEqual(item["key"], "water")
        self.assertEqual(item["status"], "Completed")
        self.assertEqual(item["scope"], ["Deep excavation", "Pipe installation"])
        self.assertEqual(payload["ar"]["projects"]["items"][0]["status"], "مكتمل")

    def test_missing_translation_falls_back_to_the_other_language(self):
        payload = self.client.get(reverse("v1:site-bundle")).json()
        # Only the English tagline was set, so Arabic falls back rather than
        # rendering an empty footer.
        self.assertEqual(payload["ar"]["footer"]["tagline"], "Building the future.")
        self.assertEqual(payload["ar"]["hero"]["title"], "صناعة المستقبل")

    def test_unpublished_content_is_excluded(self):
        Service.objects.update(is_published=False)
        cache.clear()
        payload = self.client.get(reverse("v1:site-bundle")).json()
        self.assertEqual(payload["en"]["services"]["items"], [])

    def test_health_endpoint_reports_database_status(self):
        response = self.client.get(reverse("v1:health"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok", "database": "ok"})

    def test_single_language_can_be_requested(self):
        response = self.client.get(reverse("v1:site-bundle"), {"lang": "ar"})
        payload = response.json()

        self.assertEqual(set(payload), {"company", "images", "ar"})
        self.assertEqual(payload["ar"]["dir"], "rtl")
        self.assertEqual(payload["ar"]["langBtn"], "EN")

    def test_english_is_right_to_left_free(self):
        payload = self.client.get(reverse("v1:site-bundle"), {"lang": "en"}).json()
        self.assertEqual(set(payload), {"company", "images", "en"})
        self.assertEqual(payload["en"]["dir"], "ltr")

    def test_unknown_language_returns_both(self):
        payload = self.client.get(reverse("v1:site-bundle"), {"lang": "fr"}).json()
        self.assertIn("ar", payload)
        self.assertIn("en", payload)


class IndexPageTests(TestCase):
    """Opening the service in a browser must explain what it is, not 404."""

    def test_root_serves_an_index_page(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "SACC Backend")
        self.assertContains(response, "not the public website")

    def test_index_links_to_the_admin_and_the_api(self):
        response = self.client.get("/")
        self.assertContains(response, reverse("admin:index"))
        self.assertContains(response, reverse("v1:site-bundle"))
        self.assertContains(response, reverse("v1:health"))

    def test_index_is_not_indexable(self):
        # An internal service should not turn up in search results.
        self.assertContains(self.client.get("/"), "noindex")


class PublishOnContentChangeTests(TestCase):
    """A content change drops the cached bundle and asks for a site rebuild."""

    HOOK = "https://api.render.com/deploy/srv-test?key=test"

    def setUp(self):
        from django.core.cache import cache

        cache.clear()

    def _change(self, action):
        from unittest import mock

        with self.settings(RENDER_DEPLOY_HOOK_URL=self.HOOK), \
                mock.patch("apps.core.publish.threading.Thread") as thread, \
                self.captureOnCommitCallbacks(execute=True):
            action()
        return thread

    def test_a_content_edit_rebuilds_the_site_and_drops_the_cache(self):
        from django.core.cache import cache

        from apps.content.models import Stat

        cache.set("site-bundle:all", {"stale": True})
        thread = self._change(lambda: Stat.objects.create(value="2007", label_ar="تأسست", label_en="Founded"))
        thread.assert_called_once()
        self.assertEqual(thread.call_args.kwargs["args"], (self.HOOK,))
        self.assertIsNone(cache.get("site-bundle:all"))

    def test_a_deletion_rebuilds_the_site_too(self):
        from apps.content.models import Stat

        stat = Stat.objects.create(value="1", label_ar="أ", label_en="a")
        thread = self._change(stat.delete)
        thread.assert_called_once()

    def test_an_enquiry_never_rebuilds_the_site(self):
        from apps.leads.models import QuoteRequest

        thread = self._change(lambda: QuoteRequest.objects.create(
            full_name="n", company="c", email="e@example.com", phone="1", message="message text"))
        thread.assert_not_called()

    def test_without_a_hook_nothing_is_called(self):
        from unittest import mock

        from apps.content.models import Stat

        with self.settings(RENDER_DEPLOY_HOOK_URL=""), \
                mock.patch("apps.core.publish.threading.Thread") as thread, \
                self.captureOnCommitCallbacks(execute=True):
            Stat.objects.create(value="1", label_ar="أ", label_en="a")
        thread.assert_not_called()

    def test_the_bundle_is_served_from_the_cache_until_content_changes(self):
        from django.core.cache import cache

        self.client.get("/api/v1/site/")
        self.assertIsNotNone(cache.get("site-bundle:all"))
        self.client.get("/api/v1/site/?lang=ar")
        self.assertIn("ar", cache.get("site-bundle:ar"))
        self.assertNotIn("en", cache.get("site-bundle:ar"))


class PingTests(TestCase):
    def test_ping_answers_without_touching_the_database(self):
        with self.assertNumQueries(0):
            response = self.client.get("/api/v1/ping/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "awake"})


class EmailSettingsTests(TestCase):
    def test_a_silent_mail_server_cannot_hold_a_form_for_long(self):
        from django.conf import settings
        from django.core.mail import get_connection

        self.assertEqual(settings.EMAIL_TIMEOUT, 10)
        connection = get_connection("django.core.mail.backends.smtp.EmailBackend")
        self.assertEqual(connection.timeout, 10)

    def test_mail_comes_from_the_company_domain(self):
        from django.conf import settings

        self.assertIn("@saccgroup.net", settings.DEFAULT_FROM_EMAIL)


class AdminLoginLockoutTests(TestCase):
    """Password guessing against the public admin is cut off."""

    def setUp(self):
        from django.contrib.auth import get_user_model

        get_user_model().objects.create_superuser("owner", "owner@example.com", "Right-Pass-123")

    def _login(self, password, ip="203.0.113.9"):
        return self.client.post(
            "/admin/login/?next=/admin/",
            {"username": "owner", "password": password},
            HTTP_CF_CONNECTING_IP=ip,
        )

    def test_five_failures_lock_the_address_out_even_with_the_right_password(self):
        for _ in range(5):
            self._login("wrong")
        locked = self._login("Right-Pass-123")
        self.assertEqual(locked.status_code, 429)
        self.assertNotIn("_auth_user_id", self.client.session)

    def test_another_address_is_not_locked(self):
        for _ in range(5):
            self._login("wrong")
        ok = self._login("Right-Pass-123", ip="198.51.100.4")
        self.assertEqual(ok.status_code, 302)

    def test_a_forged_forwarded_for_header_does_not_reset_the_count(self):
        for i in range(5):
            self.client.post(
                "/admin/login/?next=/admin/",
                {"username": "owner", "password": "wrong"},
                HTTP_X_FORWARDED_FOR=f"10.0.0.{i}, 203.0.113.50",
            )
        locked = self.client.post(
            "/admin/login/?next=/admin/",
            {"username": "owner", "password": "Right-Pass-123"},
            HTTP_X_FORWARDED_FOR="10.9.9.9, 203.0.113.50",
        )
        self.assertEqual(locked.status_code, 429)
