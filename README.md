# 힐링안과 (Healing Eye Clinic) 🏥

> 프리미엄 시력교정 전문 안과 웹사이트

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)
[![next-intl](https://img.shields.io/badge/next--intl-4.8.0-green)](https://next-intl-docs.vercel.app/)

## 📋 프로젝트 개요

힐링안과는 강남구 신논현역에 위치한 프리미엄 시력교정 전문 안과의 공식 웹사이트입니다.
최첨단 장비와 대학병원 교수 출신 의료진의 전문성을 바탕으로 최상의 시력교정 서비스를 제공합니다.

### 🌟 주요 기능

- **다국어 지원** (7개 언어)
  - 🇰🇷 한국어 (ko) - 기본 언어
  - 🇺🇸 영어 (en)
  - 🇯🇵 일본어 (ja)
  - 🇨🇳 중국어 간체 (zh-CN)
  - 🇹🇼 중국어 번체 (zh-TW)
  - 🇹🇭 태국어 (th)
  - 🇷🇺 러시아어 (ru)

- **반응형 디자인**
  - 모바일, 태블릿, 데스크톱 최적화
  - 터치 제스처 지원

- **프리미엄 UI/UX**
  - Framer Motion 애니메이션
  - 부드러운 스크롤 효과
  - 커스텀 커서 (데스크톱)

- **실시간 콘텐츠**
  - YouTube RSS 피드 연동
  - Naver 블로그 연동
  - FAQ 47개 항목 (7개 카테고리)

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd healingeyeclinic

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 환경 변수

`.env.local` 파일을 생성하고 필요한 환경 변수를 설정하세요:

```env
# 필요한 경우 추가
NEXT_PUBLIC_SITE_URL=https://www.healingeye.co.kr
```

## 📁 프로젝트 구조

```
healingeyeclinic/
├── src/
│   ├── app/
│   │   └── [locale]/          # 다국어 라우팅
│   │       ├── page.tsx        # 홈 페이지
│   │       ├── about/          # 병원 소개
│   │       ├── vision/         # 시력교정술
│   │       ├── cataract/       # 노안/백내장
│   │       ├── center/         # 안질환 센터
│   │       ├── insight/        # 인사이트 (블로그)
│   │       └── community/      # 커뮤니티 (FAQ)
│   ├── components/
│   │   ├── layout/             # 레이아웃 컴포넌트
│   │   ├── home/               # 홈 섹션 컴포넌트
│   │   ├── ui/                 # UI 컴포넌트
│   │   └── [page]/             # 페이지별 컴포넌트
│   ├── i18n/
│   │   ├── config.ts           # 다국어 설정
│   │   └── request.ts          # 다국어 요청 핸들러
│   ├── lib/                    # 유틸리티 함수
│   └── messages/               # 다국어 메시지 파일
│       ├── ko.json
│       ├── en.json
│       ├── ja.json
│       ├── zh-CN.json
│       ├── zh-TW.json
│       ├── th.json
│       └── ru.json
├── public/
│   └── images/                 # 이미지 에셋
├── DEVLOG.md                   # 개발 일지
├── CHANGELOG.md                # 변경 이력
└── README.md                   # 프로젝트 문서
```

## 🛠 기술 스택

### Core
- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)

### UI/UX
- **Animation**: [Framer Motion 12.29.2](https://www.framer.com/motion/)
- **Carousel**: [Embla Carousel React 8.6.0](https://www.embla-carousel.com/)
- **Icons**: [Lucide React 0.563.0](https://lucide.dev/)
- **Smooth Scroll**: [@studio-freight/lenis 1.0.42](https://lenis.studiofreight.com/)

### i18n
- **Internationalization**: [next-intl 4.8.0](https://next-intl-docs.vercel.app/)
- **Supported Locales**: ko, en, ja, zh-CN, zh-TW, th, ru

### Content
- **YouTube Integration**: RSS Parser 3.13.0
- **Markdown**: next-mdx-remote 5.0.0
- **Frontmatter**: gray-matter 4.0.3

### Development
- **Linting**: ESLint 9 with Next.js config
- **Type Checking**: TypeScript 5
- **Browser Testing**: Chrome DevTools Protocol (CDP) MCP

## 📱 페이지 구성

### 메인 페이지
- **홈 (/)**: 9개 섹션으로 구성된 원페이지
  - Hero, Philosophy, Why Healing Eye, Services
  - AI Prediction, Premium Facility, Medical Team
  - Doctor Profile, Reviews

### 서브 페이지
- **병원소개 (/about)**: 인사말, 의료진, 연혁, 철학, 시설, 오시는 길
- **시력교정술 (/vision)**: 스마일 라식, 라식, 라섹, ICL, 재수술
- **노안/백내장 (/cataract)**: 백내장 검사, 렌즈 선택, 생활 패턴 매칭
- **안질환 센터 (/center)**: 안구건조증, 녹내장, 망막질환, 장비 소개
- **인사이트 (/insight)**: YouTube 영상, Naver 블로그, 전문가 Q&A
- **커뮤니티 (/community)**: 공지사항, 이벤트, FAQ (47개 항목)

## 🌐 다국어 지원

### 번역 상태

| 언어 | 진행률 | 상태 |
|------|--------|------|
| 🇰🇷 한국어 (ko) | 100% | ✅ 완료 (기준) |
| 🇺🇸 영어 (en) | 100% | ✅ 완료 |
| 🇯🇵 일본어 (ja) | 100% | ✅ 완료 |
| 🇨🇳 중국어 간체 (zh-CN) | 100% | ✅ 완료 |
| 🇹🇼 중국어 번체 (zh-TW) | 100% | ✅ 완료 |
| 🇹🇭 태국어 (th) | 100% | ✅ 완료 |
| 🇷🇺 러시아어 (ru) | 100% | ✅ 완료 |

### 번역 키 구조

```json
{
  "Navigation": { ... },
  "Common": { ... },
  "Home": {
    "Hero": { ... },
    "Philosophy": { ... },
    "Services": { ... },
    ...
  },
  "About": { ... },
  "Vision": { ... },
  "Community": {
    "FAQ": {
      "clearLasik": [ ... ],
      "lasik": [ ... ],
      "lasek": [ ... ],
      ...
    }
  }
}
```

## 🧪 테스트

### 브라우저 테스트

```bash
# 개발 서버 실행
npm run dev

# CDP MCP를 통한 브라우저 자동화 테스트
claude mcp list
```

### 빌드 테스트

```bash
# 프로덕션 빌드
npm run build

# 빌드된 앱 실행
npm run start
```

## 📦 배포

### Vercel (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수를 설정하세요:
- `NEXT_PUBLIC_SITE_URL`

## 📝 개발 일지

상세한 개발 과정과 변경 사항은 [DEVLOG.md](./DEVLOG.md)를 참고하세요.

## 📄 변경 이력

주요 변경 사항은 [CHANGELOG.md](./CHANGELOG.md)를 참고하세요.

## 🤝 기여

이 프로젝트는 힐링안과의 공식 웹사이트입니다.

## 📞 문의

- **웹사이트**: https://www.healingeye.co.kr
- **전화**: 02-566-1222
- **주소**: 서울특별시 강남구 강남대로 470 808타워 10-11층
- **카카오톡**: @healingeye
- **Instagram**: [@healingeyeclinic](https://www.instagram.com/healingeyeclinic/)

## 📜 라이센스

Copyright © 2026 Healing Eye Clinic. All rights reserved.

---

**Built with ❤️ by Claude Code & AI Native Development**
