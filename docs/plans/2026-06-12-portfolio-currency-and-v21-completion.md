# Portfolio Currency & v2.1 Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the active checklist (homepage v2.1 deltas, nav simplification, 38% metric correction, analyst recognition strip), add synthetic monitoring with notification evidence, ship the Phase 2 authority pages that have real source material, and bring all repo docs current.

**Architecture:** Four sequential PRs into `develop` (each auto-deploys staging), then a `v2.1.0` tag for production behind Nathan's GitHub environment approval. All content changes are typed React components — no infra changes except two GitHub Actions workflows. Work happens in a dedicated git worktree (Nathan may be editing this repo concurrently).

**Tech Stack:** Next.js 16 app router, React 19, Tailwind 4, vitest + @testing-library/react, GitHub Actions, pnpm 9.

**Canon sources (decisions already made by Nathan, 2026-06-12):**
- D1: **38%** is the canonical POC-to-deal conversion number. Site AND resume both change. (The May 13 report's claim that "resume says 38%" was inverted — the current resume says 76%; both move to 38%.)
- Nav: flat 5 items — Philosophy / Enterprise / Architecture / Runestack / Contact. No "Portfolio" item, no Resume in primary nav (footer keeps it).
- Analyst Recognition strip: yes, with links. All three SoundHound URLs verified HTTP 200 on 2026-06-12.
- Scope: active checklist + monitoring + Phase 2 pages.
- `/frameworks/architecting-certainty`: doctrine body does not exist in any source doc — ships as a content draft for Nathan, NOT a public route (Task 16).

**Hard rules:** Never push to `develop` or `main` directly — PR only. Tone rules from STRATEGY-V2-1-001 apply to all copy: no "visionary / passionate / revolutionary / disruptive / magical / AI-native / unleash / transform / supercharge / cutting edge."

---

## Setup (before Task 1)

- [ ] Create a worktree off `develop` (use superpowers:using-git-worktrees):

```bash
cd ~/src/portfolio/nwalker.cc
git fetch origin
git worktree add ~/src/worktrees/nwalker-cc-v21 -b chore/repo-currency origin/develop
cd ~/src/worktrees/nwalker-cc-v21
pnpm install
pnpm test   # baseline: all existing tests must pass before any change
```

Expected: vitest reports all suites passing. If not, STOP and report.

---

# PR 1 — `chore/repo-currency` (housekeeping + plan)

### Task 1: Commit this plan + .gitignore hygiene

**Files:**
- Create: `docs/plans/2026-06-12-portfolio-currency-and-v21-completion.md` (this file — copy from the main checkout if the worktree predates it)
- Modify: `.gitignore`

- [ ] **Step 1: Append agent-tooling dirs to `.gitignore`**

```gitignore
# Agent tooling
.Codex/
.playwright-mcp/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore docs/plans/2026-06-12-portfolio-currency-and-v21-completion.md
git commit -m "chore: ignore agent tooling dirs, add v2.1 completion plan"
```

### Task 2: Delete merged branches

No PR needed for branch deletion (not a code change), but verify merge state first — only delete branches whose tips are reachable from `origin/develop`.

- [ ] **Step 1: List branches actually merged into develop**

```bash
cd ~/src/portfolio/nwalker.cc
git branch --merged origin/develop | grep -v develop
git branch -r --merged origin/develop | grep -v develop
```

- [ ] **Step 2: Delete only the merged ones, local then remote**

```bash
# Expected merged set (verify against Step 1 output before deleting):
# codex/fix-nav-spacing-0764bbcf, codex/fix-spacing-staging-c6a3c5c4,
# docs/assistant-demo-prd, docs/domain-governance-domain-docs-1778182702,
# docs/refocus-nwalker-health-portfolio-scope-1778190850, feat/v2-rebuild,
# feature/insights-section, feature/portfolio-content, feat/accountability-demo-demo-1778191928
for b in $(git branch --merged origin/develop | grep -v -E 'develop|main' | tr -d ' +'); do git branch -d "$b"; done
for b in $(git branch -r --merged origin/develop | grep origin/ | grep -v -E 'develop|main|HEAD' | sed 's|origin/||'); do git push origin --delete "$b"; done
```

**Do NOT delete** any branch not in the merged list (e.g. an unmerged WIP branch) — list those in the PR description instead.

### Task 3: Open PR 1

- [ ] **Step 1: Push and open PR**

```bash
git push -u origin chore/repo-currency
gh pr create --base develop --title "chore: repo currency — gitignore, v2.1 completion plan" --body "Houses the 2026-06-12 implementation plan; ignores .Codex/ and .playwright-mcp/. Merged-branch cleanup done out-of-band (list in comments).

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```

- [ ] **Step 2: Watch the PR's run by id (NOT `gh pr checks --watch` — it exits 0 when no checks exist):**

```bash
gh run list --branch chore/repo-currency -L 1   # grab <run-id>
gh run watch <run-id> --exit-status
```

- [ ] **Step 3: Merge after green** (squash, delete branch). Wait for staging deploy run to complete.

---

# PR 2 — `feat/homepage-v21-pass` (homepage deltas + nav + 38% + analyst strip)

Branch off updated develop: `git fetch && git worktree add ... -b feat/homepage-v21-pass origin/develop` (or reuse worktree: `git checkout -b feat/homepage-v21-pass origin/develop`).

### Task 4: Update homepage tests to the v2.1 target state (failing first)

**Files:**
- Modify: `src/app/__tests__/page.test.tsx`
- Modify: `src/components/layout/__tests__/Nav.test.tsx`

- [ ] **Step 1: Rewrite `page.test.tsx` assertions**

Replace the `renders hero with thesis statement` and `renders Enterprise Proof metrics` tests, and add two new tests:

```tsx
  it('renders hero with identity line and thesis statement', () => {
    const { container } = render(<Page />)
    expect(screen.getByText('Nathan Walker')).toBeTruthy()
    expect(screen.getByText('AI Governance & Enterprise Platforms')).toBeTruthy()
    expect(screen.getByText(/AI eliminated the cost of building/)).toBeTruthy()
    expect(container).toHaveTextContent(/It did not eliminate the cost of being wrong/)
    expect(container.querySelector('h1 em, p em')).toBeNull() // no italic drama
  })

  it('renders What AI Did Not Collapse with the scar closing line', () => {
    render(<Page />)
    expect(screen.getByText('What AI Did Not Collapse')).toBeTruthy()
    expect(screen.getByText('Security boundary design')).toBeTruthy()
    expect(screen.getByText(/These decisions do not appear in the prompt/)).toBeTruthy()
    expect(screen.getByText(/They appear in the scars/)).toBeTruthy()
    expect(screen.queryByText(/These are not features/)).toBeNull()
  })

  it('renders Enterprise Proof metrics with the canonical conversion number', () => {
    render(<Page />)
    expect(screen.getByText('$50M+')).toBeTruthy()
    expect(screen.getByText('$17M')).toBeTruthy()
    expect(screen.getByText('38%')).toBeTruthy()
    expect(screen.queryByText('76%')).toBeNull()
    expect(screen.getByText(/View Enterprise Work/)).toBeTruthy()
  })

  it('renders the 2025 analyst recognition strip', () => {
    render(<Page />)
    expect(screen.getByText(/2025 Analyst Recognition/)).toBeTruthy()
    expect(screen.getByText(/Everest Group/)).toBeTruthy()
    expect(screen.getByText(/IDC MarketScape/)).toBeTruthy()
    expect(screen.getByText(/Magic Quadrant/)).toBeTruthy()
  })

  it('keeps hardware language off the homepage', () => {
    const { container } = render(<Page />)
    expect(container).not.toHaveTextContent(/10Gb/i)
    expect(container).not.toHaveTextContent(/GPU/i)
  })
```

- [ ] **Step 2: Rewrite `Nav.test.tsx`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Nav } from '../Nav'

