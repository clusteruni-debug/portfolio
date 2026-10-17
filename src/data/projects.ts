export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  summary: string
  stack: string
  status: string
  links?: ProjectLink[]
}

export interface ProjectGroup {
  id: string
  label: string
  description: string
  projects: Project[]
}

export const workspace = {
  title: 'AI 에이전트 작업 환경',
  summary:
    '코딩을 배운 적 없는 상태에서 2026년 2월부터 Claude Code와 Codex만으로 프로젝트를 만들어 왔습니다. 그 과정에서 생긴 반복 실수를 규칙·훅·자동 검사로 바꿔, 여러 AI 에이전트가 같은 작업 공간에서 충돌 없이 일하는 환경을 직접 설계했습니다.',
  points: [
    '작업을 시작할 때 프로젝트 맥락을 불러오고, 끝낼 때 검증 결과와 인수인계를 남기는 세션 흐름',
    '설계는 Claude, 분량 많은 구현은 Codex로 나누고, 검토는 작성하지 않은 모델이 맡는 규칙',
    '"완료"라고 말하기 전에 실행 증거를 요구하는 훅과 테스트 1,300여 개',
    '같은 실수가 두 번 나오면 기록하고, 세 번이면 자동 트리거로 올리는 기억 체계',
  ],
  stats: [
    { value: '55', label: '프로젝트' },
    { value: '11,260', label: '커밋' },
    { value: '68', label: '설계 결정 기록' },
    { value: '44', label: '자동 훅' },
  ],
  stack: 'Claude Code · Codex · Bash · Python · Git hooks',
}

