"""The fleet page returns without the fleet's size.

The owner removed the equipment count from the site. The figure ("150+") left
the hero in 0004; this takes the same number out of the fleet page's first
paragraph, «يضم أكثر من 150 آلة ومركبة إنشاء ثقيلة» / "of over 150 heavy
construction machines and vehicles", and leaves the rest of the sentence as
written.

Shipped as a migration because Render's free plan has no shell;
backend/seed/site-data.json carries the same edit for a fresh database. It
acts only on the paragraph still as seeded, so an edit made in the admin is
left alone, and it reverses cleanly.
"""
from django.db import migrations

BODY = {
    "ar": (
        "تمتلك سنا الأوائل وتشغّل أسطولاً متكاملاً يضم أكثر من 150 آلة ومركبة إنشاء ثقيلة، ويضمن هذا الاستثمار الكبير جاهزيتنا التشغيلية ويلغي الاعتماد على التأجير من الغير في المراحل الحرجة من المشاريع.",
        "تمتلك سنا الأوائل وتشغّل أسطولاً متكاملاً من آلات ومركبات الإنشاء الثقيلة، ويضمن هذا الاستثمار الكبير جاهزيتنا التشغيلية ويلغي الاعتماد على التأجير من الغير في المراحل الحرجة من المشاريع.",
    ),
    "en": (
        "SACC owns and operates a comprehensive fleet of over 150 heavy construction machines and vehicles. This significant investment guarantees our operational readiness and eliminates dependency on third-party rentals for critical project phases.",
        "SACC owns and operates a comprehensive fleet of heavy construction machines and vehicles. This significant investment guarantees our operational readiness and eliminates dependency on third-party rentals for critical project phases.",
    ),
}


def _swap(apps, frm, to):
    Section = apps.get_model("content", "Section")
    section = Section.objects.filter(key="equipment").first()
    if not section:
        return
    for lang in ("ar", "en"):
        field = f"body_1_{lang}"
        if getattr(section, field) == BODY[lang][frm]:
            setattr(section, field, BODY[lang][to])
    section.save(update_fields=["body_1_ar", "body_1_en"])


def forwards(apps, schema_editor):
    _swap(apps, 0, 1)


def backwards(apps, schema_editor):
    _swap(apps, 1, 0)


class Migration(migrations.Migration):
    dependencies = [("content", "0004_owner_content_edits")]
    operations = [migrations.RunPython(forwards, backwards)]
