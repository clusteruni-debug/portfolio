import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getStoryBySlug } from '@/lib/articles'
import { renderArticleHTML } from '@/lib/tiptap'
import FadeIn from '@/components/effects/FadeIn'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getStoryBySlug(slug)
  if (!article) {
    return { title: '이야기를 찾을 수 없습니다 | 기록하는 사람' }
  }
  return {
    title: `${article.title} | 기록하는 사람`,
    description: article.content_text?.slice(0, 160) ?? '',
    openGraph: {
      title: article.title,
      description: article.content_text?.slice(0, 160) ?? '',
      ...(article.cover_image_url && { images: [article.cover_image_url] }),
    },
  }
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params
  const article = await getStoryBySlug(slug)

  if (!article) notFound()

  const html = article.content ? renderArticleHTML(article.content) : ''

  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <FadeIn>
        <article>
          <Link
            href="/stories"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-subtle)] transition-colors hover:text-[var(--text-primary)]"
          >
            &larr; 이야기 목록
          </Link>

          <header className="mb-10">
            <h1 className="mb-3 text-3xl font-bold leading-tight">
              {article.title}
            </h1>
            {date && <time className="text-sm text-[var(--text-subtle)]">{date}</time>}
          </header>

          {article.cover_image_url && (
            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <Image src={article.cover_image_url} alt={article.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
            </div>
          )}

          <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />

          <hr className="my-12 border-[var(--border)]" />

          <Link
            href="/stories"
            className="text-sm font-medium text-[var(--text-subtle)] transition-colors hover:text-[var(--text-primary)]"
          >
            &larr; 다른 이야기 보기
          </Link>
        </article>
      </FadeIn>
    </section>
  )
}
