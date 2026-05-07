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

## Local Development

```bash
# Install dependencies
pnpm install

# Run locally
pnpm dev

# Visit http://localhost:3000
```

## Verification

```bash
pnpm lint
pnpm test
pnpm build
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
