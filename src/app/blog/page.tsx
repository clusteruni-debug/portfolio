import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticlesByTag } from '@/lib/articles'
import BlogCard from '@/components/ui/BlogCard'
import FadeIn from '@/components/effects/FadeIn'

export const revalidate = 60

export const metadata: Metadata = {
  title: '블로그 | 람쥐썬더',
  description: '만들면서 배운 것들, 생각의 조각들',
}

export default async function BlogListPage() {
  const articles = await getArticlesByTag('portfolio:blog')

  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <FadeIn>
        <Link
          href="/"
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
      </FadeIn>

      {articles.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-slate-400">아직 글이 없습니다</p>
          <p className="mt-2 text-sm text-slate-400">곧 첫 번째 글이 올라옵니다.</p>
        </div>
      )}

      {articles.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article, i) => (
            <BlogCard key={article.id} article={article} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
