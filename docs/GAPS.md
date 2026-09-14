# Gaps

| Field | Value |
| --- | --- |
| Document ID | NWALKER-GAPS-001 |
| Status | Controlled |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | Known missing pieces and risks |
| Related Services | `nwalker.cc`, `staging.nwalker.cc`, GitHub Actions, AWS ECS, Cloudflare for existing `nwalker.cc` DNS |
| Related ADRs | ADR-001 |
| Review Cadence | Monthly |
| Retention Rule | Retain until superseded by resolved implementation evidence |
| Last Reviewed | 2026-06-12 |
| Next Review | 2026-07-12 |

## High Priority

- The homepage is close but not fully aligned to the final strategic refinement recommendations.
- Primary navigation is still broader than the final executive structure.

## Medium Priority

- Add richer examples and FAQ sections to AI authority pages when they support `nwalker.cc` credibility.
- Add a concise health/runbook section for production verification.
- Keep adjacent-domain plans out of the active `nwalker.cc` checklist unless explicitly reopened.
- Normalize GitHub Actions action versions as ecosystem warnings emerge.

## Low Priority

- Decide later whether adjacent personal domains need their own workstreams.
- Let unrelated domain decisions stay outside this repo's active health checklist.

## Resolved

- 2026-06: Synthetic monitoring covers `nwalker.cc` and `staging.nwalker.cc` every 30 minutes
  with GitHub-issue notification evidence (`synthetic-health.yml`); post-deploy smoke audits
  run in the deploy pipeline.
