import { useEffect, useState } from 'react'
import { useInView } from '../../hooks/useInView'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  label: string
}

/** 스크롤 시 숫자 카운트업 애니메이션 */
export default function AnimatedCounter({ end, duration = 2000, suffix = '', label }: AnimatedCounterProps) {
  const { ref, isInView } = useInView(0.3)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [isInView, end, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold gradient-text md:text-5xl">
        {count}{suffix}
      </div>
      <div className="mt-2 text-sm text-[var(--text-secondary)]">{label}</div>
    </div>
  )
}
