import type { Metadata } from 'next'
import { ArrowDown } from 'lucide-react'
import ProjectGallery from '@/components/projects/ProjectGallery'
import { projectCount, projectGroups, workspace } from '@/data/projects'

export const metadata: Metadata = {
  title: '만든 것 | 기록하는 사람',
  description: 'AI 에이전트와 함께 만든 제품, 개발 도구, 게임과 생활 도구. 2026년 2월부터 Claude Code와 Codex로 직접 겪은 문제를 풀어 온 작업을 모았습니다.',
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-8 sm:pt-36">
      <section className="mb-16 grid items-center gap-10 md:mb-20 md:grid-cols-[0.85fr_1.15fr] md:gap-12" aria-labelledby="projects-heading">
        <div>
          <p className="mb-6 flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] text-[var(--color-accent)]"><span className="h-px w-7 bg-[var(--color-accent)]" />SELECTED WORK</p>
          <h1 id="projects-heading" className="mb-6 text-[2.6rem] font-semibold leading-[1.2] tracking-[-0.055em] sm:text-[3.25rem] lg:text-[3.65rem]">겪은 문제를<br />직접 만든 것들<span className="text-[var(--color-accent)]">.</span></h1>
          <p className="max-w-sm break-keep text-sm leading-[1.9] text-[var(--color-foreground-muted)]">UX 리서처로 일하면서, 2026년 2월부터 AI 에이전트와 함께 제품과 도구를 만들고 있습니다. 불편했던 순간에서 시작한 작업들을 모았습니다.</p>
          <a href="#all-projects" className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-[var(--color-foreground)] pb-1 text-sm font-medium">작업 둘러보기 <ArrowDown size={16} aria-hidden="true" /></a>
          <div className="mt-9 flex items-center gap-5 text-[11px] text-[var(--color-foreground-muted)]">
            <span className="shrink-0 whitespace-nowrap"><strong className="mr-1.5 text-lg font-medium text-[var(--color-foreground)]">{String(projectCount).padStart(2, '0')}</strong>작업</span>
            <span className="h-5 w-px bg-[var(--color-border)]" />
            <span className="shrink-0 whitespace-nowrap"><strong className="mr-1.5 text-lg font-medium text-[var(--color-foreground)]">{projectGroups.length}</strong>개의 분야</span>
            <span className="ml-auto hidden whitespace-nowrap text-[var(--color-accent)] lg:inline" style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem' }}>made with agents</span>
          </div>
        </div>
        <article aria-labelledby="spotlight-heading">
          <div className="mb-3 flex justify-between text-[10px] font-medium tracking-[0.18em] text-[var(--color-foreground-muted)]"><span>IN THE SPOTLIGHT</span><span>비공개 저장소</span></div>
          <div className="rounded-2xl bg-[var(--color-surface-muted)] p-6 sm:p-8">
            <dl className="mb-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {workspace.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-[11px] text-[var(--color-foreground-muted)]">{stat.label}</dt>
                  <dd className="text-2xl font-semibold tabular-nums tracking-tight">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="grid gap-2.5 border-t border-[var(--color-border)] pt-5 text-sm leading-relaxed text-[var(--color-foreground-muted)]">
              {workspace.points.map((point) => (
                <li key={point} className="flex gap-2.5 break-keep"><span className="mt-[0.7em] h-px w-3 shrink-0 bg-[var(--color-accent)]" aria-hidden="true" />{point}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <p className="mb-1 text-[11px] text-[var(--color-foreground-muted)]">{workspace.stack}</p>
            <h2 id="spotlight-heading" className="text-lg font-semibold tracking-tight">{workspace.title}</h2>
            <p className="mt-2 break-keep text-sm leading-relaxed text-[var(--color-foreground-muted)]">{workspace.summary}</p>
          </div>
        </article>
      </section>
      <ProjectGallery groups={projectGroups} total={projectCount} />
      <p className="mt-16 border-t border-[var(--color-border)] pt-6 text-center text-xs leading-relaxed text-[var(--color-foreground-muted)]">불편함에서 시작해 매일 쓰는 도구가 되기까지. 그 과정을 계속 기록합니다.</p>
    </div>
  )
}
