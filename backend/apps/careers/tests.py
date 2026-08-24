"""Tests for the careers endpoints."""
from django.core import mail
from django.core.cache import cache
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from django.urls import reverse

from .models import JobApplication, JobOpening


@override_settings(
    LEAD_NOTIFICATION_RECIPIENTS=["hr@sanasacc.com"],
    EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
)
class JobApplicationTests(TestCase):
    """Runs against the real throttle configuration; see the note in
    ``apps.leads.tests``."""

    @classmethod
    def setUpTestData(cls):
        cls.opening = JobOpening.objects.create(
            slug="civil-project-engineer",
            title_ar="مهندس مشاريع مدني",
            title_en="Civil Project Engineer",
            department_en="Execution",
            requirements_en="5 years experience\nBSc Civil Engineering",
        )
        cls.url = reverse("v1:job-application-list")

    def setUp(self):
        # Throttle history lives in the cache and would otherwise leak between
        # tests, since the configured limit is only 5 applications per hour.
        cache.clear()

    def payload(self, **overrides):
        data = {
            "full_name": "Sara Al-Otaibi",
            "email": "sara@example.com",
            "phone": "0501234567",
            "years_experience": 6,
            "opening": "civil-project-engineer",
            "cv_link": "https://drive.example.com/cv",
            "locale": "en",
        }
        data.update(overrides)
        return data

    def test_application_with_a_cv_link_is_accepted(self):
        response = self.client.post(self.url, self.payload(), content_type="application/json")

        self.assertEqual(response.status_code, 201)
        application = JobApplication.objects.get()
        self.assertEqual(application.opening, self.opening)
        self.assertEqual(application.status, JobApplication.Status.NEW)
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to, ["hr@sanasacc.com"])
        self.assertEqual(mail.outbox[0].reply_to, ["sara@example.com"])

    def test_application_with_an_uploaded_cv_is_accepted(self):
        upload = SimpleUploadedFile(
            "cv.pdf", b"%PDF-1.4 fake content", content_type="application/pdf"
        )
        payload = self.payload()
        payload.pop("cv_link")
        payload["cv_file"] = upload

        response = self.client.post(self.url, payload)

        self.assertEqual(response.status_code, 201)
        application = JobApplication.objects.get()
        self.assertTrue(application.cv_file.name.endswith(".pdf"))
        # Stored under the unguessable reference, not the uploaded filename.
        self.assertIn(str(application.reference), application.cv_file.name)

    def test_application_without_any_cv_is_rejected(self):
        payload = self.payload()
        payload.pop("cv_link")
        response = self.client.post(self.url, payload, content_type="application/json")

        self.assertEqual(response.status_code, 400)
        self.assertIn("cv_link", response.json()["errors"])
        self.assertFalse(JobApplication.objects.exists())

    def test_general_application_without_an_opening_is_accepted(self):
        payload = self.payload()
        payload.pop("opening")
        payload["role_other"] = "General application"
        response = self.client.post(self.url, payload, content_type="application/json")

        self.assertEqual(response.status_code, 201)
        self.assertEqual(JobApplication.objects.get().role_display, "General application")

    def test_role_is_required_in_one_form_or_the_other(self):
        payload = self.payload()
        payload.pop("opening")
        response = self.client.post(self.url, payload, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("opening", response.json()["errors"])

    def test_oversized_cv_is_rejected(self):
        payload = self.payload()
        payload.pop("cv_link")
        payload["cv_file"] = SimpleUploadedFile(
            "cv.pdf", b"x" * (6 * 1024 * 1024), content_type="application/pdf"
        )
        with override_settings(MAX_CV_UPLOAD_MB=5):
            response = self.client.post(self.url, payload)
        self.assertEqual(response.status_code, 400)
        self.assertIn("cv_file", response.json()["errors"])

    def test_executable_upload_is_rejected(self):
        payload = self.payload()
        payload.pop("cv_link")
        payload["cv_file"] = SimpleUploadedFile(
            "cv.exe", b"MZ fake", content_type="application/octet-stream"
        )
        response = self.client.post(self.url, payload)
        self.assertEqual(response.status_code, 400)
        self.assertIn("cv_file", response.json()["errors"])

    def test_honeypot_application_is_filed_without_notifying(self):
        response = self.client.post(
            self.url, self.payload(website="spam"), content_type="application/json"
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(JobApplication.objects.get().status, JobApplication.Status.REJECTED)
        self.assertEqual(len(mail.outbox), 0)

    def test_applications_cannot_be_listed_publicly(self):
        self.assertEqual(self.client.get(self.url).status_code, 405)


class JobOpeningTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.opening = JobOpening.objects.create(
            slug="surveyor",
            title_en="Surveyor",
            requirements_en="2 years experience\nAutoCAD",
        )
        JobOpening.objects.create(slug="hidden", title_en="Hidden", is_published=False)

    def test_only_published_openings_are_listed(self):
        response = self.client.get(reverse("v1:job-opening-list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual([o["slug"] for o in response.json()], ["surveyor"])

    def test_line_separated_fields_are_returned_as_arrays(self):
        response = self.client.get(reverse("v1:job-opening-detail", args=["surveyor"]))
        self.assertEqual(response.json()["requirements_en"], ["2 years experience", "AutoCAD"])
