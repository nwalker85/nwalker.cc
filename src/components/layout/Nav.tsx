'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Runestack', href: '/runestack' },
  { label: 'Contact', href: '/#contact' },
]

export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    if (!isHome) return
    function onScroll() {
      setScrolled(window.scrollY > 100)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const showName = !isHome || scrolled

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-5 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--edge)]">
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between">
        <Link
          href="/"
          className={`text-[var(--text-primary)] text-lg font-semibold tracking-tight transition-opacity duration-300 ${
            showName ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Nathan Walker
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname === item.href
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {item.label}
            </Link>
          ))}
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
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-[var(--text-secondary)] text-sm hover:text-[var(--text-primary)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
