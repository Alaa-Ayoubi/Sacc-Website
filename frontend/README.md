# SACC Frontend

The public site — a bilingual (Arabic / English) multi-page site for Sana
Al-Awael Contracting, built with React and Vite, talking to the Django backend
in [`../backend`](../backend).

Built from the handoff in `../design_handoff_sacc_website/`: the same navy
shell, teal accent, 1320px container, 124px section rhythm, and the
Almarai/Tajawal + Outfit/Playfair type pairing.

## Pages

Home, about, services, projects, equipment, certifications, journey,
leadership, contact, careers — switched in the app rather than fetched. The
current page is mirrored in the URL hash (`#services`), so a link can be
shared and reopens on the right page.

There is no router package: with ten flat pages and no nested or dynamic
routes, a `hash → view` map is the whole requirement.

## Running it

```bash
npm install
npm run dev          # http://localhost:5173
```

`npm run dev` proxies `/api` to the deployed backend, so requests are
same-origin and CORS never enters into it. The alternative — adding `localhost`
to the backend's allowlist — would loosen production config for a local
convenience, so it is deliberately not done.

Point the proxy somewhere else by setting `VITE_API_URL` (see
`.env.example`). No `.env` is committed: production gets `VITE_API_URL`
from `backend/render.yaml`, and a local `.env` is gitignored — the repository
is public, so no environment file belongs in it.

```bash
npm run build        # dist/
npm run preview      # serve the build
```

## How content reaches the page

Two paths, and the split matters:

**Content is bundled at build time.** `src/data/site-content.json` is a snapshot
of the API's `/api/v1/site/` response, imported directly into the bundle. The
first paint never waits on the network.

**Fresh content is fetched in the background** and swapped in if it arrives. If
the backend is asleep, slow, or unreachable, the visitor sees the snapshot and
nothing appears broken.

This exists because the backend runs on a free instance that sleeps after
inactivity — the first request following a quiet spell can take close to a
minute. That is fine when someone has just pressed *Submit* and is expecting a
result; it is not fine for rendering a page.

After editing content in the Django admin, refresh the snapshot and commit it:

```bash
npm run sync-content
```

The script refuses to overwrite a good snapshot with an empty one, so a
misconfigured backend cannot blank the site.

## Forms

Both forms post to the backend for real — this is the whole point of the
rebuild. The prototype faked submission with `setTimeout`, so every enquiry it
ever received was discarded.

- **Quote request** (`Contact.jsx`) → `POST /api/v1/leads/quote-requests/`
- **Job application** (`Careers.jsx`) → `POST /api/v1/careers/applications/`,
  multipart when a CV file is attached

Client-side validation mirrors the backend's rules so a visitor is corrected
before a round trip, and field errors returned by the API are merged into the
same display — the server stays the authority. Each form carries a hidden
`website` honeypot that must stay empty.

## Language

Arabic and English arrive together in one payload, so switching is a state
change rather than a refetch. The choice is remembered in `localStorage`, and
`?lang=ar` / `?lang=en` forces one — useful for sharing a link in a known
language.

`dir` flips to `rtl` for Arabic. Spacing uses logical properties
(`margin-inline`, `padding-inline`) throughout, so one stylesheet serves both
directions rather than a mirrored copy.

## Layout of the source

| Path | What it holds |
| --- | --- |
| `src/App.jsx` | Page switching, hash sync, scroll reset |
| `src/main.jsx` | Entry point — mounts the app and loads the stylesheets |
| `src/SiteContext.jsx` | Content loading, language, direction |
| `src/api.js` | The backend client and its error type |
| `src/components/Sections.jsx` | Every content section, plus the footer |
| `src/components/Motion.jsx` | Reveal-on-scroll and the credential ticker |
| `src/components/Icon.jsx` | Lucide icons, looked up by the name stored with each row |
| `src/components/Contact.jsx` | Quote-request form |
| `src/components/Careers.jsx` | Careers page and application form |
| `src/styles/app.css` | Design tokens and layout |
| `src/data/site-content.json` | Bundled content snapshot |

### Known issue in the content

Several image URLs still point at the client's old Hostinger CDN and do not
reliably resolve — the chairman and GM portraits among them. Replace them with
owned assets from the Django admin, under *Site & branding → Site images*. The
design handoff flags the same URLs.

## Deploying

`../backend/render.yaml` declares this as a Render **Static Site**. Static sites
are free and never sleep, so the page is always fast — only form submissions can
meet the backend's cold start.

When the site gets its own hostname, add that origin to `CORS_ALLOWED_ORIGINS`
and `CSRF_TRUSTED_ORIGINS` in the same file, or the browser will block form
posts.
