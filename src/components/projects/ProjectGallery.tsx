'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { ProjectGroup } from '@/data/projects'

export default function ProjectGallery({ groups, total }: { groups: ProjectGroup[]; total: number }) {
  const [groupId, setGroupId] = useState('all')
  const items = groups.flatMap((group) => group.projects.map((project) => ({ ...project, group })))
  const filtered = groupId === 'all' ? items : items.filter((item) => item.group.id === groupId)

  return (
    <section id="all-projects" className="scroll-mt-24 border-t border-[var(--color-border)] pt-10 sm:pt-14" aria-labelledby="all-projects-heading">
      <div className="mb-8">
        <p className="mb-2 text-[11px] font-medium tracking-[0.2em] text-[var(--color-accent)]">THE COLLECTION</p>
        <h2 id="all-projects-heading" className="text-2xl font-semibold tracking-tight">만든 것 모아보기 <span className="ml-2 align-top text-sm font-normal text-[var(--color-foreground-muted)]">{String(total).padStart(2, '0')}</span></h2>
      </div>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-x-1 gap-y-2" role="group" aria-label="분류">
          {[{ id: 'all', label: '전체', count: total }, ...groups.map((group) => ({ id: group.id, label: group.label, count: group.projects.length }))].map((item) => (
            <button key={item.id} type="button" aria-pressed={groupId === item.id} onClick={() => setGroupId(item.id)}
              className={`min-h-11 rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] ${groupId === item.id ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'text-[var(--color-foreground-muted)] hover:bg-[var(--color-surface-muted)]'}`}>
              {item.label} <span className="ml-1 text-[10px] tabular-nums">{item.count}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-[var(--color-foreground-muted)]" role="status" aria-live="polite">{filtered.length}개의 작업</p>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
        {filtered.map((project) => (
          <article key={project.id} className="border-t border-[var(--color-border)] pt-5">
            <div className="mb-2 flex items-center justify-between gap-2 text-[11px] tracking-[0.08em] text-[var(--color-foreground-muted)]">
              <span>{project.group.label}</span><span className="shrink-0">{project.status}</span>
            </div>
            <h3 className="break-keep text-lg font-semibold leading-snug tracking-tight">{project.title}</h3>
            <p className="mt-2 break-keep text-sm leading-relaxed text-[var(--color-foreground-muted)]">{project.summary}</p>
            <p className="mt-3 text-[11px] text-[var(--color-foreground-subtle)]">{project.stack}</p>
            {project.links && (
              <div className="mt-3 flex flex-wrap gap-x-5">
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1 text-sm text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]">
                    {link.label} <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
