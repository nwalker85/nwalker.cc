'use client'

import { useState } from 'react'

interface Framework {
  tag: string
  title: string
  summary: string
  body: React.ReactNode
}

const frameworks: Framework[] = [
  {
    tag: 'Manifesto',
    title: 'Runestack Manifesto',
    summary: 'Accountability primitives for AI agents operating under real constraint.',
    body: (
      <>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">
          &ldquo;Trust Me&rdquo; Isn&apos;t an Audit Strategy
        </h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          When the auditor asks what your AI did, under whose authority, and why &mdash; you need a better answer than &ldquo;the model decided.&rdquo; Runestack is building the accountability layer that makes AI agents enterprise-ready.
        </p>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">The Three Questions</h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">Every AI action must answer:</p>
        <ul className="space-y-2 mb-6 list-none">
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Authority</span> &mdash; Who authorized this action? Delegation chains.
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Accountability</span> &mdash; Who is responsible for the outcome? Human-in-the-loop.
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Auditability</span> &mdash; Can we prove what happened? Cryptographic attestation.
          </li>
        </ul>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">Delegation Chains</h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          Authority flows from humans to agents through explicit, verifiable delegation. Like a power of attorney, but for AI. Scoped permissions, time-bounded access, and revocable credentials.
        </p>
        <p className="text-[var(--text-primary)] text-lg font-medium border-l-2 border-[var(--primary)] pl-6 my-8">
          &ldquo;Authority without accountability is just permission. Permission without auditability is just hope.&rdquo;
        </p>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">Cryptographic Attestation</h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          Every agent action produces a signed receipt. Tamper-evident logs prove the chain of decisions. External verification means you don&apos;t have to trust the system &mdash; you can verify it.
        </p>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">The Enterprise Imperative</h4>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Regulated industries can&apos;t deploy AI that operates in a black box. SOC 2, HIPAA, FedRAMP &mdash; all require demonstrable controls. Runestack provides the primitives to build AI systems that pass audit, not just benchmarks.
        </p>
      </>
    ),
  },
  {
    tag: 'Open Standard',
    title: 'Domain Intelligence Schema',
    summary: 'Vendor-neutral grammar for describing AI agent capabilities, constraints, and interactions.',
    body: (
      <>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">
          Vendor-Neutral Grammar for Agentic AI
        </h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          Domain Intelligence Schema (DIS) provides a universal language for describing AI agent capabilities, constraints, and interactions. Write once, deploy to any agent framework.
        </p>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">The 7 Atomic Interaction Modes</h4>
        <ul className="space-y-2 mb-6 list-none">
          {['CREATE — Generate new entities or artifacts',
            'READ — Retrieve and synthesize information',
            'UPDATE — Modify existing state or records',
            'DELETE — Remove entities with soft-delete patterns',
            'INITIATE — Start workflows or processes',
            'RESPOND — React to requests or events',
            'NOTIFY — Emit signals for other agents',
          ].map((item) => (
            <li key={item} className="text-[var(--text-secondary)] leading-relaxed">
              <code className="font-[family-name:var(--font-mono)] text-[var(--text-primary)] text-sm">{item.split(' — ')[0]}</code>
              <span className="text-[var(--text-muted)]"> — </span>{item.split(' — ')[1]}
            </li>
          ))}
        </ul>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">Multi-Framework Compilation</h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">A single DIS specification compiles to:</p>
        <ul className="space-y-2 mb-6 list-none">
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">LangGraph</span> &mdash; State graphs with tool nodes
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">CrewAI</span> &mdash; Agent crews with task definitions
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">AWS Bedrock Agents</span> &mdash; Action groups and knowledge bases
          </li>
        </ul>
        <p className="text-[var(--text-primary)] text-lg font-medium border-l-2 border-[var(--primary)] pl-6 my-8">
          &ldquo;DIS is to agentic AI what SQL is to databases &mdash; a declarative abstraction over implementation details.&rdquo;
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          The full specification is available at{' '}
          <a href="https://domainintelligenceschema.org" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline underline-offset-4">
            domainintelligenceschema.org
          </a>
        </p>
      </>
    ),
  },
  {
    tag: 'Whitepaper',
    title: 'The Stigmergic Enterprise',
    summary: 'Signal-based coordination for multi-agent AI systems at scale.',
    body: (
      <>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">
          Signal-Based AI Coordination
        </h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          Stigmergy &mdash; indirect coordination through environmental signals &mdash; offers a model for multi-agent AI systems. Instead of centralized orchestration, agents respond to signals left by other agents, enabling emergent intelligence at scale.
        </p>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">The 7-Layer Reference Architecture</h4>
        <ul className="space-y-2 mb-6 list-none">
          {[
            ['Signal Layer', 'Event emission and subscription'],
            ['Context Layer', 'Shared state and memory'],
            ['Routing Layer', 'Signal-to-agent matching'],
            ['Execution Layer', 'Agent processing and tool use'],
            ['Verification Layer', 'Output validation and attestation'],
            ['Persistence Layer', 'Durable state and audit trails'],
            ['Governance Layer', 'Policy enforcement and boundaries'],
          ].map(([name, desc]) => (
            <li key={name} className="text-[var(--text-secondary)] leading-relaxed">
              <span className="text-[var(--text-primary)] font-medium">{name}</span>
              <span className="text-[var(--text-muted)]"> — </span>{desc}
            </li>
          ))}
        </ul>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">
          DIS Dossier: Machine-Readable Business Blueprint
        </h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          The Domain Intelligence Schema Dossier encodes business context, constraints, and capabilities in a format agents can consume. Think of it as the DNA of your enterprise that agents reference to make contextually appropriate decisions.
        </p>
        <p className="text-[var(--text-primary)] text-lg font-medium border-l-2 border-[var(--primary)] pl-6 my-8">
          &ldquo;Orchestration tells agents what to do. Stigmergy tells them what matters.&rdquo;
        </p>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">Emergent vs Orchestrated Workflows</h4>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Traditional agent orchestration requires explicit workflow definition. Stigmergic systems allow workflows to emerge from agent interactions with shared signals. This enables adaptation to novel situations without reprogramming the orchestration layer.
        </p>
      </>
    ),
  },
  {
    tag: 'Methodology',
    title: 'Architecting Certainty',
    summary: 'A repeatable framework for enterprise demos with a 76% POC win rate.',
    body: (
      <>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">
          The Ten Commandments of a Winning Demo
        </h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          After running hundreds of enterprise demos with a 76% POC win rate, I codified the methodology into a repeatable framework. Demos aren&apos;t presentations &mdash; they&apos;re the customer&apos;s first experience of working with you.
        </p>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">Discovery-Led Approach</h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">Every winning demo starts with rigorous discovery. Before opening a slide deck, understand:</p>
        <ul className="space-y-2 mb-6 list-none">
          <li className="text-[var(--text-secondary)] leading-relaxed">The business problem driving the evaluation</li>
          <li className="text-[var(--text-secondary)] leading-relaxed">The political landscape and decision-making dynamics</li>
          <li className="text-[var(--text-secondary)] leading-relaxed">The customer&apos;s definition of success</li>
          <li className="text-[var(--text-secondary)] leading-relaxed">Competitive positioning and previous failed attempts</li>
        </ul>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">The Hero&apos;s Journey Framework</h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          Structure the demo narrative around the customer as the hero. You&apos;re not showing your product &mdash; you&apos;re showing their future state. The demo should answer: &ldquo;What does my world look like after we solve this together?&rdquo;
        </p>
        <p className="text-[var(--text-primary)] text-lg font-medium border-l-2 border-[var(--primary)] pl-6 my-8">
          &ldquo;The customer doesn&apos;t buy a product. They buy a vision of themselves succeeding.&rdquo;
        </p>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">DemoOps as DevOps</h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          Treat demo environments with the same rigor as production. Version-controlled demo scripts, automated environment provisioning, and post-demo retrospectives. A crashed demo is a lost deal.
        </p>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">The Three Certainties</h4>
        <ul className="space-y-2 mb-2 list-none">
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Technical Certainty</span> &mdash; The solution works and scales
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Operational Certainty</span> &mdash; The implementation path is clear
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Business Certainty</span> &mdash; The value justifies the investment
          </li>
        </ul>
      </>
    ),
  },
  {
    tag: 'Framework',
    title: 'APEX Operational Excellence',
    summary: 'Federated Center of Excellence model for enterprise AI transformation.',
    body: (
      <>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">
          Federated Center of Excellence Model
        </h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          APEX (Automation Platform Excellence) defines a governance and execution framework for enterprise AI transformation. Developed while scaling professional services at SoundHound/Amelia.
        </p>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">Hub-and-Spoke Architecture</h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Central CoE provides standards, tooling, and expertise. Regional and BU spokes execute delivery with local context. This model scales expertise without creating bottlenecks.
        </p>
        <ul className="space-y-2 mb-6 list-none">
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Hub</span> &mdash; Architecture standards, shared services, training, governance
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Spokes</span> &mdash; Implementation teams, domain expertise, customer relationships
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Connectors</span> &mdash; Rotating assignments, knowledge transfer, best practice propagation
          </li>
        </ul>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">The 3-Layer Value Hierarchy</h4>
        <ul className="space-y-2 mb-6 list-none">
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Capability Layer</span> &mdash; What can we build? Technical feasibility.
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Delivery Layer</span> &mdash; Can we ship it? Execution capacity.
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Impact Layer</span> &mdash; Does it matter? Business outcomes.
          </li>
        </ul>
        <p className="text-[var(--text-primary)] text-lg font-medium border-l-2 border-[var(--primary)] pl-6 my-8">
          &ldquo;Capability without delivery is vaporware. Delivery without impact is waste.&rdquo;
        </p>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">9-Month OKR Execution Framework</h4>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Quarterly cycles with 3-month horizons. Q1 establishes foundation and quick wins. Q2 scales proven patterns. Q3 optimizes and measures impact. Each quarter has defined OKRs that ladder up to annual transformation goals.
        </p>
      </>
    ),
  },
  {
    tag: 'Case Study',
    title: 'Enterprise Architecture',
    summary: 'This portfolio runs on the same infrastructure patterns used for regulated production deployments.',
    body: (
      <>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">
          Eating Your Own Cooking
        </h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          This portfolio site isn&apos;t just a resume &mdash; it&apos;s a demonstration of how I approach enterprise deployments. The infrastructure behind nwalker.cc uses the same patterns and rigor I&apos;d apply to a production system.
        </p>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">Architecture Stack</h4>
        <ul className="space-y-2 mb-6 list-none">
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Compute</span> &mdash; AWS ECS Fargate in private subnets, no servers to patch
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">CI/CD</span> &mdash; GitHub Actions with OIDC authentication, zero static AWS credentials
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Infrastructure as Code</span> &mdash; Terraform modules with S3/DynamoDB state management
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Networking</span> &mdash; Cloudflare DNS/CDN to Application Load Balancer with TLS 1.3
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Environments</span> &mdash; Host-based routing on a shared ALB for staging and production
          </li>
        </ul>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">Key Patterns</h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          Push to <code className="font-[family-name:var(--font-mono)] text-sm text-[var(--text-primary)]">develop</code> deploys to staging automatically. Production requires a version tag and manual approval through GitHub Environment protection rules. Circuit breaker on the production ECS service provides automatic rollback.
        </p>
        <p className="text-[var(--text-primary)] text-lg font-medium border-l-2 border-[var(--primary)] pl-6 my-8">
          &ldquo;If the infrastructure isn&apos;t good enough for your own portfolio, why would a customer trust you with theirs?&rdquo;
        </p>
        <h4 className="text-[var(--text-primary)] text-lg font-semibold mb-3">Cost Optimization</h4>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          The entire stack &mdash; VPC, ALB, ECS Fargate, ECR, CloudWatch &mdash; runs for under $20/month. Fargate Spot for staging, single NAT Gateway, shared ALB, and lifecycle policies keep costs minimal without sacrificing security.
        </p>
      </>
    ),
  },
]

export function PhilosophyAccordion() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  function toggle(index: number) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <div className="space-y-0">
      {frameworks.map((fw, i) => {
        const isOpen = expanded.has(i)
        return (
          <div key={fw.title} className="border-t border-[var(--edge)]">
            <button
              onClick={() => toggle(i)}
              className="w-full text-left py-8 group cursor-pointer"
              aria-expanded={isOpen}
            >
              <p className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-2">
                {fw.tag}
              </p>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[var(--text-primary)] text-xl font-semibold mb-2 group-hover:text-[var(--primary-light)] transition-colors">
                    {fw.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                    {fw.summary}
                  </p>
                </div>
                <span
                  className="text-[var(--text-muted)] text-2xl mt-1 shrink-0 transition-transform duration-200"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </div>
            </button>
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: isOpen ? '2000px' : '0',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="pb-10 pl-0">
                {fw.body}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
