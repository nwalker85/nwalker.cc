# Executive Assistant Demo PRD

| Field | Value |
| --- | --- |
| Document ID | NWALKER-PRD-ASSISTANT-DEMO-001 |
| Status | Draft |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | Demo product requirements for the `nwalker.cc` portfolio assistant |
| Related Services | `nwalker.cc`, `staging.nwalker.cc`, Freyr, Muninn, Bifrost, Fenrir, Mimir/site corpus |
| Related ADRs | ADR-001 |
| Review Cadence | Weekly while demo is under active design |
| Retention Rule | Retain until superseded by an implementation PRD or production service design |
| Last Reviewed | 2026-05-08 |
| Next Review | 2026-05-15 |

## Summary

`nwalker.cc` needs a working portfolio demo that proves Nathan Walker can design, explain, and operate accountable AI systems. The demo is a bounded AI assistant for Nathan's public portfolio. It answers questions from approved public context, explains Nathan's work and architecture, and prepares meeting handoffs when a visitor has a credible reason to engage.

The assistant must not be positioned as a character, friend, employee, or digital Nathan. It is a controlled assistant interface for public context, visitor intake, and meeting preparation.

## Problem

The current portfolio risks reading like a resume plus written authority content. It needs an interactive proof point that demonstrates the same architecture and governance principles the site describes. A generic chat widget would weaken the brand and create cost, trust, and safety risks. A credible demo must show usefulness, boundaries, operating state, and cost controls.

## Goals

- Provide a real interactive demo on `nwalker.cc` that helps serious visitors understand Nathan's work.
- Split the experience into a public marketing page and a full-screen assistant app.
- Gate expensive voice capabilities so bots cannot casually run up Deepgram or ElevenLabs costs.
- Support a light server-backed visitor session so the assistant can retain user-provided context across page reloads and return visits.
- Keep the assistant non-anthropomorphic, precise, and transparent about its limits.
- Make the runtime inspectable through visible activity, tools, and health information.
- Use the assistant as a reference implementation for the Runestack platform pattern: Freyr agent, Muninn memory, Bifrost tools, Fenrir-backed LLM, and approved site corpus.

## Non-Goals

- Do not impersonate Nathan or claim to speak with Nathan's personal judgment.
- Do not create a Jarvis clone or named AI character.
- Do not expose provider API keys or long-lived voice tokens in the browser.
- Do not allow anonymous unlimited voice, TTS, STT, or tool calls.
- Do not build a full account system for the initial demo.
- Do not merge Ravenhelm company, Runestack product, or other property content into `nwalker.cc` beyond approved cross-linking and explanatory context.
- Do not automate confirmed meeting booking without Nathan-owned approval rules.

## Primary Users

### Enterprise Evaluator

An executive, operator, or architect evaluating whether Nathan can help with AI governance, enterprise architecture, accountable agent systems, or platform strategy.

### Technical Visitor

An engineer, platform lead, or technically curious visitor who wants to understand Runestack, Freyr, Muninn, Bifrost, Fenrir, and the architecture behind the demo.

### Recruiter Or Hiring Stakeholder

A visitor trying to understand Nathan's background, fit, prior work, and whether a conversation is worth scheduling.

### Nathan

The operator and subject of the portfolio. Nathan needs useful meeting context, cost control, abuse resistance, and a public experience that does not misrepresent him.

## Product Shape

### Page 1: Marketing Page

Route: `/assistant`

Purpose:

- Explain what the assistant can do.
- Establish boundaries and trust.
- Present the demo as a portfolio capability, not a toy.
- Launch the full-screen assistant app.

Required content:

- Short explanation of the assistant.
- Disclosure that it answers from approved public context.
- Examples of useful questions.
- Explanation of meeting handoff.
- Lightweight preview of the assistant state.
- Primary CTA: `Launch assistant`.

Design requirements:

- Use the `nwalker.cc` palette and typography.
- Remain editorial and restrained.
- Do not expose the full operator dashboard on the marketing page.
- Do not start voice, microphone capture, STT, or TTS from this page.

### Page 2: Full-Screen Assistant App

Route: `/assistant/app`

Purpose:

- Provide the actual text and voice assistant experience.
- Show full activity, tools, health, session, and source state.
- Make the demo feel useful and inspectable without becoming cluttered.

Required interface regions:

- Header with assistant title, session status, and exit link back to portfolio.
- Gate/intake state before paid capabilities are enabled.
- Primary conversation area with transcript and response state.
- Voice control state with explicit start/stop controls.
- Text input fallback.
- Activity panel for logs, thinking state, reasoning summary, STT calls, TTS calls, and tool events.
- Tools panel for available and recently used Bifrost tools.
- Health panel for Freyr, Muninn, Fenrir, Bifrost, voice provider, and session budget state.
- Session panel for visitor-provided context, consent, and clear-session controls.
- Source/context panel showing what public context informed an answer.

