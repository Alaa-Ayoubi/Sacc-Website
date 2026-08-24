# Handoff: SACC One-Page Website (Bilingual)

## Overview
Bilingual (Arabic-first, English toggle) one-page marketing site for Sana Al-Awael Contracting Company (SACC), a Saudi infrastructure contractor. Sections: Home hero, stats band, company intro, Why Choose SACC, Services (9 disciplines), Projects (filterable portfolio), Equipment fleet, Certifications, Journey/timeline, Leadership, Contact form, plus a separate Careers page/section with job listings and an application form.

## About the Design Files
The bundled HTML/JS files are **design references** — an interactive prototype built to show layout, content, and behavior. They are not production code to copy as-is. The task is to **recreate this design in React** (per the requested stack), using standard React patterns (component tree, props, state/hooks) and whatever component/styling library the target project already uses. If no target project exists yet, scaffold a fresh React app (Vite recommended) and implement the design there.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy in the reference files are final. Recreate pixel-accurately using the codebase's styling approach (CSS-in-JS, Tailwind, CSS modules — whichever the target uses).

## Screens / Views
Single page app with in-page anchor navigation (#services, #projects, #equipment, #certifications, #journey, #leadership, #contact) plus a second page/route for Careers (#top careers hero → #apply).

### 1. Header (fixed)
- Fixed top nav, transitions to translucent navy (95% opacity + 12px backdrop blur) after 20px scroll.
- Left: SACC logo lockup (white wordmark + mark), only usable on navy/photo backgrounds.
- Center/right: nav links (Services, Projects, Equipment, Certifications, Journey, Leadership, Contact), active link gets a white/10% pill background.
- Right: language toggle (AR ⇄ EN, swaps entire page dir and content), "Request a Quote" CTA button (gold), "Join Us" link to careers.
- RTL: entire layout mirrors under dir="rtl" for Arabic — this must be a global CSS logical-properties concern (margin-inline, etc.), not per-component overrides.

### 2. Home Hero
- Full-bleed background photo (hero-infrastructure.jpg) with parallax-style scroll effect and a subtle animated canvas/WebGL overlay (screen-blend, 55% opacity) — decorative, can be simplified to a static gradient if WebGL isn't warranted in production.
- Navy gradient overlay left-to-right for text legibility.
- Content: eyebrow badge ("ENGINEERING EXCELLENCE" / "التميّز الهندسي", gold, uppercase, letter-spaced), H1 title (Playfair Display equivalent — see Design Tokens), lead paragraph (one sentence, comma-joined qualifiers), two CTAs (primary gold button "Explore Our Services", secondary outline "Contact Us"), small scroll-cue link at bottom.
- Min-height ~620px, flex-centered content.

### 3. Stats band
- Dark navy background (#0a1b28), 4-column grid, border-bottom hairline.
- Each cell: large stat value (e.g. "2007", "35+", "150+", "100%") + label underneath. No borders between cells, no icons.

### 4. Marquee/ticker strip (optional accent)
- Slim horizontal band (#0f2637) with small label + scrolling/rotating list of credentials or client names. Decorative; can be a simple horizontal scroll or removed if not core to brand needs.

### 5. About/Intro section (#about)
- White background, 2-column grid (1.15fr content / 1fr).
- Eyebrow label, H2 title, 3 body paragraphs (company history, philosophy, capability summary).
- "Why Choose SACC" sub-block: dark slate/navy band, 4-column grid of 8 checkmark-icon bullet items (short benefit phrases, no periods).

### 6. Services section (#services)
- Muted background (#f4f7f9), top border hairline.
- Eyebrow + H2 ("Nine Delivery Disciplines") + lead paragraph, max-width 720px.
- Grid of 9 service cards, each: icon (Lucide, in tinted gold-10% rounded square), title, one-sentence description, 4 capability bullet phrases (gold dot + noun phrase, no verb/period), "Inquire About [Service]" outline button.
- Icons used: Droplets, CloudRain, Zap, Route, Construction, Building2, ShieldCheck, Truck, Settings.

### 7. Projects section (#projects)
- Filterable portfolio: category pill buttons (All / Water Infrastructure / Roads & Asphalt / Electrical Infrastructure / Urban Development) — active pill filled gold/navy, others outline.
- Grid of project cards (6 sample projects in reference data): title, location, client, status badge (Completed/In Progress), one-paragraph description, expandable "View details" revealing scope-of-works bullet list, "Enquire About This Project" CTA.
- Empty state copy provided if a filtered category has zero results.

### 8. Equipment section (#equipment)
- White background, 2-column grid (image + copy) intro (150+ machine fleet, 2 paragraphs), CTA "Request Fleet Specifications".
- List of 9 equipment categories (plain list/grid, no per-item photos needed).
- 4-feature support grid: Preventive Maintenance, Modern Fleet Management (GPS/telematics), Safety Compliance, Operational Readiness — each with Lucide icon (Wrench, Satellite, HardHat, Clock) + title + description.

### 9. Quote/legacy band (chairman feature)
- Full-width dark navy panel (#0f2637) with faint vertical-line pattern background (decorative, low priority).
- Grid: icon/mark + chairman portrait (greyscale, mix-blend-mode:luminosity over navy) on one side, pull-quote + name + title (Chairman) on the other.

### 10. Certifications section (#certifications)
- Muted background, top border hairline.
- Commitment statement (title + paragraph).
- Two-column: ISO certifications list (3 items: ISO 9001:2015, 14001:2015, 45001:2018, each with description) and Government Approvals list (7 named Saudi entities: NWC, SCA, SEC, Saudi Aramco, MAADEN, Royal Commission Jubail/Yanbu, MOMRA).
- CTA: "Request Certification Documents".

### 11. Journey/Timeline section (#journey)
- 6-milestone timeline (2007 founding → 2012 regional expansion → 2015 ISO → 2018 fleet modernization → 2021 NWC approval → Present/turnkey leader), each with year, title, short description.
- Core Values grid below: 7 values (Integrity, Quality, Innovation, Commitment, Partnership, Sustainability, People), each a title + one-sentence description.

### 12. Leadership section (#leadership)
- Eyebrow + H2 + lead.
- 2 leader cards: Chairman (Eng. Wasef Zeitoun) and General Manager (Eng. Fathy Ibrahim Aboukoura) — name, title, bio paragraph, 4 expertise tags each.
- Quote block possibly reused from home hero legacy panel — check for duplication and consolidate into one shared component in the React build.

### 13. Contact section (#contact)
- 2-column: contact form (left) + office info (right).
- Form fields: Full Name*, Email*, Company/Entity*, Project Type* (select: Water & Sewerage, Roads & Asphalt, Bridges & Tunnels, Urban Development, Equipment Rental, Other), Project details* (textarea).
- Validation errors (sentence case, no period) per field.
- Success message on submit: "Your request has been received. We will respond within 24 working hours." This form has no live backend — wire to whatever submission endpoint/service the target app uses (email API, CRM, serverless function, etc.).
- Right column: Head Office address, Working Hours (Sun–Thu 08:00–17:00, Fri/Sat closed), CR number.

### 14. Careers page (#top on careers route, #apply anchor)
- Separate hero (shorter, 440px min-height) with dark gradient over photo, badge "CAREERS", title "Join Sana Al-Awael", lead paragraph, CTA "Apply now" scrolling to #apply.
- "Why work with us": 4 benefit cards (icons: Layers, GraduationCap, HardHat, Users) — national-scale projects, continuous development, zero-harm safety culture, stable team.
- "Open roles" list: 6 roles (Civil Project Engineer, Water & Sewerage Network Engineer, Surveyor, HSE Officer, Materials Laboratory Technician, Heavy Equipment Operator), each with department, location, employment type, experience requirement. Include an "apply anyway" note if no role matches.
- Application form (#apply): Full Name*, Email*, Mobile Number*, Role applied for* (select, includes "Other role / general application"), Years of experience*, CV* (either a link field OR file upload — either satisfies the requirement, hint text specifies PDF/DOC up to 5MB), About you (optional textarea).
- Success message: "Your application has been received. HR will contact you if your profile matches the role." No live backend — wire to an ATS/email endpoint.

## Interactions & Behavior
- Language toggle: swaps dir attribute (rtl/ltr) and all copy from a single bilingual content object (see site-data.js) — implement as React context or state lifted to the app root, with text pulled from locale dictionaries (ar / en keys already structured this way in the reference data).
- Header scroll state: background/blur change after 20px scroll — use a scroll listener or IntersectionObserver on a sentinel element.
- Project filter: clicking a category pill filters the visible project list; filtering resets any expanded/open card.
- Project card expand/collapse: toggles a details panel (scope-of-works list + CTA) per card; independent per card.
- Reveal-on-scroll: sections/elements marked data-reveal fade up 20px on scroll into view (100ms stagger by index, ease-out) — implement with IntersectionObserver + CSS transition.
- Hero parallax/canvas: decorative background photo parallax + a subtle animated canvas overlay behind the hero text. A static hero image is an acceptable simplification.
- Forms: client-side validation on submit (required fields, email format, min-length message), inline error text under each field, then a success confirmation state. Both forms (contact + careers application) require backend wiring — see notes above.
- Smooth scroll: nav links and in-page CTAs scroll smoothly to section anchors.

## State Management
- language: 'ar' | 'en' — app-level state, drives dir and content source.
- route: 'home' | 'careers' — simple 2-view router (React Router or a state flag is enough).
- scrolled: boolean — header style state, from scroll position.
- projectFilter: string — active project category key ('all' | 'water' | 'roads' | 'electrical' | 'urban').
- expandedProjectId: number | null — which project card is expanded.
- Contact form state: field values, validation errors, submitting boolean, submitted boolean.
- Careers application form state: field values (including CV as link-or-file), validation errors, submitting, submitted.

## Design Tokens

### Colors
- Navy (primary/dark): #1A3951 (brand token) — reference file uses deeper variants #0A1B28, #0F2637 for section backgrounds; reconcile against the bound design system's official navy before final build.
- Slate (body text / one band): #4A5568
- Gold (accent, CTAs, icons, active states): #D4AF35
- Backgrounds: #FAFAFA (page), #FFFFFF (cards), #F1F5F9 / #F4F7F9 / #F2F5F7 (muted sections — pick one consistent muted tone)
- Borders: #E2E8F0 light, rgba(255,255,255,.09-.1) on dark
- Error red: #EF4343
- Rule: max 2 background colors per view — audit final section backgrounds against this before merging.

### Typography
- Headings: Playfair Display (English) / Almarai 800 (Arabic) — bold, negative tracking on large sizes, text-wrap: balance.
- Body: Outfit (English) / Tajawal (Arabic) — 16px / 1.625 line-height, max 65ch measure; Arabic uses 1.85 line-height and zeroed tracking.
- ALL CAPS restricted to hero eyebrow badge and small role labels (e.g. "CHAIRMAN") — always letter-spaced.

### Spacing / Layout
- Max container width: 1280-1320px (reference file uses 1320px; official token is 1280px — confirm with design system before final build), centered, 32px gutters.
- Section vertical padding: ~104-124px in the reference (heavier than the 80/96px in the base design system — flag to design system owner if inconsistency matters).
- Grids: 4-col (stats, footer, reason chips), 3-col (services, projects), 2-col (about, equipment).

### Radius / Elevation
- Buttons/inputs: 6px. Chips: 8px. Cards: 12px. Feature panels/hero images: 16px. Pills/bullets: fully round.
- Cards: white, 1px #E2E8F0 border, resting shadow; hover lifts 4px, shadow-xl, border turns gold; hover image zoom 1.05 over 500ms.

### Motion
- Entrance: fade + 20px rise, 100ms stagger by index, ease-out.
- Hover/press: buttons opacity shift (0.9/0.8), press scale(0.98). Card lift 300ms. Icon tiles flip 10%→solid gold w/ navy glyph.
- Focus: 1px gold ring, focus-visible only.

## Assets
- Logo: assets/logo-full.webp (horizontal lockup, white wordmark — navy/dark backgrounds only), assets/logo.png (mark alone, used for favicons/app icon).
- Favicons: assets/favicon.png, favicon-192.png, favicon-512.png, apple-touch-icon.png.
- OG image: assets/og-image.jpg.
- Photos (local): assets/photos/hero-infrastructure.jpg, equipment-fleet.jpg, water-network.jpg, public-realm.jpg.
- Photos (remote placeholders — replace before production): several horizons-cdn.hostinger.com URLs remain in site-data.js for project/careers/leadership imagery (urban development, careers hero, chairman portrait, GM portrait, some project cards) — these belong to the client's old CMS and should be replaced with owned assets.
- Icons: Lucide icon set (loaded from CDN in the reference: unpkg.com/lucide@0.469.0) — in React, install lucide-react instead of the CDN script.
- Fonts: Playfair Display, Outfit, Almarai, Tajawal — self-hosted woff2 files available in the bound design system's fonts/ folder; copy those rather than using Google Fonts CDN in production if offline/perf matters.

## Files
- SACC Website.dc.html — main interactive prototype (all sections, both languages, both routes).
- site-data.js — full bilingual content object (window.SACC_SITE), structured as { company, images, ar: {...}, en: {...} } with matching keys per section — use this structure directly as your i18n dictionary shape.
- ds-base.js — loads the design system bundle/tokens into the prototype (reference only, not needed in the React rebuild — use the design system's actual token files/theme instead).
