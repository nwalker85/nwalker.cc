# Implementation Plan

| Field | Value |
| --- | --- |
| Document ID | NWALKER-PLAN-001 |
| Status | Active |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | Current implementation checklist |
| Related Services | `nwalker.cc`, GitHub Actions, Cloudflare, Domain Intelligence Schema |
| Related ADRs | ADR-001 |
| Review Cadence | Weekly while active |
| Retention Rule | Retain until superseded by the next active plan |
| Last Reviewed | 2026-05-07 |
| Next Review | 2026-05-14 |

## Automated Work

- Deploy `v2.0.4` so `/ecosystem` lands on production.
- Verify `/ecosystem` and sitemap from the public internet.
- Add controlled documentation structure to this repo.
- Update GitHub Actions versions that trigger runtime deprecation warnings.
- Clone and prepare the Domain Intelligence Schema repo as the first separate property workspace.
- Add controlled docs and runbook coverage to the Domain Intelligence Schema repo.

## Human-Owned Work

- Update Cloudflare token permissions or create a new token with account-level zone create/edit access.
- Change nameservers at Squarespace during each domain migration.
- Approve production deployment gates.
- Decide final positioning and legal footer language for company and product domains.
- Decide whether `clutchtap.com` can expire after dependency review.

## Next Checklist

1. Finish `nwalker.cc` documentation and workflow PR.
2. Finish `domainintelligenceschema.org` documentation PR.
3. Create or update Cloudflare token and store it in 1Password.
4. Migrate `domainintelligenceschema.org` to Cloudflare.
5. Add monitors for `nwalker.cc`, `staging.nwalker.cc`, and `domainintelligenceschema.org`.
