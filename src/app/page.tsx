import { getFeaturedStories, getLatestThoughts } from '@/lib/articles'
import HomePage from '@/components/pages/HomePage'
import { getFeaturedVideos, videos } from '@/lib/videos'

export const revalidate = 60

export default async function Home() {
  const [featuredStories, latestThoughts] = await Promise.all([
    getFeaturedStories(),
    getLatestThoughts(3),
  ])

  return <HomePage featuredStories={featuredStories} latestThoughts={latestThoughts} featuredVideos={getFeaturedVideos()} videoCount={videos.length} />
}
