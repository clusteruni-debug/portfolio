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
          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-3 flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-blue)] transition-colors hover:text-[var(--accent-cyan)]"
                >
                  라이브 보기
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
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </GlowCard>
    </motion.div>
  )
}