describe('Nav', () => {
  it('renders the flat executive nav links', () => {
    render(<Nav />)
    for (const label of ['Philosophy', 'Enterprise', 'Architecture', 'Runestack', 'Contact']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    }
  })

  it('does not render the old dropdown groups or demoted items', () => {
    render(<Nav />)
    expect(screen.queryByText('Thinking')).toBeNull()
    expect(screen.queryByText('Work')).toBeNull()
    expect(screen.queryByText('Resume')).toBeNull()
    expect(screen.queryByText('Definitions')).toBeNull()
  })

  it('renders Nathan Walker name', () => {
    render(<Nav />)
    expect(screen.getByText('Nathan Walker')).toBeTruthy()
  })
})
```

- [ ] **Step 3: Run and confirm the new tests FAIL**

```bash
pnpm test
```

Expected: failures in `page.test.tsx` (identity line, scar line, 38%, analyst strip) and `Nav.test.tsx` (flat links). Pre-existing tests still pass.

- [ ] **Step 4: Commit the failing tests**

```bash
git add src/app/__tests__/page.test.tsx src/components/layout/__tests__/Nav.test.tsx
git commit -m "test: encode v2.1 homepage and nav target state"
```

### Task 5: Hero — identity line, no italics, left-aligned

**Files:**
- Modify: `src/components/sections/Hero.tsx` (replace whole file)

- [ ] **Step 1: Replace `Hero.tsx`**

```tsx
export function Hero() {
  return (
    <section className="min-h-screen flex items-center relative">
      <div className="max-w-[1200px] mx-auto px-8 w-full">
        <div className="max-w-[720px]">
          <h1 className="text-[var(--text-primary)] text-4xl md:text-5xl font-light tracking-tight leading-tight mb-4">
            Nathan Walker
          </h1>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl mb-16">
            AI Governance &amp; Enterprise Platforms
          </p>
          <div className="space-y-2">
            <p className="text-[var(--text-primary)] text-xl md:text-2xl font-light leading-relaxed">
              AI eliminated the cost of building.
            </p>
            <p className="text-[var(--text-primary)] text-xl md:text-2xl font-light leading-relaxed">
              It did not eliminate the cost of being wrong.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[var(--text-muted)] text-sm tracking-widest">
        Scroll ↓
      </div>
    </section>
  )
}
```

Notes: identity line added (delta §1), `<em>` removed (delta §2), content block anchored to the site's 1200px grid instead of a centered 720px column (delta §3 "left-aligned on desktop").

- [ ] **Step 2: Run tests** — hero test passes; others still red. Commit:

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: hero identity line, remove italic, left-align on desktop grid"
```

### Task 6: What AI Did Not Collapse — scar line + restore to homepage

**Files:**
- Modify: `src/components/sections/WhatAIDidNotCollapse.tsx:23-30`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the closing block in `WhatAIDidNotCollapse.tsx`**

Old:

```tsx
        <div className="space-y-2">
          <p className="text-[var(--text-primary)] text-lg font-medium">
            These are not features.
          </p>
          <p className="text-[var(--text-primary)] text-lg font-medium">
            They are guardrails.
          </p>
        </div>
```

New:

```tsx
        <div className="space-y-2">
          <p className="text-[var(--text-primary)] text-lg font-medium">
            These decisions do not appear in the prompt.
          </p>
          <p className="text-[var(--text-primary)] text-lg font-medium">
            They appear in the scars.
          </p>
        </div>
```

- [ ] **Step 2: Add the section to `src/app/page.tsx`** (v2.1 §3 order — after JudgmentGap):

```tsx
import { Hero } from '@/components/sections/Hero'
import { JudgmentGap } from '@/components/sections/JudgmentGap'
import { WhatAIDidNotCollapse } from '@/components/sections/WhatAIDidNotCollapse'
import { EnterpriseProof } from '@/components/sections/EnterpriseProof'
import { PlatformThinking } from '@/components/sections/PlatformThinking'
import { AccountableAI } from '@/components/sections/AccountableAI'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <JudgmentGap />
      <WhatAIDidNotCollapse />
      <EnterpriseProof />
      <PlatformThinking />
      <AccountableAI />
      <ContactSection />
    </main>
  )
}
```

- [ ] **Step 3: Run tests, commit**

```bash
pnpm test
git add src/components/sections/WhatAIDidNotCollapse.tsx src/app/page.tsx
git commit -m "feat: restore What AI Did Not Collapse with approved scar closing line"
```

### Task 7: PlatformThinking — hardware language out

**Files:**
- Modify: `src/components/sections/PlatformThinking.tsx`

- [ ] **Step 1: Replace the capabilities array** (approved copy, v2.1 §5):

```tsx
const capabilities = [
  'Segmented trust zones',
  'Isolated inference plane',
  'Kubernetes workload fabric',
  'Deterministic deployment pipelines',
]
```

- [ ] **Step 2: Replace the intro paragraph** (removes "10Gb, GPU-backed"):

Old:

```tsx
          I operate a segmented, 10Gb, GPU-backed private AI fabric — not as a hobby, but as a proving ground for the systems I design for regulated environments.
```

New:

```tsx
          I operate a segmented private AI fabric — not as a hobby, but as a proving ground for the systems I design for regulated environments.
```

- [ ] **Step 3: Run tests (hardware test goes green), commit**

