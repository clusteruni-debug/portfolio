interface TechBadgeProps {
  name: string
}

// 기술별 색상 매핑
const techColors: Record<string, string> = {
  'Next.js': 'border-white/20 text-white',
  'TypeScript': 'border-blue-400/30 text-blue-400',
  'Supabase': 'border-emerald-400/30 text-emerald-400',
  'TipTap': 'border-purple-400/30 text-purple-400',
  'Vite': 'border-yellow-400/30 text-yellow-400',
  'JavaScript': 'border-yellow-400/30 text-yellow-400',
  'Chart.js': 'border-pink-400/30 text-pink-400',
  'HTML': 'border-orange-400/30 text-orange-400',
  'Firebase': 'border-amber-400/30 text-amber-400',
  'PWA': 'border-blue-300/30 text-blue-300',
  'React': 'border-cyan-400/30 text-cyan-400',
  'WebSocket': 'border-green-400/30 text-green-400',
  'Python': 'border-blue-400/30 text-blue-400',
  'Flask': 'border-gray-400/30 text-gray-400',
  'Telegram API': 'border-sky-400/30 text-sky-400',
}

export default function TechBadge({ name }: TechBadgeProps) {
  const colors = techColors[name] || 'border-white/20 text-[var(--text-secondary)]'

  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${colors}`}>
      {name}
    </span>
  )
}
