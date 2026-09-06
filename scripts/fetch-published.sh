#!/usr/bin/env bash
# Fetch the published content corpus (nwalker85/nwalker-cc-published) into
# content/published/ at build time. The site never holds draft prose — it
# consumes the published repo as read-only build input.
#
# PUBLISHED_REF pins the corpus to a branch or tag (e.g. a release tag), so a
# production build can freeze the exact corpus that staging validated.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DEST="$ROOT/content/published"
REPO_URL="https://github.com/nwalker85/nwalker-cc-published.git"
REF="${PUBLISHED_REF:-main}"

TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/nwalker-cc-published.XXXXXX")"
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

echo "fetch-published: cloning ${REPO_URL}@${REF} ..."
if ! git clone --quiet --depth 1 --branch "$REF" "$REPO_URL" "$TMP_DIR"; then
  echo "fetch-published: FAILED to clone ${REPO_URL}@${REF}" >&2
  exit 1
fi

SHA="$(git -C "$TMP_DIR" rev-parse HEAD)"
rm -rf "$TMP_DIR/.git"

rm -rf "$DEST"
mkdir -p "$(dirname "$DEST")"
mv "$TMP_DIR" "$DEST"
echo "$SHA" > "$DEST/.source-sha"

echo "fetch-published: OK — nwalker-cc-published@${REF} -> ${SHA}"
