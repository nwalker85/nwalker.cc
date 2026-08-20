/**
 * /assistant — portfolio assistant marketing page.
 * Server component. Probes health on render.
 * If health fails, shows offline fallback with /#contact link.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { siteUrl } from '@/lib/seo/site'
import { getAssistantHealth } from '@/lib/assistant/health'

export const metadata: Metadata = {
  title: 'Portfolio Assistant | Nathan Walker',
  description:
    'A LangGraph.js portfolio assistant with inspectable runtime, public corpus grounding, and meeting handoff. Built to demonstrate accountable AI in practice.',
  alternates: {
    canonical: '/assistant',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Portfolio Assistant | Nathan Walker',
    description:
      'A LangGraph.js portfolio assistant with inspectable runtime, public corpus grounding, and meeting handoff.',
    url: `${siteUrl}/assistant`,
  },
}

export default function AssistantPage() {
  let health: ReturnType<typeof getAssistantHealth> | null = null
  try {
    health = getAssistantHealth()
  } catch {
    health = null
  }
  const online = health?.ok === true

  return (
    <main>
      {/* Hero */}
      <section className="py-32 px-8">
        <div className="max-w-[720px] mx-auto">
          <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
            Live Demo
          </p>
          <h1 className="text-[var(--text-primary)] text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            Portfolio Assistant
          </h1>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
            A LangGraph.js StateGraph running live on this portfolio. Ask about Nathan Walker&apos;s
            work, philosophy, architecture approach, or Runestack. Request a meeting and watch the
            handoff graph run in real time.
          </p>

          {!online ? (
            <div className="border border-[var(--edge)] rounded p-6 mb-8">
              <p className="text-[var(--text-secondary)] text-base mb-3">
                The assistant is offline — book directly.
              </p>
              <Link
                href="/#contact"
                className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
              >
                Go to contact form →
              </Link>
            </div>
          ) : (
            <Link
              href="/assistant/app"
              className="inline-block bg-[var(--primary)] text-[var(--background)] px-6 py-3 text-sm font-medium rounded hover:opacity-90 transition-opacity"
            >
              Launch the Assistant Demo →
            </Link>
          )}
        </div>
      </section>

      {/* Context boundary */}
      <section className="py-16 px-8 border-t border-[var(--edge)]">
        <div className="max-w-[720px] mx-auto">
          <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
            Public Context Boundary
          </p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight mb-6">
            What this assistant knows
          </h2>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4">
            The assistant answers from a public corpus only. It has no access to internal systems,
            private data, or anything not published on this site.
          </p>
          <ul className="space-y-2 text-[var(--text-secondary)] text-base leading-relaxed mb-8">
            {[
              'Identity — who Nathan Walker is and what he does',
              'Philosophy — AI governance, accountability, the Judgment Gap',
              'Architecture — control planes, event-first design, delegation chains',
              'Runestack — the accountability layer for AI agents',
              'Enterprise context — types of work, regulatory environments',
              'Definitions — accountable AI, control plane, agentic systems, auditability',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-[var(--text-muted)] mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[var(--text-muted)] text-sm">
            Corpus size: {health?.corpusSize ?? 'unknown'} chunks &nbsp;·&nbsp; Mode:{' '}
            {health?.modelMode ?? 'extractive'}
          </p>
        </div>
      </section>

      {/* Example questions */}
      <section className="py-16 px-8 border-t border-[var(--edge)]">
        <div className="max-w-[720px] mx-auto">
          <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
            Example Questions
          </p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight mb-6">
            Try asking
          </h2>
          <ul className="space-y-3">
            {[
              'What is Runestack?',
              'What does Nathan mean by the Judgment Gap?',
              'How does the control plane work?',
              'What enterprise work has Nathan done?',
              'What is accountable AI?',
              "I'd like to schedule a call.",
            ].map((q) => (
              <li key={q}>
                <span className="font-mono text-[var(--text-secondary)] text-sm bg-[var(--surface)] px-3 py-1.5 rounded inline-block">
                  {q}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LangGraph inspectability */}
      <section className="py-16 px-8 border-t border-[var(--edge)]">
        <div className="max-w-[720px] mx-auto">
          <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
            LangGraph Runtime
          </p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight mb-6">
            Inspectable by design
          </h2>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4">
            Every assistant response exposes the full graph trace: which nodes executed, in what
            order, and what each one decided. The Activity panel shows node events in real time.
            Sources panel shows the corpus chunks used to generate the answer.
          </p>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4">
            Graph:{' '}
            <span className="font-mono text-[var(--text-primary)]">retrieve</span>
            {' → '}
            <span className="font-mono text-[var(--text-primary)]">route</span>
            {' → '}
            <span className="font-mono text-[var(--text-primary)]">answer</span>
            {' | '}
            <span className="font-mono text-[var(--text-primary)]">handoff</span>
          </p>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            This is not a demo of a chat widget. It is a demonstration of a governed, inspectable AI
            workflow — the same pattern used in production agentic systems.
          </p>
        </div>
      </section>

      {/* Meeting handoff */}
      <section className="py-16 px-8 border-t border-[var(--edge)]">
        <div className="max-w-[720px] mx-auto">
          <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
            Meeting Handoff
          </p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight mb-6">
            Request a conversation
          </h2>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
            Ask the assistant to schedule a meeting and it routes to the handoff node — collecting
            name, email, company, role, and reason before summarizing and asking for confirmation.
            The assistant does not claim to book meetings; it collects structured context for Nathan
            to review.
          </p>
          {online ? (
            <Link
              href="/assistant/app"
              className="inline-block bg-[var(--primary)] text-[var(--background)] px-6 py-3 text-sm font-medium rounded hover:opacity-90 transition-opacity"
            >
              Launch the Assistant Demo →
            </Link>
          ) : (
            <Link
              href="/#contact"
              className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
            >
              Contact Nathan directly →
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
