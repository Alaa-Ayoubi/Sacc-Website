"""Close the gaps 0004 left in the order of figures and milestones.

0004 deleted the fleet figure and the 2018 milestone without renumbering, so
production holds figures at 0, 1, 4 and milestones at 0, 1, 2, 5, 6. The site
only sorts by order, so it shows them correctly, but `seed_content` (and
`bootstrap_site --force-seed`) matches rows by position and would then create
a second row at each missing position: «100%» twice, 2021 twice.

This numbers each list 0..n-1 in its current order. Nothing visible changes.
There is nothing to undo: the old numbers carried no meaning beyond their order.
"""
from django.db import migrations, models


def renumber(apps, schema_editor):
    for name in ("Stat", "Milestone"):
        Model = apps.get_model("content", name)
        for index, row in enumerate(Model.objects.order_by("order", "pk")):
            if row.order != index:
                Model.objects.filter(pk=row.pk).update(order=index)


class Migration(migrations.Migration):
    dependencies = [("content", "0006_service_photographs")]
    operations = [
        migrations.RunPython(renumber, migrations.RunPython.noop),
        # The figure's help text no longer gives the fleet count as its example.
        migrations.AlterField(
            model_name="stat",
            name="value",
            field=models.CharField(help_text="e.g. '2007', '35+', '100%'.", max_length=32),
        ),
    ]
