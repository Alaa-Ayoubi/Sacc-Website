---
name: SACC — Sana Al-Awael Contracting Company
description: The street cross-section. A bilingual, Arabic-first contractor site whose grounds are the strata under a Saudi street.
colors:
  asphalt: "#17181a"
  asphalt-2: "#222326"
  asphalt-3: "#2c2d31"
  asphalt-line: "#3d3e43"
  official-black: "#0e0f10"
  basalt: "#2e2a27"
  basalt-2: "#3a3531"
  ground: "#e2e4e3"
  paper: "#f3f4f3"
  rule: "#c5c8c6"
  rule-strong: "#a2a6a4"
  aggregate: "#8b857a"
  sand: "#c9a46a"
  sand-deep: "#b38d55"
  ink: "#17181a"
  ink-2: "#47443f"
  ink-3: "#5f5b54"
  on-dark: "#f3f2ed"
  on-dark-2: "#bdb9b0"
  on-sand: "#261d12"
  on-sand-2: "#45361f"
  marking: "#f6b81c"
  marking-hover: "#ffc83d"
  lane: "#e9e7df"
  water: "#3fa29b"
  water-ink: "#1e6f69"
  power: "#e5862b"
  power-ink: "#a65412"
  sewer: "#6cbf88"
  sewer-ink: "#2a7446"
  road: "#f6b81c"
  road-ink: "#8a6200"
  concrete: "#a7a298"
  error: "#b3261e"
typography:
  display:
    fontFamily: "Alexandria, Readex Pro, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5vw, 4.4rem)"
    fontWeight: 650
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  display-ar:
    fontFamily: "Alexandria, Readex Pro, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.4rem)"
    fontWeight: 650
    lineHeight: 1.32
    letterSpacing: "0em"
  page-title:
    fontFamily: "Alexandria, Readex Pro, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.6vw, 3.8rem)"
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Alexandria, Readex Pro, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.012em"
  title:
    fontFamily: "Alexandria, Readex Pro, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.012em"
  figure:
    fontFamily: "Alexandria, Readex Pro, system-ui, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 700
    lineHeight: 1.2
    fontFeature: "tnum, lnum"
  body:
    fontFamily: "Readex Pro, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 350
    lineHeight: 1.65
  body-ar:
    fontFamily: "Readex Pro, system-ui, sans-serif"
    fontSize: "1.09rem"
    fontWeight: 350
    lineHeight: 1.8
  button:
    fontFamily: "Alexandria, Readex Pro, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: "Readex Pro, system-ui, sans-serif"
    fontSize: "0.93rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  hairline: "1px"
  sm: "2px"
  full: "50%"
spacing:
  gutter: "clamp(20px, 4vw, 48px)"
  wrap: "1240px"
  head: "72px"
  band: "clamp(56px, 8vw, 112px)"
  reader: "clamp(36px, 5vw, 64px)"
  column-gap: "clamp(28px, 5vw, 80px)"
components:
  button-mark:
    backgroundColor: "{colors.marking}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "10px 1.35em"
    height: "48px"
  button-mark-hover:
    backgroundColor: "{colors.marking-hover}"
    textColor: "{colors.ink}"
  button-ink:
    backgroundColor: "{colors.asphalt}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "10px 1.35em"
    height: "48px"
  button-ink-hover:
    backgroundColor: "{colors.asphalt-3}"
    textColor: "{colors.on-dark}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "10px 1.35em"
    height: "48px"
  button-line-dark:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "10px 1.35em"
    height: "48px"
  input-field:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
    height: "48px"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 16px"
    height: "40px"
  filter-chip-active:
    backgroundColor: "{colors.asphalt}"
    textColor: "{colors.on-dark}"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-3}"
    height: "52px"
  tab-active:
    textColor: "{colors.ink}"
  masthead:
    backgroundColor: "{colors.asphalt}"
    textColor: "{colors.on-dark}"
    height: "72px"
  official-bar:
    backgroundColor: "{colors.official-black}"
    textColor: "{colors.on-dark-2}"
    height: "36px"
