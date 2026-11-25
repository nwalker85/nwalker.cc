import type { Metadata } from 'next'
import shippedData from '@/data/shipped.json'
import { ShippedClient, type ShipItem } from './ShippedClient'

export const metadata: Metadata = {
  title: 'Shipped | Nathan Walker',
  description:
    'Evidentiary record of 295 shipped capabilities across 198 sovereign engines between June and November 2026.',
  alternates: {
    canonical: '/shipped',
  },
  openGraph: {
    type: 'website',
    url: '/shipped',
    title: 'Shipped — Evidentiary Record',
    description:
      'Two hundred ninety-five attributable engineering capabilities delivered across one hundred ninety-eight sovereign engines.',
  },
}

export default function ShippedPage() {
  const ships = shippedData as ShipItem[]

  return (
    <main className="px-8">
      <div className="max-w-[720px] mx-auto py-32">
        {/* Page Header */}
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Evidentiary Record
        </p>
        <h1 className="text-[var(--text-primary)] text-3xl md:text-4xl font-semibold tracking-tight mb-6">
          Shipped
        </h1>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4">
          Two hundred ninety-five attributable engineering capabilities delivered across one hundred ninety-eight sovereign engines between June and November 2026.
        </p>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">
          Every entry represents production code landed to a default branch, verified in runtime, and governed by deterministic contracts. Filterable by technological sphere, architecture doctrine, and subsystem.
        </p>

        {/* Client Interactive Controls & Stream */}
        <ShippedClient ships={ships} />
      </div>
    </main>
  )
}
