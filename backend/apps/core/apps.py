from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.core'
    verbose_name = "Site & branding"

    def ready(self):
        # Content changes rebuild the public site; see apps.core.publish.
        from . import publish

        publish.connect()
