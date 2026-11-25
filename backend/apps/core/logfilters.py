"""Logging filters."""
import hashlib
import logging

from django.core.cache import cache


class OncePerWindow(logging.Filter):
    """Let the same error through once every ten minutes.

    Error reports go out by email, and a fault that repeats on every request
    would otherwise send one per request. The first report of each error goes
    out; repeats within the window are dropped (they still reach the console
    log, which this filter does not guard). If the cache itself is failing
    (the database is down, say), the report goes out rather than being lost.
    """

    WINDOW_SECONDS = 600

    def filter(self, record):
        key = "error-mail:" + hashlib.sha1(f"{record.name}|{record.msg}".encode()).hexdigest()
        try:
            return cache.add(key, 1, self.WINDOW_SECONDS)
        except Exception:
            return True
