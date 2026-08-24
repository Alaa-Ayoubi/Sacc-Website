#!/usr/bin/env bash
# Render build step. Any non-zero exit fails the deploy rather than shipping
# a half-built image.
set -o errexit

pip install --upgrade pip
pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate --no-input

# Seeding is deliberately NOT run here: it would re-run on every deploy and
# overwrite editorial changes made in the admin. Run it once by hand from the
# Render shell:  python manage.py seed_content
