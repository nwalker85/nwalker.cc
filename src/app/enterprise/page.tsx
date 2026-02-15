import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise | Nathan Walker',
  description: 'Enterprise Systems Under Consequence',
}

export default function EnterprisePage() {
  return (
    <main className="px-8">
      <div className="max-w-[800px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-wide uppercase mb-4">
          Enterprise
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-4xl font-semibold mb-8">
          Enterprise Systems Under Consequence
        </h1>
        <p className="text-[var(--text-secondary)]">Executive proof content in development.</p>
      </div>
    </main>
  )
}
