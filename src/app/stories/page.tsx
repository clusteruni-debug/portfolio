import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { getAllStories } from '@/lib/articles'
import StoryCard from '@/components/ui/StoryCard'
import EmptyState from '@/components/ui/EmptyState'
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

        <p
          className="mb-2 text-xl text-[var(--accent)]"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          stories
        </p>
        <h1 className="mb-3 text-3xl font-bold">이야기</h1>
        <p className="mb-12 text-base text-[var(--text-secondary)]">
          직접 만들고 사용하면서 발견한 이야기들
        </p>
      </FadeIn>

      {stories.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="아직 이야기가 없어요"
          description="만들고 겪은 과정을 차곡차곡 쌓는 중이에요. 곧 첫 이야기로 찾아올게요."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((story) => (
            <StoryCard key={story.id} article={story} />
          ))}
        </div>
      )}
    </section>
  )
}
