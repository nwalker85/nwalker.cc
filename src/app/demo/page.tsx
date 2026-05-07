import type { Metadata } from 'next'
import Link from 'next/link'
import { AccountabilityDemo } from '@/components/demo/AccountabilityDemo'

export const metadata: Metadata = {
  title: 'Accountability Demo | Nathan Walker',
  description: 'A working browser demo of governed agent execution: authority checks, policy gates, mutation containment, and evidence receipts.',
  alternates: {
    canonical: '/demo',
  },
}

export default function DemoPage() {
  return (
    <main className="px-8">
      <section className="max-w-[1120px] mx-auto py-24 md:py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Working Demo
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8 max-w-[820px]">
          Governed agents should prove why they are allowed to act.
        </h1>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-6 max-w-[840px]">
          This is a deterministic browser demo of the control-plane pattern behind accountable AI: intent enters, authority is checked, policy gates decide, and the system emits an evidence receipt before any tool is granted.
        </p>
        <p className="text-[var(--text-muted)] text-base leading-relaxed mb-12 max-w-[760px]">
          Change the request, authority level, value, justification, and containment controls. The verdict updates immediately. The point is not model cleverness; it is bounded execution.
        </p>

        <AccountabilityDemo />

        <div className="grid md:grid-cols-3 gap-8 mt-16 border-t border-[var(--edge)] pt-12">
          <section>
            <h2 className="text-[var(--text-primary)] text-lg font-semibold mb-3">
              What It Demonstrates
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              A governed agent does not receive broad tool access. It earns a scoped grant only after authority, data, value, and mutation checks pass.
            </p>
          </section>
          <section>
            <h2 className="text-[var(--text-primary)] text-lg font-semibold mb-3">
              What It Avoids
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              No black-box execution, no silent side effects, and no unreviewable tool calls. Blocked and escalated requests still produce evidence.
            </p>
          </section>
          <section>
            <h2 className="text-[var(--text-primary)] text-lg font-semibold mb-3">
              Where It Leads
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
              This is the portfolio-safe version of the Runestack thesis: authority, accountability, and auditability as execution primitives.
            </p>
            <Link href="/runestack" className="text-[var(--primary)] text-sm font-medium hover:underline underline-offset-4">
              Read the Runestack thesis →
            </Link>
          </section>
        </div>
      </section>
    </main>
  )
}
