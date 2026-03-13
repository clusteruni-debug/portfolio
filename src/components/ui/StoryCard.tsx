import Link from 'next/link'
import type { PortfolioArticle } from '@/lib/articles'

function getStorySlug(article: PortfolioArticle): string {
  const storyTag = article.tags.find((t) => t.startsWith('portfolio:story:'))
  return storyTag ? storyTag.replace('portfolio:story:', '') : article.id
}

function getReadingTime(text: string | null): string {
  if (!text) return ''
  const chars = text.trim().length
  const minutes = Math.max(1, Math.ceil(chars / 500))
  return `${minutes}분`
}

interface StoryCardProps {
  article: PortfolioArticle
}

export default function StoryCard({ article }: StoryCardProps) {
  const slug = getStorySlug(article)
  const readingTime = getReadingTime(article.content_text)
  const tagline = article.content_text
    ? article.content_text.slice(0, 80) + (article.content_text.length > 80 ? '...' : '')
    : ''

  return (
    <Link href={`/stories/${slug}`} className="group block">
      <article className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-soft)]">
        {article.cover_image_url && (
          <div className="aspect-[2/1] overflow-hidden">
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
            {article.title}
          </h3>
          {tagline && (
            <p className="mb-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              {tagline}
            </p>
          )}
          {readingTime && (
            <span className="text-xs text-[var(--text-subtle)]">{readingTime} 읽기</span>
          )}
        </div>
      </article>
    </Link>
  )
}
