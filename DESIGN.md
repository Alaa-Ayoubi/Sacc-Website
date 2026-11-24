---
name: SACC — Sana Al-Awael Contracting Company
description: A modern institutional, Arabic-first contractor site on white and cool mist grounds, with deep logo teal for the masthead, footer and key bands, the logo's orange reserved for the one contact action, Almarai throughout, hairline-ruled modules, the company's own photographs, and the approving bodies shown by their official logos on white plates.
colors:
  teal-950: "#0b2c2d"
  teal-900: "#0d3536"
  teal-800: "#134748"
  teal-700: "#1b5b5b"
  teal-600: "#24706f"
  teal-300: "#8cbcb8"
  teal-100: "#e1edec"
  orange: "#e38c2f"
  orange-hover: "#ef9c43"
  ink: "#142021"
  ink-2: "#405150"
  ink-3: "#586968"
  on-teal: "#f2f7f7"
  on-teal-2: "#b8cfcd"
  white: "#ffffff"
  mist: "#f0f3f3"
  rule: "#d9e0df"
  rule-strong: "#b3c0bf"
  danger: "#b0261c"
  ok: "#1d6b45"
  live: "#a0510f"
typography:
  display:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 4.6vw, 3.9rem)"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "0"
  headline-page:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.2rem)"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "0"
  headline:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "0"
  quote:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)"
    fontWeight: 700
    lineHeight: 1.7
  figure:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 800
    lineHeight: 1.3
    fontFeature: "tnum, lnum"
  title-large:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 800
    lineHeight: 1.3
  title:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 800
    lineHeight: 1.45
  lead:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.6vw, 1.32rem)"
    fontWeight: 400
    lineHeight: 1.75
  body:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "0.93rem"
    fontWeight: 700
    lineHeight: 1.5
  meta:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  ctl: "2px"
  dot: "50%"
spacing:
  wrap: "1240px"
  gutter: "clamp(20px, 4vw, 48px)"
  band: "clamp(64px, 8vw, 112px)"
  head-h: "76px"
  topbar-h: "38px"
  head-gap: "clamp(28px, 4vw, 44px)"
  grid-gap: "28px"
  plate-gap: "12px"
  control: "48px"
components:
  button-contact:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.ctl}"
    padding: "10px 22px"
    height: "48px"
  button-contact-hover:
    backgroundColor: "{colors.orange-hover}"
  button-outline-light:
    backgroundColor: "transparent"
    textColor: "{colors.on-teal}"
    rounded: "{rounded.ctl}"
    padding: "10px 22px"
    height: "48px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.teal-800}"
    rounded: "{rounded.ctl}"
    padding: "10px 22px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.teal-100}"
  button-teal:
    backgroundColor: "{colors.teal-800}"
    textColor: "{colors.on-teal}"
    rounded: "{rounded.ctl}"
    padding: "10px 22px"
    height: "48px"
  button-teal-hover:
    backgroundColor: "{colors.teal-700}"
  link-more:
    textColor: "{colors.teal-700}"
    typography: "{typography.label}"
  topbar:
    backgroundColor: "{colors.teal-950}"
    textColor: "{colors.on-teal-2}"
    typography: "{typography.small}"
    height: "38px"
  masthead:
    backgroundColor: "{colors.teal-900}"
    textColor: "{colors.on-teal}"
    height: "76px"
  nav-link:
    textColor: "{colors.on-teal-2}"
    padding: "10px 11px"
  nav-link-current:
    textColor: "{colors.on-teal}"
  pagehead:
    backgroundColor: "{colors.teal-900}"
    textColor: "{colors.on-teal}"
    padding: "clamp(40px, 5vw, 72px) 0 clamp(32px, 4vw, 52px)"
  band-mist:
    backgroundColor: "{colors.mist}"
    padding: "clamp(64px, 8vw, 112px) 0"
  band-teal:
    backgroundColor: "{colors.teal-900}"
    textColor: "{colors.on-teal}"
    padding: "clamp(64px, 8vw, 112px) 0"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.ctl}"
    padding: "0 16px"
    height: "42px"
  filter-chip-selected:
    backgroundColor: "{colors.teal-800}"
    textColor: "{colors.on-teal}"
  tab:
    textColor: "{colors.ink-3}"
    height: "54px"
    padding: "0"
  tab-selected:
    textColor: "{colors.teal-800}"
  tab-count:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.ctl}"
    height: "22px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ctl}"
    padding: "10px 14px"
    height: "48px"
  form-sheet:
    backgroundColor: "{colors.white}"
    padding: "clamp(22px, 3vw, 40px)"
  logo-plate:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.ctl}"
    padding: "20px 24px"
    height: "116px"
  project-card-photo:
    backgroundColor: "{colors.teal-100}"
  ruled-row:
    textColor: "{colors.ink}"
    padding: "15px 0"
  tag:
    backgroundColor: "{colors.mist}"
    rounded: "{rounded.ctl}"
    padding: "4px 10px"
  footer:
    backgroundColor: "{colors.teal-950}"
    textColor: "{colors.on-teal-2}"
    padding: "22px 0"
