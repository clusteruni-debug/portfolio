export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  category: 'web' | 'tool' | 'bot'
  color: string
  gradient: string
  liveUrl?: string
  githubUrl?: string
  status: 'active' | 'completed' | 'in-progress'
}

export const projects: Project[] = [
  {
    id: 'x-article-editor',
    title: 'X Article Editor',
    description: 'X(트위터) 아티클 작성을 위한 리치 텍스트 에디터',
    longDescription: 'TipTap 기반 WYSIWYG 에디터로, X 아티클에 최적화된 작성 환경을 제공합니다. 실시간 저장, 이미지 업로드, 마크다운 지원.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'TipTap'],
    category: 'web',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-500',
    status: 'active',
  },
  {
    id: 'asset-manager',
    title: '자산관리 (Web3 가계부)',
    description: 'Web3 수익 추적 + RPG 게이미피케이션 가계부',
    longDescription: '크립토 수익을 추적하고 RPG 요소로 재미를 더한 가계부. Chart.js 시각화와 Supabase 실시간 동기화.',
    tech: ['Vite', 'JavaScript', 'Supabase', 'Chart.js'],
    category: 'web',
    color: '#10b981',
    gradient: 'from-emerald-500 to-green-500',
    status: 'active',
  },
  {
    id: 'navigator',
    title: 'Navigator (할일 관리)',
    description: 'ADHD 친화적 할일 관리 + 수익 추적',
    longDescription: 'ADHD 사용자를 위한 직관적 할일 관리. 수익 추적, 카테고리 분류, Firebase 실시간 동기화를 지원합니다.',
    tech: ['HTML', 'JavaScript', 'Firebase'],
    category: 'tool',
    color: '#f97316',
    gradient: 'from-orange-500 to-amber-500',
    liveUrl: 'https://junhee-park.github.io/todolist/',
    status: 'active',
  },
  {
    id: 'baby-care',
    title: 'Baby Care',
    description: '부부 공유 육아 기록 앱 (수유/수면/기저귀/성장)',
    longDescription: '부부가 함께 사용하는 육아 기록 앱. PWA로 오프라인 지원, 가족 초대 코드 공유, WHO 성장 곡선 차트.',
    tech: ['Next.js', 'TypeScript', 'Firebase', 'PWA'],
    category: 'web',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-500',
    status: 'active',
  },
  {
    id: 'kimchi-premium',
    title: 'Kimchi Premium',
    description: '김치 프리미엄 실시간 모니터링 대시보드',
    longDescription: 'WebSocket으로 업비트/바이낸스 실시간 가격을 비교하여 김치 프리미엄을 모니터링. 히트맵 시각화, 브라우저 알림 지원.',
    tech: ['React', 'Vite', 'WebSocket'],
    category: 'tool',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-500',
    status: 'active',
  },
  {
    id: 'telegram-event-bot',
    title: 'Telegram Event Bot',
    description: '텔레그램 이벤트/에어드랍 수집 봇',
    longDescription: '텔레그램 채널에서 이벤트와 에어드랍 정보를 자동 수집하여 알려주는 봇. Flask API + Supabase 저장.',
    tech: ['Python', 'Flask', 'Supabase', 'Telegram API'],
    category: 'bot',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-teal-500',
    status: 'in-progress',
  },
]

export const categories = [
  { id: 'all', label: '전체' },
  { id: 'web', label: '웹 앱' },
  { id: 'tool', label: '도구' },
  { id: 'bot', label: '봇' },
] as const

export type CategoryId = (typeof categories)[number]['id']
