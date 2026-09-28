'use client'

import { useState } from 'react'
import { ArrowDown, Search } from 'lucide-react'
import { videoPlatforms, type VideoCardData } from './video-data'
import VideoCard from './VideoCard'

const PAGE_SIZE = 12

export default function VideoGallery({ videos }: { videos: VideoCardData[] }) {
  const [platform, setPlatform] = useState('all')
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const needle = query.normalize('NFKC').toLocaleLowerCase().replace(/\s/g, '')
  const filtered = videos.filter((video) =>
    (platform === 'all' || video.platform === platform) &&
    `${video.title} ${video.description} ${videoPlatforms.find((item) => item.id === video.platform)?.name}`.normalize('NFKC').toLocaleLowerCase().replace(/\s/g, '').includes(needle)
  )

  return (
    <section id="all-videos" className="scroll-mt-24 border-t border-[var(--color-border)] pt-10 sm:pt-14" aria-labelledby="all-videos-heading">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-[0.2em] text-[var(--color-accent)]">THE COLLECTION</p>
          <h2 id="all-videos-heading" className="text-2xl font-semibold tracking-tight">영상 모아보기 <span className="ml-2 align-top text-sm font-normal text-[var(--color-foreground-muted)]">{String(videos.length).padStart(2, '0')}</span></h2>
        </div>
        <label className="flex w-full items-center gap-2 border-b border-[var(--color-border)] py-1 sm:w-64 focus-within:border-[var(--color-accent)]">
          <Search size={17} aria-hidden="true" className="shrink-0 text-[var(--color-foreground-muted)]" />
          <span className="sr-only">영상 검색</span>
          <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder="장면이나 제목으로 검색" className="min-h-11 min-w-0 flex-1 bg-transparent text-sm outline-offset-2" />
        </label>
      </div>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-x-1 gap-y-2" role="group" aria-label="제작 도구">
          {[{ id: 'all', name: '전체' }, ...videoPlatforms].map((item) => (
            <button key={item.id} type="button" aria-pressed={platform === item.id}
              onClick={() => { setPlatform(item.id); setVisibleCount(PAGE_SIZE) }}
              className={`min-h-11 rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] ${platform === item.id ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'text-[var(--color-foreground-muted)] hover:bg-[var(--color-surface-muted)]'}`}>
              {item.name} <span className="ml-1 text-[10px] tabular-nums">{item.id === 'all' ? videos.length : videos.filter((video) => video.platform === item.id).length}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-[var(--color-foreground-muted)]" role="status" aria-live="polite">{filtered.length}편의 영상</p>
      </div>
      {filtered.length ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12" data-testid="video-grid">
          {filtered.slice(0, visibleCount).map((video) => <VideoCard key={video.id} video={video} />)}
        </div>
      ) : (
        <div className="rounded-2xl bg-[var(--color-surface-muted)] px-6 py-16 text-center">
          <p className="mb-2 font-medium">검색 결과가 없어요</p>
          <p className="mb-5 text-sm text-[var(--color-foreground-muted)]">다른 제목으로 검색하거나 전체 영상을 확인해 보세요.</p>
          <button type="button" onClick={() => { setQuery(''); setPlatform('all'); setVisibleCount(PAGE_SIZE) }} className="min-h-11 text-sm text-[var(--color-accent)] underline underline-offset-4">전체 영상 보기</button>
        </div>
      )}
      {visibleCount < filtered.length && <div className="mt-12 border-t border-[var(--color-border)] pt-8 text-center"><button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-[var(--color-border)] px-7 py-3 text-sm hover:border-[var(--color-accent)]">영상 더 보기 <span className="text-[var(--color-foreground-muted)]">{Math.min(visibleCount, filtered.length)} / {filtered.length}</span><ArrowDown size={15} aria-hidden="true" /></button></div>}
    </section>
  )
}