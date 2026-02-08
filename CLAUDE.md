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

## 현재 세션 상태

**마지막 작업**: 초기 구현 완료 (전체 5개 섹션)
**다음 작업**: 없음
