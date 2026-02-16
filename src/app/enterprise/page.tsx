import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise Work | Nathan Walker',
  description: 'Selected enterprise projects — systems built and shipped under real constraint.',
}

const projects = [
  {
    tag: 'Building Now',
    title: 'Runestack',
    description:
      'Accountability layer for AI agents. Delegation chains, cryptographic attestation, and external verification — because "trust me" isn\'t an audit strategy. Targeting SOC 2, HIPAA, and FedRAMP environments where AI systems must demonstrate provable controls.',
    tech: ['LangGraph', 'Protocol Design', 'Compliance'],
  },
  {
    tag: '$9M Deal',
    title: 'SoCal Edison',
    description:
      'Competitive enterprise win for utility-scale conversational AI. Full solution architecture, value engineering, and executive alignment against incumbent vendors. Closed through technical differentiation and a discovery-led demo strategy.',
    tech: ['Solution Architecture', 'Value Engineering', 'Enterprise Sales'],
  },
  {
    tag: 'Enterprise AI',
    title: 'APEX Automation CoE',
    description:
      'Federated governance model for enterprise AI transformation at SoundHound/Amelia. Hub-and-spoke Center of Excellence with financial operating model, phased roadmaps, and delivery frameworks that scaled across four global regions.',
    tech: ['Governance', 'Operating Model', 'Enterprise'],
  },
  {
    tag: 'Building Now',
    title: 'Bifrost MCP Gateway',
    description:
      'Tool gateway for AI agents with credential management, rate limiting, audit logging, and contract enforcement. Agents call tools through Bifrost — Bifrost handles auth, access control, and compliance.',
    tech: ['MCP', 'Agent Routing', 'Auth'],
  },
  {
    tag: 'Voice AI',
    title: '100+ Enterprise Voice Deployments',
    description:
      'Genesys, NICE, Five9, and custom SIP integrations. IVR/ACD architecture, real-time ASR/TTS, and contact center transformation across telecom, insurance, and utilities verticals.',
    tech: ['Twilio', 'LiveKit', 'WebRTC'],
  },
  {
    tag: 'Age 22',
    title: 'Workflow Automation Platform',
    description:
      'Single-handedly engineered an RPA platform that replaced a manual dispatch system. Licensed to Frontier Communications, generating approximately $2M ARR. First proof that building from scratch can outperform buying off the shelf.',
    tech: ['0→1', 'Full Stack', '$2M ARR'],
  },
]

export default function EnterprisePage() {
  return (
    <main className="px-8">
      <div className="max-w-[720px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Selected Work
        </p>
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          Things I&apos;ve Built and Shipped
        </h2>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-16">
          Enterprise systems built under regulatory scrutiny, contractual obligation, and executive visibility. Each entry represents a system that had to work — not a concept that sounded good in a pitch deck.
        </p>

        <div>
          {projects.map((project) => (
            <section
              key={project.title}
              className="border-t border-[var(--edge)] py-10"
            >
              <p className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-3">
                {project.tag}
              </p>
              <h3 className="text-[var(--text-primary)] text-xl font-semibold mb-4">
                {project.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[var(--text-muted)] text-xs font-medium tracking-wide font-[family-name:var(--font-mono)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
