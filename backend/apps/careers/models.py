"""Careers: what the company advertises, and what candidates send back."""
import uuid

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator, MinValueValidator
from django.db import models

from apps.core.models import OrderedModel, TimeStampedModel, TranslatableModel


def cv_upload_path(instance, filename: str) -> str:
    """Store CVs under an unguessable name so the media URL cannot be enumerated."""
    suffix = filename.rsplit(".", 1)[-1].lower() if "." in filename else "bin"
    return f"cvs/{instance.reference}.{suffix}"


class CareerBenefit(OrderedModel, TranslatableModel):
    """A "why work with us" card."""

    translatable_fields = ("title", "description")

    icon = models.CharField(max_length=64, blank=True)
    title_ar = models.CharField(max_length=200, blank=True)
    title_en = models.CharField(max_length=200, blank=True)
    description_ar = models.TextField(blank=True)
    description_en = models.TextField(blank=True)

    class Meta(OrderedModel.Meta):
        verbose_name = "career benefit"

    def __str__(self):
        return self.title_en or self.title_ar or f"Benefit #{self.pk}"


class JobOpening(OrderedModel, TranslatableModel, TimeStampedModel):
    translatable_fields = (
        "title",
        "department",
        "location",
        "employment_type",
        "experience",
        "description",
        "responsibilities",
        "requirements",
    )

    slug = models.SlugField(max_length=120, unique=True)

    title_ar = models.CharField(max_length=200, blank=True)
    title_en = models.CharField(max_length=200, blank=True)
    department_ar = models.CharField(max_length=120, blank=True)
    department_en = models.CharField(max_length=120, blank=True)
    location_ar = models.CharField(max_length=160, blank=True)
    location_en = models.CharField(max_length=160, blank=True)
    employment_type_ar = models.CharField(max_length=80, blank=True)
    employment_type_en = models.CharField(max_length=80, blank=True)
    experience_ar = models.CharField(max_length=120, blank=True)
    experience_en = models.CharField(max_length=120, blank=True)

    description_ar = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    responsibilities_ar = models.TextField(blank=True, help_text="One item per line.")
    responsibilities_en = models.TextField(blank=True, help_text="One item per line.")
    requirements_ar = models.TextField(blank=True, help_text="One item per line.")
    requirements_en = models.TextField(blank=True, help_text="One item per line.")

    closes_on = models.DateField(null=True, blank=True)

    class Meta(OrderedModel.Meta):
        verbose_name = "job opening"

    def __str__(self):
        return self.title_en or self.title_ar or self.slug

    @property
    def application_count(self) -> int:
        return self.applications.count()


class JobApplication(TimeStampedModel):
    """A submission from the careers form.

    A candidate satisfies the CV requirement with either a link or an upload —
    the same rule the frontend enforces — so both fields are individually
    optional and checked together in :meth:`clean`.
    """

    class Status(models.TextChoices):
        NEW = "new", "New"
        REVIEWING = "reviewing", "Under review"
        SHORTLISTED = "shortlisted", "Shortlisted"
        INTERVIEWING = "interviewing", "Interviewing"
        HIRED = "hired", "Hired"
        REJECTED = "rejected", "Not proceeding"

    reference = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    full_name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=32)
    years_experience = models.PositiveSmallIntegerField(validators=[MinValueValidator(0)])

    opening = models.ForeignKey(
        JobOpening,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="applications",
        help_text="Blank for a general application.",
    )
    role_other = models.CharField(
        max_length=200,
        blank=True,
        help_text="Free-text role when the candidate applied without picking an opening.",
    )

    cv_link = models.URLField(blank=True)
    cv_file = models.FileField(
        upload_to=cv_upload_path,
        blank=True,
        validators=[FileExtensionValidator(allowed_extensions=["pdf", "doc", "docx"])],
    )
    note = models.TextField(blank=True)

    locale = models.CharField(max_length=8, default="ar")
    status = models.CharField(
        max_length=16, choices=Status.choices, default=Status.NEW, db_index=True
    )
    internal_notes = models.TextField(blank=True)
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reviewed_applications",
    )

    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=400, blank=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "job application"
        indexes = [models.Index(fields=["status", "-created_at"])]

    def __str__(self):
        return f"{self.full_name} - {self.role_display}"

    def clean(self):
        super().clean()
        if not self.cv_link and not self.cv_file:
            raise ValidationError(
                {"cv_link": "Provide a CV link or upload a CV file."}
            )
        if not self.opening and not self.role_other:
            raise ValidationError(
                {"role_other": "Select an opening or describe the role applied for."}
            )

    @property
    def role_display(self) -> str:
        if self.opening:
            return str(self.opening)
        return self.role_other or "General application"
