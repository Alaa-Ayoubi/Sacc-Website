"""A single error envelope for every API failure.

The frontend shows one message per field plus one banner, so responses always
carry ``detail`` (a human-readable summary) and ``errors`` (field -> messages).
"""
import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler as drf_exception_handler

logger = logging.getLogger(__name__)


def api_exception_handler(exc, context):
    response = drf_exception_handler(exc, context)
    if response is None:
        # Unhandled server error: log it with the stack, and tell the caller
        # nothing that would leak internals.
        logger.exception("Unhandled API error in %s", context.get("view"))
        return Response(
            {"detail": "An unexpected error occurred.", "errors": {}},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    data = response.data
    if isinstance(data, dict) and "detail" in data and len(data) == 1:
        response.data = {"detail": str(data["detail"]), "errors": {}}
    elif isinstance(data, dict):
        errors = {
            field: [str(m) for m in messages] if isinstance(messages, (list, tuple)) else [str(messages)]
            for field, messages in data.items()
        }
        response.data = {"detail": "Validation failed.", "errors": errors}
    elif isinstance(data, list):
        response.data = {"detail": "Validation failed.", "errors": {"non_field_errors": [str(m) for m in data]}}

    return response
