import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'
import ParticleBackground from '../effects/ParticleBackground'

const stats = [
  { end: 11, suffix: '+', label: '프로젝트' },
  { end: 10, suffix: '+', label: '기술 스택' },
  { end: 100, suffix: '%', label: '바이브코딩' },
]

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 그라디언트 오브 배경 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <ParticleBackground />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* 소개 뱃지 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--text-secondary)]"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          바이브코딩으로 만드는 프로젝트
        </motion.div>

        {/* 메인 타이틀 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl"
        >
          안녕하세요,{' '}
          <span className="gradient-text">람쥐썬더</span>
          입니다
        </motion.h1>

        {/* 서브 타이틀 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl"
        >
          AI와 함께 코딩하며 아이디어를 현실로 만듭니다.
          <br />
          AI 트레이딩, 육아, 생산성 도구까지 — 다양한 문제를 기술로 해결합니다.
        </motion.p>

        {/* 통계 카운터 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex items-center justify-center gap-12 md:gap-20"
        >
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </motion.div>

        {/* 스크롤 화살표 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <a href="#projects" className="inline-block">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="text-[var(--text-secondary)]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto">
                <path d="M12 4V20M12 20L6 14M12 20L18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
