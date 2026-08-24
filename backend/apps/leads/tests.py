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
    LEAD_NOTIFICATION_RECIPIENTS=["sales@sanasacc.com"],
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
        self.assertEqual(sent.to, ["sales@sanasacc.com"])
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

    def test_project_type_is_required_in_one_form_or_the_other(self):
        payload = self.payload()
        payload.pop("project_type")
        response = self.client.post(self.url, payload, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("project_type", response.json()["errors"])

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
            HTTP_X_FORWARDED_FOR="203.0.113.7, 10.0.0.1",
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
