---
name: SACC — Sana Al-Awael Contracting Company
description: A calm, Arabic-first contractor site on a deep blue-green night ground, where rounded teal and lavender plates carry thin engineering line drawings and every claim is proof.
colors:
  page-night: "#0C1926"
  bar-night: "#0D1B22"
  deep-teal: "#0F393C"
  slate-surface: "#182F3D"
  lavender: "#DDDFFC"
  lavender-mist: "#BEC6E9"
  periwinkle-line: "#AFB5F9"
  action-violet: "#9662A8"
  survey-grey: "#70787A"
  earth: "#6E4A3B"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Onest Variable, IBM Plex Sans Arabic, system-ui, Segoe UI, Tahoma, sans-serif"
    fontSize: "clamp(2.125rem, 1.5rem + 2.6vw, 3.5rem)"
    fontWeight: 300
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Onest Variable, IBM Plex Sans Arabic, system-ui, Segoe UI, Tahoma, sans-serif"
    fontSize: "clamp(1.625rem, 1.3rem + 1.2vw, 2.25rem)"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  quote:
    fontFamily: "Onest Variable, IBM Plex Sans Arabic, system-ui, Segoe UI, Tahoma, sans-serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.75vw, 1.75rem)"
    fontWeight: 300
    lineHeight: 1.6
  title:
    fontFamily: "Onest Variable, IBM Plex Sans Arabic, system-ui, Segoe UI, Tahoma, sans-serif"
    fontSize: "clamp(1.125rem, 1.06rem + 0.25vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.4
  lead:
    fontFamily: "Onest Variable, IBM Plex Sans Arabic, system-ui, Segoe UI, Tahoma, sans-serif"
    fontSize: "clamp(1.125rem, 1.06rem + 0.25vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Onest Variable, IBM Plex Sans Arabic, system-ui, Segoe UI, Tahoma, sans-serif"
    fontSize: "clamp(1rem, 0.97rem + 0.12vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Onest Variable, IBM Plex Sans Arabic, system-ui, Segoe UI, Tahoma, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  inset: "4px"
  field: "10px"
  plate: "14px"
  pill: "999px"
spacing:
  gap: "16px"
  gutter: "24px"
  margin: "clamp(16px, 4vw, 48px)"
  section: "clamp(72px, 8vw, 120px)"
  bar: "72px"
  max: "1344px"
components:
  button-primary:
    backgroundColor: "{colors.action-violet}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
    height: "44px"
  button-ghost:
    backgroundColor: "{colors.page-night}"
    textColor: "{colors.lavender}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.slate-surface}"
  filter-chip:
    textColor: "{colors.lavender-mist}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
    height: "40px"
  filter-chip-selected:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.page-night}"
  tab-selected:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.page-night}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
  tablist:
    backgroundColor: "{colors.slate-surface}"
    rounded: "{rounded.pill}"
    padding: "4px"
  tile-teal:
    backgroundColor: "{colors.deep-teal}"
    textColor: "{colors.lavender}"
    rounded: "{rounded.plate}"
    padding: "28px"
  tile-lavender:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.page-night}"
    rounded: "{rounded.plate}"
    padding: "28px"
  card-surface:
    backgroundColor: "{colors.slate-surface}"
    textColor: "{colors.lavender}"
    rounded: "{rounded.plate}"
    padding: "24px"
  project-row:
    backgroundColor: "{colors.slate-surface}"
    textColor: "{colors.lavender}"
    rounded: "{rounded.plate}"
    padding: "24px 28px"
  project-row-hover:
    backgroundColor: "{colors.deep-teal}"
  input:
    backgroundColor: "{colors.page-night}"
    textColor: "{colors.lavender}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
    height: "48px"
  bar:
    backgroundColor: "{colors.bar-night}"
    textColor: "{colors.lavender-mist}"
    height: "{spacing.bar}"
---

# Design System: SACC — Sana Al-Awael Contracting Company

## Overview

**Creative North Star: "The Utility Network Plan"**

The site reads as a calm engineering sheet laid over a night-blue ground. A faint site-plan grid (96px squares in thin slate lines) sits fixed behind every page. On it rest solid, rounded plates in two alternating tones, deep teal and pale lavender. The discipline plates carry thin periwinkle or teal line drawings of pipes, culverts, road sections, bridges and lab specimens, with small round nodes like a utility network diagram. The register is institutional and airy: light-weight sentence-case headings at moderate sizes, generous section spacing, and real field photographs in full natural colour.

