'use client'

import IntroSection from '@/components/sections/IntroSection'
import FeaturedStoriesSection from '@/components/sections/FeaturedStoriesSection'
import LatestThoughtsSection from '@/components/sections/LatestThoughtsSection'
import AboutTeaserSection from '@/components/sections/AboutTeaserSection'
import FeaturedVideosSection from '@/components/sections/FeaturedVideosSection'
import type { VideoCardData } from '@/components/videos/video-data'
import type { PortfolioArticle } from '@/lib/articles'

interface HomePageProps {
  featuredStories: PortfolioArticle[]
  latestThoughts: PortfolioArticle[]
  featuredVideos: VideoCardData[]
  videoCount: number
}

export default function HomePage({ featuredStories, latestThoughts, featuredVideos, videoCount }: HomePageProps) {
  return (
    <>
      <IntroSection />
      <FeaturedStoriesSection stories={featuredStories} />
      <FeaturedVideosSection videos={featuredVideos} total={videoCount} />
      <LatestThoughtsSection thoughts={latestThoughts} />
      <AboutTeaserSection />
    </>
  )
}
