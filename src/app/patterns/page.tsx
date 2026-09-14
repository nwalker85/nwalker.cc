import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildCollectionPageSchema, createGraph } from '@/lib/seo/schema'

export const metadata: Metadata = {
  title: 'Enterprise AI Architecture Patterns | Nathan Walker',
  description: 'Reusable patterns for auditable, governed, and enterprise-ready AI systems.',
  alternates: {
    canonical: '/patterns',
  },
}

const patterns = [
  {
    name: 'Intent / execution separation',
    summary:
      'Capture what a user or agent intends separately from the system authority that actually mutates state.',
  },
  {
    name: 'Policy-before-tool-use',
    summary:
      'Resolve policy, scope, and delegation before an agent can invoke tools or change production data.',
  },
  {
    name: 'Cryptographic audit evidence',
    summary:
      'Treat audit logs as evidence chains that can be externally verified, not as best-effort application traces.',
  },
]

export default function PatternsPage() {
  const schema = createGraph([
    buildCollectionPageSchema({
      path: '/patterns',
      name: 'Enterprise AI Architecture Patterns',
      description: 'Reusable patterns for auditable, governed, and enterprise-ready AI systems.',
    }),
  ])

  return (
    <main className="px-8">
      <JsonLd data={schema} />
      <section className="max-w-[900px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Patterns
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8">
          Enterprise AI patterns need failure modes, not just diagrams.
        </h1>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-16">
          These patterns describe the recurring boundaries in governed AI systems: intent, authority, execution, mutation, and audit evidence.
        </p>
        <div className="space-y-10">
          {patterns.map((pattern) => (
            <article key={pattern.name} className="border-t border-[var(--edge)] pt-8">
              <h2 className="text-[var(--text-primary)] text-xl font-semibold mb-3">
                {pattern.name}
              </h2>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                {pattern.summary}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-[var(--edge)] pt-8">
          <Link
            href="/patterns/healthcare-voice-ai"
            className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
          >
            Healthcare voice AI patterns →
          </Link>
        </div>
      </section>
    </main>
  )
}
