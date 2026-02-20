import { motion } from 'framer-motion'
import ScrollReveal from '../effects/ScrollReveal'

interface Skill {
  name: string
  icon: string
  color: string
}

interface SkillGroup {
  title: string
  skills: Skill[]
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: '⚛️', color: '#61dafb' },
      { name: 'Next.js', icon: '▲', color: '#ffffff' },
      { name: 'TypeScript', icon: 'TS', color: '#3178c6' },
      { name: 'Tailwind CSS', icon: '🎨', color: '#06b6d4' },
      { name: 'Vite', icon: '⚡', color: '#646cff' },
      { name: 'Framer Motion', icon: '🎬', color: '#ff0055' },
      { name: 'zustand', icon: '🐻', color: '#453f39' },
    ],
  },
  {
    title: 'Backend & DB',
    skills: [
      { name: 'Node.js', icon: '🟢', color: '#339933' },
      { name: 'Express', icon: '🚂', color: '#ffffff' },
      { name: 'Supabase', icon: '⚡', color: '#3ecf8e' },
      { name: 'Firebase', icon: '🔥', color: '#ffca28' },
      { name: 'SQLite', icon: '🗄️', color: '#003b57' },
      { name: 'Python', icon: '🐍', color: '#3776ab' },
      { name: 'Flask', icon: '🌶️', color: '#ffffff' },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: '📦', color: '#f05032' },
      { name: 'GitHub Actions', icon: '🔄', color: '#2088ff' },
      { name: 'Vercel', icon: '▲', color: '#ffffff' },
      { name: 'Claude Code', icon: '🤖', color: '#d4a574' },
      { name: 'pm2', icon: '🔄', color: '#2b037a' },
    ],
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
}

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-[var(--bg-secondary)] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            <span className="gradient-text">기술 스택</span>
          </h2>
          <p className="mx-auto mb-16 max-w-xl text-center text-[var(--text-secondary)]">
            프로젝트에 사용하는 기술들
          </p>
        </ScrollReveal>

        {/* 3열 그리드: 각 그룹이 카드 형태 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
          {skillGroups.map((group, groupIdx) => (
            <ScrollReveal key={group.title} delay={groupIdx * 0.1}>
              <div className="h-full rounded-2xl border border-white/8 bg-[var(--bg-card)] p-6 shadow-lg shadow-black/10">
                <h3 className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-[var(--accent-blue)]">
                  {group.title}
                </h3>
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col gap-3"
                >
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={item}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-base">
                        {skill.icon}
                      </span>
                      <span className="text-sm font-medium" style={{ color: skill.color }}>
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
