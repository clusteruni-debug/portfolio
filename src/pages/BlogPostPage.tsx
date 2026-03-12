import { useEffect, useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePortfolioArticle } from '../hooks/usePortfolioArticles'
import { renderArticleHTML } from '../lib/tiptap'

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>()
  const { article, loading, error } = usePortfolioArticle(id)

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | 람쥐썬더`
    }
  }, [article])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const html = useMemo(() => {
    if (!article?.content) return ''
    return renderArticleHTML(article.content)
  }, [article?.content])

  // Redirect if article exists but isn't a portfolio:blog article
  if (article && !article.tags.includes('portfolio:blog')) {
    return <Navigate to="/blog" replace />
  }

  const date = article?.published_at
    ? new Date(article.published_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const displayTags = article?.tags.filter((t) => !t.startsWith('portfolio:')) ?? []

  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      {loading && (
        <div className="animate-pulse">
          <div className="mb-6 h-4 w-24 rounded bg-slate-100" />
          <div className="mb-4 h-8 w-3/4 rounded bg-slate-100" />
          <div className="mb-8 h-4 w-40 rounded bg-slate-100" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-slate-100" />
            <div className="h-4 w-5/6 rounded bg-slate-100" />
            <div className="h-4 w-4/6 rounded bg-slate-100" />
          </div>
        </div>
      )}

      {error && (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-slate-400">글을 찾을 수 없습니다</p>
          <Link
            to="/blog"
            className="mt-4 inline-block text-sm font-medium text-[var(--accent-blue)] hover:underline"
          >
            블로그 목록으로
          </Link>
        </div>
      )}

      {!loading && article && (
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            블로그 목록
          </Link>

          <header className="mb-10">
            <h1 className="mb-3 text-3xl font-bold leading-tight text-slate-900">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              {date && (
                <time className="text-sm text-slate-400">{date}</time>
              )}
              {displayTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {displayTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

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

          <hr className="my-12 border-slate-200" />

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            다른 글 보기
          </Link>
        </motion.article>
      )}
    </section>
  )
}
