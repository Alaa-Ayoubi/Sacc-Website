#!/usr/bin/env bash
# Regenerates the 40 static snapshots (10 pages x ar/en x 1440/390) from
# source/sacc-prototype.html. Usage: tools/build.sh [output-dir]
# Default output-dir: figma-export/build (the committed html/ folder is not overwritten).
# Needs Node with Playwright and Chromium (pre-installed in Claude Code cloud sessions).
set -euo pipefail
HERE=$(cd "$(dirname "$0")/.." && pwd)
REPO=$(cd "$HERE/.." && pwd)
OUT=${1:-$HERE/build}
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
cp "$HERE/source/sacc-prototype.html" "$WORK/index.html"
cp -r "$REPO/assets" "$WORK/assets"
PAGES=(about services projects equipment certifications journey leadership contact careers)
EN=(); for p in "${PAGES[@]}"; do EN+=("en/$p"); done
mkdir -p "$OUT"/{ar-1440,ar-390,en-1440,en-390}
cd "$HERE/tools"
node snap.js "$WORK/index.html" "$OUT/ar-1440" 1440 "" "${PAGES[@]}"
node snap.js "$WORK/index.html" "$OUT/ar-390" 390 "" "${PAGES[@]}"
node snap.js "$WORK/index.html" "$OUT/en-1440" 1440 en "${EN[@]}"
node snap.js "$WORK/index.html" "$OUT/en-390" 390 en "${EN[@]}"
