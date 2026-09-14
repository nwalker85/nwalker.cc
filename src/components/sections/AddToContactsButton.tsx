'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'

export const VCARD_PATH = '/nathan-walker.vcf'

// iOS Safari ignores `download` on same-origin links in older versions and, in
// newer ones, forces a file save instead of handing the vCard to Contacts.
// Served as text/vcard (see next.config.ts), a plain navigation opens the
// "New Contact" sheet directly. Everywhere else `download` is the better UX.
export function isIOS(ua: string, maxTouchPoints: number, platform: string): boolean {
  if (/iPhone|iPad|iPod/i.test(ua)) return true
  // iPadOS 13+ reports as Macintosh but exposes touch points.
  return platform === 'MacIntel' && maxTouchPoints > 1
}

function subscribeNoop() {
  return () => {}
}

export function AddToContactsButton() {
  // Server renders without `download` (the iOS-safe path); the client swaps it
  // in after hydration on non-iOS platforms.
  const useDownload = useSyncExternalStore(
    subscribeNoop,
    () => !isIOS(navigator.userAgent, navigator.maxTouchPoints ?? 0, navigator.platform ?? ''),
    () => false,
  )

  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href={VCARD_PATH}
        download={useDownload ? 'nathan-walker.vcf' : undefined}
        type="text/vcard"
        className="inline-flex items-center justify-center bg-[var(--primary)] text-white font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
      >
        Add to contacts
      </a>
      <Link
        href="/contact/qr"
        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm transition-colors underline-offset-4 hover:underline"
      >
        Show QR
      </Link>
    </div>
  )
}
