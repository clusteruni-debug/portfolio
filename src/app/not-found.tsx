import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 text-center">
      <h1 className="mb-4 text-6xl font-bold text-slate-300">404</h1>
      <p className="mb-6 text-lg text-slate-500">페이지를 찾을 수 없습니다</p>
      <Link
        href="/"
        className="inline-block rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
      >
        홈으로 돌아가기
      </Link>
    </section>
  )
}
