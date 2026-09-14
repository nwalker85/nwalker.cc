# ADR-001: GitHub Develop To Staging, Tag To Production

| Field | Value |
| --- | --- |
| Document ID | NWALKER-ADR-001 |
| Status | Accepted |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | Deployment branch and release model |
| Related Services | GitHub Actions, AWS ECS, Cloudflare |
| Related ADRs | None |
| Review Cadence | Quarterly |
| Retention Rule | Retain permanently |
| Last Reviewed | 2026-05-07 |
| Next Review | 2026-08-07 |

## Context

The portfolio needs a low-friction staging path and an explicit production gate. The repo also needs to avoid direct pushes to long-lived branches during normal development.

## Decision

Use `develop` as the staging integration branch and semver tags (`v*.*.*`) as production release triggers. Production deploys require GitHub environment approval.

## Consequences

- Staging can update automatically after PR merge to `develop`.
- Production requires an intentional tag and approval.
- Hotfixes should still move through a branch and PR before tag promotion unless an incident response explicitly overrides the normal process.
- Production deploy evidence lives in GitHub Actions and public smoke checks.
