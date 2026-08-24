"""Building blocks shared by every content app.

The public site renders Arabic and English from a single payload and switches
language client-side, so every translatable field is stored as a twin pair of
columns (``title_ar`` / ``title_en``) rather than as separate rows per locale.
``TranslatableModel`` gives those pairs a uniform accessor.
"""
from django.core.exceptions import ValidationError
from django.db import models

from .utils import split_lines

LANGUAGES = ("ar", "en")


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class OrderedQuerySet(models.QuerySet):
    def published(self):
        return self.filter(is_published=True)


class OrderedModel(models.Model):
    """Content rows the editors reorder by hand and can hide without deleting."""

    order = models.PositiveIntegerField(
        default=0,
        db_index=True,
        help_text="Lower numbers appear first on the site.",
    )
    is_published = models.BooleanField(
        default=True,
        help_text="Uncheck to hide this item from the public site without deleting it.",
    )

    objects = OrderedQuerySet.as_manager()

    class Meta:
        abstract = True
        ordering = ("order", "pk")


class TranslatableModel(models.Model):
    """Mixin for models whose translatable fields are stored as ``<name>_ar`` / ``<name>_en``.

    ``translatable_fields`` names the base fields; ``tr()`` reads one for a
    language, falling back to the other language when a translation is blank so
    the site never renders an empty heading.
    """

    translatable_fields: tuple[str, ...] = ()

    class Meta:
        abstract = True

    def tr(self, field: str, lang: str) -> str:
        if lang not in LANGUAGES:
            raise ValueError(f"unknown language {lang!r}")
        value = getattr(self, f"{field}_{lang}", "")
        if value:
            return value
        other = "en" if lang == "ar" else "ar"
        return getattr(self, f"{field}_{other}", "") or ""

    def tr_list(self, field: str, lang: str) -> list[str]:
        """Read a one-item-per-line text field as a list for the given language."""
        return split_lines(self.tr(field, lang))

    def as_dict(self, lang: str, fields: tuple[str, ...] | None = None) -> dict:
        """Return ``{field: translation}`` for the requested language."""
        names = fields if fields is not None else self.translatable_fields
        return {name: self.tr(name, lang) for name in names}

    def clean(self):
        super().clean()
        missing = [
            f"{name}_ar / {name}_en"
            for name in self.translatable_fields
            if not getattr(self, f"{name}_ar", "") and not getattr(self, f"{name}_en", "")
        ]
        if missing:
            raise ValidationError(
                f"Provide at least one language for: {', '.join(missing)}."
            )


class SingletonModel(models.Model):
    """A table that holds exactly one row — used for one-off blocks of page copy."""

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):  # pragma: no cover - guarded in admin too
        raise ValidationError(f"{self._meta.verbose_name} cannot be deleted.")

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class SiteSettings(SingletonModel, TranslatableModel, TimeStampedModel):
    """Company identity and contact details shown in the header, contact block and footer."""

    translatable_fields = ("brand_line", "address", "tagline", "rights")

    phone = models.CharField(max_length=32, blank=True)
    mobile = models.CharField(max_length=32, blank=True)
    email = models.EmailField(blank=True)
    commercial_registration = models.CharField(
        "commercial registration (CR)", max_length=32, blank=True
    )

    brand_line_ar = models.CharField(max_length=160, blank=True)
    brand_line_en = models.CharField(max_length=160, blank=True)
    address_ar = models.CharField(max_length=255, blank=True)
    address_en = models.CharField(max_length=255, blank=True)
    tagline_ar = models.TextField(blank=True)
    tagline_en = models.TextField(blank=True)
    rights_ar = models.CharField(max_length=255, blank=True)
    rights_en = models.CharField(max_length=255, blank=True)

    logo = models.ImageField(upload_to="branding/", blank=True)
    logo_mark = models.ImageField(upload_to="branding/", blank=True)
    # Kept so content seeded from the current static site keeps working before
    # the real image files are uploaded into Django.
    logo_url = models.CharField(max_length=500, blank=True)
    logo_mark_url = models.CharField(max_length=500, blank=True)

    class Meta:
        verbose_name = "site settings"
        verbose_name_plural = "site settings"

    def __str__(self):
        return "Site settings"

    def logo_src(self) -> str:
        return self.logo.url if self.logo else self.logo_url

    def mark_src(self) -> str:
        return self.logo_mark.url if self.logo_mark else self.logo_mark_url


class SiteImage(TimeStampedModel):
    """Named images the frontend looks up by slot (``hero``, ``chairman``, …).

    Either upload a file or paste an external URL; ``src`` prefers the upload.
    """

    class Slot(models.TextChoices):
        HERO = "hero", "Hero"
        EQUIPMENT = "equipment", "Equipment"
        WATER = "water", "Water"
        URBAN = "urban", "Urban"
        CAREERS = "careers", "Careers"
        CHAIRMAN = "chairman", "Chairman"
        GM = "gm", "General manager"
        PROJECT = "project", "Project gallery"

    slot = models.CharField(max_length=32, choices=Slot.choices, db_index=True)
    image = models.ImageField(upload_to="site/", blank=True)
    external_url = models.CharField(
        max_length=500,
        blank=True,
        help_text="Used when no file is uploaded — e.g. an existing CDN URL.",
    )
    alt_text_ar = models.CharField(max_length=255, blank=True)
    alt_text_en = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ("slot", "order", "pk")

    def __str__(self):
        return f"{self.get_slot_display()} #{self.order}"

    def clean(self):
        super().clean()
        if not self.image and not self.external_url:
            raise ValidationError("Upload an image or provide an external URL.")

    @property
    def src(self) -> str:
        return self.image.url if self.image else self.external_url
