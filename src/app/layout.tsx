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
  },
  twitter: {
    card: 'summary',
    title: 'Nathan Walker | AI Governance & Enterprise Platforms',
    description: 'AI eliminated the cost of building. It did not eliminate the cost of being wrong.',
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
