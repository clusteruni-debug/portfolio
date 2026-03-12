'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/effects/ScrollReveal'

const fallbackBlocks = [
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
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          홈으로
        </Link>

        <h1 className="mb-10 text-3xl font-bold text-slate-900">소개</h1>
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
          <div className="mb-10">
            <h2 className="display-font mb-4 text-2xl text-slate-900">
              기능보다 경험을 먼저 설계합니다.
            </h2>
            <p className="text-base leading-8 text-slate-600">
              기술 스택 자체보다, 무엇을 해결하려는지와 어떤 기준으로 개선하는지를 더 중요하게 봅니다.
              직접 만들고, 직접 쓰면서, 진짜 의미 있는 것에 집중합니다.
            </p>
          </div>
          <div className="grid gap-4">
            {fallbackBlocks.map((block, idx) => (
              <ScrollReveal key={block.title} delay={idx * 0.08}>
                <article className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{block.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{block.body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  )
}
