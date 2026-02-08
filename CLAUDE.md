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

## 🔌 MCP 서버 & 도구

- **context7**: 라이브러리 최신 문서 자동 주입 (`resolve-library-id` → `get-library-docs`)
- **claude-mem**: 세션 히스토리 압축 + 컨텍스트 유실 방지
- **ccusage**: `npx ccusage@latest daily` — 토큰 비용 확인

---

## 🔒 세션 잠금

이 프로젝트는 세션 잠금 시스템 적용 대상입니다.
- 작업 시작: `/session-start` → `.claude-lock` 생성 → 다른 세션 수정 차단
- 작업 종료: `/session-end` → `.claude-lock` 삭제
- **다른 세션에서 이 프로젝트를 수정하려 하면 PreToolUse hook이 자동 차단합니다**

---

## 현재 세션 상태

**마지막 작업**: 레이아웃 버그 수정 + 이름 변경 + GitHub Pages 배포 완료
**배포 URL**: https://clusteruni-debug.github.io/portfolio/

### 다음 세션 TODO
1. **Hero 타이틀 줄바꿈 개선** — "안녕하세요, 람쥐썬더입니다"가 "입니다"에서 줄바꿈됨. `whitespace-nowrap` 또는 폰트 크기 조정 필요
2. **프로젝트 스크린샷 교체** — `public/screenshots/`에 실제 캡처 넣고 ProjectCard의 placeholder 그라디언트를 `<img>`로 교체
3. **OG 메타 태그** — `index.html`에 og:title, og:description, og:image 추가 (링크 공유 시 미리보기)
4. **모바일 반응형 점검** — 375px에서 Hero 텍스트 크기, 카드 여백, 헤더 네비 확인
5. **프로젝트 카드에 GitHub 링크 추가** — `data/projects.ts`에 githubUrl 채우고 카드에 아이콘 표시
