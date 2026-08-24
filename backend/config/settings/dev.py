"""Local development settings."""
from .base import *  # noqa: F401,F403
from .base import env

DEBUG = True
ALLOWED_HOSTS = ["*"]

# The static frontend is opened straight off disk or from a simple file server,
# so during development any origin may call the API.
CORS_ALLOW_ALL_ORIGINS = True

# Serve uploaded CVs through Django itself in development.
STORAGES["staticfiles"] = {  # noqa: F405
    "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"
}

EMAIL_BACKEND = env(
    "EMAIL_BACKEND", default="django.core.mail.backends.console.EmailBackend"
)
