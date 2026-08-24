"""Assemble the whole public payload in one pass.

The site holds both languages at once and toggles between them client-side
without refetching, so the API mirrors that: one document containing ``company``,
``images`` and a complete ``ar`` and ``en`` block, keyed exactly like the
``window.SACC_SITE`` object the static build shipped with. That makes the
backend a drop-in replacement for ``site-data.js``.

Every queryset is evaluated once and reused for both languages, so the whole
bundle costs a fixed ~12 queries regardless of how much content exists.
"""
from __future__ import annotations

from apps.careers.models import CareerBenefit, JobOpening
from apps.core.models import SiteImage, SiteSettings
from apps.leads.models import ProjectType
from apps.projects.models import Project, ProjectCategory

from .labels import UI_LABELS
from .models import (
    Certification,
    CoreValue,
    EquipmentFeature,
    HeroSection,
    Leader,
    Milestone,
    NavItem,
    Section,
    Service,
    Stat,
)

LANGUAGES = ("ar", "en")


def _sections() -> dict[str, Section]:
    return {section.key: section for section in Section.objects.all()}


def _section(sections: dict[str, Section], key: str) -> Section:
    """Return the stored section, or an unsaved blank one so a missing row
    renders as empty strings rather than raising."""
    return sections.get(key) or Section(key=key)


def _images() -> dict:
    by_slot: dict[str, list[SiteImage]] = {}
    for image in SiteImage.objects.all():
        by_slot.setdefault(image.slot, []).append(image)

    def first(slot: str) -> str:
        items = by_slot.get(slot) or []
        return items[0].src if items else ""

    return {
        "hero": first(SiteImage.Slot.HERO),
        "equipment": first(SiteImage.Slot.EQUIPMENT),
        "water": first(SiteImage.Slot.WATER),
        "urban": first(SiteImage.Slot.URBAN),
        "careers": first(SiteImage.Slot.CAREERS),
        "chairman": first(SiteImage.Slot.CHAIRMAN),
        "gm": first(SiteImage.Slot.GM),
        "projects": [i.src for i in by_slot.get(SiteImage.Slot.PROJECT, [])],
    }


def _company(settings_row: SiteSettings) -> dict:
    return {
        "phone": settings_row.phone,
        "mobile": settings_row.mobile,
        "email": settings_row.email,
        "cr": settings_row.commercial_registration,
        "logo": settings_row.logo_src(),
        "mark": settings_row.mark_src(),
    }


