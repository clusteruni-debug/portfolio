'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Avatar from '@/components/ui/Avatar'

export default function IntroSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 pt-32">
      <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:items-center md:justify-between md:gap-16">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <p
            className="mb-2 text-2xl leading-none text-[var(--accent)]"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            hi, I&apos;m
          </p>
          <h1 className="mb-3 text-5xl font-bold tracking-tight md:text-6xl">람쥐썬더</h1>
          <p className="mb-6 text-xl font-medium text-[var(--text-primary)] md:text-2xl">
            만들고, 쓰고, 기록합니다.
          </p>
          <p className="mb-8 max-w-xl leading-relaxed text-[var(--text-secondary)]">
            직접 겪은 불편함에서 출발해 도구를 만들고, 그 과정에서 발견한 것들을 기록해요.
            기술보다 맥락을, 완성보다 과정을 중요하게 생각합니다.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              더 알아보기
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
            >
              이야기 보기 &rarr;
            </Link>
          </div>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="shrink-0 self-center"
        >
          <Avatar size={220} priority />
        </motion.div>
      </div>
    </section>
  )
}
