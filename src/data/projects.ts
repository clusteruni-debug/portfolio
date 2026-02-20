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
    githubUrl: 'https://github.com/clusteruni-debug/article-editor',
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
    githubUrl: 'https://github.com/clusteruni-debug/web3-budget-app',
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
    githubUrl: 'https://github.com/clusteruni-debug/To-do-list-for-adhd',
    status: 'active',
  },
  {
    id: 'baby-care',
    title: 'Baby Care',
    description: '부부 공유 육아 기록 앱 — 1탭 빠른 기록 + 커스터마이징',
    longDescription: '부부가 함께 사용하는 육아 기록 앱. PWA로 오프라인 지원, 가족 초대 코드 공유, WHO 성장 곡선 차트. 기록 항목과 UI를 자유롭게 커스터마이징할 수 있는 시스템.',
    tech: ['Next.js', 'TypeScript', 'Firebase', 'PWA'],
    category: 'web',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-500',
    githubUrl: 'https://github.com/clusteruni-debug/baby-care',
    status: 'active',
  },
  {
    id: 'kimchi-premium',
    title: 'Kimchi Premium',
    description: '김치 프리미엄 실시간 모니터링 + 이중 거래소 시그널',
    longDescription: 'WebSocket으로 업비트/바이낸스 실시간 가격을 비교하여 김치 프리미엄을 모니터링. 히트맵 시각화, 브라우저 알림, 이중 거래소 시그널 시스템 지원.',
    tech: ['React', 'Vite', 'WebSocket', 'Supabase'],
    category: 'tool',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-500',
    githubUrl: 'https://github.com/clusteruni-debug/Kimpbotforme',
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
    githubUrl: 'https://github.com/clusteruni-debug/telegram-event-bot',
    status: 'active',
  },
  {
    id: 'make-money',
    title: 'Make Money (AI 자동매매)',
    description: 'Polymarket AI 예측시장 자동매매 봇 + 실시간 대시보드',
    longDescription: '8개 트레이딩 엔진이 Claude AI로 시장을 분석하고 자동으로 거래합니다. 실시간 대시보드로 포지션/P&L/엔진 상태를 모니터링.',
    tech: ['Node.js', 'Express', 'React', 'SQLite', 'Claude AI'],
    category: 'bot',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-500',
    githubUrl: 'https://github.com/clusteruni-debug/make-money-project',
    status: 'active',
  },
  {
    id: 'openclaw',
    title: 'OpenClaw (코딩봇)',
    description: '텔레그램으로 Claude Code를 원격 제어하는 자율 코딩봇',
    longDescription: '텔레그램 메시지로 코딩 작업을 지시하면 Claude Code CLI가 자율 실행. 7종 에러 분류, 헬스 API, pm2 프로세스 관리.',
    tech: ['Python', 'Telegram Bot API', 'Claude Code CLI'],
    category: 'bot',
    color: '#a855f7',
    gradient: 'from-purple-500 to-fuchsia-500',
    githubUrl: 'https://github.com/clusteruni-debug/openclaw-bot',
    status: 'active',
  },
  {
    id: 'mission-control',
    title: 'Mission Control',
    description: '워크스페이스 전체 프로젝트 관제 대시보드',
    longDescription: '모든 프로젝트의 상태를 한눈에. Make Money P&L, 봇 헬스체크, GitHub 커밋 타임라인, 생산성 통계를 통합 모니터링.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    category: 'web',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-blue-500',
    githubUrl: 'https://github.com/clusteruni-debug/mission-control',
    status: 'active',
  },
  {
    id: 'saitama-training',
    title: 'Saitama Training',
    description: '사이타마 컨셉 프로그레시브 오버로드 홈트레이닝 앱',
    longDescription: '원펀맨 사이타마의 훈련 철학으로 매일 조금씩 강해지는 홈트 기록 앱. 운동 기록, 프로그레시브 오버로드 추적, Firebase 동기화.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'zustand'],
    category: 'web',
    color: '#ef4444',
    gradient: 'from-red-500 to-orange-500',
    githubUrl: 'https://github.com/clusteruni-debug/Saitama-training',
    status: 'active',
  },
  {
    id: 'text-rpg',
    title: 'Text RPG Engine',
    description: 'JSON 기반 웹 텍스트 RPG 엔진',
    longDescription: 'JSON으로 시나리오를 정의하면 웹에서 플레이할 수 있는 텍스트 RPG 엔진. 분기 선택, 인벤토리, 전투 시스템.',
    tech: ['Vite', 'JavaScript'],
    category: 'tool',
    color: '#14b8a6',
    gradient: 'from-teal-500 to-emerald-500',
    githubUrl: 'https://github.com/clusteruni-debug/ramgtd-text-rpg',
    status: 'active',
  },
]

export const categories = [
  { id: 'all', label: '전체' },
  { id: 'web', label: '웹 앱' },
  { id: 'tool', label: '도구' },
  { id: 'bot', label: '봇' },
] as const

export type CategoryId = (typeof categories)[number]['id']
