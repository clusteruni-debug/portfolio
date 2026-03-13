'use client'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <p className="text-sm text-[var(--text-subtle)]">
          &copy; 람쥐썬더
        </p>
        <button
          onClick={scrollToTop}
          className="text-sm text-[var(--text-subtle)] transition-colors hover:text-[var(--text-primary)]"
          aria-label="맨 위로"
        >
          &uarr; 맨 위로
        </button>
      </div>
    </footer>
  )
}
