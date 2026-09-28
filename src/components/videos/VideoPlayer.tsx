'use client'

import { useState } from 'react'

interface Props { title: string; src: string; poster: string; width: number; height: number }

export default function VideoPlayer({ title, src, poster, width, height }: Props) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div role="alert" className="flex min-h-72 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8 text-center"><p className="text-sm text-[var(--color-foreground-muted)]">영상을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</p></div>
  return <video aria-label={title} controls playsInline preload="metadata" poster={poster} width={width} height={height} onError={() => setFailed(true)} className="mx-auto max-h-[75svh] w-full rounded-2xl bg-black" src={src}>브라우저에서 동영상을 지원하지 않습니다.</video>
}
