import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildCollectionPageSchema, createGraph } from '@/lib/seo/schema'

export const metadata: Metadata = {
  title: 'Architecting Certainty | Nathan Walker',
  description:
    'Architecting Certainty: The Definitive Guide to the High-Stakes Technology Demonstration — an eight-pillar methodology for proof-of-value engagements.',
  alternates: {
    canonical: '/frameworks/architecting-certainty',
  },
}

// Canonical publication. Swap to the Substack/Medium URL when that edition ships.
const articleUrl =
  'https://www.linkedin.com/pulse/architecting-certainty-definitive-guide-high-stakes-nathan-walker-n01bc/'

const pillars = [
  'The Power of Storytelling',
  'The Experience',
  'The Completeness',
  'The Fidelity',
  'Demonstrable Value',
  'Objection Handling & Preemption',
  'Strategic Demo Execution & Call to Action',
  "The Presenter's Polish",
]

export default function ArchitectingCertaintyPage() {
  const schema = createGraph([
    buildCollectionPageSchema({
      path: '/frameworks/architecting-certainty',
      name: 'Architecting Certainty',
      description:
        'Architecting Certainty: The Definitive Guide to the High-Stakes Technology Demonstration — an eight-pillar methodology for proof-of-value engagements.',
    }),
  ])

  return (
    <main className="px-8">
      <JsonLd data={schema} />
      <section className="max-w-[800px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Frameworks / Architecting Certainty
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8">
          Architecting Certainty
        </h1>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-4">
          The Definitive Guide to the High-Stakes Technology Demonstration — a structured
          methodology for moving a prospect along the Certainty Spectrum: from uncertainty,
          skepticism, and perceived risk to confidence that you can solve their problem.
        </p>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-12">
          Forged across hundreds of enterprise engagements and a 38% POC-to-deal conversion
          record. The full guide is published as a standalone article; this page is its index.
        </p>

        <a
          href={articleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[var(--primary)] text-lg font-medium hover:underline underline-offset-4 mb-16"
        >
          Read the full guide →
        </a>

        <section className="border-t border-[var(--edge)] pt-12 mb-16">
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold mb-6">
            The Eight Pillars
          </h2>
          <ol className="space-y-3 list-none">
            {pillars.map((p, i) => (
              <li key={p} className="text-[var(--text-secondary)] text-lg">
                <span className="font-[family-name:var(--font-mono)] text-[var(--text-muted)] mr-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {p}
              </li>
            ))}
          </ol>
        </section>

        <div className="flex gap-8">
          <Link
            href="/frameworks"
            className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
          >
            ← All frameworks
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
