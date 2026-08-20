import Link from 'next/link'

export function AccountableAI() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-[720px] mx-auto">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Current Focus
        </p>
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-8">
          Accountable AI Is the Logical Conclusion
        </h2>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
          If AI makes building cheap, governance becomes mandatory.
        </p>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
          I am building primitives for AI systems operating under real constraint — cryptographic authority, mutation containment, and externally verifiable audit.
        </p>
        <div className="space-y-2 mb-12">
          <p className="text-[var(--text-primary)] text-lg font-medium">
            Authority without accountability is permission.
          </p>
          <p className="text-[var(--text-primary)] text-lg font-medium">
            Permission without auditability is fragility.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/runestack"
            className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
          >
            See Runestack →
          </Link>
          <Link
            href="/assistant"
            className="text-[var(--text-secondary)] text-base font-medium hover:underline underline-offset-4"
          >
            Launch the Assistant Demo →
          </Link>
        </div>
      </div>
    </section>
  )
}
