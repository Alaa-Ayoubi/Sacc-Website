# SACC Backend

Django + PostgreSQL backend for the SACC (شركة سنا الأوائل للمقاولات) website.

It does three things the static site could not:

1. **Owns the content.** Every string that was hardcoded in `site-data.js` now
   lives in PostgreSQL and is editable in the Django admin, in both Arabic and
   English.
2. **Makes the forms real.** The quote request and job application forms
   currently fake a submission with `setTimeout`. They now persist to the
   database, notify staff by email, and accept CV uploads.
3. **Serves it back in the same shape.** `GET /api/v1/site/` returns a payload
   keyed exactly like the old `window.SACC_SITE` object, so the frontend swaps a
   script tag and keeps working.

---

## Setup

Requires Python 3.12+ and PostgreSQL 14+.

```bash
cd backend

python -m venv .venv
.venv/Scripts/python -m pip install -r requirements.txt   # Windows
# source .venv/bin/activate && pip install -r requirements.txt   # macOS/Linux

cp .env.example .env
```

Edit `.env` and set at least `SECRET_KEY` and `DATABASE_URL`. Generate a key
with:

```bash
python -c "from django.core.management.utils import get_random_secret_key as k; print(k())"
```

### Create the database

Either use your local PostgreSQL:

```sql
CREATE ROLE sacc LOGIN PASSWORD 'choose-a-password';
CREATE DATABASE sacc OWNER sacc ENCODING 'UTF8';
```

…and set `DATABASE_URL=postgres://sacc:choose-a-password@localhost:5432/sacc`.

Or start the bundled throwaway instance:

```bash
docker compose up -d db
# DATABASE_URL=postgres://sacc:sacc@localhost:5433/sacc
```

### Migrate, seed, run

```bash
.venv/Scripts/python manage.py migrate
.venv/Scripts/python manage.py seed_content      # loads the existing site copy
.venv/Scripts/python manage.py createsuperuser
.venv/Scripts/python manage.py runserver
```

The admin is at http://localhost:8000/admin/ and the API at
http://localhost:8000/api/v1/.

---

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/v1/site/` | The whole bilingual payload, shaped like `window.SACC_SITE`. Cached for 5 minutes. |
| `GET` | `/api/v1/health/` | Liveness probe; also checks the database. |
| `GET` | `/api/v1/projects/` | Project list. `?category=water`, `?status=completed`, `?lang=ar\|en`. |
| `GET` | `/api/v1/projects/<id>/` | One project. |
| `GET` | `/api/v1/projects/categories/` | Categories with published-project counts. |
| `GET` | `/api/v1/careers/openings/` | Open roles. |
| `GET` | `/api/v1/careers/openings/<slug>/` | One role, with responsibilities and requirements. |
| `POST` | `/api/v1/careers/applications/` | Submit an application (JSON, or multipart with a CV file). |
| `GET` | `/api/v1/leads/project-types/` | Options for the contact form dropdown. |
| `POST` | `/api/v1/leads/quote-requests/` | Submit a quote request. |

Both `POST` endpoints are write-only: submissions are read in the admin, never
over the public API.

### Errors

Every failure returns the same envelope, so the frontend can render one banner
plus one message per field:

```json
{
  "detail": "Validation failed.",
  "errors": { "message": ["Write at least 10 characters."] }
}
```

### Example

```bash
curl -X POST http://localhost:8000/api/v1/leads/quote-requests/ \
  -H "Content-Type: application/json" \
  -d '{
        "full_name": "Ahmed Al-Harbi",
        "email": "ahmed@example.com",
        "company": "National Water Company",
        "project_type": "water-sewerage-networks",
        "message": "We need a quote for a 12 km transmission line in Al Madinah.",
        "locale": "ar"
      }'
