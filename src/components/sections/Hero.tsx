export function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="max-w-[800px] mx-auto px-8">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-6">
          AI Governance &amp; Enterprise Platforms
        </p>
        <h1 className="text-[var(--text-primary)] text-4xl md:text-5xl font-light tracking-tight leading-tight mb-16">
          Nathan Walker
        </h1>
        <div className="space-y-2">
          <p className="text-[var(--text-primary)] text-xl md:text-2xl font-light leading-relaxed">
            AI eliminated the cost of building.
          </p>
          <p className="text-[var(--text-primary)] text-xl md:text-2xl font-light leading-relaxed">
            It did not eliminate the cost of being wrong.
          </p>
        </div>
      </div>
    </section>
  )
}
