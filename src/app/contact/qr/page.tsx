import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Contact Card | Nathan Walker',
  description: 'Scan to add Nathan Walker to your contacts.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/contact/qr' },
}

export default function ContactQrPage() {
  return (
    <main className="min-h-screen px-8 flex flex-col items-center justify-center text-center">
      <a href="/nathan-walker.vcf" aria-label="Open Nathan Walker's contact card">
        <Image
          src="/qr-contact.svg"
          alt="QR code linking to https://nwalker.cc/nathan-walker.vcf"
          width={512}
          height={512}
          priority
          unoptimized
          className="w-[min(80vw,70vh)] h-auto rounded-lg bg-white p-4"
        />
      </a>
      <h1 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mt-8">
        Nathan Walker
      </h1>
      <p className="text-[var(--text-muted)] text-sm tracking-widest uppercase mt-2">
        Scan to add contact
      </p>
    </main>
  )
}
