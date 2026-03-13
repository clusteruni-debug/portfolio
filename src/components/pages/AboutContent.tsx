'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface AboutContentProps {
  html: string | null
  coverImageUrl: string | null
}

export default function AboutContent({ html, coverImageUrl }: AboutContentProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-subtle)] transition-colors hover:text-[var(--text-primary)]"
        >
          &larr; 홈으로
        </Link>

        <h1 className="mb-10 text-3xl font-bold">소개</h1>
      </motion.div>

      {html ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {coverImageUrl && (
            <img src={coverImageUrl} alt="소개" className="mb-10 w-full rounded-2xl" />
          )}
          <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="mb-8">
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              만들고, 쓰고, 기록하는 사람입니다.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
              직접 겪은 불편함에서 출발해 도구를 만들고,
              그 과정에서 발견한 것들을 글로 남깁니다.
              ADHD와 함께 살며 나만의 시스템을 설계하고,
              기술보다 맥락을, 완성보다 과정을 중요하게 생각합니다.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
            <p className="text-sm italic leading-relaxed text-[var(--text-subtle)]" style={{ fontFamily: 'var(--serif)' }}>
              &ldquo;기능보다 경험을 먼저 설계합니다.
              기술 스택 자체보다, 무엇을 해결하려는지와
              어떤 기준으로 개선하는지를 더 중요하게 봅니다.&rdquo;
            </p>
          </div>
        </motion.div>
      )}
    </section>
  )
}
