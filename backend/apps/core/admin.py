"""Admin for branding and imagery, plus the shared bilingual admin base."""
from django.contrib import admin
from django.utils.html import format_html

from .models import SiteImage, SiteSettings


class SingletonAdmin(admin.ModelAdmin):
    """Edits the one row directly and hides add/delete."""

    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        from django.shortcuts import redirect
        from django.urls import reverse

        obj = self.model.load()
        meta = self.model._meta
        return redirect(
            reverse(f"admin:{meta.app_label}_{meta.model_name}_change", args=[obj.pk])
        )


class TranslationStatusMixin:
    """Adds a column showing whether a row is fully translated.

    The API falls back to the other language when one side is blank, so an
    untranslated row still renders — which is exactly why it needs to be
    visible here. ``manage.py check_translations`` reports the same thing from
    the command line.
    """

    @admin.display(description="Translated")
    def translation_status(self, obj):
        missing = [
            field
            for field in getattr(obj, "translatable_fields", ())
            if not (getattr(obj, f"{field}_ar", "") or "").strip()
            and (getattr(obj, f"{field}_en", "") or "").strip()
        ]
        if not missing:
            return format_html('<span style="color:#188038">AR + EN</span>')
        return format_html(
            '<span style="color:#c5221f" title="{}">AR missing ({})</span>',
            ", ".join(missing),
            len(missing),
        )


class PublishedAdminMixin(TranslationStatusMixin):
    """Shared list controls for the ordered, publishable content models."""

    list_editable = ("order", "is_published")
    list_filter = ("is_published",)
    actions = ("publish", "unpublish")

    @admin.action(description="Publish selected items")
    def publish(self, request, queryset):
        updated = queryset.update(is_published=True)
        self.message_user(request, f"{updated} item(s) published.")

    @admin.action(description="Hide selected items")
    def unpublish(self, request, queryset):
        updated = queryset.update(is_published=False)
        self.message_user(request, f"{updated} item(s) hidden.")


@admin.register(SiteSettings)
class SiteSettingsAdmin(SingletonAdmin):
    fieldsets = (
        ("Contact details", {"fields": ("phone", "mobile", "email", "commercial_registration")}),
        ("Brand line", {"fields": ("brand_line_ar", "brand_line_en")}),
        ("Head office address", {"fields": ("address_ar", "address_en")}),
        ("Footer", {"fields": ("tagline_ar", "tagline_en", "rights_ar", "rights_en")}),
        (
            "Logos",
            {
                "fields": ("logo", "logo_url", "logo_mark", "logo_mark_url"),
                "description": "Upload a file, or paste a URL if the image is hosted elsewhere.",
            },
        ),
    )


@admin.register(SiteImage)
class SiteImageAdmin(admin.ModelAdmin):
    list_display = ("slot", "preview", "order", "source")
    list_filter = ("slot",)
    list_editable = ("order",)
    ordering = ("slot", "order")

    @admin.display(description="Preview")
    def preview(self, obj):
        if not obj.src:
            return "-"
        return format_html(
            '<img src="{}" style="height:44px;border-radius:4px;object-fit:cover" />', obj.src
        )

    @admin.display(description="Source")
    def source(self, obj):
        return "Uploaded" if obj.image else "External URL"
