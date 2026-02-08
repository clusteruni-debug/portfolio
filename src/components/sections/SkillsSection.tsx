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
    ],
  },
  {
    title: 'Backend & DB',
    skills: [
      { name: 'Supabase', icon: '⚡', color: '#3ecf8e' },
      { name: 'Firebase', icon: '🔥', color: '#ffca28' },
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
    ],
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
}

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-[var(--bg-secondary)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            <span className="gradient-text">기술 스택</span>
          </h2>
          <p className="mx-auto mb-16 max-w-xl text-center text-[var(--text-secondary)]">
            프로젝트에 사용하는 기술들
          </p>
        </ScrollReveal>

        <div className="space-y-12">
          {skillGroups.map((group, groupIdx) => (
            <ScrollReveal key={group.title} delay={groupIdx * 0.1}>
              <h3 className="mb-6 text-center text-lg font-semibold text-[var(--text-secondary)]">
                {group.title}
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={item}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-[var(--bg-card)] px-5 py-3 transition-colors hover:border-white/15"
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span className="text-sm font-medium" style={{ color: skill.color }}>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
