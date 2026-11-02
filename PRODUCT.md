# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary audiences, weighted equally (confirmed):

- **Government and semi-government clients.** Procurement officers and project engineers at entities such as the National Water Company, the Ministry of Environment, Water and Agriculture, the Ministry of Transport, the Saudi Electricity Company and Al Madinah Municipality. They are prequalifying or shortlisting an infrastructure contractor and need verifiable proof: approvals, ISO certificates, delivered projects, fleet capacity, and leadership.
- **Private developers and main contractors.** They need a specialist subcontractor for a package, or equipment rental from the fleet. They need the same proof, plus a fast route to a quote.

Secondary audience: engineers and technical staff looking for work. They use the Careers page and its application form, with a CV upload.

## Product Purpose

The bilingual (Arabic / English) public website, live at https://saccgroup.net/, of **Sana Al-Awael Contracting Company (SACC)**, شركة سنا الأوائل للمقاولات. SACC is a Saudi infrastructure contractor founded in 2007 and headquartered in Al Madinah Al Munawwarah.

The site exists to win and qualify work. It establishes credibility with clients and turns that into enquiries. It also recruits technical staff.

Success means real enquiries arriving: quote requests from the Contact form, document requests for certificates and fleet specifications, and job applications. Every enquiry is now stored and staff are notified; before, the forms were faked and every enquiry was lost.

## Positioning

The four strengths below were confirmed together. A neighbouring contractor would have to match all four to copy the claim:

1. **Qualified and approved.** Approved contractor for the National Water Company and other government bodies. Holds ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018.
2. **Owned fleet.** 150+ machines are owned, not hired. This gives control over schedules, and the fleet is also rented out.
3. **Integrated multi-discipline delivery.** Nine disciplines under one contractor, delivered turnkey: water and sewerage, stormwater, electrical and solar, roads and asphalt, bridges and tunnels, landscaping and urban development, and more.
4. **Local experience across several regions of the Kingdom.** The base is Al Madinah, but the record is national, for example the Haramain High-Speed Rail water network and the Qiddiya infrastructure works.

## Operating Context

- **Evaluation:** visitors arrive during prequalification, tender shortlisting or subcontractor sourcing. They scan for approvals, certificates, comparable projects, fleet and leadership, then request documents or a quote.
- **Conversion paths:** the Contact form sends a quote request (`POST /api/v1/leads/quote-requests/`). The Careers form sends an application, with an optional CV (`POST /api/v1/careers/applications/`). Staff are notified at `info@saccgroup.net`. Enterprise and government enquiries are promised a response within 24 business hours.
- **Content operations:** all content is bilingual and edited in the Django admin. It is exported to the static `site-data.js` snapshot, so the page loads without waiting on a sleeping free-tier API.
- **Office:** Head Office in Al Madinah Al Munawwarah, Kingdom of Saudi Arabia. Working hours are Sat–Thu 08:00–17:00; Friday closed (owner correction). CR 4650242007. Phone +966 14 848 4014, mobile +966 50 426 6876.

## Capabilities and Constraints

- **Pages:** Home, About, Services, Projects, Equipment, Certifications, Journey, Leadership, Contact, Careers. Each is a real page switch synced to the URL hash (e.g. `/#services`).
- **Languages:** Arabic-first, with a toggle to English that swaps the whole page and its direction. RTL is a global concern handled with CSS logical properties, never per-component overrides. Both languages must always stay at parity.
- **Stack (existing):** React + Vite frontend (`frontend/`). Django + PostgreSQL backend (`backend/`) that owns the content and the form submissions. Hosted on Render free tier; database on Neon.
- **Projects:** filterable by category (water, roads, electrical, urban development). Portfolio counts are computed from the project list so they cannot drift.
- **Security:** the repository is public, so secrets, `.env` files and uploaded CVs never enter git (see `SECURITY.md`).
- **Terminology:** "the Kingdom" is preferred over "Saudi Arabia" in body copy. Recurring terms include integrated, turnkey, scope of works, handover, commissioning, and zero-harm.

