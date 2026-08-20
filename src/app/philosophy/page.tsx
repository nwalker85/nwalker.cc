import type { Metadata } from 'next'
import { PhilosophyAccordion } from '@/components/sections/PhilosophyAccordion'

export const metadata: Metadata = {
  title: 'Philosophy | Nathan Walker',
  description: 'Frameworks, methodologies, and manifestos for enterprise AI governance.',
  alternates: {
    canonical: '/philosophy',
  },
}

export default function PhilosophyPage() {
  return (
    <main className="px-8">
      <div className="max-w-[720px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Philosophy
        </p>
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          Frameworks, Methodologies, and Manifestos
        </h2>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-16">
          Six bodies of work that inform how I think about AI governance, enterprise systems, and the gap between building something and building something that survives contact with reality.
        </p>
        <PhilosophyAccordion />
      </div>
    </main>
  )
}
