# Assistant Demo And Portfolio v2.1 Handoff

| Field | Value |
| --- | --- |
| Document ID | NWALKER-HANDOFF-ASSISTANT-DEMO-001 |
| Status | Active Handoff |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | Pickup notes for assistant demo planning and portfolio v2.1 refinement |
| Related Services | `nwalker.cc`, `staging.nwalker.cc`, Assistant Demo, Runestack |
| Related ADRs | ADR-001 |
| Review Cadence | Use at next implementation pickup |
| Retention Rule | Retain until implementation workstream is complete |
| Last Reviewed | 2026-05-08 |
| Next Review | 2026-05-15 |

## Current Repository State

Main checkout:

- Path: `/Users/nate/src/portfolio/nwalker.cc`
- Branch: `develop`
- Status at handoff: behind `origin/develop` by 3 commits.
- Tracked changes at handoff: none.
- Untracked: `.Codex/` because worktrees live under it.

Active worktree:

- Path: `/Users/nate/src/portfolio/nwalker.cc/.Codex/worktrees/assistant-demo-prd`
- Branch: `docs/assistant-demo-prd`
- Base: `origin/develop`
- Status at handoff: three untracked docs.

Untracked docs in worktree:

- `docs/plans/2026-05-08-executive-assistant-demo-prd.md`
- `docs/plans/2026-05-08-portfolio-v2-1-strategic-refinement.md`
- `docs/plans/2026-05-08-assistant-demo-handoff.md`

## Important Context

This workstream was created after a rollback incident. Do not push, deploy, or land portfolio UI changes without explicit approval and PR flow.

Nate's top-level checkout is considered his working area. Continue using a dedicated git worktree for all edits.

The temporary HTML mockup previously used for brainstorming lived under `/private/tmp/nwalker-voice-mockup/...` and was lost after reboot. Do not rely on it as source of truth.

## Strategic Decisions Made

### Assistant Product Shape

The portfolio assistant should use two pages:

1. `/assistant`
   - Marketing and trust page.
   - Explains the assistant, its boundaries, gating, session behavior, and launch path.
   - No paid voice calls.
   - No full-screen app embed.

2. `/assistant/app`
   - Full-screen assistant application.
   - Contains conversation, voice state, gate, activity, tools, health, session, source/context, and handoff panels.

### Assistant Persona

The assistant should not be anthropomorphized.

It is not:

- Jarvis 2.0.
- A named character.
- A friend.
- A digital Nathan.
- A human-like executive assistant.

It is:

- A controlled AI interface for Nathan Walker's public portfolio.
- A public-context Q&A surface.
- A meeting-intake and handoff tool.
- A reference implementation of accountable assistant architecture.

Preferred framing:

- `Nathan Walker Assistant`
- `Public context, meeting intake, and architecture Q&A`

### Gate And Cost Controls

There must be a gate before paid voice capabilities.

Required controls:

- Bot challenge such as Cloudflare Turnstile or equivalent.
- Intent/consent step before paid voice starts.
- Server-side admission check before voice token minting.
- Short-lived server-minted voice tokens.
- Provider keys must never reach the browser.
- Per-session budgets for voice duration, STT seconds, TTS characters, tool calls, and cooldown.
- Returning sessions still require fresh checks before paid voice starts.

### Light User Session

Use an opaque server-backed session cookie.

Cookie requirements:

- Opaque random ID only.
- `HttpOnly`.
- `Secure`.
- `SameSite=Lax`.
- Signed or backed by a signed session mechanism.
- No PII, transcript text, provider token, or tool credential in the cookie value.

Server-side session may store:

- Visitor-provided name.
- Company.
- Role.
- Email if explicitly provided.
- Stated intent.
- Topics of interest.
- Short conversation summary.
- Consent flags.
- Gate state.
- Usage counters.
- Handoff eligibility.

Do not retain raw transcripts by default for the demo.

## Platform Assumptions

The assistant is expected to be a Runestack reference implementation:

- Freyr: agent runtime, admission, thread execution, streaming state, tool orchestration.
- Muninn: public assistant memory, visitor session summaries, consent state, retrieval context.
- Bifrost: controlled tools for site search, contact request, calendar availability, session context updates.
- Fenrir: backed LLM reasoning and synthesis.
- Mimir or site corpus: approved public facts from `nwalker.cc`.

