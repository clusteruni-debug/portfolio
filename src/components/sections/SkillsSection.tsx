import { motion } from 'framer-motion'
import ScrollReveal from '../effects/ScrollReveal'

const messageTitle = '기능보다 경험을 먼저 설계합니다.'

const messageBlocks = [
  {
    title: '문제 정의',
    body: '불편한 지점을 정확히 잡아내고, 해결할 가치가 있는 문제부터 우선순위를 세웁니다.',
  },
  {
    title: '빠른 검증',
    body: '작은 단위로 구현하고 바로 사용해보며, 데이터와 피드백으로 다음 수정을 결정합니다.',
  },
  {
    title: '지속 운영',
    body: '한 번 배포로 끝내지 않고, 실제 사용 맥락에서 오래 버티는 제품으로 다듬습니다.',
  },
]

export default function SkillsSection() {
  return (
    <section id="message" className="px-6 py-24 md:py-28">
      <div className="mx-auto w-full max-w-6xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-[var(--shadow-soft)] md:p-12">
        <ScrollReveal>
          <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-slate-500">MESSAGE</p>
          <h2 className="display-font mb-5 text-3xl text-slate-900 md:text-5xl">{messageTitle}</h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
            기술 스택 자체보다, 무엇을 해결하려는지와 어떤 기준으로 개선하는지를 더 중요하게 봅니다.
            아래 문장은 현재 작업 방식을 가장 잘 설명하는 기준입니다.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {messageBlocks.map((block, idx) => (
            <ScrollReveal key={block.title} delay={idx * 0.08}>
              <motion.article
                whileHover={{ y: -4 }}
                className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="mb-2 text-base font-bold text-slate-900">{block.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{block.body}</p>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
