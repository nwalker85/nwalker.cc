# Current State

| Field | Value |
| --- | --- |
| Document ID | NWALKER-STATE-001 |
| Status | Controlled |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | Live status as of 2026-05-07 |
| Related Services | `nwalker.cc`, `staging.nwalker.cc`, GitHub Actions, AWS ECS, Cloudflare |
| Related ADRs | ADR-001 |
| Review Cadence | Monthly |
| Retention Rule | Retain for repository lifetime |
| Last Reviewed | 2026-05-07 |
| Next Review | 2026-06-07 |

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

## Repository State

- Runtime is Next.js, not the older static nginx site described in legacy docs.
- Terraform, Docker, and GitHub Actions are present.
- Controlled documentation layout is now the standard for this repo.

## Domain Portfolio State

`docs/domain-portfolio.md` is the current boundary map. It preserves the decision to keep personal, company, product, methodology, and personal-project properties separate while sharing implementation standards.

## Cloudflare State

The available `Cloudflare Manage DNS` token can read existing zones and manage DNS for existing zones, but zone creation is blocked by missing account-level `zone.create` permission.
