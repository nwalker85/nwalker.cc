import type { Metadata } from 'next'
import Link from 'next/link'
import { AnalystRecognition } from '@/components/sections/AnalystRecognition'

export const metadata: Metadata = {
  title: 'Enterprise Work | Nathan Walker',
  description:
    'Executive sales engineering leadership: enterprise wins, organizational scaling, platform expertise, and governance under regulatory constraint.',
  alternates: {
    canonical: '/enterprise',
  },
}

const wins = [
  '$17M Visionworks — largest deal in company history at signing.',
  '$9M Southern California Edison — competitive displacement, closed through technical differentiation and a discovery-led demo strategy.',
  '$6.25M Chipotle — innovation deal.',
  'McKesson HR Operations — Salesforce-integrated conversational AI, including A/B-tested DNN intent classifiers.',
  'HCA — downselected through a multi-round RFP for enterprise IT Service Desk and HR across a multi-site workforce.',
  'Healthcare-led book: 20+ accounts across payer, provider-IDN, DSO-specialty, RCM, ambulatory, vision, and home-health verticals.',
]

const platforms = [
  { area: 'Contact center', items: 'Genesys, NICE, Five9, Talkdesk, AWS Connect, custom SIP — selected across competing CCaaS, ASR/TTS, and LLM stacks' },
  { area: 'Healthcare systems', items: 'Epic, Cerner, Meditech' },
  { area: 'Interoperability', items: 'FHIR, HL7, OAuth2/SAML, MCP-mediated agent-to-data access patterns' },
  { area: 'Voice AI', items: '100+ enterprise deployments — IVR/ACD, real-time ASR/TTS, and voice UX (turn-taking, barge-in, DTMF fallback, disambiguation)' },
  { area: 'Applied ML', items: 'TensorFlow, PyTorch, and BERT intent classifiers — training-data curation, F1/precision/recall, confusion matrices, production iteration' },
]

const governance = [
  'HIPAA / HITECH',
  'GDPR',
  'EU AI Act',
  'NIST AI RMF',
  'ISO/IEC 42001',
]

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight mb-6">
      {children}
    </h2>
  )
}

export default function EnterprisePage() {
  return (
    <main className="px-8">
      <div className="max-w-[720px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Enterprise Work
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-4xl font-light tracking-tight leading-tight mb-16">
          Systems and organizations built under consequence.
        </h1>

        <section className="border-t border-[var(--edge)] py-12">
          <SectionHeading>Leadership Scope</SectionHeading>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
            Fifteen-plus years building, scaling, and operating customer-facing technical
            organizations. Built a global sales engineering practice from a 3-person regional
            team to 50+ across NA, EMEA, APAC, and LATAM — with the playbooks, certification
            paths, enablement curricula, and operating cadence to sustain it.
          </p>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            $50M+ in influenced enterprise revenue across voice AI, automation, and agentic
            systems. The motion is deal engineering: discovery, PoC design, evaluation,
            competitive positioning, executive narrative, and close — architected at the
            whiteboard with C-suite stakeholders.
          </p>
        </section>

        <section className="border-t border-[var(--edge)] py-12">
          <SectionHeading>Enterprise Wins</SectionHeading>
          <ul className="space-y-4 mb-8 list-none">
            {wins.map((w) => (
              <li key={w} className="text-[var(--text-secondary)] text-lg leading-relaxed">
                {w}
              </li>
            ))}
          </ul>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            38% POC-to-deal conversion under{' '}
            <Link
              href="/frameworks/architecting-certainty"
              className="text-[var(--primary)] font-medium hover:underline underline-offset-4"
            >
              Architecting Certainty
            </Link>
            {' '}and a structured POC governance and evaluation framework — measured as
            closed deals over structured proofs-of-concept run, with golden-dataset
            methodology that improved the overall sales win rate.
          </p>
        </section>

        <section className="border-t border-[var(--edge)] py-12">
          <SectionHeading>Organizational Scaling</SectionHeading>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            3 → 10 → 50+ engineers across four business units and four regions. Golden Demo
            Library with automated provisioning reduced demo preparation by 40+ hours per
            quarter across the organization. Communities of Practice and certification paths
            turned individual judgment into institutional capability.
          </p>
        </section>

        <section className="border-t border-[var(--edge)] py-12">
          <SectionHeading>Platform Expertise</SectionHeading>
          <ul className="space-y-4 list-none">
            {platforms.map((p) => (
              <li key={p.area} className="text-lg leading-relaxed">
                <span className="text-[var(--text-primary)] font-medium">{p.area}.</span>{' '}
                <span className="text-[var(--text-secondary)]">{p.items}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-[var(--edge)] py-12">
          <SectionHeading>Governance and Compliance</SectionHeading>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
            Enterprise AI delivered inside regulatory boundaries, not around them. Working
            fluency across the frameworks that govern high-stakes deployments:
          </p>
          <ul className="space-y-3 mb-6 list-none">
            {governance.map((g) => (
              <li key={g} className="text-[var(--text-muted)] text-lg">
                {g}
              </li>
            ))}
          </ul>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            Plus matrix experience across 20+ additional control frameworks in payer, provider,
            utility, and financial-services engagements.
          </p>
        </section>

        <section className="border-t border-[var(--edge)] py-12">
          <AnalystRecognition />
        </section>
      </div>
    </main>
  )
}
