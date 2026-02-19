export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/5 bg-[var(--bg-secondary)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <p className="text-sm text-[var(--text-secondary)]">
          Made with <span className="gradient-text font-semibold">바이브코딩</span> & Claude Code
        </p>

        <button
          onClick={scrollToTop}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[var(--text-secondary)] transition-all hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] hover:shadow-[0_0_12px_var(--glow-blue)]"
          aria-label="맨 위로"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </footer>
  )
}
