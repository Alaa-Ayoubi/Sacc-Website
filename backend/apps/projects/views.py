"""Read-only project portfolio endpoints."""
from django.db.models import Count, Q
from rest_framework import mixins, viewsets
from rest_framework.response import Response

from .models import Project, ProjectCategory
from .serializers import (
    LocalizedProjectSerializer,
    ProjectCategorySerializer,
    ProjectSerializer,
)


class ProjectCategoryViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """``GET /api/v1/projects/categories/`` with a published-project count each."""

    serializer_class = ProjectCategorySerializer
    pagination_class = None
    throttle_classes = []

    def get_queryset(self):
        return ProjectCategory.objects.published().annotate(
            project_count=Count("projects", filter=Q(projects__is_published=True))
        )


class ProjectViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """``GET /api/v1/projects/``.

    ``?category=water`` filters by category key (``all`` is a no-op, matching
    the frontend's chips) and ``?lang=ar|en`` returns the single-language shape
    used inside the site bundle.
    """

    serializer_class = ProjectSerializer
    filterset_fields = ("status", "is_featured")
    throttle_classes = []

    def get_queryset(self):
        return (
            Project.objects.published()
            .select_related("category")
            .for_category(self.request.query_params.get("category"))
        )

    def _lang(self) -> str | None:
        lang = self.request.query_params.get("lang")
        return lang if lang in {"ar", "en"} else None

    def list(self, request, *args, **kwargs):
        lang = self._lang()
        if not lang:
            return super().list(request, *args, **kwargs)

        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        target = page if page is not None else queryset
        data = [LocalizedProjectSerializer.from_project(p, lang) for p in target]
        if page is not None:
            return self.get_paginated_response(data)
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        lang = self._lang()
        if not lang:
            return super().retrieve(request, *args, **kwargs)
        return Response(LocalizedProjectSerializer.from_project(self.get_object(), lang))
