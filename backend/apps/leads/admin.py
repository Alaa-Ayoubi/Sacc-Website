"""Admin for the quote-request inbox."""
from django.contrib import admin
from django.utils import timezone

from apps.core.admin import PublishedAdminMixin
from apps.core.exports import export_as_csv_action

from .models import ProjectType, QuoteRequest


@admin.register(ProjectType)
class ProjectTypeAdmin(PublishedAdminMixin, admin.ModelAdmin):
    list_display = ("label_en", "label_ar", "key", "request_count", "order", "is_published", "translation_status")
    prepopulated_fields = {"key": ("label_en",)}

    @admin.display(description="Requests")
    def request_count(self, obj):
        return obj.quote_requests.count()


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    """The sales inbox. What the visitor typed is read-only; the pipeline
    columns are the editable ones."""

    list_display = (
        "company",
        "full_name",
        "email",
        "project_type_display",
        "status",
        "created_at",
    )
    list_filter = ("status", "project_type", "locale", "created_at")
    search_fields = ("company", "full_name", "email", "message")
    date_hierarchy = "created_at"
    list_select_related = ("project_type",)
    readonly_fields = (
        "reference",
        "full_name",
        "email",
        "phone",
        "company",
        "project_type",
        "project_type_other",
        "message",
        "locale",
        "ip_address",
        "user_agent",
        "referrer",
        "created_at",
        "updated_at",
    )
    fieldsets = (
        (
            "Enquiry",
            {
                "fields": (
                    "reference",
                    "full_name",
                    "company",
                    "email",
                    "phone",
                    "project_type",
                    "project_type_other",
                    "message",
                )
            },
        ),
        ("Pipeline", {"fields": ("status", "assigned_to", "responded_at", "internal_notes")}),
        (
            "Submission metadata",
            {
                "classes": ("collapse",),
                "fields": (
                    "locale",
                    "ip_address",
                    "user_agent",
                    "referrer",
                    "created_at",
                    "updated_at",
                ),
            },
        ),
    )
    actions = (
        "mark_contacted",
        "mark_spam",
        export_as_csv_action(
            fields=(
                "reference",
                "created_at",
                "company",
                "full_name",
                "email",
                "phone",
                "project_type_display",
                "status",
                "message",
            ),
            filename_prefix="sacc-quote-requests",
            description="Export selected requests to CSV",
        ),
    )

    def has_add_permission(self, request):
        # Enquiries only ever arrive through the website.
        return False

    @admin.action(description="Mark as contacted")
    def mark_contacted(self, request, queryset):
        updated = queryset.update(
            status=QuoteRequest.Status.CONTACTED,
            assigned_to=request.user,
            responded_at=timezone.now(),
        )
        self.message_user(request, f"{updated} request(s) marked as contacted.")

    @admin.action(description="Mark as spam")
    def mark_spam(self, request, queryset):
        updated = queryset.update(status=QuoteRequest.Status.SPAM)
        self.message_user(request, f"{updated} request(s) marked as spam.")
