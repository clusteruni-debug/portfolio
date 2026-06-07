import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
}

/**
 * Warm placeholder shown when a section has no content yet — replaces the
 * old `return null` (which made whole sections vanish and the page feel empty).
 * A dashed, friendly box reads as "coming soon", not "broken".
 */
export default function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--bg-secondary)] px-6 py-14 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-muted)] text-[var(--accent)]">
        <Icon size={22} strokeWidth={1.5} aria-hidden />
      </div>
      <p className="mb-1 font-semibold text-[var(--text-primary)]">{title}</p>
      <p className="max-w-sm text-sm leading-relaxed text-[var(--text-subtle)]">{description}</p>
    </div>
  )
}
