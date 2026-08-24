"""Editable page content for the one-page marketing site.

Split by shape rather than by section: anything with real structure (an icon, a
year, a photo) is its own model, while the plain bullet lists each section
carries — why-us points, equipment categories, government approvals, footer
certifications, office hours — live in the owning :class:`Section` as one item
per line.
"""
from django.db import models

from apps.core.models import OrderedModel, TimeStampedModel, TranslatableModel


class NavItem(OrderedModel, TranslatableModel):
    """A link in the sticky header; ``anchor`` is the id of the target section."""

    translatable_fields = ("label",)

    anchor = models.SlugField(
        max_length=64,
        unique=True,
        help_text="Section id the link scrolls to, e.g. 'services'.",
    )
    label_ar = models.CharField(max_length=64, blank=True)
    label_en = models.CharField(max_length=64, blank=True)

    class Meta(OrderedModel.Meta):
        verbose_name = "navigation item"

    def __str__(self):
        return self.label_en or self.label_ar or self.anchor


class Section(TranslatableModel, TimeStampedModel):
    """Headings and standing copy for one section of the page.

    ``body_1``-``body_3`` are optional paragraphs (the about and equipment
    sections use them), ``callout_*`` is the highlighted block some sections
    carry — the certifications commitment, the leadership quote — and ``list_*``
    is that section's plain bullet list.
    """

    translatable_fields = (
        "eyebrow",
        "title",
        "lead",
        "body_1",
        "body_2",
        "body_3",
        "callout_title",
        "callout_body",
        "list_heading",
        "list",
        "cta",
    )

    class Key(models.TextChoices):
        INTRO = "intro", "About"
        WHY = "why", "Why choose us"
        SERVICES = "services", "Services"
        PROJECTS = "projects", "Projects"
        EQUIPMENT = "equipment", "Equipment"
        CERTIFICATIONS = "certifications", "Certifications"
        JOURNEY = "journey", "Journey"
        LEADERSHIP = "leadership", "Leadership"
        CONTACT = "contact", "Contact"
        CAREERS = "careers", "Careers"
        FOOTER = "footer", "Footer"

    key = models.CharField(max_length=32, choices=Key.choices, unique=True)

    eyebrow_ar = models.CharField(max_length=120, blank=True)
    eyebrow_en = models.CharField(max_length=120, blank=True)
    title_ar = models.CharField(max_length=200, blank=True)
    title_en = models.CharField(max_length=200, blank=True)
    lead_ar = models.TextField(blank=True)
    lead_en = models.TextField(blank=True)

    body_1_ar = models.TextField(blank=True, verbose_name="paragraph 1 (AR)")
    body_1_en = models.TextField(blank=True, verbose_name="paragraph 1 (EN)")
    body_2_ar = models.TextField(blank=True, verbose_name="paragraph 2 (AR)")
    body_2_en = models.TextField(blank=True, verbose_name="paragraph 2 (EN)")
    body_3_ar = models.TextField(blank=True, verbose_name="paragraph 3 (AR)")
    body_3_en = models.TextField(blank=True, verbose_name="paragraph 3 (EN)")

    callout_title_ar = models.CharField(max_length=200, blank=True)
    callout_title_en = models.CharField(max_length=200, blank=True)
    callout_body_ar = models.TextField(blank=True)
    callout_body_en = models.TextField(blank=True)

    list_heading_ar = models.CharField(max_length=160, blank=True)
    list_heading_en = models.CharField(max_length=160, blank=True)
    list_ar = models.TextField(blank=True, help_text="One item per line.")
    list_en = models.TextField(blank=True, help_text="One item per line.")

    cta_ar = models.CharField(max_length=120, blank=True)
    cta_en = models.CharField(max_length=120, blank=True)

    class Meta:
        ordering = ("key",)

    def __str__(self):
        return self.get_key_display()


class HeroSection(TranslatableModel, TimeStampedModel):
    """The opening screen. A single row, edited in place."""

    translatable_fields = (
        "badge",
        "title",
        "lead",
        "cta_primary",
        "cta_secondary",
        "scroll_hint",
    )

    badge_ar = models.CharField(max_length=120, blank=True)
    badge_en = models.CharField(max_length=120, blank=True)
    title_ar = models.CharField(max_length=200, blank=True)
    title_en = models.CharField(max_length=200, blank=True)
    lead_ar = models.TextField(blank=True)
    lead_en = models.TextField(blank=True)
    cta_primary_ar = models.CharField(max_length=120, blank=True)
    cta_primary_en = models.CharField(max_length=120, blank=True)
    cta_secondary_ar = models.CharField(max_length=120, blank=True)
    cta_secondary_en = models.CharField(max_length=120, blank=True)
    scroll_hint_ar = models.CharField(max_length=120, blank=True)
    scroll_hint_en = models.CharField(max_length=120, blank=True)

    class Meta:
        verbose_name = "hero section"
        verbose_name_plural = "hero section"

    def __str__(self):
        return self.title_en or self.title_ar or "Hero"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class Stat(OrderedModel, TranslatableModel):
    """One of the headline figures under the hero. ``value`` is locale-neutral."""

    translatable_fields = ("label",)

    value = models.CharField(max_length=32, help_text="e.g. '2007', '150+', '100%'.")
    label_ar = models.CharField(max_length=120, blank=True)
    label_en = models.CharField(max_length=120, blank=True)

    class Meta(OrderedModel.Meta):
        verbose_name = "headline statistic"

    def __str__(self):
        return f"{self.value} - {self.label_en or self.label_ar}"


