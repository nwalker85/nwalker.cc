# Domain Portfolio Governance

This document separates Nathan Walker personal identity, Ravenhelm company identity, product surfaces, methodology/spec work, and personal projects. The operating rule is shared standards, separate sites: do not collapse personal, business, product, and camper domains into one runtime or brand.

## Architecture Decision

- Keep `nwalker.cc` as the personal authority hub.
- Build Ravenhelm company domains in Ravenhelm-owned repositories and deployments.
- Build Runestack product domains in Runestack product repositories and deployments.
- Build Domain Intelligence Schema and Artimetrics as citable methodology/spec properties.
- Use shared conventions for metadata, legal footers, analytics naming, Cloudflare configuration, uptime monitors, redirect rules, and content templates.
- Move DNS to Cloudflare where possible while preserving registrar ownership at Squarespace unless a transfer has a clear operational reason.

## Domain Matrix

| Domain | Boundary | Role | Live Policy | Priority | Next Content |
| --- | --- | --- | --- | --- | --- |
| `nwalker.cc` | Personal | Nathan Walker authority hub | Canonical public personal site | Critical | Ecosystem map, AI governance corpus, founder links |
| `ravenhelm.co` | Ravenhelm, LLC | Primary company domain | Canonical company site | Critical | Company positioning, operating principles, products, contact |
| `ravenhelm.ai` | Ravenhelm Consulting | Consulting series | Separate consulting property | High | Consulting thesis, offerings, engagement model |
| `ravenhelm.org` | Community | Public-good and community surface | Separate community site | Medium | Charter, resources, participation model |
| `ravenhelm.dev` | Ravenhelm, LLC | Prototype/homelab domain | Operational domain; noindex public surfaces by default | High | Prototype index, status links, access policy |
| `runestack.ai` | Product | Production Runestack domain | Canonical product site | Critical | Product promise, architecture overview, use cases |
| `runestack.dev` | Product | Runestack dev/staging domain | Operational/dev domain; noindex by default | High | Preview index, release notes, access policy |
| `domainintelligenceschema.org` | Methodology | Business-domain modeling methodology and schema | Canonical citable spec site | Critical | Definition, schema model, examples, FAQ, versioning |
| `domainintelligenceschema.ai` | Methodology alias | AI-oriented alias | 301 to `domainintelligenceschema.org` | High | Cloudflare redirect rule |
| `artimetrics.ai` | Concept | Agent identification concept/spec | Canonical concept site | High | Definition, identity model, examples, DIS relationship |
| `artimetrics.org` | Concept alias | Reserved neutral namespace | Redirect or reserve until distinct role exists | Medium | Redirect decision |
| `ravenmask.ai` | Personal | Personal/lab identity | Canonical personal lab site | Medium | Lab positioning, projects index, public/private boundary |
| `ravenmask.net` | Personal alias | Protective alias | 301 to `ravenmask.ai` | Low | Cloudflare redirect rule |
| `hrafngrima.com` | Personal alias | Alternative personal domain | Reserve or redirect after identity decision | Low | Redirect target decision |
| `theviking.ai` | Personal project | Camper domain | Separate personal project site | Medium | Camper identity, build notes, travel/log content |
| `theviking.tools` | Personal project | Camper tools adjunct | Verify ownership and renewal before building | Low | Ownership verification |
| `clutchtap.com` | Sunset | No current strategic role | Let expire unless dependency appears | Sunset | Dependency check before renewal |

## Immediate Live Standard

Every non-sunset domain should have one of these states:

1. `200` with an intentional landing page.
2. `301` to a canonical property.
3. `403` or authenticated access only for intentionally private operational surfaces.

No active domain should accidentally show registrar parking, stale Squarespace default content, or an unrelated personal page.

## Content Template

Each first page should include:

- Name and one-sentence definition.
- Ownership boundary.
- Audience.
- Current status.
- Relationship to adjacent domains.
- One next action.
- Canonical URL.
- Basic JSON-LD appropriate to the site role.
- Robots policy.

## Build Order

1. Publish this governance matrix and `nwalker.cc/ecosystem`.
2. Move DNS zones into Cloudflare or document exceptions.
3. Put immediate landing pages or redirects on all active domains.
4. Build `domainintelligenceschema.org` as the first standalone authority site.
5. Build `artimetrics.ai` as the second standalone authority site.
6. Hold `agentropy` as an unowned concept until the naming and domain strategy are resolved.
7. Build `ravenhelm.co` and `runestack.ai` as public business/product surfaces.

## Cloudflare Migration Checklist

- Current Cloudflare zones visible to the working token: `hrafngrima.com`, `nwalker.cc`, `ravenhelm.dev`, `theviking.ai`.
- Current token blocker: the available `Cloudflare Manage DNS` token can verify successfully and read/manage existing DNS zones, but it does not have `com.cloudflare.api.account.zone.create`, so it cannot add new zones.
- Token needed to continue automation: account-level zone create/edit access plus DNS edit access for the target account.
- Add each domain as a Cloudflare zone.
- Change nameservers at Squarespace.
- Recreate required DNS records before nameserver cutover.
- Configure redirects for alias domains.
- Configure `robots.txt` and AI crawler policy per domain role.
- Add uptime checks for public canonical domains.
- Validate `200`, `301`, TLS, canonical tags, and sitemap behavior after cutover.
