#!/usr/bin/env bash
# Block secrets from reaching the repository.
#
# The GitHub repo is public: anything committed is world-readable and stays in
# git history and GitHub's caches even after a later deletion. A leak cannot be
# undone by removing the file, only by rotating the credential — so the check
# runs before the commit exists, not after.
#
# Install as a git hook:   ./scripts/check-no-secrets.sh --install
# Run over staged changes: ./scripts/check-no-secrets.sh
# Run over the whole tree: ./scripts/check-no-secrets.sh --all
set -o errexit
set -o pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

if [ "${1:-}" = "--install" ]; then
	mkdir -p .git/hooks
	printf '#!/usr/bin/env bash\nexec "$(git rev-parse --show-toplevel)/scripts/check-no-secrets.sh"\n' \
		> .git/hooks/pre-commit
	chmod +x .git/hooks/pre-commit
	echo "Installed .git/hooks/pre-commit — commits are now scanned for secrets."
	exit 0
fi

# Files that must never be tracked, whatever they contain.
FORBIDDEN_PATHS='(^|/)\.env$|(^|/)\.env\.(local|production|prod)$|\.pem$|\.key$|\.pfx$|\.p12$|(^|/)id_rsa|\.sqlite3$|(^|/)media/|credentials\.json$|service-account.*\.json$'

# Credential-shaped assignments. Placeholders are excluded below.
SECRET_PATTERNS='(SECRET_KEY|PASSWORD|PASSWD|API_KEY|APIKEY|ACCESS_KEY|SECRET_ACCESS_KEY|AUTH_TOKEN|PRIVATE_KEY|DATABASE_URL)[[:space:]]*[=:][[:space:]]*.{8,}'
# Provider-specific token shapes worth catching on sight.
TOKEN_PATTERNS='(gh[pousr]_[A-Za-z0-9]{16,}|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----)'

# Values that are obviously not real credentials.
PLACEHOLDERS='CHANGE_ME|change-me|changeme|dev-only|your-|YOUR_|example|EXAMPLE|placeholder|xxx|XXX|<[^>]+>|generateValue|get_random_secret_key|sync: false|\$\{|os\.environ|env\(|getenv'

if [ "${1:-}" = "--all" ]; then
	FILES="$(git ls-files)"
	SCOPE="tracked files"
	DIFF_CMD="git grep -nIE"
else
	FILES="$(git diff --cached --name-only --diff-filter=ACM)"
	SCOPE="staged changes"
	DIFF_CMD=""
fi

if [ -z "$FILES" ]; then
	echo "Nothing to scan."
	exit 0
fi

failed=0

# 1. Forbidden filenames.
offending_paths="$(printf '%s\n' "$FILES" | grep -E "$FORBIDDEN_PATHS" || true)"
if [ -n "$offending_paths" ]; then
	echo "BLOCKED: these files must never be committed:"
	printf '  %s\n' $offending_paths
	failed=1
fi

# 2. Credential-shaped content. Minified vendor bundles and the design system
#    are skipped: they are third-party blobs full of false positives.
scan_content() {
	local pattern="$1" label="$2"
	local hits=""
	for f in $FILES; do
		case "$f" in
			*.min.js|_ds/*|templates/vendor/*|*.woff2|*.png|*.jpg|*.webp) continue ;;
		esac
		[ -f "$f" ] || continue
		if [ "${1:-}" = "" ]; then :; fi
		local found
		found="$(grep -nIE "$pattern" "$f" 2>/dev/null | grep -vE "$PLACEHOLDERS" || true)"
		if [ -n "$found" ]; then
			hits="${hits}${f}:\n$(printf '%s' "$found" | sed 's/^/    /')\n"
		fi
	done
	if [ -n "$hits" ]; then
		echo "BLOCKED: possible $label found:"
		printf "  %b" "$hits"
		return 1
	fi
	return 0
}

scan_content "$SECRET_PATTERNS" "credentials" || failed=1
scan_content "$TOKEN_PATTERNS" "API tokens or private keys" || failed=1

if [ "$failed" -ne 0 ]; then
	cat <<'MESSAGE'

The repository is PUBLIC. Committing a credential exposes it permanently —
removing it in a later commit does not help, it stays in history.

Put the value in an environment variable instead:
  - locally, in backend/.env (gitignored)
  - in production, in the Render dashboard (env vars marked sync: false)

If this is a false positive, rerun with:  git commit --no-verify
MESSAGE
	exit 1
fi

echo "No secrets found in $SCOPE."