class Service(OrderedModel, TranslatableModel):
    translatable_fields = ("title", "description", "capabilities")

    icon = models.CharField(
        max_length=64,
        blank=True,
        help_text="Lucide icon name used by the frontend, e.g. 'Droplets'.",
    )
    title_ar = models.CharField(max_length=200, blank=True)
    title_en = models.CharField(max_length=200, blank=True)
    description_ar = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    capabilities_ar = models.TextField(blank=True, help_text="One capability per line.")
    capabilities_en = models.TextField(blank=True, help_text="One capability per line.")

    class Meta(OrderedModel.Meta):
        verbose_name = "service"

    def __str__(self):
        return self.title_en or self.title_ar or f"Service #{self.pk}"


class EquipmentFeature(OrderedModel, TranslatableModel):
    """A fleet-management selling point (maintenance, tracking, safety, uptime)."""

    translatable_fields = ("title", "description")

    icon = models.CharField(max_length=64, blank=True)
    title_ar = models.CharField(max_length=200, blank=True)
    title_en = models.CharField(max_length=200, blank=True)
    description_ar = models.TextField(blank=True)
    description_en = models.TextField(blank=True)

    class Meta(OrderedModel.Meta):
        verbose_name = "equipment feature"

    def __str__(self):
        return self.title_en or self.title_ar or f"Feature #{self.pk}"


class Certification(OrderedModel, TranslatableModel):
    """An ISO certificate. Government approvals live in the section's bullet list."""

    translatable_fields = ("title", "description")

    title_ar = models.CharField(max_length=160, blank=True)
    title_en = models.CharField(max_length=160, blank=True)
    description_ar = models.CharField(max_length=255, blank=True)
    description_en = models.CharField(max_length=255, blank=True)
    certificate_file = models.FileField(upload_to="certificates/", blank=True)

    class Meta(OrderedModel.Meta):
        verbose_name = "ISO certification"

    def __str__(self):
        return self.title_en or self.title_ar or f"Certification #{self.pk}"


class Milestone(OrderedModel, TranslatableModel):
    translatable_fields = ("year", "title", "description")

    # Stored per language because the final entry reads "Today" / the Arabic
    # equivalent rather than a number.
    year_ar = models.CharField(max_length=32, blank=True)
    year_en = models.CharField(max_length=32, blank=True)
    title_ar = models.CharField(max_length=200, blank=True)
    title_en = models.CharField(max_length=200, blank=True)
    description_ar = models.TextField(blank=True)
    description_en = models.TextField(blank=True)

    class Meta(OrderedModel.Meta):
        verbose_name = "journey milestone"

    def __str__(self):
        return f"{self.year_en or self.year_ar} - {self.title_en or self.title_ar}"


class CoreValue(OrderedModel, TranslatableModel):
    translatable_fields = ("title", "description")

    title_ar = models.CharField(max_length=120, blank=True)
    title_en = models.CharField(max_length=120, blank=True)
    description_ar = models.TextField(blank=True)
    description_en = models.TextField(blank=True)

    class Meta(OrderedModel.Meta):
        verbose_name = "core value"

    def __str__(self):
        return self.title_en or self.title_ar or f"Value #{self.pk}"


class Leader(OrderedModel, TranslatableModel):
    translatable_fields = ("name", "title", "bio", "expertise")

    name_ar = models.CharField(max_length=160, blank=True)
    name_en = models.CharField(max_length=160, blank=True)
    title_ar = models.CharField(max_length=160, blank=True)
    title_en = models.CharField(max_length=160, blank=True)
    bio_ar = models.TextField(blank=True)
    bio_en = models.TextField(blank=True)
    expertise_ar = models.TextField(blank=True, help_text="One area of expertise per line.")
    expertise_en = models.TextField(blank=True, help_text="One area of expertise per line.")
    photo = models.ImageField(upload_to="leadership/", blank=True)
    photo_url = models.CharField(
        max_length=500, blank=True, help_text="Used when no photo is uploaded."
    )

    class Meta(OrderedModel.Meta):
        verbose_name = "leader"

    def __str__(self):
        return self.name_en or self.name_ar or f"Leader #{self.pk}"

    @property
    def photo_src(self) -> str:
        return self.photo.url if self.photo else self.photo_url
