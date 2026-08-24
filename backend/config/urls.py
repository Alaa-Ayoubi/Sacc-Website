"""URL map.

Everything public lives under ``/api/v1/``; the admin is the editorial and
sales-inbox interface.
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.careers.views import JobApplicationViewSet, JobOpeningViewSet
from apps.core.views import HealthView, SiteBundleView
from apps.leads.views import ProjectTypeViewSet, QuoteRequestViewSet
from apps.projects.views import ProjectCategoryViewSet, ProjectViewSet

router = DefaultRouter()
router.register("projects/categories", ProjectCategoryViewSet, basename="project-category")
router.register("projects", ProjectViewSet, basename="project")
router.register("careers/openings", JobOpeningViewSet, basename="job-opening")
router.register("careers/applications", JobApplicationViewSet, basename="job-application")
router.register("leads/project-types", ProjectTypeViewSet, basename="project-type")
router.register("leads/quote-requests", QuoteRequestViewSet, basename="quote-request")

api_v1 = [
    path("site/", SiteBundleView.as_view(), name="site-bundle"),
    path("health/", HealthView.as_view(), name="health"),
    *router.urls,
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include((api_v1, "api"), namespace="v1")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
