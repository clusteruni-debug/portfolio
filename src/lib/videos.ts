import catalog from '@/data/videos.json'
import { type VideoCardData } from '@/components/videos/video-data'

export type Video = (typeof catalog)[number]
export const videos: Video[] = catalog

export function toVideoCard(video: Video): VideoCardData {
  const { id, title, platform, date, description, duration, poster, isExperiment } = video
  return { id, title, platform, date, description, duration, poster, isExperiment }
}

export function getFeaturedVideos() {
  return ['seoul-cat', 'thirty-seconds', 'pickup']
    .map((id) => videos.find((video) => video.id === id))
    .filter((video): video is Video => Boolean(video)).map(toVideoCard)
}

/** Server-side delivery lookup; relative MP4s are ignored local preview copies. */
export function getPlaybackUrl(video: Video) {
  if (video.playbackUrl) return video.playbackUrl
  const base = process.env.PORTFOLIO_VIDEO_BASE_URL?.replace(/\/$/, '')
  if (base?.startsWith('https://')) return `${base}/${video.id}.mp4`
  return `/videos/media/${video.id}.mp4`
}
