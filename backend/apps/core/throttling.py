"""Throttles keyed on the visitor's real address."""
from rest_framework.throttling import ScopedRateThrottle

from .utils import client_ip


class ClientScopedRateThrottle(ScopedRateThrottle):
    """DRF's scoped throttle, identifying the client by :func:`client_ip`.

    DRF's own ``get_ident`` keys on the whole ``X-Forwarded-For`` header when no
    proxy count is set, and a client controls that header, so every forged value
    opened a fresh bucket.
    """

    def get_ident(self, request):
        return client_ip(request) or super().get_ident(request)
