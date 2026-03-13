import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllStories } from '@/lib/articles'
import StoryCard from '@/components/ui/StoryCard'
import FadeIn from '@/components/effects/FadeIn'

export const revalidate = 60

export const metadata: Metadata = {
  title: '이야기 | 기록하는 사람',
  description: '직접 만들고 사용하면서 발견한 이야기들',
}

export default async function StoriesPage() {
  const stories = await getAllStories()

  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <FadeIn>
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-subtle)] transition-colors hover:text-[var(--text-primary)]"
        >
          &larr; 홈으로
        </Link>

        <h1 className="mb-3 text-3xl font-bold">이야기</h1>
        <p className="mb-12 text-base text-[var(--text-secondary)]">
          직접 만들고 사용하면서 발견한 이야기들
        </p>
      </FadeIn>

      {stories.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-[var(--text-subtle)]">아직 이야기가 없습니다</p>
          <p className="mt-2 text-sm text-[var(--text-subtle)]">곧 첫 번째 이야기가 올라옵니다.</p>
        </div>
      )}

      {stories.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((story) => (
            <StoryCard key={story.id} article={story} />
          ))}
        </div>
      )}
    </section>
  )
}