def _language_block(lang: str, data: dict) -> dict:
    labels = UI_LABELS[lang]
    sections = data["sections"]
    settings_row: SiteSettings = data["settings"]
    hero: HeroSection = data["hero"]

    intro = _section(sections, Section.Key.INTRO)
    why = _section(sections, Section.Key.WHY)
    services = _section(sections, Section.Key.SERVICES)
    projects = _section(sections, Section.Key.PROJECTS)
    equipment = _section(sections, Section.Key.EQUIPMENT)
    certifications = _section(sections, Section.Key.CERTIFICATIONS)
    journey = _section(sections, Section.Key.JOURNEY)
    leadership = _section(sections, Section.Key.LEADERSHIP)
    contact = _section(sections, Section.Key.CONTACT)
    careers = _section(sections, Section.Key.CAREERS)
    footer = _section(sections, Section.Key.FOOTER)

    return {
        "dir": labels["dir"],
        "langBtn": labels["langBtn"],
        "brandLine": settings_row.tr("brand_line", lang),
        "nav": [
            {"id": item.anchor, "label": item.tr("label", lang)}
            for item in data["nav_items"]
        ],
        "navCta": labels["navCta"],
        "navCareers": labels["navCareers"],
        "backHome": labels["backHome"],
        "hero": {
            "badge": hero.tr("badge", lang),
            "title": hero.tr("title", lang),
            "lead": hero.tr("lead", lang),
            "cta1": hero.tr("cta_primary", lang),
            "cta2": hero.tr("cta_secondary", lang),
            "scroll": hero.tr("scroll_hint", lang),
        },
        "stats": [
            {"value": stat.value, "label": stat.tr("label", lang)}
            for stat in data["stats"]
        ],
        "intro": {
            "eyebrow": intro.tr("eyebrow", lang),
            "title": intro.tr("title", lang),
            "p1": intro.tr("body_1", lang),
            "p2": intro.tr("body_2", lang),
            "p3": intro.tr("body_3", lang),
        },
        "why": {
            "title": why.tr("title", lang),
            "lead": why.tr("lead", lang),
            "items": why.tr_list("list", lang),
        },
        "services": {
            "eyebrow": services.tr("eyebrow", lang),
            "title": services.tr("title", lang),
            "lead": services.tr("lead", lang),
            "capabilitiesHeading": labels["services"]["capabilitiesHeading"],
            "inquireCta": labels["services"]["inquireCta"],
            "items": [
                {
                    "icon": service.icon,
                    "title": service.tr("title", lang),
                    "desc": service.tr("description", lang),
                    "capabilities": service.tr_list("capabilities", lang),
                }
                for service in data["services"]
            ],
        },
        "projects": {
            "eyebrow": projects.tr("eyebrow", lang),
            "title": projects.tr("title", lang),
            "lead": projects.tr("lead", lang),
            "labels": labels["projects"]["labels"],
            "expand": labels["projects"]["expand"],
            "collapse": labels["projects"]["collapse"],
            "detailsCta": labels["projects"]["detailsCta"],
            "empty": labels["projects"]["empty"],
            "categories": [
                {"key": "all", "label": labels["projects"]["allLabel"]},
                *(
                    {"key": category.key, "label": category.tr("label", lang)}
                    for category in data["project_categories"]
                ),
            ],
            "items": [
                {
                    "id": project.pk,
                    "key": project.category.key,
                    "title": project.tr("title", lang),
                    "location": project.tr("location", lang),
                    "category": project.category.tr("label", lang),
                    "client": project.tr("client", lang),
                    "status": project.status_label(lang),
                    "desc": project.tr("description", lang),
                    "scope": project.tr_list("scope", lang),
                    "image": project.image_src,
                }
                for project in data["projects"]
            ],
            "statLabels": labels["projects"]["statLabels"],
        },
        "equipment": {
            "eyebrow": equipment.tr("eyebrow", lang),
            "title": equipment.tr("title", lang),
            "lead": equipment.tr("lead", lang),
            "p1": equipment.tr("body_1", lang),
            "p2": equipment.tr("body_2", lang),
            "cta": equipment.tr("cta", lang),
            "categoriesHeading": equipment.tr("list_heading", lang),
            "categories": equipment.tr_list("list", lang),
            "supportHeading": labels["equipment"]["supportHeading"],
            "features": [
                {
                    "icon": feature.icon,
                    "title": feature.tr("title", lang),
                    "desc": feature.tr("description", lang),
                }
                for feature in data["equipment_features"]
            ],
        },
        "certifications": {
            "eyebrow": certifications.tr("eyebrow", lang),
            "title": certifications.tr("title", lang),
            "lead": certifications.tr("lead", lang),
            "commitmentTitle": certifications.tr("callout_title", lang),
            "commitmentBody": certifications.tr("callout_body", lang),
            "isoHeading": labels["certifications"]["isoHeading"],
            "iso": [
                {
                    "title": certificate.tr("title", lang),
                    "desc": certificate.tr("description", lang),
                }
                for certificate in data["certifications"]
            ],
            "approvalsHeading": certifications.tr("list_heading", lang),
            "approvals": certifications.tr_list("list", lang),
            "cta": certifications.tr("cta", lang),
        },
        "journey": {
            "eyebrow": journey.tr("eyebrow", lang),
            "title": journey.tr("title", lang),
            "lead": journey.tr("lead", lang),
            "milestones": [
                {
                    "year": milestone.tr("year", lang),
                    "title": milestone.tr("title", lang),
                    "desc": milestone.tr("description", lang),
                }
                for milestone in data["milestones"]
            ],
            "valuesTitle": labels["journey"]["valuesTitle"],
            "values": [
                {"title": value.tr("title", lang), "desc": value.tr("description", lang)}
                for value in data["values"]
            ],
        },
        "leadership": {
            "eyebrow": leadership.tr("eyebrow", lang),
            "title": leadership.tr("title", lang),
            "lead": leadership.tr("lead", lang),
            "expertiseHeading": labels["leadership"]["expertiseHeading"],
            "quoteTitle": labels["leadership"]["quoteTitle"],
            "quote": leadership.tr("callout_body", lang),
            "leaders": [
                {
                    "name": leader.tr("name", lang),
                    "title": leader.tr("title", lang),
                    "bio": leader.tr("bio", lang),
                    "expertise": leader.tr_list("expertise", lang),
                    "photo": leader.photo_src,
                }
                for leader in data["leaders"]
            ],
        },
        "contact": {
            "eyebrow": contact.tr("eyebrow", lang),
            "title": contact.tr("title", lang),
            "lead": contact.tr("lead", lang),
            "officeHeading": labels["contact"]["officeHeading"],
            "address": settings_row.tr("address", lang),
            "hoursHeading": contact.tr("list_heading", lang),
            "hours": contact.tr_list("list", lang),
            "crLabel": labels["contact"]["crLabel"],
            "fields": labels["contact"]["fields"],
            "placeholders": labels["contact"]["placeholders"],
            "types": [
                project_type.tr("label", lang) for project_type in data["project_types"]
            ],
            "typeOptions": [
                {"key": project_type.key, "label": project_type.tr("label", lang)}
                for project_type in data["project_types"]
            ],
            "submit": labels["contact"]["submit"],
            "submitting": labels["contact"]["submitting"],
            "success": labels["contact"]["success"],
            "failure": labels["contact"]["failure"],
            "errors": labels["contact"]["errors"],
        },
        "careers": {
            "badge": careers.tr("eyebrow", lang),
            "title": careers.tr("title", lang),
            "lead": careers.tr("lead", lang),
            "cta": careers.tr("cta", lang),
            "whyTitle": labels["careers"]["whyTitle"],
            "why": [
                {
                    "icon": benefit.icon,
                    "title": benefit.tr("title", lang),
                    "desc": benefit.tr("description", lang),
                }
                for benefit in data["career_benefits"]
            ],
            "rolesTitle": labels["careers"]["rolesTitle"],
            "rolesLead": labels["careers"]["rolesLead"],
            "roles": [
                {
                    "slug": opening.slug,
                    "title": opening.tr("title", lang),
                    "dept": opening.tr("department", lang),
                    "location": opening.tr("location", lang),
                    "type": opening.tr("employment_type", lang),
                    "exp": opening.tr("experience", lang),
                }
                for opening in data["openings"]
            ],
            "applyTitle": labels["careers"]["applyTitle"],
            "applyLead": labels["careers"]["applyLead"],
            "fields": labels["careers"]["fields"],
            "cvLink": labels["careers"]["cvLink"],
            "cvUpload": labels["careers"]["cvUpload"],
            "cvUploadBtn": labels["careers"]["cvUploadBtn"],
            "cvHint": labels["careers"]["cvHint"],
            "cvNone": labels["careers"]["cvNone"],
            "placeholders": labels["careers"]["placeholders"],
            "submit": labels["careers"]["submit"],
            "submitting": labels["careers"]["submitting"],
            "success": labels["careers"]["success"],
            "failure": labels["careers"]["failure"],
            "errors": labels["careers"]["errors"],
            "otherRole": labels["careers"]["otherRole"],
        },
        "footer": {
            "tagline": settings_row.tr("tagline", lang),
            "quickLinks": labels["footer"]["quickLinks"],
            "certsHeading": footer.tr("list_heading", lang),
            "certs": footer.tr_list("list", lang),
            "contactHeading": labels["footer"]["contactHeading"],
            "rights": settings_row.tr("rights", lang),
        },
    }


def build_site_bundle() -> dict:
    """Return the full bilingual payload, shaped like ``window.SACC_SITE``."""
    settings_row = SiteSettings.load()
    data = {
        "settings": settings_row,
        "hero": HeroSection.load(),
        "sections": _sections(),
        "nav_items": list(NavItem.objects.published()),
        "stats": list(Stat.objects.published()),
        "services": list(Service.objects.published()),
        "equipment_features": list(EquipmentFeature.objects.published()),
        "certifications": list(Certification.objects.published()),
        "milestones": list(Milestone.objects.published()),
        "values": list(CoreValue.objects.published()),
        "leaders": list(Leader.objects.published()),
        "project_categories": list(ProjectCategory.objects.published()),
        "projects": list(
            Project.objects.published().select_related("category")
        ),
        "project_types": list(ProjectType.objects.published()),
        "career_benefits": list(CareerBenefit.objects.published()),
        "openings": list(JobOpening.objects.published()),
    }

    return {
        "company": _company(settings_row),
        "images": _images(),
        **{lang: _language_block(lang, data) for lang in LANGUAGES},
    }
