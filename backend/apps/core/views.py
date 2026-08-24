"""Public read endpoints: the site bundle and a health probe."""
from django.conf import settings
from django.db import connection
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.content.bundle import build_site_bundle
from apps.core.models import LANGUAGES


class SiteBundleView(APIView):
    """``GET /api/v1/site/`` - the whole bilingual payload in one request.

    Shaped exactly like the ``window.SACC_SITE`` object the static build used,
    so the frontend can swap ``site-data.js`` for a fetch without touching any
    rendering code.

    ``?lang=ar`` (or ``en``) drops the other language from the response. The
    one-page site wants both, because it toggles without refetching; a
    single-language consumer can halve the payload by asking for one.
    """

    throttle_classes = []

    @method_decorator(cache_page(settings.SITE_BUNDLE_CACHE_SECONDS))
    @method_decorator(vary_on_headers("Accept-Language"))
    def get(self, request):
        bundle = build_site_bundle()

        lang = request.query_params.get("lang")
        if lang in LANGUAGES:
            bundle = {
                "company": bundle["company"],
                "images": bundle["images"],
                lang: bundle[lang],
            }
        return Response(bundle)


class HealthView(APIView):
    """Liveness probe that also confirms PostgreSQL is reachable."""

    throttle_classes = []

    def get(self, request):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
        except Exception as exc:  # pragma: no cover - depends on infrastructure
            return Response(
                {"status": "error", "database": str(exc)},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        return Response({"status": "ok", "database": "ok"})
