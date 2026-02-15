import Link from 'next/link'

const navItems = [
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Runestack', href: '/runestack' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/#contact' },
]

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-5 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--edge)]">
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between">
        <Link href="/" className="text-[var(--text-primary)] text-lg font-semibold tracking-tight">
          Nathan Walker
        </Link>
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-[var(--text-secondary)] text-sm hover:text-[var(--text-primary)] transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
