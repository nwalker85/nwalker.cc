export function JudgmentGap() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-semibold tracking-tight mb-16">
          The Judgment Gap
        </h2>
        <div className="space-y-8 text-lg md:text-xl leading-relaxed">
          <p className="text-[var(--text-secondary)]">
            AI collapsed the implementation gap to near-zero.
          </p>
          <p className="text-[var(--text-secondary)]">
            Working systems are cheap.
          </p>
          <p className="text-[var(--text-primary)] font-medium">
            Correct systems are not.
          </p>

          <div className="h-8" aria-hidden="true" />

          <p className="text-[var(--text-secondary)]">
            Implementation is automated.
          </p>
          <p className="text-[var(--text-secondary)]">
            Architectural judgment is not.
          </p>

          <div className="h-8" aria-hidden="true" />

          <p className="text-[var(--text-secondary)]">
            AI can generate a system.
          </p>
          <p className="text-[var(--text-secondary)]">
            It cannot evaluate the second-order consequences of topology decisions over time.
          </p>

          <div className="h-8" aria-hidden="true" />

          <p className="text-[var(--text-secondary)]">
            AI made execution cheaper.
          </p>
          <p className="text-[var(--text-secondary)]">
            It made mistakes scale faster.
          </p>

          <p className="text-[var(--text-primary)] font-medium pt-8">
            Judgment determines durability.
          </p>
        </div>
      </div>
    </section>
  )
}
