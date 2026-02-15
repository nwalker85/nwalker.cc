import Link from 'next/link'

const metrics = [
  { value: '$50M+', label: 'Enterprise revenue influenced' },
  { value: '$17M', label: 'Visionworks' },
  { value: '$9M', label: 'Southern California Edison' },
  { value: '76%', label: 'POC to deal conversion' },
  { value: '100+', label: 'Enterprise deployments' },
  { value: '3 → 50+', label: 'Global presales organization' },
]

export function EnterpriseProof() {
  return (
    <section className="py-32 px-8 border-t border-[var(--edge)]">
      <div className="max-w-[800px] mx-auto">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Enterprise Proof
        </p>
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-16">
          Enterprise Systems Under Consequence
        </h2>
        <div className="space-y-6 mb-16">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-baseline gap-6">
              <span className="font-[family-name:var(--font-mono)] text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight min-w-[140px]">
                {m.value}
              </span>
              <span className="text-[var(--text-muted)] text-base">
                {m.label}
              </span>
            </div>
          ))}
        </div>
        <Link
          href="/portfolio"
          className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
        >
          View Executive Portfolio →
        </Link>
      </div>
    </section>
  )
}
