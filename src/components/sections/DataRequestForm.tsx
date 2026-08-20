'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { INTAKE_ENDPOINT } from '@/lib/intake'

const inputClassName =
  'w-full bg-[var(--surface)] border border-[var(--edge)] rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors'

export function DataRequestForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return

    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const requestType = String(data.get('request_type') ?? '').trim()
    const state = String(data.get('state_of_residence') ?? '').trim()
    const details = String(data.get('details') ?? '').trim()
    if (!name || !email || !requestType) return

    setStatus('sending')
    try {
      const res = await fetch(INTAKE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          reply_email: email,
          message: [
            `DSAR: ${requestType}`,
            state ? `Residence: ${state}` : null,
            details || null,
          ]
            .filter(Boolean)
            .join('\n'),
          request_type: requestType,
          state_of_residence: state,
          source_property: 'nwalker.cc',
          lane: 'privacy',
        }),
      })
      if (!res.ok) throw new Error(`intake returned ${res.status}`)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
        Request received. We may contact you at the email you provided to verify identity.
      </p>
    )
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label htmlFor="name" className="block text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={inputClassName}
          placeholder="Your full legal name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={inputClassName}
          placeholder="The email associated with your data"
        />
      </div>

      <div>
        <label htmlFor="request_type" className="block text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-2">
          Request Type
        </label>
        <select
          id="request_type"
          name="request_type"
          required
          className={`${inputClassName} appearance-none`}
        >
          <option value="">Select a request type</option>
          <option value="access">Access my personal data</option>
          <option value="correction">Correct inaccuracies in my data</option>
          <option value="deletion">Delete my personal data</option>
          <option value="copy">Obtain a copy of my data</option>
          <option value="opt-out">Opt out of data processing</option>
          <option value="do-not-sell">Do not sell or share my personal information</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="state" className="block text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-2">
          State / Country of Residence
        </label>
        <input
          type="text"
          id="state"
          name="state_of_residence"
          className={inputClassName}
          placeholder="e.g., California, United Kingdom"
        />
      </div>

      <div>
        <label htmlFor="details" className="block text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-2">
          Additional Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          className={`${inputClassName} resize-none`}
          placeholder="Provide any additional context about your request"
        />
      </div>

      {status === 'error' ? (
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          The form did not send. Use the{' '}
          <Link href="/#contact" className="text-[var(--primary)] hover:underline underline-offset-4">
            contact form
          </Link>
          , or try again.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[var(--primary)] text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-default"
      >
        {status === 'sending' ? 'Sending…' : 'Submit Request'}
      </button>

      <p className="text-[var(--text-muted)] text-xs leading-relaxed">
        By submitting this form, you confirm that the information provided is accurate. We may contact you to verify your identity before processing your request. See our{' '}
        <a href="/legal/privacy" className="text-[var(--primary)] hover:underline underline-offset-4">Privacy Policy</a>{' '}
        for more information about how we handle personal data.
      </p>
    </form>
  )
}
