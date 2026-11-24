"""Each discipline gets a photograph of the company's own work.

The owner asked for the services page to show a photograph per discipline and
confirmed these are the company's own images, as the previous site carried
them on its image host. Water and sewerage, roads and landscaping use the
photographs of the company's projects in those categories; bridges and
tunnels has none yet (the previous site's was a stock image) and stays
without one until the owner supplies it.

Adds an upload field and an address field (as projects have), then fills the
address for each discipline that has none, keyed by its icon, so an image
already set in the admin is left alone. Reverses by clearing only these.
"""
from django.db import migrations, models

CDN = "https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/"
PHOTOS = {
    "Droplets": CDN + "170e3ecc615f477a1f6c16510fdc0943.jpg",
    "CloudRain": CDN + "9ca88518e2da2ef0f72ea8ba1ef7c485.jpg",
    "Zap": CDN + "74d65ac0771e13d4ae20d9c36da6a002.jpg",
    "Route": CDN + "dbf9273f0e607726fb87885bddfdffa1.jpg",
    "Building2": CDN + "fe90b22a280af627db8dde84d95bb038.jpg",
    "ShieldCheck": CDN + "a08bd408fb9cb46035fe88b4d10df759.webp",
    "Truck": CDN + "c277183c582c97537e04c923bbe697a7.jpg",
    "Settings": CDN + "128edc4885024e1cbd744761744d201e.jpg",
}


def forwards(apps, schema_editor):
    Service = apps.get_model("content", "Service")
    for service in Service.objects.filter(image_url=""):
        url = PHOTOS.get(service.icon)
        if url:
            service.image_url = url
            service.save(update_fields=["image_url"])


def backwards(apps, schema_editor):
    Service = apps.get_model("content", "Service")
    for icon, url in PHOTOS.items():
        Service.objects.filter(icon=icon, image_url=url).update(image_url="")


class Migration(migrations.Migration):
    dependencies = [("content", "0005_fleet_paragraph_without_count")]
    operations = [
        migrations.AddField(
            model_name="service",
            name="image",
            field=models.ImageField(blank=True, upload_to="services/"),
        ),
        migrations.AddField(
            model_name="service",
            name="image_url",
            field=models.CharField(blank=True, help_text="Used when no image is uploaded.", max_length=500),
        ),
        migrations.RunPython(forwards, backwards),
    ]
