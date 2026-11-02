#!/usr/bin/env bash
# Render build step. Any non-zero exit fails the deploy rather than shipping
# a half-built image.
set -o errexit

pip install --upgrade pip
pip install -r requirements.txt

python manage.py collectstatic --no-input

# Schema changes and the first-deploy seed go over Neon's direct connection
# (DATABASE_URL_UNPOOLED) when it is set: the pooled one runs PgBouncer in
# transaction mode, which does not keep session state between statements.
# DB_USE_DIRECT=True makes settings connect over it; without it, nothing changes.
DB_USE_DIRECT=True python manage.py migrate --no-input

# Render's Shell and One-Off Jobs are paid features, so on the free plan there
# is no way to run setup commands after a deploy. bootstrap_site does it here
# instead. It is idempotent: content is seeded only into an empty database, and
# the admin user is created only if none exists — so redeploying never
# overwrites edits made in the admin.
DB_USE_DIRECT=True python manage.py bootstrap_site
