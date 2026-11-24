"""Serve the company's photographs from the site itself.

Every photograph pointed at the image server of the previous site's host
(Hostinger). Cancelling that site, or moving the domain, would have removed
every project, leader and service photograph at once. The files now ship with
the site under /assets/photos/site/, as WebP, and the stored addresses follow.
Only addresses that still point at the old host are changed; anything an
editor has since uploaded or typed is left alone.
"""
from django.db import migrations

CDN = "https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/"
LOCAL = "/assets/photos/site/"
FILES = [
    "0ee767b1ad6a6c135b51e48993a3465f.jpg",
    "128edc4885024e1cbd744761744d201e.jpg",
    "170e3ecc615f477a1f6c16510fdc0943.jpg",
    "54ad47034b10af4059ad230ab0ad21d9.jpg",
    "707fe33ae62954361a266d7ce41ab386.png",
    "74d65ac0771e13d4ae20d9c36da6a002.jpg",
    "9ca88518e2da2ef0f72ea8ba1ef7c485.jpg",
    "a08bd408fb9cb46035fe88b4d10df759.webp",
    "c277183c582c97537e04c923bbe697a7.jpg",
    "dbf9273f0e607726fb87885bddfdffa1.jpg",
    "f90aea0ed9efb167c5e0f909c0dfd546.png",
    "fe90b22a280af627db8dde84d95bb038.jpg",
]
NEW = {CDN + name: LOCAL + name.rsplit(".", 1)[0] + ".webp" for name in FILES}
OLD = {new: old for old, new in NEW.items()}

FIELDS = [
    ("content", "Service", "image_url"),
    ("content", "Leader", "photo_url"),
    ("projects", "Project", "image_url"),
    ("core", "SiteImage", "external_url"),
]


def _rewrite(apps, mapping):
    for app, name, field in FIELDS:
        Model = apps.get_model(app, name)
        for pk, value in Model.objects.values_list("pk", field):
            if value in mapping:
                Model.objects.filter(pk=pk).update(**{field: mapping[value]})


def forwards(apps, schema_editor):
    _rewrite(apps, NEW)


def backwards(apps, schema_editor):
    _rewrite(apps, OLD)


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0007_renumber_stats_and_milestones"),
        ("projects", "0001_initial"),
        ("core", "0001_initial"),
    ]

    operations = [migrations.RunPython(forwards, backwards)]
