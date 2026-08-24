"""CSV export for the admin inboxes.

Sales and HR both want to pull a selection into a spreadsheet, so the action is
built once and parameterised with the columns each model should emit.
"""
import csv

from django.contrib import admin
from django.http import HttpResponse
from django.utils import timezone


def export_as_csv_action(fields: tuple[str, ...], filename_prefix: str, description: str):
    """Build an admin action that writes the selected rows to a CSV download.

    ``fields`` may name model fields, properties or admin methods; each is
    resolved on the instance, and callables are invoked.
    """

    @admin.action(description=description)
    def export_as_csv(modeladmin, request, queryset):
        stamp = timezone.localtime().strftime("%Y%m%d-%H%M")
        response = HttpResponse(content_type="text/csv; charset=utf-8")
        response["Content-Disposition"] = (
            f'attachment; filename="{filename_prefix}-{stamp}.csv"'
        )
        # Excel needs the BOM to read Arabic columns as UTF-8.
        response.write("﻿")

        writer = csv.writer(response)
        writer.writerow([field.replace("_", " ").title() for field in fields])
        for obj in queryset:
            row = []
            for field in fields:
                value = getattr(obj, field, "")
                if callable(value):
                    value = value()
                row.append("" if value is None else str(value))
            writer.writerow(row)
        return response

    return export_as_csv
