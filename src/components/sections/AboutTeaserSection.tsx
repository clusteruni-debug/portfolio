'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import ScrollReveal from '@/components/effects/ScrollReveal'

export default function AboutTeaserSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <ScrollReveal>
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 sm:flex-row sm:items-center sm:gap-8 md:p-12">
          <Avatar size={96} shape="rounded" className="shrink-0" />
          <div>
            <p
              className="mb-1 text-lg text-[var(--accent)]"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              about me
            </p>
            <h2 className="mb-3 text-2xl font-bold">만드는 사람에 대해</h2>
            <p className="mb-5 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
              ADHD와 함께 살며 자기만의 시스템을 만들어가는 사람.
              불편함을 자동화하고, 그 과정을 기록합니다.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] transition-opacity hover:opacity-80"
            >
              더 읽기 <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
