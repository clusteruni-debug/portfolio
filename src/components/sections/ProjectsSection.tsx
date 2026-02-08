import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, categories, type CategoryId } from '../../data/projects'
import ProjectCard from '../ui/ProjectCard'
import ScrollReveal from '../effects/ScrollReveal'

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            <span className="gradient-text">프로젝트</span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-[var(--text-secondary)]">
            바이브코딩으로 만든 프로젝트들. 아이디어에서 배포까지, AI와 함께.
          </p>
        </ScrollReveal>

        {/* 카테고리 필터 */}
        <ScrollReveal delay={0.1}>
          <div className="mb-10 flex items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 sm:px-5 ${
                  activeCategory === cat.id
                    ? 'bg-[var(--accent-blue)] text-white shadow-lg shadow-blue-500/25'
                    : 'border border-white/10 text-[var(--text-secondary)] hover:border-white/20 hover:text-[var(--text-primary)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 프로젝트 그리드 */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
