import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'

const stats = [
  { end: 11, suffix: '+', label: '완료 프로젝트' },
  { end: 5, suffix: '개', label: '문제 영역' },
  { end: 100, suffix: '%', label: '실사용 기준 개선' },
]

export default function HeroSection() {
  return (
    <section className="relative px-6 pb-22 pt-34 md:pb-28 md:pt-40">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-600"
          >
            PRODUCT DESIGN + BUILD
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="display-font mb-6 text-4xl leading-tight text-slate-900 md:text-6xl"
          >
            아이디어를
            <span className="gradient-text"> 실제로 쓰이는 제품</span>
            으로 만듭니다.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="max-w-2xl text-base leading-8 text-[var(--text-secondary)] md:text-lg"
          >
            AI 트레이딩, 육아, 생산성 도구까지. 빠르게 만들고 실제 사용 피드백으로 개선하며,
            보기 좋은 코드보다 오래 남는 경험을 우선합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800"
            >
              프로젝트 보기
            </a>
            <a
              href="#message"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900"
            >
              내가 중요하게 보는 것
            </a>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[var(--shadow-soft)]"
        >
          <p className="mb-7 text-sm font-medium leading-7 text-slate-600">
            “기술은 목적이 아니라 도구라고 믿습니다. 복잡한 것을 단순하게 만들고,
            한번의 데모가 아니라 반복 사용에서 가치가 드러나는 제품을 만듭니다.”
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} {...stat} />
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
