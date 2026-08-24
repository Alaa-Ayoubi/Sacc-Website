"""Admin for the project portfolio."""
from django.contrib import admin

from apps.core.admin import PublishedAdminMixin

from .models import Project, ProjectCategory


@admin.register(ProjectCategory)
class ProjectCategoryAdmin(PublishedAdminMixin, admin.ModelAdmin):
    list_display = ("label_en", "label_ar", "key", "project_count", "order", "is_published", "translation_status")
    prepopulated_fields = {"key": ("label_en",)}

    @admin.display(description="Projects")
    def project_count(self, obj):
        return obj.projects.count()


@admin.register(Project)
class ProjectAdmin(PublishedAdminMixin, admin.ModelAdmin):
    list_display = (
        "title_en",
        "title_ar",
        "category",
        "status",
        "year_completed",
        "order",
        "is_published",
        "translation_status",
    )
    list_filter = ("is_published", "status", "category", "is_featured")
    search_fields = ("title_en", "title_ar", "client_en", "client_ar", "location_en")
    autocomplete_fields = ()
    fieldsets = (
        (
            "Classification",
            {"fields": ("category", "status", "year_completed", "is_featured", "order", "is_published")},
        ),
        ("Title", {"fields": ("title_ar", "title_en")}),
        ("Client", {"fields": ("client_ar", "client_en")}),
        ("Location", {"fields": ("location_ar", "location_en")}),
        ("Description", {"fields": ("description_ar", "description_en")}),
        (
            "Scope of work",
            {"description": "One item per line.", "fields": ("scope_ar", "scope_en")},
        ),
        ("Image", {"fields": ("image", "image_url")}),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).select_related("category")
