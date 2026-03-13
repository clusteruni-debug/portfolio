'use client'

import { motion } from 'framer-motion'

export default function IntroSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          만들고, 쓰고, 기록합니다.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
          직접 겪은 불편함에서 출발해 도구를 만들고,
          그 과정에서 발견한 것들을 기록합니다.
          기술보다 맥락을, 완성보다 과정을 중요하게 생각합니다.
        </p>
      </motion.div>
    </section>
  )
}
