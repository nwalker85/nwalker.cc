import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Nathan Walker',
  description: 'Privacy policy for nwalker.cc — how Ravenhelm, LLC collects, uses, and protects your information.',
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="pt-10">
      <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-4">{title}</h3>
      {children}
    </section>
  )
}

const tocItems = [
  { id: 'collect', label: '1. What information do we collect?' },
  { id: 'process', label: '2. How do we process your information?' },
  { id: 'legal-bases', label: '3. What legal bases do we rely on?' },
  { id: 'share', label: '4. When and with whom do we share your information?' },
  { id: 'cookies', label: '5. Do we use cookies and other tracking technologies?' },
  { id: 'ai', label: '6. Do we offer AI-based products?' },
  { id: 'retention', label: '7. How long do we keep your information?' },
  { id: 'security', label: '8. How do we keep your information safe?' },
  { id: 'minors', label: '9. Do we collect information from minors?' },
  { id: 'rights', label: '10. What are your privacy rights?' },
  { id: 'dnt', label: '11. Controls for Do-Not-Track features' },
  { id: 'us-rights', label: '12. Do US residents have specific privacy rights?' },
  { id: 'updates', label: '13. Do we make updates to this notice?' },
  { id: 'contact', label: '14. How can you contact us?' },
  { id: 'review', label: '15. How can you review, update, or delete your data?' },
]