export const projectGroups: ProjectGroup[] = [
  {
    id: 'ai',
    label: 'AI 제품',
    description: '모델을 기능의 중심에 둔 제품들',
    projects: [
      {
        id: 'forfitter',
        title: 'ForFitter',
        summary:
          '크로스핏 5년 경험에서 출발한 AI 코치 앱. 운동 기록과 체감 강도를 읽어 다음 프로그램을 짜고, 안전·운동 품질·성장·기술 개선 네 가지 기준으로 결과를 검사합니다.',
        stack: 'React Native (Expo) · TypeScript · Supabase · Claude API',
        status: '앱스토어 심사 중',
      },
      {
        id: 'finalpick',
        title: 'FinalPick',
        summary:
          'AI가 만든 후보를 비교하고, 무엇을 왜 골랐는지 기록해 다음 결정의 근거로 쓰는 도구. 에이전트는 검토를 준비할 뿐, 최종 승인은 사람만 할 수 있게 설계했습니다.',
        stack: 'HTML · JavaScript · WebMCP',
        status: 'OpenAI WebMCP Challenge 출품',
        links: [
          { label: '데모', href: 'https://finalpick.vercel.app' },
          { label: 'GitHub', href: 'https://github.com/clusteruni-debug/finalpick-webmcp' },
        ],
      },
      {
        id: 'ai-hub',
        title: 'AI Hub',
        summary:
          'ChatGPT·Claude·Gemini 같은 여러 AI를 한 창의 탭으로 쓰고, 모든 대화를 저장해 터미널의 AI 에이전트가 MCP로 다시 꺼내 쓰게 하는 데스크톱 앱과 크롬 확장.',
        stack: 'Electron · Chrome Extension MV3 · Supabase · MCP',
        status: '개인 사용 중',
      },
      {
        id: 'comic-studio',
        title: 'Comic Studio',
        summary:
          '혼자 만화를 그리는 사람이 세계관과 캐릭터를 유지한 채, 페이지 사건을 말하면 컷 구성 제안을 받아 직접 고쳐 적용하는 작업 도구.',
        stack: 'Next.js 16 · React 19 · Konva',
        status: '개발 중',
      },
    ],
  },
  {
    id: 'tools',
    label: '개발 도구 · 자동화',
    description: '내 작업을 덜어 주려고 만든 것들',
    projects: [
      {
        id: 'webterm',
        title: 'Webterm',
        summary:
          '여러 AI 에이전트 세션을 한 화면에서 띄우고 관리하는 터미널 대시보드. 무거운 브라우저 탭 대신 데스크톱 앱으로 감쌌습니다.',
        stack: 'Tauri · Node · node-pty · React · xterm.js',
        status: '매일 사용',
      },
      {
        id: 'mission-control',
        title: 'Mission Control',
        summary: '프로젝트 상태, 상시 서비스, 봇 상태를 한눈에 보는 운영 대시보드.',
        stack: 'Next.js 16 · TypeScript · Supabase · GitHub API',
        status: '운영 중',
      },
      {
        id: 'video-autopilot',
        title: 'Video Autopilot',
        summary:
          '주제 조사, 대본, 그림, 음성, 편집까지 쇼츠 제작 단계를 나누고, 단계마다 자동 검사와 사람의 확인을 거치게 만든 로컬 제작 도구.',
        stack: 'Python · PowerShell · FFmpeg',
        status: '운영 중',
      },
      {
        id: 'blog-autopilot',
        title: 'Blog Autopilot',
        summary:
          '내가 승인한 메모만 읽어 블로그 초안 세 가지와 이미지를 만들고 검사하는 도구. 로그인과 게시는 하지 않고 사람에게 넘깁니다.',
        stack: 'Python · Pillow · PowerShell',
        status: '운영 중',
      },
      {
        id: 'contest-radar',
        title: 'Contest Radar',
        summary: '국내 AI 공모전과 해커톤을 매일 모아 생성형 AI 창작과 개발 두 갈래로 보여 주는 페이지.',
        stack: 'Cloudflare Workers · Cron · KV',
        status: '운영 중',
        links: [{ label: '사이트', href: 'https://contest-radar.clusteruni.workers.dev' }],
      },
      {
        id: 'bots',
        title: '데이터 수집 · 알림 봇',
        summary:
          '텔레그램 채널 공지를 분류해 대시보드로 모으는 봇과, 실시간 데이터를 받아 조건이 맞으면 알려 주는 봇을 상시 서비스로 운영합니다.',
        stack: 'Python · Flask · WebSocket · Supabase',
        status: '운영 중',
      },
    ],
  },
  {
    id: 'games',
    label: '게임 · 미니앱',
    description: '공모전과 챌린지에 낸 것들',
    projects: [
      {
        id: 'minting-hero',
        title: 'Minting Hero',
        summary:
          '행동을 미리 짜 두면 리듬처럼 실행되는 턴제 픽셀 플랫폼 RPG. OpenAI Game Builders Seoul에 제출했습니다.',
        stack: 'Godot 4 · GDScript',
        status: '웹 데모',
        links: [{ label: '플레이', href: 'https://minting-hero-web.vercel.app' }],
      },
      {
        id: 'maple-arcade',
        title: '메이플 아케이드 3종',
        summary:
          '레벨 1 미끼가 되어 몬스터를 끌고 다니는 LAST HIT, 무너지는 절벽에서 도망치는 러너, 60초 스타포스 타이밍 게임. Verse8 바이브캠프에 낸 세 작품입니다.',
        stack: 'Phaser · React · TypeScript · Verse8',
        status: '플랫폼 출품',
      },
      {
        id: 'toss-miniapps',
        title: '토스 미니앱 3종',
        summary:
          '목표 거리를 뛰면 맥주집을 열어 주는 앱, 화나서 사려는 물건을 60초 붙잡아 두는 앱, 2011~2021 여름 플레이리스트 앱. 토스 바이브코딩 챌린지 출품작입니다.',
        stack: 'React · Vite · Apps in Toss',
        status: '챌린지 출품',
      },
    ],
  },
  {
    id: 'life',
    label: '생활 도구',
    description: '직접 겪은 불편함에서 시작한 것들',
    projects: [
      {
        id: 'navigator',
        title: 'Navigator',
        summary: '할 일 목록이 실제 행동으로 이어지지 않는 문제를 풀려고, 지금 할 한 가지만 골라 주는 할 일 도구.',
        stack: 'Vanilla JS · Firebase',
        status: '운영 중',
        links: [{ label: '사이트', href: 'https://clusteruni-debug.github.io/navigator/' }],
      },
      {
        id: 'my1rm',
        title: 'My1RM',
        summary: '스쿼트·벤치·데드리프트 기록으로 1회 최대 무게를 세 가지 공식으로 추정하는 계산기.',
        stack: 'Vanilla JS · Cloudflare Pages Functions',
        status: 'MVP',
        links: [{ label: 'GitHub', href: 'https://github.com/clusteruni-debug/my1rm' }],
      },
      {
        id: 'baby-care',
        title: 'Baby Care',
        summary: '수유·수면·기저귀·성장·예방접종 기록을 가족이 함께 보는 육아 기록 앱.',
        stack: 'Next.js 16 · TypeScript · Firebase',
        status: '사용 중',
      },
      {
        id: 'article-editor',
        title: 'Article Editor',
        summary: 'X에 올릴 긴 글을 쓰고, 시리즈로 묶고, 반응을 추적하는 개인 글쓰기 도구. 이 사이트의 글도 여기서 씁니다.',
        stack: 'Next.js 16 · TipTap · Supabase',
        status: '사용 중',
      },
      {
        id: 'asset-manager',
        title: 'Asset Manager',
        summary: '부업 수입과 지출을 정리하고, 목표 달성을 게임 레벨처럼 보여 주는 가계부.',
        stack: 'Vite · Vanilla JS · Supabase · Chart.js',
        status: '사용 중',
      },
    ],
  },
]

export const projectCount = projectGroups.reduce((sum, group) => sum + group.projects.length, 0)