The character comes from the owner's reference (Sirion): a deep blue-green ground, alternating lavender and teal feature cards, one saturated accent kept for the single action, bento discipline tiles, a recognition band, portrait cards and a split closing band. Colours come only from the owner's ten-colour palette, always solid at full strength. Proof carries the page: ISO seals, named approvals, figures and named clients. Decoration never stands in for it.

Arabic is the root language and the layout is built with logical properties, so the English page under /en mirrors it without overrides. Everything that has a direction follows the reading direction: line-drawing reveals, arrows, band clip shapes and tab arrow keys.

**Key Characteristics:**
- Night-blue ground with a fixed site-plan grid; flat solid plates, no shadows.
- Teal and lavender plates alternate; violet fills only the primary action.
- Thin 1.5px engineering line drawings with round nodes on the discipline tiles.
- Light (300) sentence-case headings, moderate sizes, one sans family per script.
- Arabic-first RTL, logical properties throughout, full-colour photography.

## Colors

The owner's palette, used solid at full strength: a deep blue-green ground, two plate tones, one violet accent and pale lavender text.

### Primary
- **Action Violet** (#9662A8): fills the single primary action, "تواصل معنا" / "Contact Us" (the content's `navCta`), and the submit button on the two forms. White text on it measures 4.56:1. It is never text and never a background for anything else.

### Secondary
- **Deep Teal** (#0F393C): the dark plate. Alternates with lavender in the bento and value cards, and backs project cards, leadership cards, the hover state of project rows and the contact aside. It also serves as the line-drawing and seal colour on lavender plates (9.6:1).
- **Lavender** (#DDDFFC): the light plate (bento tiles, the recognition band, notices, selected tabs and filters). The same value is the primary text colour on every dark surface (13.56:1 on the page).

### Tertiary
- **Periwinkle Line** (#AFB5F9): the engineering line drawings on teal, the hero band's rails and nodes, the journey timeline, link underlines, hover outlines and the global focus ring (9.13:1 on the page).
- **Earth** (#6E4A3B): reserved for a sparing site-plan detail. It is defined as a token but no shipped surface uses it yet.

### Neutral
- **Page Night** (#0C1926): the page ground and form-field fill. It is also the text colour on lavender plates.
- **Bar Night** (#0D1B22): the sticky header bar, the mobile drawer and the footer.
- **Slate Surface** (#182F3D): the secondary plate (project rows, figures, the office panel, forms, facts, pager, tab track), the bar's bottom edge, the grid lines and photo placeholders. On lavender it is the secondary text (10.6:1).
- **Lavender Mist** (#BEC6E9): secondary text on dark (10.52:1 on the page, 7.45:1 on teal): leads, meta, labels and nav links at rest.
- **Survey Grey** (#70787A): the 1px border of form fields only (3.94:1 on the page, so it passes as a non-text boundary). It is never text.
- **White** (#FFFFFF): text on Action Violet only.

### Named Rules
**The Full-Strength Rule.** Every colour is a solid fill at full strength. There are no gradients, no transparency washes, no glass or blur, and no scrims, greyscale or desaturation on photographs.

**The One Violet Rule.** Violet fills the primary action and nothing else. Neither Action Violet (3.90:1) nor Survey Grey (3.94:1) is ever used as text on a dark background.

**The Untouched Logo Rule.** The SACC lockup appears in its own colours, only resized. It is never recoloured, redrawn or placed on a tinted chip.

## Typography

**Latin Font:** Onest Variable (self-hosted via @fontsource-variable/onest)
**Arabic Font:** IBM Plex Sans Arabic 300 / 400 / 500 (self-hosted via @fontsource, Arabic subset)
**Fallback:** system-ui, Segoe UI, Tahoma, sans-serif

**Character:** One quiet humanist-geometric sans for each script, sharing a single stack, so Arabic and English pages carry the same light, even voice.

### Hierarchy
- **Display** (300, clamp 2.125–3.5rem, 1.12; Arabic 1.35): the page H1 only (the company name on the home page, the page title elsewhere). On phones under 560px the Arabic home H1 shrinks to stay on one line. Figure numerals use display size at line-height 1.
- **Headline** (300, clamp 1.625–2.25rem, 1.2; Arabic 1.4): section H2s.
- **Quote** (300, clamp 1.25–1.75rem, 1.6): the Chairman's quote only, sized to balance the portrait beside it.
- **Title** (400, clamp 1.125–1.25rem, 1.35–1.4): H3 on tiles, cards, rows and people; drawer links.
- **Lead** (400, same size as title, 1.6): the supporting line beside H1 and H2, in Lavender Mist (Lavender in the hero).
- **Body** (400, clamp 1–1.0625rem, 1.65; Arabic 1.8): running text, at most 44ch inside tiles.
- **Label** (400–500, 0.875rem): nav links, meta, chips, status pills, field labels, the footer. Names inside cards and seals use 500.

### Named Rules
**The Light Voice Rule.** Headings are weight 300, sentence case, never uppercase, and stop at 3.5rem. The owner rejected large display text. Emphasis comes from size and position, never weight.

**The Arabic Leading Rule.** Arabic gets taller line-heights (body 1.8, display 1.35, headline 1.4) and zero letter-spacing. Latin headings take -0.01em. Numerals use lining tabular figures, and phone numbers are isolated LTR.

## Layout

A centred column up to 1344px with fluid side margins (clamp 16–48px). Sections are separated by fluid top padding (clamp 72–120px). Composition runs on a 12-column grid with 24px column gaps; plate grids use a 16px gap.

- **Hero:** H1 across columns 1–7, lead and actions in columns 9–12, aligned to the bottom. Below sits a band of three field photographs (0.7 / 2.6 / 0.7 fr), slanted against each other with mirrored clip-paths in RTL, between two periwinkle rails with end nodes. The band stays pinned under the 72px bar while the disciplines section slides over it.
- **Section head:** H2 across columns 1–6, lead in columns 8–12, aligned to the bottom.
- **Bento:** nine tiles in fixed spans and tones (7 lav, 5 teal / 5 teal, 7 lav / 4 lav, 4 teal, 4 lav / 6 teal, 6 lav). At 960px it becomes two columns (a trailing odd tile spans full width). At 640px it is one column.
- **Projects:** a two-column list of rows, one column under 760px. Project cards sit three across, then two, then one.
- **Closing band:** office panel (5 columns) beside a photo (7 columns).
- **Breakpoints:** 960px (nav moves into the drawer; bento goes to two columns), 860px (head and hero grids stack), 640px (single column), 520 / 420 / 380px (the bar compacts; at 380px the quote action moves into the drawer).

**The Logical Properties Rule.** Inline layout uses only `inline-start/end`, `margin-inline` and `padding-inline`. Anything with a physical direction (clip-paths, reveal direction, arrows, tab keys) is mirrored explicitly for RTL.

## Elevation & Depth

The system is flat. There are no box-shadows anywhere. Depth comes from tonal plates: Slate, Teal and Lavender sit on Page Night. Interactive plates respond with a 2px periwinkle outline and, on tiles and project cards, a 3px lift. The one spatial effect is structural: the pinned hero photo band, with the next section scrolling over it on its own opaque grid ground.

**The Flat Plate Rule.** Plates are solid and shadowless. State shows as an outline colour, a tone swap (row: Slate to Teal) or a small lift, never as a shadow or glow.

## Shapes

Plates, photos and panels share one gently rounded corner (14px). Every control is a full pill (999px): actions, ghost buttons, filters, tabs, chips, status pills and the menu button. Form fields and notices use 10px, and photo windows inside line drawings use 4px. Line drawings use 1.5px round-capped strokes with non-scaling width and 4.5px-radius nodes filled with the tile colour. Hollow 9–10px ring nodes recur on the band rails, the timeline and card headers. ISO seals are drawn as typographic double rings, with no imitation certificate artwork.

## Components

### Buttons
- **Primary (the quote action):** Action Violet pill, white 500 label, 44px minimum height. On hover a 2px periwinkle outline appears at a 2px offset, and on press it moves down 1px. It sits in the bar, in the hero and, at 380px and under, in the drawer.
- **Ghost:** transparent pill with a 1px Lavender Mist border and Lavender text. On hover the border turns periwinkle and the fill Slate. Used for secondary routes (all disciplines, call the office, apply to a role).
- **Text link:** Lavender text with a 1px periwinkle underline at a 5px offset, thickening to 2px on hover. On lavender plates it uses Page Night text with a Slate underline. It carries a reading-direction arrow.

### Chips
- **Filter:** outlined pill (1px Slate) with Lavender Mist text. On hover the border turns periwinkle. When selected (`aria-pressed`) it fills with Lavender and Page Night text.
- **Approval chip:** a static outlined pill (1px Slate) on the lavender recognition band.
- **Status pill:** outlined in Lavender Mist for completed work. Work in progress fills with Lavender.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** Teal or Lavender for feature plates (tiles, value cards). Slate for information plates (rows, figures, facts, forms, panels). Teal for photo cards (projects, leadership).
- **Shadow Strategy:** none (see Elevation & Depth).
- **Internal Padding:** 24–28px, with fluid padding up to 40–48px on the recognition band, office panel and forms.
- **Photo cards:** photo on top (4:3 projects, 5:4 leadership), caption below, Slate placeholder behind every image.

### Inputs / Fields
- **Style:** Page Night fill, 1px Survey Grey border, 10px radius, 48px minimum height (textarea 150px). Labels sit above in label size.
- **Hover / Focus:** on hover the border turns Lavender Mist. On focus the border and a 2px outline turn periwinkle.
- **Error:** border and outline in Lavender, with a message (icon and text) in Lavender. There is no red; the message carries the error. Success and failure notices are 10px plates (Lavender, or Slate with a lavender outline).

### Navigation
- **Bar:** sticky, 72px, Bar Night with a 1px Slate bottom edge. Logo, then label-size links in Lavender Mist (hover and current: Lavender with a 2px periwinkle underline), then the language switch, the quote action and the menu button. Under 960px the links move into a drawer that fades down from the bar, with the first link focused and Escape to close. The footer is one compact Bar Night row: logo, Careers link and rights line, with no repeat of the nav.
- **Tabs:** pill tabs in a Slate pill track. The selected tab is Lavender with Page Night text. Arrow keys follow the reading direction, and Home and End are supported.

### Discipline Tile (signature)
A Teal or Lavender plate with a title, a short description and, at the foot, a line drawing (640 or 420 × 200 viewBox), periwinkle on teal and teal on lavender. Tiles with a photo frame the real photo in a drawn window with side modules and connectors. The drawing draws in once, in the reading direction (1100ms clip-path, 200ms delay). On hover the tile lifts 3px and gains a periwinkle outline.

### Recognition Band (signature)
A single Lavender plate: text in columns 1–4, three ISO double-ring seals in Teal in columns 6–12, then a full-width row of approval chips and a link. On phones the seals become a list with the seal beside its label.

### Motion
Entrances fade up 16px over 700ms with an 80ms stagger. State changes take 160–220ms on one ease-out curve. Content already on screen at load is never hidden. With `prefers-reduced-motion: reduce`, all motion collapses and the hero band unpins.

**The One Contact Action Rule.** One contact action («تواصل معنا» / Contact Us) is visible at a time. On the home page the bar's copy stays hidden until the hero's action has scrolled out of view, and on narrow phones it moves into the drawer. Sections never repeat it.

## Do's and Don'ts

### Do:
- **Do** use the ten palette colours solid at full strength, and alternate Teal and Lavender plates in feature grids.
- **Do** keep body text Lavender or Lavender Mist on dark and Page Night or Slate on Lavender.
- **Do** keep headings at weight 300 in sentence case, within the type steps above.
- **Do** draw new engineering illustrations as 1.5px round-capped strokes with round nodes, in periwinkle on teal and teal on lavender.
- **Do** write layout with logical properties and mirror every directional effect for RTL.
- **Do** give every interactive element a visible 2px periwinkle focus ring (Page Night on lavender plates) and a 44px target.

### Don't:
- **Don't** use gradients, transparency washes, glass, blur, scrims or greyscale and desaturated photos.
- **Don't** set Action Violet or Survey Grey as text on a dark background, or use violet for anything but the primary action.
- **Don't** add a second quote action to a section, or a sitemap-style footer.
- **Don't** add box-shadows; show state with outline, tone or a small lift.
- **Don't** recolour, redraw or tint the SACC logo.
- **Don't** render small uppercase eyebrow labels above headings. The content data carries `eyebrow` strings, but the shipped design does not show them.
- **Don't** invent certificate artwork, client logos or testimonials. Seals stay typographic.
