import type { Metadata } from 'next'
import Link from 'next/link'
import { DataRequestForm } from '@/components/sections/DataRequestForm'

export const metadata: Metadata = {
  title: 'Data Request | Nathan Walker',
  description: 'Submit a data subject access request — review, update, or delete your personal information.',
}

export default function DataRequestPage() {
  return (
    <main className="px-8">
      <div className="max-w-[720px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Privacy
        </p>
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          Data Subject Access Request
        </h2>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4">
          Under applicable data protection laws, you may have the right to request access to, correction of, or deletion of your personal information. Use this form to submit your request.
        </p>
        <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-12">
          We will verify your identity and respond within 30 days of receiving your request, as required by applicable law. If you have questions, use the{' '}
          <Link href="/#contact" className="text-[var(--primary)] hover:underline underline-offset-4">
            contact form
          </Link>
          .
        </p>

        <DataRequestForm />
      </div>
    </main>
  )
}
