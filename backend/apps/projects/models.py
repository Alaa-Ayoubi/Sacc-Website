"""Project portfolio.

Categories drive the filter chips above the grid; the ``all`` chip is rendered
by the frontend and is not stored here.
"""
from django.db import models

from apps.core.models import OrderedModel, TimeStampedModel, TranslatableModel


class ProjectCategory(OrderedModel, TranslatableModel):
    translatable_fields = ("label",)

    key = models.SlugField(
        max_length=32,
        unique=True,
        help_text="Filter key used by the frontend, e.g. 'water'. Must not be 'all'.",
    )
    label_ar = models.CharField(max_length=120, blank=True)
    label_en = models.CharField(max_length=120, blank=True)

    class Meta(OrderedModel.Meta):
        verbose_name = "project category"
        verbose_name_plural = "project categories"

    def __str__(self):
        return self.label_en or self.label_ar or self.key


class ProjectQuerySet(models.QuerySet):
    def published(self):
        return self.filter(is_published=True)

    def for_category(self, key: str | None):
        if not key or key == "all":
            return self
        return self.filter(category__key=key)


class Project(OrderedModel, TranslatableModel, TimeStampedModel):
    translatable_fields = (
        "title",
        "location",
        "client",
        "description",
        "scope",
    )

    class Status(models.TextChoices):
        COMPLETED = "completed", "Completed"
        IN_PROGRESS = "in_progress", "In progress"
        PLANNED = "planned", "Planned"

    category = models.ForeignKey(
        ProjectCategory,
        on_delete=models.PROTECT,
        related_name="projects",
    )
    status = models.CharField(
        max_length=16, choices=Status.choices, default=Status.COMPLETED, db_index=True
    )

    title_ar = models.CharField(max_length=255, blank=True)
    title_en = models.CharField(max_length=255, blank=True)
    location_ar = models.CharField(max_length=160, blank=True)
    location_en = models.CharField(max_length=160, blank=True)
    client_ar = models.CharField(max_length=200, blank=True)
    client_en = models.CharField(max_length=200, blank=True)
    description_ar = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    scope_ar = models.TextField(blank=True, help_text="One scope item per line.")
    scope_en = models.TextField(blank=True, help_text="One scope item per line.")

    image = models.ImageField(upload_to="projects/", blank=True)
    image_url = models.CharField(
        max_length=500, blank=True, help_text="Used when no image is uploaded."
    )

    year_completed = models.PositiveIntegerField(null=True, blank=True)
    is_featured = models.BooleanField(default=False)

    objects = ProjectQuerySet.as_manager()

    class Meta(OrderedModel.Meta):
        verbose_name = "project"

    def __str__(self):
        return self.title_en or self.title_ar or f"Project #{self.pk}"

    @property
    def image_src(self) -> str:
        return self.image.url if self.image else self.image_url

    # The status chip is shown in whichever language the visitor is reading.
    STATUS_LABELS = {
        Status.COMPLETED: {"ar": "مكتمل", "en": "Completed"},
        Status.IN_PROGRESS: {"ar": "قيد التنفيذ", "en": "In Progress"},
        Status.PLANNED: {"ar": "مخطط", "en": "Planned"},
    }

    def status_label(self, lang: str) -> str:
        return self.STATUS_LABELS.get(self.status, {}).get(lang, self.get_status_display())
