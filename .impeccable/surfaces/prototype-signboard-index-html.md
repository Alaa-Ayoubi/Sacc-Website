---
version: 1
slug: "prototype-signboard-index-html"
primary_target: "prototype-signboard/index.html"
related_targets: []
---

# Surface brief: SACC site prototype, proposal 3 (the project signboard)

Scope: standalone interactive prototype of the whole bilingual site (Home, About, Services + 9 discipline pages, Projects + 6 project pages, Equipment, Certifications, Journey, Leadership, Contact, Careers), Arabic-first with English, one self-contained HTML file. Mode: Persuade. Compared by the owner against proposal 1 (street cross-section) and proposal 2; integrates into frontend/ only if chosen.

Audience and action: government/semi-government procurement officers and private developers, weighted equally; they scan approvals, delivered projects, fleet and leadership, then request a quote (one masthead action, pre-filled from discipline/project pages) or documents. Owner rejects: generic corporate template, showy effects, slow access to information, weak Arabic.

Constraints: copy and facts only from frontend/src/data/site-content.json; a signboard field with no real data (consultant, value, duration) is omitted, never filled. Logo never redrawn or recoloured, dark grounds only. Self-hosted fonts. No eyebrows. Every fact in one place (proposal 1's owner refinements apply). Reduced motion honoured.

## Direction contract

THESIS: Every Saudi site carries its project signboard; this site is SACC's signboard, facts in ruled bilingual rows read the way procurement reads. It refuses the contractor default of a hero photo, stat band and service-card grid.

OWN-WORLD: Board white panels framed in 2px ink on a cool galvanised-grey wall; deep petrol header bands (from the logo's teal) carrying the logo and titles in white; black ink rows on hairline rules; a bilingual key column (Arabic first, English beneath); numbered cells in tabular figures; safety orange reserved for the one quote action. Noto Kufi Arabic for board voice, Noto Naskh Arabic for prose, Archivo for Latin and numerals.

STORY: The visitor reads the contractor board, swaps it to a project to see owner, location and scope, follows a row to the proof page, then requests a quote.

FIRST VIEWPORT: Official strip, then the petrol masthead with logo, nav and the orange quote action. Below, one full-width framed board: the company title band, contractor fact rows (activity, established, fleet, leadership, safety, approvals), then the project band with its compact selector and the live project rows.

FORM: the project signboard, number 1 of the re-rolled ordered list of 7 (Impeccable's pick, chosen by the owner); seed:420fd965e69e93fb (re-roll 1). Signature interaction: choosing a discipline or a project on the board's selector swaps the project rows (title, owner, location, category, status, scope) in place, as a site board names its project; project pages are full boards. Motion grammar: changed rows fade and settle 4px in about 200ms, staggered by row; no parallax, no ticker.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Leadership portraits load from a CDN blocked in this sandbox; captures show the fallback.
