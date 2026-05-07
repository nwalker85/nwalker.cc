# Roadmap

| Field | Value |
| --- | --- |
| Document ID | NWALKER-ROADMAP-001 |
| Status | Controlled |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | Portfolio and domain portfolio roadmap |
| Related Services | `nwalker.cc`, `domainintelligenceschema.org`, Cloudflare |
| Related ADRs | ADR-001 |
| Review Cadence | Monthly |
| Retention Rule | Retain for repository lifetime |
| Last Reviewed | 2026-05-07 |
| Next Review | 2026-06-07 |

## Phase 1: Stabilize Personal Authority

- Keep `/ecosystem` live in production.
- Complete controlled documentation.
- Fix GitHub Actions warnings as action releases become available.
- Add smoke-test evidence to runbooks.

## Phase 2: Launch Separate Methodology Properties

- Treat `domainintelligenceschema.org` as the first separate property.
- Add controlled docs and operator runbooks to the DIS repo.
- Cross-link DIS from `nwalker.cc`.
- Prepare Artimetrics as the second methodology/concept property.

## Phase 3: Cloudflare Migration

- Update or create a Cloudflare token with zone create/edit and DNS edit permissions.
- Add/migrate priority zones.
- Preserve existing records before nameserver cutovers.
- Configure redirects, robots policy, TLS, and uptime checks.

## Phase 4: Business And Product Surfaces

- Build Ravenhelm company properties separately from personal identity.
- Build Runestack product properties separately from Ravenhelm and personal identity.
- Share documentation standards, deployment conventions, and observability expectations.