```bash
pnpm test
git add src/components/sections/PlatformThinking.tsx
git commit -m "feat: remove hardware language from homepage infrastructure section"
```

### Task 8: 38% + Analyst Recognition strip

**Files:**
- Create: `src/components/sections/AnalystRecognition.tsx`
- Modify: `src/components/sections/EnterpriseProof.tsx`
- Modify: `src/components/sections/PhilosophyAccordion.tsx:157,164`

- [ ] **Step 1: Create `AnalystRecognition.tsx`**

Link policy is canon: ONLY SoundHound's licensed landing pages, never raw Gartner reprint URLs. All three URLs verified HTTP 200 on 2026-06-12.

```tsx
const recognitions = [
  {
    org: 'Everest Group',
    detail: 'PEAK Matrix® Leader for Conversational AI and AI Agents in CXM, 2025',
    href: 'https://www.soundhound.com/everest-group-peak-matrix-leader-2025/',
  },
  {
    org: 'IDC MarketScape',
    detail: 'Leader, Conversational AI Platforms, 2025',
    href: 'https://www.soundhound.com/idc-marketscape-leader-2025/',
  },
  {
    org: 'Gartner',
    detail: 'Magic Quadrant™ Visionary, Conversational AI Platforms, 2025',
    href: 'https://www.soundhound.com/gartner-magic-quadrant-conversational-ai-2025/',
  },
]

export function AnalystRecognition({ expanded = false }: { expanded?: boolean }) {
  return (
    <div>
      <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-6">
        2025 Analyst Recognition
      </p>
      <ul className="space-y-4 mb-8 list-none">
        {recognitions.map((r) => (
          <li key={r.org}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <span className="text-[var(--text-primary)] text-base font-medium group-hover:underline underline-offset-4">
                {r.org}
              </span>
              <span className="text-[var(--text-muted)] text-base"> — {r.detail}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4">
        Pipeline, response platform, briefings, and live demos delivered end-to-end.
      </p>
      {expanded && (
        <p className="text-[var(--text-muted)] text-xs leading-relaxed">
          Gartner and Magic Quadrant are registered trademarks of Gartner, Inc. and/or its
          affiliates and are used herein with permission via licensed vendor landing pages.
          Analyst recognitions refer to SoundHound AI, where Nathan led global sales engineering.
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Wire into `EnterpriseProof.tsx`** — change the metric and add the strip before the CTA:

Change line 5:

```tsx
  { value: '38%', label: 'POC → Deal conversion' },
```

Add import at top:

```tsx
import { AnalystRecognition } from './AnalystRecognition'
```

Insert between the second closing `</p>` (after "…executive visibility.") and the `<Link>` CTA:

```tsx
        <div className="border-t border-[var(--edge)] pt-12 mb-12">
          <AnalystRecognition />
        </div>
