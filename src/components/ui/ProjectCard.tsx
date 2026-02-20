import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import TechBadge from './TechBadge'

interface ProjectCardProps {
  project: Project
  index: number
}

const statusLabel: Record<Project['status'], string> = {
  active: '운영 중',
  completed: '완료',
  'in-progress': '진행 중',
}

const categoryLabel: Record<Project['category'], string> = {
  web: 'WEB',
  tool: 'TOOL',
  bot: 'BOT',
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, transition: { duration: 0.2 } }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group h-full"
    >
      <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-soft)]">
        <div
          className="mb-4 rounded-xl border border-slate-200 px-4 py-3"
          style={{ background: `linear-gradient(135deg, ${project.color}1f, #ffffff)` }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-slate-500">{categoryLabel[project.category]}</span>
            <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
              {statusLabel[project.status]}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
        </div>

        <p className="mb-4 text-sm leading-6 text-slate-600">{project.description}</p>
        <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-500">{project.longDescription}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <TechBadge key={t} name={t} />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2.5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              라이브
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5.5 2.5H2.5V11.5H11.5V8.5M8.5 2.5H11.5V5.5M11.5 2.5L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
