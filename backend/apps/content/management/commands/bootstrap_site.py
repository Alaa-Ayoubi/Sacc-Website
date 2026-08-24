"""Prepare a fresh deployment without needing shell access.

Render's Shell and One-Off Jobs are paid features, so on the free plan there is
no way to run ``seed_content`` or ``createsuperuser`` by hand after a deploy.
This command does both from inside the build, and is safe to run on every
deploy because each step is a no-op once it has been done:

* content is seeded only when the database is empty, so edits made in the admin
  are never overwritten by a later deploy;
* the superuser is created only when no superuser exists, and its password is
  read from the environment rather than baked into the image.

Set ``DJANGO_SUPERUSER_USERNAME``, ``DJANGO_SUPERUSER_EMAIL`` and
``DJANGO_SUPERUSER_PASSWORD`` in the host's dashboard to get an admin account.
Without them the command still seeds content and simply reports that no
superuser was created.
"""
import os

from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.core.management.base import BaseCommand

from apps.content.models import Section, Service


class Command(BaseCommand):
    help = "Seed content and create an admin user on a fresh deployment. Idempotent."

    def add_arguments(self, parser):
        parser.add_argument(
            "--force-seed",
            action="store_true",
            help="Re-run the seed even if content already exists (overwrites seeded fields).",
        )

    def handle(self, *args, **options):
        self._seed(force=options["force_seed"])
        self._superuser()

    def _seed(self, *, force: bool):
        # Services and sections are the backbone of the page; if neither exists
        # this is a first deploy against an empty database.
        already_populated = Service.objects.exists() or Section.objects.exists()

        if already_populated and not force:
            self.stdout.write(
                "Content already present — skipping seed so admin edits are preserved."
            )
            return

        if already_populated:
            self.stdout.write(self.style.WARNING("Re-seeding over existing content."))

        call_command("seed_content", verbosity=0)
        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded content: {Service.objects.count()} services, "
                f"{Section.objects.count()} sections."
            )
        )

    def _superuser(self):
        User = get_user_model()
        if User.objects.filter(is_superuser=True).exists():
            self.stdout.write("Superuser already exists — leaving it alone.")
            return

        username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "").strip()
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "").strip()

        if not username or not password:
            self.stdout.write(
                self.style.WARNING(
                    "No superuser created: set DJANGO_SUPERUSER_USERNAME and "
                    "DJANGO_SUPERUSER_PASSWORD in the host's environment."
                )
            )
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        # The password is never logged, only the fact that an account now exists.
        self.stdout.write(self.style.SUCCESS(f"Created superuser '{username}'."))
