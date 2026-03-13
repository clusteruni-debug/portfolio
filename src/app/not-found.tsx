import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 text-center">
      <h1 className="mb-4 text-6xl font-bold text-[var(--text-subtle)]">404</h1>
      <p className="mb-6 text-lg text-[var(--text-secondary)]">페이지를 찾을 수 없습니다</p>
      <Link
        href="/"
        className="inline-block rounded-full bg-[var(--text-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--bg-primary)] transition-opacity hover:opacity-90"
      >
        홈으로 돌아가기
      </Link>
    </section>
  )
}
