# Architecture

## Infrastructure Overview

```
                           ┌──────────────────────────────────────────────────────────┐
                           │                      Cloudflare                          │
                           │              DNS + CDN + DDoS Protection                 │
                           │                                                          │
                           │   nwalker.cc ──────────┐                                │
                           │   staging.nwalker.cc ───┤ CNAME → ALB                   │
                           └─────────────────────────┼────────────────────────────────┘
                                                     │
                           ┌─────────────────────────▼────────────────────────────────┐
                           │                   AWS  us-east-1                         │
                           │                                                          │
                           │  ┌────────────────── VPC (10.0.0.0/16) ───────────────┐ │
                           │  │                                                     │ │
                           │  │  ┌─── Public Subnets (3 AZs) ───────────────────┐  │ │
                           │  │  │                                               │  │ │
                           │  │  │  ┌─────────────────────────────────────────┐  │  │ │
                           │  │  │  │    Application Load Balancer (ALB)      │  │  │ │
                           │  │  │  │                                         │  │  │ │
                           │  │  │  │  :80  → 301 redirect → :443            │  │  │ │
                           │  │  │  │  :443 → TLS 1.3 (ACM cert)            │  │  │ │
                           │  │  │  │                                         │  │  │ │
                           │  │  │  │  Host: nwalker.cc ──→ prod target grp  │  │  │ │
                           │  │  │  │  Host: staging.*  ──→ stg target grp   │  │  │ │
                           │  │  │  └─────────────────────────────────────────┘  │  │ │
                           │  │  │                                               │  │ │
                           │  │  │  ┌──────────┐                                 │  │ │
                           │  │  │  │ NAT GW   │                                 │  │ │
                           │  │  │  └────┬─────┘                                 │  │ │
                           │  │  └───────┼───────────────────────────────────────┘  │ │
                           │  │          │                                          │ │
                           │  │  ┌───────▼── Private Subnets (3 AZs) ───────────┐  │ │
                           │  │  │                                               │  │ │
                           │  │  │  ┌──────────────────────────────────────┐     │  │ │
                           │  │  │  │      ECS Cluster (Fargate)           │     │  │ │
                           │  │  │  │                                      │     │  │ │
                           │  │  │  │  Production Service                  │     │  │ │
                           │  │  │  │  ├─ 2x tasks (on-demand)            │     │  │ │
                           │  │  │  │  ├─ 512 CPU / 1024 MB               │     │  │ │
                           │  │  │  │  ├─ circuit breaker + auto-rollback │     │  │ │
                           │  │  │  │  └─ nginx:alpine container          │     │  │ │
                           │  │  │  │                                      │     │  │ │
                           │  │  │  │  Staging Service                     │     │  │ │
                           │  │  │  │  ├─ 1x task (Fargate Spot)          │     │  │ │
                           │  │  │  │  ├─ 256 CPU / 512 MB                │     │  │ │
                           │  │  │  │  └─ nginx:alpine container          │     │  │ │
                           │  │  │  └──────────────────────────────────────┘     │  │ │
                           │  │  │                                               │  │ │
                           │  │  └───────────────────────────────────────────────┘  │ │
                           │  │                                                     │ │
                           │  └─────────────────────────────────────────────────────┘ │
                           │                                                          │
                           │  ┌── Supporting Services ──────────────────────────────┐ │
                           │  │                                                     │ │
                           │  │  ECR            S3 (state)      DynamoDB (locks)   │ │
                           │  │  portfolio-     terraform-      terraform-          │ │
                           │  │  website        state bucket    locks table         │ │
                           │  │                 (versioned,     (PAY_PER_REQUEST)   │ │
                           │  │                  KMS encrypted)                     │ │
                           │  │                                                     │ │
                           │  │  Secrets Manager     CloudWatch Logs                │ │
                           │  │  (per environment)   /ecs/portfolio/{env}           │ │
                           │  │                      (30 day retention)             │ │
                           │  │                                                     │ │
                           │  └─────────────────────────────────────────────────────┘ │
                           │                                                          │
                           └──────────────────────────────────────────────────────────┘
```

## CI/CD Pipeline

```
  ┌─────────┐     ┌──────────┐     ┌───────────┐     ┌──────────────┐     ┌──────────┐
  │  Push   │────→│ Validate │────→│   Build   │────→│   Terraform  │────→│  Deploy  │
  └─────────┘     └──────────┘     └───────────┘     └──────────────┘     └──────────┘
                   hadolint          Docker build      plan + apply         ECS service
                   terraform fmt     Push to ECR       (per environment)    update
                   terraform                                                wait stable
                   validate

  Triggers:
  ─────────
  PR to develop/main     → validate only
  Push to develop        → validate → build → terraform → deploy staging
  Tag v*.*.*             → validate → build → terraform → deploy production (manual gate)
```

### GitHub Actions with OIDC

The pipeline (`.github/workflows/deploy.yml`) uses GitHub's OpenID Connect integration to assume an AWS IAM role. No static AWS access keys are stored anywhere.

**Authentication flow:**
1. GitHub signs a JWT identifying the repository and workflow run
2. AWS validates the JWT against a preconfigured OIDC identity provider
3. STS issues temporary credentials scoped to the pipeline's IAM role
4. Credentials expire automatically when the job completes

**Pipeline jobs:**

