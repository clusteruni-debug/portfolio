import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Play } from 'lucide-react'
import { formatDuration, getPlatform, type VideoCardData } from './video-data'

export default function VideoCard({ video }: { video: VideoCardData }) {
  return (
    <Link href={`/videos/${video.id}`} prefetch={false}
      className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[var(--color-focus-ring)]"
      aria-label={`${video.title} · ${getPlatform(video.platform)} 영상 보기`}>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
        <Image src={video.poster} alt="" fill sizes="(max-width: 639px) 90vw, (max-width: 1023px) 46vw, 370px" className="object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]" />
        <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-background)]" aria-hidden="true"><Play size={14} fill="currentColor" /></span>
        <span className="absolute bottom-3 right-3 rounded-md bg-black/75 px-2 py-1 text-xs tabular-nums text-white">{formatDuration(video.duration)}</span>
      </div>
      <div className="pt-4">
        <div className="mb-2 flex items-center justify-between gap-2 text-[11px] tracking-[0.08em] text-[var(--color-foreground-muted)]">
          <span className="flex flex-wrap items-center gap-2">{getPlatform(video.platform)}{video.isExperiment && <span className="rounded border border-[var(--color-border)] px-1.5 py-0.5 text-[10px] tracking-normal">실험작</span>}</span><span className="shrink-0 tabular-nums">{video.date.replaceAll('-', '.')}</span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="break-keep text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-[var(--color-accent)]">{video.title}</h3>
          <ArrowUpRight size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--color-foreground-muted)] transition-colors group-hover:text-[var(--color-accent)]" />
        </div>
        <p className="mt-2 line-clamp-2 break-keep text-sm leading-relaxed text-[var(--color-foreground-muted)]">{video.description}</p>
      </div>
    </Link>
  )
}
