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

## Existing DNS Check

Use this only for the existing `nwalker.cc` Cloudflare zone. Do not use this runbook as a domain-wide migration plan.

```bash
dig +short nwalker.cc
dig +short staging.nwalker.cc
```

If a production outage appears DNS-related, verify Cloudflare records for the existing `nwalker.cc` zone using a shell-scoped token from 1Password. Do not export tokens globally.

## Health Smoke Check

```bash
curl -I https://nwalker.cc/
curl -I https://nwalker.cc/ecosystem
curl -I https://staging.nwalker.cc/
curl -s https://nwalker.cc/sitemap.xml | rg 'ecosystem|definitions|frameworks|patterns'
```
