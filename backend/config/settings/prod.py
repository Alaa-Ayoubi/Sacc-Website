"""Production settings.

Fails loudly rather than silently falling back to insecure defaults: SECRET_KEY,
ALLOWED_HOSTS and DATABASE_URL must all be present in the environment.
"""
from .base import *  # noqa: F401,F403
from .base import env

DEBUG = False

SECRET_KEY = env("SECRET_KEY")
ALLOWED_HOSTS = env("ALLOWED_HOSTS")

# Render assigns each service an <name>.onrender.com hostname; adding it here
# means health checks and the pre-DNS preview URL work without extra config.
RENDER_EXTERNAL_HOSTNAME = env("RENDER_EXTERNAL_HOSTNAME", default="")
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS = [*ALLOWED_HOSTS, RENDER_EXTERNAL_HOSTNAME]
    CSRF_TRUSTED_ORIGINS = [
        *env("CSRF_TRUSTED_ORIGINS"),
        f"https://{RENDER_EXTERNAL_HOSTNAME}",
    ]

SECURE_SSL_REDIRECT = env.bool("SECURE_SSL_REDIRECT", default=True)
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_HSTS_SECONDS = env.int("SECURE_HSTS_SECONDS", default=31536000)
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = "DENY"

# CORS must be an explicit allowlist in production.
CORS_ALLOW_ALL_ORIGINS = False
