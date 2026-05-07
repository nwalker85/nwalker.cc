# Domain Portfolio Governance

This document separates Nathan Walker personal identity, Ravenhelm company identity, product surfaces, methodology/spec work, and personal projects. The operating rule is shared standards, separate sites: do not collapse personal, business, product, and camper domains into one runtime or brand.

## Architecture Decision

- Keep `nwalker.cc` as the personal authority hub.
- Build Ravenhelm company domains in Ravenhelm-owned repositories and deployments.
- Build Runestack product domains in Runestack product repositories and deployments.
- Build Domain Intelligence Schema and Artimetrics as citable methodology/spec properties.
- Use shared conventions for metadata, legal footers, analytics naming, uptime monitors, redirect rules, and content templates.
- Do not treat Cloudflare migration as a domain-portfolio objective. DNS and hosting stay where they are when a domain is already healthy and intentional.

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
| `domainintelligenceschema.ai` | Methodology alias | AI-oriented alias | 301 to `domainintelligenceschema.org` | High | Provider-level redirect rule |
| `artimetrics.ai` | Concept | Agent identification concept/spec | Canonical concept site | High | Definition, identity model, examples, DIS relationship |
| `artimetrics.org` | Concept alias | Reserved neutral namespace | Redirect or reserve until distinct role exists | Medium | Redirect decision |
| `ravenmask.ai` | Personal | Personal/lab identity | Canonical personal lab site | Medium | Lab positioning, projects index, public/private boundary |
| `ravenmask.net` | Personal alias | Protective alias | 301 to `ravenmask.ai` | Low | Provider-level redirect rule |
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
2. Keep `domainintelligenceschema.org` on its current healthy GitHub Pages setup.
3. Put immediate landing pages or redirects on active domains only when they are not already intentional.
4. Build `artimetrics.ai` as the next standalone authority concept when its positioning is ready.
5. Hold `agentropy` as an unowned concept until the naming and domain strategy are resolved.
6. Build Ravenhelm and Runestack public surfaces in their own repos when those workstreams are opened.

## DNS And Hosting Policy

- `nwalker.cc` uses Cloudflare today; keep that path healthy because it is part of this repo's production architecture.
- Other domains do not move to Cloudflare by default.
- `domainintelligenceschema.org` is explicitly healthy on GitHub Pages and should stay there unless a concrete operational reason appears.
- Redirects should be implemented at the current provider for each domain unless that provider cannot support the needed behavior.
- Add uptime checks for public canonical domains, but do not confuse monitoring with DNS migration.