## Brand Commitments

- **Name:** Sana Al-Awael Contracting Company (SACC) / شركة سنا الأوائل للمقاولات.
- **Logo:** the official logo is a horizontal lockup of the circular mark plus the SACC wordmark (`frontend/public/assets/logo-full.webp`, `logo.png`). It may only be cropped or resized, never redrawn or recoloured.
- **Voice:** corporate-formal and plain. It is addressed to procurement officers and government clients, not consumers. "We" means the company and "your" means the client; never "I", except in the chairman's signed quote. Every claim is tied to a verifiable fact: a certificate, a year, a fleet count, or a named client. Numbers carry a label, never an adjective. CTAs start with a verb and are specific, e.g. "Request Certification Documents" or "Enquire About This Project". Full copy rules are in `_ds/sacc-design-system-*/readme.md` under "Content fundamentals".

## Evidence on Hand

The live production site is **https://saccgroup.net/**. The owner confirms that every piece of information and data on it is real. It is the reference for product facts.

All of the following is confirmed real by the owner:

- **Stats:** Established 2007 · 35+ years of leadership experience · 150+ machines in the equipment fleet · 100% safety compliance.
- **Projects (6):**
  - Outfall Line for ISTP3 (National Water Company, completed)
  - Reused Water Network (Ministry of Environment, Water and Agriculture, completed)
  - Six Flags Qiddiya Infrastructure Works (Qiddiya Investment Company, in progress)
  - Haramain High-Speed Rail Water Network (Saudi Railway Organization, completed)
  - Al Madinah Road Expansion (Ministry of Transport, completed)
  - Electrical Infrastructure Network (Saudi Electricity Company, completed)
- **Certifications:** ISO 9001:2015, ISO 14001:2015, ISO 45001:2018.
- **Government approvals:** NWC, SCA, SEC, Saudi Aramco, MAADEN, the Royal Commission for Jubail and Yanbu, MOMRA.
- **Leadership:** Chairman Eng. Wasef Zeitoun and General Manager Eng. Fathy Ibrahim Aboukoura, with bios and the chairman's quote.
- **Journey:** six milestones (2007 founding → present) and seven core values.
- **Photography:** `frontend/public/assets/photos/` holds `hero-infrastructure.jpg`, `water-network.jpg`, `equipment-fleet.jpg` and `public-realm.jpg`.
- **Source of all content:** `frontend/src/data/site-content.json` (mirrored in `site-data.js` and the Django seed).

**Absent, and must not be fabricated:** client testimonials, project values, project photos beyond the four above, certificate numbers, and named client logos as image assets.

## Product Principles

1. **Proof before promise.** Every claim is backed by a named client, certificate, year or count that a procurement officer can verify.
2. **Two equal front doors.** Government evaluators and private developers both reach proof and a quote path in the same few steps. Neither is treated as secondary.
3. **Arabic and English are one product.** Content, function and quality stay at full parity, and RTL is native, not an afterthought.
4. **Every enquiry counts.** Forms must persist, notify staff and confirm receipt honestly. A lost submission is a lost contract.
5. **Content stays editable.** Facts live in the admin and the content bundle, not hard-coded in components, so staff can keep them current.

## Accessibility & Inclusion

- Full right-to-left support for Arabic, mirrored through logical properties, with the correct `lang` and `dir` on the document.
- `prefers-reduced-motion` is already honoured by the scroll-reveal, the ticker and the hero grid (`Motion.jsx`, `HeroGrid.jsx`, `app.css`), and must stay that way.
- **Standard: WCAG 2.2 level AA** (owner decision). Text contrast of at least 4.5:1 (3:1 for large text and UI parts), full keyboard use with visible focus, alt text on every photo, labelled form fields, and target sizes of at least 24×24 px.
