const links = [
  { label: 'Email', value: 'nwalker85@gmail.com', href: 'mailto:nwalker85@gmail.com' },
  { label: 'Phone', value: '+1 (512) 781-2507', href: 'tel:+15127812507' },
  { label: 'LinkedIn', value: 'linkedin.com/in/nwalker85', href: 'https://linkedin.com/in/nwalker85' },
  { label: 'GitHub', value: 'github.com/nwalker85', href: 'https://github.com/nwalker85' },
]

export function ContactSection() {
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
                {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="text-xs font-medium tracking-widest uppercase block mb-1">{link.label}</span>
                <span className="text-[var(--text-secondary)]">{link.value}</span>
              </a>
            ))}
          </div>
        </div>
        <form
          className="space-y-6"
          action="https://formsubmit.co/nwalker85@gmail.com"
          method="POST"
        >
          <input type="hidden" name="_subject" value="New contact from nwalker.cc" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" className="hidden" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full bg-[var(--surface)] border border-[var(--edge)] rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full bg-[var(--surface)] border border-[var(--edge)] rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
          <textarea
            name="message"
            placeholder="Message"
            required
            rows={5}
            className="w-full bg-[var(--surface)] border border-[var(--edge)] rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
          />
          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            Start a Conversation
          </button>
        </form>
      </div>
    </section>
  )
}
