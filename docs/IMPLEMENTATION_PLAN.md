# Implementation Plan

| Field | Value |
| --- | --- |
| Document ID | NWALKER-PLAN-001 |
| Status | Active |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | Current implementation checklist |
| Related Services | `nwalker.cc`, `staging.nwalker.cc`, GitHub Actions, AWS ECS, Cloudflare for existing `nwalker.cc` DNS |
| Related ADRs | ADR-001 |
| Review Cadence | Weekly while active |
| Retention Rule | Retain until superseded by the next active plan |
| Last Reviewed | 2026-06-12 |
| Next Review | 2026-06-19 |

## Automated Work

- Deploy `v2.0.4` so `/ecosystem` lands on production.
- Verify `/ecosystem` and sitemap from the public internet.
- Add controlled documentation structure to this repo.
- Update GitHub Actions versions that trigger runtime deprecation warnings.
- Keep `nwalker.cc` focused on health, completeness, and strategic refinement.
- Align homepage, navigation, architecture, enterprise, Runestack, and contact sections with the strategic refinement recommendations.

## Human-Owned Work

- Approve production deployment gates.
- Approve any material positioning changes that alter executive-market narrative.
- Decide whether off-site personal/domain properties need separate workstreams later.

## Next Checklist

1. ~~Remove stale domain-wide Cloudflare migration language.~~ Done (May 2026).
2. ~~Add health checks for `nwalker.cc` and `staging.nwalker.cc`.~~ Done — `synthetic-health.yml` + smoke jobs (June 2026).
3. ~~Implement the homepage refinement pass from the portfolio strategic recommendations.~~ Done — v2.1 deltas 1–6 (June 2026).
4. ~~Simplify primary navigation to the final executive structure.~~ Done (June 2026).
5. ~~Audit production after each deploy.~~ Automated — smoke jobs write to run summaries.
6. Nathan reviews `/frameworks/architecting-certainty` on staging (D3 publish gate) and confirms the 38% definition wording on `/enterprise`.
7. Regenerate `public/resume.pdf` with the corrected 38% metric before the production tag.
8. Tag `v2.1.0` for production after staging audit.
