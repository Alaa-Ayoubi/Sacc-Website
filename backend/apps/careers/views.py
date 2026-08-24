"""Careers endpoints: browse openings, submit an application."""
import logging

from rest_framework import mixins, status, viewsets
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response

from apps.core.notifications import notify_job_application
from apps.core.utils import client_ip

from .models import JobApplication, JobOpening
from .serializers import JobApplicationSerializer, JobOpeningSerializer

logger = logging.getLogger(__name__)


class JobOpeningViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """``GET /api/v1/careers/openings/`` and ``/openings/<slug>/``."""

    queryset = JobOpening.objects.published()
    serializer_class = JobOpeningSerializer
    lookup_field = "slug"
    pagination_class = None
    throttle_classes = []


class JobApplicationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """``POST /api/v1/careers/applications/``.

    Accepts JSON for link-only applications and multipart when a CV file is
    attached. Write-only: applications are read in the admin.
    """

    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    throttle_scope = "job_application"

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        is_spam = bool(serializer.context.get("honeypot_tripped"))
        application = serializer.save(
            ip_address=client_ip(request),
            user_agent=request.META.get("HTTP_USER_AGENT", "")[:400],
            status=(
                JobApplication.Status.REJECTED if is_spam else JobApplication.Status.NEW
            ),
            internal_notes="Flagged by honeypot." if is_spam else "",
        )

        if not is_spam:
            notify_job_application(application)
            logger.info(
                "Job application %s received for %s",
                application.reference,
                application.role_display,
            )

        return Response(
            {"reference": str(application.reference), "detail": "Application received."},
            status=status.HTTP_201_CREATED,
        )
