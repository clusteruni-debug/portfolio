'use client'

import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p
            className="text-2xl leading-none text-[var(--accent)]"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            thanks for reading
          </p>
          <p className="mt-2 text-sm text-[var(--text-subtle)]">&copy; 람쥐썬더</p>
        </div>
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 self-start text-sm text-[var(--text-subtle)] transition-colors hover:text-[var(--text-primary)] sm:self-auto"
          aria-label="맨 위로"
        >
          <ArrowUp size={15} aria-hidden /> 맨 위로
        </button>
      </div>
    </footer>
  )
}
