# SACC Website — React Frontend

Bilingual (Arabic / English) site for Sana Al-Awael Contracting Company (SACC),
built with React + Vite and **prerendered**: every page is a real HTML file
with its full content and its own head, then hydrated in the browser.

## Addresses

Arabic is at the root, English under `/en`, and every page has its own path:

| Page | Arabic | English |
| --- | --- | --- |
| Home | `/` | `/en` |
| Company (about, journey, values, leadership tabs) | `/company` | `/en/company` |
| Services, and one page per discipline | `/services`, `/services/<slug>` | `/en/services`, … |
| Projects, and one page per project | `/projects`, `/projects/<slug>` | `/en/projects`, … |
| Fleet · Approvals · Contact · Careers | `/fleet` · `/approvals` · `/contact` · `/careers` | under `/en` |

Discipline slugs are fixed in `src/lib/site.js`; project slugs come from each
project's English title, so both languages share one slug.

Links from the previous site keep working: the `/ar` prefix and the old page
names (`/about`, `/equipment`, `/certifications`, `/journey`, `/leadership`)
are permanent redirects on the host, and old `#hash` and `?lang=en` links are
moved by the app on arrival.

## Getting started

```bash
npm install
npm run dev            # http://localhost:5173 (renders in the browser, no prerender)
npm run build          # client build + prerender into dist/
```

`npm run build` runs three steps:

1. `vite build` — the client bundle, fingerprinted under `dist/static/`.
2. `vite build --ssr src/entry-server.jsx` — a server build of the same app.
3. `scripts/prerender.mjs` — renders every address to `dist/<path>/index.html`
   (title, description, canonical, `hreflang` twin, Open Graph, JSON-LD
   `GeneralContractor` and breadcrumbs), plus `404.html`, `sitemap.xml` and
   `robots.txt`. Set `SITE_URL` to change the canonical origin
   (default `https://saccgroup.net`).

It then checks that `backend/render.yaml` has a route for every page (see
below) and prints a warning if not.

## Content

Every company fact comes from `src/data/site-content.json`, the bilingual
bundle maintained in the Django admin. Pages are prerendered from it, and the
browser quietly swaps in live content from `GET /api/v1/site/` if the API
answers. After editing content in the admin:

```bash
cd ../backend && python manage.py export_site_data --frontend   # rewrite the snapshot
cd ../frontend && npm run routes                               # only if projects were added or renamed
```

Commit both files; the next deploy prerenders the new content.

## Backend

Set `VITE_API_URL` at build time to the Django backend's URL (leave it empty in
development to use the dev proxy at `/api`, configured in `vite.config.js`).

- `GET /api/v1/site/` — the content bundle
- `POST /api/v1/leads/quote-requests/` — the quote form
- `POST /api/v1/careers/applications/` — the application form (multipart when a CV file is attached)

Both forms are real submissions: stored, staff notified, and the visitor told
honestly what happened. API field errors are shown on their fields.

## Hosting (Render static site)

`npm run routes` writes the routes block of `backend/render.yaml`: 301 redirects
for old addresses, then one rewrite per page from its clean address to its
prerendered file. There is no catch-all, so unknown addresses are real 404s.
Fingerprinted files under `/static/` are cached for a year; photos and the logo
under `/assets/` for a day.

## Structure

```
src/
  main.jsx               Hydrates a prerendered page (or renders in dev)
  entry-server.jsx       Server entry used by the prerender
  App.jsx                Layout, page switch, old-link migration
  SiteContext.jsx        Content, route (from the path), navigation, quote prefill
  api.js                 Backend requests
  lib/site.js            Routes, slugs, discipline map, interface strings
  lib/seo.js             Per-page head tags and structured data
  components/            Bar and footer, line drawings (Viz), shared pieces
  pages/                 Home, inner pages, the two forms
  styles/site.css        The approved design: tokens, layout, components
scripts/
  prerender.mjs          Static HTML for every page, sitemap, robots, 404
  render-routes.mjs      Redirect and rewrite rules for render.yaml
public/assets/           Logo, favicons, OG image, company photos
```

The design system is documented in [`../DESIGN.md`](../DESIGN.md); the brief it
was built from is [`../prototype-bento/BRIEF.md`](../prototype-bento/BRIEF.md).
Accessibility standard: WCAG 2.2 AA.
