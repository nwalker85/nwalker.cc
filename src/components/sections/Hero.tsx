'use client'

import { useEffect, useRef, useState } from 'react'
import { useUIStore } from '@/stores/ui'

export function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const setHeroHandoff = useUIStore((s) => s.setHeroHandoff)
  const [nameOpacity, setNameOpacity] = useState(1)
  const [hintOpacity, setHintOpacity] = useState(0)

  useEffect(() => {
    const navEl = document.querySelector('nav')
    const navH = navEl instanceof HTMLElement ? navEl.offsetHeight : 72
    // The crossfade zone: as the hero name's top rises from just below the bar
    // (start) to tucked under it (end), it hands off to the sticky nav name.
    const start = navH + 64
    const end = navH - 8

    let hintReady = false
    let frame = 0
    let lastHandoff = -1

    function measure() {
      frame = 0
      const scrollY = window.scrollY

      const el = nameRef.current
      if (el) {
        const top = el.getBoundingClientRect().top
        const raw = (start - top) / (start - end)
        const p = Math.min(1, Math.max(0, raw))
        const q = Math.round(p * 20) / 20 // quantize to 0.05 to limit re-renders
        if (q !== lastHandoff) {
          lastHandoff = q
          setNameOpacity(1 - q)
          setHeroHandoff(q)
        }
      }

      // Gentle, capped hint that fades as soon as the visitor scrolls.
      const base = Math.max(0, Math.min(1, 1 - scrollY / 100)) * 0.7
      setHintOpacity(hintReady ? base : 0)
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure() // initial sync (hint stays hidden until the delay below)
    const revealTimer = setTimeout(() => {
      hintReady = true
      measure()
    }, 1200)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      clearTimeout(revealTimer)
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      setHeroHandoff(0) // reset so non-home pages always show the nav name
    }
  }, [setHeroHandoff])

  // 72px = the global body pt-[72px] that clears the fixed nav, so the hero
  // fills exactly the area below it and the scroll hint lands on-screen.
  return (
    <section className="min-h-[calc(100dvh-72px)] flex items-center relative">
      <div className="max-w-[1200px] mx-auto px-8 w-full">
        <div className="max-w-[720px]">
          <h1
            ref={nameRef}
            id="hero-name"
            style={{ opacity: nameOpacity }}
            className="text-[var(--text-primary)] text-4xl md:text-5xl font-light tracking-tight leading-tight mb-4 will-change-[opacity]"
          >
            Nathan Walker
          </h1>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl mb-16">
            AI Governance &amp; Enterprise Platforms
          </p>
          <div className="space-y-2">
            <p className="text-[var(--text-primary)] text-xl md:text-2xl font-light leading-relaxed">
              AI eliminated the cost of building.
            </p>
            <p className="text-[var(--text-primary)] text-xl md:text-2xl font-light leading-relaxed">
              It did not eliminate the cost of being <em>wrong.</em>
            </p>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        style={{ opacity: hintOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-muted)] text-sm tracking-widest transition-opacity duration-700 ease-out pointer-events-none"
      >
        Scroll ↓
      </div>
    </section>
  )
}
