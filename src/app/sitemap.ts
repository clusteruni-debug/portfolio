import type { MetadataRoute } from 'next'
import { getAllStories, getArticlesByTag } from '@/lib/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:5110'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/stories`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/thoughts`, changeFrequency: 'weekly', priority: 0.9 },
  ]

  const [stories, thoughts] = await Promise.all([
    getAllStories(),
    getArticlesByTag('portfolio:thought'),
  ])

  const storyRoutes: MetadataRoute.Sitemap = stories.map((s) => {
    const slug = s.tags.find((t) => t.startsWith('portfolio:story:'))?.replace('portfolio:story:', '') ?? s.id
    return { url: `${baseUrl}/stories/${slug}`, lastModified: s.published_at ? new Date(s.published_at) : undefined, changeFrequency: 'monthly' as const, priority: 0.7 }
  })

  const thoughtRoutes: MetadataRoute.Sitemap = thoughts.map((t) => ({
    url: `${baseUrl}/thoughts/${t.id}`,
    lastModified: t.published_at ? new Date(t.published_at) : undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...storyRoutes, ...thoughtRoutes]
}