## Assistant Interaction Contract

The assistant is an interface, not a persona.

It should:

- Identify itself as an AI assistant for Nathan Walker's public portfolio.
- Answer from approved public context.
- Label uncertainty.
- Ask clarifying questions when the visitor's intent is unclear.
- Explain when a question needs Nathan directly.
- Prepare a meeting handoff when the visitor provides enough context.
- Show operational state in the full-screen app.
- Respect user-provided session context.

It should not:

- Claim to be Nathan.
- Claim to know Nathan personally.
- Use theatrical, overly human, or roleplay language.
- Pretend to have personal feelings, preferences, or lived memory.
- Guarantee meeting availability.
- Reveal private context, secrets, internal-only notes, or non-public memory.
- Continue paid voice work after budget or admission checks fail.

Preferred language:

- "I am an AI assistant for Nathan Walker's public portfolio."
- "The available public context says..."
- "That question needs Nathan directly."
- "I can prepare a handoff for Nathan."
- "This session includes the context you provided..."

Avoided language:

- "I know Nathan well."
- "I would love to meet you."
- "Let me think like Nathan."
- "I remember you" unless referring explicitly to this browser session.

## Gate And Abuse Controls

The demo must include a layered admission system before paid voice capabilities are enabled.

### Gate Requirements

- Marketing page remains public and indexable.
- Full-screen app starts in a gated state.
- Cloudflare Turnstile or equivalent bot challenge is required before starting a paid voice session.
- User must acknowledge that the assistant is AI and answers from public context.
- User must choose or enter a high-level intent before voice is enabled.
- Text mode may be available before voice, but still subject to rate limits.
- Returning users with a valid session cookie still require fresh checks before paid voice is minted.

### Cost Controls

Each session must enforce:

- Maximum one active voice session per visitor session.
- Maximum voice duration per session.
- Maximum STT seconds per session.
- Maximum TTS characters per session.
- Maximum tool calls per session.
- Cooldown after session end.
- Daily spend or usage ceilings for the assistant service.
- Dedicated provider keys or scoped tokens for this demo.

### Token Handling

- Provider API keys must never be exposed to the browser.
- Browser voice access must use short-lived server-minted tokens.
- Voice tokens must be minted only after gate, rate, budget, and risk checks pass.
- Failed checks should degrade to text or explain the limit without exposing implementation details.

## Light Visitor Session

The demo should support a light user session without requiring accounts.

### Session Model

Use an opaque server-backed session cookie:

- Cookie name: `nwalker_assistant_session` or equivalent.
- Cookie value: random opaque identifier only.
- Cookie flags: `HttpOnly`, `Secure`, `SameSite=Lax`.
- Cookie should be signed or backed by a signed session mechanism.
- Cookie should not contain PII, transcript text, provider tokens, or tool credentials.
- Suggested expiration: 30 days.

### Stored Session Data

Server-side session data may include:

- Visitor-provided name.
- Company.
- Role.
- Email, if explicitly provided for handoff.
- Stated intent.
- Topics of interest.
- Short conversation summary.
- Explicit consent flags.
- Gate completion state.
- Voice usage counters.
- Tool usage counters.
- Meeting handoff eligibility.
- Last interaction timestamp.

Raw transcripts should not be retained by default for the demo. Store structured user-provided facts and compact summaries unless Nathan explicitly approves transcript retention.

### Session UX

The app should include a visible session panel with:

- Current session state: anonymous, named, or handoff-ready.
- "Add name/company" control.
- "Remember this visit" explanation.
- "Clear session" control.
- "Continue previous context" state when a returning session exists.

## Meeting Handoff

The assistant may prepare a meeting request but must not imply confirmed scheduling without policy support.

Required handoff fields:

- Name.
- Email.
- Company or organization.
- Role or context.
- Reason for meeting.
- Relevant workstream or topic.
- Preferred time window.
- Consent to send the request to Nathan.

The assistant should summarize the handoff before submission and require explicit user confirmation.

## Platform Responsibilities

### Freyr

Owns agent runtime admission, thread execution, streaming state, tool orchestration, and session accountability.

### Muninn

Stores approved assistant memory, visitor session summaries, consent state, and retrieval context. Must separate public assistant memory from private or internal memory.

### Bifrost

Provides controlled tools such as site search, meeting handoff, contact request, calendar availability checks, and session context updates.

### Fenrir

Provides backed LLM reasoning and synthesis. Responses must be constrained by approved context and assistant policy.

