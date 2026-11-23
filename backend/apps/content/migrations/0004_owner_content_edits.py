"""Content edits the owner made while approving the new design.

- The fleet figure ("150+ machines") leaves the hero, with the fleet page.
- The 2018 milestone (fleet modernisation) leaves the journey, for the same reason.
- The ministry is named by its current name, «وزارة البلديات والإسكان» /
  "Ministry of Municipalities and Housing", as its logo carries it.

Shipped as a migration because Render's Shell is a paid feature, so the
database cannot be edited by hand on the free plan. backend/seed/site-data.json
carries the same edits for a fresh database. Each step only acts on content
still as it was seeded, so an edit already made in the admin is left alone.
"""
from django.db import migrations
from django.db.models import F

OLD_MINISTRY = {
    "ar": "وزارة الشؤون البلدية والقروية والإسكان",
    "en": "Ministry of Municipal and Rural Affairs (MOMRA)",
}
NEW_MINISTRY = {
    "ar": "وزارة البلديات والإسكان",
    "en": "Ministry of Municipalities and Housing",
}
FLEET_STAT = {"value": "150+", "label_ar": "معدة ضمن الأسطول", "label_en": "Equipment Fleet"}
FLEET_MILESTONE = {
    "year_ar": "2018",
    "year_en": "2018",
    "title_ar": "تحديث الأسطول",
    "title_en": "Fleet Modernization",
    "description_ar": "استثمار كبير في أسطول المعدات الثقيلة والآليات المتقدمة.",
    "description_en": "Major investment in heavy equipment fleet and advanced machinery.",
}


def _swap_line(text, old, new):
    return "\n".join(new if line.strip() == old else line for line in (text or "").split("\n"))


def forwards(apps, schema_editor):
    Stat = apps.get_model("content", "Stat")
    Milestone = apps.get_model("content", "Milestone")
    Section = apps.get_model("content", "Section")

    Stat.objects.filter(value=FLEET_STAT["value"]).delete()
    Milestone.objects.filter(year_en=FLEET_MILESTONE["year_en"], title_en=FLEET_MILESTONE["title_en"]).delete()

    section = Section.objects.filter(key="certifications").first()
    if section:
        section.list_ar = _swap_line(section.list_ar, OLD_MINISTRY["ar"], NEW_MINISTRY["ar"])
        section.list_en = _swap_line(section.list_en, OLD_MINISTRY["en"], NEW_MINISTRY["en"])
        section.save(update_fields=["list_ar", "list_en"])


def backwards(apps, schema_editor):
    Stat = apps.get_model("content", "Stat")
    Milestone = apps.get_model("content", "Milestone")
    Section = apps.get_model("content", "Section")

    # Back in their places: third of the figures, fourth of the milestones.
    if Stat.objects.exists() and not Stat.objects.filter(value=FLEET_STAT["value"]).exists():
        Stat.objects.filter(order__gte=2).update(order=F("order") + 1)
        Stat.objects.create(order=2, is_published=True, **FLEET_STAT)
    if Milestone.objects.exists() and not Milestone.objects.filter(year_en=FLEET_MILESTONE["year_en"]).exists():
        Milestone.objects.filter(order__gte=3).update(order=F("order") + 1)
        Milestone.objects.create(order=3, is_published=True, **FLEET_MILESTONE)

    section = Section.objects.filter(key="certifications").first()
    if section:
        section.list_ar = _swap_line(section.list_ar, NEW_MINISTRY["ar"], OLD_MINISTRY["ar"])
        section.list_en = _swap_line(section.list_en, NEW_MINISTRY["en"], OLD_MINISTRY["en"])
        section.save(update_fields=["list_ar", "list_en"])


class Migration(migrations.Migration):
    dependencies = [("content", "0003_about_nav_item")]
    operations = [migrations.RunPython(forwards, backwards)]
