"""Quote requests submitted from the contact section."""
import uuid

from django.conf import settings
from django.db import models

from apps.core.models import OrderedModel, TimeStampedModel, TranslatableModel


class ProjectType(OrderedModel, TranslatableModel):
    """An option in the contact form's project-type dropdown."""

    translatable_fields = ("label",)

    key = models.SlugField(max_length=48, unique=True)
    label_ar = models.CharField(max_length=160, blank=True)
    label_en = models.CharField(max_length=160, blank=True)

    class Meta(OrderedModel.Meta):
        verbose_name = "project type"

    def __str__(self):
        return self.label_en or self.label_ar or self.key


class QuoteRequest(TimeStampedModel):
    """One enquiry from the "Request a Quote" form.

    ``project_type`` is a foreign key so the dropdown stays editable, with
    ``project_type_other`` covering the "Other" option.
    """

    class Status(models.TextChoices):
        NEW = "new", "New"
        CONTACTED = "contacted", "Contacted"
        QUOTED = "quoted", "Quote sent"
        WON = "won", "Won"
        LOST = "lost", "Lost"
        SPAM = "spam", "Spam"

    reference = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    full_name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=32, blank=True)
    company = models.CharField(max_length=200)

    project_type = models.ForeignKey(
        ProjectType,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="quote_requests",
    )
    project_type_other = models.CharField(max_length=200, blank=True)
    message = models.TextField()

    locale = models.CharField(max_length=8, default="ar")
    status = models.CharField(
        max_length=16, choices=Status.choices, default=Status.NEW, db_index=True
    )
    internal_notes = models.TextField(blank=True)
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_quote_requests",
    )
    responded_at = models.DateTimeField(null=True, blank=True)

    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=400, blank=True)
    referrer = models.CharField(max_length=500, blank=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "quote request"
        indexes = [models.Index(fields=["status", "-created_at"])]

    def __str__(self):
        return f"{self.company} - {self.full_name}"

    @property
    def project_type_display(self) -> str:
        if self.project_type:
            return str(self.project_type)
        return self.project_type_other or "Unspecified"
