# nwalker.cc

Personal portfolio site for Nathan Walker.

**Live:** [nwalker.cc](https://nwalker.cc)

## Stack

| Layer | Technology |
|-------|-----------|
| **Site** | Static HTML, CSS (no framework) |
| **Server** | nginx:alpine Docker image |
| **Infra** | Terraform (AWS ECS Fargate, ECR, ALB) |
| **CI/CD** | GitHub Actions (OIDC auth, environment protection) |
| **DNS/CDN** | Cloudflare |

## Architecture

```
GitHub Actions ─── build ──→ ECR ──→ ECS Fargate
                                        │
Cloudflare ─── DNS/CDN ──→ ALB ────────┘
```

## Local Development

```bash
# Build and run locally
docker build -t portfolio .
docker run -p 8080:80 portfolio

# Visit http://localhost:8080
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
