# Portfolio v2 Design — nwalker.cc

**Status:** Draft (iterating)
**Date:** 2026-02-14
**Author:** Nathan Walker + Claude

---

## Decision Log

Decisions made during brainstorming. These are settled unless revisited.

| Decision | Choice | Alternatives Considered |
|----------|--------|------------------------|
| Framework | Next.js 15 (App Router, RSC) | Astro, SvelteKit, Remix |
| Styling | Tailwind v4 + token-forge CSS vars | CSS Modules, vanilla CSS |
| Animation | Framer Motion 12 | View Transitions API, GSAP |
| Global state | Zustand | Context API, Jotai |
| Complex flows | XState 5 | Zustand middleware, custom reducers |
| Content | MDX (next-mdx-remote or @next/mdx) | CMS, markdown-it |
| Voice/streaming | LiveKit Client SDK (stubbed initially) | Daily, Twilio Client |
| Cross-platform embed | Flutter Web (Loki SDUI playground) | None |
| Design tokens | token-forge from nwalker-dark.yaml | Manual Tailwind config |
| Deploy | Docker standalone on existing Fargate | Vercel, Cloudflare Pages |
| Typography | Inter (all weights) + JetBrains Mono | Keep Instrument Serif + DM Sans |
| Color direction | Muted glass, vivid #1E67FF accents | Blue-tinted glass |
| Homepage philosophy | Zero client JS, pure typography | Showcase with glass cards |

---

## Identity Reframe

| Dimension | v1 | v2 |
|-----------|----|----|
| Positioning | Deployed Engineering & Agentic Systems | AI Governance & Enterprise Platforms |
| Audience | Hiring managers, engineering leaders | CPO-track executives, enterprise buyers |
| Tone | Technical portfolio with sales proof | Institutional authority artifact |
| Thesis | "I build systems that turn chaos into clarity" | "AI eliminated the cost of building. It did not eliminate the cost of being wrong." |
| Identity | Builder who sells | Architect who governs |

**Rule:** If it reads "look what I built," rewrite as "here is what I know that you need."

---

## Route Architecture

| Route | Purpose | Rendering | Interactive State |
|-------|---------|-----------|-------------------|
| `/` | Thesis + proof. Four typographic sections. | RSC (zero client JS) | None |
| `/philosophy` | Absorbed insights as MDX articles. Modal system. | RSC + `'use client'` modals | Zustand (modal state) |
| `/enterprise` | Executive proof: metrics, deal stories, scaling | RSC | Minimal |
| `/architecture` | Control plane deep-dive. Screenshots, diagrams. | RSC + MDX | None |
| `/runestack` | Five Invariants, manifesto. LiveKit voice demo (stubbed). | RSC + `'use client'` LiveKit | XState (voice FSM), Zustand (transcript) |
| `/portfolio` | Tech index (250+ items, filterable), competencies, work cards | `'use client'` | XState (filter FSM), Zustand (search/filter) |
| `/playground` | Loki SDUI live embed (Flutter web). Glass effects. | `'use client'` iframe | Flutter internal state |
| `/#contact` | Simplified form on homepage | RSC + form action | None (FormSubmit) |

---

## Navigation

```
Philosophy | Enterprise | Architecture | Runestack | Portfolio | Contact
```

Trust ladder: frameworks -> proof -> technical depth -> the product -> full portfolio -> engage.

---

## Homepage Sections

### 1. Hero
- Tag: "AI Governance & Enterprise Platforms"
- Name: "Nathan Walker"
- Thesis: "AI eliminated the cost of building. / It did not eliminate the cost of being wrong."
- No photo, no CTAs, no stats. Subtle scroll indicator.

### 2. The Judgment Gap
- Pure typography. Intentional line breaks respected.
- text-primary for key lines, text-secondary for supporting.
- No cards, no glass, no icons. Generous vertical spacing.

### 3. What AI Did Not Collapse
- Simple unordered list: security boundary design, failure domain modeling, identity placement in trust chains, infrastructure blast-radius control, governance under regulatory constraint.
- Closing punchline: "These decisions do not appear in the prompt. They appear in the scars."
- text-muted for list, text-primary for closing line.

### 4. Enterprise Proof
- Stacked metrics in JetBrains Mono (not card grid).
- $50M+, $17M Visionworks, $9M SCE, 76% POC->Deal, 100+ deployments, 3->50+ org scaling.
- Single CTA: "View Executive Portfolio ->" to /portfolio.

### 5. Contact
- "Work With Me"
- "I work with organizations deploying high-stakes systems. If the cost of being wrong is material, we should talk."
- Simplified form + contact links.

---

## Design Tokens (nwalker-dark.yaml)

