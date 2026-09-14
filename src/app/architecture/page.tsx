import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Architecture | Nathan Walker',
  description: 'Systems philosophy and infrastructure proof — how I think about and build production systems.',
  alternates: {
    canonical: '/architecture',
  },
}

const principles = [
  'Segmented VLAN trust zones with zero-trust inter-VLAN policy enforcement',
  'Isolated inference plane — GPU workloads separated from general compute',
  'Kubernetes workload fabric across a 3-node HA cluster',
  'Cryptographic identity for every service, no implicit trust',
  'Immutable infrastructure — nothing is patched in place',
]

const stack = [
  { label: 'DNS/CDN', value: 'Cloudflare proxy, DDoS protection, origin IP hidden' },
  { label: 'TLS', value: 'ACM certificate, TLS 1.3 security policy' },
  { label: 'Compute', value: 'AWS ECS Fargate in private subnets, no servers to patch' },
  { label: 'CI/CD', value: 'GitHub Actions with OIDC — zero static AWS credentials' },
  { label: 'IaC', value: 'Terraform modules with S3/DynamoDB state management' },
  { label: 'Network', value: 'VPC isolation, private subnets, security group least-privilege' },
  { label: 'Container', value: 'Next.js standalone on node:22-alpine — non-root user, no SSH' },
  { label: 'State', value: 'S3 versioning, KMS encryption, DynamoDB locking' },
]

const terraformModules = [
  { name: 'vpc/', desc: 'VPC, 3-AZ public/private subnets, IGW, NAT GW, route tables' },
  { name: 'alb/', desc: 'ALB, ACM cert, HTTPS listener, host-based routing, target groups' },
  { name: 'ecs/', desc: 'Fargate cluster, task definition, service, IAM roles, CloudWatch' },
  { name: 'ecr/', desc: 'Container registry, lifecycle policy — keep last 10 images' },
  { name: 'secrets/', desc: 'Secrets Manager per environment' },
]

export default function ArchitecturePage() {
  return (
    <main className="px-8">
      <div className="max-w-[720px] mx-auto py-32">
        {/* Layer A — Systems Philosophy */}
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Systems Philosophy
        </p>
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          Infrastructure Is a Reflection of Judgment
        </h2>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
          I operate a segmented, 10Gb, GPU-backed private AI fabric — not as a hobby, but as a proving ground for the systems I design for regulated environments. Every architectural decision here maps to a production pattern I&apos;d deploy for a customer.
        </p>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12">
          Trust zones enforce lateral movement boundaries. Inference workloads run on an isolated plane. Governance primitives sit between agents and the tools they call. The question isn&apos;t whether the system works — it&apos;s whether the system survives scrutiny.
        </p>

        <ul className="space-y-4 mb-16 list-none">
          {principles.map((item) => (
            <li key={item} className="text-[var(--text-muted)] text-base">
              {item}
            </li>
          ))}
        </ul>

        <div className="space-y-2 mb-20">
          <p className="text-[var(--text-primary)] text-lg font-medium">
            Systems should fail safely.
          </p>
          <p className="text-[var(--text-primary)] text-lg font-medium">
            They should scale intentionally.
          </p>
          <p className="text-[var(--text-primary)] text-lg font-medium">
            They should survive audit.
          </p>
        </div>

        {/* Layer B — Infrastructure Proof */}
        <section className="border-t border-[var(--edge)] pt-16">
          <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
            Infrastructure Proof
          </p>
          <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-6">
            How This Portfolio Is Deployed
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12">
            This site runs on the same infrastructure patterns I&apos;d use for a regulated production deployment. VPC isolation, zero static credentials, circuit-breaker rollback, and immutable container images. NAT Gateway and the load balancer dominate the bill; the app itself is two small Fargate tasks.
          </p>

          <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-6">Security Layers</h3>
          <div className="space-y-4 mb-16">
            {stack.map((s) => (
              <div key={s.label} className="flex items-baseline gap-4">
                <span className="text-[var(--text-primary)] font-medium text-sm font-[family-name:var(--font-mono)] min-w-[100px] shrink-0">
                  {s.label}
                </span>
                <span className="text-[var(--text-muted)] text-sm">
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-6">Terraform Modules</h3>
          <div className="space-y-4 mb-16">
            {terraformModules.map((m) => (
              <div key={m.name} className="flex items-baseline gap-4">
                <span className="text-[var(--text-primary)] font-medium text-sm font-[family-name:var(--font-mono)] min-w-[100px] shrink-0">
                  {m.name}
                </span>
                <span className="text-[var(--text-muted)] text-sm">
                  {m.desc}
                </span>
              </div>
            ))}
          </div>

          <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-4">CI/CD Pipeline</h3>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
            Push to <code className="font-[family-name:var(--font-mono)] text-sm text-[var(--text-primary)]">develop</code> deploys to staging automatically. Production requires a semver tag and manual approval through GitHub Environment protection rules. The pipeline uses GitHub OIDC to assume an AWS IAM role — no static credentials exist anywhere.
          </p>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
            Circuit breaker on the production ECS service provides automatic rollback. Staging runs on Fargate Spot. Production runs on-demand with two tasks for availability. ALB health checks <code className="font-[family-name:var(--font-mono)] text-sm text-[var(--text-primary)]">/health</code>.
          </p>

          <p className="text-[var(--text-primary)] text-lg font-medium border-l-2 border-[var(--primary)] pl-6 my-12">
            &ldquo;If the infrastructure isn&apos;t good enough for your own portfolio, why would a customer trust you with theirs?&rdquo;
          </p>
        </section>
      </div>
    </main>
  )
}
