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

## Security

| Layer | Implementation |
|-------|---------------|
| **DNS/CDN** | Cloudflare proxy, DDoS protection |
| **TLS** | ACM certificate, TLS 1.3 policy (`ELBSecurityPolicy-TLS13-1-2-2021-06`) |
| **Network** | VPC isolation, private subnets for tasks, SG least-privilege |
| **HTTP** | `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `server_tokens off` |
| **Container** | nginx:alpine (minimal attack surface), non-root, health checks |
| **State** | S3 versioning, KMS encryption, DynamoDB locking |
| **CI/CD** | GitHub OIDC (no static AWS keys), environment protection rules |

## Terraform Modules

```
infra/
├── bootstrap/          One-time setup: S3 state bucket, DynamoDB lock table
├── modules/
│   ├── vpc/            VPC, 3-AZ public/private subnets, IGW, NAT GW, route tables
│   ├── alb/            ALB, ACM cert, HTTPS listener, host-based routing, target groups
│   ├── ecs/            Fargate cluster, task definition, service, IAM roles, CloudWatch
│   ├── ecr/            Container registry, lifecycle policy
│   └── secrets/        Secrets Manager per environment
└── envs/
    ├── staging/        Creates all shared infra (VPC, ALB, ECR) + staging ECS service
    └── production/     References staging state for shared infra + production ECS service
```

## Cost Optimization

- Staging runs on **Fargate Spot** (up to 70% savings)
- Production runs on **on-demand** for reliability
- Single NAT Gateway (vs. per-AZ) for a low-traffic portfolio site
- Shared ECS cluster and ALB across both environments
- DynamoDB on PAY_PER_REQUEST (pennies/month for state locking)
- CloudWatch log retention capped at 30 days
