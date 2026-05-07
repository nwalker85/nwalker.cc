'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

interface NavDropdown {
  label: string
  items: { label: string; href: string; desc: string }[]
}

interface NavLink {
  label: string
  href: string
}

const dropdowns: NavDropdown[] = [
  {
    label: 'Thinking',
    items: [
      { label: 'Philosophy', href: '/philosophy', desc: 'Frameworks, methodologies, and manifestos' },
      { label: 'Architecture', href: '/architecture', desc: 'Systems philosophy and infrastructure proof' },
      { label: 'Definitions', href: '/definitions', desc: 'Canonical AI governance vocabulary' },
      { label: 'Frameworks', href: '/frameworks', desc: 'Named models for accountable AI systems' },
      { label: 'Patterns', href: '/patterns', desc: 'Reusable enterprise AI architecture patterns' },
    ],
  },
  {
    label: 'Work',
    items: [
      { label: 'Enterprise', href: '/enterprise', desc: 'Selected projects built and shipped' },
      { label: 'Runestack', href: '/runestack', desc: 'Accountability layer for AI agents' },
      { label: 'Ecosystem', href: '/ecosystem', desc: 'Domain, company, product, and concept map' },
    ],
  },
]

const directLinks: NavLink[] = [
  { label: 'Resume', href: '/resume.pdf' },
  { label: 'Contact', href: '/#contact' },
]

function DropdownItem({ dropdown }: { dropdown: NavDropdown }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const pathname = usePathname()

  const isActive = dropdown.items.some((item) => pathname === item.href)

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-1 text-sm transition-colors cursor-pointer ${
          isActive
            ? 'text-[var(--text-primary)]'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
      >
        {dropdown.label}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={`absolute top-full left-0 pt-3 transition-all duration-200 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <div className="bg-[var(--surface)] border border-[var(--edge)] rounded-lg py-2 min-w-[240px] shadow-xl shadow-black/20">
          {dropdown.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 hover:bg-[var(--surface-variant)] transition-colors"
            >
              <span className="text-[var(--text-primary)] text-sm font-medium block">
                {item.label}
              </span>
              <span className="text-[var(--text-muted)] text-xs block mt-0.5">
                {item.desc}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

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
          {dropdowns.map((dd) => (
            <DropdownItem key={`${dd.label}-${pathname}`} dropdown={dd} />
          ))}
          {directLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[var(--text-secondary)] text-sm hover:text-[var(--text-primary)] transition-colors"
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
        <div className="px-8 py-6 border-t border-[var(--edge)] space-y-6">
          {dropdowns.map((dd) => (
            <div key={dd.label}>
              <p className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-3">
                {dd.label}
              </p>
              <div className="space-y-3 pl-2">
                {dd.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-[var(--text-secondary)] text-sm hover:text-[var(--text-primary)] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="space-y-3 pt-2 border-t border-[var(--edge)]">
            {directLinks.map((item) => (
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
      </div>
    </nav>
  )
}
