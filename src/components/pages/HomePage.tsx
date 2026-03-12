'use client'

import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ContactSection from '@/components/sections/ContactSection'

interface HomePageProps {
  projectDescriptions: Record<string, string>
}

export default function HomePage({ projectDescriptions }: HomePageProps) {
  return (
    <>
      <HeroSection />
      <ProjectsSection projectDescriptions={projectDescriptions} />
      <SkillsSection />
      <ContactSection />
    </>
  )
}
