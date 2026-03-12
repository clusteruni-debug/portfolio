import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePortfolioArticles } from '../hooks/usePortfolioArticles'
import { renderArticleHTML } from '../lib/tiptap'
import ScrollReveal from '../components/effects/ScrollReveal'

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

export default function AboutPage() {
  useEffect(() => {
    document.title = '소개 | 람쥐썬더'
    window.scrollTo(0, 0)
  }, [])

  const { articles, loading, error } = usePortfolioArticles({
    tag: 'portfolio:about',
    includeContent: true,
  })

  const article = articles[0] ?? null

  const html = useMemo(() => {
    if (!article?.content) return ''
    return renderArticleHTML(article.content)
  }, [article?.content])

  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          홈으로
        </Link>

        <h1 className="mb-10 text-3xl font-bold text-slate-900">소개</h1>
      </motion.div>

      {loading && (
        <div className="animate-pulse space-y-4">
          <div className="h-5 w-3/4 rounded bg-slate-100" />
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-5/6 rounded bg-slate-100" />
          <div className="h-4 w-4/6 rounded bg-slate-100" />
        </div>
      )}

      {/* CMS content from article editor */}
      {!loading && article && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {article.cover_image_url && (
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="mb-10 w-full rounded-2xl"
            />
          )}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </motion.div>
      )}

      {/* Fallback: expanded version of SkillsSection message */}
      {!loading && !article && !error && (
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

      {error && (
        <p className="text-sm text-red-500">콘텐츠를 불러오지 못했습니다.</p>
      )}
    </section>
  )
}