---

# Design System: SACC — Sana Al-Awael Contracting Company

<!-- Reference implementation today: prototype/src/{template.html,styles.css,app.js}, bundled by prototype/build.mjs into prototype/dist/sacc-prototype.html. This is a standalone review prototype awaiting the owner's approval; on approval, integration carries this system into the React frontend (frontend/). Until then, frontend/ still renders the previous design and is not evidence for this file. -->

## Overview

**Creative North Star: "The Street Cross-Section"**

SACC builds what lies under and along a Saudi street, so the site is drawn as a section through one. Every ground is a stratum: asphalt black for the official bar, the masthead, the opening and inner page heads; a concrete-grey reading ground; wadi-sand and Madinah-basalt bands for proof and fleet. The signature is an interactive street section directly under the opening: road layers above pipes and ducts, each network labelled and selectable, with a depth ruler in tabular numerals and the qualification record standing along its inline-end edge. The world refuses the contractor default of a full-bleed site photo, a stat band and a grid of service cards.

The register is formal and institutional, written for procurement officers. Information is set as records, logs, fact sheets and ruled lists rather than cards: hairline rules (1px) separate rows, and a heavier 2px ink rule opens every list the way a leader line opens an engineering drawing. Display weights stay calm (600 to 650); emphasis comes from the strata and the ruled structure, not from size or effects. Motion is one gesture: the section's layers settle downward once.

The site is Arabic-first and fully bilingual. Direction is a document-level concern (`lang`/`dir` on `<html>`), and layout is written in logical properties (`inline-start`, `inline-end`, `margin-inline`, `padding-block`) so the whole world mirrors without per-component overrides. The SACC logo is a pre-existing brand asset; it is placed only on dark grounds at 34px height and is never redrawn or recoloured. Its four arcs supply the network colours.

**Key Characteristics:**
- Grounds are strata: asphalt, concrete, sand, basalt, stacked like a street section.
- Road-marking yellow is the action colour; network colours are functional keys.
- Ruled records and logs instead of cards; 2px ink rule opens, 1px hairlines divide.
- Near-square corners (2px) everywhere; flat surfaces.
- Alexandria for display, Readex Pro for text, tabular numerals for every figure and depth.
- Arabic-first, mirrored through logical properties.
- One settling motion; no parallax, no ticker.

## Colors

A dark-and-mineral palette of real street materials, lit by one road-marking yellow and keyed by the four network colours of the logo.

### Primary
- **Road-Marking Yellow** (`marking`): the primary action fill (every quote and document request), and the system's only state colour: active nav and tab markers, the 3px focus ring, link underlines, drawing-leader ticks, the depth-gauge mark, text selection. Hover lifts to **Fresh Paint** (`marking-hover`).

### Secondary
- **Network keys**, taken from the logo's arcs and used only to identify a network, never as decoration: **Water Teal** (`water`), **Power Orange** (`power`), **Sewer, Storm and Landscape Green** (`sewer`), **Road Yellow** (`road`, the same value as the marking), and **Concrete** (`concrete`) for structures. Each has an `-ink` partner (`water-ink`, `power-ink`, `sewer-ink`, `road-ink`) for text and small icons on light grounds, where the bright key would fail contrast. Status reuses them: completed projects in `sewer-ink`, in-progress in `power-ink`.

### Tertiary
- **Wadi Sand** (`sand`, deeper `sand-deep`): the proof band (certifications and approvals), with its own ink pair `on-sand` / `on-sand-2`.
- **Madinah Basalt** (`basalt`, `basalt-2`): the fleet and values band.