| Job | Trigger | What it does |
|-----|---------|-------------|
| `validate` | All PRs and pushes | Hadolint Dockerfile lint, `terraform fmt -check`, `terraform validate` |
| `build` | Push only | Docker build (linux/amd64), push to ECR with commit SHA tag + `latest` |
| `deploy-staging` | Push to `develop` | Terraform apply (staging), ECS service update, wait for stability |
| `deploy-production` | Tag `v*.*.*` | Terraform apply (production), ECS service update with environment protection |

### Environment Promotion

Push to `develop` triggers automatic staging deployment. Production requires:
1. A semver tag (`v*.*.*`)
2. Manual approval via GitHub Environment protection rules

## Terraform Modules

```
infra/
├── bootstrap/          One-time setup: S3 state bucket, DynamoDB lock table
├── modules/
│   ├── vpc/            VPC, 3-AZ public/private subnets, IGW, NAT GW, route tables
│   ├── alb/            ALB, ACM cert, HTTPS listener, host-based routing, target groups
│   ├── ecs/            Fargate cluster, task definition, service, IAM roles, CloudWatch
│   ├── ecr/            Container registry, lifecycle policy (keep last 10 images)
│   └── secrets/        Secrets Manager per environment
└── envs/
    ├── staging/        Creates all shared infra (VPC, ALB, ECR) + staging ECS service
    └── production/     References staging state for shared infra + production ECS service
```

### Module Details

**`bootstrap/`** — Run once per AWS account. Creates the S3 bucket (versioned, KMS-encrypted) and DynamoDB table (PAY_PER_REQUEST) for Terraform remote state.

**`modules/vpc/`** — VPC with `10.0.0.0/16` CIDR. 3 public subnets + 3 private subnets across availability zones. Internet Gateway for public subnets, single NAT Gateway for private subnet outbound traffic. Route tables for each tier.

**`modules/alb/`** — Application Load Balancer in public subnets. ACM certificate for `nwalker.cc` and `*.nwalker.cc`. HTTPS listener with TLS 1.3 security policy. Host-based routing rules: `nwalker.cc` → production target group, `staging.nwalker.cc` → staging target group. HTTP listener redirects to HTTPS.

**`modules/ecs/`** — Fargate cluster, task definition (nginx:alpine), ECS service with desired count and capacity provider. IAM execution role (ECR pull, CloudWatch logs) and task role. CloudWatch log group with 30-day retention. Health check configuration against `/health` endpoint.

**`modules/ecr/`** — Container registry `portfolio-website`. Lifecycle policy retains the last 10 tagged images.

**`modules/secrets/`** — Secrets Manager entries per environment for any runtime configuration.

### Shared vs Per-Environment Resources

**Shared** (created by `envs/staging/`, referenced by `envs/production/` via remote state):
- VPC, subnets, route tables, NAT Gateway
- ALB, ACM certificate, HTTPS listener
- ECR repository
- ECS cluster

**Per-environment** (each env creates its own):
- ECS service and task definition
- ALB target group and listener rule
- Security groups
- CloudWatch log group
- Secrets Manager entries

### State Management

- **Backend:** S3 bucket with versioning and KMS encryption
- **Locking:** DynamoDB table prevents concurrent `terraform apply`
- **Cross-env references:** Production reads staging's state via `terraform_remote_state` data source to get shared resource IDs (VPC, ALB, ECR, cluster)

## Security

| Layer | Implementation |
|-------|---------------|
| **DNS/CDN** | Cloudflare proxy, DDoS protection, origin IP hidden |
| **TLS** | ACM certificate, TLS 1.3 policy (`ELBSecurityPolicy-TLS13-1-2-2021-06`) |
| **Network** | VPC isolation, private subnets for tasks, security group least-privilege |
| **HTTP** | `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `server_tokens off` |
| **Container** | nginx:alpine (minimal attack surface), health checks, no SSH |
| **State** | S3 versioning, KMS encryption, DynamoDB locking |
| **CI/CD** | GitHub OIDC (no static AWS keys), environment protection rules |

### Network Topology

- **Public subnets:** ALB, NAT Gateway. Internet-facing.
- **Private subnets:** ECS Fargate tasks. No public IPs. Outbound via NAT Gateway only.
- **Security groups:** ALB allows inbound 80/443 from `0.0.0.0/0`. ECS tasks allow inbound only from the ALB security group.

## Environment Comparison

| Dimension | Staging | Production |
|-----------|---------|------------|
| Domain | staging.nwalker.cc | nwalker.cc |
| Capacity provider | Fargate Spot | Fargate (on-demand) |
| Task count | 1 | 2 |
| CPU / Memory | 256 / 512 MB | 512 / 1024 MB |
| Deploy trigger | Push to `develop` | Tag `v*.*.*` + manual approval |
| Circuit breaker | No | Yes (auto-rollback on failure) |
| Cost | ~$1.50/month | ~$9/month |

## Cost Optimization

- Staging runs on **Fargate Spot** (up to 70% savings)
- Production runs on **on-demand** for reliability
- Single NAT Gateway (vs. per-AZ) for a low-traffic portfolio site
- Shared ECS cluster and ALB across both environments
- DynamoDB on PAY_PER_REQUEST (pennies/month for state locking)
- CloudWatch log retention capped at 30 days
- ECR lifecycle policy keeps only the last 10 images
- **Total monthly cost: ~$19**
