export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
        <p className="text-sm text-slate-500">
          Designed & built by <span className="font-semibold text-slate-700">람쥐썬더</span>
        </p>

        <button
          onClick={scrollToTop}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900"
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
