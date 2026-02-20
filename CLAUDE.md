# Portfolio — 포트폴리오 쇼케이스 사이트

## 스택
Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion

## 실행
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # 프로덕션 빌드
```

## 배포
GitHub Pages (GitHub Actions 자동 빌드), `git push` = 자동 배포
URL: https://clusteruni-debug.github.io/portfolio/

## 구조
```
src/
├── App.tsx             # 루트 (5개 섹션)
├── data/projects.ts    # 11개 프로젝트 데이터
├── components/
│   ├── layout/         # Header, Footer
│   ├── sections/       # Hero, Projects, Skills, Contact
│   ├── ui/             # ProjectCard, TechBadge, GlowCard, AnimatedCounter
│   └── effects/        # ParticleBackground, ScrollReveal, MouseGlow
└── hooks/              # useScrollProgress, useInView
```

## 검증 체크리스트
- [ ] tsc -b 타입 에러 없음
- [ ] 프로젝트 ID 중복 없음
- [ ] 카테고리 필터 동작 (web/tool/bot)

## 다음 TODO
1. Hero 타이틀 줄바꿈 개선 ("입니다" 분리 방지)
2. 프로젝트 스크린샷 교체 (public/screenshots/)
3. 모바일 반응형 점검 (375px)

## 참조
- CC/CX 파일 담당: agent_docs/domain-map.md
