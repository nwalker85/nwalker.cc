import Link from 'next/link'
import { AnalystRecognition } from './AnalystRecognition'

const metrics = [
  { value: '$50M+', label: 'Enterprise revenue delivered' },
  { value: '38%', label: 'POC → Deal conversion' },
  { value: '$17M', label: 'Visionworks' },
  { value: '$9M', label: 'Southern California Edison' },
  { value: '100+', label: 'Enterprise deployments' },
  { value: '3 → 50+', label: 'Global presales organization' },
]

export function EnterpriseProof() {
  return (
    <section className="py-32 px-8 border-t border-[var(--edge)]">
      <div className="max-w-[720px] mx-auto">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Proof of Judgment
        </p>
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-16">
          Where This Judgment Was Earned
        </h2>
        <div className="space-y-6 mb-16">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-baseline gap-6">
              <span className="font-[family-name:var(--font-mono)] text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight min-w-[140px]">
                {m.value}
              </span>
              <span className="text-[var(--text-muted)] text-base">
                {m.label}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12">
          Earned as Senior Director of AI for Enterprise &amp; Global Solution Architecture at
          SoundHound AI / Amelia. Named rooms include Visionworks, Southern California Edison,
          Chipotle, McKesson HR Operations, and a multi-round HCA RFP for IT Service Desk and HR
          across a multi-site workforce.
        </p>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12">
          I&apos;ve watched systems succeed at scale. I&apos;ve also watched them fail under regulatory pressure. The difference is rarely implementation. It is judgment.
        </p>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12">
          These systems operated under regulatory scrutiny, contractual obligation, and executive visibility.
        </p>
        <div className="border-t border-[var(--edge)] pt-12 mb-12">
          <AnalystRecognition />
        </div>
        <Link
          href="/enterprise"
          className="text-[var(--primary)] text-base font-medium hover:underline underline-offset-4"
        >
          View Enterprise Work →
        </Link>
      </div>
    </section>
  )
}
