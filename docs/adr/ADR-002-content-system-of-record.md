# ADR-002: Content System Of Record

| Field | Value |
| --- | --- |
| Document ID | NWALKER-ADR-002 |
| Status | Accepted |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | Content system of record, publishing pipeline, and editorial gates |
| Related Services | GitHub, Forgejo, Sveltia CMS, `@nwalker/token-forge`, n8n |
| Related ADRs | ADR-001 (branch and release model) |
| Review Cadence | Quarterly |
| Retention Rule | Retain permanently |
| Last Reviewed | 2026-08-22 |
| Next Review | 2026-11-18 |

## Context

The site has no content pipeline. `/writing` exists only on an unmerged branch,
and its one post is a hand-authored 234-line React component. Publishing a second
post means writing a second component.

Prior art matters here: the owner previously ran `walkerwire.com` on WordPress at
a 20k-follower scale. The failure modes were structural, not cosmetic — content in
a database that could not be diffed, no grep across the corpus, no review path,
and page structure owned by the CMS rather than the author. This decision exists
to not repeat that.

A launch on 2026-08-17 also produced four near-miss defects caught only by human
attention at the last moment: an unsupportable claim about the product's own
authentication model, an unsourceable claim about an incident, a stale image
contradicting its own caption, and a graphic containing family members' names.
All four are mechanically detectable.

## Decision

**1. Git is the system of record for published content.** No CMS database, no
vendor-hosted content. Content is markdown in a repository.

**2. Plain markdown, not MDX.** MDX is deferred until a post genuinely requires an
in-page component. Revisit trigger: the first piece that needs interactive content
inline rather than as a static export.

**3. Four persistent repositories for nwalker.cc, not one that changes visibility.**

| Repo | Forge | Visibility | Holds |
| --- | --- | --- | --- |
| site | GitHub | public | Next.js app, layout, renderers — no draft prose |
| drafts | Forgejo | private | all work in progress, folder per property |
| published | GitHub | public | only what was intended to be public |
| demos | GitHub | public | assistant exhibits — linked, not vendored into site |

Content is promoted from drafts to published. The site repo consumes published
corpus at build time. Nothing is unpublished by flipping a toggle, and the
public repository's history never contains material that was not meant to be read.

Bound names (Bragi Phase 1B): `nwalker85/nwalker.cc` (site),
`nate/web-estate-drafts` (drafts), `nwalker85/nwalker-cc-published` (published).

**4. Promotion is the ratification act.** A Forgejo Action opens a pull request
against the published repository, carrying the source commit SHA for provenance.
The owner's merge is the receipt that the content became canonical. The
distinction between draft and canon is therefore enforced by infrastructure
rather than asserted in frontmatter.

**5. The CMS points at drafts only.** Sveltia, editorial-workflow mode, one
pull request per post. The published repository is written by the promotion
Action and by nothing else.

**6. Editorial checks gate promotion.** On the promotion pull request:

- **Fail:** leak check (internal hostnames, paths, digests, tailnet addresses,
  key patterns), name check (allowlist), number check against a canonical source,
  link resolution.
- **Warn:** voice conformance against the measured corpus baseline, call-to-action
  detection, automated prose review.

**7. `@nwalker/token-forge` is the visual source of truth.** Properties consume
it; they do not fork tokens locally.

**8. n8n owns automation, not content.** Publish notification and cross-posting
run after promotion. n8n never stores or moves content.

## Consequences

- ADR-001's `develop`→staging and tag→production model is unchanged. Content pull
  requests ride the existing release path.
- Publishing requires a commit and a deploy rather than a web editor's publish
  button. This is accepted deliberately: it is the property that makes content
  reviewable, diffable, and greppable.
- The drafts repository can build to an authenticated preview, replacing the
  previous informal use of a spare domain as a staging surface.
- Phase 2 properties (`ravenhelm.ai`, `hrafngrima.com`, `ravenhelm.co`) inherit
  this doctrine unchanged. Each is its own implementation, not its own decision.
- The manifesto property additionally requires a status gate: unratified language
  must not render as canon. That requirement is a consequence of this ADR, not a
  separate decision.
- **`main` is stale and must be retired.** It sits 53 commits behind `develop`
  and is not the default branch, so any clone or tool assuming `main` receives a
  months-old tree.
- **Substack remains the distribution surface.** Canonical-URL migration is
  explicitly out of scope here and requires its own decision.
- **The Checkout Custody Standard was waived** for this work under an explicit
  break-glass authorization. Receipt and follow-up:
  `~/docs/30-projects/web-estate-restructure/BREAK-GLASS-2026-08-18-custody-waiver.md`.
  The waiver is scoped to this repository and this phase.

## Alternatives considered

- **MDX with a git-based CMS.** Rejected for now: the only content requiring
  components today is a single interactive graphic, and MDX is a superset that
  plain markdown can migrate into later without rework.
- **Obsidian as the authoring surface.** Rejected: a prior attempt did not hold,
  and it requires a desktop client, which fails the device-independence
  requirement.
- **Outline as the CMS.** Rejected: already self-hosted and API-capable, but not
  git-backed, which breaks decision 1.
- **HubSpot CMS for content.** Rejected: ADR-005 scopes HubSpot to contact intake.
  Extending it to content would place authored work inside a marketing CRM.
- **A single repository whose visibility changes on publication.** Rejected in
  favour of two persistent repositories: migration is a one-time event, whereas
  promotion is a durable workflow that leaves a receipt.
