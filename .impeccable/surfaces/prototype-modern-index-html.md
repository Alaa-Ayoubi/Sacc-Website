---
version: 1
slug: "prototype-modern-index-html"
primary_target: "prototype-modern/index.html"
related_targets: []
---

# Surface brief: SACC site prototype 4 — modern institutional

Scope: interactive standalone prototype of the whole bilingual site (Home, About, Services + 9 discipline pages, Projects + 6 project pages, Equipment, Certifications, Journey, Leadership, Contact, Careers), Arabic-first with English. Mode: Persuade. Integrates into frontend/ only after the owner approves.

Owner's words for this proposal: "formal, orderly, contemporary and modern, and expressing the field the company works in." Owner confirmed the outline: a clean institutional design on an ordered grid with generous white space and strong clear type; calm colours from the logo (deep teal with an orange touch); the field shown through large clear project and equipment photographs and precise engineering line drawings per discipline in one consistent style; home = hero photograph with a clear title, then disciplines, then selected projects with photographs, then approvals; no repetition; one quote action. Proposals 2 (Hejazi) and 3 (signboard) were rejected; proposal 1 (street section) stays as the reference build.

Constraints: every fact in one place (owner rule); one quote action in the masthead pre-filling the single contact form from discipline/project pages; chairman quote on Leadership only; About with a single title; footer = brand + sitemap. Logo never redrawn or recoloured (white wordmark: dark grounds only). Content verbatim from frontend/src/data/site-content.json. Photographs only from the company's own site/CDN (content.images); the local stock photos are not used. Fonts self-hosted.

## Direction contract

THESIS: A modern institutional contractor site that lets the work speak: real project photographs and exact line drawings of the networks SACC builds, set on an orderly grid. It refuses decoration, gimmicks and repeated blocks.

OWN-WORLD: White and cool light-grey grounds, deep logo teal for the masthead, footer and key bands, logo orange as the one action colour. A single line-drawing system (2px strokes, technical section views) for the nine disciplines. Wide photographs with a thin caption rule. Square-cornered, hairline-ruled modules on a 12-column grid. Arabic and Latin type with real presence; tabular figures.

STORY: The visitor recognises an established infrastructure contractor at a glance, scans its disciplines and real projects, checks its approvals, then requests a quote.

FIRST VIEWPORT: Full-width project photograph under a deep-teal scrim at the inline-start, carrying the H1, the lead and one route to the disciplines; the masthead above holds the single orange quote action; a slim approvals line (ISO, NWC, since 2007) closes the bottom edge of the hero.

FORM: category standard, institutional (owner-specified after rejecting proposals 2 and 3; the standing exit); seed:420fd965e69e93fb (re-roll 1). Signature interaction: discipline drawings that draw their lines once when they enter, and a project index whose photographs open into full project pages. Motion grammar: one drawn-line entrance per discipline, calm fades; nothing else moves.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
