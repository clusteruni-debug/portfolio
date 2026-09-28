export const videoPlatforms = [
  { id: 'topview', name: 'Topview' },
  { id: 'domoai', name: 'DomoAI' },
  { id: 'pollo', name: 'Pollo AI' },
  { id: 'newtake', name: 'Newtake' },
  { id: 'flow', name: 'Google Flow' },
] as const

export interface VideoCardData {
  id: string
  title: string
  platform: string
  date: string
  description: string
  duration: number
  poster: string
  isExperiment: boolean
}

export function getPlatform(id: string) {
  return videoPlatforms.find((platform) => platform.id === id)?.name ?? id
}

export function formatDuration(seconds: number) {
  const rounded = Math.floor(seconds)
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, '0')}`
}