```

---

## Connecting the frontend

Replace the `site-data.js` script tag with:

```html
<script>window.SACC_API = 'http://localhost:8000/api/v1';</script>
<script src="./backend/frontend/sacc-api.js"></script>
```

`frontend/sacc-api.js` fetches the bundle, assigns it to `window.SACC_SITE`
exactly as before, and fires a `sacc:ready` event when the data has arrived. It
also exposes `window.SACC.submitQuote(...)` and
`window.SACC.submitApplication(...)`, which replace the `setTimeout` calls in
`submitQuote` / `submitApp` in `SaccSite.dc.html`.

---

## How the content is modelled

**Both languages in one row.** Every translatable field is a twin pair of
columns — `title_ar` and `title_en`. The site holds both languages at once and
toggles client-side without refetching, so the API mirrors that rather than
storing one row per locale. A blank translation falls back to the other
language, so a half-translated edit never renders an empty heading.

**Structure decides the model.** Anything with real structure — an icon, a year,
a photo, a client — is its own model. The plain bullet lists each section
carries (why-us points, equipment categories, government approvals, office
hours, footer certifications) are stored in the owning `Section` as one item per
line, which is far easier to edit than a child table.

**Microcopy is not content.** Button captions, field labels, placeholders and
validation messages live in `apps/content/labels.py`, not the database — putting
them in the admin would bury the copy an editor actually wants to change under a
hundred rows of interface strings. They are merged into the bundle so the
frontend still receives one complete payload.

**Where things live in the admin:**

| Admin section | What it holds |
| --- | --- |
| Site & branding | Phone, email, CR number, logos, brand line, footer text, section images |
| Page content | Hero, navigation, statistics, section headings, services, equipment features, certifications, milestones, values, leadership |
| Projects | Categories and the project portfolio |
| Careers | Benefits, job openings, and the application inbox |
| Quote requests | Project-type options, and the enquiry inbox |

Content rows have an `order` column and an `is_published` checkbox, both
editable straight from the list view — hiding an item is preferred to deleting
it.

---

## Handling submissions

Quote requests and job applications appear in the admin as inboxes. What the
visitor typed is read-only; only the pipeline columns (status, assignee,
internal notes) can be edited, so a record of what was actually submitted is
preserved. Both support bulk status actions and **Export to CSV** — UTF-8 with a
BOM, so Arabic columns open correctly in Excel.

Staff are emailed on each submission, to the addresses in
`LEAD_NOTIFICATION_RECIPIENTS`. Sending is best-effort: a mail server that is
down is logged, never turned into an error for the visitor, because the record
is already saved.

### Spam and abuse

- **Honeypot.** Both forms accept a `website` field. It must stay hidden and
  empty; a filled one is saved and silently flagged rather than rejected, so a
  bot gets no signal about which field gave it away.
- **Rate limits.** 10 quote requests and 5 applications per hour per IP by
  default (`THROTTLE_QUOTE_REQUEST`, `THROTTLE_JOB_APPLICATION`).
- **Uploads.** CVs are capped at 5 MB and restricted to PDF/DOC/DOCX, and are
  stored under a random UUID rather than the uploaded filename so the media URL
  cannot be guessed or enumerated.

---

## Arabic

Arabic is live, not a placeholder: all 228 translatable values are populated in
both languages, verified by `manage.py check_translations`.

Because the API falls back to the other language when one side is blank, an
untranslated row still renders — which means Arabic can rot silently as content
is edited. Two things make that visible:

```bash
python manage.py check_translations                    # report gaps
python manage.py check_translations --fail-on-missing   # exit non-zero, for CI
```

and every content list in the admin carries a **Translated** column showing
`AR + EN` or which fields are missing.

`GET /api/v1/site/` returns both languages so the one-page site can toggle
without refetching. `?lang=ar` returns only Arabic (`dir: rtl`), `?lang=en` only
English — useful for a single-language consumer. An unrecognised value returns
both rather than erroring.

---

## Tests

```bash
.venv/Scripts/python manage.py test
```

Covers the bundle's shape and translation fallback, both form endpoints
(validation, uploads, honeypot, rate limiting, metadata capture), the project
filters, and the seed importer. One test rebuilds the bundle from seeded data
and asserts it reproduces the original `site-data.js` payload key for key — so
if the content model ever stops being able to express the real site copy, that
test fails.

---

## Deploying to Render

`render.yaml` is a Blueprint: push this repository to GitHub, then in Render
choose **New > Blueprint** and point it at the repo. Render reads the file,
creates the managed PostgreSQL, injects `DATABASE_URL`, generates `SECRET_KEY`,
and runs `build.sh` (install, `collectstatic`, `migrate`).

`rootDir: backend` is set because the Django project is not at the repository
root.

After the first successful deploy, load the site copy once from the Render
shell:

```bash
python manage.py seed_content
python manage.py createsuperuser
```

Seeding is deliberately not part of `build.sh` — it would re-run on every
deploy and overwrite edits made in the admin.

### Secrets to set in the dashboard

These are marked `sync: false` in the Blueprint, so Render prompts for them
rather than storing them in the repository:

`EMAIL_HOST`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`,
`LEAD_NOTIFICATION_RECIPIENTS`, and the `AWS_*` bucket credentials below.

`ALLOWED_HOSTS` and the CORS/CSRF origins are in the Blueprint and default to
`sanasacc.com`. The `.onrender.com` hostname is added automatically from
`RENDER_EXTERNAL_HOSTNAME`, so the preview URL works before DNS is pointed.

### Uploaded files on Render

**Render's filesystem is ephemeral — it is wiped on every deploy.** With the
default local-disk storage, every CV a candidate uploaded is destroyed the next
time you ship. The database rows survive; the files do not.

Set `AWS_STORAGE_BUCKET_NAME` (plus `AWS_ACCESS_KEY_ID`,
`AWS_SECRET_ACCESS_KEY`, and `AWS_S3_ENDPOINT_URL` for a non-AWS provider such
as Cloudflare R2 or Backblaze B2) and uploads move to object storage
automatically. The bucket is used privately: no public ACL, and the admin's
download links are signed URLs that expire after an hour, because CVs contain
personal data.

Until that is configured, treat CV uploads as temporary and rely on the CV
*link* field.

### Free-tier caveats

The Blueprint uses `plan: free` for both the service and the database so you
can try it at no cost. Two things to know before launch: a free PostgreSQL
instance **expires after 30 days**, and a free web service sleeps after
inactivity, so the first request wakes it with a delay of a few seconds. Move
both to a paid plan before the site goes live.

### Running elsewhere

Any host that can run Python works the same way:

```bash
export DJANGO_SETTINGS_MODULE=config.settings.prod
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

The production settings module refuses to start without a real `SECRET_KEY`,
`ALLOWED_HOSTS` and `DATABASE_URL`, and enforces the CORS allowlist — unlike
development, where any origin is accepted so the page can be opened off disk.
