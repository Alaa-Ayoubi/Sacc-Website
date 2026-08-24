"""Admin for careers content and the application inbox."""
from django.contrib import admin
from django.utils.html import format_html

from apps.core.admin import PublishedAdminMixin
from apps.core.exports import export_as_csv_action

from .models import CareerBenefit, JobApplication, JobOpening


@admin.register(CareerBenefit)
class CareerBenefitAdmin(PublishedAdminMixin, admin.ModelAdmin):
    list_display = ("title_en", "title_ar", "icon", "order", "is_published", "translation_status")


@admin.register(JobOpening)
class JobOpeningAdmin(PublishedAdminMixin, admin.ModelAdmin):
    list_display = (
        "title_en",
        "title_ar",
        "department_en",
        "location_en",
        "application_count",
        "order",
        "is_published",
        "translation_status",
    )
    list_filter = ("is_published", "department_en")
    search_fields = ("title_en", "title_ar", "slug")
    prepopulated_fields = {"slug": ("title_en",)}
    fieldsets = (
        ("Listing", {"fields": ("slug", "order", "is_published", "closes_on")}),
        ("Title", {"fields": ("title_ar", "title_en")}),
        ("Department", {"fields": ("department_ar", "department_en")}),
        ("Location", {"fields": ("location_ar", "location_en")}),
        ("Employment type", {"fields": ("employment_type_ar", "employment_type_en")}),
        ("Experience required", {"fields": ("experience_ar", "experience_en")}),
        (
            "Detail",
            {
                "classes": ("collapse",),
                "description": "Responsibilities and requirements take one item per line.",
                "fields": (
                    "description_ar",
                    "description_en",
                    "responsibilities_ar",
                    "responsibilities_en",
                    "requirements_ar",
                    "requirements_en",
                ),
            },
        ),
    )

    @admin.display(description="Applications")
    def application_count(self, obj):
        return obj.application_count


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    """The HR inbox. Candidate-submitted fields are read-only; the review
    columns are the only editable ones."""

    list_display = (
        "full_name",
        "role_display",
        "years_experience",
        "email",
        "phone",
        "status",
        "cv",
        "created_at",
    )
    list_filter = ("status", "opening", "locale", "created_at")
    search_fields = ("full_name", "email", "phone", "role_other")
    date_hierarchy = "created_at"
    list_select_related = ("opening",)
    autocomplete_fields = ("opening",)
    readonly_fields = (
        "reference",
        "full_name",
        "email",
        "phone",
        "years_experience",
        "opening",
        "role_other",
        "cv_link",
        "cv_file",
        "note",
        "locale",
        "ip_address",
        "user_agent",
        "created_at",
        "updated_at",
    )
    fieldsets = (
        (
            "Candidate",
            {
                "fields": (
                    "reference",
                    "full_name",
                    "email",
                    "phone",
                    "years_experience",
                    "opening",
                    "role_other",
                )
            },
        ),
        ("CV", {"fields": ("cv_link", "cv_file", "note")}),
        ("Review", {"fields": ("status", "reviewed_by", "internal_notes")}),
        (
            "Submission metadata",
            {
                "classes": ("collapse",),
                "fields": ("locale", "ip_address", "user_agent", "created_at", "updated_at"),
            },
        ),
    )
    actions = (
        "mark_reviewing",
        "mark_shortlisted",
        "mark_rejected",
        export_as_csv_action(
            fields=(
                "reference",
                "created_at",
                "full_name",
                "email",
                "phone",
                "years_experience",
                "role_display",
                "cv_link",
                "status",
                "note",
            ),
            filename_prefix="sacc-applications",
            description="Export selected applications to CSV",
        ),
    )

    def has_add_permission(self, request):
        # Applications only ever arrive through the website.
        return False

    @admin.display(description="CV")
    def cv(self, obj):
        if obj.cv_file:
            return format_html('<a href="{}" target="_blank" rel="noopener">Download</a>', obj.cv_file.url)
        if obj.cv_link:
            return format_html('<a href="{}" target="_blank" rel="noopener">Link</a>', obj.cv_link)
        return "-"

    def _set_status(self, request, queryset, status, label):
        updated = queryset.update(status=status, reviewed_by=request.user)
        self.message_user(request, f"{updated} application(s) marked as {label}.")

    @admin.action(description="Mark as under review")
    def mark_reviewing(self, request, queryset):
        self._set_status(request, queryset, JobApplication.Status.REVIEWING, "under review")

    @admin.action(description="Mark as shortlisted")
    def mark_shortlisted(self, request, queryset):
        self._set_status(request, queryset, JobApplication.Status.SHORTLISTED, "shortlisted")

    @admin.action(description="Mark as not proceeding")
    def mark_rejected(self, request, queryset):
        self._set_status(request, queryset, JobApplication.Status.REJECTED, "not proceeding")
