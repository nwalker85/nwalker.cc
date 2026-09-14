'use client'

import { usePathname } from 'next/navigation'

// A pure-CSS fade keyed on the pathname: each navigation mounts a fresh element
// whose keyframe runs exactly once (0 → 1). There's no animation-library
// lifecycle, so the new page can't flash in, fade out, then fade back in (the
// App Router exit-animation bug). A re-render of the same route keeps the same
// element, so the animation never replays mid-stay.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div key={pathname} className="page-fade-in">
      {children}
    </div>
  )
}
