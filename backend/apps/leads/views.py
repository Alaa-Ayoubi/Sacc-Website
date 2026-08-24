"""Quote-request intake endpoint."""
import logging

from rest_framework import mixins, status, viewsets
from rest_framework.response import Response

from apps.core.notifications import notify_quote_request
from apps.core.utils import client_ip

from .models import ProjectType, QuoteRequest
from .serializers import ProjectTypeSerializer, QuoteRequestSerializer

logger = logging.getLogger(__name__)


class ProjectTypeViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """``GET /api/v1/leads/project-types/`` - options for the contact dropdown."""

    queryset = ProjectType.objects.published()
    serializer_class = ProjectTypeSerializer
    pagination_class = None
    throttle_classes = []


class QuoteRequestViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """``POST /api/v1/leads/quote-requests/`` - the "Request a Quote" form.

    Write-only on purpose: enquiries are read in the admin, never over the
    public API.
    """

    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer
    throttle_scope = "quote_request"

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        quote = serializer.save(
            ip_address=client_ip(request),
            user_agent=request.META.get("HTTP_USER_AGENT", "")[:400],
            referrer=request.META.get("HTTP_REFERER", "")[:500],
            # A filled honeypot is filed rather than rejected, so the sender
            # gets no signal about which field gave them away.
            status=(
                QuoteRequest.Status.SPAM
                if serializer.context.get("honeypot_tripped")
                else QuoteRequest.Status.NEW
            ),
        )

        if quote.status != QuoteRequest.Status.SPAM:
            notify_quote_request(quote)
            logger.info("Quote request %s captured from %s", quote.reference, quote.company)

        return Response(
            {"reference": str(quote.reference), "detail": "Request received."},
            status=status.HTTP_201_CREATED,
        )
