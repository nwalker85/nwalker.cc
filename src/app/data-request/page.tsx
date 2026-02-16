import type { Metadata } from 'next'

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
          We will verify your identity and respond within 30 days of receiving your request, as required by applicable law. If you have questions, contact us at{' '}
          <a href="mailto:privacy@nwalker.cc" className="text-[var(--primary)] hover:underline underline-offset-4">
            privacy@nwalker.cc
          </a>.
        </p>

        <form
          action="https://formsubmit.co/privacy@nwalker.cc"
          method="POST"
          className="space-y-6"
        >
          <input type="hidden" name="_subject" value="Data Subject Access Request — nwalker.cc" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" className="hidden" />
          <input type="hidden" name="_next" value="https://nwalker.cc/data-request?submitted=true" />

          <div>
            <label htmlFor="name" className="block text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full bg-[var(--surface)] border border-[var(--edge)] rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
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
              className="w-full bg-[var(--surface)] border border-[var(--edge)] rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
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
              className="w-full bg-[var(--surface)] border border-[var(--edge)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-colors appearance-none"
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
              className="w-full bg-[var(--surface)] border border-[var(--edge)] rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
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
              className="w-full bg-[var(--surface)] border border-[var(--edge)] rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
              placeholder="Provide any additional context about your request"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            Submit Request
          </button>

          <p className="text-[var(--text-muted)] text-xs leading-relaxed">
            By submitting this form, you confirm that the information provided is accurate. We may contact you to verify your identity before processing your request. See our{' '}
            <a href="/legal/privacy" className="text-[var(--primary)] hover:underline underline-offset-4">Privacy Policy</a>{' '}
            for more information about how we handle personal data.
          </p>
        </form>
      </div>
    </main>
  )
}
