#!/usr/bin/env bash
# Project /resume.pdf from nwalker85/resume. The site does not own the hiring
# artifact. Fetch the designed PDF from the source repo. Never run ReportLab.
# If main still has the old stub, keep the committed designed PDF.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/resume.pdf"
REF="${RESUME_REF:-main}"
URL="https://raw.githubusercontent.com/nwalker85/resume/${REF}/resume.pdf"
TMP="$(mktemp)"

cleanup() { rm -f "$TMP"; }
trap cleanup EXIT

if curl -fsSL --max-time 30 "$URL" -o "$TMP"; then
  python3 - <<PY
from pathlib import Path
tmp = Path("$TMP")
out = Path("$OUT")
data = tmp.read_bytes()
if data.startswith(b"%PDF") and tmp.stat().st_size > 50_000:
    out.write_bytes(data)
    print(f"projected resume.pdf from nwalker85/resume@$REF ({tmp.stat().st_size} bytes)")
else:
    print(
        f"nwalker85/resume@$REF is not a designed PDF "
        f"({tmp.stat().st_size} bytes); keeping committed public/resume.pdf"
    )
PY
else
  echo "could not fetch nwalker85/resume; keeping committed public/resume.pdf"
fi

python3 - <<PY
from pathlib import Path
p = Path("$OUT")
data = p.read_bytes()
assert data.startswith(b"%PDF"), "resume.pdf is not a PDF"
assert p.stat().st_size > 50_000, (
    f"resume.pdf too small ({p.stat().st_size}); refusing a ReportLab stub"
)
print(f"resume.pdf ok ({p.stat().st_size} bytes)")
PY
