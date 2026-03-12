import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePortfolioArticles } from '../hooks/usePortfolioArticles'
import BlogCard from '../components/ui/BlogCard'

export default function BlogListPage() {
  useEffect(() => {
    document.title = '블로그 | 람쥐썬더'
    window.scrollTo(0, 0)
  }, [])

  const { articles, loading, error } = usePortfolioArticles({ tag: 'portfolio:blog' })

  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-32">
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

        <h1 className="mb-3 text-3xl font-bold text-slate-900">블로그</h1>
        <p className="mb-12 text-base text-slate-500">
          만들면서 배운 것들, 생각의 조각들
        </p>
      </motion.div>

      {loading && (
        <div className="grid gap-6 sm:grid-cols-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-4 aspect-[16/9] rounded-xl bg-slate-100" />
              <div className="mb-2 h-3 w-20 rounded bg-slate-100" />
              <div className="mb-2 h-5 w-3/4 rounded bg-slate-100" />
              <div className="h-4 w-full rounded bg-slate-100" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">콘텐츠를 불러오지 못했습니다.</p>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-slate-400">아직 글이 없습니다</p>
          <p className="mt-2 text-sm text-slate-400">곧 첫 번째 글이 올라옵니다.</p>
        </div>
      )}

      {!loading && articles.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article, i) => (
            <BlogCard key={article.id} article={article} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
