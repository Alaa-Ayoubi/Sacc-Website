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
    """Best-effort client IP, honouring a single proxy hop."""
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "")
    if forwarded:
        return forwarded.split(",")[0].strip() or None
    return request.META.get("REMOTE_ADDR") or None
