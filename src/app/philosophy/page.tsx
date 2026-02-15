import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Philosophy | Nathan Walker',
  description: 'Frameworks, methodologies, and manifestos',
}

export default function PhilosophyPage() {
  return (
    <main className="px-8">
      <div className="max-w-[800px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-wide uppercase mb-4">
          Philosophy
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-4xl font-semibold mb-8">
          Frameworks, methodologies, and manifestos
        </h1>
        <p className="text-[var(--text-secondary)]">Content migrating from v1 insights.</p>
      </div>
    </main>
  )
}
