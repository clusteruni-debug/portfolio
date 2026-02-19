> ⚠️ **글로벌 규칙 적용**: 절대 규칙, 보안, Git, 능동적 작업, 구현 완결성, 영향도 분석, 디버깅, 검증, 세션 프로토콜 등 공통 규칙은 `~/.claude/CLAUDE.md` 참조. 이 파일은 **프로젝트 고유 정보만** 담습니다.

# Portfolio - 포트폴리오 쇼케이스 사이트

## 프로젝트
- **이름**: Portfolio
- **스택**: Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion
- **한 줄 설명**: 바이브코딩 프로젝트 6개를 보여주는 인터랙티브 포트폴리오

---

## 실행 방법
```bash
cd portfolio
npm install
npm run dev     # http://localhost:5173
npm run build   # 프로덕션 빌드
npm run preview # 빌드 미리보기
```

## 배포
- GitHub Pages (GitHub Actions 자동 빌드)
- `git push` → 자동 배포

## 파일 구조
```
portfolio/
├── vite.config.ts          # base: '/portfolio/'
├── postcss.config.mjs      # Tailwind v4
├── src/
│   ├── App.tsx             # 루트 (5개 섹션 조합)
│   ├── index.css           # Tailwind + 다크 테마 변수
│   ├── data/projects.ts    # 6개 프로젝트 데이터
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   ├── sections/       # Hero, Projects, Skills, Contact
│   │   ├── ui/             # ProjectCard, TechBadge, GlowCard, AnimatedCounter
│   │   └── effects/        # ParticleBackground, ScrollReveal, MouseGlow
│   └── hooks/              # useScrollProgress, useInView
├── public/
│   ├── favicon.svg
│   └── screenshots/        # 프로젝트 스크린샷 (추후 교체)
└── .github/workflows/deploy.yml
```

## 🔌 MCP 서버 & 🔒 세션 잠금

> [워크스페이스 CLAUDE.md](../CLAUDE.md) 참고 (글로벌 설정)

---

## 현재 세션 상태

**마지막 작업**: OG 메타태그 + GitHub 링크 추가
**배포 URL**: https://clusteruni-debug.github.io/portfolio/

### 다음 세션 TODO
1. **Hero 타이틀 줄바꿈 개선** — "안녕하세요, 람쥐썬더입니다"가 "입니다"에서 줄바꿈됨. `whitespace-nowrap` 또는 폰트 크기 조정 필요
2. **프로젝트 스크린샷 교체** — `public/screenshots/`에 실제 캡처 넣고 ProjectCard의 placeholder 그라디언트를 `<img>`로 교체
3. **모바일 반응형 점검** — 375px에서 Hero 텍스트 크기, 카드 여백, 헤더 네비 확인
