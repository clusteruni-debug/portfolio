'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/effects/ScrollReveal'

export default function AboutTeaserSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <ScrollReveal>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 md:p-12">
          <h2 className="mb-4 text-2xl font-bold">만드는 사람에 대해</h2>
          <p className="mb-6 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
            ADHD와 함께 살며 자기만의 시스템을 만들어가는 사람.
            불편함을 자동화하고, 그 과정을 기록합니다.
          </p>
          <Link
            href="/about"
            className="text-sm font-medium text-[var(--accent)] transition-opacity hover:opacity-80"
          >
            더 읽기 &rarr;
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
