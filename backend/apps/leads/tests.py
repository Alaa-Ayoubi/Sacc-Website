"""Tests for the quote-request form endpoint."""
from unittest import mock

from django.conf import settings as django_settings
from django.core import mail
from django.core.cache import cache
from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework.throttling import SimpleRateThrottle

from .models import ProjectType, QuoteRequest


@override_settings(
    LEAD_NOTIFICATION_RECIPIENTS=["sales@saccgroup.net"],
    EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
)
class QuoteRequestTests(TestCase):
    """Runs against the real throttle configuration.

    Overriding REST_FRAMEWORK wholesale would silently drop the custom
    exception handler along with it, so the rates stay as configured and the
    throttle history — which lives in the cache — is reset per test instead.
    """

    @classmethod
    def setUpTestData(cls):
        cls.project_type = ProjectType.objects.create(
            key="water", label_ar="شبكات المياه", label_en="Water networks"
        )
        cls.url = reverse("v1:quote-request-list")

    def setUp(self):
        cache.clear()

    def payload(self, **overrides):
        data = {
            "full_name": "Ahmed Al-Harbi",
            "email": "ahmed@example.com",
            "company": "National Water Company",
            "project_type": "water",
            "message": "We need a quote for a 12 km transmission line in Al Madinah.",
            "locale": "ar",
        }
        data.update(overrides)
        return data

    def test_valid_submission_is_stored_and_notified(self):
        response = self.client.post(self.url, self.payload(), content_type="application/json")

        self.assertEqual(response.status_code, 201)
        self.assertIn("reference", response.json())

        quote = QuoteRequest.objects.get()
        self.assertEqual(quote.company, "National Water Company")
        self.assertEqual(quote.project_type, self.project_type)
        self.assertEqual(quote.status, QuoteRequest.Status.NEW)
        self.assertEqual(len(mail.outbox), 1)
        sent = mail.outbox[0]
        self.assertIn("National Water Company", sent.subject)
        self.assertEqual(sent.to, ["sales@saccgroup.net"])
        # Reply-To carries the enquirer so staff can answer from the inbox,
        # while From stays on a domain the MTA will actually accept.
        self.assertEqual(sent.reply_to, ["ahmed@example.com"])

    def test_short_message_is_rejected(self):
        response = self.client.post(
            self.url, self.payload(message="too short"), content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("message", response.json()["errors"])
        self.assertFalse(QuoteRequest.objects.exists())

    def test_invalid_email_is_rejected(self):
        response = self.client.post(
            self.url, self.payload(email="not-an-email"), content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.json()["errors"])

    def test_project_type_is_optional(self):
        # This is a general contact form: making someone categorise their
        # enquiry before they can send it turns a message into paperwork.
        payload = self.payload()
        payload.pop("project_type")
        response = self.client.post(self.url, payload, content_type="application/json")

        self.assertEqual(response.status_code, 201)
        quote = QuoteRequest.objects.get()
        self.assertIsNone(quote.project_type)
        self.assertEqual(quote.project_type_display, "Unspecified")

    def test_free_text_project_type_is_accepted(self):
        payload = self.payload()
        payload.pop("project_type")
        payload["project_type_other"] = "Marine works"
        response = self.client.post(self.url, payload, content_type="application/json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(QuoteRequest.objects.get().project_type_display, "Marine works")

    def test_honeypot_submission_is_filed_as_spam_without_notifying(self):
        response = self.client.post(
            self.url, self.payload(website="http://spam.example"), content_type="application/json"
        )
        # The sender gets the same 201 they would for a real submission.
        self.assertEqual(response.status_code, 201)
        self.assertEqual(QuoteRequest.objects.get().status, QuoteRequest.Status.SPAM)
        self.assertEqual(len(mail.outbox), 0)

    def test_submission_metadata_is_captured(self):
        self.client.post(
            self.url,
            self.payload(),
            content_type="application/json",
            HTTP_USER_AGENT="Mozilla/5.0",
            # The first entry is whatever the client sent; Render appends the
            # address it really came from, so the last one is recorded.
            HTTP_X_FORWARDED_FOR="10.0.0.1, 203.0.113.7",
        )
        quote = QuoteRequest.objects.get()
        self.assertEqual(quote.ip_address, "203.0.113.7")
        self.assertEqual(quote.user_agent, "Mozilla/5.0")

    def test_quote_requests_cannot_be_listed_publicly(self):
        self.client.post(self.url, self.payload(), content_type="application/json")
        self.assertEqual(self.client.get(self.url).status_code, 405)

    def test_project_types_are_listed_for_the_dropdown(self):
        response = self.client.get(reverse("v1:project-type-list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [
            {"key": "water", "label_ar": "شبكات المياه", "label_en": "Water networks"}
        ])

    def test_configured_rate_is_the_one_actually_enforced(self):
        self.assertEqual(
            SimpleRateThrottle.THROTTLE_RATES["quote_request"],
            django_settings.REST_FRAMEWORK["DEFAULT_THROTTLE_RATES"]["quote_request"],
        )

    def test_repeated_submissions_are_rate_limited(self):
        # DRF binds THROTTLE_RATES to the class at import, so override_settings
        # cannot reach it — the rate has to be patched on the throttle itself.
        # Configured rates still take effect normally at boot; see the test above.
        with mock.patch.dict(SimpleRateThrottle.THROTTLE_RATES, {"quote_request": "2/hour"}):
            cache.clear()
            for _ in range(2):
                self.assertEqual(
                    self.client.post(
                        self.url, self.payload(), content_type="application/json"
                    ).status_code,
                    201,
                )
            blocked = self.client.post(self.url, self.payload(), content_type="application/json")

        self.assertEqual(blocked.status_code, 429)
        self.assertEqual(QuoteRequest.objects.count(), 2)

    def test_a_forged_forwarded_for_header_does_not_open_a_new_bucket(self):
        # Render keeps the client's X-Forwarded-For and appends the real address,
        # so a fresh forged first entry on every request must not reset the count.
        with mock.patch.dict(SimpleRateThrottle.THROTTLE_RATES, {"quote_request": "2/hour"}):
            cache.clear()
            codes = [
                self.client.post(
                    self.url, self.payload(), content_type="application/json",
                    HTTP_X_FORWARDED_FOR=f"10.0.0.{i}, 203.0.113.7",
                ).status_code
                for i in range(3)
            ]
        self.assertEqual(codes, [201, 201, 429])

    def test_the_edge_header_identifies_the_visitor(self):
        # Cloudflare's header wins over anything in X-Forwarded-For.
        with mock.patch.dict(SimpleRateThrottle.THROTTLE_RATES, {"quote_request": "1/hour"}):
            cache.clear()
            first = self.client.post(
                self.url, self.payload(), content_type="application/json",
                HTTP_CF_CONNECTING_IP="198.51.100.1", HTTP_X_FORWARDED_FOR="1.1.1.1",
            )
            other_visitor = self.client.post(
                self.url, self.payload(), content_type="application/json",
                HTTP_CF_CONNECTING_IP="198.51.100.2", HTTP_X_FORWARDED_FOR="1.1.1.1",
            )
            same_visitor = self.client.post(
                self.url, self.payload(), content_type="application/json",
                HTTP_CF_CONNECTING_IP="198.51.100.1", HTTP_X_FORWARDED_FOR="9.9.9.9",
            )
        self.assertEqual([first.status_code, other_visitor.status_code, same_visitor.status_code], [201, 201, 429])
        self.assertEqual(QuoteRequest.objects.order_by("created_at").first().ip_address, "198.51.100.1")
