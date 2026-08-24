# SACC Design System

Design system for **Sana Al-Awael Contracting Company (SACC)** — شركة سنا الأوائل للمقاولات
— a Saudi infrastructure contractor founded in 2007 and based in Al Madinah Al
Munawwarah. CR 4650242007. The company builds water and sewerage networks,
stormwater drainage, electrical and solar networks, roads and asphalt, bridges
and tunnels, landscaping and urban development, and rents out a 150+ machine
fleet. Clients are government and semi-government: the National Water Company,
the Ministry of Environment Water and Agriculture, the Ministry of Transport,
Al Madinah Municipality.

## Sources

Everything here was read from one source, a mounted read-only codebase:

- `horizons-export-452dd903-afe9-42ac-8b4c-5c4b979ffaf2/apps/web` — the
  production React + Vite + Tailwind site for **saccgroup.net**, exported from
  Hostinger Horizons. Design tokens came from `src/index.css` and
  `tailwind.config.js`; components from `src/components/**`; copy from
  `src/content/*.js` and `src/lib/seo-data.js`; brand files from `public/`.
- Sibling folders in that export (`_claude_tmp/`, `_preview/`, `_to_delete/`,
  `dist2/`, the `sacc-*.tar.gz` archives) are build output and staging copies of
  the same site; nothing unique was taken from them.
- `apps/web/brand/README.md` states the official logo is supplied as a
  horizontal lockup — circular mark plus SACC wordmark — and that the artwork is
  only ever cropped or resized, never redrawn or recoloured. That rule holds here.

No Figma file, brand book, slide template or second product was provided. There
is one product: the bilingual marketing website (English at the root, Arabic
under `/ar`, fully mirrored RTL).

## Products

| Surface | What it is | UI kit |
| --- | --- | --- |
| saccgroup.net | Eight-page bilingual marketing site: Home, About, Services, Projects, Equipment, Certifications, Leadership, Contact | `ui_kits/website/` |

The site is server-prerendered for SEO, has a PHP contact endpoint
(`public/contact.php`) and an `/ar` mirror driven entirely by `[dir="rtl"]` CSS
— no component markup changes between languages.

---

## CONTENT FUNDAMENTALS

**Register.** Corporate-formal, addressed to procurement officers and government
clients, not consumers. Confident and plain; claims are always tied to a
verifiable fact (a certificate number, a year, a fleet count, a named client).

**Person.** "We" for the company, "your" for the client. Never "I". Never a
first-person founder voice outside the chairman's signed quote.

**Casing.** Title Case for headings and buttons: "Fabricating the Future Starts
Today", "Explore Our Services", "View All Services". Sentence case for body copy,
form labels and error messages. ALL CAPS appears in exactly two places — the hero
eyebrow ("ENGINEERING EXCELLENCE") and the small role label under a name
("CHAIRMAN"), both letter-spaced.

**Sentence shape.** Headings are 4–8 words. Leads are one long sentence with a
comma-joined qualifier: "Delivering integrated infrastructure solutions, from
advanced water networks to complex urban development, powering the Kingdom's
growth." Card descriptions are a single sentence, 12–25 words. Capability lines
are noun phrases with no verb and no full stop: "Main transmission lines",
"Pumping stations", "Field density tests".

**Vocabulary that recurs.** integrated, turnkey, comprehensive, infrastructure,
engineering excellence, the Kingdom, on time, to the highest standards,
zero-harm, handover, commissioning, scope of works. "The Kingdom" is preferred
over "Saudi Arabia" inside body copy.

**Numbers as proof.** Figures carry a label, never a claim: "2007 / Established",
"35+ / Years Leadership Experience", "150+ / Equipment Fleet", "100% / Safety
Compliance". Portfolio counts on the projects page are computed from the project
list so they cannot drift.

**CTAs** are verb-first and specific: "Explore Our Services", "Request a
Consultation", "Discuss Your Next Project", "Enquire About This Project",
"Submit Inquiry", "Meet Our Leadership", "Read Our Full Story →". The arrow "→"
appears only on the inline text link.

**Forms.** Required fields end in ` *`. Placeholders are examples, not repeated
labels ("your.email@company.com", "Tell us about your project requirements...").
Errors are short, sentence case, no full stop: "Company name is required",
"Please enter a valid email address". Success copy states the promise:
"Thank you for your inquiry. We will respond within 24 hours for enterprise
inquiries."

**Emoji: never.** Not in the site, not in the content files, not in UI. Icons do
that job. The only non-alphanumeric glyphs used in copy are "→", "←" (Arabic),
"©", "&" and Arabic guillemets «…» for the chairman's quote in Arabic.

