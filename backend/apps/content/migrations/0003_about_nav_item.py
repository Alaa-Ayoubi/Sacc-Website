"""Add the About link to the site navigation.

The approved design opens the navigation with "من نحن" / "About Us". The seeded
content did not include it, so the About page existed with no way to reach it
from the header.

Shipped as a migration because Render's Shell is a paid feature — there is no
way to add the row by hand on the free plan. Idempotent: an existing About row
is left alone.
"""
from django.db import migrations
from django.db.models import F


def add_about(apps, schema_editor):
    NavItem = apps.get_model("content", "NavItem")
    if NavItem.objects.filter(anchor="about").exists():
        return

    # It leads the navigation, so everything else shifts down one.
    NavItem.objects.update(order=F("order") + 1)
    NavItem.objects.create(
        anchor="about",
        label_ar="من نحن",
        label_en="About Us",
        order=0,
        is_published=True,
    )


def remove_about(apps, schema_editor):
    NavItem = apps.get_model("content", "NavItem")
    if not NavItem.objects.filter(anchor="about").exists():
        return
    NavItem.objects.filter(anchor="about").delete()
    NavItem.objects.update(order=F("order") - 1)


class Migration(migrations.Migration):
    dependencies = [("content", "0002_contact_section_copy")]
    operations = [migrations.RunPython(add_about, remove_about)]
