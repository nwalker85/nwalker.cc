# Product Requirements

| Field | Value |
| --- | --- |
| Document ID | NWALKER-PRD-001 |
| Status | Controlled |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | `nwalker.cc` portfolio, AI authority corpus, and ecosystem map |
| Related Services | `nwalker.cc`, `staging.nwalker.cc` |
| Related ADRs | ADR-001 |
| Review Cadence | Monthly while portfolio v2 is active |
| Retention Rule | Retain for repository lifetime |
| Last Reviewed | 2026-05-07 |
| Next Review | 2026-06-07 |

## Problem

`nwalker.cc` needs to function as Nathan Walker's canonical personal authority site, not merely a portfolio. It must explain the work, publish citable AI governance material, and cross-link separate business, product, methodology, and personal-project domains without collapsing them into one brand.

## Goals

- Publish a credible personal home for AI governance, enterprise platforms, and accountable agent systems.
- Make `/definitions`, `/frameworks`, `/patterns`, and `/ecosystem` indexable, structured, and useful as citable units.
- Keep personal identity separate from Ravenhelm company properties, Runestack product properties, and methodology/spec sites.
- Preserve a predictable staging-to-production deployment path.
- Maintain enough documentation for another operator to safely deploy, debug, and extend the site.

## Non-Goals

- Host Ravenhelm company, Runestack product, Domain Intelligence Schema, or Artimetrics content inside this repo.
- Replace external docs/spec repos.
- Store secrets or registrar credentials.
- Bypass PR review for normal code and documentation changes.

## MVP Scope

- Next.js production site at `https://nwalker.cc`.
- Staging site at `https://staging.nwalker.cc`.
- AI authority corpus starter pages.
- Domain ecosystem map.
- Schema.org metadata for the person, site, and citable content.
- GitHub Actions pipeline for validate, build, staging deploy, and tag-gated production deploy.
- Controlled documentation layout matching Ravenhelm repo standards.

## Success Signals

- `/ecosystem` returns `200` in production and appears in the sitemap.
- AI authority pages return `200`, expose canonical URLs, and are internally linked.
- Deployment status is visible in GitHub Actions and production deploys require environment approval.
- Domain portfolio work is traceable through docs and separate repos.
