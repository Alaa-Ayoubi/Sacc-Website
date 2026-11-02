#!/usr/bin/env bash
# Sends one snapshot to a single-use html_to_figma submit URL (from the Figma MCP
# tool html_to_figma, called with cssSelector "body" and the target page's nodeId).
# Usage: tools/upload.sh <html-file> <submitUrl>
# Prints "<html-file> <created node ids>" and appends it to uploads.log next to this script.
# Requires network access to mcp.figma.com.
set -uo pipefail
LOG="$(cd "$(dirname "$0")" && pwd)/uploads.log"
for i in 1 2 3; do
  r=$(curl -sS -X POST "$2" -H "Content-Type: text/html" --data-binary @"$1" -w '\n%{http_code}')
  code=$(echo "$r" | tail -1); body=$(echo "$r" | head -n -1)
  if [ "$code" = "200" ]; then
    echo "$1 $(echo "$body" | python3 -c 'import json,sys; print(",".join(json.load(sys.stdin)["nodeIds"]))')" | tee -a "$LOG"; exit 0
  fi
  echo "$1 HTTP $code $body" >&2; sleep $((i*5))
done
exit 1
