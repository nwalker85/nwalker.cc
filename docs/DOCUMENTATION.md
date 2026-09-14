# Documentation Map

| Field | Value |
| --- | --- |
| Document ID | NWALKER-DOCS-001 |
| Status | Controlled |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | Documentation authority order for `nwalker.cc` |
| Related Services | `nwalker.cc`, `staging.nwalker.cc`, GitHub Actions, AWS ECS |
| Related ADRs | ADR-001 |
| Review Cadence | Monthly while domain portfolio work is active |
| Retention Rule | Retain for repository lifetime |
| Last Reviewed | 2026-05-07 |
| Next Review | 2026-06-07 |

## Authority Order

1. `README.md` is the operator entrypoint: what this repo is, how to run it, and how deployment works.
2. This file defines the documentation map and authority order.
3. `ARCHITECTURE.md` defines service boundaries, infrastructure, data, events, and dependencies.
4. `PRD.md` defines product requirements and MVP scope.
5. `CURRENT_STATE.md` records what exists now.
6. `GAPS.md` records open risks and missing pieces.
7. `ROADMAP.md` defines staged direction.
8. `IMPLEMENTATION_PLAN.md` defines the current build checklist.
9. `RUNBOOK.md` defines repeatable operator workflows.
10. `service-design/` defines service responsibilities, anti-responsibilities, interfaces, failure modes, and evidence.
11. `adr/` records durable decisions and supersession.

## Controlled Documents

| Document | Purpose |
| --- | --- |
| `PRD.md` | Public portfolio and authority-corpus requirements |
| `ARCHITECTURE.md` | Next.js, AWS, Cloudflare, and deployment architecture |
| `CURRENT_STATE.md` | Live production/staging status and known repos |
| `GAPS.md` | Risks around health, monitoring, positioning, docs, and domain-boundary drift |
| `ROADMAP.md` | Phased site and domain portfolio plan |
| `IMPLEMENTATION_PLAN.md` | Current execution checklist |
| `RUNBOOK.md` | Tag, deploy, existing `nwalker.cc` DNS, and verification procedures |
| `domain-portfolio.md` | Domain boundary policy |

## Naming Convention

Controlled documents use uppercase filenames. Historical lower-case architecture content has been superseded by `ARCHITECTURE.md`.
