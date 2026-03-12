'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navLinks = [
  { label: '소개', href: '/about' },
  { label: '블로그', href: '/blog' },
  { label: '프로젝트', href: '/#projects' },
  { label: '연락', href: '/#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle hash scrolling when navigating to /#section from other pages
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-slate-200/80 shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="display-font text-2xl font-bold text-slate-900">
          ramzy.thunder
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.href.startsWith('/') && !link.href.includes('#') ? (
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900"
        >
          같이 만들기
        </a>
      </nav>
    </motion.header>
  )
}
