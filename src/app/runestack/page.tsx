import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Runestack | Nathan Walker',
  description: 'The accountability layer for AI agents — delegation chains, cryptographic attestation, and external verification.',
  alternates: {
    canonical: '/runestack',
  },
}

const primitives = [
  {
    name: 'Delegation Chains',
    desc: 'Authority flows from humans to agents through explicit, verifiable delegation. Scoped permissions, time-bounded access, revocable credentials. Like a power of attorney, but for AI.',
  },
  {
    name: 'Signed Receipts',
    desc: 'Every agent action produces a cryptographic receipt. Tamper-evident logs prove the chain of decisions. External verification means you don\'t trust the system — you verify it.',
  },
  {
    name: 'Mutation Containment',
    desc: 'Agents operate within declared boundaries. State changes are tracked, constrained, and reversible. No silent side effects, no undeclared writes.',
  },
]

const targets = [
  { label: 'SOC 2', desc: 'Demonstrable controls over AI agent behavior and data access' },
  { label: 'HIPAA', desc: 'Audit trails for every action touching protected health information' },
  { label: 'FedRAMP', desc: 'Continuous monitoring and authorization for government workloads' },
]

export default function RunestackPage() {
  return (
    <main className="px-8">
      <div className="max-w-[720px] mx-auto py-32">
        {/* Section A — Manifesto */}
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Manifesto
        </p>
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          &ldquo;Trust Me&rdquo; Isn&apos;t an Audit Strategy
        </h2>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
          When the auditor asks what your AI did, under whose authority, and why — you need a better answer than &ldquo;the model decided.&rdquo; Runestack is building the accountability layer that makes AI agents enterprise-ready.
        </p>

        <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-4">The Three Questions</h3>
        <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4">
          Every AI action in a governed environment must answer:
        </p>
        <ul className="space-y-3 mb-8 list-none">
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Authority</span> — Who authorized this action? Delegation chains trace permission from a human decision-maker to the agent that acted.
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Accountability</span> — Who is responsible for the outcome? Human-in-the-loop at decision boundaries, not buried in a log file.
          </li>
          <li className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">Auditability</span> — Can we prove what happened? Cryptographic attestation produces externally verifiable evidence.
          </li>
        </ul>

        <p className="text-[var(--text-primary)] text-lg font-medium border-l-2 border-[var(--primary)] pl-6 my-12">
          &ldquo;Authority without accountability is just permission. Permission without auditability is just hope.&rdquo;
        </p>

        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-20">
          Regulated industries can&apos;t deploy AI that operates in a black box. The question is never whether the model is capable — it&apos;s whether you can prove what it did, why it did it, and who said it could.
        </p>

        {/* Section B — What We're Building */}
        <section className="border-t border-[var(--edge)] pt-16">
          <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
            What We&apos;re Building
          </p>
          <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-6">
            Accountability Primitives
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12">
            Runestack provides the building blocks for AI systems that pass audit, not just benchmarks. Three primitives form the foundation.
          </p>

          <div className="space-y-10 mb-16">
            {primitives.map((p) => (
              <div key={p.name}>
                <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-3">
                  {p.name}
                </h3>
                <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-6">Target Environments</h3>
          <div className="space-y-4 mb-16">
            {targets.map((t) => (
              <p key={t.label} className="text-sm leading-relaxed">
                <span className="text-[var(--text-primary)] font-medium font-[family-name:var(--font-mono)]">
                  {t.label}
                </span>
                <span className="text-[var(--text-muted)]"> - {t.desc}</span>
              </p>
            ))}
          </div>

          <div className="space-y-2 mb-6">
            <p className="text-[var(--text-muted)] text-sm">
              Status: Building in the open. Core primitives under active development.
            </p>
            <p className="text-[var(--text-muted)] text-sm">
              More at{' '}
              <a
                href="https://runestack.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline underline-offset-4"
              >
                runestack.ai
              </a>
            </p>
          </div>
        </section>

        {/* Section C — Voice Demo Stub */}
        <section className="border-t border-[var(--edge)] pt-16 mt-20">
          <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
            Demo
          </p>
          <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-6">
            Experience a Governed Agent
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
            A voice-enabled AI agent operating under full governance constraints — delegation chains, signed receipts, and real-time audit. Built on LiveKit, LangGraph, Deepgram ASR, and ElevenLabs TTS.
          </p>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4">
            The demo will showcase an agent that can answer questions about your environment, execute controlled actions, and produce a verifiable audit trail of everything it did and why.
          </p>

          <div className="border border-[var(--edge)] px-6 py-8 mt-8">
            <p className="text-[var(--text-primary)] text-lg font-semibold mb-3">
              Coming Soon
            </p>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
              The interactive demo is under development. If you&apos;d like early access, reach out directly.
            </p>
            <Link
              href="/#contact"
              className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
            >
              Request Early Access →
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
