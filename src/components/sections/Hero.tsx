export function Hero() {
  return (
    <section className="min-h-screen flex items-center relative">
      <div className="max-w-[1200px] mx-auto px-8 w-full">
        <div className="max-w-[720px]">
          <h1 className="text-[var(--text-primary)] text-4xl md:text-5xl font-light tracking-tight leading-tight mb-4">
            Nathan Walker
          </h1>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl mb-16">
            AI Governance &amp; Enterprise Platforms
          </p>
          <div className="space-y-2">
            <p className="text-[var(--text-primary)] text-xl md:text-2xl font-light leading-relaxed">
              AI eliminated the cost of building.
            </p>
            <p className="text-[var(--text-primary)] text-xl md:text-2xl font-light leading-relaxed">
              It did not eliminate the cost of being <em>wrong.</em>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[var(--text-muted)] text-sm tracking-widest">
        Scroll ↓
      </div>
    </section>
  )
}
