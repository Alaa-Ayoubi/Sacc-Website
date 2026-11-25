"""Public read endpoints: the site bundle and a health probe."""
from django.conf import settings
from django.core.cache import cache
from django.db import connection
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

    def get(self, request):
        # Cached under fixed keys so a content change can drop them at once
        # (apps.core.publish) instead of waiting for them to expire.
        lang = request.query_params.get("lang")
        lang = lang if lang in LANGUAGES else "all"
        key = f"site-bundle:{lang}"
        bundle = cache.get(key)
        if bundle is None:
            bundle = build_site_bundle()
            if lang != "all":
                bundle = {
                    "company": bundle["company"],
                    "images": bundle["images"],
                    lang: bundle[lang],
                }
            cache.set(key, bundle, settings.SITE_BUNDLE_CACHE_SECONDS)
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


def ping(request):
    """``GET /api/v1/ping/`` - keeps the free instance awake, nothing else.

    A scheduled job calls this every few minutes so Render never puts the
    backend to sleep, and the first visitor to send a form does not wait a
    minute for it to wake. It is a plain Django view that never touches the
    database, so Neon is left free to suspend and its compute hours are not
    spent on pings.
    """
    from django.http import JsonResponse

    return JsonResponse({"status": "awake"})
