const recognitions = [
  {
    org: 'Everest Group',
    detail: 'PEAK Matrix® Leader for Conversational AI and AI Agents in CXM, 2025',
    href: 'https://www.soundhound.com/everest-group-peak-matrix-leader-2025/',
  },
  {
    org: 'IDC MarketScape',
    detail: 'Leader, Conversational AI Platforms, 2025',
    href: 'https://www.soundhound.com/idc-marketscape-leader-2025/',
  },
  {
    org: 'Gartner',
    detail: 'Magic Quadrant™ Visionary, Conversational AI Platforms, 2025',
    href: 'https://www.soundhound.com/gartner-magic-quadrant-conversational-ai-2025/',
  },
]

export function AnalystRecognition() {
  return (
    <div>
      <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-6">
        2025 Analyst Recognition
      </p>
      <ul className="space-y-4 mb-8 list-none">
        {recognitions.map((r) => (
          <li key={r.org}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <span className="text-[var(--text-primary)] text-base font-medium group-hover:underline underline-offset-4">
                {r.org}
              </span>
              <span className="text-[var(--text-muted)] text-base"> — {r.detail}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4">
        Pipeline, response platform, briefings, and live demos delivered end-to-end at SoundHound AI, where I led global sales engineering.
      </p>
      <p className="text-[var(--text-muted)] text-xs leading-relaxed">
        Analyst recognitions refer to SoundHound AI. I led the 2025 cycle (Everest PEAK Leader, IDC
        MarketScape Leader, Gartner MQ Visionary). The platform was named a Gartner MQ Leader in 2026
        after I left. Gartner and Magic Quadrant are registered trademarks of Gartner, Inc. and/or its
        affiliates and are used herein with permission via licensed vendor landing pages.
      </p>
    </div>
  )
}
