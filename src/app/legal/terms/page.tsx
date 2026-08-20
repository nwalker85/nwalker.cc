import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use | Nathan Walker',
  description: 'Terms of use for nwalker.cc.',
}

export default function TermsPage() {
  return (
    <main className="px-8">
      <div className="max-w-[720px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Legal
        </p>
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-8">
          Terms of Use
        </h2>
        <div className="space-y-6 text-[var(--text-secondary)] text-base leading-relaxed">
          <p>
            Last updated: February 2026
          </p>
          <p>
            This website (nwalker.cc) is a personal portfolio and professional presence for Nathan Walker. By accessing this site, you agree to the following terms.
          </p>
          <h3 className="text-[var(--text-primary)] text-lg font-semibold pt-4">Use of Content</h3>
          <p>
            All content on this site &mdash; including text, frameworks, methodologies, and architectural descriptions &mdash; is the intellectual property of Nathan Walker unless otherwise noted. You may reference or cite this content with attribution. You may not reproduce it for commercial purposes without written permission.
          </p>
          <h3 className="text-[var(--text-primary)] text-lg font-semibold pt-4">No Warranty</h3>
          <p>
            This site is provided &ldquo;as is&rdquo; without warranty of any kind. Technical content, frameworks, and architectural patterns are shared for informational purposes and do not constitute professional advice.
          </p>
          <h3 className="text-[var(--text-primary)] text-lg font-semibold pt-4">Third-Party Links</h3>
          <p>
            This site may contain links to external websites. I am not responsible for the content or privacy practices of those sites.
          </p>
          <h3 className="text-[var(--text-primary)] text-lg font-semibold pt-4">Contact</h3>
          <p>
            Questions about these terms can be directed to{' '}
            <a href="mailto:nate@nwalker.cc" className="text-[var(--primary)] hover:underline underline-offset-4">
              nate@nwalker.cc
            </a>.
          </p>
        </div>
      </div>
    </main>
  )
}
