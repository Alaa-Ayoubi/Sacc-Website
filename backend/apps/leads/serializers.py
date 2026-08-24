"""Quote-request intake.

Validation deliberately mirrors what the form already enforces in the browser
(``submitQuote`` in the page script) so a visitor never gets past client-side
validation only to be rejected by the server.
"""
from rest_framework import serializers

from .models import ProjectType, QuoteRequest


class ProjectTypeSerializer(serializers.ModelSerializer):
    label_ar = serializers.CharField(read_only=True)
    label_en = serializers.CharField(read_only=True)

    class Meta:
        model = ProjectType
        fields = ("key", "label_ar", "label_en")


class QuoteRequestSerializer(serializers.ModelSerializer):
    project_type = serializers.SlugRelatedField(
        slug_field="key",
        queryset=ProjectType.objects.published(),
        required=False,
        allow_null=True,
    )
    # Not a real field: bots fill hidden inputs, humans leave them alone.
    website = serializers.CharField(
        required=False, allow_blank=True, write_only=True
    )

    class Meta:
        model = QuoteRequest
        fields = (
            "reference",
            "full_name",
            "email",
            "phone",
            "company",
            "project_type",
            "project_type_other",
            "message",
            "locale",
            "website",
        )
        read_only_fields = ("reference",)

    def validate_full_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Name is required.")
        return value

    def validate_company(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Organization name is required.")
        return value

    def validate_message(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("Write at least 10 characters.")
        return value

    def validate_locale(self, value):
        return value if value in {"ar", "en"} else "ar"

    def validate(self, attrs):
        if attrs.pop("website", ""):
            # Silently accepted by the view, then flagged as spam.
            self.context["honeypot_tripped"] = True
        if not attrs.get("project_type") and not attrs.get("project_type_other", "").strip():
            raise serializers.ValidationError(
                {"project_type": "Select a project type."}
            )
        return attrs
