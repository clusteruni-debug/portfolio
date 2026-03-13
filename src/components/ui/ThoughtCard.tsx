import Link from 'next/link'
import type { PortfolioArticle } from '@/lib/articles'

interface ThoughtCardProps {
  article: PortfolioArticle
}

export default function ThoughtCard({ article }: ThoughtCardProps) {
  const excerpt = article.content_text
    ? article.content_text.slice(0, 120) + (article.content_text.length > 120 ? '...' : '')
    : ''

  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const displayTags = article.tags.filter((t) => !t.startsWith('portfolio:'))

  return (
    <Link href={`/thoughts/${article.id}`} className="group block">
      <article className="flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all duration-200 hover:border-[var(--border)] hover:bg-[var(--bg-secondary)]">
        <div className="flex-1">
          <h3 className="mb-1 font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
            {article.title}
          </h3>
          {excerpt && (
            <p className="mb-2 text-sm leading-relaxed text-[var(--text-subtle)]">
              {excerpt}
            </p>
          )}
          <div className="flex items-center gap-3">
            {date && <time className="text-xs text-[var(--text-subtle)]">{date}</time>}
            {displayTags.length > 0 && (
              <div className="flex gap-1.5">
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--bg-muted)] px-2 py-0.5 text-[11px] font-medium text-[var(--text-subtle)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