### Neutral
- **Asphalt** (`asphalt`): masthead, opening, inner page heads, footer, the ink button and selected filter. Its ramp `asphalt-2` (the section and dark bands), `asphalt-3` (hover) and `asphalt-line` (borders on dark) are the dark strata.
- **Official Black** (`official-black`): the registration and approvals bar above the masthead, one step deeper than asphalt.
- **Concrete Ground** (`ground`): the default reading ground of the page body.
- **Paper** (`paper`): raised reading surfaces: the qualification record, the form sheet, the paper band, hovered and selected legend rows.
- **Rules** (`rule`, `rule-strong`): 1px row hairlines; `rule-strong` for control outlines and table heads.
- **Aggregate** (`aggregate`): the crushed-stone stratum, the gauge ticks, the scrollbar thumb.
- **Ink** (`ink`, `ink-2`, `ink-3`): primary text and 2px opening rules; secondary copy; meta and labels. On dark grounds, `on-dark` and `on-dark-2`.
- **Lane White** (`lane`): the solid edge line of the road.
- **Error Red** (`error`): invalid field borders. It is a literal in the stylesheet, not yet a custom property.

### Named Rules
**The Road Marking Rule.** Yellow fills a surface only on the primary action. Everywhere else it appears as a line of 4px or less (active marker, focus ring, underline, leader tick) or a small mark. A yellow panel, band or card is off-world.

**The Network Key Rule.** Teal, orange, green and road yellow mean water, power, sewer/storm/landscape and roads. Use them only where a network is being identified: the section, the legend segments, discipline icons, project logs. Never as general decoration or a second accent.

**The Strata Rule.** Grounds change only by stratum: asphalt, concrete ground or paper, sand, basalt. Where the home page moves from one ground to the next, a seam of thin strata bands (asphalt-3, a mid-grey, aggregate texture) marks the join.

## Typography

**Display Font:** Alexandria (with Readex Pro, system-ui, sans-serif)
**Body Font:** Readex Pro (with system-ui, sans-serif)

Both are self-hosted variable fonts (Arabic and Latin subsets), never loaded from a font CDN.

**Character:** Alexandria is a geometric Arabic-and-Latin display face with an engineered, signage-like build; Readex Pro is its quieter, highly legible text partner with matching proportions in both scripts, so Arabic and English read as one voice.

### Hierarchy
- **Display** (650, clamp(2.4rem, 5vw, 4.4rem), 1.06, -0.03em): the home opening headline on asphalt only. In Arabic: clamp(2.5rem, 5vw, 4.4rem), line-height 1.32, no tracking.
- **Page Title** (650, clamp(2.2rem, 4.6vw, 3.8rem), 1.12, -0.025em, max 18ch): inner page heads; compact sub-page heads drop to clamp(2rem, 3.6vw, 3rem). Arabic line-height 1.35.
- **Headline** (600, clamp(1.9rem, 3.6vw, 2.9rem), 1.18): band headings; lead paragraph under it at 1.12rem, max 62ch. Arabic line-height 1.35.
- **Title** (600, 1.3rem, 1.3): service rows, legend and project-sheet headings; list headings at 1.05rem 600 sit on a 2px rule.
- **Figure** (Alexandria 700, 1.12rem up to 1.6rem for years, tabular lining numerals): record values, journey years, ISO standards.
- **Body** (Readex Pro 350, 1.0625rem, 1.65; Arabic 1.09rem, 1.8): running copy, max 60 to 62ch.
- **Button** (Alexandria 600, 1rem, 1.4): every button and text link.
- **Label** (Readex Pro 400, 0.85 to 0.93rem): nav, meta, captions, form labels (500).

### Named Rules
**The Calm Weight Rule.** Display never goes above 650 and headings sit at 600 to 650. Size and the strata carry hierarchy; heavy black weights are off-register. Only figures take 700.

**The Tabular Figures Rule.** Every number that is compared or measured (years, counts, depths, standards) is set with tabular lining numerals.

**The Script Parity Rule.** Negative tracking applies to Latin only; Arabic headings get zero letter-spacing and more line-height (1.32 to 1.35 for headings, 1.8 for body). Never uppercase-transform text; Arabic has no case and the two languages must match.

## Layout

