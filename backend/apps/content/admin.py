"""Admin for the editable page copy.

Arabic and English sit side by side in every form so an editor can see straight
away when one language is lagging behind the other.
"""
from django.contrib import admin

from apps.core.admin import PublishedAdminMixin

from .models import (
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


@admin.register(NavItem)
class NavItemAdmin(PublishedAdminMixin, admin.ModelAdmin):
    list_display = ("label_en", "label_ar", "anchor", "order", "is_published", "translation_status")
    search_fields = ("label_en", "label_ar", "anchor")


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Badge", {"fields": ("badge_ar", "badge_en")}),
        ("Headline", {"fields": ("title_ar", "title_en", "lead_ar", "lead_en")}),
        (
            "Buttons",
            {
                "fields": (
                    "cta_primary_ar",
                    "cta_primary_en",
                    "cta_secondary_ar",
                    "cta_secondary_en",
                    "scroll_hint_ar",
                    "scroll_hint_en",
                )
            },
        ),
    )

    def has_add_permission(self, request):
        return not HeroSection.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        from django.shortcuts import redirect
        from django.urls import reverse

        obj = HeroSection.load()
        return redirect(reverse("admin:content_herosection_change", args=[obj.pk]))


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ("__str__", "title_en", "title_ar", "updated_at")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Section", {"fields": ("key",)}),
        (
            "Headings",
            {"fields": ("eyebrow_ar", "eyebrow_en", "title_ar", "title_en", "lead_ar", "lead_en")},
        ),
        (
            "Paragraphs",
            {
                "classes": ("collapse",),
                "description": "Used by the About and Equipment sections.",
                "fields": (
                    "body_1_ar",
                    "body_1_en",
                    "body_2_ar",
                    "body_2_en",
                    "body_3_ar",
                    "body_3_en",
                ),
            },
        ),
        (
            "Highlighted block",
            {
                "classes": ("collapse",),
                "description": "The certifications commitment and the leadership quote.",
                "fields": ("callout_title_ar", "callout_title_en", "callout_body_ar", "callout_body_en"),
            },
        ),
        (
            "Bullet list",
            {
                "classes": ("collapse",),
                "description": (
                    "One item per line. Holds the why-us points, equipment categories, "
                    "government approvals, office hours and footer certifications."
                ),
                "fields": ("list_heading_ar", "list_heading_en", "list_ar", "list_en"),
            },
        ),
        ("Call to action", {"classes": ("collapse",), "fields": ("cta_ar", "cta_en")}),
        ("History", {"classes": ("collapse",), "fields": ("created_at", "updated_at")}),
    )

    def has_delete_permission(self, request, obj=None):
        # Sections are fixed slots on the page; hide the copy instead of deleting it.
        return False


@admin.register(Stat)
class StatAdmin(PublishedAdminMixin, admin.ModelAdmin):
    list_display = ("value", "label_en", "label_ar", "order", "is_published", "translation_status")


@admin.register(Service)
class ServiceAdmin(PublishedAdminMixin, admin.ModelAdmin):
    list_display = ("title_en", "title_ar", "icon", "order", "is_published", "translation_status")
    search_fields = ("title_en", "title_ar")
    fieldsets = (
        ("Display", {"fields": ("icon", "order", "is_published")}),
        ("Title", {"fields": ("title_ar", "title_en")}),
        ("Description", {"fields": ("description_ar", "description_en")}),
        (
            "Capabilities",
            {
                "description": "One capability per line.",
                "fields": ("capabilities_ar", "capabilities_en"),
            },
        ),
    )


@admin.register(EquipmentFeature)
class EquipmentFeatureAdmin(PublishedAdminMixin, admin.ModelAdmin):
    list_display = ("title_en", "title_ar", "icon", "order", "is_published", "translation_status")


@admin.register(Certification)
class CertificationAdmin(PublishedAdminMixin, admin.ModelAdmin):
    list_display = ("title_en", "title_ar", "has_file", "order", "is_published", "translation_status")

    @admin.display(boolean=True, description="Certificate uploaded")
    def has_file(self, obj):
        return bool(obj.certificate_file)


@admin.register(Milestone)
class MilestoneAdmin(PublishedAdminMixin, admin.ModelAdmin):
    list_display = ("year_en", "title_en", "title_ar", "order", "is_published", "translation_status")


@admin.register(CoreValue)
class CoreValueAdmin(PublishedAdminMixin, admin.ModelAdmin):
    list_display = ("title_en", "title_ar", "order", "is_published", "translation_status")


@admin.register(Leader)
class LeaderAdmin(PublishedAdminMixin, admin.ModelAdmin):
    list_display = ("name_en", "title_en", "order", "is_published", "translation_status")
    fieldsets = (
        ("Display", {"fields": ("order", "is_published", "photo", "photo_url")}),
        ("Name", {"fields": ("name_ar", "name_en")}),
        ("Job title", {"fields": ("title_ar", "title_en")}),
        ("Biography", {"fields": ("bio_ar", "bio_en")}),
        (
            "Areas of expertise",
            {"description": "One per line.", "fields": ("expertise_ar", "expertise_en")},
        ),
    )
