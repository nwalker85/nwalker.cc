import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildCollectionPageSchema, createGraph } from '@/lib/seo/schema'

export const metadata: Metadata = {
  title: 'Healthcare Voice AI Patterns | Nathan Walker',
  description:
    'Bounded definitions and architecture patterns for healthcare voice AI: patient access, scheduling recovery, prior authorization, and collections under HIPAA constraint.',
  alternates: {
    canonical: '/patterns/healthcare-voice-ai',
  },
}

const patterns = [
  {
    name: 'Patient access',
    definition:
      'Voice-first front door for eligibility, registration, and routing. The agent resolves identity and intent before any PHI-bearing system is touched, so the trust boundary is crossed once, deliberately, and with an audit record.',
  },
  {
    name: 'Scheduling and waitlist recovery',
    definition:
      'Outbound voice fills canceled and unbooked slots from a prioritized waitlist. The scheduling system remains the source of truth; the agent holds no schedule state, only bounded write access through the EHR integration layer.',
  },
  {
    name: 'No-show recapture',
    definition:
      'Automated re-engagement after missed appointments — confirmation, rebooking, and barrier capture (transport, coverage, time-of-day) fed back to operations as structured data rather than call notes.',
  },
  {
    name: 'Prior authorization',
    definition:
      'Status retrieval and document chase across payer interfaces. The pattern separates retrieval (safe to automate broadly) from submission (gated, logged, and attributable to an accountable identity).',
  },
  {
    name: 'Post-visit collections',
    definition:
      'Outbound balance resolution with payment capture handed off to a PCI-scoped processor. The voice agent never holds card data; it brokers a transfer into the compliant payment path.',
  },
  {
    name: 'Post-discharge workflows',
    definition:
      'Follow-up adherence checks, medication confirmation, and escalation triggers. Escalation thresholds are clinical-team policy expressed as configuration, not model judgment.',
  },
]

export default function HealthcareVoiceAIPage() {
  const schema = createGraph([
    buildCollectionPageSchema({
      path: '/patterns/healthcare-voice-ai',
      name: 'Healthcare Voice AI Patterns',
      description:
        'Bounded definitions and architecture patterns for healthcare voice AI under HIPAA constraint.',
    }),
  ])

  return (
    <main className="px-8">
      <JsonLd data={schema} />
      <section className="max-w-[800px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Patterns / Healthcare Voice AI
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8">
          Healthcare voice AI, bounded by the systems it must answer to.
        </h1>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-16">
          These are the recurring workloads where voice AI earns its keep in healthcare — and
          the architectural boundaries that keep each one inside regulatory constraint. Drawn
          from production deployments across payer, provider, DSO, and RCM environments.
        </p>

        <div className="space-y-12 mb-20">
          {patterns.map((p) => (
            <article key={p.name} className="border-t border-[var(--edge)] pt-8">
              <h2 className="text-[var(--text-primary)] text-xl font-semibold mb-4">{p.name}</h2>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                {p.definition}
              </p>
            </article>
          ))}
        </div>

        <section className="border-t border-[var(--edge)] pt-12 mb-20">
          <h2 className="text-[var(--text-primary)] text-xl font-semibold mb-4">
            Compliance posture
          </h2>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4">
            Every pattern above assumes HIPAA/HITECH as the floor: PHI minimization at the
            voice boundary, BAA-covered processing paths, role-scoped data access through the
            integration layer, and audit records for every system mutation. Voice transcripts
            are treated as PHI the moment identity is resolved.
          </p>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            Integration runs through FHIR and HL7 interfaces rather than screen-scraping or
            credential sharing — agent-to-data access is mediated, scoped, and revocable.
          </p>
        </section>

        <section className="border-t border-[var(--edge)] pt-12 mb-20">
          <h2 className="text-[var(--text-primary)] text-xl font-semibold mb-4">
            Published results
          </h2>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            42 North Dental&apos;s published case study reports $8M collected in nine months at
            roughly 100,000 monthly outbound calls using these scheduling-recovery and
            collections patterns.
          </p>
        </section>

        <div className="flex gap-8">
          <Link
            href="/patterns"
            className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
          >
            ← All patterns
          </Link>
          <Link
            href="/enterprise"
            className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
          >
            Enterprise work →
          </Link>
        </div>
      </section>
    </main>
  )
}