Content sits in a single centred column of `min(1240px, 100% - 2 × gutter)` with a fluid gutter (clamp(20px, 4vw, 48px)). Pages are vertical stacks of full-width bands, each band padded clamp(56px, 8vw, 112px) on the block axis. Inside a band, layouts are asymmetric two-column grids (ratios around 1.1:1 to 1.55:1) with gaps of clamp(28px, 5vw, 80px), collapsing to one column between 860px and 960px.

The home first viewport is fixed in order: official bar (36px), sticky masthead (72px), the asphalt opening with the headline at inline-start and the lead plus actions at inline-end, then the street section full width with the record (280 to 340px) along its inline-end edge. Below 1020px the record drops under the section as a two-column grid; below 700px the section drawing keeps a 980px width and scrolls horizontally.

Lists are ruled grids, not card grids: service rows (icon, title, copy, capability list), project logs (network segment, title, client, status, toggle), fact sheets (9em key column), journey columns (a coloured layer stripe, year, text). Navigation collapses to a full-height asphalt drawer below 1180px. A depth gauge rides the inline-start edge only above 1360px.

**The Logical Axis Rule.** Write every offset, border and alignment with logical properties (inline-start/end, block). The few physical padding overrides keyed to `dir='rtl'` in the reference stylesheet are debt, not pattern.

## Elevation & Depth

The world is flat. Depth is told by stratification, ground changes and ruled structure, not by shadows. Three restrained exceptions exist.

### Shadow Vocabulary
- **Kerb lip** (`box-shadow: 0 1px 0 rgba(0,0,0,0.22)`): under the yellow action button only, a 1px edge like a painted kerb.
- **Field sheet** (`box-shadow: 0 1px 0 var(--rule), 0 18px 40px -28px rgba(23, 24, 26, 0.45)`): the quote and application form sheet, which also carries a 4px ink top edge. The one lifted surface.
- **Inset outlines** (`box-shadow: inset 0 0 0 1px var(--rule-strong)`, `--asphalt-line` on dark): how outline buttons, chips, the language toggle and tags draw their 1px border.

### Named Rules
**The Flat Strata Rule.** Surfaces rest flat on their stratum. Only the form sheet lifts; nothing hovers into shadow.

## Shapes

Corners are near-square: 2px on buttons, fields, chips, tags, tabs' counts, portraits and icon tiles; 1px on network segments; full circles only for status dots, check badges and the gauge mark. Borders are drawing lines: 1px hairlines between rows, a 2px ink (or on-dark / on-sand) rule opening each list, table, tab list and pager, a 3px yellow bar under the selected tab, a 2px yellow bar under the current nav item. Discipline icons sit in 44px asphalt tiles tinted with their network colour.

**The Solid Marker Rule.** Active markers in nav and tabs are solid bars. Dashes belong to the drawing (lane dashes, leader lines and conduits inside the street section) and to the single lane-marking strip where the road band ends; never to UI state.

## Components

### Buttons
Signage-plain and decisive.
- **Shape:** near-square (2px), min-height 48px (40px in the masthead and tables), padding 10px 1.35em, label wraps balanced and centred.
- **Primary (marking):** road-marking yellow with ink text and the kerb lip. One per view region: the quote or document request.
- **Ink:** asphalt with on-dark text, for the second action on light grounds.
- **Line / Line-dark:** transparent with a 1px inset outline in `rule-strong` (light) or `asphalt-line` (dark); the outline darkens to ink or `on-dark-2` on hover.
- **Hover / Focus:** 160ms colour or outline shift on `--ease-out`; focus is the global 3px yellow outline at 3px offset. Busy and disabled drop to 0.6 opacity.
- **Text link:** Alexandria 600 with a 2px yellow underline at 0.4em offset that turns currentColor on hover. Directional arrows flip in RTL.

### Chips (filters and tags)
- **Filter:** 40px, transparent, 1px inset `rule-strong`, ink-2 label with a short network segment; selected becomes solid asphalt with on-dark text and no outline.
- **Tag:** 0.85rem, 4px 10px, 1px inset outline, 2px corners; static.