### Mimir Or Site Corpus

Provides canonical public context from `nwalker.cc`, approved architecture pages, definitions, ecosystem pages, and curated biography.

## Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-001 | `/assistant` explains the assistant and launches the full-screen app. |
| FR-002 | `/assistant/app` renders a full-screen assistant interface. |
| FR-003 | App users must pass gate checks before paid voice begins. |
| FR-004 | App supports text fallback independent of voice availability. |
| FR-005 | App displays activity, tools, health, session, and source/context panels. |
| FR-006 | Assistant answers from approved public context. |
| FR-007 | Assistant refuses or defers questions requiring Nathan directly. |
| FR-008 | Assistant can collect meeting handoff information and request confirmation. |
| FR-009 | Server-backed session cookie persists user-provided context across return visits. |
| FR-010 | User can clear session context. |
| FR-011 | Voice tokens are short-lived and server-minted after admission checks. |
| FR-012 | Usage counters enforce session and daily budgets. |
| FR-013 | UI exposes degraded states when voice, tools, or model path are unavailable. |

## Non-Functional Requirements

| ID | Requirement |
| --- | --- |
| NFR-001 | No secrets, provider keys, or durable tool credentials may be sent to the browser. |
| NFR-002 | The marketing page must remain performant, indexable, and usable without client-side voice code. |
| NFR-003 | The full-screen app must be responsive on mobile and desktop. |
| NFR-004 | The app must clearly distinguish public context from visitor-provided session context. |
| NFR-005 | The assistant must preserve `nwalker.cc` visual language and avoid gimmicky chatbot styling. |
| NFR-006 | Every paid-provider path must have an application-level budget check before provider invocation. |
| NFR-007 | Errors must degrade gracefully to text, retry, or human handoff without leaking internals. |
| NFR-008 | Logging must support debugging cost, gate, tool, and response issues. |

## MVP Scope

MVP includes:

- `/assistant` marketing page.
- `/assistant/app` full-screen app mock implementation.
- Gate UI with Turnstile-ready backend contract.
- Text-mode assistant flow against approved static/public context.
- Voice UI states with server-token contract, even if provider integration is initially stubbed.
- Visible activity, tools, health, session, and source/context panels.
- Opaque session cookie and server-side session store abstraction.
- Meeting handoff collection flow that produces a reviewed handoff payload.
- Usage budget model and visible degraded states.

MVP may stub:

- Actual provider-backed voice.
- Real calendar availability.
- Full Runestack deployment.
- Full Muninn persistence.

MVP must not stub:

- The security boundary between browser and provider keys.
- Admission checks before voice.
- Clear assistant disclosure and non-impersonation behavior.
- Session clear behavior.

## Acceptance Criteria

- A visitor can open `/assistant`, understand the assistant's purpose, and launch `/assistant/app`.
- `/assistant/app` starts gated, not in an open paid voice session.
- A visitor can pass the gate, provide intent, and begin a text conversation.
- Voice controls remain disabled until admission succeeds.
- Activity panel shows representative logs, thinking state, reasoning summary, STT/TTS calls, and tool events.
- Tools panel shows available Bifrost tools and recent use state.
- Health panel shows Freyr, Muninn, Fenrir, Bifrost, voice provider, and budget state.
- Session panel allows user-provided name/company/intent and supports clearing session data.
- Assistant language never implies it is Nathan or a human representative.
- Meeting handoff flow collects required fields and asks for confirmation before submission.
- Reloading the app with a valid session cookie restores allowed session context.
- Clearing the session removes visitor-provided context from the UI and server store.
- Abuse controls prevent repeated anonymous voice starts beyond configured limits.

## Open Questions

- Should the text mode also require Turnstile, or should Turnstile be required only before paid voice starts?
- What exact first-session budget should be used for STT seconds, TTS characters, and LLM tokens?
- Should returning sessions require fresh Turnstile after 24 hours, after each browser restart, or before each voice session?
- Which session store should be used for the first implementation: Freyr-native storage, Muninn, Redis, database table, or Cloudflare Durable Object?
- Should the meeting handoff create an internal email, GitHub issue, Linear issue, or Bifrost-managed request record?
- Which public corpus should be considered authoritative at launch?

## Recommended First Implementation Slice

Build a static-but-believable demo first:

1. Add `/assistant` marketing page.
2. Add `/assistant/app` full-screen UI.
3. Implement the gate and session UI states without provider calls.
4. Implement server-side session cookie create/read/clear.
5. Add text-only public-context responses using a constrained local fixture.
6. Add fake but realistic activity/tools/health streams.
7. Wire real admission and budget checks before integrating voice providers.

This sequence proves the product shape and safety model before any paid voice path is exposed.
