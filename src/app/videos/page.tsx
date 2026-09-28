import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react'
import VideoGallery from '@/components/videos/VideoGallery'
import { formatDuration, getPlatform, videoPlatforms } from '@/components/videos/video-data'
import { toVideoCard, videos } from '@/lib/videos'

export const metadata: Metadata = {
  title: 'AI 영상 | 기록하는 사람',
  description: '프롬프트로 만든 짧은 영화, 캐릭터 애니메이션과 시각 실험. Topview, DomoAI, Pollo AI, Newtake, Google Flow로 제작한 영상 작업을 모았습니다.',
}

export default function VideosPage() {
  const featured = videos.find((video) => video.id === 'seoul-cat') ?? videos[0]
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-8 sm:pt-36">
      <section className="mb-16 grid items-center gap-10 md:mb-20 md:grid-cols-[0.85fr_1.15fr] md:gap-12" aria-labelledby="videos-heading">
        <div>
          <p className="mb-6 flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] text-[var(--color-accent)]"><span className="h-px w-7 bg-[var(--color-accent)]" />AI FILMS & VISUAL NOTES</p>
          <h1 id="videos-heading" className="mb-6 text-[2.6rem] font-semibold leading-[1.2] tracking-[-0.055em] sm:text-[3.25rem] lg:text-[3.65rem]">프롬프트로<br />만든 장면들<span className="text-[var(--color-accent)]">.</span></h1>
          <p className="max-w-sm break-keep text-sm leading-[1.9] text-[var(--color-foreground-muted)]">캐릭터를 만들고, 이야기를 쓰고, 움직임을 상상합니다. 프롬프트에서 시작한 짧은 영화와 영상 실험을 모았습니다.</p>
          <a href="#all-videos" className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-[var(--color-foreground)] pb-1 text-sm font-medium">작품 둘러보기 <ArrowDown size={16} aria-hidden="true" /></a>
          <div className="mt-9 flex items-center gap-5 text-[11px] text-[var(--color-foreground-muted)]">
            <span className="shrink-0 whitespace-nowrap"><strong className="mr-1.5 text-lg font-medium text-[var(--color-foreground)]">{String(videos.length).padStart(2, '0')}</strong>작품</span>
            <span className="h-5 w-px bg-[var(--color-border)]" />
            <span className="shrink-0 whitespace-nowrap"><strong className="mr-1.5 text-lg font-medium text-[var(--color-foreground)]">{videoPlatforms.length}</strong>개의 제작 도구</span>
            <span className="ml-auto hidden whitespace-nowrap text-[var(--color-accent)] lg:inline" style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem' }}>in motion</span>
          </div>
        </div>
        <Link href={`/videos/${featured.id}`} prefetch={false} className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[var(--color-focus-ring)]" aria-label={`대표작 ${featured.title} 보기`}>
          <div className="mb-3 flex justify-between text-[10px] font-medium tracking-[0.18em] text-[var(--color-foreground-muted)]"><span>IN THE SPOTLIGHT</span><span>01 / {String(videos.length).padStart(2, '0')}</span></div>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
            <Image src={featured.poster} alt="남산타워와 서울을 내려다보는 거대한 고양이" fill priority sizes="(max-width: 767px) 90vw, 600px" className="object-contain motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.025]" />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-background)] px-4 py-2.5 text-xs font-medium text-[var(--color-foreground)]"><Play size={12} fill="currentColor" aria-hidden="true" />영상 보기</span>
            <span className="absolute bottom-5 right-5 rounded-md bg-black/75 px-2 py-1 text-xs tabular-nums text-white">{formatDuration(featured.duration)}</span>
          </div>
          <div className="mt-4 flex items-start justify-between gap-4">
            <div><p className="mb-1 text-[11px] text-[var(--color-foreground-muted)]">{getPlatform(featured.platform)} · 2026</p><h2 className="text-lg font-semibold tracking-tight group-hover:text-[var(--color-accent)]">{featured.title}</h2></div>
            <ArrowUpRight size={23} aria-hidden="true" className="mt-4 text-[var(--color-accent)]" />
          </div>
        </Link>
      </section>
      <VideoGallery videos={videos.map(toVideoCard)} />
      <p className="mt-16 border-t border-[var(--color-border)] pt-6 text-center text-xs leading-relaxed text-[var(--color-foreground-muted)]">한 장면을 만드는 여러 번의 시도. 그중 남겨두고 싶은 영상들.</p>
    </div>
  )
}
