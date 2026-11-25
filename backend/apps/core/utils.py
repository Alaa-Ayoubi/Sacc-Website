"""Small helpers shared across apps."""
from __future__ import annotations


def split_lines(value: str | None) -> list[str]:
    """Turn a multi-line textarea into a list, dropping blanks and stray whitespace.

    Short bullet lists (capabilities, scope items, approvals) are stored as one
    item per line rather than as child tables — far easier to edit in the admin
    and the site only ever renders them as a flat list.
    """
    if not value:
        return []
    return [line.strip() for line in value.splitlines() if line.strip()]


def client_ip(request) -> str | None:
    """The visitor's IP, as the hosting edge saw it — never as the visitor claims it.

    Render sits behind Cloudflare, which overwrites ``CF-Connecting-IP`` with the
    address it received the request from, so a client cannot forge it. Render's
    own proxy keeps any ``X-Forwarded-For`` the client sent and appends to it, so
    only its last entry is trustworthy; the first one is whatever the client
    wrote. Throttling keys on this, so trusting the first entry would let anyone
    bypass it by sending a new header with every request.
    """
    from django.conf import settings

    header = getattr(settings, "CLIENT_IP_HEADER", "")
    if header:
        value = request.META.get("HTTP_" + header.upper().replace("-", "_"), "").strip()
        if value:
            return value
    forwarded = [p.strip() for p in request.META.get("HTTP_X_FORWARDED_FOR", "").split(",") if p.strip()]
    if forwarded:
        return forwarded[-1]
    return request.META.get("REMOTE_ADDR") or None
