# SACC Website

Bilingual (Arabic / English) website for **Sana Al-Awael Contracting Company
(SACC)** — شركة سنا الأوائل للمقاولات — an infrastructure contractor based in
Al Madinah Al Munawwarah, Saudi Arabia.

## What is here

| Path | What it is |
| --- | --- |
| [`backend/`](backend/) | Django + PostgreSQL backend — owns the site content and handles form submissions. See [backend/README.md](backend/README.md). |
| `SaccSite.dc.html`, `site-data.js` | The one-page site design and its content file. |
| `_ds/` | Design system — tokens, fonts, styles. |
| `assets/`, `templates/` | Images and vendored frontend libraries. |

## The backend in one paragraph

The site started out fully static: every string lived in `site-data.js`, and
both forms — the quote request and the job application — faked a submission
with `setTimeout`. Nothing was sent, nothing was stored. The backend fixes
both: the content now lives in PostgreSQL and is editable in both languages
from the Django admin, and the forms persist real submissions, notify staff by
email, and accept CV uploads.

`GET /api/v1/site/` returns one payload keyed exactly like the old
`window.SACC_SITE` object, so the frontend swaps a script tag and keeps
working.

## Quick start

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

Hosted on [Render](https://render.com). `backend/render.yaml` is a Blueprint
that provisions the web service and its managed PostgreSQL together.

Two things to settle before launch, both documented in the backend README:
uploaded CVs need object storage (Render's filesystem is wiped on every
deploy), and the free database plan expires after 30 days.