```

- [ ] **Step 3: Fix `PhilosophyAccordion.tsx`** — two occurrences:

Line 157: `'A repeatable framework for enterprise demos with a 76% POC win rate.'` → `'A repeatable framework for enterprise demos with a 38% POC win rate.'`

Line 164: `After running hundreds of enterprise demos with a 76% POC win rate,` → `After running hundreds of enterprise demos with a 38% POC win rate,`

- [ ] **Step 4: Run full suite — ALL tests must now pass**

```bash
pnpm test
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/AnalystRecognition.tsx src/components/sections/EnterpriseProof.tsx src/components/sections/PhilosophyAccordion.tsx
git commit -m "feat: canonical 38% conversion metric + 2025 analyst recognition strip"
```

### Task 9: Nav simplification

**Files:**
- Modify: `src/components/layout/Nav.tsx` (replace whole file)

- [ ] **Step 1: Replace `Nav.tsx` with the flat model** (keeps scroll-name behavior and mobile menu; drops dropdown machinery entirely):

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Runestack', href: '/runestack' },
  { label: 'Contact', href: '/#contact' },
]

export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    if (!isHome) return
    function onScroll() {
      setScrolled(window.scrollY > 100)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const showName = !isHome || scrolled

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-5 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--edge)]">
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between">
        <Link
          href="/"
          className={`text-[var(--text-primary)] text-lg font-semibold tracking-tight transition-opacity duration-300 ${
            showName ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Nathan Walker
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname === item.href
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <path d="M18 6L6 18" />
                <path d="M6 6L18 18" />
              </>
            ) : (
              <>
                <path d="M4 7H20" />
                <path d="M4 12H20" />
                <path d="M4 17H20" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 py-6 border-t border-[var(--edge)] space-y-4">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-[var(--text-secondary)] text-sm hover:text-[var(--text-primary)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
```

Demoted surfaces (Definitions, Frameworks, Patterns, Ecosystem, Resume) remain in the footer — `src/components/layout/Footer.tsx` already lists all of them; no footer change needed.

- [ ] **Step 2: Run full suite + lint + build**

```bash
pnpm test && pnpm lint && pnpm build
```

Expected: all green. (`pnpm build` runs the token prebuild — fine locally where token-forge exists.)

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Nav.tsx
git commit -m "feat: simplify primary nav to flat executive structure"
```

### Task 10: Open, verify, merge PR 2

- [ ] **Step 1: Push, open PR with delta checklist in body**

```bash
git push -u origin feat/homepage-v21-pass
gh pr create --base develop --title "feat: homepage v2.1 refinement pass, nav simplification, 38% metric, analyst strip" --body "Implements PLAN-001 items 3–4 and the 2026-05-13 recommendations §2/§3/§5:
- Hero: identity line, no italics, left-aligned (deltas 1–3)
- What AI Did Not Collapse restored with scar line (deltas 4–5)
- Hardware language off homepage (delta 6)
- Flat 5-item nav; corpus pages demoted to footer (delta 7)
- D1 resolved: 38% canonical (homepage + philosophy)
- 2025 Analyst Recognition strip, licensed SoundHound links only

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```

- [ ] **Step 2: Watch run by id, merge when green, wait for staging deploy**

- [ ] **Step 3: Staging spot-check (manual, curl)**

```bash
curl -s https://staging.nwalker.cc/ | grep -c "AI Governance &amp; Enterprise Platforms"   # expect >= 1
curl -s https://staging.nwalker.cc/ | grep -c "appear in the scars"                        # expect >= 1
curl -s https://staging.nwalker.cc/ | grep -c "38%"                                        # expect >= 1
curl -s https://staging.nwalker.cc/ | grep -ci "10Gb"                                      # expect 0
```

---

# PR 3 — `ci/tests-and-synthetic-monitoring`

### Task 11: Run unit tests + lint in CI

**Files:**
- Modify: `.github/workflows/deploy.yml` (validate job)
- Modify: `package.json` (add packageManager pin)

- [ ] **Step 1: Pin pnpm in `package.json`** (top level, after `"private": true,`):

```json
  "packageManager": "pnpm@9.15.9",
```

(pnpm 9, not 10 — pnpm 10's ignored-builds behavior breaks frozen-lockfile installs with native deps.)

- [ ] **Step 2: Add test steps to the `validate` job in `deploy.yml`**, after the checkout step and before "Lint Dockerfile":

```yaml
      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Install dependencies (strip local token-forge dep — tokens.css is committed)
        run: |
          sed -i '/@nwalker\/token-forge/d' package.json
          pnpm install --no-frozen-lockfile --ignore-scripts

      - name: Lint
        run: pnpm lint

      - name: Unit tests
        run: pnpm test
```

Note: the sed strip mirrors `Dockerfile:12` — the `file:../../tools/token-forge` dep doesn't exist on runners. `pnpm test` (vitest) has no pre-script, and `src/styles/tokens.css` is committed, so no token build is needed.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml package.json
git commit -m "ci: run lint and unit tests in validate job"
```

### Task 12: Shared smoke script + post-deploy audit jobs

**Files:**
- Create: `scripts/smoke.sh`
- Modify: `.github/workflows/deploy.yml` (add smoke jobs)
- Modify: `docs/RUNBOOK.md` (audit section)

- [ ] **Step 1: Create `scripts/smoke.sh`** (PLAN-001 item 5: root, key routes, sitemap, robots, canonical metadata, contact path):

```bash
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

check "/"            "Nathan Walker"                      "root renders"
check "/"            "id=\"contact\""                     "contact path present"
check "/philosophy"  "Nathan Walker"                      "philosophy route"
check "/enterprise"  "Nathan Walker"                      "enterprise route"
check "/architecture" "Nathan Walker"                     "architecture route"
check "/runestack"   "Nathan Walker"                      "runestack route"
check "/sitemap.xml" "nwalker.cc/enterprise"              "sitemap lists key routes"
check "/robots.txt"  "sitemap"                            "robots advertises sitemap"
check "/frameworks"  "rel=\"canonical\""                  "canonical metadata present"

exit "$FAIL"
```

```bash
chmod +x scripts/smoke.sh
```

**Verify locally before committing:** run `pnpm dev` in another pane, then `scripts/smoke.sh http://localhost:3000`. The `id="contact"` and `rel="canonical"` expectations MUST be validated against actual rendered HTML — if the contact section uses a different anchor, adjust the script to what the page actually renders (check with `curl -s http://localhost:3000/ | grep -o 'id="[a-z]*"'`).

- [ ] **Step 2: Add smoke jobs to `deploy.yml`** (after deploy-staging and deploy-production jobs):

```yaml
  smoke-staging:
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - name: Smoke test staging
        run: ./scripts/smoke.sh https://staging.nwalker.cc | tee -a "$GITHUB_STEP_SUMMARY"

  smoke-production:
    needs: deploy-production
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - name: Smoke test production
        run: ./scripts/smoke.sh https://nwalker.cc | tee -a "$GITHUB_STEP_SUMMARY"
```

- [ ] **Step 3: Commit**

```bash
git add scripts/smoke.sh .github/workflows/deploy.yml
git commit -m "ci: post-deploy smoke audit for staging and production"
```

### Task 13: Synthetic monitoring with notification evidence

**Files:**
- Create: `.github/workflows/synthetic-health.yml`
- Modify: `docs/RUNBOOK.md`
- Modify: `docs/GAPS.md` (resolve the High monitoring gap)

- [ ] **Step 1: Create `synthetic-health.yml`** — scheduled checks; failure opens (or comments on) a GitHub issue, which emails Nathan = notification evidence:

```yaml
name: Synthetic Health

on:
  schedule:
    - cron: '*/30 * * * *'
  workflow_dispatch:

permissions:
  contents: read
  issues: write

jobs:
  probe:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        env:
          - { name: production, url: 'https://nwalker.cc' }
          - { name: staging, url: 'https://staging.nwalker.cc' }
    steps:
      - uses: actions/checkout@v6

      - name: Probe ${{ matrix.env.name }}
        id: probe
        run: ./scripts/smoke.sh "${{ matrix.env.url }}" | tee probe.log

      - name: Raise alert issue on failure
        if: failure()
        env:
          GH_TOKEN: ${{ github.token }}
          ENV_NAME: ${{ matrix.env.name }}
        run: |
          TITLE="Synthetic health failure: $ENV_NAME"
          BODY="$(printf 'Probe failed at %s\n\n```\n%s\n```\nRun: %s' "$(date -u +%FT%TZ)" "$(cat probe.log)" "$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID")"
          EXISTING=$(gh issue list --state open --search "in:title \"$TITLE\"" --json number --jq '.[0].number // empty')
          if [ -n "$EXISTING" ]; then
            gh issue comment "$EXISTING" --body "$BODY"
          else
            gh issue create --title "$TITLE" --label "synthetic-failure" --body "$BODY"
          fi
```

- [ ] **Step 2: Create the label** (one-time):

```bash
gh label create synthetic-failure --color B60205 --description "Raised by the synthetic health workflow" 2>/dev/null || true
```

- [ ] **Step 3: Add to `docs/RUNBOOK.md`** (new section at the end):

```markdown
## Synthetic Monitoring

- `.github/workflows/synthetic-health.yml` probes production and staging every 30 minutes
  (root, key routes, sitemap, robots, canonical metadata, contact path — `scripts/smoke.sh`).
- On failure it opens or updates a GitHub issue labeled `synthetic-failure`; GitHub
  notification email to the repo owner is the notification evidence (GAPS-001 High item).
- Post-deploy smoke jobs (`smoke-staging`, `smoke-production` in `deploy.yml`) run the same
  script after every deploy and write results to the run summary — this is the PLAN-001 #5
  production audit.
- Manual run: `gh workflow run synthetic-health.yml` or `./scripts/smoke.sh https://nwalker.cc`.
```

- [ ] **Step 4: Update `docs/GAPS.md`** — move the monitoring bullet from High Priority to a new `## Resolved` section:

```markdown
## Resolved

- 2026-06: Synthetic monitoring covers `nwalker.cc` and `staging.nwalker.cc` every 30 minutes
  with GitHub-issue notification evidence (`synthetic-health.yml`); post-deploy smoke audits
  run in the deploy pipeline.
```

Also update the `Last Reviewed` field to `2026-06-12` and `Next Review` to `2026-07-12`.

- [ ] **Step 5: Commit, push, PR, watch run by id, merge**

```bash
git add .github/workflows/synthetic-health.yml docs/RUNBOOK.md docs/GAPS.md
git commit -m "feat: synthetic health monitoring with issue-based notification evidence"
git push -u origin ci/tests-and-synthetic-monitoring
gh pr create --base develop --title "ci: unit tests in CI, post-deploy smoke audit, synthetic monitoring" --body "Closes PLAN-001 #2 and #5 and the GAPS-001 High monitoring item.

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```

- [ ] **Step 6: After merge, manually dispatch once and verify a green run:**

```bash
gh workflow run synthetic-health.yml
gh run list --workflow synthetic-health.yml -L 1
```

---

# PR 4 — `feat/phase2-authority-pages`

### Task 14: `/enterprise` rebuild — five-section structure

**Files:**
- Modify: `src/app/enterprise/page.tsx` (replace whole file)
- Test: `src/app/__tests__/enterprise.test.tsx` (create)

Content sources: `~/docs/40-personal/portfolio/_portfolio-root/nathan-walker-resume-se-leadership.md` + 2026-05-13 recommendations §6. Five sections per v2.1 §Page Strategy, with the expanded analyst strip.

- [ ] **Step 1: Write the failing test** — `src/app/__tests__/enterprise.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EnterprisePage from '../enterprise/page'

describe('Enterprise page', () => {
  it('renders the five executive sections', () => {
    render(<EnterprisePage />)
    expect(screen.getByText('Leadership Scope')).toBeTruthy()
    expect(screen.getByText('Enterprise Wins')).toBeTruthy()
    expect(screen.getByText('Organizational Scaling')).toBeTruthy()
    expect(screen.getByText('Platform Expertise')).toBeTruthy()
    expect(screen.getByText('Governance and Compliance')).toBeTruthy()
  })

  it('uses the canonical conversion metric with its definition', () => {
    const { container } = render(<EnterprisePage />)
    expect(container).toHaveTextContent(/38%/)
    expect(container).not.toHaveTextContent(/76%/)
    expect(container).toHaveTextContent(/structured POC governance/i)
  })

  it('embeds the expanded analyst recognition strip', () => {
    render(<EnterprisePage />)
    expect(screen.getByText(/2025 Analyst Recognition/)).toBeTruthy()
    expect(screen.getByText(/Gartner and Magic Quadrant are registered trademarks/)).toBeTruthy()
  })
})
```

Run `pnpm test` — expect FAIL (sections missing).

- [ ] **Step 2: Replace `src/app/enterprise/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { AnalystRecognition } from '@/components/sections/AnalystRecognition'

export const metadata: Metadata = {
  title: 'Enterprise Work | Nathan Walker',
  description:
    'Executive sales engineering leadership: enterprise wins, organizational scaling, platform expertise, and governance under regulatory constraint.',
  alternates: {
    canonical: '/enterprise',
  },
}

const sections = {
  wins: [
    '$17M Visionworks — largest deal in company history at signing.',
    '$9M Southern California Edison — competitive displacement, closed through technical differentiation and a discovery-led demo strategy.',
    '$6.25M Chipotle — innovation deal.',
    'Healthcare-led book: 20+ accounts across payer, provider-IDN, DSO-specialty, RCM, ambulatory, vision, and home-health verticals.',
  ],
  platforms: [
    { area: 'Contact center', items: 'Genesys, NICE, Five9, AWS Connect, custom SIP' },
    { area: 'Healthcare systems', items: 'Epic, Cerner, Meditech' },
    { area: 'Interoperability', items: 'FHIR, HL7, MCP-mediated agent-to-data access patterns' },
    { area: 'Voice AI', items: '100+ enterprise deployments — IVR/ACD architecture, real-time ASR/TTS' },
  ],
  governance: [
    'HIPAA / HITECH',
    'GDPR',
    'EU AI Act',
    'NIST AI RMF',
    'ISO/IEC 42001',
  ],
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight mb-6">
      {children}
    </h2>
  )
}

export default function EnterprisePage() {
  return (
    <main className="px-8">
      <div className="max-w-[720px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Enterprise Work
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-4xl font-light tracking-tight leading-tight mb-16">
          Systems and organizations built under consequence.
        </h1>

        <section className="border-t border-[var(--edge)] py-12">
          <SectionHeading>Leadership Scope</SectionHeading>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
            Fifteen-plus years building, scaling, and operating customer-facing technical
            organizations. Built a global sales engineering practice from a 3-person regional
            team to 50+ across NA, EMEA, APAC, and LATAM — with the playbooks, certification
            paths, enablement curricula, and operating cadence to sustain it.
          </p>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            $50M+ in influenced enterprise revenue across voice AI, automation, and agentic
            systems — architected at the whiteboard with C-suite stakeholders and governed
            through evaluation frameworks that move win rates.
          </p>
        </section>

        <section className="border-t border-[var(--edge)] py-12">
          <SectionHeading>Enterprise Wins</SectionHeading>
          <ul className="space-y-4 mb-8 list-none">
            {sections.wins.map((w) => (
              <li key={w} className="text-[var(--text-secondary)] text-lg leading-relaxed">
                {w}
              </li>
            ))}
          </ul>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            38% POC-to-deal conversion under a structured POC governance and evaluation
            framework — measured as closed deals over structured proofs-of-concept run, with
            benchmarking methodology that improved the overall sales win rate.
          </p>
        </section>

        <section className="border-t border-[var(--edge)] py-12">
          <SectionHeading>Organizational Scaling</SectionHeading>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
            3 → 10 → 50+ engineers across four business units and four regions. Golden Demo
            Library with automated provisioning reduced demo preparation by 40+ hours per
            quarter across the organization. Communities of Practice and certification paths
            turned individual judgment into institutional capability.
          </p>
        </section>

        <section className="border-t border-[var(--edge)] py-12">
          <SectionHeading>Platform Expertise</SectionHeading>
          <ul className="space-y-4 list-none">
            {sections.platforms.map((p) => (
              <li key={p.area} className="text-lg leading-relaxed">
                <span className="text-[var(--text-primary)] font-medium">{p.area}.</span>{' '}
                <span className="text-[var(--text-secondary)]">{p.items}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-[var(--edge)] py-12">
          <SectionHeading>Governance and Compliance</SectionHeading>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
            Enterprise AI delivered inside regulatory boundaries, not around them. Working
            fluency across the frameworks that govern high-stakes deployments:
          </p>
          <ul className="space-y-3 mb-6 list-none">
            {sections.governance.map((g) => (
              <li key={g} className="text-[var(--text-muted)] text-lg">
                {g}
              </li>
            ))}
          </ul>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            Plus matrix experience across 20+ additional control frameworks in payer, provider,
            utility, and financial-services engagements.
          </p>
        </section>

        <section className="border-t border-[var(--edge)] py-12">
          <AnalystRecognition expanded />
        </section>
      </div>
    </main>
  )
}
```

**Flag for Nathan in the PR description:** the 38% definition sentence ("closed deals over structured proofs-of-concept run") is a drafted definition — he must confirm or reword it before the production tag.

- [ ] **Step 3: Run tests (all green), lint, commit**

```bash
pnpm test && pnpm lint
git add src/app/enterprise/page.tsx src/app/__tests__/enterprise.test.tsx
git commit -m "feat: rebuild /enterprise with five-section executive structure"
```

### Task 15: `/patterns/healthcare-voice-ai` page

**Files:**
- Create: `src/app/patterns/healthcare-voice-ai/page.tsx`
- Modify: `src/lib/seo/site.ts` (add route to sitemap)
- Modify: `src/app/patterns/page.tsx` (contextual link)
- Modify: `src/app/__tests__/metadata-routes.test.ts` (expect new URL)

- [ ] **Step 1: Failing test first** — in `metadata-routes.test.ts`, add to the sitemap URL assertions:

```tsx
    expect(urls).toContain('https://nwalker.cc/patterns/healthcare-voice-ai')
```

Run `pnpm test` — expect FAIL.

- [ ] **Step 2: Add the route to `src/lib/seo/site.ts`** — append to `corpusPages`:

```tsx
  {
    path: '/patterns/healthcare-voice-ai',
    title: 'Healthcare Voice AI Patterns | Nathan Walker',
    description: 'Bounded definitions and architecture patterns for healthcare voice AI: patient access, scheduling recovery, prior authorization, and collections under HIPAA constraint.',
    priority: 0.7,
  },
```

- [ ] **Step 3: Create `src/app/patterns/healthcare-voice-ai/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildCollectionPageSchema, createGraph } from '@/lib/seo/schema'

export const metadata: Metadata = {
  title: 'Healthcare Voice AI Patterns | Nathan Walker',
  description:
    'Bounded definitions and architecture patterns for healthcare voice AI: patient access, scheduling recovery, prior authorization, and collections under HIPAA constraint.',
  alternates: {
    canonical: '/patterns/healthcare-voice-ai',
  },
}

const patterns = [
  {
    name: 'Patient access',
    definition:
      'Voice-first front door for eligibility, registration, and routing. The agent resolves identity and intent before any PHI-bearing system is touched, so the trust boundary is crossed once, deliberately, and with an audit record.',
  },
  {
    name: 'Scheduling and waitlist recovery',
    definition:
      'Outbound voice fills canceled and unbooked slots from a prioritized waitlist. The scheduling system remains the source of truth; the agent holds no schedule state, only bounded write access through the EHR integration layer.',
  },
  {
    name: 'No-show recapture',
    definition:
      'Automated re-engagement after missed appointments — confirmation, rebooking, and barrier capture (transport, coverage, time-of-day) fed back to operations as structured data rather than call notes.',
  },
  {
    name: 'Prior authorization',
    definition:
      'Status retrieval and document chase across payer interfaces. The pattern separates retrieval (safe to automate broadly) from submission (gated, logged, and attributable to an accountable identity).',
  },
  {
    name: 'Post-visit collections',
    definition:
      'Outbound balance resolution with payment capture handed off to a PCI-scoped processor. The voice agent never holds card data; it brokers a transfer into the compliant payment path.',
  },
  {
    name: 'Post-discharge workflows',
    definition:
      'Follow-up adherence checks, medication confirmation, and escalation triggers. Escalation thresholds are clinical-team policy expressed as configuration, not model judgment.',
  },
]

export default function HealthcareVoiceAIPage() {
  const schema = createGraph([
    buildCollectionPageSchema({
      path: '/patterns/healthcare-voice-ai',
      name: 'Healthcare Voice AI Patterns',
      description:
        'Bounded definitions and architecture patterns for healthcare voice AI under HIPAA constraint.',
    }),
  ])

  return (
    <main className="px-8">
      <JsonLd data={schema} />
      <section className="max-w-[800px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Patterns / Healthcare Voice AI
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8">
          Healthcare voice AI, bounded by the systems it must answer to.
        </h1>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-16">
          These are the recurring workloads where voice AI earns its keep in healthcare — and
          the architectural boundaries that keep each one inside regulatory constraint. Drawn
          from production deployments across payer, provider, DSO, and RCM environments.
        </p>

        <div className="space-y-12 mb-20">
          {patterns.map((p) => (
            <article key={p.name} className="border-t border-[var(--edge)] pt-8">
              <h2 className="text-[var(--text-primary)] text-xl font-semibold mb-4">{p.name}</h2>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                {p.definition}
              </p>
            </article>
          ))}
        </div>

        <section className="border-t border-[var(--edge)] pt-12 mb-20">
          <h2 className="text-[var(--text-primary)] text-xl font-semibold mb-4">
            Compliance posture
          </h2>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4">
            Every pattern above assumes HIPAA/HITECH as the floor: PHI minimization at the
            voice boundary, BAA-covered processing paths, role-scoped data access through the
            integration layer, and audit records for every system mutation. Voice transcripts
            are treated as PHI the moment identity is resolved.
          </p>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            Integration runs through FHIR and HL7 interfaces rather than screen-scraping or
            credential sharing — agent-to-data access is mediated, scoped, and revocable.
          </p>
        </section>

        <section className="border-t border-[var(--edge)] pt-12 mb-20">
          <h2 className="text-[var(--text-primary)] text-xl font-semibold mb-4">
            Published results
          </h2>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            42 North Dental&apos;s published case study reports $8M collected in nine months at
            roughly 100,000 monthly outbound calls using these scheduling-recovery and
            collections patterns.
          </p>
        </section>

        <div className="flex gap-8">
          <Link
            href="/patterns"
            className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
          >
            ← All patterns
          </Link>
          <Link
            href="/enterprise"
            className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
          >
            Enterprise work →
          </Link>
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 4: Add contextual link on `/patterns`** — in `src/app/patterns/page.tsx`, after the patterns grid, add:

```tsx
        <div className="mt-16 border-t border-[var(--edge)] pt-8">
          <Link
            href="/patterns/healthcare-voice-ai"
            className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
          >
            Healthcare voice AI patterns →
          </Link>
        </div>
```

(Add `import Link from 'next/link'` at the top if not present.)

- [ ] **Step 5: Run tests + lint + build; commit**

```bash
pnpm test && pnpm lint && pnpm build
git add src/app/patterns src/lib/seo/site.ts src/app/__tests__/metadata-routes.test.ts
git commit -m "feat: add /patterns/healthcare-voice-ai authority page"
```

### Task 16: `/frameworks/architecting-certainty` page

**Source of truth:** `~/docs/40-personal/professional/Thought Leadership/Architecting Certainty_ The Definitive Guide to the High-Stakes Technology Demonstration.pdf` (Nathan, July 2025). The page is a memo-grade, citable distillation — the full playbook stays off-site. The doctrine, verbatim from the source: a Foundation (Earning the Right to Demo) plus eight pillars — 1. The Power of Storytelling (Hero's Journey), 2. The Experience, 3. The Completeness, 4. The Fidelity, 5. Demonstrable Value, 6. Objection Handling & Preemption (Parking Lot), 7. Strategic Demo Execution & Call to Action (Situation Slide, Mutual Closure Plan), 8. The Presenter's Polish (Find Your Guitar) — plus a bonus pillar, The Demo Factory. Core concept: the Certainty Spectrum.

**Publish gate (D3):** merging to develop only reaches staging; Nathan reviews the doctrine page on staging before the production tag (Task 19 already gates on him). Strip sales-voice phrasing to memo grade; keep his named concepts verbatim.

**Files:**
- Create: `src/app/frameworks/architecting-certainty/page.tsx`
- Modify: `src/lib/seo/site.ts` (append route to `corpusPages`)
- Modify: `src/app/frameworks/page.tsx` (contextual link after the frameworks grid)
- Modify: `src/app/__tests__/metadata-routes.test.ts` (expect new URL)

- [ ] **Step 1: Failing test** — add to the sitemap assertions:

```tsx
    expect(urls).toContain('https://nwalker.cc/frameworks/architecting-certainty')
```

- [ ] **Step 2: Add to `corpusPages` in `src/lib/seo/site.ts`:**

```tsx
  {
    path: '/frameworks/architecting-certainty',
    title: 'Architecting Certainty | Nathan Walker',
    description: 'An eight-pillar methodology for high-stakes technology demonstrations: earning the right to demo, narrative structure, value engineering, and execution discipline.',
    priority: 0.7,
  },
```

- [ ] **Step 3: Create the page.** Structure (all content distilled from the source PDF — do not invent):

1. **Header**: "Architecting Certainty" / subtitle "A methodology for high-stakes technology demonstrations."
2. **Doctrine summary** (2 paragraphs): a demo's purpose is to move a prospect along the **Certainty Spectrum** — from uncertainty, skepticism, and perceived risk to confidence that the problem can be solved; forged across hundreds of enterprise conversational-AI engagements; synthesis of Solution Selling, Value-Based Selling, and narrative craft.
3. **The Foundation: Earning the Right to Demo** — discovery before demonstration (business, pain points, use cases, desired outcomes, technical environment); the "one perfect first demo" principle; demoing too early teaches the prospect you don't understand their business.
4. **The Eight Pillars** — each rendered as a bordered article with name + 2–3 sentence definition:
   - The Power of Storytelling — Hero's Journey structure: persona in their ordinary world, the pain as call to adventure, the platform as mentor, the transformation as reward. Technology presented as a "hard magic system": understandable rules, defined limitations.
   - The Experience — voice persona, perceived latency, disarming the IVR shadow, elegant simplicity over engineering display, personalization in the client's terminology.
   - The Completeness — feature depth, realistic populated environments, broad channels, functional partner integrations; a superficial demo sows doubt about production-readiness.
   - The Fidelity — beyond the happy path: chained functions, ambiguous requests, proactive intelligence; internal "impressive" is not customer "impressive."
   - Demonstrable Value — value engineering in the three languages of the C-suite: cost, revenue, risk.
   - Objection Handling & Preemption — a drilled response library, preemption woven into the narrative, **the Parking Lot** for derailing deep-dives, grace under fire when the demo breaks.
   - Strategic Demo Execution & Call to Action — meeting as orchestrated production; **the Situation Slide** ("What We've Learned About You" + "Did we get this right?", Cunningham's Law); **the Mutual Closure Plan** — the CTA reframed from an ask to a proposed collaborative path, secured verbally before the meeting ends.
   - The Presenter's Polish — production value as professional discipline; **Find Your Guitar**: the guitar on the wall that turns sterile meetings into human connection; be memorable through genuine connection, not theatrics.
5. **The Demo Factory (bonus pillar)** — DemoOps: version-controlled demo assets, automated deployment, regression-tested environments, formal gating; artisanal craft delivered with industrial-grade reliability.
6. **Closing line**: "The difference between a demo that is merely seen and a demo that closes deals."
7. JSON-LD via `buildCollectionPageSchema` (path/name/description matching Step 2), canonical `/frameworks/architecting-certainty`, links back to `/frameworks` and `/enterprise`.

Use the same component idioms as `src/app/patterns/healthcare-voice-ai/page.tsx` (Task 15): `max-w-[800px]` column, bordered `<article>` per pillar, muted uppercase breadcrumb label.

- [ ] **Step 4: Contextual link on `/frameworks`** — after the frameworks grid in `src/app/frameworks/page.tsx`:

```tsx
        <div className="mt-16 border-t border-[var(--edge)] pt-8">
          <Link
            href="/frameworks/architecting-certainty"
            className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
          >
            Architecting Certainty — the demo methodology →
          </Link>
        </div>
```

(Add `import Link from 'next/link'` at the top if not present.)

- [ ] **Step 5: Run tests + lint + build; commit**

```bash
pnpm test && pnpm lint && pnpm build
git add src/app/frameworks src/lib/seo/site.ts src/app/__tests__/metadata-routes.test.ts
git commit -m "feat: add /frameworks/architecting-certainty doctrine page"
```

### Task 17: Docs currency + PR 4

**Files:**
- Modify: `docs/CURRENT_STATE.md`
- Modify: `docs/IMPLEMENTATION_PLAN.md`

- [ ] **Step 1: Update `CURRENT_STATE.md`** — set `Scope | Live status as of 2026-06-12`, `Last Reviewed | 2026-06-12`, `Next Review | 2026-07-12`; in Implemented Site Areas add:

```markdown
- Homepage aligned to v2.1 (identity line, What AI Did Not Collapse, scar line, analyst strip, no hardware language).
- Flat executive primary navigation (Philosophy / Enterprise / Architecture / Runestack / Contact).
- Enterprise page in five-section executive structure with expanded analyst recognition.
- Healthcare voice AI patterns page at `/patterns/healthcare-voice-ai`.
- Synthetic monitoring and post-deploy smoke audits via GitHub Actions.
```

- [ ] **Step 2: Update `IMPLEMENTATION_PLAN.md`** — set `Last Reviewed | 2026-06-12`, `Next Review | 2026-06-19`; replace the Next Checklist with:

```markdown
## Next Checklist

1. ~~Remove stale domain-wide Cloudflare migration language.~~ Done (May 2026).
2. ~~Add health checks for `nwalker.cc` and `staging.nwalker.cc`.~~ Done — `synthetic-health.yml` + smoke jobs (June 2026).
3. ~~Implement the homepage refinement pass from the portfolio strategic recommendations.~~ Done — v2.1 deltas 1–6 (June 2026).
4. ~~Simplify primary navigation to the final executive structure.~~ Done (June 2026).
5. ~~Audit production after each deploy.~~ Automated — smoke jobs write to run summaries.
6. Nathan reviews `/frameworks/architecting-certainty` on staging (D3 publish gate) and confirms the 38% definition wording on `/enterprise`.
7. Tag `v2.1.0` for production after staging audit.
```

- [ ] **Step 3: Commit, push, open PR 4, watch run by id, merge after green**

```bash
git add docs/CURRENT_STATE.md docs/IMPLEMENTATION_PLAN.md
git commit -m "docs: bring controlled docs current to 2026-06-12"
git push -u origin feat/phase2-authority-pages
gh pr create --base develop --title "feat: phase 2 authority pages — /enterprise rebuild, architecting certainty, healthcare voice AI patterns" --body "Recommendations §6, §7, §8. Architecting Certainty distilled from the July 2025 playbook PDF (Thought Leadership folder).

⚠️ Nathan to confirm before production tag: (1) the 38% definition sentence on /enterprise; (2) D3 — the doctrine page going on the public record (review on staging).

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```

---

# Out-of-repo work

### Task 18: Resume correction (76% → 38%)

**Files (outside repo):**
- Modify: `~/docs/40-personal/portfolio/_portfolio-root/nathan-walker-resume-se-leadership.md` (lines 9, 18, 59)
- Modify: `~/docs/40-personal/portfolio/_portfolio-root/Nathan_Walker_Resume_SE_Leadership.docx` (via python-docx)
- Replace: `public/resume.pdf` in the repo (separate small PR or fold into PR 4)

- [ ] **Step 1: Update the markdown** — replace all three `76%` occurrences with `38%`. Flag (don't change) the derived claim "improved overall sales win rate 114%" — Nathan must confirm whether that survives the metric change.

- [ ] **Step 2: Update the docx in place**

```bash
python3 - <<'EOF'
import docx
path = "/Users/nate/docs/40-personal/portfolio/_portfolio-root/Nathan_Walker_Resume_SE_Leadership.docx"
d = docx.Document(path)
changed = 0
def fix(runs):
    global changed
    for r in runs:
        if '76%' in r.text:
            r.text = r.text.replace('76%', '38%'); changed += 1
for p in d.paragraphs: fix(p.runs)
for t in d.tables:
    for row in t.rows:
        for cell in row.cells:
            for p in cell.paragraphs: fix(p.runs)
d.save(path)
print("replacements:", changed)
EOF
```

If `docx` isn't installed: `pip install python-docx` (beware the Homebrew python@3.14 expat bug — reinstall from source if pip crashes). If a `76%` spans multiple runs (replacements: 0), edit the docx manually instead and note it.

- [ ] **Step 3: Regenerate `public/resume.pdf`.** The current PDF is ReportLab-generated (8KB) and md5-identical to `Nathan_Walker_Resume_SE_Leadership.pdf`. Search for the generator first:

```bash
grep -rl "reportlab" ~/src ~/docs/40-personal --include="*.py" 2>/dev/null | head
```

- If a generator script exists: update its source text, regenerate, copy to `public/resume.pdf`, commit.
- If not: **flag to Nathan** — he exports a fresh PDF from the corrected docx and drops it at `public/resume.pdf`. Do not ship the site's 38% changes to production while `/resume.pdf` still says 76% — staging is fine, the production tag waits for the corrected PDF.

---

# Release

### Task 19: Staging audit + production tag (gated on Nathan)

- [ ] **Step 1: Full staging audit after all PRs merged**

```bash
./scripts/smoke.sh https://staging.nwalker.cc
curl -s https://staging.nwalker.cc/ | grep -c "38%"          # expect >= 1
curl -s https://staging.nwalker.cc/resume.pdf -o /tmp/r.pdf && md5 -q /tmp/r.pdf  # must be the corrected resume
```

- [ ] **Step 2: Present staging to Nathan** for visual review + the two confirmations (38% definition wording, resume PDF). Do not proceed without his go.

- [ ] **Step 3: Tag and release** (tag push triggers the production pipeline; GitHub environment approval is Nathan's gate):

```bash
git checkout develop && git pull
git tag v2.1.0 -m "v2.1 executive refinement: homepage pass, flat nav, 38% canon, analyst strip, monitoring, phase 2 pages"
git push origin v2.1.0
gh run list --workflow "Deploy Portfolio" -L 1   # watch by id
```

- [ ] **Step 4: Post-release** — verify `smoke-production` job green; update `docs/CURRENT_STATE.md` release note and the deliverables tracker if used.

---

## Self-Review (completed 2026-06-12)

- Spec coverage: PLAN-001 items 1–5 → Tasks 11–13 + PR 2 (item 1 was already done in May); v2.1 deltas 1–7 → Tasks 5–9; recommendations §5 analyst strip → Task 8; §6 enterprise → Task 14; §8 healthcare patterns → Task 15; §7 architecting-certainty → Task 16 (distilled from the July 2025 playbook PDF, publish-gated on D3); D1 → Tasks 4, 8, 14, 18; docs currency → Tasks 13, 17; out-of-scope per recommendations (Runestack pages, assistant demo, Ravenhelm workstreams) — intentionally absent.
- Placeholder scan: the only deliberate open slot is Task 18's conditional PDF-regeneration path — an explicit human-gated step, not a plan gap. Task 16's page content is fully specified from the source PDF (structure + per-pillar definitions enumerated in Step 3).
- Type consistency: `AnalystRecognition({ expanded })` defined in Task 8, consumed in Task 14 with `expanded`; smoke.sh used identically in Tasks 12 and 13; `corpusPages` extension matches `allSitemapPages` consumption in `sitemap.ts`.
