---
version: 1
slug: "prototype-hejazi-index-html"
primary_target: "prototype-hejazi/index.html"
related_targets: []
---

# Surface brief: SACC site prototype, proposal 2 (Contemporary Hejazi)

Scope: standalone interactive prototype of the whole bilingual site (Home, About, Services + 9 service pages, Projects + 6 project pages, Equipment, Certifications, Journey, Leadership, Contact, Careers), Arabic-first with English, hash routes mirroring the planned URLs. Mode: Persuade. Proposal 2 of 3 for owner comparison; integrates into frontend/ only if chosen.

Audience and action: government/semi-government procurement and private developers, weighted equally. They verify approvals, delivered projects, fleet and leadership, then request a quote (one masthead action, pre-filled from the service or project page it is pressed on) or documents. Secondary: engineers applying via Careers.

Constraints: copy only from frontend/src/data/site-content.json; no invented facts; no eyebrow labels; every fact in one place (official strip = CR, NWC approval, phone, email, once, globally; chairman quote on Leadership only; footer = brand + sitemap). Logo never redrawn or recoloured, dark grounds only. Self-hosted fonts. No religious motifs, domes, minarets, arches or Prophet's Mosque imagery. Reduced motion honoured; contrast >= 4.5:1; tabular numerals; Arabic number-noun agreement. Prototype forms send nothing (static neutral strip says so).

## Direction contract

THESIS: Madinah's built fabric read as a modern institution: a coral-stone lintel carries the name and approvals, a roshan facade carries the disciplines. It refuses the contractor default of a full-bleed site photo, stat band and service-card grid.

OWN-WORLD: Cool lime-plaster ground (grey, never cream), coral-stone lintel bands with crisp ashlar joints, dark roshan timber for masthead, facade frames, ties (takaleel) and footer, lattice infill as the structural grid. Hejazi door blue-green is reserved for the single primary action. Noto Kufi Arabic for inscriptions and interface, Noto Naskh Arabic for running text. Square corners, 1px joints, timber ties as section rules.

STORY: The visitor reads the company and its approvals on the lintel, opens the disciplines one shutter at a time, follows a discipline or project to its own page, then requests a quote from the masthead.

FIRST VIEWPORT: Official strip, then the timber masthead with logo, nav, language and the blue-green quote action at inline-end. Below, a full-width stone lintel: the title in large Kufi, the lead, and an inscribed approvals register (ISO 9001/14001/45001, government approvals count). A timber tie, then a facade of nine roshan panels across the full width, one per discipline, the first already open.

FORM: contemporary Hejazi facade, number 7 of the re-rolled ordered list of 7; seed:420fd965e69e93fb (re-roll 1). Signature interaction: a roshan panel opens like a shutter, its lattice leaves folding to the jambs while the bay widens to reveal the discipline's summary, capabilities and link; arrow keys walk the facade. Motion grammar: shutters fold, nothing else moves; no parallax, no scroll reveals.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Leadership portraits load from a CDN blocked in the sandbox; the initials fallback shows in captures.
