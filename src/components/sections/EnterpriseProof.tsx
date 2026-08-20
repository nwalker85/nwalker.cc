import Link from 'next/link'

export function EnterpriseProof() {
  return (
    <section className="py-32 px-8 border-t border-[var(--edge)]">
      <div className="max-w-[720px] mx-auto">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Commercial
        </p>
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-8">
          Where this judgment was earned
        </h2>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
          A sales motion under consequence. Discovery, proof, and close in rooms where
          a bad demo loses the account.
        </p>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12">
          The record is on the commercial page. Named rooms, conversion, and the
          analyst cycle sit there, not here.
        </p>
        <Link
          href="/enterprise"
          className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
        >
          View commercial work →
        </Link>
      </div>
    </section>
  )
}
