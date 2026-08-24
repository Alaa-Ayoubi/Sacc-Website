"""Tests for the project portfolio endpoints."""
from django.test import TestCase
from django.urls import reverse

from .models import Project, ProjectCategory


class ProjectApiTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.water = ProjectCategory.objects.create(key="water", label_ar="المياه", label_en="Water")
        cls.roads = ProjectCategory.objects.create(
            key="roads", label_ar="الطرق", label_en="Roads", order=1
        )
        cls.project = Project.objects.create(
            category=cls.water,
            title_ar="خط التصريف",
            title_en="ISTP3 Outfall",
            client_en="National Water Company",
            location_en="Al Madinah",
            description_en="Sewerage outfall line.",
            scope_en="Deep excavation\nPipe installation",
            status=Project.Status.COMPLETED,
        )
        Project.objects.create(
            category=cls.roads, title_en="Road widening", status=Project.Status.IN_PROGRESS, order=1
        )
        Project.objects.create(category=cls.water, title_en="Draft", is_published=False, order=2)

    def test_only_published_projects_are_listed(self):
        response = self.client.get(reverse("v1:project-list"))
        self.assertEqual(response.status_code, 200)
        titles = [p["title_en"] for p in response.json()["results"]]
        self.assertEqual(titles, ["ISTP3 Outfall", "Road widening"])

    def test_category_filter(self):
        response = self.client.get(reverse("v1:project-list"), {"category": "water"})
        self.assertEqual([p["title_en"] for p in response.json()["results"]], ["ISTP3 Outfall"])

    def test_all_category_is_a_no_op(self):
        response = self.client.get(reverse("v1:project-list"), {"category": "all"})
        self.assertEqual(response.json()["count"], 2)

    def test_localized_shape_matches_the_site_bundle(self):
        response = self.client.get(reverse("v1:project-list"), {"lang": "ar", "category": "water"})
        item = response.json()["results"][0]
        self.assertEqual(
            set(item),
            {"id", "key", "title", "location", "category", "client", "status", "desc", "scope", "image"},
        )
        self.assertEqual(item["title"], "خط التصريف")
        self.assertEqual(item["status"], "مكتمل")
        self.assertEqual(item["category"], "المياه")

    def test_scope_is_returned_as_an_array(self):
        response = self.client.get(reverse("v1:project-detail", args=[self.project.pk]))
        self.assertEqual(
            response.json()["scope_en"], ["Deep excavation", "Pipe installation"]
        )

    def test_categories_report_published_project_counts(self):
        response = self.client.get(reverse("v1:project-category-list"))
        counts = {c["key"]: c["project_count"] for c in response.json()}
        self.assertEqual(counts, {"water": 1, "roads": 1})
