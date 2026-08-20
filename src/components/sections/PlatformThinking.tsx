import Link from 'next/link'

const capabilities = [
  'Segmented trust zones',
  'Isolated inference plane',
  'Kubernetes workload fabric',
  'Deterministic deployment pipelines',
]

export function PlatformThinking() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-[720px] mx-auto">
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-8">
          Infrastructure Is a Reflection of Judgment
        </h2>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12">
          I operate a segmented private AI fabric — not as a hobby, but as a proving ground for the systems I design for regulated environments.
        </p>
        <ul className="space-y-4 mb-16 list-none">
          {capabilities.map((item) => (
            <li key={item} className="text-[var(--text-muted)] text-lg">
              {item}
            </li>
          ))}
        </ul>
        <div className="space-y-2 mb-12">
          <p className="text-[var(--text-primary)] text-lg font-medium">
            Systems should fail safely.
          </p>
          <p className="text-[var(--text-primary)] text-lg font-medium">
            They should scale intentionally.
          </p>
          <p className="text-[var(--text-primary)] text-lg font-medium">
            They should survive audit.
          </p>
        </div>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12">
          That is an architectural claim. The fabric is documented there.
        </p>
        <Link
          href="/architecture"
          className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
        >
          See Architecture →
        </Link>
      </div>
    </section>
  )
}
