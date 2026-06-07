'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import StoryCard from '@/components/ui/StoryCard'
import EmptyState from '@/components/ui/EmptyState'
import ScrollReveal from '@/components/effects/ScrollReveal'
import type { PortfolioArticle } from '@/lib/articles'

interface FeaturedStoriesSectionProps {
  stories: PortfolioArticle[]
}

export default function FeaturedStoriesSection({ stories }: FeaturedStoriesSectionProps) {
  const isEmpty = stories.length === 0

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <ScrollReveal>
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold">이야기</h2>
          {!isEmpty && (
            <Link
              href="/stories"
              className="text-sm font-medium text-[var(--text-subtle)] transition-colors hover:text-[var(--text-primary)]"
            >
              전체 보기 &rarr;
            </Link>
          )}
        </div>
      </ScrollReveal>
      {isEmpty ? (
        <ScrollReveal>
          <EmptyState
            icon={BookOpen}
            title="아직 이야기가 없어요"
            description="만들고 겪은 과정을 차곡차곡 쌓는 중이에요. 곧 첫 이야기로 찾아올게요."
          />
        </ScrollReveal>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((story, i) => (
            <ScrollReveal key={story.id} delay={i * 0.1}>
              <StoryCard article={story} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  )
}
