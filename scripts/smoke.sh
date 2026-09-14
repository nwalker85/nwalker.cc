#!/usr/bin/env bash
# Smoke test a deployed environment. Usage: scripts/smoke.sh https://staging.nwalker.cc
set -euo pipefail

BASE="${1:?usage: smoke.sh <base-url>}"
FAIL=0

check() {
  local path="$1" expect="$2" desc="$3"
  local body
  if ! body=$(curl -fsSL --max-time 15 "$BASE$path"); then
    echo "FAIL  $path — request failed ($desc)"
    FAIL=1
    return
  fi
  if echo "$body" | grep -q "$expect"; then
    echo "ok    $path — $desc"
  else
    echo "FAIL  $path — missing '$expect' ($desc)"
    FAIL=1
  fi
}

check "/"             "Nathan Walker"          "root renders"
check "/"             "id=\"contact\""         "contact path present"
check "/philosophy"   "Nathan Walker"          "philosophy route"
check "/enterprise"   "Nathan Walker"          "enterprise route"
check "/architecture" "Nathan Walker"          "architecture route"
check "/runestack"    "Nathan Walker"          "runestack route"
check "/health"         "ok"                    "health endpoint"
check "/resume.pdf"     "%PDF"                  "designed résumé is a real PDF"
check "/sitemap.xml"  "nwalker.cc/enterprise"  "sitemap lists key routes"
check "/robots.txt"   "sitemap"                "robots advertises sitemap"
check "/frameworks"   "rel=\"canonical\""      "canonical metadata present"

exit "$FAIL"
