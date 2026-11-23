---
name: SACC — Sana Al-Awael Contracting Company
description: A calm, Arabic-first contractor site on a deep blue-green night ground, where dark teal and slate plates carry thin engineering line drawings, a project register and every claim as proof.
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
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Onest Variable, IBM Plex Sans Arabic, system-ui, Segoe UI, Tahoma, sans-serif"
    fontSize: "clamp(1.625rem, 1.3rem + 1.2vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  figure:
    fontFamily: "Onest Variable, IBM Plex Sans Arabic, system-ui, Segoe UI, Tahoma, sans-serif"
    fontSize: "clamp(1.625rem, 1.3rem + 1.2vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1
  quote:
    fontFamily: "Onest Variable, IBM Plex Sans Arabic, system-ui, Segoe UI, Tahoma, sans-serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.75vw, 1.75rem)"
    fontWeight: 300
    lineHeight: 1.6
  title:
    fontFamily: "Onest Variable, IBM Plex Sans Arabic, system-ui, Segoe UI, Tahoma, sans-serif"
    fontSize: "clamp(1.125rem, 1.06rem + 0.25vw, 1.25rem)"
    fontWeight: 500
    lineHeight: 1.35
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
  section: "clamp(96px, 11vw, 168px)"
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
  status-live:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.page-night}"
    rounded: "{rounded.pill}"
    padding: "2px 12px"
  tablist:
    backgroundColor: "{colors.slate-surface}"
    rounded: "{rounded.pill}"
    padding: "4px"
  tab-selected:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.page-night}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
  tile:
    backgroundColor: "{colors.deep-teal}"
    textColor: "{colors.lavender}"
    rounded: "{rounded.plate}"
    padding: "clamp(24px, 2.6vw, 36px)"
  card-teal:
    backgroundColor: "{colors.deep-teal}"
    textColor: "{colors.lavender}"
    rounded: "{rounded.plate}"
    padding: "24px"
  card-surface:
    backgroundColor: "{colors.slate-surface}"
    textColor: "{colors.lavender}"
    rounded: "{rounded.plate}"
    padding: "24px"
  register:
    backgroundColor: "{colors.slate-surface}"
    textColor: "{colors.lavender-mist}"
    rounded: "{rounded.plate}"
    padding: "8px clamp(16px, 2.4vw, 32px)"
  recognition-band:
    backgroundColor: "{colors.slate-surface}"
    textColor: "{colors.lavender}"
    rounded: "{rounded.plate}"
    padding: "clamp(32px, 5vw, 64px)"
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

The site reads as a calm engineering sheet on a plain night-blue ground. Solid, rounded plates in two dark tones, deep teal and slate, carry the content. The discipline tiles hold thin periwinkle line drawings of pipes, culverts, road sections, bridges and lab specimens, with small round nodes like a utility network diagram. The register is institutional and orderly: firm sentence-case headings at moderate sizes, wide section spacing, a project register laid out as a real table, and field photographs in full natural colour.

The character comes from the owner's reference (Sirion): a deep blue-green ground, one saturated accent kept for the single action, a discipline grid, a recognition band, portrait cards and a split closing band. The B2B pass made the system calmer and plainer for evaluators. Headings got heavier, the background site-plan grid was removed, the lavender plates were taken out (every plate is now dark), and the figures moved into a credentials strip under the hero. Colours come only from the owner's palette, always solid at full strength. Proof carries the page: ISO seals, named approvals, figures, owners and named projects.

Arabic is the root language and the layout is built with logical properties, so the English page under /en mirrors it without overrides. Everything that has a direction follows the reading direction: line-drawing reveals, arrows, band clip shapes and tab arrow keys.

**Key Characteristics:**
- Plain night-blue ground; flat solid dark plates (teal and slate), no shadows.
- Lavender is text and selected state; violet fills only the contact action and form submits.
- Thin 1.5px engineering line drawings with round nodes on the discipline tiles.
- Medium (500) headings with a 600 H1, sentence case, moderate sizes.
- Arabic-first RTL, logical properties throughout, full-colour photography.

## Colors

The owner's palette, used solid at full strength: a deep blue-green ground, two dark plate tones, pale lavender text and one violet accent.

