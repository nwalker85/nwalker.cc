import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Nathan Walker',
  description: 'Cookie policy for nwalker.cc — how we use cookies and tracking technologies.',
}

export default function CookiesPage() {
  return (
    <main className="px-8">
      <div className="max-w-[720px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Legal
        </p>
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          Cookie Policy
        </h2>
        <p className="text-[var(--text-muted)] text-sm mb-8">
          Last updated: January 1, 2026
        </p>

        <div className="space-y-6 text-[var(--text-secondary)] text-base leading-relaxed">
          <p>
            This Cookie Policy explains how Ravenhelm, LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) uses cookies and similar technologies when you visit nwalker.cc. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <h3 className="text-[var(--text-primary)] text-lg font-semibold pt-4">What Are Cookies?</h3>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, Ravenhelm, LLC) are called &ldquo;first-party cookies.&rdquo; Cookies set by parties other than the website owner are called &ldquo;third-party cookies.&rdquo; Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., analytics, interactive content, and advertising).
          </p>

          <h3 className="text-[var(--text-primary)] text-lg font-semibold pt-4">Cookies We Use</h3>

          <div className="space-y-6">
            <div>
              <h4 className="text-[var(--text-primary)] font-medium mb-2">Essential Cookies</h4>
              <p>
                These cookies are strictly necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site may not work as a result.
              </p>
            </div>

            <div>
              <h4 className="text-[var(--text-primary)] font-medium mb-2">Analytics Cookies</h4>
              <p>
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous.
              </p>
              <p className="mt-2">
                We may use Google Analytics for this purpose. To opt out of being tracked by Google Analytics across all websites, visit{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline underline-offset-4">
                  tools.google.com/dlpage/gaoptout
                </a>.
              </p>
            </div>
          </div>

          <p>
            We do not use advertising cookies, social media tracking pixels, or any cookies for the purpose of targeted advertising.
          </p>

          <h3 className="text-[var(--text-primary)] text-lg font-semibold pt-4">How to Control Cookies</h3>
          <p>
            You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser&apos;s help menu for more information.
          </p>

          <h3 className="text-[var(--text-primary)] text-lg font-semibold pt-4">Do-Not-Track</h3>
          <p>
            Some browsers include a Do-Not-Track (&ldquo;DNT&rdquo;) feature. Because there is no accepted standard for how to respond to DNT signals, our website does not currently respond to DNT browser signals.
          </p>

          <h3 className="text-[var(--text-primary)] text-lg font-semibold pt-4">Updates to This Policy</h3>
          <p>
            We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>

          <h3 className="text-[var(--text-primary)] text-lg font-semibold pt-4">Contact</h3>
          <p>
            If you have questions about our use of cookies or other technologies, please contact us at{' '}
            <a href="mailto:nate@nwalker.cc" className="text-[var(--primary)] hover:underline underline-offset-4">
              nate@nwalker.cc
            </a>.
          </p>

          <p className="text-[var(--text-muted)] text-sm pt-4">
            For more information about how we handle your personal data, see our{' '}
            <a href="/legal/privacy" className="text-[var(--primary)] hover:underline underline-offset-4">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </main>
  )
}