---

# Design System: SACC — Sana Al-Awael Contracting Company

## Overview

**Creative North Star: "The Institutional Register"**

The site reads as the formal register of an established infrastructure contractor: orderly, contemporary and plain. White and a cool mist grey carry the content; the logo's deep teal frames it, as the utility bar, the sticky masthead, every inner page's head band, the approvals band on the home page, the chairman's quote and the footer. The logo's orange is held back for the one contact action, «تواصل معنا» in the masthead, and for the small markers that say "here" on a teal ground (the current page, the selected tab, a tick, a rule).

Everything sits on a hairline-ruled grid. Lists of comparable things (disciplines, scope of work, capabilities, values, milestones, project facts, office details, open roles) are rows between 1px rules, with a firmer rule on top and no fill. Cards are a photograph and a title, not a box. The field is shown only by the company's own photographs: one pinned under the home hero that the page slides over, and the photographs of real projects. Who approved the company is shown by each body's official logo on its own white plate. No line drawings, no ornament, nothing that moves except calm fades and colour changes.

Arabic is the root language and Almarai sets both scripts at 400, 700 and 800. The English twin under /en mirrors through logical properties; arrows flip with the reading direction.

**Key Characteristics:**
- White and mist grounds; deep teal (#0d3536 / #0b2c2d) for the chrome and the key bands.
- Orange only for the contact action and for small current-state markers on teal.
- One family, Almarai, with 800 headings, 700 labels and 400 body at a generous 1.75 line height.
- Hairline-ruled rows and grids instead of cards and plates; near-square 2px corners.
- The company's own photographs only; approving bodies by their official logos on white plates.
- Flat by default; two soft shadows only (the sticky masthead and the form sheet).

## Colors

A cool, two-ground palette taken from the logo: a deep teal family, one warm orange, and teal-tinted inks and rules.

### Primary
- **Logo Teal, deep** (teal-900): the masthead, the inner-page head band, the teal content bands and the mobile menu drawer; also the hero's fallback ground under its photograph.
- **Logo Teal, darkest** (teal-950): the utility bar above the masthead and the footer, one step darker so the chrome brackets the page.
- **Teal steps** (teal-800, teal-700, teal-600): interaction on light grounds. teal-800 fills the selected filter, the teal button and selected tab text; teal-700 colours "more" links, outlines, the form sheet's top rule, the selected tab underline, milestone years and leader roles; teal-600 is focus, caret and every icon on a light ground.
- **Pale teal** (teal-100, teal-300): teal-100 is the photo frame tint while a photograph loads or is missing, the outline button's hover and text selection; teal-300 colours utility-bar icons.

### Secondary
- **Logo Orange** (orange, hover orange-hover): the contact button (masthead, and the contact form's submit), the skip link, the focus ring on teal grounds, and the current-page or selected markers on teal: nav underline, drawer link, tab underline, list ticks, feature icons and the quote rule.

### Neutral
- **Ink** (ink): headings and body text on light grounds.
- **Ink Two** (ink-2): secondary prose, section leads, filter text, tab counts.
- **Ink Three** (ink-3): meta lines, labels in fact lists, unselected tabs, hints.
- **On Teal / On Teal Two** (on-teal, on-teal-2): primary and secondary text on teal.
- **White** (white) and **Mist** (mist): the two light grounds; bands alternate between them. Tags and tab counts sit on mist.
- **Rule / Rule Strong** (rule, rule-strong): rule separates rows and cells; rule-strong is the firmer top rule of a list, the tab baseline and input borders. On teal the rules are white at 16% (rows) and 25% (top).
- **Status** (ok, live, danger): a completed project, a project in progress (each with a 7px dot), and form errors.

### Named Rules
**The One Orange Action Rule.** Orange fills exactly one kind of button: the contact action. Elsewhere it is only a thin marker of current state on a teal ground, never a fill on white.

**The Teal Frame Rule.** Teal is the frame, not the content: chrome, page heads and at most one key band per page. Content bands are white or mist.

## Typography

**Display Font:** Almarai (with system-ui, sans-serif), self-hosted, Arabic and Latin subsets at 400, 700, 800
**Body Font:** Almarai (same family)

**Character:** One modern Arabic sans with real presence at 800 for headings and an easy 400 for reading. Hierarchy comes from size and weight, not from a second face or a second colour.

### Hierarchy
- **Display** (800, clamp(2.3rem, 4.6vw, 3.9rem), 1.25): the home hero H1 only, at most 15ch wide.
- **Headline, page** (800, clamp(2rem, 4vw, 3.2rem), 1.3): the H1 in each inner page's teal head.
- **Headline** (800, clamp(1.75rem, 3vw, 2.5rem), 1.3): section headings in a band head.
- **Quote** (700, clamp(1.3rem, 2.4vw, 1.9rem), 1.7): the chairman's quote on Leadership.
- **Figure** (800, 1.6rem, tabular lining figures): milestone years.
- **Title large** (800, 1.45rem): form sheet headings; leader names at 1.35rem.
- **Title** (800, 1.05–1.2rem, 1.45): project, discipline, feature and timeline titles.
- **Lead** (400, clamp(1.15rem, 1.6vw, 1.32rem)): the opening paragraph of a prose block; hero and page-head leads at about 1.1–1.22rem in on-teal-2.
- **Body** (400, 1.0625rem, 1.75; 1.65 in English): prose capped at 70ch, section leads at 60ch.
- **Label** (700, 0.93–1rem): buttons, field labels, "more" links, tab labels, ruled list items.
- **Meta / Small** (400, 0.82–0.9rem): project meta, fact keys, hints, utility bar, footer.

English headings tighten to -0.015em tracking and 1.18 line height; Arabic stays at 0. Numbers use tabular lining figures, and phone numbers and ISO codes are isolated left-to-right.

### Named Rules
**The One Family Rule.** Almarai sets everything. Weight carries the hierarchy: 800 heads, 700 labels and list items, 400 reading text.

## Layout

A centred column of min(1240px, 100% − 2 × gutter), with the gutter at clamp(20px, 4vw, 48px). Sections are full-width bands with clamp(64px, 8vw, 112px) of block padding, alternating white and mist, with a teal band reserved for approvals or the quote. A band head puts the heading (and an optional lead) at the inline-start and a "more" link at the inline-end, spaced clamp(28px, 4vw, 44px) above the content.

Grids are mostly three columns stepping to two (about 860–960px) and one (about 520–600px); the gap between project cards and list columns is 28px. The home's selected projects use a 1.5fr / 1fr featured grid with the first project spanning two rows. Inner pages open with a teal page head (title, lead, optional crumb or button), then content bands. Prose and an aside sit in a 1.2fr / 1fr split; forms in a 1.5fr / 1fr split with the office details beside them.

The utility bar (38px) holds the CR number and the NWC approval on one side, phone and email on the other, and drops items as the screen narrows. The masthead is sticky at 76px. Under 1180px the navigation folds into a full-height drawer under the masthead. On the home page the hero photograph is a sticky layer pinned under the masthead; the hero copy scrolls away and the following opaque bands slide over the photograph.

A page with two or three kinds of content gives each its own part, one under another, never tabs (owner's decision): each part is a band with its own heading over a rule-strong line, on alternating white and mist grounds, so the page reads in one flow. The parts are a discipline's scope and its projects, the fleet's categories and support, the journey's milestones and values, and the certifications page in the owner's order: government approvals, then the commitment, then ISO certificates. On the home page the approvals band sits on white, the bodies' logos riding in a slow endless strip with no plates, the ISO codes beneath; the hero carries the company's figures in one line at its foot.

## Elevation & Depth

Flat by default. Depth comes from the change of ground (white, mist, teal) and from rules, not from shadow.

### Shadow Vocabulary
- **Masthead lift** (`box-shadow: 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px -18px rgba(0,0,0,0.6)`): separates the sticky masthead from the page that scrolls under it.
- **Sheet lift** (`box-shadow: 0 18px 40px -30px rgba(13,53,54,0.45)`): lifts the contact and careers form sheets off their band.
- **Inset strokes** (`box-shadow: inset 0 0 0 1.5px …` or `1px`): outlines on buttons, filters, the language switch and logo plates on light grounds. These are borders, not elevation.

### Named Rules
**The Two Shadows Rule.** Only the masthead and the form sheet cast a shadow. Anything else that needs separation gets a rule or a change of ground.

## Shapes

Near-square everywhere: buttons, inputs, filters, tags, tab counts, the language switch and logo plates take a 2px radius; photographs and portraits are square-cornered. The only round shape is the 7px status dot. Rows are separated by 1px rules with a firmer 1px rule-strong on top; the selected tab and current nav item carry a 2–3px underline; the form sheet has a 3px teal top rule. Ticks are 12 × 2px bars.

## Components

### Buttons
- **Shape:** near-square (2px), at least 48px tall, 10px 22px padding, 700 weight; 42px in the masthead.
- **Contact:** orange with ink text, «تواصل معنا» / "Contact Us"; one in the masthead on every page; it carries the discipline or project the visitor was viewing into the contact form, titled «للتواصل». The contact form submits with the same button.
- **Outline light:** on teal (hero, careers page head), a 1.5px inset on-teal stroke at 70%, filling to 10% white on hover.
- **Outline:** on light grounds, a 1.5px teal-700 stroke, teal-100 on hover (role "apply", CV upload).
- **Teal:** filled teal-800, teal-700 on hover; the careers form submit.
- **More link:** teal-700, 700 weight, with a 1.5px underline and a reading-direction arrow; on-teal inside teal bands.
- **Hover / Focus:** 160ms colour changes on a soft ease-out; focus is a 3px teal-600 outline at 3px offset, orange on dark grounds.

### Chips
- **Filters** (projects): 42px, inset 1px rule-strong stroke, ink-2 text with a count; hover strokes teal-700; selected is a teal-800 fill with on-teal text.
- **Tags** (leader expertise): small text on mist, 2px corners.

### Cards / Containers
- **Project card:** a 4:3 photograph in a teal-100 frame (the featured one fills its two rows), then the title and a meta line of client, location and status. No box, no shadow; the photograph scales to 1.03 over 600ms on hover and the title turns teal-700.
- **Discipline cell** (services): a ruled grid of cells, 28px padding, title, published-project count and a "details" link aligned to the bottom; mist on hover.
- **Form sheet:** white, 1px rule border, 3px teal-700 top rule, the sheet shadow, clamp(22px, 3vw, 40px) padding.

### Inputs / Fields
- **Style:** white, 1px rule-strong border, 2px corners, 48px tall (textarea 140px), 700 labels above.
- **Focus:** border teal-700 with a 3px teal ring at 22%; hover darkens the border to ink-3.
- **Error:** danger border and ring, an error line with an icon under the field; success and failure notices appear in a pale green or pale red panel under the form.

### Navigation
- **Masthead:** logo at the inline-start, links in on-teal-2 turning on-teal on hover; the current page gets a 2px orange underline. Then the language switch (a 1px inset stroke, its short form under 520px), the contact button and, under 1180px, the menu button.
- **Drawer:** full-height teal-900, 1.15rem 700 links between faint rules, the current one in orange.
- **Page parts:** no tabs. Each part of a page is a band headed by an 800 H2 at clamp(1.45rem, 2.4vw, 1.95rem) over a 1px rule-strong line, clamp(48px, 6vw, 84px) of block padding, alternating white and mist.
- **Footer:** one compact teal-950 bar: logo, the careers link, the rights line.

### Ruled lists (signature)
Rows between hairlines with a firmer top rule, in one to four columns: checks (teal-600 check icon), capabilities, the fleet's categories (a 12 × 2px teal tick, orange on teal), features with a 28px icon, values, the milestone timeline (year column, title, line), project facts (key column, bold value), office details and the open-roles table that collapses into stacked rows under 820px.

### Approving body plates (signature)
Each approving body by its official logo on its own white plate: 116px tall, 20px 24px padding, 2px corners, 12px gaps, four across stepping to three and two; a 1px inset rule outline on light grounds, none on teal. Every logo is sized to the same visual area within a 170 × 64px box so a wide wordmark and a square emblem read at equal weight. On the home approvals band the three ISO codes sit in a ruled row of three above the plates.

### Motion
Colour and background changes at 140–160ms, the project photograph zoom at 600ms, all on cubic-bezier(0.16, 1, 0.3, 1). Reduced motion removes every animation and transition.

## Do's and Don'ts

### Do:
- **Do** set content on white or mist in ink, with ink-2 for secondary text and ink-3 for meta; teal-700 and teal-800 only for what is interactive or selected.
- **Do** put comparable items in hairline-ruled rows: a 1px rule-strong top rule, 1px rule between rows, no fill.
- **Do** keep corners at 2px and photographs square.
- **Do** show the approving bodies only by their official logos, uncoloured, on white plates at an equal visual area.
- **Do** open each inner page with the teal page head and set its several kinds of content as parts one under another, never tabs, keeping the certifications order: government approvals, commitment, ISO certificates.
- **Do** use only the company's own photographs, in a teal-100 frame that holds when a photograph is missing.
- **Do** write layout with logical properties and flip directional arrows with the reading direction.

### Don't:
- **Don't** use orange as a fill for anything but the contact action, or as text on white.
- **Don't** add a second contact action to a page section; the masthead's «تواصل معنا» is the one route to the form.
- **Don't** bring back the engineering line drawings; the owner removed them.
- **Don't** state an equipment count on the fleet page.
- **Don't** merge Journey and Leadership back into one page.
- **Don't** add shadows beyond the masthead and the form sheet, or radii above 2px.
- **Don't** add small labels or kickers above section headings.
- **Don't** recolour, redraw or tint the SACC logo or any body's logo; the white wordmark sits on teal only.
- **Don't** invent testimonials, certificate numbers, client logos or figures.
