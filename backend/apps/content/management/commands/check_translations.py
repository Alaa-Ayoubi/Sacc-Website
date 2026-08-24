"""Report content that is missing a translation.

The API falls back to the other language when one side is blank, which keeps
the site from rendering an empty heading — but it also means a half-translated
edit looks fine in production and quietly ships English text to Arabic readers.
This command makes that visible.

Run it after a content edit, or in CI with ``--fail-on-missing`` to stop a
deploy that would ship untranslated copy.
"""
from django.apps import apps
from django.core.management.base import BaseCommand, CommandError

from apps.core.models import TranslatableModel

LANGUAGE_NAMES = {"ar": "Arabic", "en": "English"}


class Command(BaseCommand):
    help = "List content fields that are missing an Arabic or English translation."

    def add_arguments(self, parser):
        parser.add_argument(
            "--lang",
            choices=["ar", "en", "both"],
            default="both",
            help="Which language to check for gaps. Default: both.",
        )
        parser.add_argument(
            "--fail-on-missing",
            action="store_true",
            help="Exit non-zero if anything is missing, for use in CI.",
        )

    def handle(self, *args, **options):
        languages = ["ar", "en"] if options["lang"] == "both" else [options["lang"]]
        gaps = []
        checked = 0

        for model in self._translatable_models():
            fields = model.translatable_fields
            for obj in model.objects.all():
                for field in fields:
                    values = {
                        lang: (getattr(obj, f"{field}_{lang}", "") or "").strip()
                        for lang in ("ar", "en")
                    }
                    # A field left blank in both languages is simply unused.
                    if not any(values.values()):
                        continue
                    checked += 1
                    for lang in languages:
                        if not values[lang]:
                            other = "en" if lang == "ar" else "ar"
                            gaps.append((model, obj, field, lang, values[other]))

        self._report(checked, gaps)

        if gaps and options["fail_on_missing"]:
            raise CommandError(f"{len(gaps)} translation(s) missing.")

    def _translatable_models(self):
        for model in apps.get_models():
            if issubclass(model, TranslatableModel) and getattr(
                model, "translatable_fields", ()
            ):
                yield model

    def _report(self, checked, gaps):
        if not gaps:
            self.stdout.write(
                self.style.SUCCESS(
                    f"All {checked} translatable value(s) are present in both languages."
                )
            )
            return

        by_model: dict[str, list] = {}
        for model, obj, field, lang, fallback in gaps:
            by_model.setdefault(model._meta.verbose_name.title(), []).append(
                (obj, field, lang, fallback)
            )

        for model_name, rows in sorted(by_model.items()):
            self.stdout.write(self.style.WARNING(f"\n{model_name}"))
            for obj, field, lang, fallback in rows:
                snippet = fallback[:50] + ("…" if len(fallback) > 50 else "")
                self.stdout.write(
                    f"  #{obj.pk} {field}: missing {LANGUAGE_NAMES[lang]}"
                    f'  (falls back to "{snippet}")'
                )

        self.stdout.write(
            self.style.WARNING(
                f"\n{len(gaps)} of {checked} translatable value(s) are missing a translation."
            )
        )
