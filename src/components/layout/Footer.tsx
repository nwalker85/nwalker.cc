export function Footer() {
  return (
    <footer className="py-12 px-8 border-t border-[var(--edge)]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[var(--text-primary)] font-semibold">Nathan Walker</span>
          <span className="text-[var(--text-muted)] text-sm">Building accountable AI systems</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href="https://ravenhelm.ai" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" target="_blank" rel="noopener noreferrer">Ravenhelm</a>
          <a href="https://runestack.ai" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" target="_blank" rel="noopener noreferrer">Runestack</a>
          <a href="https://github.com/nwalker85" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/nwalker85" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="/resume.pdf" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Resume</a>
        </div>
      </div>
    </footer>
  )
}
