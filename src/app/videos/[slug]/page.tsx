import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import VideoPlayer from '@/components/videos/VideoPlayer'
import VideoCard from '@/components/videos/VideoCard'
import { formatDuration, getPlatform } from '@/components/videos/video-data'
import { getPlaybackUrl, toVideoCard, videos } from '@/lib/videos'

type Props = { params: Promise<{ slug: string }> }
export const dynamicParams = false
export function generateStaticParams() { return videos.map((video) => ({ slug: video.id })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const video = videos.find((item) => item.id === slug)
  if (!video) return { title: '영상을 찾을 수 없어요' }
  return { title: `${video.title} | AI 영상`, description: video.description, openGraph: { images: [video.poster] } }
}

export default async function VideoPage({ params }: Props) {
  const { slug } = await params
  const video = videos.find((item) => item.id === slug)
  if (!video) notFound()
  const related = videos.filter((item) => item.platform === video.platform && item.id !== video.id).slice(0, 3)
  return (
    <article className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-8 sm:pt-32">
      <Link href="/videos" className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)]"><ArrowLeft size={16} aria-hidden="true" />영상 모아보기</Link>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div><p className="mb-3 text-[11px] font-medium tracking-[0.18em] text-[var(--color-accent)]">AI FILM · {getPlatform(video.platform)}</p><h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{video.title}</h1></div>
        <p className="text-xs tabular-nums text-[var(--color-foreground-muted)]">{video.date.replaceAll('-', '.')}<span className="mx-3">/</span>{formatDuration(video.duration)}</p>
      </div>
      <div className="overflow-hidden rounded-2xl bg-[var(--color-code-bg)] p-2 sm:p-4">
        <VideoPlayer key={video.id} title={video.title} src={getPlaybackUrl(video)} poster={video.poster} width={video.width} height={video.height} />
      </div>
      <div className="mt-9 grid gap-4 border-b border-[var(--color-border)] pb-10 md:grid-cols-[1fr_2.5fr] md:gap-12">
        <p className="text-xs font-medium tracking-[0.1em] text-[var(--color-accent)]">ABOUT THIS FILM</p>
        <div className="max-w-2xl">
          <p className="text-base leading-[1.9] text-[var(--color-foreground-muted)]">{video.description}</p>
          {video.credits && <p className="mt-4 text-xs leading-relaxed text-[var(--color-foreground-muted)]">{video.credits}</p>}
          {video.postUrl && <a href={video.postUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-[var(--color-accent)] underline underline-offset-4">처음 올린 글 보기<ArrowUpRight size={15} aria-hidden="true" /></a>}
        </div>
      </div>
      {related.length > 0 && <section className="mt-12"><div className="mb-7 flex items-center justify-between"><h2 className="text-xl font-semibold">이어 볼 영상</h2><Link href="/videos" className="py-2 text-sm text-[var(--color-accent)]">전체 보기 &rarr;</Link></div><div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <VideoCard key={item.id} video={toVideoCard(item)} />)}</div></section>}
    </article>
  )
}