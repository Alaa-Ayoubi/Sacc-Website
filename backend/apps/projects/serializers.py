"""Serializers for the project portfolio.

Both languages are returned side by side, matching how the rest of the API
works; ``?lang=`` on the viewset collapses that to a single language for
consumers that only need one.
"""
from rest_framework import serializers

from apps.core.utils import split_lines

from .models import Project, ProjectCategory


class ProjectCategorySerializer(serializers.ModelSerializer):
    project_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = ProjectCategory
        fields = ("key", "label_ar", "label_en", "project_count")


class ProjectSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field="key", read_only=True)
    category_label_ar = serializers.CharField(source="category.label_ar", read_only=True)
    category_label_en = serializers.CharField(source="category.label_en", read_only=True)
    scope_ar = serializers.SerializerMethodField()
    scope_en = serializers.SerializerMethodField()
    status_label_ar = serializers.SerializerMethodField()
    status_label_en = serializers.SerializerMethodField()
    image = serializers.CharField(source="image_src", read_only=True)

    class Meta:
        model = Project
        fields = (
            "id",
            "category",
            "category_label_ar",
            "category_label_en",
            "title_ar",
            "title_en",
            "location_ar",
            "location_en",
            "client_ar",
            "client_en",
            "description_ar",
            "description_en",
            "scope_ar",
            "scope_en",
            "status",
            "status_label_ar",
            "status_label_en",
            "year_completed",
            "is_featured",
            "image",
        )

    def get_scope_ar(self, obj):
        return split_lines(obj.scope_ar)

    def get_scope_en(self, obj):
        return split_lines(obj.scope_en)

    def get_status_label_ar(self, obj):
        return obj.status_label("ar")

    def get_status_label_en(self, obj):
        return obj.status_label("en")


class LocalizedProjectSerializer(serializers.Serializer):
    """Single-language view of a project, keyed like the site bundle's items."""

    id = serializers.IntegerField()
    key = serializers.CharField()
    title = serializers.CharField()
    location = serializers.CharField()
    category = serializers.CharField()
    client = serializers.CharField()
    status = serializers.CharField()
    desc = serializers.CharField()
    scope = serializers.ListField(child=serializers.CharField())
    image = serializers.CharField()

    @classmethod
    def from_project(cls, project: Project, lang: str) -> dict:
        return {
            "id": project.pk,
            "key": project.category.key,
            "title": project.tr("title", lang),
            "location": project.tr("location", lang),
            "category": project.category.tr("label", lang),
            "client": project.tr("client", lang),
            "status": project.status_label(lang),
            "desc": project.tr("description", lang),
            "scope": project.tr_list("scope", lang),
            "image": project.image_src,
        }
