# Current State

| Field | Value |
| --- | --- |
| Document ID | NWALKER-STATE-001 |
| Status | Controlled |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | Live status as of 2026-06-12 |
| Related Services | `nwalker.cc`, `staging.nwalker.cc`, GitHub Actions, AWS ECS, Cloudflare |
| Related ADRs | ADR-001 |
| Review Cadence | Monthly |
| Retention Rule | Retain for repository lifetime |
| Last Reviewed | 2026-06-12 |
| Next Review | 2026-07-12 |

## Live Surfaces

- Production: `https://nwalker.cc`
- Staging: `https://staging.nwalker.cc`
- Production release model: semver tag plus GitHub production environment approval.
- Staging release model: push to `develop`.

## Implemented Site Areas

- Home page and contact surface.
- Enterprise/project positioning.
- AI authority pages: definitions, frameworks, patterns, architecture, philosophy.
- Runestack page.
- Domain ecosystem page at `/ecosystem`.
- Legal pages for privacy, terms, cookies, and data requests.
- Sitemap and robots routes.
- Homepage aligned to v2.1 (identity line, What AI Did Not Collapse, scar line, analyst strip, no hardware language).
- Flat executive primary navigation (Philosophy / Enterprise / Architecture / Runestack / Contact).
- Enterprise page in five-section executive structure with expanded analyst recognition.
- Authority corpus detail pages: `/frameworks/architecting-certainty` and `/patterns/healthcare-voice-ai`.
- Synthetic monitoring and post-deploy smoke audits via GitHub Actions.

## Repository State

- Runtime is Next.js, not the older static nginx site described in legacy docs.
- Terraform, Docker, and GitHub Actions are present.
- Controlled documentation layout is now the standard for this repo.

## Domain Portfolio State

`docs/domain-portfolio.md` is the current boundary map. It preserves the decision to keep personal, company, product, methodology, and personal-project properties separate while sharing implementation standards.

## DNS State

`nwalker.cc` and `staging.nwalker.cc` use Cloudflare as part of this repo's current production architecture. Other domains are not in scope for Cloudflare migration from this repo.
