---
version: 1
slug: "prototype-index-html"
primary_target: "prototype/index.html"
related_targets: []
---

# Surface brief: SACC site prototype (all pages)

Scope: interactive standalone prototype of the whole bilingual site (Home, About, Services, Projects, Equipment, Certifications, Journey, Leadership, Contact, Careers), Arabic-first with English. Mode: Persuade. Integrates into frontend/ only after the owner approves.

Audience and action: government/semi-government procurement and private developers, weighted equally; the action is a quote request or a document request, reached in one step from every page. Proof is the confirmed record in PRODUCT.md. The owner rejects: generic corporate template, showy effects, slow access to information, weak Arabic.

Constraints: logo is never redrawn or recoloured (white wordmark: dark grounds only). Content comes from frontend/src/data/site-content.json verbatim. Fonts are self-hosted. Motion honours reduced-motion.

## Direction contract

THESIS: SACC builds what lies under and along a Saudi street, so the site is a street cross-section. It refuses the contractor default: a full-bleed site photo with a stat band and a grid of service cards.

OWN-WORLD: The strata are the ground. Asphalt black for the header and the opening, a concrete-grey reading ground, wadi-sand and basalt bands for proof, and the road-marking yellow bar for every primary action. The logo's four arcs are the functional network colours: teal for water, orange for electrical, green for sewer, stormwater and landscape, yellow for roads. Alexandria for display, Readex Pro for text. Depth labels in tabular numerals; hairline section rules like drawing leaders.

STORY: The visitor sees in one look that one contractor builds every network under the street, checks the approvals and record, then requests a quote or documents.

FIRST VIEWPORT: The headline is set on the asphalt band with the yellow quote action beside it. Directly below sits a full-width interactive street section: road layers above pipes and ducts, each labelled and clickable. The approval log (NWC, ISO 9001/14001/45001, 150+ fleet, since 2007) runs along the section's inline-end edge.

FORM: street cross-section, number 5 of my ordered list of 7; seed:420fd965e69e93fb. Signature interaction: selecting a network in the section opens its discipline, capabilities and projects. A quiet depth gauge on the inline-start edge tracks the scroll position. Motion grammar: layers settle downward once; no parallax, no ticker.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Owner refinements (after the direction was chosen)

- Pages expand inward: a sub-page per discipline and per project, plus in-page tabs (equipment, certifications, journey). Further copy comes from the live site saccgroup.net once it is reachable; nothing is invented.
- Register: more formal and institutional. Official bar with CR number and approvals above the masthead; solid (not dashed) active markers in nav and tabs; calmer display weights; lane dashes kept only at road edges.
