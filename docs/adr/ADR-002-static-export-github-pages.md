# ADR-002: Static Export On GitHub Pages

| Field | Value |
| --- | --- |
| Document ID | NWALKER-ADR-002 |
| Status | Accepted |
| Supersedes | NWALKER-ADR-001 (deploy model) |
| Owner | Nathan Walker |
| Domain | Personal authority site |
| Scope | Serving architecture, deployment model, health verification |
| Related Services | GitHub Actions, GitHub Pages, Cloudflare |
| Review Cadence | Quarterly |
| Last Reviewed | 2026-11-23 |
| Next Review | 2027-02-23 |

## Context

The site was served by a Dockerized Next.js standalone build on AWS ECS
Fargate behind an ALB, with Terraform-managed VPC, NAT gateway, ECR, and
CloudFront. That stack was a demonstration of production patterns in its own
right, and it was documented as such on `/architecture`.

On 2026-10-22 the underlying AWS resources were removed. Nothing replaced them.
The domain kept its DNS records, which pointed at a CloudFront distribution and
an Application Load Balancer that no longer existed. For roughly a month
`nwalker.cc` returned HTTP 530 to every visitor while Cloudflare reported
thousands of unique visitors, and the repository's `deploy.yml` continued to
describe an ECS deployment that could not succeed.

Two properties of the failure matter more than the outage itself:

1. **The page that documented the infrastructure was the page that proved the
   infrastructure worked.** A dead site publishing a confident architecture
   claim is worse than a site with no claim at all.
2. **The complexity was not load-bearing.** The application is a brochure with
   a handful of routes. The VPC, the load balancer, and the NAT gateway existed
   to demonstrate that those things could be built, not because four pages of
   prose required network isolation.

## Decision

Serve the site as a **static export published to GitHub Pages**.

- `next.config.ts` sets `output: "export"` and `trailingSlash: true`.
- `deploy.yml` runs lint, the unit suite, and a full export on every push and
  pull request, asserts the expected routes are present in `out/`, then
  publishes the artifact with `actions/deploy-pages`.
- Response headers (HSTS, CSP, `X-Content-Type-Options`) move to the Cloudflare
  edge, because `headers()` is unsupported under `output: "export"`.
- The `/health` route is deleted. A static site has no runtime to report on;
  `synthetic-health.yml` probes real routes instead.
- `/architecture` is rewritten to describe the delivery model that actually
  serves the page, and to say plainly where the platform complexity went.

The `infra/` Terraform and the `Dockerfile` remain in the repository as the
record of the earlier deployment. They are not applied by any workflow.

## Consequences

- **There is no origin.** Power loss, host failure, and control-plane errors in
  the private estate cannot take the front door down.
- **There is no runtime cost.** The earlier stack's dominant charges (NAT
  gateway, ALB) are gone.
- **Deploy is merge.** The artifact is the compiled source, so the thing that
  was reviewed is the thing that is served; rollback is a revert.
- **No server-side behaviour is available.** No request-time rendering, no
  dynamic headers, no `/health`, no per-request logic. Form submissions must
  point at a static-friendly endpoint. If a future feature requires a server,
  it does not belong on this host.
- **The infrastructure demonstration is retired from this surface.** It is not
  deleted from the record; it is relocated to the estate, where the complexity
  pays for itself. The claim on `/architecture` is now narrower and true.
- **An empty essay corpus is a supported build state**, because an export that
  fails on zero params is a self-inflicted outage waiting for the first time
  the corpus is cleared.

## Alternatives considered

- **Restore the ECS stack.** Makes the old claim true again. Rejected: it costs
  money to re-establish an origin this site does not need, and it reinstates the
  exact fragility that produced a month of 530s.
- **Keep Next.js server rendering on the private estate.** Rejected for the
  marketing surface: a front door that shares fate with the homelab is not a
  front door.
- **Delete `/architecture`.** Rejected: the work is real, it just needs to
  describe the right system.
