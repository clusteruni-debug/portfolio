interface TechBadgeProps {
  name: string
}

const techColors: Record<string, string> = {
  'Next.js': 'border-slate-300 bg-slate-100 text-slate-700',
  'TypeScript': 'border-blue-200 bg-blue-50 text-blue-700',
  'Supabase': 'border-emerald-200 bg-emerald-50 text-emerald-700',
  'TipTap': 'border-violet-200 bg-violet-50 text-violet-700',
  'Vite': 'border-amber-200 bg-amber-50 text-amber-700',
  'JavaScript': 'border-amber-200 bg-amber-50 text-amber-700',
  'Chart.js': 'border-pink-200 bg-pink-50 text-pink-700',
  'HTML': 'border-orange-200 bg-orange-50 text-orange-700',
  'Firebase': 'border-yellow-200 bg-yellow-50 text-yellow-700',
  'PWA': 'border-sky-200 bg-sky-50 text-sky-700',
  'React': 'border-cyan-200 bg-cyan-50 text-cyan-700',
  'WebSocket': 'border-teal-200 bg-teal-50 text-teal-700',
  'Python': 'border-blue-200 bg-blue-50 text-blue-700',
  'Flask': 'border-slate-300 bg-slate-100 text-slate-700',
  'Telegram API': 'border-sky-200 bg-sky-50 text-sky-700',
  'Node.js': 'border-lime-200 bg-lime-50 text-lime-700',
  Express: 'border-zinc-300 bg-zinc-100 text-zinc-800',
  SQLite: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  'Claude AI': 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700',
}

export default function TechBadge({ name }: TechBadgeProps) {
  const colors = techColors[name] || 'border-slate-300 bg-slate-100 text-slate-600'

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${colors}`}>
      {name}
    </span>
  )
}
