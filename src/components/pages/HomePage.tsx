'use client'

import IntroSection from '@/components/sections/IntroSection'
import FeaturedStoriesSection from '@/components/sections/FeaturedStoriesSection'
import LatestThoughtsSection from '@/components/sections/LatestThoughtsSection'
import AboutTeaserSection from '@/components/sections/AboutTeaserSection'
import type { PortfolioArticle } from '@/lib/articles'

interface HomePageProps {
  featuredStories: PortfolioArticle[]
  latestThoughts: PortfolioArticle[]
}

export default function HomePage({ featuredStories, latestThoughts }: HomePageProps) {
  return (
    <>
      <IntroSection />
      <FeaturedStoriesSection stories={featuredStories} />
      <LatestThoughtsSection thoughts={latestThoughts} />
      <AboutTeaserSection />
    </>
  )
}