### Primary
- **Action Violet** (#9662A8): fills the single contact action «تواصل معنا» / Contact Us (bar, hero, drawer) and the submit button on the two forms. White text on it measures 4.56:1. It is never text and never a surface.

### Secondary
- **Deep Teal** (#0F393C): the feature plate. It backs every discipline tile, the node and value cards, project and leadership cards, and the contact aside. It is also the 1px row divider inside the project register.
- **Lavender** (#DDDFFC): the primary text colour on every dark surface (13.56:1 on the page, 9.6:1 on teal, 10.6:1 on slate). As a fill it marks state only: selected filters and tabs, the in-progress status pill, the success notice and the skip link, always with Page Night text. It is also the error colour.

### Tertiary
- **Periwinkle Line** (#AFB5F9): line drawings, ISO seals, the hero band's rails and nodes, the journey timeline, link underlines, the current-nav underline, hover outlines and the global focus ring (9.13:1 on the page, 7.14:1 on slate).
- **Earth** (#6E4A3B): defined as a token; no shipped surface uses it.

### Neutral
- **Page Night** (#0C1926): the page ground and form-field fill; text on lavender fills.
- **Bar Night** (#0D1B22): the sticky header bar, the mobile drawer and the footer.
- **Slate Surface** (#182F3D): the information plate (register, recognition band, office panel, forms, facts, pager, people, roles, tab track), phone register cards, the bar's bottom edge and photo placeholders.
- **Lavender Mist** (#BEC6E9): secondary text (10.52:1 on the page, 7.45:1 on teal, 8.23:1 on slate): leads, meta, register cells, labels and nav links at rest.
- **Survey Grey** (#70787A): 1px borders of form fields and approval chips only (3.94:1 on the page). Never text.
- **White** (#FFFFFF): text on Action Violet only.

### Named Rules
**The Full-Strength Rule.** Every colour is a solid fill at full strength. There are no gradients, no transparency washes, no glass or blur, and no scrims, greyscale or desaturation on photographs.

**The Dark Plate Rule.** Content plates are Teal or Slate, never Lavender. Lavender fills only small state elements (selected filter or tab, in-progress pill, notice, skip link).

**The One Violet Rule.** Violet fills the contact action and the form submits and nothing else. Neither Action Violet (3.90:1) nor Survey Grey (3.94:1) is ever text on a dark background.

**The Untouched Logo Rule.** The SACC lockup appears in its own colours, only resized. It is never recoloured, redrawn or placed on a tinted chip.

## Typography

**Latin Font:** Onest Variable (self-hosted via @fontsource-variable/onest)
**Arabic Font:** IBM Plex Sans Arabic 300 / 400 / 500 / 600 (self-hosted via @fontsource, Arabic subset)
**Fallback:** system-ui, Segoe UI, Tahoma, sans-serif

**Character:** One quiet humanist-geometric sans for each script, sharing a single stack, so Arabic and English pages carry the same firm, even voice.

### Hierarchy
- **Display** (600, clamp 2.125–3.5rem, 1.12; Arabic 1.35): the page H1 only. Under 560px the Arabic home H1 shrinks (min of display and 7.6vw) to stay on one line.
- **Headline** (500, clamp 1.625–2.25rem, 1.2; Arabic 1.4): section H2s.
- **Figure** (500, headline size, line-height 1): the four credential values under the hero, lining tabular numerals.
- **Quote** (300, clamp 1.25–1.75rem, 1.6): the Chairman's quote only.
- **Title** (lead size, 1.35–1.4): H3 on discipline tiles at 500; H3 on node cards, project cards and people at 400; drawer links.
- **Lead** (400, lead size, 1.6): the line under H1 and H2 in Lavender Mist (Lavender in the hero, max 52ch).
- **Body** (400, clamp 1–1.0625rem, 1.65; Arabic 1.8): running text, at most 44ch inside tiles.
- **Label** (400–500, 0.875rem): nav links, meta, chips, status pills, register headers (500), field labels, credential labels, the footer.

### Named Rules
**The Firm Voice Rule.** Headings are 500 (H1 600), sentence case, never uppercase, and stop at 3.5rem. Hierarchy comes from size steps and position, not from extra weights or larger display sizes.

**The Arabic Leading Rule.** Arabic gets taller line-heights (body 1.8, display 1.35, headline 1.4) and zero letter-spacing. Latin headings take -0.01em. Numerals use lining tabular figures, and phone numbers and figures are isolated LTR.

## Layout

A centred column up to 1344px with fluid side margins (clamp 16–48px). Sections are separated by wide fluid top padding (`spacing.section`). Composition runs on a 12-column grid with 24px column gaps; plate grids use a 16px gap, the discipline grid 24px.

- **Hero:** H1 across columns 1–7, lead and actions in columns 9–12, aligned to the bottom; top padding clamp 56–104px. Directly below, the **credentials strip**: four figures (founding year, leadership experience, owned fleet, safety), value above label, four across (two under 760px). Then the band of three field photographs (0.7 / 2.6 / 0.7 fr), slanted with mirrored clip-paths in RTL, between two periwinkle rails with end nodes. The band stays pinned under the bar while the disciplines section slides over it.
- **Section head:** stacked H2 and lead, 14px apart, max 62ch, then clamp 40–64px to the content.
- **Disciplines:** an even 3×3 grid of tiles; two columns at 960px, one at 640px, where the drawings are hidden.
- **Projects (home):** filters, then the register table (Project, Owner/client, Category, Location, Status). Under 760px each row becomes a compact Slate card showing name, owner and status only. Project cards on inner pages sit three across, then two (960px), then one (600px).
- **Closing band:** office panel (5 columns) beside a photo (7 columns).
- **Breakpoints:** 960px (nav moves into the drawer; disciplines two-up), 860px (hero, page-head, split and closing grids stack), 760px (credentials two-up; register to cards), 640px (single column), 560 / 520 / 420 / 380px (the bar compacts; at 380px the contact action moves into the drawer).

**The Logical Properties Rule.** Inline layout uses only `inline-start/end`, `margin-inline` and `padding-inline`. Anything with a physical direction (clip-paths, reveal direction, arrows, tab keys) is mirrored explicitly for RTL.

## Elevation & Depth

The system is flat. There are no box-shadows anywhere and no background pattern. Depth comes from tonal plates: Teal and Slate sit on Page Night. Interactive plates respond with a 2px periwinkle outline and, on tiles and project cards, a 3px lift. The one spatial effect is structural: the pinned hero photo band, with the next section scrolling over it on an opaque Page Night ground.

**The Flat Plate Rule.** Plates are solid and shadowless. State shows as an outline colour, an underline or a small lift, never as a shadow or glow.

## Shapes

Plates, photos and panels share one gently rounded corner (14px). Every control is a full pill (999px): actions, ghost buttons, filters, tabs, chips, status pills and the menu button. Form fields and notices use 10px, and photo windows inside line drawings use 4px. Line drawings use 1.5px round-capped strokes with non-scaling width and 4.5px-radius nodes filled with the tile colour. Hollow 9–10px ring nodes recur on the band rails, the timeline and card headers. ISO seals are typographic double rings, with no imitation certificate artwork.

## Components

### Buttons
- **Primary (the contact action):** Action Violet pill, white 500 label, 44px minimum height. On hover a 2px periwinkle outline appears at a 2px offset; on press it moves down 1px. The form submit uses the same button.
- **Ghost:** transparent pill with a 1px Lavender Mist border and Lavender text. On hover the border turns periwinkle and the fill Slate. Used for secondary routes (all disciplines, call the office, apply to a role).
- **Text link:** Lavender text with a 1px periwinkle underline at a 5px offset, thickening to 2px on hover, with a reading-direction arrow.

### Chips
- **Filter:** outlined pill (1px Slate) with Lavender Mist text; periwinkle border on hover; selected (`aria-pressed`) fills Lavender with Page Night text.
- **Approval chip:** static outlined pill (1px Survey Grey) on the recognition band.
- **Status pill:** outlined in Lavender Mist for completed work; in progress fills Lavender with Page Night text.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** Teal for feature plates (tiles, node and value cards, project and leadership cards, contact aside). Slate for information plates (register, recognition band, panels, forms, facts, pager, people, roles).
- **Shadow Strategy:** none (see Elevation & Depth).
- **Internal Padding:** 24px on cards, clamp 24–36px on tiles, fluid up to 40–64px on the recognition band, office panel and forms.
- **Photo cards:** photo on top (4:3 projects, 5:4 leadership), caption below, Slate placeholder behind every image.

### Inputs / Fields
- **Style:** Page Night fill, 1px Survey Grey border, 10px radius, 48px minimum height (textarea 150px). Labels sit above in label size. The contact form («للتواصل» / Write to us) asks for name, email, company and message only.
- **Hover / Focus:** hover turns the border Lavender Mist; focus turns the border and a 2px outline periwinkle.
- **Error:** border and outline in Lavender, with an icon and message in Lavender. There is no red. The success notice is a 10px Lavender plate; failure is Slate with a Lavender outline.

### Navigation
- **Bar:** sticky, 72px, Bar Night with a 1px Slate bottom edge. Logo, the main nav (label-size Lavender Mist links; hover and current turn Lavender with a 2px periwinkle underline), then the language switch, the contact action and the menu button. Under 960px the main nav hides and a drawer fades down from the bar, focusing its first link; Escape closes it. The drawer carries the contact action only when the bar's own is not visible (while the bar is quiet, or at 380px and under). The footer is one compact Bar Night row: logo, Careers link and rights line.
- **Tabs:** pill tabs in a Slate pill track; the selected tab is Lavender with Page Night text. Arrow keys follow the reading direction; Home and End are supported.

### Discipline Tile (signature)
A Teal plate with a title, a short description and, at the foot, a periwinkle line drawing (420 or 640 × 200 viewBox). Tiles with a photo frame the real photo in a drawn window with side modules and connectors. The drawing draws in once, in the reading direction (1100ms clip-path, 200ms delay). On hover the tile lifts 3px and gains a periwinkle outline. On the services index the drawing is replaced by the capability list.

### Project Register (signature)
A Slate plate holding a real table: Lavender Mist label-size headers at 500, project names as 500 Lavender links, other cells in Lavender Mist, rows divided by a 1px Teal line, status as a pill. Filters hide rows. Under 760px the header is visually hidden and each row becomes its own Slate card with name, owner and status.

### Recognition Band (signature)
A single Slate plate: text in columns 1–4, three ISO double-ring seals in periwinkle in columns 6–12, then a full-width row of approval chips and a link. On phones the seals become a list with the seal beside its label.

### Motion
Entrances fade up 16px over 700ms with an 80ms stagger. State changes take 160–220ms on one ease-out curve. Content already on screen at load is never hidden. With `prefers-reduced-motion: reduce`, all motion collapses and the hero band unpins.

**The One Contact Action Rule.** One contact action («تواصل معنا» / Contact Us) is visible at a time. On the home page the bar's copy stays hidden until the hero's action has scrolled out of view; on the contact page the form stands in for it. Sections never repeat it.

## Do's and Don'ts

### Do:
- **Do** use the palette colours solid at full strength, with Teal and Slate as the only plate tones.
- **Do** keep text Lavender or Lavender Mist on dark, and Page Night on Lavender state fills.
- **Do** set headings at 500 (H1 600) in sentence case, within the type steps above.
- **Do** draw new engineering illustrations as 1.5px round-capped periwinkle strokes with round nodes.
- **Do** present comparable records (projects, figures) as plain tables and lists, stacking to compact cards on phones.
- **Do** write layout with logical properties and mirror every directional effect for RTL.
- **Do** give every interactive element a visible 2px periwinkle focus ring and a 44px target.

### Don't:
- **Don't** use gradients, transparency washes, glass, blur, scrims or greyscale and desaturated photos.
- **Don't** build Lavender content plates (tiles, cards, bands); Lavender fills are for state only.
- **Don't** set Action Violet or Survey Grey as text on a dark background, or use violet beyond the contact action and form submits.
- **Don't** add a second contact action to a section, or a sitemap-style footer.
- **Don't** add box-shadows or a background pattern; show state with outline, underline or a small lift.
- **Don't** recolour, redraw or tint the SACC logo.
- **Don't** render small uppercase eyebrow labels above headings. The content data carries `eyebrow` strings, but the shipped design does not show them.
- **Don't** invent certificate artwork, client logos or testimonials. Seals stay typographic.
