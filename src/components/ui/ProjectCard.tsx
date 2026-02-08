import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import TechBadge from './TechBadge'
import GlowCard from './GlowCard'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-full"
    >
      <GlowCard glowColor={`${project.color}30`} className="flex h-full flex-col">
        <div className="flex h-full flex-col p-5">
          {/* 플레이스홀더 스크린샷 */}
          <div
            className={`mb-4 flex h-36 items-center justify-center rounded-xl bg-gradient-to-br ${project.gradient}`}
          >
            <span className="text-base font-bold text-white drop-shadow-lg">
              {project.title}
            </span>
          </div>

          {/* 상태 + 제목 */}
          <div className="mb-1 flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 shrink-0 rounded-full ${
                project.status === 'active'
                  ? 'bg-green-400'
                  : project.status === 'in-progress'
                  ? 'bg-yellow-400 animate-pulse'
                  : 'bg-gray-400'
              }`}
            />
            <h3 className="truncate text-base font-semibold text-[var(--text-primary)]">
              {project.title}
            </h3>
          </div>

          {/* 설명 */}
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {project.description}
          </p>

          {/* 기술 배지 — 하단 고정 */}
          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>

          {/* 링크 */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-blue)] transition-colors hover:text-[var(--accent-cyan)]"
            >
              라이브 보기
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5.5 2.5H2.5V11.5H11.5V8.5M8.5 2.5H11.5V5.5M11.5 2.5L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </GlowCard>
    </motion.div>
  )
}