**Arabic.** A full translation, not a machine mirror: the Arabic hero reads
"صناعة المستقبل تبدأ اليوم". Terms follow Saudi government usage — شركة المياه
الوطنية, الهيئة السعودية للمقاولين, س.ت for CR. Arabic never uses italics.

---

## VISUAL FOUNDATIONS

**Palette.** Three colours do all the work. Deep navy `#1A3951` (headings, header,
footer, hero overlay, feature panels), slate `#4A5568` (body text and one
full-width band), and gold `#D4AF35` (icons, active nav underline, bullet dots,
rules, the eyebrow badge, the submit button). Backgrounds alternate between
`#FAFAFA` page, white cards and `#F1F5F9` muted sections. Red `#EF4343` is
reserved for field errors. **Two background colours per view, maximum** — the
site never stacks three tinted sections in a row. A `.dark` scope exists in the
tokens but is not used by any shipped page.

The four circus colours inside the logo mark (teal, yellow, orange, green) never
appear in the interface.

**Type.** Playfair Display for every heading, blockquote and figure; Outfit for
everything else. Headings are bold with negative tracking (−0.02em at h1) and
`text-wrap: balance`; body is 16px at 1.625 line-height and capped at 65
characters. Arabic swaps to Almarai 800 for headings and Tajawal for body, with
looser leading (1.85) and all Latin tracking utilities zeroed out.

**Layout.** One container: max-width 1280px, centred, 16/24/32px gutters.
Sections are 80px tall vertically (96px from 768px up). Grids are 2-up (stats),
3-up (services, projects), 4-up (footer, reason chips). The header is fixed and
the page reserves 80px for it. Nothing else is fixed or sticky.

**Imagery.** Real construction photography, full-bleed, always under a navy
multiply overlay — 80% on the hero, 10% on service images. The chairman's
portrait is greyscale with `mix-blend-mode: luminosity` over navy. No
illustrations, no icon art, no stock-business imagery, no patterns, no textures,
no gradients anywhere. Photos are warm and dusty (desert daylight) and are never
tinted a different hue.

**Cards.** White, 12px radius, 1px `#E2E8F0` border, resting `shadow`. On hover
they lift 4px, go to `shadow-xl` and the border turns gold; photo cards zoom
their image to 1.05 over 500ms. Stat tiles are the exception: no border, resting
`shadow-lg`. Feature panels (chairman, certifications) go to 16px radius and
`shadow-2xl`. No inner shadows exist in the system.

**Corners.** 6px on buttons and inputs, 8px on chips, 12px on cards, 16px on
panels and hero images, fully round on pills, filter buttons and bullet dots.

**Borders.** Hairline `#E2E8F0` everywhere on light; `rgb(255 255 255 / 0.1)` on
navy and slate bands, where fills are `rgb(255 255 255 / 0.05)`. Gold is a hover
border, never a resting one, and never a coloured left-edge accent.

**Transparency and blur.** Three uses only: the header becomes navy at 95% with
a 12px backdrop blur after 20px of scroll; category pills on photos are white at
90% with a 4px blur; on dark bands, surfaces are white at 5%. Nothing else is
translucent.

**Motion.** One entrance: fade from 0 opacity and 20px below, 100ms staggered by
index, ease-out. Hero runs 800ms; everything else 300–500ms. Colour, border and
shadow transitions are 300ms. The only spring in the system is the active-nav
underline (stiffness 300, damping 30). No bounces, no parallax, no scroll-jacking,
no looping animation.

**Hover states.** Buttons change opacity (0.9 default, 0.8 secondary) rather than
colour — except outline and ghost, which fill gold. Links go gold. Nav items go
from white/80 to white with a white/10 pill. Cards lift. Icon tiles flip from 10%
gold to solid gold with a navy glyph. The text CTA widens its gap from 8 to 12px.

**Press states.** `scale(0.98)`, on the submit button in the source; applied to
all buttons here. No colour change on press.

**Focus.** A 1px gold ring (`--ring`), `focus-visible` only.

---

## ICONOGRAPHY

**One set: Lucide.** The site imports `lucide-react` and nothing else. There is
no icon font, no SVG sprite, no PNG icon, and no bespoke glyph anywhere in the
codebase — so nothing was copied into `assets/`, and nothing was redrawn.
This system loads the same set from CDN:

```html
<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js"></script>
```

`components/icons/Icon.jsx` reads glyph data off `window.lucide.icons` and
renders it, so every icon is the genuine Lucide path — never an approximation.

