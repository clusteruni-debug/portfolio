import type { Metadata } from 'next'
import Link from 'next/link'
import { PenLine } from 'lucide-react'
import { getArticlesByTag } from '@/lib/articles'
import ThoughtCard from '@/components/ui/ThoughtCard'
import EmptyState from '@/components/ui/EmptyState'
import FadeIn from '@/components/effects/FadeIn'

export const revalidate = 60

export const metadata: Metadata = {
  title: '생각 | 기록하는 사람',
  description: '만들면서 배운 것들, 생각의 조각들',
}

export default async function ThoughtsPage() {
  const [thoughts, legacyBlogs] = await Promise.all([
    getArticlesByTag('portfolio:thought'),
    getArticlesByTag('portfolio:blog'),
  ])

  // Merge, dedup by id, sort by date
  const seen = new Set(thoughts.map((a) => a.id))
  const allArticles = [
    ...thoughts,
    ...legacyBlogs.filter((a) => !seen.has(a.id)),
  ].sort((a, b) => {
    const da = a.published_at ? new Date(a.published_at).getTime() : 0
    const db = b.published_at ? new Date(b.published_at).getTime() : 0
    return db - da
  })

  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <FadeIn>
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-subtle)] transition-colors hover:text-[var(--text-primary)]"
        >
          &larr; 홈으로
        </Link>

        <p
          className="mb-2 text-xl text-[var(--accent)]"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          thoughts
        </p>
        <h1 className="mb-3 text-3xl font-bold">생각</h1>
        <p className="mb-12 text-base text-[var(--text-secondary)]">
          만들면서 배운 것들, 생각의 조각들
        </p>
      </FadeIn>

      {allArticles.length === 0 ? (
        <EmptyState
          icon={PenLine}
          title="아직 글이 없어요"
          description="스치는 생각이나 짧은 기록을 여기 모아둘 거예요."
        />
      ) : (
        <div className="grid gap-2">
          {allArticles.map((article) => (
            <ThoughtCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  )
}
