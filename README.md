# nwalker.cc

Personal portfolio site for Nathan Walker.

**Live:** [nwalker.cc](https://nwalker.cc)

## Stack

| Layer | Technology |
|-------|-----------|
| **Site** | Next.js 16 app router, statically exported (`output: "export"`) |
| **Serving** | GitHub Pages CDN — no origin server, no container |
| **CI/CD** | GitHub Actions — lint, tests, export, deploy on merge |
| **DNS/CDN** | Cloudflare (proxy, TLS, response headers) |

## Architecture

```
GitHub Actions ── build ──→ out/ (static HTML) ──→ GitHub Pages CDN
                                                        │
Cloudflare ─── DNS ──→ custom domain ────────────────────┘
```

There is no origin. `next build` emits plain HTML into `out/`, the workflow
publishes that artifact, and the CDN serves it. Response headers (HSTS, CSP)
are applied at the Cloudflare edge because `headers()` is unsupported under
`output: "export"`.

The `infra/` Terraform and `Dockerfile` remain in the repository as the record
of the earlier ECS/Fargate deployment. They are no longer used to serve the
site: the app cost little, the load balancer and NAT gateway cost the most,
and any control-plane mistake took the entire front door offline.

See [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md) for the documentation map and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the controlled architecture.

## Build

```bash
pnpm install
pnpm build     # fetches published corpus, exports to out/
pnpm test      # unit suite
pnpm lint
pnpm tokens    # regenerate src/styles/tokens.css from tokens/*.yaml
```

`src/styles/tokens.css` is committed, so the build does not depend on
`token-forge` (a local file: dependency). Run `pnpm tokens` when the token
source changes and commit the result.

## Content

The site does not hold draft prose. `/writing/<slug>` pages for essays other
than the hand-written ones (`the-beep`, `the-row`, `nothing-scripts-the-eyebrows`)
are generated at build time from the public
[`nwalker85/nwalker-cc-published`](https://github.com/nwalker85/nwalker-cc-published)
repo — markdown with frontmatter, one canonical file per piece.

`scripts/fetch-published.sh` shallow-clones that repo into `content/published/`
(gitignored) before `next build` runs, both locally (`pnpm build` runs
`content:fetch` first) and in the Docker builder stage. It records the
fetched commit to `content/published/.source-sha` and exits non-zero if the
clone fails.

```bash
# Fetch the corpus without building
pnpm run content:fetch

# Pin to a tag instead of main (e.g. for a reproducible production build)
PUBLISHED_REF=v1.4.0 pnpm run content:fetch
docker build --build-arg PUBLISHED_REF=v1.4.0 .
```

A published essay's frontmatter is read by `src/lib/content.ts`
(`gray-matter` + `remark`/`rehype`, sanitized, no MDX): `title` is required;
`slug`, `date`, `kind`, `description`, `substack_url`, `canonical_url`, and
`og_image` are all optional and tolerated when absent. An entry is treated as
published when its `publish_eligible` frontmatter field is `true` or absent
(Bifröst's promotion Action only ever lands eligible files in the published
repo, so an absent field means an older seed) — explicitly `false` excludes
it. A hand-written `src/app/writing/<slug>/page.tsx` directory always takes
routing precedence over a corpus entry with the same slug.

A **git submodule was considered and rejected**: the corpus must be pinned by
content and fetched as a plain build input, not by a submodule pointer that
changes the site repo's tree (and therefore its commit) independently of any
real site change. The same reasoning now covers deploys: the exported artifact
is keyed to the commit that produced it.

An empty corpus is a supported state. `generateStaticParams` emits a single
placeholder slug (`__no-published-essays`) that renders an honest empty state,
because Next 16 reports a zero-param dynamic route as a missing export and
fails the build.

## Local Development

```bash
# Install dependencies
pnpm install

# Fetch the published-content corpus (see Content, above)
pnpm run content:fetch

# Run locally
pnpm dev

# Visit http://localhost:3000
```

## Verification

```bash
pnpm lint
pnpm test
pnpm build   # runs content:fetch, then next build
```

## Deployment

**Every push** to `develop` or `main`, and every pull request:

- lint, unit suite, and a full static export
- the workflow asserts `out/index.html` and `out/architecture/index.html` exist
  before it will publish anything

**Publish** (non-PR runs) uploads `out/` as the Pages artifact and deploys it.
Production is whatever `main` last exported; there is no separate promote step
and no artifact that can diverge from the source.

**Health** — `synthetic-health.yml` probes real routes on production every 30
minutes and opens a GitHub issue with the probe output when one fails. There is
no `/health` route: a static site has no runtime to report on, so a 200 from the
CDN proves nothing a page render doesn't prove better.

## Retired infrastructure

`infra/` is retained as the historical record of the ECS/Fargate deployment. It
is not applied by any workflow and no longer describes how this site is served.

```
infra/
├── bootstrap/     # One-time AWS account setup (ECR, S3 state bucket)
├── modules/       # Reusable Terraform modules (ECS, ALB, etc.)
└── envs/
    ├── staging/   # staging.nwalker.cc
    └── production/# nwalker.cc
```

## License

MIT
