---
name: SACC — Sana Al-Awael Contracting Company
description: A quiet, Arabic-first contractor site on white paper, with El Messiri headings in two tones, ruled columns instead of boxes, field photographs under an ink multiply veil, and every claim shown as named proof.
colors:
  paper: "#FFFFFF"
  ink: "#364044"
  ink-2: "#545A5B"
  slate: "#435563"
  line: "#C9C8C3"
  mute: "#7B7C79"
  band-cream: "#EAE7D3"
  plate: "#F3F0E7"
typography:
  display:
    fontFamily: "SaccDisplay, Sacc, serif"
    fontSize: "clamp(28px, 3.9vw, 54px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "0"
  headline-page:
    fontFamily: "SaccDisplay, Sacc, serif"
    fontSize: "clamp(26px, 3.1vw, 42px)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "0"
  headline:
    fontFamily: "SaccDisplay, Sacc, serif"
    fontSize: "clamp(25px, 2.9vw, 40px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "0"
  figure:
    fontFamily: "SaccDisplay, Sacc, serif"
    fontSize: "clamp(24px, 2.5vw, 34px)"
    fontWeight: 400
    lineHeight: 1.15
    fontFeature: "tnum, lnum"
  subhead:
    fontFamily: "SaccDisplay, Sacc, serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.25
  quote:
    fontFamily: "SaccDisplay, Sacc, serif"
    fontSize: "clamp(17px, 1.5vw, 21px)"
    fontWeight: 400
    lineHeight: 1.35
  title:
    fontFamily: "SaccDisplay, Sacc, serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.25
  title-small:
    fontFamily: "SaccDisplay, Sacc, serif"
    fontSize: "15.5px"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Sacc, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 600
    lineHeight: 1.7
  small-3:
    fontFamily: "Sacc, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.6
  small-2:
    fontFamily: "Sacc, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.65
  small-1:
    fontFamily: "Sacc, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  panel: "4px"
  card: "3px"
  ctl: "4px"
spacing:
  wrap: "1180px"
  gut: "clamp(18px, 4vw, 48px)"
  sec: "clamp(60px, 8.5vw, 128px)"
  bar: "62px"
  bar-phone: "56px"
  column-gap: "28px"
  column-row-gap: "32px"
  photo-gap: "8px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.small-3}"
    rounded: "{rounded.ctl}"
    padding: "8px 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.slate}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ctl}"
    padding: "8px 18px 8px 12px"
    height: "42px"
  button-light-hover:
    backgroundColor: "{colors.line}"
  button-section:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.small-2}"
    rounded: "{rounded.ctl}"
    padding: "6px 13px"
    height: "36px"
  button-section-hover:
    backgroundColor: "{colors.slate}"
  choice:
    textColor: "{colors.ink-2}"
    height: "44px"
    padding: "0"
  choice-selected:
    textColor: "{colors.ink}"
  ruled-column:
    textColor: "{colors.ink}"
    padding: "16px 0 0"
  project-card:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "clamp(14px, 1.5vw, 20px)"
  approvals-band:
    backgroundColor: "{colors.band-cream}"
    textColor: "{colors.ink}"
    padding: "clamp(40px, 5.5vw, 84px) 0"
  logo-plate:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "20px 28px"
  photo-panel:
    backgroundColor: "{colors.slate}"
    rounded: "{rounded.panel}"
    padding: "clamp(20px, 4.5vw, 64px)"
  float-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "20px"
  tag:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    typography: "{typography.small-2}"
    rounded: "{rounded.ctl}"
    padding: "5px 12px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.small-3}"
    rounded: "{rounded.ctl}"
    padding: "8px 12px"
    height: "42px"
  notice:
    backgroundColor: "{colors.band-cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "14px 16px"
  bar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "{spacing.bar}"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.small-2}"
    padding: "16px 0"
---

# Design System: SACC — Sana Al-Awael Contracting Company

## Overview

**Creative North Star: "The Ruled Ledger on White Paper"**

