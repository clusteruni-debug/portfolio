import { useEffect, useState } from 'react'
import { useInView } from '../../hooks/useInView'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  label: string
}

export default function AnimatedCounter({ end, duration = 1600, suffix = '', label }: AnimatedCounterProps) {
  const { ref, isInView } = useInView(0.25)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [isInView, end, duration])

  return (
    <div ref={ref} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
      <div className="display-font text-3xl font-bold text-slate-900 md:text-4xl">
        {count}
        {suffix}
      </div>
      <div className="mt-1.5 text-xs font-semibold tracking-wide text-slate-500">{label}</div>
    </div>
  )
}
