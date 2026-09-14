import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { domainPortfolio, publicEcosystemEntries } from '@/lib/domain-portfolio'
import { buildCollectionPageSchema, createGraph } from '@/lib/seo/schema'

export const metadata: Metadata = {
  title: 'Ecosystem | Nathan Walker',
  description:
    'The domain and concept map around Nathan Walker, Ravenhelm, Runestack, Domain Intelligence Schema, and Artimetrics.',
  alternates: {
    canonical: '/ecosystem',
  },
}

const boundaryLabels = {
  personal: 'Personal',
  ravenhelm: 'Ravenhelm, LLC',
  'ravenhelm-consulting': 'Ravenhelm Consulting',
  community: 'Community',
  product: 'Product',
  methodology: 'Methodology',
  concept: 'Concept',
  'personal-project': 'Personal project',
  sunset: 'Sunset',
}

export default function EcosystemPage() {
  const schema = createGraph([
    buildCollectionPageSchema({
      path: '/ecosystem',
      name: 'Nathan Walker Ecosystem',
      description:
        'A public map of the personal, company, product, methodology, and concept domains around Nathan Walker.',
    }),
  ])

  return (
    <main className="px-8">
      <JsonLd data={schema} />
      <section className="max-w-[980px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Ecosystem
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8">
          A map of the domains, methods, and products around the work.
        </h1>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-12">
          These properties are intentionally separated by ownership boundary: personal authority, Ravenhelm company work, product surfaces, methodology/specification work, and personal projects. The goal is cross-linking without collapsing distinct identities into one brand.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {publicEcosystemEntries.map((entry) => (
            <article
              key={entry.domain}
              className="border border-[var(--edge)] bg-[var(--surface)] p-6 rounded-lg"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-2">
                    {boundaryLabels[entry.boundary]}
                  </p>
                  <h2 className="text-[var(--text-primary)] text-xl font-semibold">
                    {entry.label}
                  </h2>
                </div>
                <span className="text-[var(--text-muted)] text-xs border border-[var(--edge)] rounded-full px-3 py-1">
                  {entry.priority}
                </span>
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
                {entry.purpose}
              </p>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5">
                {entry.livePolicy}
              </p>
              {entry.url ? (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] text-sm font-medium hover:text-[var(--accent)] transition-colors"
                >
                  {entry.domain}
                </a>
              ) : (
                <span className="text-[var(--text-muted)] text-sm">
                  {entry.domain}
                </span>
              )}
            </article>
          ))}
        </div>

        <section className="border-t border-[var(--edge)] pt-10">
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold mb-6">
            Build Order
          </h2>
          <div className="space-y-6">
            {domainPortfolio
              .filter((entry) => entry.priority === 'critical')
              .map((entry) => (
                <article key={entry.domain}>
                  <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-2">
                    {entry.label}
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {entry.contentPlan.map((item) => (
                      <li key={item} className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
          </div>
        </section>
      </section>
    </main>
  )
}
