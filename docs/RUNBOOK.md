# Runbook

| Field | Value |
| --- | --- |
| Document ID | NWALKER-RUNBOOK-001 |
| Status | Controlled |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | Operator workflows for build, deploy, DNS, and verification |
| Related Services | GitHub Actions, AWS ECS, Cloudflare, 1Password |
| Related ADRs | ADR-001 |
| Review Cadence | Monthly |
| Retention Rule | Retain for repository lifetime |
| Last Reviewed | 2026-05-07 |
| Next Review | 2026-06-07 |

## Local Verification

```bash
pnpm lint
pnpm test
pnpm build
```

## Deploy Staging

1. Open a PR against `develop`.
2. Wait for validation to pass.
3. Merge through GitHub.
4. Watch the deploy run:

```bash
gh run list --repo nwalker85/nwalker.cc --branch develop --limit 5
gh run watch <run-id> --repo nwalker85/nwalker.cc --exit-status
```

5. Smoke-test staging:

```bash
curl -I https://staging.nwalker.cc/
curl -I https://staging.nwalker.cc/ecosystem
```

## Deploy Production

1. Tag the commit from `develop`:

```bash
git tag vX.Y.Z <sha>
git push origin vX.Y.Z
```

2. Approve the GitHub `production` environment gate.
3. Watch the deploy run to completion.
4. Smoke-test production:

```bash
curl -I https://nwalker.cc/
curl -I https://nwalker.cc/ecosystem
curl -s https://nwalker.cc/sitemap.xml | rg 'ecosystem|definitions|frameworks|patterns'
```

## Cloudflare Token Check

Use a shell-scoped 1Password value. Do not export Cloudflare or 1Password tokens globally.

```bash
TOKEN="$(op item get 'Cloudflare Manage DNS' --vault ravenmask --fields credential --reveal)"
curl -s https://api.cloudflare.com/client/v4/user/tokens/verify \
  -H "Authorization: Bearer $TOKEN"
```

If zone creation fails with `com.cloudflare.api.account.zone.create`, update the token in Cloudflare with account-level zone create/edit permission before continuing.

## Cloudflare Zone Migration

1. Export current DNS records from the existing provider.
2. Add the zone in Cloudflare.
3. Recreate required records.
4. Configure redirects and canonical host rules.
5. Change nameservers at Squarespace.
6. Verify DNS, TLS, canonical tags, and redirects after propagation.
