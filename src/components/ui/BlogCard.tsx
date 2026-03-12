'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { PortfolioArticle } from '@/lib/articles'

interface BlogCardProps {
  article: PortfolioArticle
  index: number
}

export default function BlogCard({ article, index }: BlogCardProps) {
  const excerpt = article.content_text
    ? article.content_text.slice(0, 160) + (article.content_text.length > 160 ? '...' : '')
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
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group"
    >
      <Link href={`/blog/${article.id}`} className="block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-soft)]">
          {article.cover_image_url && (
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col p-5">
            {date && (
              <time className="mb-2 text-xs font-medium text-slate-400">{date}</time>
            )}
            <h2 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-[var(--accent-blue)]">
              {article.title}
            </h2>
            {excerpt && (
              <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-500">
                {excerpt}
              </p>
            )}
            {displayTags.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-1.5">
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
