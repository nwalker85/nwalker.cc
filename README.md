# nwalker.cc

Personal portfolio site for Nathan Walker.

**Live:** [nwalker.cc](https://nwalker.cc)

## Stack

| Layer | Technology |
|-------|-----------|
| **Site** | Next.js 16 app router |
| **Server** | Dockerized Next.js standalone output |
| **Infra** | Terraform (AWS ECS Fargate, ECR, ALB) |
| **CI/CD** | GitHub Actions (OIDC auth, environment protection) |
| **DNS/CDN** | Cloudflare |

## Architecture

```
Cloudflare ─── DNS/CDN ──→ ALB (TLS 1.3) ──→ ECS Fargate (private subnets)
                                                  │
GitHub Actions ─── build ──→ ECR ─────────────────┘
```

See [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md) for the documentation map and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the controlled architecture.

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

A **git submodule was considered and rejected**: deploy.yml reuses an already
built `:<sha>` ECR image by the site repo's own commit SHA when cutting a
production tag, so the corpus must be pinned by content and fetched as plain
build input, not by a submodule pointer that changes the site repo's tree
(and therefore its SHA) independently of any real site change.

Note: because images are keyed to the site repo's commit SHA, a
`nwalker-cc-published` update alone does not trigger a new staging build —
staging only re-fetches `main` on the next push to this repo. A tagged
production build always pins `PUBLISHED_REF` explicitly rather than floating
on `main`.

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

**Staging** (automatic on push to `develop`):
- Builds Docker image, pushes to ECR
- Terraform applies staging infrastructure
- Updates ECS service → https://staging.nwalker.cc

**Production** (on version tag with manual approval):
- Same pipeline, production environment
- Protected by GitHub environment approval → https://nwalker.cc

## Infrastructure

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
