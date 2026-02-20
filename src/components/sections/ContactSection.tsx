import ScrollReveal from '../effects/ScrollReveal'

export default function ContactSection() {
  return (
    <section id="contact" className="px-6 pb-24 pt-10 md:pb-28">
      <div className="mx-auto w-full max-w-5xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-[var(--shadow-soft)] md:p-12">
        <ScrollReveal>
          <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-slate-500">CONTACT</p>
          <h2 className="display-font mb-4 text-3xl text-slate-900 md:text-4xl">같이 만들 이야기</h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            흩어진 아이디어를 실제 서비스로 연결하고 싶다면 편하게 연락 주세요.
            작은 MVP부터 운영 자동화까지 함께 설계할 수 있습니다.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href="https://github.com/clusteruni-debug"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-slate-300"
            >
              <span>
                <span className="block text-xs font-semibold tracking-wide text-slate-500">GITHUB</span>
                <span className="mt-1 block text-sm font-semibold text-slate-900">clusteruni-debug</span>
              </span>
              <span className="text-slate-500">↗</span>
            </a>

            <a
              href="mailto:contact@example.com"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-slate-300"
            >
              <span>
                <span className="block text-xs font-semibold tracking-wide text-slate-500">EMAIL</span>
                <span className="mt-1 block text-sm font-semibold text-slate-900">contact@example.com</span>
              </span>
              <span className="text-slate-500">↗</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
