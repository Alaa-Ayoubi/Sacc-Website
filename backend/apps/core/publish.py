"""Keep the public site in step with the admin.

The site is prerendered from the content at build time, and that build is the
only copy visitors and search engines see. So whenever content changes, two
things follow, after the change is committed:

1. the cached ``/api/v1/site/`` payload is dropped, so the next build reads the
   new content rather than a five-minute-old copy;
2. the static site's Render deploy hook is called, which rebuilds the site from
   that content. Saving several things in a row queues builds; each one reads
   the content as it is when it runs, so the last one always carries every edit.

The hook address is a secret (anyone holding it can start builds), so it comes
from the RENDER_DEPLOY_HOOK_URL environment variable and is never committed.
Without it, nothing is called: local development and tests stay offline.
"""
from __future__ import annotations

import logging
import threading
import urllib.request

from django.conf import settings
from django.core.cache import cache
from django.db import DatabaseError, transaction
from django.db.models.signals import post_delete, post_save

logger = logging.getLogger(__name__)

BUNDLE_CACHE_KEYS = ("site-bundle:all", "site-bundle:ar", "site-bundle:en")

# Everything the site bundle is built from. Enquiries and job applications are
# not content: receiving one must never rebuild the site.
CONTENT_APPS = {"content", "projects"}
CONTENT_MODELS = {
    ("core", "sitesettings"),
    ("core", "siteimage"),
    ("careers", "careerbenefit"),
    ("careers", "jobopening"),
    ("leads", "projecttype"),
}


def is_content(model) -> bool:
    meta = model._meta
    return meta.app_label in CONTENT_APPS or (meta.app_label, meta.model_name) in CONTENT_MODELS


def _call_hook(url: str) -> None:
    try:
        request = urllib.request.Request(url, method="POST", data=b"")
        with urllib.request.urlopen(request, timeout=10) as response:  # noqa: S310 - fixed https address from settings
            logger.info("Site rebuild requested (%s)", response.status)
    except Exception:
        logger.exception("Could not request a site rebuild")


def publish() -> None:
    """Drop the cached bundle and ask the static site to rebuild."""
    try:
        cache.delete_many(BUNDLE_CACHE_KEYS)
    except DatabaseError:
        # A cache that cannot be cleared must never undo the save that came
        # before it; the entry still expires on its own.
        logger.exception("Could not drop the cached site bundle")
    url = getattr(settings, "RENDER_DEPLOY_HOOK_URL", "")
    if url:
        # Off the request thread: the admin never waits on Render.
        threading.Thread(target=_call_hook, args=(url,), daemon=True).start()


def _on_change(sender, **kwargs):
    # Migrations save through historical models (module "__fake__"), before the
    # cache table even exists; fixtures load raw. Neither is an editor's change.
    if kwargs.get("raw") or sender.__module__ == "__fake__" or not is_content(sender):
        return
    transaction.on_commit(publish)


def connect() -> None:
    post_save.connect(_on_change, dispatch_uid="sacc-publish-save")
    post_delete.connect(_on_change, dispatch_uid="sacc-publish-delete")
