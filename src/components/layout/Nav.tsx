'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useUIStore } from '@/stores/ui'

const navLinks = [
  { label: 'Work', href: '/enterprise' },
  { label: 'Resume', href: '/resume.pdf' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/#contact' },
]

export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isHome = pathname === '/'

  // On the home page the name lives in the hero and merges into the bar on
  // scroll (Hero drives heroHandoff 0→1). Everywhere else it's always present.
  const heroHandoff = useUIStore((s) => s.heroHandoff)
  const nameOpacity = isHome ? heroHandoff : 1
  const nameHidden = nameOpacity < 0.05

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-5 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--edge)]">
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between">
        <Link
          href="/"
          aria-hidden={nameHidden}
          tabIndex={nameHidden ? -1 : undefined}
          style={{ opacity: nameOpacity }}
          className={`text-[var(--text-primary)] text-lg font-semibold tracking-tight ${
            nameHidden ? 'pointer-events-none' : ''
          }`}
        >
          Nathan Walker
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const className = `text-sm transition-colors ${
              pathname === item.href
                ? 'text-[var(--text-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`
            if (item.href.endsWith('.pdf')) {
              return (
                <a key={item.label} href={item.href} className={className}>
                  {item.label}
                </a>
              )
            }
            return (
              <Link key={item.label} href={item.href} className={className}>
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <path d="M18 6L6 18" />
                <path d="M6 6L18 18" />
              </>
            ) : (
              <>
                <path d="M4 7H20" />
                <path d="M4 12H20" />
                <path d="M4 17H20" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 py-6 border-t border-[var(--edge)] space-y-4">
          {navLinks.map((item) => {
            const className =
              'block text-[var(--text-secondary)] text-sm hover:text-[var(--text-primary)] transition-colors'
            if (item.href.endsWith('.pdf')) {
              return (
                <a key={item.label} href={item.href} className={className}>
                  {item.label}
                </a>
              )
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={className}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