### Cards / Containers
There are no cards. Containers are grounds and ruled records.
- **Record:** paper on the section's edge, a 2px ink rule under its heading, rows of figure plus label on 1px hairlines.
- **Field sheet:** paper, 4px ink top edge, padding clamp(22px, 3vw, 40px), the only shadowed surface.
- **Notices:** 2px corners; success `#e3f1e7` on `#1d5233`, failure `#f8e3e1` on `#7d1d17`.

### Inputs / Fields
- **Style:** white fill, 1px `rule-strong` border, 2px corners, 48px min-height, 10px 14px padding; textareas 140px. Labels above at 0.92rem 500; hints in ink-3.
- **Hover / Focus:** border to ink-3 on hover; on focus border to ink plus a 3px yellow halo (`rgba(246, 184, 28, 0.7)`).
- **Error:** border in Error Red, which stays red with a red halo while focused; the message sits below with an alert icon.

### Navigation
- **Official bar:** official black, 0.82rem on-dark-2, CR number and approvals with small yellow icons; contact links at inline-end. Items shed progressively below 900px and 560px.
- **Masthead:** sticky asphalt, 72px, logo at inline-start, nav at inline-end in Readex Pro 0.93rem on-dark-2; current page in on-dark with a solid 2px yellow bar. Language toggle and the quote button follow.
- **Mobile:** below 1180px a 44px menu button opens a full-height asphalt drawer of 1.3rem Alexandria links on hairlines, the current page in yellow, the quote button full width.
- **Tabs:** Alexandria 1.08rem 500 (650 when selected), 52px, on a 2px ink rule; selected tab carries a 3px solid yellow bar (asphalt on the sand band) and a small count chip.

### Street Section (signature)
A full-width SVG section on asphalt-2: textured strata (asphalt, aggregate, sub-base, sand, basalt), the networks drawn in their key colours, white label tags on dashed leader lines and a depth ruler in metres. Selecting a network (or its legend row) outlines it, dims the others to 0.38, fills its tag yellow and swaps the discipline reader below with a 360ms fade. On sub-pages a compact section (no record, labels scaled 1.4x, max 780px) sits under a compact page head. Strata settle downward once on load (900ms, 70ms stagger); networks fade in after.

### Depth Gauge
A fixed 1px aggregate line with ticks on the inline-start edge, a 13px yellow mark tracking scroll; shown only above 1360px and faded out while the street section itself is in view.

## Do's and Don'ts

### Do:
- **Do** spend road-marking yellow as a fill only on the primary action, and keep exactly one such action per region.
- **Do** use network colours only to identify water, power, sewer/storm/landscape and roads, with their `-ink` partners for text on light grounds.
- **Do** set lists as ruled records: a 2px ink rule to open, 1px hairlines between rows.
- **Do** keep corners at 2px and surfaces flat; the form sheet is the only lifted surface.
- **Do** write layout in logical properties so Arabic and English mirror from `dir` alone, and give Arabic headings zero tracking and taller leading.
- **Do** set every compared figure in tabular lining numerals.
- **Do** place the logo unaltered on dark grounds at 34px height.
- **Do** wrap all motion in `prefers-reduced-motion: no-preference`; the reduce branch removes animation and transitions.

### Don't:
- **Don't** build a full-bleed site photo with a stat band and a grid of service cards; that is the contractor default this world refuses.
- **Don't** use dashed or dotted markers for active nav, tab or selection state; dashes stay inside the street drawing and the single road-edge strip.
- **Don't** fill panels, bands or cards with yellow, or use a network colour as decoration.
- **Don't** add parallax, tickers, or repeating entrance animations; the section settles once.
- **Don't** push display weight above 650 or uppercase-transform any text.
- **Don't** redraw, recolour or place the logo on a light ground.
- **Don't** load fonts from a CDN; Alexandria and Readex Pro are self-hosted.