```yaml
name: nwalker-dark
version: 2.0.0

colors:
  background: "#0B0C0F"
  surface: "#111318"
  surface_variant: "#161922"
  edge: "#1A1D24"
  primary: "#1E67FF"
  primary_light: "#4A8AFF"
  primary_glow: "rgba(30, 103, 255, 0.15)"
  text:
    primary: "#E8E8EC"
    secondary: "#8B8B9B"
    muted: "#5A5A6B"
  glass:
    background: "rgba(255, 255, 255, 0.02)"
    border: "rgba(255, 255, 255, 0.06)"
    highlight: "rgba(255, 255, 255, 0.08)"
  status:
    success: "#2DCB70"
    warning: "#E3B341"
    error: "#FF4D4F"
    info: "#1E67FF"

spacing:
  xs: 4
  sm: 8
  md: 12
  lg: 16
  xl: 24
  xxl: 32
  xxxl: 48

radii:
  sm: 4
  md: 8
  lg: 12
  xl: 16
  full: 999

typography:
  family: "Inter"
  mono_family: "JetBrains Mono"
  scales:
    display_large: { size: 48, weight: 300, spacing: -1.5 }
    display_medium: { size: 36, weight: 400, spacing: -0.5 }
    heading: { size: 24, weight: 600 }
    body_large: { size: 18, weight: 400 }
    body_medium: { size: 16, weight: 400 }
    body_small: { size: 14, weight: 400 }
    label: { size: 13, weight: 500 }
    mono_medium: { size: 16, weight: 500 }
    mono_small: { size: 13, weight: 400 }
    metric: { size: 32, weight: 600, spacing: -0.5 }

glass:
  blur_sigma: 20
  border_width: 1
```

---

## State Architecture

### Zustand Stores

**ui.ts** - theme, navOpen, activeModal
**agent.ts** - connectionStatus, transcript[], agentSpeaking, error

### XState Machines

**voice-agent.ts** - LiveKit interaction lifecycle
```
idle -> connecting -> connected.listening -> connected.agent_speaking
     -> connected.user_speaking -> connected.processing -> connected.responding
     -> disconnecting -> idle
```

**tech-filter.ts** - Portfolio tech index
```
idle -> filtering -> searching -> filtered
Context: activeCategories, searchQuery, visibleItems
```

XState governs transitions, syncs to Zustand for React subscriptions.

---

## Component Architecture

### Primitives (components/ui/)
GlassCard (subpages only), Button (primary/secondary/ghost), Badge, MetricValue, SectionDivider, ScrollIndicator, Modal

### Layout (components/layout/)
Nav (trust ladder + scroll-to-nav name animation), Footer, PageTransition (Framer Motion AnimatePresence)

### Homepage Sections (components/sections/)
Hero, JudgmentGap, WhatAIDidNotCollapse, EnterpriseProof, ContactSection - all RSC

### Interactive (components/voice/, components/tech-index/)
VoiceRoom, VoiceTranscript, VoiceStatus (XState-driven), TechGrid, TechFilter, TechCard

### Loki Embed (components/loki-embed/)
LokiPlayground - iframe wrapper for Flutter web build

---

## Animation Rules

- Page transitions: Framer Motion AnimatePresence, subtle fade
- Homepage: single fade on load, no stagger. Scroll reveals with short translate (1rem max).
- No card hover transforms on homepage.
- Glass card hover effects: subdued version on subpages only.
- Glow effects: ONLY on active state, listening state, critical alert.
- Modals: functional transitions (keep from v1).

---

## Color Rules

- No purple. All --accent-purple references removed.
- Glass stays muted (rgba whites). #1E67FF only on interactive elements, links, active states.
- No rune watermark (body::before SVG removed).
- Simplified gradient overlay (body::after).
- No glass effects on homepage.

---

## Typography Rules

- Inter for all text. Weight hierarchy (300/400/500/600/700) replaces serif/sans distinction.
- JetBrains Mono for tags, labels, metrics, code.
- No italics for drama.
- Body line-height: 1.7 minimum.
- Generous vertical rhythm throughout.

---

## Tone Rules

**Banned:** Visionary, Passionate, Revolutionary, Disruptive, Exploring opportunities
**Required:** Designed, Governed, Bounded, Verified, Operated, Auditable

**Test:** If a sentence could appear on a SaaS landing page, rewrite it. If it could appear in a management consulting memo, keep it.

---

## Preserved Elements

- Scroll-to-nav name animation
- JetBrains Mono for labels/metrics
- Dark background palette (shifted to warmer graphite)
- Contact form (FormSubmit)
- Footer links (Ravenhelm, Runestack, GitHub, LinkedIn)
- Cloudflare DNS/CDN
- Mobile responsive breakpoints (updated for new layout)
- Terraform infrastructure (minor updates for Next.js container)

---

## Open Questions (to resolve through iteration)

- Exact Framer Motion transition timing/easing for page transitions
- Philosophy page layout: list vs accordion vs full MDX articles inline
- Architecture page: how much infrastructure detail to expose publicly
- Runestack page: content depth before demo is ready
- Tech index: card density, grouping strategy, mobile behavior
- Loki playground: build strategy (separate repo build? monorepo? static assets?)
- Flutter web embed: loading strategy, fallback for unsupported browsers
- SEO: meta tags, OG images, structured data for insights
- Analytics: do we add any?
- Mobile nav: hamburger? Bottom bar? Off-canvas?

---

## Reference Documents

- Transformation Spec: provided by Nate (v1->v2 element-by-element rules)
- Technology Index: Enterprise Architecture Scaffold v1.3.0 (250+ technologies)
- Loki Guide: https://outline.ravenhelm.dev/doc/guide-loki-ui-framework-ScsT21NaSQ
- Current site: /Users/nate/src/portfolio/nwalker.cc/src/index.html
- Token-forge: /Users/nate/src/tools/token-forge/
