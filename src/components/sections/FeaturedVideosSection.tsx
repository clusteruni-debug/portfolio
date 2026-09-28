import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import VideoCard from '@/components/videos/VideoCard'
import type { VideoCardData } from '@/components/videos/video-data'

export default function FeaturedVideosSection({ videos, total }: { videos: VideoCardData[]; total: number }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16" aria-labelledby="featured-videos-heading">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5 border-t border-[var(--color-border)] pt-10">
        <div><p className="mb-3 text-[11px] tracking-[0.18em] text-[var(--color-accent)]">AI FILMS & VISUAL NOTES</p><h2 id="featured-videos-heading" className="mb-3 text-3xl font-semibold tracking-tight">프롬프트로 만든 장면들.</h2><p className="text-sm text-[var(--color-foreground-muted)]">상상한 캐릭터와 이야기를 짧은 영상으로 옮깁니다.</p></div>
        <Link href="/videos" className="inline-flex shrink-0 items-center gap-2 py-2 text-sm text-[var(--color-accent)]">{total}편 모두 보기 <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3">{videos.map((video) => <VideoCard key={video.id} video={video} />)}</div>
    </section>
  )
}