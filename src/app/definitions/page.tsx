import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildCollectionPageSchema, createGraph } from '@/lib/seo/schema'

export const metadata: Metadata = {
  title: 'AI Governance Definitions | Nathan Walker',
  description: 'Canonical definitions for AI governance, control planes, auditability, and agentic systems.',
  alternates: {
    canonical: '/definitions',
  },
}

const definitions = [
  {
    term: 'AI control plane',
    definition:
      'An AI control plane is the governance layer that separates human intent, policy, execution authority, and audit evidence in an AI system.',
  },
  {
    term: 'AI auditability',
    definition:
      'AI auditability is the ability to reconstruct what an AI system was asked to do, what authority it used, what it changed, and why that change was allowed.',
  },
  {
    term: 'Deterministic AI system',
    definition:
      'A deterministic AI system constrains nondeterministic model behavior with explicit state, policy boundaries, repeatable workflows, and verifiable outputs.',
  },
]

export default function DefinitionsPage() {
  const schema = createGraph([
    buildCollectionPageSchema({
      path: '/definitions',
      name: 'AI Governance Definitions',
      description: 'Canonical definitions for AI governance, control planes, auditability, and agentic systems.',
    }),
  ])

  return (
    <main className="px-8">
      <JsonLd data={schema} />
      <section className="max-w-[840px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Definitions
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8">
          AI governance terms should be precise enough to build from.
        </h1>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-16">
          This glossary anchors the vocabulary behind accountable AI systems: control planes, auditability, deterministic boundaries, and enterprise agent architectures.
        </p>
        <div className="space-y-10">
          {definitions.map((item) => (
            <article key={item.term} className="border-t border-[var(--edge)] pt-8">
              <h2 className="text-[var(--text-primary)] text-xl font-semibold mb-3">
                {item.term}
              </h2>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                {item.definition}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
