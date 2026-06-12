import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildCollectionPageSchema, createGraph } from '@/lib/seo/schema'

export const metadata: Metadata = {
  title: 'AI Governance Frameworks | Nathan Walker',
  description: 'Named frameworks for deterministic AI control, event-first architecture, and accountable agents.',
  alternates: {
    canonical: '/frameworks',
  },
}

const frameworks = [
  {
    name: 'Deterministic AI Control Plane',
    summary:
      'A framework for separating intent, policy, authority, execution, and evidence so AI systems can be governed under enterprise constraint.',
  },
  {
    name: 'Event-First AI Architecture',
    summary:
      'A framework for treating AI decisions and tool use as durable events before they become irreversible system mutations.',
  },
  {
    name: 'Accountable Agent Boundary Model',
    summary:
      'A framework for designing agent systems with explicit delegation chains, scoped authority, and independently reviewable audit trails.',
  },
]

export default function FrameworksPage() {
  const schema = createGraph([
    buildCollectionPageSchema({
      path: '/frameworks',
      name: 'AI Governance Frameworks',
      description: 'Named frameworks for deterministic AI control, event-first architecture, and accountable agents.',
    }),
  ])

  return (
    <main className="px-8">
      <JsonLd data={schema} />
      <section className="max-w-[900px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Frameworks
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8">
          Governance becomes real when it has a repeatable architecture.
        </h1>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-16">
          These frameworks turn positioning into reusable models for enterprise AI systems that must survive audit, change, and operational pressure.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {frameworks.map((framework) => (
            <article key={framework.name} className="border-t border-[var(--edge)] pt-8">
              <h2 className="text-[var(--text-primary)] text-xl font-semibold mb-4">
                {framework.name}
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {framework.summary}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-[var(--edge)] pt-8">
          <Link
            href="/frameworks/architecting-certainty"
            className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
          >
            Architecting Certainty — the demo methodology →
          </Link>
        </div>
      </section>
    </main>
  )
}
