'use client'

import Link from 'next/link'
import ThoughtCard from '@/components/ui/ThoughtCard'
import ScrollReveal from '@/components/effects/ScrollReveal'
import type { PortfolioArticle } from '@/lib/articles'

interface LatestThoughtsSectionProps {
  thoughts: PortfolioArticle[]
}

export default function LatestThoughtsSection({ thoughts }: LatestThoughtsSectionProps) {
  if (thoughts.length === 0) return null

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <ScrollReveal>
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold">최근 생각</h2>
          <Link
            href="/thoughts"
            className="text-sm font-medium text-[var(--text-subtle)] transition-colors hover:text-[var(--text-primary)]"
          >
            전체 보기 &rarr;
          </Link>
        </div>
      </ScrollReveal>
      <div className="grid gap-2">
        {thoughts.map((thought, i) => (
          <ScrollReveal key={thought.id} delay={i * 0.08}>
            <ThoughtCard article={thought} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
