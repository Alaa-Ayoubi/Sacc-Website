"""Job openings and application intake."""
from django.conf import settings
from rest_framework import serializers

from apps.core.utils import split_lines

from .models import JobApplication, JobOpening


class JobOpeningSerializer(serializers.ModelSerializer):
    responsibilities_ar = serializers.SerializerMethodField()
    responsibilities_en = serializers.SerializerMethodField()
    requirements_ar = serializers.SerializerMethodField()
    requirements_en = serializers.SerializerMethodField()

    class Meta:
        model = JobOpening
        fields = (
            "slug",
            "title_ar",
            "title_en",
            "department_ar",
            "department_en",
            "location_ar",
            "location_en",
            "employment_type_ar",
            "employment_type_en",
            "experience_ar",
            "experience_en",
            "description_ar",
            "description_en",
            "responsibilities_ar",
            "responsibilities_en",
            "requirements_ar",
            "requirements_en",
            "closes_on",
        )

    def get_responsibilities_ar(self, obj):
        return split_lines(obj.responsibilities_ar)

    def get_responsibilities_en(self, obj):
        return split_lines(obj.responsibilities_en)

    def get_requirements_ar(self, obj):
        return split_lines(obj.requirements_ar)

    def get_requirements_en(self, obj):
        return split_lines(obj.requirements_en)


class JobApplicationSerializer(serializers.ModelSerializer):
    opening = serializers.SlugRelatedField(
        slug_field="slug",
        queryset=JobOpening.objects.published(),
        required=False,
        allow_null=True,
    )
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = JobApplication
        fields = (
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
            "website",
        )
        read_only_fields = ("reference",)

    def validate_full_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Name is required.")
        return value

    def validate_phone(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Mobile number is required.")
        return value

    def validate_locale(self, value):
        return value if value in {"ar", "en"} else "ar"

    def validate_cv_file(self, value):
        if value is None:
            return value
        limit_mb = settings.MAX_CV_UPLOAD_MB
        if value.size > limit_mb * 1024 * 1024:
            raise serializers.ValidationError(f"The file must be {limit_mb} MB or smaller.")
        extension = value.name.rsplit(".", 1)[-1].lower() if "." in value.name else ""
        if extension not in settings.ALLOWED_CV_EXTENSIONS:
            allowed = ", ".join(settings.ALLOWED_CV_EXTENSIONS).upper()
            raise serializers.ValidationError(f"Upload a {allowed} file.")
        return value

    def validate(self, attrs):
        if attrs.pop("website", ""):
            self.context["honeypot_tripped"] = True
        # A link or an upload satisfies the CV requirement — the same rule the
        # form applies in the browser.
        if not attrs.get("cv_link") and not attrs.get("cv_file"):
            raise serializers.ValidationError(
                {"cv_link": "Add a CV link or upload a file."}
            )
        if not attrs.get("opening") and not attrs.get("role_other", "").strip():
            raise serializers.ValidationError({"opening": "Select a role."})
        return attrs
