import { useEffect } from 'react'
import HeroSection from '../components/sections/HeroSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import SkillsSection from '../components/sections/SkillsSection'
import ContactSection from '../components/sections/ContactSection'

export default function HomePage() {
  useEffect(() => {
    document.title = '람쥐썬더 | Portfolio'
  }, [])

  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  )
}