The site reads as a formal, well-set document on a plain white sheet. Headings are a warm Arabic-Latin display face (El Messiri) in two tones, ink then a muted grey. Content below them sits in ruled columns: a firm 1px ink rule over each item, the title and a short line under it, and no fill or box. The owner tried pale beige plates and found they read as sticky notes, so the rule replaced the plate everywhere: disciplines, values, scope of work, ISO standards, the office and the careers points. Colour is nearly absent. It is the owner's ink, slate and grey on white, with one cream band for the approvals.

Photographs carry the emotion. The hero, the project cards and the leadership panel are real field photographs darkened by an ink-coloured multiply veil, so off-white type sits on them at full contrast without the photo going grey. Proof is named, never claimed: three hero figures, seven approving bodies shown by their official logos, three ISO standards, named projects and named leaders.

Arabic is the root language. Layout is written in logical properties so the English page under /en mirrors without overrides, and every arrow, slide and marquee direction follows the reading direction. The page is calm and small-scaled, matching the owner's reference: body text around 15.5px, small text on a three-step scale, headings that stop at 54px.

**Key Characteristics:**
- White paper ground; ink text; slate for links, focus and selection; one cream band.
- El Messiri headings in two tones (ink, then muted grey); Tajawal for all other text, at bold weights.
- Ruled columns (1px ink top rule, no fill) instead of cards or plates.
- Photographs under an ink multiply veil, with off-white type on them.
- Near-square corners (3–4px) throughout; flat except for cards floating on a photograph.
- Press feedback on everything pressable; hover only on fine pointers; reduced motion keeps colour and opacity changes but drops movement.

## Colors

The owner's restrained palette on white: one dark ink, one slate accent for interaction, two greys, and two warm pale tints the owner added by instruction.

