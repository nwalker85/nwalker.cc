import Link from 'next/link'

const legalLinks = [
  { label: 'Terms of Use', href: '/legal/terms' },
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Cookie Policy', href: '/legal/cookies' },
  { label: 'Data Request', href: '/data-request' },
  { label: 'Do Not Sell My Information', href: '/data-request' },
]

// The footer is the site's full secondary-nav surface (the primary nav is a
// flat five). `sub` items are detail pages shown indented under their parent.
const siteLinks: { label: string; href: string; sub?: boolean }[] = [
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Enterprise Work', href: '/enterprise' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Runestack', href: '/runestack' },
  { label: 'Definitions', href: '/definitions' },
  { label: 'Frameworks', href: '/frameworks' },
  { label: 'Architecting Certainty', href: '/frameworks/architecting-certainty', sub: true },
  { label: 'Patterns', href: '/patterns' },
  { label: 'Healthcare Voice AI', href: '/patterns/healthcare-voice-ai', sub: true },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Resume', href: '/resume.pdf' },
]

const ventureLinks = [
  { label: 'Ravenhelm', href: 'https://ravenhelm.co' },
  { label: 'Ravenhelm Consulting', href: 'https://ravenhelm.ai' },
  { label: 'Runestack', href: 'https://runestack.ai' },
  { label: 'DIS Spec', href: 'https://domainintelligenceschema.org' },
  { label: 'Artimetrics', href: 'https://artimetrics.ai' },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/nwalker85',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/nwalker85',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:nwalker85@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="py-16 px-8 border-t border-[var(--edge)]">
      <div className="max-w-[1200px] mx-auto">
        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-[var(--text-primary)] font-semibold text-lg block mb-3">
              Nathan Walker
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              AI governance, enterprise platforms, and systems that survive audit.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-4">
              Navigate
            </p>
            <ul className="space-y-3 list-none">
              {siteLinks.map((link) => (
                <li key={link.label} className={link.sub ? 'pl-3' : undefined}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors hover:text-[var(--text-primary)] ${
                      link.sub ? 'text-[var(--text-muted)]' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ventures */}
          <div>
            <p className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-4">
              Ventures
            </p>
            <ul className="space-y-3 list-none">
              {ventureLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] text-sm hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-4">
              Connect
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={link.label}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal links */}
        <div className="border-t border-[var(--edge)] pt-8 flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[var(--text-muted)] text-xs hover:text-[var(--text-secondary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[var(--text-muted)] text-xs">
            &copy; {new Date().getFullYear()} Nathan Walker. All rights reserved.
          </p>
          <p className="text-[var(--text-muted)] text-xs">
            Built with Next.js, deployed on AWS Fargate.
          </p>
        </div>
      </div>
    </footer>
  )
}
