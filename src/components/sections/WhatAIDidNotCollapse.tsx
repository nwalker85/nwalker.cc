const items = [
  'Security boundary design',
  'Failure domain modeling',
  'Identity placement in trust chains',
  'Infrastructure blast-radius control',
  'Governance under regulatory constraint',
]

export function WhatAIDidNotCollapse() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-12">
          What AI Did Not Collapse
        </h2>
        <ul className="space-y-4 mb-16 list-none">
          {items.map((item) => (
            <li key={item} className="text-[var(--text-muted)] text-lg">
              {item}
            </li>
          ))}
        </ul>
        <div className="space-y-2">
          <p className="text-[var(--text-primary)] text-lg font-medium">
            These are not features.
          </p>
          <p className="text-[var(--text-primary)] text-lg font-medium">
            They are guardrails.
          </p>
        </div>
      </div>
    </section>
  )
}
