'use client'

import { FormEvent, useState } from 'react'
import { INTAKE_ENDPOINT } from '@/lib/intake'

const links = [
  { label: 'LinkedIn', value: 'linkedin.com/in/nwalker85', href: 'https://linkedin.com/in/nwalker85' },
  { label: 'GitHub', value: 'github.com/nwalker85', href: 'https://github.com/nwalker85' },
]

const inputClassName =
  'w-full bg-[var(--surface)] border border-[var(--edge)] rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors'

type ContactFields = {
  name: string
  email: string
  message: string
}

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return

    const fields: ContactFields = {
      name: String(new FormData(form).get('name') ?? '').trim(),
      email: String(new FormData(form).get('email') ?? '').trim(),
      message: String(new FormData(form).get('message') ?? '').trim(),
    }

    if (!fields.name || !fields.email || !fields.message) return

    setStatus('sending')

    try {
      const res = await fetch(INTAKE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          reply_email: fields.email,
          message: fields.message,
          source_property: 'nwalker.cc',
          lane: 'personal',
        }),
      })
      if (!res.ok) throw new Error(`intake returned ${res.status}`)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-32 px-8 border-t border-[var(--edge)]">
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-6">
            Work With Me
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4">
            I work where durability is non-negotiable.
          </p>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
            If you are deploying AI in environments where mistakes carry commercial or regulatory consequence, I&apos;m interested.
          </p>
          <div className="space-y-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-xs font-medium tracking-widest uppercase block mb-1">{link.label}</span>
                <span className="text-[var(--text-secondary)]">{link.value}</span>
              </a>
            ))}
          </div>
        </div>
        {status === 'sent' ? (
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed self-center">
            Message received. I&apos;ll follow up at the email you provided.
          </p>
        ) : (
          <form className="space-y-6" onSubmit={onSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className={inputClassName}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className={inputClassName}
            />
            <textarea
              name="message"
              placeholder="Message"
              required
              rows={5}
              className={`${inputClassName} resize-none`}
            />
            {status === 'error' ? (
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                The form did not send. Use LinkedIn, or try again.
              </p>
            ) : null}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-[var(--primary)] text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-default"
            >
              {status === 'sending' ? 'Sending…' : 'Start a Conversation'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