### Primary
- **Ink** (#364044): headings, body text, every rule over a ruled column, the fill of the action and section buttons, the project-card and hero ground behind photographs, the veil colour (as rgba(54, 64, 68, …)) over every photograph, and the footer. 10.64:1 on paper.

### Secondary
- **Deep Slate** (#435563): the interactive accent. Text links, the arrow on linked columns, the hover fill of dark buttons, the 2px underline on the selected filter or tab, the global 2px focus ring, the input caret, the phone icon chip in the hero action, the current drawer link, and the photo panel ground behind the blurred leadership photo. 7.73:1 on paper.

### Neutral
- **Paper** (#FFFFFF): the page ground, the bar once it is fixed, the drawer, floating cards, logo plates, inputs, and text on ink and on photographs.
- **Ink Two** (#545A5B): secondary text. Leads, column descriptions, field hints, field placeholders, fact and aside labels, unselected filters and tabs. 7.02:1 on paper.
- **Mute Grey** (#7B7C79): the second, muted half of two-tone headings, journey years, and the 1px border of inputs and the file button. 4.2:1 on paper, so it is used only at heading sizes or as a non-text border.
- **Line** (#C9C8C3): hairlines between list rows, journey rows, people, facts and aside rows; the bar's bottom edge; the photo placeholder tint; the light button's hover fill. At 45% opacity it is the hover wash on nav links and icon buttons.
- **Band Cream** (#EAE7D3): the full-width approvals band and the success notice. Ink is 8.55:1 on it, Ink Two 5.64:1.
- **Plate** (#F3F0E7): the reference's pale card colour, now only a state and chip tint: hover fill of list rows, pager links and the file button, and the expertise tags on leadership profiles.

`--stone` (#A99E8F), `--teal` (#839FA3), `--warm` (#857C6D), `--deco` (#949690), `--close` (#CDD9DA) and `--plate-2` (#E9E5D8) are still declared in the stylesheet but no shipped rule uses them. They are not part of the working system.

### Named Rules
**The Ink Veil Rule.** Every photograph that carries text sits under a multiply layer of ink (rgba(54, 64, 68, …)) shaped by gradients: darker where the text is, lighter in between. Never a grey or black scrim, never desaturation.

**The Slate Means Interactive Rule.** Slate marks what can be acted on or is selected: links, focus, the chosen filter or tab, button hover. It does not appear as decoration or body text.

**The Owner's Palette Rule.** Text, rules, buttons and dark surfaces come only from ink, ink-2, slate, mute and line. Paper, cream and plate are the only light grounds.

**The Untouched Logo Rule.** The SACC mark, the full lockup in the footer and the seven approving bodies' logos are shown in their own colours, only resized. Never recoloured or redrawn.

## Typography

**Display Font:** El Messiri, self-hosted as `SaccDisplay` (fallback Sacc, serif)
**Body Font:** Tajawal, self-hosted as `Sacc` (fallback system-ui, sans-serif)

**Character:** El Messiri gives a formal, slightly calligraphic voice to headings in both scripts; Tajawal is plain and even for everything else. Both are set heavier than their names suggest, because the owner asked for bolder, clearer type.

**The weight slots.** Each family fills the same CSS weight slots in both scripts, reusing a file where a face has no such weight (see `fonts.css`). The CSS weight is not the rendered weight:
- `Sacc` 400 → Tajawal 400, 500 → Tajawal 500, **600 → Tajawal Bold 700**, 700 → Tajawal ExtraBold 800.
- `SaccDisplay` **400 and 500 → El Messiri SemiBold 600**, 600 → El Messiri Bold 700.

So body text at `font-weight: 600` renders Tajawal Bold, and headings at 400 render El Messiri SemiBold. Headings use the variables `--wd` (400; 500 in Arabic, the same file) and `--wd3` (600) for small titles.

### Hierarchy
- **Display** (400 slot, clamp 28–54px, 1.12; Arabic 1.5): the home hero's H1, the company name on one line, paper on the photograph.
- **Headline (page)** (400 slot, clamp 26–42px, 1.14; Arabic 1.4): the single H1 of each inner page.
- **Headline** (400 slot, clamp 25–40px, 1.12; Arabic 1.4): section H2s, always two-tone. Latin headings take -0.01em tracking; Arabic none.
- **Figure** (400 slot, clamp 24–34px, 1.15): the three hero figures, lining tabular numerals, isolated LTR.
- **Subhead** (400 slot, 22px, 1.25; Arabic 1.5): sub-section headings on inner pages and form titles. Its muted half is Ink Two, not Mute Grey.
- **Quote** (400 slot, clamp 17–21px, 1.35; Arabic 1.8): the Chairman's quote.
- **Title** (600 slot, 19px, 1.25; Arabic 1.6): H3 in ruled columns, journey milestone titles; 15px in plain scope and value columns.
- **Title small** (600 slot, 15.5px, 1.3; Arabic 1.55): titles in the five-column discipline row.
- **Body** (600, 15.5px, 1.7): running text. Arabic pages step up to 16.5px; English pages are 15px at 1.6.
- **Small 3 / 2 / 1** (14 / 13 / 12px; Arabic 15 / 14 / 13px): the three-step small-text scale. Small 3 for leads, buttons, nav links, field labels and inputs; Small 2 for column text, section buttons, hints, the footer; Small 1 for project-card meta.

Leads are Small 3 in Ink Two, at most 42ch (46ch and 16px in the hero). Column text stops at 36ch; narrow prose at 68ch.

### Named Rules
**The Two-Tone Heading Rule.** A section heading is split in two: the first part in ink, the rest in Mute Grey. The muted part takes its own line only when each line keeps at least two words; joiners (and, of, in, و, في, من…) never end the ink part.

**The Display-Face Boundary Rule.** El Messiri is for headings, titles, figures, the quote, the brand name, project titles, drawer links and journey years. Everything else, including buttons and labels, is Tajawal.

**The Scaled Arabic Rule.** Arabic gets taller line-heights (headings 1.4–1.5, body inherited at 1.7 on a larger size, quote 1.8) and no letter-spacing. Numerals, phone numbers and ISO numbers are isolated LTR with tabular lining figures.

## Layout

One centred column, 1180px wide plus fluid gutters (`spacing.gut`, clamp 18–48px). Sections are separated by space alone: each takes half of `spacing.sec` (clamp 60–128px) above and below, so sections sit a full `sec` apart. There are no section dividers.

- **Section head:** a two-column grid (1fr 1fr, gap clamp 32–96px). The two-tone heading sits at the start; the lead, and any section button, sit at the end, aligned to the bottom of the heading. Stacks under 820px. clamp 36–64px to the content.
- **Hero (home):** a full-viewport photograph, pinned (sticky under the bar) while the white page body slides over it. On screens 941px and wider the hero is inset 8px from the viewport edges with a 3px corner, and the bar lies transparent over it. Centred: H1, lead, the action in its translucent frame. Along the foot, above a 28%-white hairline, the three figures run edge to edge: start, centre, end.
- **Disciplines (home):** ten ruled columns, five across (nine disciplines and a tenth that links to all of them); three across under 1000px, two under 640px.
- **Ruled column grids:** values, scope of work and capabilities run four across (gap 32px × 28px), two under 1000px, one under 640px. The office runs three columns, then one under 860px with its pairs side by side. The careers points run four, two under 900px, one under 520px. ISO standards on the approvals page run three, and under 760px become hairline rows with the number at the start and the scope at the end.
- **Projects:** a category filter (all, water, roads, electrical, urban), then photo cards three across with an 8px gap, two under 1000px, one under 560px (where they turn 2:1).
- **Approvals (home):** the section head in the column, then a full-width cream band holding the moving logo row and one ISO line at its foot.
- **Approvals page:** the ISO columns, then the cream band with a grid of white logo plates, four across (three under 900px, two under 560px), the short last row centred.
- **Leadership (home):** a photo panel split 3fr / 2fr: the Chairman's card and the General Manager's card. Stacks under 900px.
- **Project page:** a sharp photo panel with a 340px facts card at the start; then the scope as ruled columns.
- **Lists:** services index, open roles and journey are hairline-ruled rows (Line), not columns.
- **Forms:** fields 7fr beside an aside of 4fr; fields two across, one under 520px; the grid stacks under 860px.
- **Breakpoints:** 1000px (grids drop a column), 941/940px (nav to drawer, bar 56px, hero no longer inset), 900px, 860px, 820px, 760px, 640px, 560px, 520px, 420px.

**The Logical Properties Rule.** Inline layout uses `inline-start/end`, `margin-inline` and `padding-inline` only. Anything with a physical direction (arrows, the marquee's travel, hover nudges) is multiplied by `--dir` (-1 in RTL, 1 in LTR).

## Elevation & Depth

The system is flat. Depth comes from two things only: photographs under their ink veil, and white cards floating on a photograph. The hero is pinned and the white page body (z-index 1, paper ground) slides over it, which is the one structural depth effect.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 18px 44px -18px rgba(54, 64, 68, 0.55)`): white cards on a photo panel only (Chairman, General Manager, project facts).
- **Hero action frame** (`box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.28)` over a 20% white fill): the translucent frame around the hero's action.
- Inset box-shadows also draw lines, not depth: the current-page nav underline (inset 0 -2px 0), the selected choice underline, the in-progress status ring, the invalid field and the failure notice.

### Named Rules
**The Only-On-A-Photo Rule.** A drop shadow appears only on a white card that floats over a photograph. Nothing on paper casts a shadow.

## Shapes

Corners are near-square everywhere: 4px for large photo panels and controls (buttons, inputs, tags, icon buttons), 3px for cards (project cards, logo plates, floating cards, portraits, the pager, notices, the inset hero). Two one-off radii live inside the hero action: the translucent frame is 8px and the slate phone chip 6px. Status marks and list ticks are 7–8px circles.

The recurring form is the rule, not the box: a 1px ink line across the top of a column, with 16px of space under it and no fill, side or bottom border. Hairlines (1px Line) separate rows in lists. Portraits share one frame: 4:5, cropped from the top. Project cards are 4:3 (2:1 on phones); logo plates are 2:1.

## Components

### Buttons
Small, dark and rectangular, not pills.
- **Action** (the single contact action «تواصل معنا» / Contact us, and the form submits): ink fill, paper text, Small 3 at 600, 40px high, 8px 16px. In the bar it shrinks to 36px and Small 2. Hover (fine pointers) turns the fill slate; press scales to 0.97. Disabled while sending at 70% opacity.
- **Light action** (the hero): paper fill, ink text, 42px, with a 24px slate chip holding a phone icon at its start, all inside a 6px translucent white frame. Hover fills Line.
- **Section button** («محفظة المشاريع», «الشهادات والاعتمادات»…): the same dark button at 36px, 6px 13px, Small 2, naming the page it opens. These are navigation; they never repeat the contact action.
- **Text link:** slate, 600, with a reading-direction arrow; hover underlines at a 6px offset and nudges the arrow 4px forward.
- **Touch:** on coarse pointers buttons keep a 44px hit area through an invisible extension, and inputs grow to 44px.

### Chips
- **Choices** (project filter and tabs): plain text buttons in a row, 44px high, no fill. Unselected Ink Two; hover ink; selected ink at 600 with a 2px slate underline (inset shadow). Press scales to 0.97.
- **Status** on project cards: a small paper dot for completed, a 2px paper ring for in progress, with the status word.
- **Tags** on leadership profiles: plate fill, 4px, Small 2.

### Cards / Containers
- **Ruled column** (signature): see below.
- **Project card:** a 4:3 photograph, 3px corner, under a multiply veil that is darkest at the top (client and status, Small 1) and the foot (the title in El Messiri, paper, up to 18em). Hover or focus scales the photo to 1.03 over 500ms; press scales the card to 0.985. Cards returning from a filter fade in.
- **Photo panel:** a 4px panel on slate, filled with a field photograph blurred 18px at 90% opacity, holding white floating cards (Float shadow, 3px, 20px padding). The Chairman's card has a 112px portrait and the quote; the General Manager's card links to the leadership tab and lifts 2px on hover. On the project page the panel is sharp (no blur) and holds the facts card.
- **Logo plate:** a white 2:1 plate, 3px, 20px 28px, one body's logo centred at an equal visual area.
- **Pager:** two 1px Line-bordered 3px boxes, previous and next; hover fills plate.

### Inputs / Fields
- **Style:** paper fill, 1px Mute Grey border, 4px, 42px high (textarea 116px), 8px 12px, Small 3, slate caret. Labels sit above in Small 3 at 600; hints in Small 2 Ink Two.
- **Focus:** a 2px slate outline at 1px offset and a slate border.
- **Error:** border and a 1px inset ring in ink, with an alert icon and the message in ink at 600. There is no red.
- **Notices:** success is a cream (Band Cream) strip with a check icon; failure is paper with a 1px ink ring.
- **File upload:** a bordered 44px button with an upload icon beside the file name.

### Navigation
- **Bar:** three zones on a grid (start, true centre, end), 62px (56px under 940px). Start: the circular SACC mark (28px) and the company name in El Messiri at 600 slot. Centre: حول / About, الخدمات / Services, المشاريع / Projects, الاعتمادات / Approvals as Small 3 links; the current page has a 2px underline in the bar's text colour; hover is a 45%-Line wash. End: the language switch and the action. On inner pages it is a sticky white bar with a Line bottom edge.
- **Home bar:** on 941px and wider it starts transparent over the hero with paper text, and once the hero has mostly scrolled away (80% of the viewport) it is fixed and white. With scripting it stays fixed and only its colours change, over 200ms, so the change can be interrupted. Its action stays hidden until then, since the hero carries its own.
- **Drawer (under 941px):** a full white sheet with the brand and a close button, links in El Messiri at 26px on 56px hairline rows, then the language switch and the action at the foot. It rises in on the drawer curve, its links following 40ms apart; Escape closes it and focus returns to the menu button; the page behind is inert.
- **Footer:** one compact ink row: the full SACC lockup (white), the rights line, the Careers link and the language switch, underlined. No sitemap, no repeat of the nav.

### Ruled Column (signature)
A column under a firm 1px ink rule, 16px below it to the title, then a short line in Ink Two. No fill, no box, no side borders. Linked columns (the disciplines) turn the rule and title slate on hover or focus and show a corner arrow; on phones the arrow is always shown. The tenth discipline column is a slate link to all disciplines. The same rule tops the values, the scope of work, the ISO standards, the office and the careers points.

### Logo Marquee (signature, home)
The seven approving bodies' logos, without plates, slide in one endless row across the cream band (48s per loop, 40s on phones), faded at both ends by a mask. The row pauses on hover and on keyboard focus. The second copy is hidden from assistive technology. Under reduced motion the copy is removed, the mask dropped, and the logos stand still, wrapped and centred. Logos are sized to an equal visual area, not an equal height. Under the row, above a 25%-ink hairline, one quiet line lists the three ISO standards.

### Motion
Two curves: `--ease-out` cubic-bezier(0.23, 1, 0.32, 1) for nearly everything, and `--ease-drawer` cubic-bezier(0.32, 0.72, 0, 1) for the phone sheet. Only transform and opacity move; colour changes take 150ms; interface motion stays under 300ms.
- **Press:** buttons, the file button and choices scale to 0.97; icon buttons 0.94; project cards and pager links 0.985; the General Manager's card 0.99; linked columns move 1px down.
- **Hover:** only under `(hover: hover) and (pointer: fine)`, so a tap never leaves a stuck hover.
- **Entrances:** the hero's name, lead, action and figures rise 10px in turn (600ms, 70ms apart). Sections rise once as they enter the view (500ms, 50ms stagger across a row); what is already on screen at load is left alone, and without scripting everything is simply there.
- **Reduced motion:** all animation stops and only opacity, colour, background, border and shadow transitions remain. The marquee stands still.

**The One Contact Action Rule.** One contact action («تواصل معنا» / Contact us) is visible at a time. On the home page the bar's copy appears only after the hero's own has scrolled away; on the contact page the form stands in for it. Sections never repeat it.

## Do's and Don'ts

### Do:
- **Do** set new content on white paper in ink, with Ink Two for secondary text and slate only for what is interactive or selected.
- **Do** put a list of comparable items in ruled columns: a 1px ink rule on top, 16px gap, title in El Messiri, text in Tajawal, no fill.
- **Do** split section headings into two tones, ink then Mute Grey, using the shared heading component.
- **Do** keep small text on the three-step scale (12 / 13 / 14px; 13 / 14 / 15px in Arabic).
- **Do** put text on a photograph only under the ink multiply veil, in paper.
- **Do** keep corners at 4px (panels, controls) or 3px (cards).
- **Do** give every pressable element a scale press, keep hover inside `(hover: hover) and (pointer: fine)`, and keep a 44px hit area on touch.
- **Do** write layout with logical properties and multiply directional motion by `--dir`.
- **Do** show approving bodies only by their own logos, uncoloured, at an equal visual area.

### Don't:
- **Don't** fill columns with beige or grey plates; the owner rejected them as sticky notes.
- **Don't** use pills, large radii or heavy shadows; the only drop shadow is on a white card over a photograph.
- **Don't** use stone, teal, warm, deco or plate-2 as surfaces; they are declared but retired.
- **Don't** add a second contact action to a section, or a sitemap footer.
- **Don't** use Mute Grey for body-size text, or Line for any text.
- **Don't** bring back a fleet page or fleet nav item.
- **Don't** add small uppercase labels above new section headings. The four home section heads that show one do so by an earlier owner choice; it is not a pattern to extend.
- **Don't** recolour, redraw or tint the SACC logo or any body's logo.
- **Don't** invent testimonials, certificate numbers, client logos or figures.
