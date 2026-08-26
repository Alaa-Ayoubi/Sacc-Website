# SACC Website — React Frontend

Bilingual (Arabic / English) multi-page marketing site for Sana Al-Awael
Contracting Company (SACC), built with React + Vite.

## Pages

Home, About, Services, Projects, Equipment, Certifications, Journey,
Leadership, Contact, and Careers — each a real page switch (not a scroll
anchor), synced to the URL hash so any page can be linked and reopened
directly (e.g. `/#services`).

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. The app renders from the bundled content
snapshot (`src/data/site-content.json`) immediately, then quietly upgrades
to live content from the backend API if `/api/v1/site/` answers.

## Connecting the backend

Copy `.env.example` to `.env.local` and set `VITE_API_URL` to your Django
backend's URL (leave empty to use the local dev proxy at `/api`, configured
in `vite.config.js`). The backend contract:

- `GET /api/v1/site/` — bilingual content bundle (same shape as
  `src/data/site-content.json`)
- `POST /api/v1/leads/quote-requests/` — contact form submissions
- `POST /api/v1/careers/applications/` — careers application submissions
  (multipart when a CV file is attached)

## Build

```bash
npm run build
```

Outputs a static bundle to `dist/`, ready for any static host. Set
`VITE_API_URL` at build time to point the production build at your deployed
backend.

## Structure

```
src/
  App.jsx              Page routing (view state + hash sync)
  SiteContext.jsx       Language state, content snapshot + live fetch
  api.js                Backend requests
  components/
    Header.jsx          Top bar + sticky nav
    Sections.jsx         Hero, Explore, About, Why, Services, Projects,
                        Equipment, Certifications, Journey, Leadership, Footer
    Contact.jsx           Contact page + form
    Careers.jsx          Careers page + application form
    Icon.jsx             Lucide icon lookup by name
    Motion.jsx           Scroll-reveal, credential ticker, chairman quote
  data/site-content.json Bilingual content snapshot (AR + EN)
  styles/app.css        All styling (design tokens, layout, components)
public/assets/          Logo, favicons, OG image, local photos
```

## Design tokens

Navy `#0f2637`, teal accent `#62a7a2`, Playfair Display / Outfit (English),
Almarai / Tajawal (Arabic). Full token list in `src/styles/app.css`.
