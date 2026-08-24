# Security policy

## No sensitive information in this repository

**This repository is public.** Anything committed here is world-readable, and it
stays in git history and in GitHub's caches even after a later commit removes
it. A leaked credential cannot be un-leaked by deleting the file — it has to be
rotated.

Never commit:

| Category | Examples |
| --- | --- |
| Environment files | `.env`, `.env.production`, `.env.local` |
| Django secrets | `SECRET_KEY` |
| Database access | passwords, `DATABASE_URL` with real credentials, dumps, `*.sqlite3` |
| Mail credentials | `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD` |
| Cloud keys | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, API tokens |
| Certificates | `*.pem`, `*.key`, `*.pfx`, SSH private keys |
| Personal data | uploaded CVs (`backend/media/`), quote requests, applicant details |

Only `backend/.env.example` is committed, and it contains placeholders only.

## Where secrets belong instead

- **Locally** — `backend/.env`, which is gitignored.
- **In production** — the Render dashboard. Variables marked `sync: false` in
  `backend/render.yaml` are prompted for on deploy and never stored in the repo.
  `SECRET_KEY` uses `generateValue: true`, so Render generates it and it never
  exists in source at all.

## The automated check

`scripts/check-no-secrets.sh` scans for credential-shaped content and for
filenames that must never be tracked. Install it as a pre-commit hook once per
clone:

```bash
./scripts/check-no-secrets.sh --install
```

Commits containing a secret are then rejected before they exist. You can also
run it directly:

```bash
./scripts/check-no-secrets.sh          # staged changes
./scripts/check-no-secrets.sh --all    # every tracked file
```

The check is a safety net, not a substitute for care — it matches common
patterns and will not catch everything.

## If a secret is committed anyway

1. **Rotate it immediately.** Assume it is compromised: generate a new
   `SECRET_KEY`, change the database password, revoke the API key. Do this
   first, before touching git.
2. Remove it from the working tree and commit that.
3. Rewriting history (`git filter-repo`, BFG) is optional and does **not**
   replace rotation — forks, clones and caches may already hold the value.

## Personal data

Job applications carry names, phone numbers and CVs. Uploaded files live under
`backend/media/`, which is gitignored, and in production should sit in a private
object-storage bucket served through expiring signed URLs — see
`backend/README.md`, "Uploaded files on Render". Treat CV downloads and the
admin's application inbox as personal data under Saudi PDPL.