**Usage.** Default stroke width 2, `currentColor`, and gold in almost every
context. Sizes actually used: 16 and 18 (inline with text), 20–22 (list bullets
and stat bands), 24–28 (card headers), 32–48 (section marks). Service icons sit
in a 56 or 64px rounded square tinted 10% gold. The recurring names are
`Droplets, CloudRain, Zap, Route, Building2, ShieldCheck, Truck, Settings,
MapPin, Phone, Mail, Building, Calendar, Gauge, CheckCircle2, CheckCircle,
Award, Users, Layers, Landmark, Map, Linkedin, Plus, ArrowRight, Menu, X,
Loader2`.

**Not icons.** Bullet dots are 6–8px gold circles, not glyphs. "ISO" is set as
type in a tinted square, not as a badge graphic. Directional icons mirror under
`[dir="rtl"]` via `transform: scaleX(-1)`. Emoji are never used. Unicode arrows
appear in link copy only ("→", "←"), never as UI affordances.

**Logo.** `assets/logo-full.webp` is the horizontal lockup: the four-colour
circular mark followed by a **white** SACC wordmark, so it only works on navy or
over the hero overlay. `assets/logo.png` is the mark alone (favicon, app icon).
No dark-on-light lockup exists in the sources — if you need one, set the company
name in Playfair Display rather than recolouring the artwork.

---

## Intentional additions

Three components have no direct export in the source; each consolidates markup
the source repeats inline across page files.

- **PageHero** — the hero band, repeated in all eight pages.
- **StatCard** — the figure-plus-label tile, repeated on Home and Projects.
- **Icon / IconTile** — a thin wrapper over Lucide plus the tinted icon square,
  so the glyph set is loaded once and never hand-drawn.

**Badge** merges five separate inline label treatments (hero eyebrow, gold
project chip, navy equipment chip, grey capability chip, glass photo pill) into
one component with five variants.

---

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | Global entry point — `@import` list only |
| `tokens/colors.css` | shadcn HSL triplets, hex aliases, semantic aliases, overlays, logo palette |
| `tokens/fonts.css` | Imports the self-hosted `@font-face` set |
| `tokens/webfonts.css` | 20 `@font-face` rules pointing at `fonts/*.woff2` |
| `fonts/` | Almarai, Tajawal, Outfit, Playfair Display woff2 files (downloaded from Google Fonts) |
| `vendor/` | Self-hosted libraries: react, react-dom, babel, lucide, gsap, ScrollTrigger, lenis, three |
| `assets/photos/` | Local copies of the hero, fleet, water and public-realm photography |
| `tokens/typography.css` | Families, sizes, weights, leading, tracking, measure |
| `tokens/spacing.css` | Spacing scale, container, section rhythm, card padding |
| `tokens/radius.css` | Corner radii |
| `tokens/elevation.css` | Shadow scale and blur values |
| `tokens/motion.css` | Durations, easing, hover/press transforms |
| `assets/` | `logo-full.webp` (lockup), `logo.png` (mark), favicons, `og-image.jpg` |
| `guidelines/*.html` | 17 foundation specimen cards (Colors, Type, Spacing, Brand) |
| `components/core/` | Button, Card, Input, Textarea, Label + FieldError, Select, Badge |
| `components/icons/` | Icon, IconTile |
| `components/cards/` | ServiceCard, ProjectCard, EquipmentCard, LeadershipCard, StatCard |
| `components/site/` | Header, Footer, PageHero |
| `components/forms/` | ContactForm |
| `ui_kits/website/` | Click-through recreation of saccgroup.net (5 screens) |
| `templates/marketing-page/` | Page skeleton in the existing brand (navy + gold) |
| `templates/sacc-site/` | **New** one-page site direction: professional contracting register, palette built from the four logo colours on navy, Arabic-first with an EN toggle, all original site content plus a careers page and application form. Copy lives in `site-data.js` |
| `SKILL.md` | Agent-skill entry point |

Each component directory carries `<Name>.jsx`, `<Name>.d.ts`,
`<Name>.prompt.md` and one `@dsCard` HTML preview.

## Known gaps

- The lockup exists only with a white wordmark; there is no light-background
  version, and no SVG original.
- Fonts are self-hosted in `fonts/` (downloaded from Google Fonts); no font
  binaries were supplied by the client, so these are the Google releases.
- Every JavaScript library is self-hosted in `vendor/` — nothing loads from a
  CDN, and the pages work offline.
- Four photographs are stored locally in `assets/photos/`. The rest live on the
  client's Hostinger CDN, which refuses cross-origin download; replace those
  URLs in `templates/sacc-site/site-data.js` once you have the originals.
- The `.dark` token scope is defined in the source but no page uses it; treat it
  as unverified.