## Portfolio v2.1 Decisions

The February v2 strategy remains directionally correct, but v2.1 updates it.

Key changes:

- `nwalker.cc` is still not a conventional blog, but it must include a citable authority corpus.
- The assistant demo is now a first-class proof artifact.
- The homepage must remain restrained and executive, not a product landing page.
- Personal, Ravenhelm, Runestack, Domain Intelligence, Artimetrics, Ravenmask, and other properties must remain distinct.

Recommended primary nav:

- Philosophy
- Enterprise
- Architecture
- Runestack
- Assistant
- Contact

Secondary resources:

- Definitions
- Frameworks
- Patterns
- Ecosystem
- Legal pages

## Dependency Chain For Implementation

1. Approve the v2.1 strategy as source of truth.
2. Update repo docs so v2.1 and the assistant PRD are discoverable.
3. Refine homepage:
   - Add `AI Governance & Enterprise Platforms` hero line.
   - Remove italic styling from `wrong`.
   - Make hero left-aligned on desktop.
   - Restore `What AI Did Not Collapse`.
   - Use the approved scars line.
   - Remove hardware-specific homepage language.
4. Simplify navigation:
   - Primary nav becomes Philosophy, Enterprise, Architecture, Runestack, Assistant, Contact.
   - Secondary resources move to footer/contextual navigation.
5. Clean up authority corpus:
   - Definitions, frameworks, and patterns should be citable and internally linked.
6. Build `/assistant` marketing page.
7. Build `/assistant/app` full-screen shell with mocked runtime panels.
8. Add session cookie foundation:
   - create/read/clear session.
   - visible session panel.
9. Add gate and admission model:
   - Turnstile-ready contract.
   - intent and consent step.
   - rate and budget model.
10. Add text-mode assistant MVP against approved static/public context.
11. Add meeting handoff flow.
12. Only then integrate real STT/TTS providers.
13. Add tests.
14. Deploy to staging through PR workflow.
15. Tag production only after staging review and approval.

Critical rule:

Do not touch real Deepgram or ElevenLabs voice integration until gate, session, budget, and server-minted token paths exist.

## Current Implementation Gaps Observed

Homepage currently renders:

- `Hero`
- `JudgmentGap`
- `EnterpriseProof`
- `PlatformThinking`
- `AccountableAI`
- `ContactSection`

It does not render `WhatAIDidNotCollapse`, even though that component exists.

Known deltas:

- Hero is centered on desktop; v2.1 wants left-aligned.
- Hero is missing `AI Governance & Enterprise Platforms`.
- Hero italicizes `wrong`; v2.1 says no italic drama.
- Infrastructure section mentions `10Gb, GPU-backed private AI fabric`; v2.1 says hardware specs should not be on the homepage.
- Current nav uses grouped dropdowns (`Thinking`, `Work`) plus direct links; v2.1 recommends a simpler primary nav.

## Files Created In This Workstream

### Executive Assistant Demo PRD

Path:

`/Users/nate/src/portfolio/nwalker.cc/.Codex/worktrees/assistant-demo-prd/docs/plans/2026-05-08-executive-assistant-demo-prd.md`

Purpose:

Defines product requirements for the assistant demo, including two-page product shape, gate, session, non-anthropomorphic assistant contract, platform responsibilities, MVP scope, and acceptance criteria.

### Portfolio v2.1 Strategic Refinement

Path:

`/Users/nate/src/portfolio/nwalker.cc/.Codex/worktrees/assistant-demo-prd/docs/plans/2026-05-08-portfolio-v2-1-strategic-refinement.md`

Purpose:

Updates the February portfolio recommendation with authority corpus, assistant demo, simplified navigation, page strategy, visual rules, tone rules, and current implementation deltas.

### This Handoff

Path:

`/Users/nate/src/portfolio/nwalker.cc/.Codex/worktrees/assistant-demo-prd/docs/plans/2026-05-08-assistant-demo-handoff.md`

Purpose:

Pickup context for the next session.

## Suggested Next Action

Review the three docs in the worktree.

If approved:

1. Stage and commit the docs on `docs/assistant-demo-prd`.
2. Open a PR for documentation only.
3. Start a separate implementation branch/worktree for homepage v2.1 refinement.

Do not mix documentation approval, homepage implementation, and assistant app implementation into one PR unless Nate explicitly requests it.
