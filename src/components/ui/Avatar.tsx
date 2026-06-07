'use client'

import Image from 'next/image'
import { Zap } from 'lucide-react'

interface AvatarProps {
  /**
   * Image URL. When null/undefined, a warm branded placeholder renders instead.
   * To drop in the real 람쥐썬더 portrait later, put the file in /public and
   * pass src="/your-file.png" — every Avatar across the site updates at once.
   */
  src?: string | null
  alt?: string
  /** Diameter (circle) or box size (rounded) in px. */
  size?: number
  /** Circular avatar (default) or soft-rounded card. */
  shape?: 'circle' | 'rounded'
  /** Next/Image priority — set true for the above-the-fold hero avatar. */
  priority?: boolean
  className?: string
}

export default function Avatar({
  src,
  alt = '람쥐썬더',
  size = 160,
  shape = 'circle',
  priority = false,
  className = '',
}: AvatarProps) {
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-3xl'

  return (
    <div
      className={`relative overflow-hidden border border-[var(--border)] ${radius} ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${alt} 프로필 이미지 자리`}
          className="flex h-full w-full items-center justify-center"
          style={{ background: 'var(--gradient-warm)' }}
        >
          <Zap
            size={Math.round(size * 0.36)}
            strokeWidth={1.5}
            className="text-[var(--accent)]"
            aria-hidden
          />
        </div>
      )}
    </div>
  )
}
