'use client'

import { useState, useMemo } from 'react'

export type ShipItem = {
  id: string
  date: string
  week: string
  month: string
  shipped: string
  impact: string
  repos: string[]
  spheres: string[]
  isMilestone: boolean
  milestoneTitle?: string
  milestoneShort?: string
  milestoneKind?: string
}

const SPHERES = [
  { id: 'all', label: 'All Spheres' },
  { id: 'execution', label: 'Execution' },
  { id: 'platform', label: 'Platform' },
  { id: 'topology', label: 'Topology' },
  { id: 'sensors', label: 'Sensors' },
  { id: 'voice', label: 'Voice' },
  { id: 'identity', label: 'Identity' },
]

const MONTH_NAMES: Record<string, string> = {
  '2026-11': 'November 2026',
  '2026-10': 'October 2026',
  '2026-09': 'September 2026',
  '2026-08': 'August 2026',
  '2026-07': 'July 2026',
  '2026-06': 'June 2026',
}

const METRICS = [
  { label: 'Dated Ships', value: '295 capabilities delivered across 24 active weeks' },
  { label: 'Engines Managed', value: '198 sovereign engines (55 actively narrated in production)' },
  { label: 'Active Days', value: '116 working days with attributable verified ships' },
  { label: 'Doctrines', value: '75 architectural inventions and governance patterns' },
  { label: 'Peak Velocity', value: 'September 2026 (99 verified capability ships)' },
  { label: 'Longest Streak', value: '22 consecutive calendar days of continuous deployment' },
]

export function ShippedClient({ ships }: { ships: ShipItem[] }) {
  const [search, setSearch] = useState('')
  const [selectedSphere, setSelectedSphere] = useState('all')
  const [milestonesOnly, setMilestonesOnly] = useState(false)

  // Sort descending by date
  const sorted = useMemo(() => {
    return [...ships].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
  }, [ships])

  // Filter based on controls
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return sorted.filter((item) => {
      if (milestonesOnly && !item.isMilestone) return false
      if (selectedSphere !== 'all' && !item.spheres.includes(selectedSphere)) return false
      if (q) {
        const inShipped = item.shipped.toLowerCase().includes(q)
        const inImpact = item.impact.toLowerCase().includes(q)
        const inRepos = item.repos.some((r) => r.toLowerCase().includes(q))
        const inMilestone = (item.milestoneTitle || '').toLowerCase().includes(q) ||
                            (item.milestoneShort || '').toLowerCase().includes(q)
        if (!inShipped && !inImpact && !inRepos && !inMilestone) return false
      }
      return true
    })
  }, [sorted, search, selectedSphere, milestonesOnly])

  // Group filtered items by month
  const groupedByMonth = useMemo(() => {
    const map = new Map<string, ShipItem[]>()
    for (const item of filtered) {
      const month = item.month
      const list = map.get(month) || []
      list.push(item)
      map.set(month, list)
    }
    return Array.from(map.entries())
  }, [filtered])

  return (
    <div className="space-y-16">
      {/* Metrics Section */}
      <section className="border-t border-[var(--edge)] pt-12">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Delivery Metrics
        </p>
        <div className="space-y-3">
          {METRICS.map((m) => (
            <div key={m.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
              <span className="text-[var(--text-primary)] font-medium text-sm font-[family-name:var(--font-mono)] sm:w-[160px] shrink-0">
                {m.label}
              </span>
              <span className="text-[var(--text-muted)] text-sm leading-relaxed">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="border-t border-[var(--edge)] pt-12">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by capability, repository, or doctrine..."
                className="w-full px-3.5 py-2 text-sm bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--edge)] rounded placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Milestone Toggle */}
            <button
              type="button"
              onClick={() => setMilestonesOnly(!milestonesOnly)}
              className={`px-3 py-1.5 text-xs font-[family-name:var(--font-mono)] rounded border transition-colors ${
                milestonesOnly
                  ? 'bg-[var(--primary-glow)] border-[var(--primary)] text-[var(--primary-light)]'
                  : 'bg-[var(--surface)] border-[var(--edge)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {milestonesOnly ? '● Doctrines Only' : '○ Doctrines Only'}
            </button>
          </div>

          {/* Spheres Selector */}
          <div className="flex flex-wrap gap-2">
            {SPHERES.map((sphere) => {
              const active = selectedSphere === sphere.id
              return (
                <button
                  key={sphere.id}
                  type="button"
                  onClick={() => setSelectedSphere(sphere.id)}
                  className={`px-2.5 py-1 text-xs font-[family-name:var(--font-mono)] rounded border transition-colors ${
                    active
                      ? 'bg-[var(--surface-variant)] border-[var(--primary)] text-[var(--text-primary)]'
                      : 'bg-[var(--surface)] border-[var(--edge)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  {sphere.label}
                </button>
              )
            })}
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between text-xs font-[family-name:var(--font-mono)] text-[var(--text-muted)] pt-2">
            <span>
              Showing {filtered.length} of {ships.length} capabilities
            </span>
            {(search || selectedSphere !== 'all' || milestonesOnly) && (
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setSelectedSphere('all')
                  setMilestonesOnly(false)
                }}
                className="text-[var(--primary-light)] hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Stream */}
      <section className="space-y-16">
        {groupedByMonth.length === 0 ? (
          <div className="py-16 text-center border-t border-[var(--edge)]">
            <p className="text-[var(--text-muted)] text-sm">
              No capabilities match the selected filter criteria.
            </p>
          </div>
        ) : (
          groupedByMonth.map(([monthKey, items]) => (
            <div key={monthKey} className="border-t border-[var(--edge)] pt-8">
              <div className="flex items-baseline justify-between mb-8">
                <h2 className="text-[var(--text-primary)] text-xl font-medium tracking-tight">
                  {MONTH_NAMES[monthKey] || monthKey}
                </h2>
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]">
                  {items.length} {items.length === 1 ? 'ship' : 'ships'}
                </span>
              </div>

              <ul className="space-y-8 list-none">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="border-t border-[var(--edge)]/50 pt-6 first:border-0 first:pt-0"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]">
                        {item.date}
                      </span>
                      {item.repos.map((repo) => (
                        <span
                          key={repo}
                          className="font-[family-name:var(--font-mono)] text-xs px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--edge)] text-[var(--text-secondary)]"
                        >
                          {repo}
                        </span>
                      ))}
                      {item.isMilestone && (
                        <span className="font-[family-name:var(--font-mono)] text-xs px-2 py-0.5 rounded bg-[var(--primary-glow)] border border-[var(--primary)]/30 text-[var(--primary-light)]">
                          {item.milestoneShort || item.milestoneTitle || 'Doctrine'}
                        </span>
                      )}
                    </div>

                    <p className="text-[var(--text-primary)] text-base font-medium leading-snug">
                      {item.shipped}
                    </p>

                    {item.impact && (
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-2 pl-3 border-l-2 border-[var(--edge)]">
                        {item.impact}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  )
}