export default function PrivacyPage() {
  return (
    <main className="px-8">
      <div className="max-w-[720px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Legal
        </p>
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          Privacy Policy
        </h2>
        <p className="text-[var(--text-muted)] text-sm mb-8">
          Last updated: January 1, 2026
        </p>

        <div className="space-y-6 text-[var(--text-secondary)] text-base leading-relaxed">
          <p>
            This Privacy Notice for Ravenhelm, LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), describes how and why we might access, collect, store, use, and/or share (&ldquo;process&rdquo;) your personal information when you use our services (&ldquo;Services&rdquo;), including when you:
          </p>
          <ul className="list-none space-y-2">
            <li>Visit our website at nwalker.cc or any website of ours that links to this Privacy Notice</li>
            <li>Engage with us in other related ways, including any marketing or events</li>
          </ul>
          <p>
            Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at{' '}
            <a href="mailto:nate@ravenhelm.co" className="text-[var(--primary)] hover:underline underline-offset-4">nate@ravenhelm.co</a>.
          </p>

          {/* Summary */}
          <div className="border-t border-[var(--edge)] pt-8 mt-8">
            <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-4">Summary of Key Points</h3>
            <ul className="list-none space-y-4">
              <li><span className="text-[var(--text-primary)] font-medium">What personal information do we process?</span> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</li>
              <li><span className="text-[var(--text-primary)] font-medium">Do we process any sensitive personal information?</span> We do not process sensitive personal information.</li>
              <li><span className="text-[var(--text-primary)] font-medium">Do we collect any information from third parties?</span> We do not collect any information from third parties.</li>
              <li><span className="text-[var(--text-primary)] font-medium">How do we process your information?</span> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</li>
              <li><span className="text-[var(--text-primary)] font-medium">How do we keep your information safe?</span> We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</li>
              <li><span className="text-[var(--text-primary)] font-medium">What are your rights?</span> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</li>
              <li><span className="text-[var(--text-primary)] font-medium">How do you exercise your rights?</span> The easiest way to exercise your rights is by visiting{' '}<a href="/data-request" className="text-[var(--primary)] hover:underline underline-offset-4">nwalker.cc/data-request</a>, or by contacting us.</li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="border-t border-[var(--edge)] pt-8 mt-8">
            <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-4">Table of Contents</h3>
            <ol className="list-none space-y-2">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-[var(--primary)] text-sm hover:underline underline-offset-4">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Sections */}
          <div className="border-t border-[var(--edge)] mt-8">
            <Section id="collect" title="1. What Information Do We Collect?">
              <p className="mb-4"><span className="text-[var(--text-primary)] font-medium">Personal information you disclose to us.</span> We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
              <p className="mb-4">The personal information we collect may include: names, phone numbers, email addresses, job titles, and contact preferences.</p>
              <p className="mb-4">We do not process sensitive information. All personal information that you provide to us must be true, complete, and accurate.</p>
              <p className="mb-4"><span className="text-[var(--text-primary)] font-medium">Information automatically collected.</span> Some information &mdash; such as your Internet Protocol (IP) address and/or browser and device characteristics &mdash; is collected automatically when you visit our Services. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information.</p>
              <p className="mb-2">The information we collect includes:</p>
              <ul className="list-none space-y-2 mb-4">
                <li><span className="text-[var(--text-primary)] font-medium">Log and Usage Data</span> &mdash; Service-related, diagnostic, usage, and performance information our servers automatically collect.</li>
                <li><span className="text-[var(--text-primary)] font-medium">Device Data</span> &mdash; Information about your computer, phone, tablet, or other device you use to access the Services.</li>
                <li><span className="text-[var(--text-primary)] font-medium">Location Data</span> &mdash; Information about your device&apos;s location, which can be either precise or imprecise based on your IP address.</li>
              </ul>
              <p>You can find out more about cookies in our <a href="/legal/cookies" className="text-[var(--primary)] hover:underline underline-offset-4">Cookie Policy</a>.</p>
            </Section>

            <Section id="process" title="2. How Do We Process Your Information?">
              <p className="mb-4">We process your personal information for a variety of reasons, including:</p>
              <ul className="list-none space-y-2">
                <li>To request feedback and to contact you about your use of our Services</li>
                <li>To send you marketing and promotional communications (with your consent)</li>
                <li>To deliver targeted advertising tailored to your interests</li>
                <li>To protect our Services, including fraud monitoring and prevention</li>
                <li>To identify usage trends so we can improve our Services</li>
                <li>To determine the effectiveness of our marketing campaigns</li>
                <li>To save or protect an individual&apos;s vital interest</li>
              </ul>
            </Section>

            <Section id="legal-bases" title="3. What Legal Bases Do We Rely On?">
              <p className="mb-4">We only process your personal information when we believe it is necessary and we have a valid legal reason to do so under applicable law.</p>
              <p className="mb-2"><span className="text-[var(--text-primary)] font-medium">If you are located in the EU or UK</span>, we may rely on:</p>
              <ul className="list-none space-y-2 mb-4">
                <li><span className="text-[var(--text-primary)] font-medium">Consent</span> &mdash; You have given us permission to use your personal information for a specific purpose. You can withdraw your consent at any time.</li>
                <li><span className="text-[var(--text-primary)] font-medium">Legitimate Interests</span> &mdash; Processing is reasonably necessary to achieve our legitimate business interests.</li>
                <li><span className="text-[var(--text-primary)] font-medium">Legal Obligations</span> &mdash; Processing is necessary for compliance with our legal obligations.</li>
                <li><span className="text-[var(--text-primary)] font-medium">Vital Interests</span> &mdash; Processing is necessary to protect your vital interests or those of a third party.</li>
              </ul>
              <p><span className="text-[var(--text-primary)] font-medium">If you are located in Canada</span>, we may process your information with your express or implied consent, which you can withdraw at any time.</p>
            </Section>

            <Section id="share" title="4. When and With Whom Do We Share Your Personal Information?">
              <p className="mb-4">We may need to share your personal information in the following situations:</p>
              <ul className="list-none space-y-2">
                <li><span className="text-[var(--text-primary)] font-medium">Business Transfers</span> &mdash; We may share or transfer your information in connection with any merger, sale of company assets, financing, or acquisition.</li>
                <li><span className="text-[var(--text-primary)] font-medium">Affiliates</span> &mdash; We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice.</li>
              </ul>
            </Section>

            <Section id="cookies" title="5. Do We Use Cookies and Other Tracking Technologies?">
              <p className="mb-4">We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</p>
              <p className="mb-4">Specific information about how we use such technologies and how you can refuse certain cookies is set out in our <a href="/legal/cookies" className="text-[var(--primary)] hover:underline underline-offset-4">Cookie Policy</a>.</p>
              <p>We may share your information with Google Analytics to track and analyze the use of the Services. To opt out, visit <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline underline-offset-4">tools.google.com/dlpage/gaoptout</a>.</p>
            </Section>

            <Section id="ai" title="6. Do We Offer AI-Based Products?">
              <p className="mb-4">As part of our Services, we offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies (&ldquo;AI Products&rdquo;).</p>
              <p className="mb-4">We provide AI Products through third-party service providers (&ldquo;AI Service Providers&rdquo;), including ElevenLabs and Deepgram. Your input, output, and personal information will be shared with and processed by these AI Service Providers.</p>
              <p>All personal information processed using our AI Products is handled in line with our Privacy Notice and our agreements with third parties.</p>
            </Section>

            <Section id="retention" title="7. How Long Do We Keep Your Information?">
              <p className="mb-4">We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law. No purpose in this notice will require us keeping your personal information for longer than 1 year.</p>
              <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or securely store and isolate it from any further processing until deletion is possible.</p>
            </Section>

            <Section id="security" title="8. How Do We Keep Your Information Safe?">
              <p>We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure. You should only access the Services within a secure environment.</p>
            </Section>

            <Section id="minors" title="9. Do We Collect Information from Minors?">
              <p>We do not knowingly collect data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18. If we learn that personal information from users less than 18 years of age has been collected, we will take reasonable measures to promptly delete such data. If you become aware of any data we may have collected from children under 18, please contact us at{' '}<a href="mailto:nate@nwalker.cc" className="text-[var(--primary)] hover:underline underline-offset-4">nate@nwalker.cc</a>.</p>
            </Section>

            <Section id="rights" title="10. What Are Your Privacy Rights?">
              <p className="mb-4">In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right to request access, rectification, erasure, data portability, and the right not to be subject to automated decision-making.</p>
              <p className="mb-4"><span className="text-[var(--text-primary)] font-medium">Withdrawing your consent:</span> If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time by contacting us.</p>
              <p className="mb-4"><span className="text-[var(--text-primary)] font-medium">Opting out of marketing:</span> You can unsubscribe from our marketing and promotional communications at any time by clicking the unsubscribe link in our emails, or by contacting us.</p>
              <p><span className="text-[var(--text-primary)] font-medium">Cookies:</span> Most web browsers are set to accept cookies by default. If you prefer, you can usually set your browser to remove or reject cookies. See our <a href="/legal/cookies" className="text-[var(--primary)] hover:underline underline-offset-4">Cookie Policy</a> for more information.</p>
            </Section>

            <Section id="dnt" title="11. Controls for Do-Not-Track Features">
              <p>Most web browsers and some mobile operating systems include a Do-Not-Track (&ldquo;DNT&rdquo;) feature you can activate to signal your privacy preference. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals. If a standard for online tracking is adopted that we must follow in the future, we will inform you in a revised version of this Privacy Notice.</p>
            </Section>

            <Section id="us-rights" title="12. Do United States Residents Have Specific Privacy Rights?">
              <p className="mb-4">If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you, correct inaccuracies, get a copy of, or delete your personal information.</p>
              <p className="mb-4">We have not disclosed, sold, or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. We will not sell or share personal information in the future belonging to website visitors, users, and other consumers.</p>
              <p className="mb-2"><span className="text-[var(--text-primary)] font-medium">Your rights include:</span></p>
              <ul className="list-none space-y-2 mb-4">
                <li>Right to know whether or not we are processing your personal data</li>
                <li>Right to access your personal data</li>
                <li>Right to correct inaccuracies in your personal data</li>
                <li>Right to request the deletion of your personal data</li>
                <li>Right to obtain a copy of the personal data you previously shared with us</li>
                <li>Right to non-discrimination for exercising your rights</li>
                <li>Right to opt out of targeted advertising, the sale of personal data, or profiling</li>
              </ul>
              <p>To exercise these rights, visit{' '}<Link href="/data-request" className="text-[var(--primary)] hover:underline underline-offset-4">nwalker.cc/data-request</Link>, email us at{' '}<a href="mailto:privacy@nwalker.cc" className="text-[var(--primary)] hover:underline underline-offset-4">privacy@nwalker.cc</a>, or visit our{' '}<Link href="/#contact" className="text-[var(--primary)] hover:underline underline-offset-4">contact page</Link>.</p>
            </Section>

            <Section id="updates" title="13. Do We Make Updates to This Notice?">
              <p>We may update this Privacy Notice from time to time. The updated version will be indicated by an updated &ldquo;Last updated&rdquo; date at the top. If we make material changes, we may notify you by prominently posting a notice or by directly sending you a notification. We encourage you to review this Privacy Notice frequently.</p>
            </Section>

            <Section id="contact" title="14. How Can You Contact Us About This Notice?">
              <p className="mb-4">If you have questions or comments about this notice, you may contact our Data Protection Officer by email at{' '}<a href="mailto:nate@nwalker.cc" className="text-[var(--primary)] hover:underline underline-offset-4">nate@nwalker.cc</a>, or by post at:</p>
              <address className="not-italic text-[var(--text-muted)] text-sm leading-relaxed">
                Ravenhelm, LLC<br />
                Data Protection Officer<br />
                1845 Pearce Ct<br />
                San Marcos, TX 78666<br />
                United States
              </address>
            </Section>

            <Section id="review" title="15. How Can You Review, Update, or Delete Your Data?">
              <p>Based on the applicable laws of your country or state of residence, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. To request to review, update, or delete your personal information, please visit{' '}<a href="/data-request" className="text-[var(--primary)] hover:underline underline-offset-4">nwalker.cc/data-request</a>.</p>
            </Section>
          </div>
        </div>
      </div>
    </main>
  )
}
