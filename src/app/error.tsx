'use client'

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 text-center">
      <p className="mb-4 text-lg font-medium text-slate-500">문제가 발생했습니다</p>
      <button
        onClick={() => reset()}
        className="inline-block rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
      >
        다시 시도
      </button>
    </section>
  )
}
