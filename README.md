# SACC Website

Bilingual (Arabic / English) website for **Sana Al-Awael Contracting Company
(SACC)** — شركة سنا الأوائل للمقاولات — an infrastructure contractor based in
Al Madinah Al Munawwarah, Saudi Arabia.

## What is here

| Path | What it is |
| --- | --- |
| [`frontend/`](frontend/) | The public site — React + Vite, bilingual. See [frontend/README.md](frontend/README.md). |
| [`backend/`](backend/) | Django + PostgreSQL — owns the content and handles form submissions. See [backend/README.md](backend/README.md). |
| `SaccSite.dc.html`, `site-data.js` | The original design prototype the frontend was built from. Kept for reference. |
| `_ds/` | Design system — tokens, fonts, styles. |
| `assets/`, `templates/` | Images and vendored libraries used by the prototype. |

## What changed

The site started out fully static: every string lived in `site-data.js`, and
both forms — the quote request and the job application — faked a submission
with `setTimeout`. Nothing was sent, nothing was stored; every enquiry the site
ever received was discarded.

Now the content lives in PostgreSQL and is editable in both languages from the
Django admin, and both forms persist real submissions, notify staff at
`info@saccgroup.net`, and accept CV uploads.

The React frontend carries the approved design over unchanged and reads its
content from `GET /api/v1/site/`.

## Quick start

The site:

```bash
cd frontend
npm install
npm run dev            # http://localhost:5173
```

The backend:

```bash
cd backend
python -m venv .venv
.venv/Scripts/python -m pip install -r requirements.txt   # Windows
cp .env.example .env                                      # then set DATABASE_URL

.venv/Scripts/python manage.py migrate
.venv/Scripts/python manage.py seed_content
.venv/Scripts/python manage.py createsuperuser
.venv/Scripts/python manage.py runserver
```

Full setup, API reference, content model and deployment notes:
**[backend/README.md](backend/README.md)**.

## Security

**This repository is public — never commit secrets.** `.env`, `SECRET_KEY`,
database passwords, mail credentials, API keys and uploaded CVs all stay out of
git. A pre-commit hook enforces it; install it once per clone:

```bash
./scripts/check-no-secrets.sh --install
```

Full policy, and what to do if something leaks: **[SECURITY.md](SECURITY.md)**.

## Deployment

Hosted on [Render](https://render.com) — entirely on free tiers.
`backend/render.yaml` is a Blueprint for the web service.

The database is **not** on Render: its free PostgreSQL is deleted after 30 days,
which would take the content and every stored enquiry with it. It lives on
[Neon](https://neon.tech), whose free tier is permanent. Set `DATABASE_URL` in
the Render dashboard.

A free web service also sleeps when idle, so the page keeps loading
`site-data.js` as a static file rather than waiting on a cold start. Content is
edited in the admin and exported back out:

```bash
cd backend && python manage.py export_site_data
```

The API is reached only when a form is submitted, where a brief wait is fine.
Details, plus object storage for uploaded CVs: **[backend/README.md](backend/README.md)**.
