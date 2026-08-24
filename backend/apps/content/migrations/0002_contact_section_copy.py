"""Retitle the contact section.

The form was originally framed as "Request a Quote", but it is the general way
to reach the company — so the heading should say so.

Render's Shell is a paid feature, so there is no way to edit this by hand on
the free plan; shipping it as a migration is what makes the change reach the
live database. It only rewrites rows that still hold the seeded text, so an
edit made in the admin is never overwritten.
"""
from django.db import migrations

OLD_AR_TITLE = "اطلب عرض سعر"
OLD_EN_TITLE = "Request a Quote"

NEW = {
    "title_ar": "تواصل معنا",
    "title_en": "Get in Touch",
    "lead_ar": "أخبرنا كيف نساعدك. نردّ على استفسارات الجهات والشركات خلال 24 ساعة عمل.",
    "lead_en": (
        "Tell us how we can help. Enterprise and government enquiries receive a "
        "response within 24 business hours."
    ),
}


def retitle(apps, schema_editor):
    Section = apps.get_model("content", "Section")
    section = Section.objects.filter(key="contact").first()
    if not section:
        return

    # Only touch copy that has not been edited since it was seeded.
    if section.title_ar == OLD_AR_TITLE:
        section.title_ar = NEW["title_ar"]
        section.lead_ar = NEW["lead_ar"]
    if section.title_en == OLD_EN_TITLE:
        section.title_en = NEW["title_en"]
        section.lead_en = NEW["lead_en"]
    section.save(update_fields=["title_ar", "title_en", "lead_ar", "lead_en"])


def restore(apps, schema_editor):
    Section = apps.get_model("content", "Section")
    section = Section.objects.filter(key="contact").first()
    if not section:
        return
    if section.title_ar == NEW["title_ar"]:
        section.title_ar = OLD_AR_TITLE
    if section.title_en == NEW["title_en"]:
        section.title_en = OLD_EN_TITLE
    section.save(update_fields=["title_ar", "title_en"])


class Migration(migrations.Migration):
    dependencies = [("content", "0001_initial")]
    operations = [migrations.RunPython(retitle, restore)]
