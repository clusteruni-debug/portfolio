import type { Metadata } from 'next'
import { getArticlesByTag } from '@/lib/articles'
import { renderArticleHTML } from '@/lib/tiptap'
import AboutContent from '@/components/pages/AboutContent'

export const revalidate = 60

export const metadata: Metadata = {
  title: '소개 | 기록하는 사람',
  description: '만들고, 쓰고, 기록하는 사람 — 람쥐썬더 소개',
}

export default async function AboutPage() {
  const articles = await getArticlesByTag('portfolio:about', true)
  const article = articles[0] ?? null

  const html = article?.content ? renderArticleHTML(article.content) : null

  return (
    <AboutContent
      html={html}
      coverImageUrl={article?.cover_image_url ?? null}
    />
  )
}
