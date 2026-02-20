import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, categories, type CategoryId } from '../../data/projects'
import ProjectCard from '../ui/ProjectCard'
import ScrollReveal from '../effects/ScrollReveal'

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')

  const filtered = useMemo(
    () => (activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory)),
    [activeCategory],
  )

  return (
    <section id="projects" className="px-6 py-24 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <ScrollReveal>
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-slate-500">WORK ARCHIVE</p>
              <h2 className="display-font text-3xl text-slate-900 md:text-5xl">최근 프로젝트</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 md:text-base">
              아이디어 실험부터 실제 운영까지. 각 프로젝트의 맥락과 결과를 빠르게 훑어볼 수 있게 구성했습니다.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-10 flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'border border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
            <span className="ml-auto text-xs font-semibold text-slate-500">
              TOTAL {filtered.length}
            </span>
          </div>
        </ScrollReveal>

        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
