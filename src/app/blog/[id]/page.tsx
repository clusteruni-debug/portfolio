import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleById } from '@/lib/articles'
import { renderArticleHTML } from '@/lib/tiptap'
import FadeIn from '@/components/effects/FadeIn'

export const revalidate = 60

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const article = await getArticleById(id)
  if (!article || !article.tags.includes('portfolio:blog')) {
    return { title: '글을 찾을 수 없습니다 | 람쥐썬더' }
  }
  return {
    title: `${article.title} | 람쥐썬더`,
    description: article.content_text?.slice(0, 160) ?? '',
    openGraph: {
      title: article.title,
      description: article.content_text?.slice(0, 160) ?? '',
      ...(article.cover_image_url && { images: [article.cover_image_url] }),
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params
  const article = await getArticleById(id)

  if (!article || !article.tags.includes('portfolio:blog')) {
    notFound()
  }

  const html = article.content ? renderArticleHTML(article.content) : ''

  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const displayTags = article.tags.filter((t) => !t.startsWith('portfolio:'))

  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <FadeIn>
        <article>
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            블로그 목록
          </Link>

          <header className="mb-10">
            <h1 className="mb-3 text-3xl font-bold leading-tight text-slate-900">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              {date && <time className="text-sm text-slate-400">{date}</time>}
              {displayTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {displayTags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {article.cover_image_url && (
            <img src={article.cover_image_url} alt={article.title} className="mb-10 w-full rounded-2xl" />
          )}

          <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />

          <hr className="my-12 border-slate-200" />

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            다른 글 보기
          </Link>
        </article>
      </FadeIn>
    </section>
  )
}
