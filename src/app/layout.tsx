import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildPersonSchema, buildWebSiteSchema, createGraph } from '@/lib/seo/schema'
import { siteUrl } from '@/lib/seo/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Nathan Walker | AI Governance & Enterprise Platforms',
  description: 'AI eliminated the cost of building. It did not eliminate the cost of being wrong.',
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Nathan Walker', url: siteUrl }],
  creator: 'Nathan Walker',
  publisher: 'Nathan Walker',
  keywords: [
    'Nathan Walker',
    'nwalker.cc',
    'nwalker85',
    'accountable AI',
    'AI governance',
    'enterprise AI architecture',
    'Ravenhelm',
    'Runestack',
    'agentic systems',
    'AI auditability',
    'AI control plane',
    'platform engineering',
  ],
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'nwalker.cc',
    title: 'Nathan Walker | AI Governance & Enterprise Platforms',
    description: 'AI eliminated the cost of building. It did not eliminate the cost of being wrong.',
    // Site-wide default. Next inherits this into every page that does not set
    // its own openGraph.images, so one entry covers the whole site.
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: 'Nathan Walker — AI governance and enterprise platforms',
      },
    ],
  },
  twitter: {
    // summary renders a small square thumbnail; summary_large_image is what
    // actually shows a 1200x630 card. Without it the images above are wasted.
    card: 'summary_large_image',
    title: 'Nathan Walker | AI Governance & Enterprise Platforms',
    description: 'AI eliminated the cost of building. It did not eliminate the cost of being wrong.',
    images: ['/og/default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = createGraph([buildPersonSchema(), buildWebSiteSchema()])

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased pt-[72px]">
        <JsonLd data={structuredData} />
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  )
}
