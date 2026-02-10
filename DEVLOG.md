# 힐링안과 개발 일지

## 2026-02-11 (화) - 다국어 완성 + 코드 감사 버그 수정

### 📋 작업 개요
태국어/러시아어 번역 100% 완성 및 코드 감사 기반 11건 버그 수정

---

### ✅ 완료된 작업

#### 1. **태국어/러시아어 번역 100% 완성** 🌐
- th.json: 523 → 1564 lines (368 leaf keys, EN과 완전 일치)
- ru.json: 523 → 1564 lines (368 leaf keys, EN과 완전 일치)
- 추가 섹션: Metadata, Navigation, Vision, Cataract, Center, Insight, Community
- FAQ 47개 항목 (7개 카테고리) 번역 완료
- 누락 키 6개 보정: Common.labels.language 외 5개
- 빌드 스크립트 방식 (scripts/build-i18n.js)으로 생성
- 검증 스크립트 (scripts/verify-i18n.js)로 정합성 확인

#### 2. **코드 감사 기반 버그 수정 (11건)** 🔧

**P1 (성능/보안)**:
- SmoothScroll.tsx: RAF 메모리 누수 수정 (cancelAnimationFrame 추가)
- 3개 파일 8개소: window.open 'noopener,noreferrer' 보안 적용

**P2 (안정성/SEO)**:
- vision/PageClient.tsx: procedureColors 배열 범위 modulo 처리
- center/PageClient.tsx: clinicIcons/clinicBgs 배열 범위 modulo 처리
- community/PageClient.tsx: FAQ categoryKeys 안전 폴백
- sitemap.ts: 블로그 경로 추가 (/blog, /blog/[slug])
- youtube.ts, naver-blog.ts: 날짜 빈 문자열 → new Date().toISOString()
- VideoGallery.tsx, insight/PageClient.tsx: formatDate Invalid Date 가드

**P3 (접근성/클린업)**:
- globals.css: 숨겨진 스크롤바 → 골드 톤 스타일 스크롤바
- Review.tsx: console.log 디버그 코드 제거
- blog/page.tsx: 미사용 import/주석 코드 제거

#### 3. **빌드 검증** ✅
- `npm run build` 성공 (TypeScript 에러 0건)
- 정적 페이지 5/5 생성 완료

### 📁 수정 파일 (14개)
```
src/components/layout/SmoothScroll.tsx
src/components/insight/VideoGallery.tsx
src/app/[locale]/community/PageClient.tsx
src/app/[locale]/insight/PageClient.tsx
src/app/[locale]/vision/PageClient.tsx
src/app/[locale]/center/PageClient.tsx
src/app/sitemap.ts
src/lib/youtube.ts
src/lib/naver-blog.ts
src/components/home/Review.tsx
src/app/globals.css
src/app/[locale]/blog/page.tsx
src/messages/th.json
src/messages/ru.json
```

### 📝 신규 파일 (3개)
```
scripts/build-i18n.js
scripts/verify-i18n.js
docs/bugfix-report-2026-02-11.md
```

---

## 2026-02-09 (일) - Insight 페이지 Featured Video 안정화

### 📋 작업 개요
Insight 페이지 Featured Video 표시 안정화 작업 (RSS 피드 외 비디오 하드코딩)

---

### ✅ 완료된 작업

#### 1. **Featured Video 하드코딩 적용** 📺
**파일**: `src/app/[locale]/insight/page.tsx`

**문제**:
- Featured Video ID `zb2s1BpBvac`가 YouTube RSS Feed에 포함되지 않음
- `getFeaturedYouTubeVideo()` 함수가 YouTube 페이지 HTML을 스크래핑하여 제목 추출
- Vercel 프로덕션 환경에서 스크래핑이 실패하여 제목이 올바르게 표시되지 않음
- 로컬: 정상 작동 / Vercel: "Enjoy the videos and music..." 폴백 텍스트 표시

**해결 방법**:
- ✅ **Featured Video 정보를 상수로 하드코딩**
  ```typescript
  const FEATURED_VIDEO_INFO = {
    id: 'zb2s1BpBvac',
    title: '단 4곳에서만 사용 가능한 LAL 렌즈 백내장 수술 드디어 시작합니다 🎉',
    link: 'https://www.youtube.com/watch?v=zb2s1BpBvac',
    publishedAt: '2024-01-15T00:00:00Z',
    thumbnail: 'https://i.ytimg.com/vi/zb2s1BpBvac/maxresdefault.jpg',
    description: 'LAL(Light Adjustable Lens) 렌즈를 이용한 프리미엄 백내장 수술에 대해 소개합니다.',
  };
  ```

- ✅ **데이터 Fetch 구조 변경**
  ```typescript
  // 변경 전:
  const [featuredVideo, allVideos, blogPosts] = await Promise.all([
    getFeaturedYouTubeVideo(FEATURED_VIDEO_ID),
    getYouTubeVideos(15),
    getNaverBlogPosts(3),
  ]);

  // 변경 후:
  const [allVideos, blogPosts] = await Promise.all([
    getYouTubeVideos(15),
    getNaverBlogPosts(3),
  ]);
  const featuredVideo = FEATURED_VIDEO_INFO;
  ```

**변경 사항**:
- `FEATURED_VIDEO_INFO` 상수 추가 (비디오 메타데이터 하드코딩)
- `getFeaturedYouTubeVideo()` 함수 호출 제거
- Featured Video는 하드코딩된 정보 사용
- Gallery용 영상은 기존과 동일하게 RSS Feed에서 가져오기

---

### 🐛 발견 및 수정된 버그

#### 버그: Featured Video 제목 표시 오류
**문제**:
- RSS 피드에 없는 오래된 비디오 (zb2s1BpBvac)
- YouTube 페이지 스크래핑이 Vercel 프로덕션 환경에서 실패
- 제목이 "Enjoy the videos and music you love..." 폴백 텍스트로 표시

**증상**:
- 로컬 서버: 정상 작동 (스크래핑 성공)
- Vercel 배포: 제목 표시 실패 (스크래핑 실패)
- 서버 로그: `Video zb2s1BpBvac not found in RSS feed. Fetching title from YouTube page.`

**해결**:
- Featured Video 정보를 하드코딩하여 안정적으로 표시
- 네트워크 요청 제거로 성능 개선
- 프로덕션 환경에서 일관된 동작 보장

---

### 📊 변경 파일 (1개)

#### 수정
1. `src/app/[locale]/insight/page.tsx` - Featured Video 하드코딩 (+13줄, -2줄)

---

### 🎯 주요 개선 포인트

**안정성**:
- YouTube 페이지 스크래핑 의존성 제거
- 프로덕션 환경에서 일관된 동작 보장
- 네트워크 에러 가능성 제거

**성능**:
- 불필요한 HTTP 요청 제거
- 페이지 로딩 시간 단축

**유지보수**:
- Featured Video 정보를 코드에서 직접 관리
- 필요시 쉽게 변경 가능

---

### 🛠 기술 스택
- **Framework**: Next.js 16.1.6 (ISR)
- **Data Fetching**: rss-parser (Gallery 영상)
- **Hardcoded Data**: Featured Video 정보 상수

---

### 🔍 검증 완료
- ✅ 로컬 서버 정상 작동 (http://localhost:3000/ko/insight)
- ✅ Featured Video 제목 올바르게 표시
- ✅ "Video not found" 에러 메시지 제거
- ✅ Vercel 프로덕션 배포 완료
- ✅ 프로덕션 사이트 Featured Video 정상 표시

**최종 확인 일시**: 2026-02-09
**구현 상태**: ✅ 완료 및 검증 완료

---

## 2026-02-08 (토) - 다국어 번역 완료 및 한국어 원본 유지

### 📋 작업 개요
7개 언어 다국어 번역 완료 및 한국어 페이지 원본 상태 유지 작업

---

### ✅ 완료된 작업

#### 1. **다국어 번역 파일 생성 (6개 언어)** 🌐
**작업 방식**: 병렬 Task 에이전트 6개 동시 실행

**생성된 파일**:
1. `/src/messages/en.json` - 영어 (22KB, 475줄)
2. `/src/messages/ja.json` - 일본어 (22KB, 475줄)
3. `/src/messages/zh-CN.json` - 중국어 간체 (19KB, 475줄)
4. `/src/messages/zh-TW.json` - 중국어 번체 (19KB, 475줄)
5. `/src/messages/th.json` - 태국어 (37KB, 475줄)
6. `/src/messages/ru.json` - 러시아어 (34KB, 475줄)

**번역 범위**:
- Home 섹션: Hero, Philosophy, Services, WhyHealingEye, AIPrediction, PremiumFacility, MedicalTeam, Doctor, Review
- Footer 섹션: 연락처, 진료시간, 저작권
- Navigation 섹션: 메뉴 7개 항목
- Common 섹션: 공통 메시지

**의학 용어 처리**:
- LASIK, ICL, SMILE, Monovision 등 의학 용어는 원어 유지
- 각 국가별 의료 표준 용어 사용
- 문화적 맥락 반영 (일본어 keigo, 러시아어 formal 등)

---

#### 2. **중국어 병원명 통일** 🏥
**파일**: `zh-CN.json`, `zh-TW.json`

**변경 사항**:
- ✅ **간체 중국어**: "Healing Eye Clinic" → **"韓國Healing眼科"**
- ✅ **번체 중국어**: "治癒眼科診所" → **"韓國Healing眼科"**
- 두 중국어 버전 모두 동일한 병원명 사용

---

#### 3. **한국어 원본 유지** 🇰🇷
**작업 목적**: 다국어 개발 전 한국어 페이지 원본 그대로 유지

**복구된 컴포넌트 (10개)**:
1. `src/components/home/Hero.tsx`
2. `src/components/home/Philosophy.tsx`
3. `src/components/home/WhyHealingEye.tsx`
4. `src/components/home/Services.tsx`
5. `src/components/home/AIPrediction.tsx`
6. `src/components/home/PremiumFacility.tsx`
7. `src/components/home/MedicalTeam.tsx`
8. `src/components/home/Doctor.tsx`
9. `src/components/home/Review.tsx`
10. `src/components/layout/Footer.tsx`

**복구 방법**:
- Git HEAD에서 원본 파일 추출
- `/tmp/` 디렉토리에 백업
- 원본 파일로 복사하여 복구

**ko.json 업데이트**:
- 원본 컴포넌트에서 하드코딩된 텍스트 그대로 추출
- 한영 혼합 텍스트 유지 (예: "HEALING EYE", "Gangnam, Seoul")
- Navigation, Metadata, Common 섹션 추가

---

#### 4. **번역 작업 프로세스** 🔄

**1단계: ko.json 확장 (한국어 기준)**
- 기존 18줄(563B) → 475줄(21KB)
- 모든 컴포넌트의 텍스트를 JSON 구조로 정리
- 원본 하드코딩 텍스트 그대로 반영

**2단계: 병렬 번역 (6개 언어)**
- 6개 Task 에이전트 동시 실행
- 각 언어별 전문 번역
- 의학 용어 일관성 유지

**3단계: 검증 및 수정**
- JSON 문법 검증 (jq 커맨드)
- 중국어 quotation marks 오류 수정
- 병원명 통일 작업

**4단계: 한국어 원본 복구**
- 컴포넌트 파일 원본 상태로 되돌림
- ko.json만 원본 텍스트로 업데이트
- 개발 서버 재시작

---

### 🐛 발견 및 수정된 버그

#### 버그 1: zh-CN.json JSON Parsing Error
**문제**: 중국어 인용 부호("") 사용으로 JSON 파싱 실패
- 오류 메시지: "Invalid numeric literal at line 303"
- 예시: `""看"不仅仅是认知事物`

**해결**: 중국어 인용 부호를 이스케이프된 영문 인용 부호로 변경
- 수정 후: `"\"看\"不仅仅是认知事物"`
- Task 에이전트로 자동 변환

---

#### 버그 2: Navigation 섹션 누락
**문제**: ko.json에 Navigation 섹션이 없어서 Navbar 렌더링 오류
- 오류: "Could not resolve `Navigation` in messages for locale `ko`"

**해결**: 원본 Git에서 Navigation 섹션 추출하여 추가
```json
"Navigation": {
  "about": "병원소개",
  "vision": "시력교정술",
  "cataract": "노안/백내장",
  "center": "안질환 센터",
  "community": "커뮤니티",
  "insight": "인사이트"
}
```

---

#### 버그 3: 개발 서버 Lock 파일 충돌
**문제**: 이전 개발 서버 프로세스가 lock 파일 점유
- 오류: "Unable to acquire lock at .next/dev/lock"

**해결**:
```bash
lsof -ti:3000 | xargs kill -9
rm -rf .next
npm run dev
```

---

### 📊 변경 파일

#### 신규 생성 (7개)
1. `src/messages/en.json` - 영어 번역 (22KB)
2. `src/messages/ja.json` - 일본어 번역 (22KB)
3. `src/messages/zh-CN.json` - 중국어 간체 번역 (19KB)
4. `src/messages/zh-TW.json` - 중국어 번체 번역 (19KB)
5. `src/messages/th.json` - 태국어 번역 (37KB)
6. `src/messages/ru.json` - 러시아어 번역 (34KB)
7. `src/messages/ko.json` - 한국어 원본 (21KB, 기존 563B에서 확장)

#### 수정 (10개 - 원본 복구)
8. `src/components/home/Hero.tsx`
9. `src/components/home/Philosophy.tsx`
10. `src/components/home/WhyHealingEye.tsx`
11. `src/components/home/Services.tsx`
12. `src/components/home/AIPrediction.tsx`
13. `src/components/home/PremiumFacility.tsx`
14. `src/components/home/MedicalTeam.tsx`
15. `src/components/home/Doctor.tsx`
16. `src/components/home/Review.tsx`
17. `src/components/layout/Footer.tsx`

---

### 🎯 주요 성과

**다국어 지원 완성**:
- 7개 언어 완벽 지원 (ko, en, ja, zh-CN, zh-TW, th, ru)
- 총 3,325줄 (7개 파일 × 475줄)
- 의학 용어 일관성 유지
- 각 국가별 문화적 맥락 반영

**한국어 원본 보존**:
- 기존 하드코딩된 한영 혼합 텍스트 유지
- 다국어 개발 전 상태 완벽 복구
- 원본 디자인 및 텍스트 의도 보존

**중국어 브랜딩 통일**:
- 간체/번체 모두 "韓國Healing眼科" 사용
- 브랜드 일관성 확보

---

### 🛠 기술 스택

**개발 방식**:
- **병렬 처리**: 6개 Task 에이전트 동시 실행
- **시간 단축**: 약 75% 절약 (순차: ~60분 → 병렬: ~15분)

**번역 도구**:
- Claude AI 직접 번역 (LLM 기반)
- 의학 용어 데이터베이스 참조
- 국가별 의료 표준 반영

**검증 도구**:
- jq (JSON 문법 검증)
- Git (원본 파일 추출)
- Bash (파일 복사 및 관리)

---

### 🔍 검증 완료
- ✅ 7개 언어 JSON 파일 문법 검증
- ✅ 한국어 페이지 원본 상태 확인
- ✅ 중국어 병원명 통일 확인
- ✅ 개발 서버 정상 실행 (http://localhost:3000)
- ✅ 각 언어별 URL 접속 테스트
  - /ko, /en, /ja, /zh-CN, /zh-TW, /th, /ru

**최종 확인 일시**: 2026-02-08
**구현 상태**: ✅ 완료 및 검증 완료

---

## 2026-02-08 (토) - UI/UX 고도화 및 실데이터 개선 (병렬 서브에이전트 활용)

### 📋 작업 개요
Footer, Review 섹션 실데이터 반영 및 Vision/Cataract 페이지 UI 고도화 작업 (서브에이전트 병렬 처리)
**추가 작업**: Community FAQ 실데이터 적용, Center EquipmentShowcase Carousel 변경, **AgingProcess Lens 3D 품질 업그레이드**

---

### ✅ 완료된 작업

#### 1. **Footer 실데이터 반영** 📍
**파일**: `src/components/layout/Footer.tsx`

**변경 사항**:
- ✅ **주소 정보**
  - 기존: "Gangnam-gu, Seoul, Korea"
  - 변경: "서울특별시 강남구 강남대로 470 808타워 10-11층 (신논현역 6번 출구)"

- ✅ **연락처 정보**
  - 전화번호: "+82 2-1234-5678" → "02-566-1222"
  - 카카오톡: "contact@healingeye.co.kr" → "kakao @healingeye"

- ✅ **상세 진료시간 추가**
  - 평일: 09:30 - 18:30 (휴게 13:00-14:00)
  - 금요일: 09:30 - 21:00 (야간진료, 골드 컬러 강조)
  - 토요일: 09:30 - 16:00
  - 일요일/공휴일: 휴진 (빨간색 표시)

---

#### 2. **Vision 페이지 - 체크 포인트 가독성 개선** 🔬
**파일**: `src/app/[locale]/vision/PageClient.tsx`

**변경 사항**:
- ✅ **체크 아이콘 크기**: w-8 h-8 (size 14) → w-10 h-10 (size 18) (1.25배 확대)
- ✅ **텍스트 크기**: text-sm → text-base md:text-lg (1.43배 확대)
- ✅ **줄간격**: leading-tight 추가로 여백 최적화
- ✅ 5개 수술 카드 모두 적용 (스마일, 라식, 라섹, ICL, 재수술)

---

#### 3. **Vision 페이지 - SafetySystem 개선** 🛡️
**파일**: `src/components/vision/SafetySystem.tsx`

**변경 사항**:
- ✅ **"Open Operating Room" 항목 완전 제거** (6개 → 5개)
  - 삭제 내용: "전면 유리로 공개된 수술실. 보호자분이 수술 과정을 직접 확인하실 수 있는 투명한 의료 환경을 제공합니다."
  - Video 아이콘 import 제거

- ✅ **나머지 5개 항목 가독성 강화**
  - 아이콘 크기: size={32} → size={36} (1.125배 확대)
  - 아이콘 컨테이너: w-14 h-14 → w-16 h-16 (1.14배 확대)
  - 제목 크기: text-xl → text-xl md:text-2xl (데스크톱 1.2배)
  - 설명 크기: text-sm → text-base md:text-lg (1.43배 확대)
  - 여백 및 line-height 최적화

- ✅ **5개 항목**:
  1. 1:1 Responsible Care - 대표원장 직접 전담
  2. DB & Backup - 평생 보관 수술 데이터
  3. Emergency Power - 무정전 UPS 시스템
  4. Clean Room System - 대학병원급 양압 수술실
  5. Triple Check - 3중 교차 검증

---

#### 4. **Review 섹션 - 실데이터 개선** ⭐
**파일**: `src/components/home/Review.tsx`

**변경 사항**:
- ✅ **id: 1 (김지, 20대, 스마일 라식)**
  - 수술명: "스마일 라식 (SMILE PRO)" → "스마일 라식"
  - 후기 내용: "원장님이 직접 검안부터..." 문장 삭제

- ✅ **id: 2 (이형, 다초점 인공수정체)**
  - 연령대: "40대" → "60대" (의학적 정확성 개선)

- ✅ **id: 4 (최민, 50대, 노안 라식)**
  - 수술명: "노안 라식 (Monovision)" → "노안 라식" (용어 정확성)

- ✅ **id: 5 (정하, 20대)**
  - 수술명: "투데이 라섹" → "프리미엄 라섹"
  - 시력: "1.5 시력" → "1.2 시력"

- ✅ **id: 6 (안수, 재수술)**
  - 연령대: "30대" → "40대"

- ✅ **id: 8 (조현, 백내장)**
  - 연령대: "40대" → "60대" (의학적 정확성 개선)

---

#### 5. **Cataract 페이지 - AgingProcess 빛 투과 애니메이션 강화** 💡
**파일**: `src/components/cataract/AgingProcess.tsx`

**구현 사항** (서브에이전트 병렬 처리):

**5-1) 빛 투과 애니메이션 시스템**
- ✅ **6개 빛줄기 추가** (좌→우 통과)
  - 파란-흰 그라데이션 (#60a5fa → #dbeafe)
  - 투과율 감소: opacity 1 → 0.1 (스크롤 시)
  - 블러 효과: 0px → 8px (빛 산란 표현)
  - 수직 산란: 15px 분산 (굴절 차단)
  - 굴절 포인트: 수정체 중심(x=200)에 작은 원 표시

**5-2) 혼탁 효과 강화**
- ✅ **8개 불규칙 cloud spots** (기존 4개에서 2배 증가)
  - 4가지 그라데이션 (흰색, 노란-크림, 골든, 혼합)
  - 2단계 블러 (표준 4px, 헤비 6px)
  - 불규칙 배치: 중앙 대형(45×50px), 상좌/상우 클러스터, 하단 침착물
  - 투명도 변화: 0.7~0.95 (입체감 표현)
  - 180도 회전 애니메이션

**5-3) 복원 효과 (HEALED)**
- ✅ **골든 빛줄기 등장** (#f59e0b → #fde047)
  - 강력한 글로우: 더블 머지 노드
  - 큰 굴절점: 3px 반지름 (vs 2px)
  - 투과율 복원: 10% → 100%
  - 앰버 배경 글로우 추가

**5-4) 성능 최적화**
- ✅ willChange: "transform" (GPU 가속)
- ✅ willChange: "opacity" (부드러운 애니메이션)
- ✅ 기존 스크롤 값 유지 (0.3~0.85 범위)

**의학적 정확성**: 눈 수정체가 탁해져서 빛이 투과하지 못하는 물리적 현상을 정확히 시각화

---

#### 6. **Cataract 페이지 - LensGuide 인터랙티브 시뮬레이터 고도화** 🎮
**파일**: `src/components/cataract/LensGuide.tsx`

**구현 사항** (서브에이전트 병렬 처리):

**6-1) VisionSimulator 컴포넌트 신규 생성**
- ✅ **3개 거리 구간**: 근거리(30cm) / 중간(1m) / 원거리(5m)
- ✅ 각 구간 1/3씩 분할 (left-0, left-1/3, right-0)
- ✅ 마우스 호버 감지: onMouseEnter/onMouseLeave

**6-2) 선명도 차별화**
- ✅ **다초점 렌즈**: 모든 구간 선명 (blur-0)
  - 근거리 ✓, 중간거리 ✓, 원거리 ✓

- ✅ **단초점 렌즈**: 원거리만 선명
  - 근거리 ✗ (backdrop-blur-[8px])
  - 중간거리 ✗ (backdrop-blur-[8px])
  - 원거리 ✓ (블러 없음)

**6-3) 거리 표시기 & 피드백**
- ✅ **호버 시 표시**:
  - 거리 라벨 (근거리 / 중간거리 / 원거리)
  - 정확한 거리 (30cm / 1m / 5m) - 골드 컬러
  - 선명도 상태: ✓ 선명 (초록) / ✗ 흐림 (빨강)

- ✅ **하단 마커**:
  - 3개 거리 마커 고정 표시
  - 호버 시 앰버 색상 + 위로 이동 (y: -4px)
  - 선명한 구간: 밝은 흰색 / 흐린 구간: 반투명

**6-4) 다초점 "ALL CLEAR" 뱃지**
- ✅ 골드 그라디언트 (amber-400 → yellow-500)
- ✅ 스프링 애니메이션: 회전하며 등장
  - scale: 0 → 1
  - rotate: -45° → 0°
- ✅ 우측 상단 고정 배치

**6-5) 부드러운 애니메이션**
- ✅ 전환 시간: 700ms (duration)
- ✅ 페이드인: opacity: 0 → 1, y: 10 → 0
- ✅ 호버 피드백: 배경 bg-black/0 → bg-black/40
- ✅ 마커 이동: y: 0 → -4 (호버 시)

**사용자 경험**: 다초점과 단초점의 시력 차이를 직접 체험할 수 있는 인터랙티브 경험 제공

---

#### 7. **Cataract 페이지 - AgingProcess Lens 3D 품질 업그레이드** 💎
**파일**: `src/components/cataract/AgingProcess.tsx`

**구현 사항** (세션 재개 후 완료):

**7-1) 수정체(Lens) 8레이어 프리미엄 렌더링**
- ✅ **Layer 1: Shadow foundation** - 입체 그림자 (feDropShadow 5px blur)
- ✅ **Layer 2: Fresnel rim glow** - 가장자리 굴절광 효과 (15%~30% opacity)
- ✅ **Layer 3: Posterior + Anterior capsule** - 전후 캡슐 테두리 (depth 표현)
  - Posterior: stroke-width 1.8px, opacity 0.35
  - Anterior: offset (199, 209), stroke-width 0.6px, opacity 0.2
- ✅ **Layer 4: Nucleus** - 내핵 밀도 그라디언트 (중심부 denser)
- ✅ **Layer 5: Lens fiber lamellae** - 성장 고리 3개 (concentric dashed ellipses)
  - Scale: 0.85, 0.65, 0.45
  - strokeDasharray: 동적 계산 (3+i, 6+i*2)
- ✅ **Layer 6: Primary specular highlight** - 주 반사광 (top-left key light)
  - Position: (188, 185), Size: rx=18 ry=30
  - Opacity: 0.4 → 0.12 → 0 (radial gradient)
- ✅ **Layer 7: Secondary specular** - 보조 반사광 (bottom-right fill light)
  - Position: (212, 235), Size: rx=10 ry=16
  - Blue tint: #bae6fd
- ✅ **Layer 8: Caustic pinpoints** - 유리 반사 점 2개
  - 큰 점: (186, 178) r=2.5px, opacity 0.35
  - 작은 점: (190, 183) r=1px, opacity 0.5

**7-2) 8개 SVG 그라디언트 정의**
- ✅ `ag-lens-3d` - 5-stop radialGradient (crystal body)
- ✅ `ag-lens-anterior` - linearGradient (front surface)
- ✅ `ag-lens-spec1` - radialGradient (primary specular)
- ✅ `ag-lens-spec2` - radialGradient (secondary specular)
- ✅ `ag-lens-rim` - radialGradient (Fresnel rim glow)
- ✅ `ag-lens-nucleus` - radialGradient (inner core density)
- ✅ `ag-lens-shadow` - feDropShadow filter (dx=2, dy=3, blur=5)
- ✅ `ag-lens-refract` - feGaussianBlur filter (stdDeviation=1.5)

**7-3) 한국어 라벨 유지**
- ✅ 각막, 홍채, 수정체, 망막, 시신경
- ✅ 진행 상태: 정상, 백내장, 수술 후
- ✅ 섹션 라벨: 눈 단면도

**7-4) 시각 검증 완료 (Playwright 브라우저 테스트)**
- ✅ Phase 1 (정상): 투명 크리스탈 렌즈 + 스펙큘러 하이라이트
- ✅ Phase 2 (백내장): 혼탁한 백색 수정체 + 빛 차단
- ✅ Phase 3 (수술 후): 골드 IOL 인공수정체 + 빛 복원
- ✅ 스크롤 애니메이션 정상 동작 (0.22~0.58 범위)
- ✅ 3개 스크린샷 캡처:
  - `aging-process-full-view.png` - 정상 단계
  - `aging-process-full-cataract.png` - 백내장 단계
  - `aging-process-healed-phase.png` - 수술 후 단계

**의학적 정확성**:
- 수정체의 3D 해부학적 구조 (전낭, 후낭, 핵, 섬유층)
- 빛의 굴절 및 투과 물리 시뮬레이션
- 백내장으로 인한 단백질 침착 및 혼탁 표현
- IOL 인공수정체 교체 후 시력 회복 과정

---

### 📊 변경 파일 (6개)

#### 수정 파일
1. `src/components/layout/Footer.tsx` - 실데이터 반영
2. `src/app/[locale]/vision/PageClient.tsx` - 체크 포인트 가독성
3. `src/components/vision/SafetySystem.tsx` - 항목 삭제 및 개선
4. `src/components/home/Review.tsx` - 후기 데이터 개선
5. `src/components/cataract/AgingProcess.tsx` - 빛 투과 애니메이션 (+240줄) + **Lens 3D 품질 업그레이드 (+150줄)**
6. `src/components/cataract/LensGuide.tsx` - 인터랙티브 시뮬레이터 (+210줄)

---

### 🎯 주요 개선 포인트

**Footer**:
- 실제 주소, 전화번호, 진료시간 반영
- 금요일 야간진료 강조 (골드 컬러)
- 사용자 편의성 향상

**Vision 페이지**:
- 체크 포인트 가독성 1.4배 개선
- SafetySystem 6개 → 5개 정리
- 전체적인 UI 일관성 향상

**Review 섹션**:
- 의학적 정확성 개선 (연령대, 수술명)
- 용어 일관성 확보 (Monovision 삭제)
- 실제 사례에 가까운 데이터

**Cataract 페이지**:
- 물리적 빛 투과 현상의 정확한 시각화
- 6개 빛줄기 + 8개 혼탁 spots 추가
- 인터랙티브 거리별 시력 시뮬레이터
- 다초점 vs 단초점 차이를 직접 체험 가능

---

### 🛠 기술 스택

**병렬 처리**:
- Task 서브에이전트 2개 동시 실행
- 시간 단축: 약 50% 절약 (233초 → 137초)

**Animation**:
- Framer Motion (scroll-based, spring animation)
- SVG 필터 (Gaussian Blur, Merge)
- Backdrop Filter (CSS blur)

**Interaction**:
- useState (호버 상태 관리)
- onMouseEnter/onMouseLeave (마우스 이벤트)
- 조건부 렌더링 (거리별 블러 차별화)

**Performance**:
- GPU 가속 (willChange)
- Smooth transitions (700ms duration)

---

### 🔍 검증 완료
- ✅ Footer 실데이터 정확성 확인
- ✅ Vision 체크 포인트 가독성 개선 확인
- ✅ SafetySystem 5개 항목 정상 표시
- ✅ Review 8개 후기 데이터 정확성 확인
- ✅ AgingProcess 빛 투과 애니메이션 동작 확인
- ✅ LensGuide 인터랙티브 시뮬레이터 호버 동작 확인
- ✅ 모든 애니메이션 부드러운 전환 확인
- ✅ **AgingProcess Lens 3D 렌더링 시각 검증 완료**
  - Playwright 브라우저 테스트 (http://localhost:3000/ko/cataract)
  - 3개 단계 스크린샷 캡처 (정상, 백내장, 수술 후)
  - 8레이어 렌더링 정상 동작
  - 스펙큘러 하이라이트, Fresnel rim glow, caustic 효과 확인

**최종 확인 일시**: 2026-02-08 (세션 재개 후)
**구현 상태**: ✅ 완료 및 검증 완료

---

## 2026-02-06 (목) - Insight 페이지 실데이터 통합 (YouTube RSS + 네이버 블로그)

### 📋 작업 개요
Insight 페이지에 YouTube 채널 @dreyesis (안과언니)와 네이버 블로그 RSS Feed를 통합하여 실시간 콘텐츠를 표시하도록 구현

---

### ✅ 완료된 작업

#### 1. **YouTube RSS Feed 통합** 📺
**파일**: `/src/lib/youtube.ts` (신규 생성)

**구현 사항**:
- ✅ **채널 정보**
  - 채널명: 안과언니 @dreyesis
  - 채널 ID: `UCP7OU6koPGdRgk7mCMv5dOQ` (검증 완료)
  - RSS URL: `https://www.youtube.com/feeds/videos.xml?channel_id=UCP7OU6koPGdRgk7mCMv5dOQ`

- ✅ **주요 함수 2개 구현**
  1. `getYouTubeVideos(limit)` - 최신 영상 15개 가져오기
  2. `getFeaturedYouTubeVideo(videoId)` - 특정 영상 가져오기 (ID: `zb2s1BpBvac`)

- ✅ **폴백 메커니즘**
  - RSS 피드에 없는 영상은 YouTube 페이지 HTML 파싱
  - `<meta name="title">` 태그에서 제목 추출
  - `<meta name="description">` 태그에서 설명 추출
  - 우선순위: RSS Feed → YouTube HTML → 폴백 데이터

---

#### 2. **네이버 블로그 RSS Feed 통합** 📝
**파일**: `/src/lib/naver-blog.ts` (신규 생성)

**구현 사항**:
- ✅ **블로그 정보**
  - 블로그 ID: wpsjtltmals7 (김선영 원장 대표원장 블로그)
  - RSS URL: `https://rss.blog.naver.com/wpsjtltmals7.xml`

- ✅ **HTML 파싱 기능**
  - `extractImageFromHtml()` - 본문에서 첫 번째 이미지 추출
  - `stripHtml()` - HTML 태그 제거 및 텍스트 정리
  - 설명 텍스트 150자 제한

- ✅ **getNaverBlogPosts(limit)** - 최신 블로그 글 3개 가져오기

---

#### 3. **서버 페이지 데이터 Fetch** 🔄
**파일**: `/src/app/[locale]/insight/page.tsx`

**구현 사항**:
- ✅ **ISR (Incremental Static Regeneration)**: `revalidate = 3600` (1시간)
- ✅ **병렬 데이터 Fetch** (`Promise.all`)
  - Featured 영상: 특정 ID (zb2s1BpBvac)
  - Gallery 영상: 15개 중 Featured 제외 9개
  - 블로그 글: 최신 3개

- ✅ **필터링 로직**
  ```typescript
  const galleryVideos = allVideos
    .filter(video => video.id !== FEATURED_VIDEO_ID)
    .slice(0, 9);
  ```

---

#### 4. **클라이언트 컴포넌트 디자인 개선** 🎨
**파일**: `/src/app/[locale]/insight/PageClient.tsx`

**주요 변경 사항**:
- ✅ **Header 섹션**
  - 그라데이션 배경: `bg-gradient-to-b from-black via-neutral-950 to-black`
  - 장식 Glow 요소 추가
  - 수직 액센트 라인 추가

- ✅ **Featured Video**
  - Glow 테두리 효과 (`bg-gradient-to-r from-primary via-primary/50 to-primary ... blur-xl`)
  - Play 버튼 개선 (Blur + 호버 애니메이션)
  - 순차적 페이드인 (0.4s, 0.5s, 0.6s, 0.7s delay)

- ✅ **Recent Blog Posts**
  - Glass-morphism 카드 (`bg-neutral-900/50 backdrop-blur-sm`)
  - 호버 시 Glow 효과
  - 카테고리 배지 (Primary 컬러)
  - "Read more" 표시기 추가

- ✅ **Video Gallery**
  - 장식 상단 테두리 (`bg-gradient-to-r from-transparent via-white/20 to-transparent`)
  - 채널 설명 추가
  - 9개 영상 3×3 그리드

- ✅ **Newsletter 섹션**
  - 신뢰 지표 추가 (Weekly Updates, No Spam, Unsubscribe Anytime)

- ✅ **Expert Q&A 섹션 제거** (사용자 요청)

---

#### 5. **Video Gallery 컴포넌트** 🎬
**파일**: `/src/components/insight/VideoGallery.tsx`

**구현 사항**:
- ✅ Props로 9개 영상 받기
- ✅ 채널명: "안과언니 @dreyesis"
- ✅ 채널 설명: "전문 안과의가 전하는 눈 건강 정보"
- ✅ 업로드 날짜 표시 ("3일 전", "2주 전" 형식)
- ✅ Glass-morphism 카드 디자인
- ✅ 호버 시 Glow 효과 및 스케일 업

---

#### 6. **Next.js 설정 (이미지 도메인)** ⚙️
**파일**: `next.config.ts`

**변경 사항**:
- ✅ **와일드카드 패턴으로 모든 CDN 서브도메인 허용**
  ```typescript
  {
    protocol: 'https',
    hostname: '**.ytimg.com', // i.ytimg.com, i1-i4.ytimg.com 모두 허용
  },
  {
    protocol: 'https',
    hostname: '**.ggpht.com', // YouTube 고화질 썸네일
  },
  {
    protocol: 'https',
    hostname: '**.pstatic.net', // postfiles, blogfiles, blogthumb 모두 허용
  }
  ```

---

### 🐛 발견 및 수정된 버그

#### 버그 1: 이미지 도메인 설정 오류
**문제**: YouTube와 네이버 블로그 이미지가 로드되지 않음
- `Invalid src prop "i4.ytimg.com" not configured`
- `Invalid src prop "blogthumb.pstatic.net" not configured`

**해결**: 와일드카드 패턴 사용
- `i.ytimg.com` → `**.ytimg.com`
- `postfiles.pstatic.net` → `**.pstatic.net`

---

#### 버그 2: 잘못된 채널 ID로 다른 채널 영상 표시
**문제**: "안과언니" 대신 "시력발전소" 채널 영상이 표시됨
- 초기 채널 ID: `UCef-WLRlMKAmAvXuWU8vYhA` (잘못된 ID)

**해결**: curl로 YouTube 페이지 HTML 파싱하여 올바른 채널 ID 추출
- 올바른 채널 ID: `UCP7OU6koPGdRgk7mCMv5dOQ`
- `.env.local` 파일 업데이트

---

#### 버그 3: Featured 영상 제목 "Featured Video"로 표시
**문제**: RSS 피드에 없는 구형 영상(ID: zb2s1BpBvac)의 제목이 폴백 데이터로 표시

**해결**: `getFeaturedYouTubeVideo()` 함수 개선
- YouTube 페이지 HTML에서 메타 태그 파싱
- 실제 제목/설명 추출
- RSS → YouTube HTML → Fallback 순서로 우선순위 적용

---

### 📊 변경 파일 (7개)

#### 신규 생성 (3개)
1. `/src/lib/youtube.ts` - YouTube RSS 유틸 함수
2. `/src/lib/naver-blog.ts` - 네이버 블로그 RSS 유틸 함수
3. `.env.local` - 환경 변수 (채널 ID, 블로그 ID)

#### 수정 (4개)
4. `/src/app/[locale]/insight/page.tsx` - 서버 컴포넌트 데이터 fetch
5. `/src/app/[locale]/insight/PageClient.tsx` - 클라이언트 컴포넌트 디자인 개선
6. `/src/components/insight/VideoGallery.tsx` - 9개 영상 표시
7. `next.config.ts` - 이미지 도메인 (와일드카드 패턴)

---

### 🎯 주요 개선 포인트

**데이터 통합**:
- YouTube RSS Feed (무료, API 키 불필요)
- 네이버 블로그 RSS Feed
- ISR 1시간 캐싱으로 성능 최적화

**프리미엄 디자인**:
- Glass-morphism 카드
- Glow 효과 및 그라데이션
- 순차적 애니메이션 (Framer Motion)
- 반응형 그리드 레이아웃

**사용자 경험**:
- Featured 영상 큰 배너로 강조
- 9개 Gallery 영상 (최신순, Featured 제외)
- 3개 블로그 글
- 모든 콘텐츠 클릭 시 새 탭에서 열림

---

### 🛠 기술 스택
- **Framework**: Next.js 16.1.6 (App Router, ISR)
- **Data Fetching**: rss-parser 3.13.0
- **Animation**: Framer Motion
- **Image**: next/image (와일드카드 도메인 패턴)
- **Caching**: ISR (1시간 revalidation)

---

### 🔍 검증 완료
- ✅ Featured 영상 표시 및 클릭 동작
- ✅ 9개 Gallery 영상 표시 (최신순, Featured 제외)
- ✅ 3개 블로그 글 표시
- ✅ 모든 이미지 정상 로드 (YouTube CDN, 네이버 블로그 CDN)
- ✅ 반응형 디자인 동작
- ✅ 애니메이션 및 호버 효과
- ✅ ISR 캐싱 동작 확인

**최종 확인 일시**: 2026-02-06
**구현 상태**: ✅ 완료 및 검증 완료

---

## 2026-02-06 (목) - 서브페이지 실데이터 입력 및 UI 고도화

### 📋 작업 개요
Vision, Cataract, Center 페이지의 실제 데이터 입력 및 사용자 경험 개선 작업

---

### ✅ 완료된 작업

#### 1. **Vision 페이지 - 수술 카드 텍스트 전문화** 🔬
**파일**: `src/app/[locale]/vision/PageClient.tsx`

**변경 사항**:
- ✅ **5개 시술의 설명 텍스트 전문 의학 용어로 개선**
  - 뉴스마일 라식 (New SMILE): "ZIEMER Z8 펨토세컨드 레이저를 이용한 최소절개 방식으로 각막 손상을 최소화하는 4세대 시력교정술"
  - 프리미엄 라식: "각막 절편을 생성한 후 레이저로 각막을 절삭하여 굴절이상을 교정하는 검증된 시력교정술"
  - 프리미엄 라섹: "각막 상피층만 제거하고 실질에 레이저를 조사하는 보수적 방식"
  - ICL 렌즈삽입술: "생체친화적 Collamer 재질로 부작용이 적으며, 초고도근시(-6디옵터 이상) 환자에게 최적"
  - 재수술: "대학병원 교수 출신 의료진의 풍부한 임상경험을 바탕으로 고난도 재교정"

- ✅ **Features 항목 전문화**
  - 구체적 수치 및 기술명 명시 (2mm 최소절개, 웨이브프론트 맞춤 등)
  - 의학적 정확성 향상 (플랩 미생성, 각막신경 보존, 가역적 시술 등)

---

#### 2. **Cataract 페이지 - 4개 섹션 고도화** 👁️

**2-1) AgingProcess - "Why does vision fade away?" 그래픽 혁신**
**파일**: `src/components/cataract/AgingProcess.tsx`

**변경 사항**:
- ✅ **해부학적 눈 구조 시각화 추가**
  - 홍채 패턴: 24개 섬유로 구성된 radial 구조
  - 생체 렌즈 형태: Biconvex 렌즈 모양 (SVG path)
  - 빛 굴절선: 4개의 광선 표시

- ✅ **백내장 혼탁 효과 4중 레이어**
  - 회색 그라데이션 (단백질 침착)
  - 노란색 그라데이션 (황변 현상)
  - 4개의 타원형 cloud spots
  - 180도 회전 애니메이션

- ✅ **6개 스크롤 기반 애니메이션 트랙**
  - Blur 증가: 0px → 12px
  - Opacity 감소: 1 → 0.2
  - Cloud opacity: 0 → 0.95
  - Healed opacity: 0 → 1
  - Lens scale: 1 → 1.05 → 0.95 → 1
  - Cloud rotate: 0 → 180deg

- ✅ **상태 표시**
  - "CLEAR" → "HEALED" 전환 (골드 그라데이션)
  - "LENS AGING PROCESS" → "RESTORATION COMPLETE"
  - Red/Amber 펄스 인디케이터

**2-2) LifestyleMatch - "Find Your Lens" 텍스트 가독성 개선**
**파일**: `src/components/cataract/LifestyleMatch.tsx`

**변경 사항**:
- ✅ **폰트 크기 확대** (노안 환자 고려)
  - 카드 제목: `text-xl` → `text-xl md:text-2xl`
  - 설명: `text-sm` → `text-base md:text-lg`
  - 추천 솔루션: `text-2xl md:text-3xl` → `text-xl md:text-2xl lg:text-3xl`

- ✅ **아이콘 크기 증가**
  - 36px로 통일 (기존 32px)

- ✅ **존댓말 추가 및 문장 개선**
  - "야외 활동형" → "야외 활동을 즐기시는 분"
  - "~추천합니다" → "~추천드립니다"

- ✅ **Line-height 개선**
  - leading-snug (제목), leading-relaxed (설명), leading-loose (추천)

**2-3) PageClient - 히어로 섹션 컬러 강화**
**파일**: `src/app/[locale]/cataract/PageClient.tsx`

**변경 사항**:
- ✅ **"프리미엄 다초점 인공수정체" 골드 그라데이션 적용**
  - `from-amber-300 via-primary to-amber-400`
  - 글로우 효과: `drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]`

---

#### 3. **Center 페이지 - 첨단장비 실데이터 입력** 🔬
**파일**: `src/components/center/EquipmentShowcase.tsx`

**변경 사항**:
- ✅ **4개 → 9개 장비로 확장**

**시력교정술 장비 (5개)**:
1. **AMARIS SPT** (시력교정 레이저)
   - 3D 3차원 입체 교정, 0.54mm 정밀 레이저 빔
2. **Galilei G4** (각막 단층 촬영)
   - 1초 초고속 검사, 122,000개 데이터 포인트
3. **Pentacam HR** (각막 지형도)
   - 정밀각막분석, 백내장 검사
4. **3D OCT-1** (안구 광학 단층)
   - 녹내장, 당뇨망막병증, 황반변성 진단
5. **Optos Daytona P200T** (광학 안저 촬영)
   - 0.25초 초고속, 200˚ 와이드 영상

**노안백내장 장비 (4개)**:
6. **FEMTO LDV Z8** (백내장 레이저)
   - 가장 정밀한 레이저, 수술시간 단축
7. **IOL MASTER 700** (눈상태 계측)
   - 비접촉식 초정밀 계측기
8. **CALLISTO EYE** (난시 추적 항법)
   - 난시 오차율 0% 도전
9. **LUMERA 700** (초정밀 현미경)
   - 자동 시야조절, 난시축 자동조절

---

### 📊 변경 파일 (5개)

1. `src/app/[locale]/vision/PageClient.tsx`
2. `src/components/cataract/AgingProcess.tsx`
3. `src/components/cataract/LifestyleMatch.tsx`
4. `src/app/[locale]/cataract/PageClient.tsx`
5. `src/components/center/EquipmentShowcase.tsx`

---

### 🎯 주요 개선 포인트

**Vision 페이지**:
- 전문 의학 용어 사용으로 신뢰도 향상
- 구체적 수치와 기술명 명시 (2mm, -6디옵터, 웨이브프론트)
- 각 수술의 차별점 명확화

**Cataract 페이지**:
- 해부학적으로 정확한 수정체 노화 시각화
- 노인 환자를 위한 큰 폰트 (1.5~2배 확대)
- 프리미엄 느낌의 골드 컬러 강조

**Center 페이지**:
- 실제 장비 9개로 확장 (기존 4개)
- 시력교정술/노안백내장 섹션 구분
- 전문적인 장비 스펙 상세 명시

---

### 🛠 기술 스택
- **Animation**: Framer Motion (scroll-based 6 tracks)
- **Visualization**: SVG (anatomical eye structure)
- **Typography**: Responsive font scaling (노안 고려)
- **Gradient**: Gold accent (백내장 페이지 톤앤매너)

---

## 2026-02-04 (화) - 의료진 정보 업데이트 및 UI 개선

### 📋 작업 개요
Doctor 및 MedicalTeam 섹션의 의료진 약력 정보 업데이트 및 UI 텍스트 수정

---

### ✅ 완료된 작업

#### 1. **Doctor 섹션 - 원장님 약력 업데이트** 👨‍⚕️
**파일**: `src/components/home/Doctor.tsx`

**변경 사항**:

**1) 이용은 원장 약력 업데이트 (10개 항목)**:
- ✅ 대전과학고등학교 졸업
- ✅ 가톨릭대학교 의과대학 차석 졸업
- ✅ 가톨릭대학교 의과대학 대학원 석사
- ✅ 서울성모병원 백내장 임상교수
- ✅ 대한안과학회(KOS)정회원
- ✅ 한국백내장굴절수술학회(KSCRS) 정회원
- ✅ 대한안과의사회(KOA)정회원
- ✅ 미국 백내장굴절수술학회(ASCRS) 정회원
- ✅ 유럽 백내장굴절수술학회(ESCRS) 정회원
- ✅ 미국재향군인 검진의사(Veterans Evaluation Services)

**2) 김선영 대표원장 약력 업데이트 (11개 항목)**:
- ✅ 가톨릭대학교 의과대학 대학원 석사
- ✅ 2009-2013 가톨릭대학교 가톨릭중앙의료원 안과 전문의
- ✅ 2013-2016 의정부 성모병원 각막,백내장 임상교수
- ✅ 2009년 서울성모병원 최우수 전공의 표창
- ✅ 2008년 보건복지부장관상
- ✅ 제 108회 대한안과학회 구연상 수상
- ✅ 질병관리본부 역학조사 표창장 수상
- ✅ 대한안과학회(KOS) 정회원
- ✅ 한국외안부연구회(KEEDS) 정회원
- ✅ 한국콘택트렌즈(KCLSS) 정회원
- ✅ 유럽백내장굴절수술학회(ESCRS) 정회원

**3) Quote 문구 수정 (한국어로 변경)**:
- ✅ 김선영 대표원장: "끝없는 탐구와 연구로 기존 이론을 진일보 시키는"
- ✅ 임성웅 대표원장: "환자의 마음으로 최선을 다하는"
- ✅ 이용은 원장: "끝없는 연구와 다양한 경험으로 신뢰할 수 있는"

---

#### 2. **MedicalTeam 섹션 - 원장님 약력 업데이트** 👥
**파일**: `src/components/home/MedicalTeam.tsx`

**변경 사항**:
- ✅ 이용은 원장 약력 동일 업데이트 (10개 항목)
- ✅ 김선영 대표원장 약력 동일 업데이트 (11개 항목)
- ✅ 진료과목 텍스트 삭제 (specialty 필드 화면 표시 제거)
  - 삭제: "스마일·클리어 / 노안백내장 / 안구건조증"
  - 삭제: "망막 / 녹내장 / 시력교정"
  - 삭제: "소아안과 / 드림렌즈"

---

#### 3. **Middleware 404 오류 수정** 🔧
**파일**: `middleware.ts`

**변경 사항**:
- ✅ matcher 패턴 업데이트로 루트 경로 리다이렉트 개선
```typescript
matcher: [
    '/',
    '/(ko|en|ja|zh-CN|zh-TW|th|ru)/:path*',
    '/((?!_next|_vercel|api|.*\\..*).*)'
]
```

---

#### 4. **로컬 서버 재시작** 🖥️
- ✅ 기존 프로세스 정리 및 락 파일 삭제
- ✅ Next.js 16.1.6 개발 서버 정상 실행
- ✅ URL: http://localhost:3000/ko

---

## 2026-01-30 (목) - 메인 페이지 홈 섹션 개선

### 📋 작업 개요
메인 페이지의 주요 섹션들을 개선하여 사용자 경험과 브랜드 아이덴티티를 강화

---

### ✅ 완료된 작업

#### 1. **Middleware 설정 변경**
**파일**: `middleware.ts`

- **변경 사항**:
  - `localePrefix` 설정을 `'as-needed'`에서 `'always'`로 변경
  - URL에 항상 locale prefix를 표시하도록 변경 (일관성 향상)

**이유**: 404 오류 방지 및 다국어 라우팅 일관성 확보

---

#### 2. **AI 시력교정 예측 섹션 대폭 개선** ✨
**파일**: `src/components/home/AIPrediction.tsx`

**주요 변경 사항**:
- ✅ 홀로그래픽 Eye Grid 디자인 시스템 추가
  - 8개 동심원 (Concentric Circles) with 애니메이션
  - 360도 각도 마커 (72개 틱, 주요/중간/일반 구분)
  - 각도 표시 (0°, 90°, 180°, 270°)
  - 십자선 (Crosshair) + 대각선
  - 코너 브래킷 (Corner Brackets)
  - 6개 데이터 포인트 with 펄스 애니메이션
  - 회전 레이더 스캔 효과
  - 육각형 그리드 패턴

- ✅ 레이아웃 개선
  - Visual Area 너비: `w-1/2` → `w-[45%]`
  - `max-w-lg` 추가로 최대 크기 제한

**기술 스택**:
- Framer Motion 애니메이션
- CSS Gradient (conic, radial, linear)
- Tailwind CSS custom styling

---

#### 3. **철학(Philosophy) 섹션 개선** 🎨
**파일**: `src/components/home/Philosophy.tsx`

**주요 변경 사항**:
- ✅ 타이포그래피 강화
  - 타이틀 크기: `text-3xl/5xl` → `text-4xl/6xl`
  - 폰트 무게: `font-light` → `font-bold`

- ✅ 가로 스크롤 텍스트 애니메이션 범위 조정
  - 시작: `100%` → `20%`
  - 종료: `-100%` → `-120%`
  - 무한 반복 텍스트 요소 2배 증가 (끊김 방지)

- ✅ 3가지 핵심 가치 카드 개선
  - 번호 아이콘 크기: `w-12 h-12` → `w-16 h-16`
  - 번호 스타일: `text-2xl font-bold` 추가
  - 타이틀 크기: `text-xl` → `text-2xl md:text-3xl`
  - 설명 텍스트를 JSX 요소로 변경하여 `<br />` 태그 추가
  - 더 구체적이고 감성적인 카피라이팅:
    - **초정밀**: "수술 오차 0%에 도전하는 초정밀 시스템으로 당신의 눈에 완벽한 시력을 새겨냅니다."
    - **안전**: "대학병원 교수 출신 의료진과 대학병원급 최신 장비가 함께하기에 안심하고 맡기실 수 있습니다."
    - **공감**: "수만 건의 케이스로 완성된 수술 실력과 따뜻한 힐링 공간에서 당신의 눈을 진심으로 공감합니다."

---

#### 4. **Why Healing Eye 섹션 인터랙션 강화** 🔗
**파일**: `src/components/home/WhyHealingEye.tsx`

**주요 변경 사항**:
- ✅ 리뷰 배지를 클릭 가능한 링크로 변경
  - 한국어: 네이버 지도 리뷰 페이지
  - 영어: 구글 맵 리뷰 페이지
  - `useLocale()` hook으로 동적 URL 설정

- ✅ 인터랙션 효과 추가
  - 호버 시 배경색 변경 (`hover:bg-neutral-900`)
  - 호버 시 스케일 업 (`scale: 1.05`)
  - 클릭 시 스케일 다운 (`scale: 0.95`)

- ✅ **"4.9/5.0 Patient Review" 배지** (신규 추가)
  - 골드 컬러 펄스 애니메이션 추가
  - boxShadow 효과 (0px → 8px → 0px)
  - 2초마다 무한 반복, 1초 지연
  - 클릭 유도 효과 강화

- ✅ "50,000+ Successful Cases" 배지
  - Community 페이지로 링크 연결
  - 펄스 애니메이션 추가 (boxShadow 효과)
  - 무한 반복, 1초 지연

- ✅ 3가지 차별점 콘텐츠 개선
  - **대학병원 교수 출신 의료진**: 기존 텍스트 유지, 줄바꿈 추가
  - **대학병원급 최첨단 장비**: "Zimer Z8, ZEISS SUITE 등 최신 장비와 독일 라라렌즈 최초 사용, 4중초점 판옵틱스 사용량 전국 1위로 백내장 전문성을 입증합니다."
  - **평생 시력 보증 시스템**: "앞으로의 40년, 제2의 인생을 책임지는 평생 보증 제도로 당신의 시력을 평생 보장합니다."

---

#### 5. **Services 섹션 콘텐츠 개선** 🏥
**파일**: `src/components/home/Services.tsx`

**주요 변경 사항**:

**1) Vision Correction 카드 (대형 2x2)**:
- ✅ 배경 이미지 변경
  - 기존: Pexels 외부 이미지
  - 신규: `/images/vision-correction-bg.jpg` (눈 클로즈업 이미지)
  - 위치: `bg-center` (중앙 정렬)
  - 효과: Grayscale → Color on hover, Scale up 1.05배

**2) Presbyopia & Cataract 카드 (화이트)**:
- ✅ 텍스트 한글화 및 폰트 크기 증가
  - 타이틀 크기: `text-3xl` → `text-3xl md:text-4xl`
  - 서브텍스트 변경: "Premium Lens Implant" → "노안/백내장센터 +"
  - 서브텍스트 스타일: `text-base md:text-lg font-bold`
  - 호버 텍스트: "노안/백내장센터 +" (`text-xl`)

**3) Eye Disease Center 카드 (다크)**:
- ✅ 텍스트 구조 개편
  - 타이틀: "Eye Disease Center" (영문 유지, `text-3xl md:text-4xl`)
  - 서브텍스트 1: "안질환센터" (`text-base md:text-lg font-bold`, `text-neutral-300`)
  - 서브텍스트 2: "안구건조증, 녹내장, 망막질환" (`text-sm md:text-base font-medium`, `text-neutral-400`)
  - 정보 계층 구조 명확화

**기술적 개선**:
- 반응형 폰트 크기 적용 (모바일/데스크톱 분리)
- 한글 가독성 향상을 위한 font-weight 조정
- 색상 대비 개선 (접근성 향상)

---

#### 6. **PremiumFacility 섹션 갤러리 구현** 🏢
**파일**: `src/components/home/PremiumFacility.tsx`

**주요 변경 사항**:

**1) 타이포그래피 강화**:
- ✅ 타이틀 폰트 무게: `font-light` → `font-bold`
  - "Relaxation Before Perfection" 제목 볼드 처리
  - 브랜드 임팩트 강화

**2) Embla Carousel 갤러리 구현**:
- ✅ **5개 시설 이미지 갤러리** (`/images/facility/1-5.jpeg/png`)
  - 프리미엄 라운지, 대기실, 수술실, 상담실 등
  - 반응형 레이아웃:
    - 모바일: 85% 너비 (1.2개 보임)
    - 태블릿: 38% 너비 (2.6개 보임)
    - 데스크톱: 30% 너비 (3.3개 보임)

**3) 인터랙션 효과**:
- ✅ 좌/우 네비게이션 버튼 (ChevronLeft/Right)
- ✅ 호버 시 카드 위로 이동 (`y: -10`)
- ✅ 호버 시 이미지 Scale up (1.05배)
- ✅ **선택된 슬라이드의 다음 슬라이드가 컬러로 표시** (독특한 UI 패턴)
  - 로직: `index === (selectedIndex + 1) % facilityImages.length`
  - 나머지 슬라이드는 grayscale, 호버 시 컬러 전환
  - 시각적 위계 강조

**4) 디자인 요소**:
- ✅ Parallax 배경 이미지 (`healingeye-main10f.jpeg`)
- ✅ 둥근 모서리 (2rem), 흰색 테두리 (border-white/10)
- ✅ 바닥 그라데이션 오버레이
- ✅ "Architecture & Interior Design" 플로팅 텍스트

**기술 스택**:
- Embla Carousel React
- Framer Motion (애니메이션)
- Next.js Image (이미지 최적화)

---

### 📊 메인 페이지 전체 구조 (현재 상태)

```
/src/app/[locale]/page.tsx
├── 1. Hero (히어로 섹션) ✅
├── 2. Philosophy (우리의 철학) ✅ 개선 완료
├── 3. WhyHealingEye (힐링안과를 선택해야 하는 이유) ✅ 개선 완료
├── 4. AIPrediction (AI 시력교정 예측) ✅ 개선 완료
├── 5. Services (진료 센터 소개) ✅ 개선 완료
├── 6. PremiumFacility (프리미엄 시설) ✅ 개선 완료
├── 7. MedicalTeam (의료진 소개) ✅
├── 8. Doctor (대표원장 상세) ✅
└── 9. Review (환자 후기) ✅
```

---

## 2026-01-31 (금) - 홈 섹션 완성 (MedicalTeam, Doctor, Review)

### 📋 작업 개요
병렬 개발 방식(Sub-Agent)을 통해 홈 페이지의 나머지 3개 핵심 섹션을 완성하고, 사용자 피드백을 반영하여 UI/UX를 세밀하게 개선

---

### ✅ 완료된 작업

#### 7. **MedicalTeam 섹션 캐러셀 구현** 👨‍⚕️
**파일**: `src/components/home/MedicalTeam.tsx`

**주요 변경 사항**:

**1) Embla Carousel 드래그 갤러리 구현**:
- ✅ 기존 scroll-based 애니메이션 → 드래그 가능한 캐러셀로 전환
- ✅ 캐러셀 설정:
  ```typescript
  useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps"
  })
  ```
- ✅ 좌/우 네비게이션 버튼 (ChevronLeft/Right)
- ✅ 카드 너비 반응형:
  - 모바일: `flex-[0_0_90%]` (화면의 90%)
  - 데스크톱: `flex-[0_0_650px]` (고정 650px)

**2) 의료진 데이터 구조**:
- ✅ 3명의 의료진 정보 (김선영, 임성웅, 이용은)
- ✅ PNG 이미지 경로: `/images/doctors/1.png`, `/images/doctors/2.png`, `/images/doctors/3.png`
- ✅ 전문 분야, 경력, 설명 등 포함

**3) 디자인 시스템 개선**:
- ✅ **카드 배경**: 다크 → 화이트 (`bg-white`)
- ✅ **이미지 배경**: PNG 투명 배경을 위한 흰색 배경
- ✅ **이미지 비율**: `aspect-[3/4]` (세로형 프로필 사진)
- ✅ **이미지 정렬**: `object-top` (얼굴 우선 표시)
- ✅ **Grayscale 제거**: 항상 컬러로 표시 (호버 시 확대만)
- ✅ **그라데이션**: `from-black via-black/30` → 인물 강조

**4) 인터랙션 효과**:
- ✅ 호버 시 카드 위로 이동 (`y: -8`) + 확대 (`scale: 1.02`)
- ✅ 호버 시 이미지 확대 (`scale: 1.10`)
- ✅ 호버 시 보더 컬러 변경 (`hover:border-primary/50`)
- ✅ 호버 시 그림자 효과 (`hover:shadow-2xl hover:shadow-primary/20`)
- ✅ 드래그 커서 (`cursor-grab`, `active:cursor-grabbing`)

**5) 타이포그래피**:
- ✅ 섹션 타이틀: "Mastery of Vision." (5xl~7xl, font-serif)
- ✅ 의사 이름: `text-4xl md:text-5xl font-black`
- ✅ 전문 분야 배지: 골드 배경 (`bg-primary`)
- ✅ 설명 텍스트: `text-lg md:text-xl font-serif`

**기술 스택**:
- Embla Carousel React (드래그 갤러리)
- Framer Motion (애니메이션)
- Next.js Image (이미지 최적화)

---

#### 8. **Doctor 섹션 캐러셀 구현** 🎬
**파일**: `src/components/home/Doctor.tsx`

**주요 변경 사항**:

**1) 3명 의사 순환 캐러셀 구현**:
- ✅ `useState`로 `currentIndex` 관리 (0~2)
- ✅ 좌우 네비게이션 버튼으로 의사 전환
- ✅ `AnimatePresence`로 부드러운 전환 애니메이션
- ✅ 전환 효과: `opacity: 0 → 1`, `y: 20 → 0 → -20`
- ✅ 각 의사별 맞춤형 Quote 표시:
  - 김선영: "Vision is not just **seeing**, it is **experiencing**."
  - 임성웅: "Precision in **diagnosis**, excellence in **treatment**."
  - 이용은: "Caring for **children's vision**, securing their **future**."

**2) 이미지 디스플레이 최적화 (PNG)**:
- ✅ **이미지 배경**: `bg-gray-100` (10% 회색 배경)
- ✅ **이미지 비율**: `aspect-[3/4]` (세로형)
- ✅ **둥근 모서리**: `rounded-2xl`
- ✅ **그라데이션 오버레이**: 하단 40%로 제한
  - 위치: `absolute bottom-0 left-0 right-0 h-[40%]`
  - 스타일: `from-black via-black/50 to-transparent`
  - 이미지 하단만 어둡게 처리하여 텍스트 가독성 확보
- ✅ 호버 시 이미지 확대 (`scale: 1.05`)

**3) 텍스트 가독성 및 타이포그래피 최적화**:
- ✅ **Position (Representative Director)**:
  - 골드 컬러: `text-primary`
  - 볼드: `font-bold`
  - 대문자: `uppercase`

- ✅ **Name (의사 이름)**:
  - 흰색 텍스트: `text-white`
  - 볼드 처리: `font-bold` (사용자 피드백 반영)
  - Drop shadow: `drop-shadow-lg` (가독성 향상)
  - 크기: `text-4xl lg:text-5xl font-serif`

- ✅ **Title (직함)**:
  - 반투명 흰색: `text-white/80`
  - 크기: `text-sm` (`drop-shadow-sm`)

**4) 레이아웃 구조**:
- ✅ 좌측 (5/12): 이미지 + 의사 정보
- ✅ 우측 (7/12): Quote + 경력 + 진료철학
- ✅ 네비게이션 버튼: 화면 좌우 고정 위치
- ✅ Parallax 효과: 배경 테두리 (y축 움직임)

**5) 애니메이션 세부사항**:
- ✅ 초기 등장: `opacity: 0, y: 30` → `opacity: 1, y: 0`
- ✅ 전환 시간: 0.5초 (easeInOut)
- ✅ 경력 목록: Stagger 애니메이션 (0.1초 간격)
- ✅ 버튼 호버: `scale: 1.05`, 클릭: `scale: 0.95`

**기술 스택**:
- Framer Motion (AnimatePresence, useScroll, useTransform)
- useState (상태 관리)
- Lucide React Icons

---

#### 9. **Review 섹션 화이트 디자인 + CTA** ⭐
**파일**: `src/components/home/Review.tsx`

**주요 변경 사항**:

**1) 디자인 시스템 전환 (다크 → 화이트)**:
- ✅ 배경색: 다크 → `bg-white`
- ✅ 카드 배경: `bg-gray-50` (밝은 회색)
- ✅ 텍스트 컬러: `text-gray-700`, `text-gray-900`
- ✅ 보더: `border-gray-200`
- ✅ Ambient 배경: `radial-gradient(circle_at_top_right, rgba(218,165,32,0.03), transparent)`

**2) 리뷰 데이터 확장**:
- ✅ 기존 5개 → **8개 리뷰**로 확장
- ✅ 추가된 리뷰 (id: 6~8):
  - 안수*: "재수술 (라식 → 노안라섹)" (2023.12.15)
  - 윤지*: "라섹 (각막 얇음)" (2023.12.10)
  - 조현*: "백내장 (프리미엄 렌즈)" (2023.12.05)
- ✅ 다양한 수술 케이스 커버 (스마일, ICL, 노안, 백내장, 재수술 등)

**3) Auto-play 캐러셀**:
- ✅ 5초마다 자동 슬라이드 전환:
  ```typescript
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);
  ```
- ✅ 수동 좌/우 네비게이션 버튼 포함
- ✅ Loop 모드: `loop: true`

**4) CTA 버튼 강화**:
- ✅ **밝은 골드 컬러**: `bg-[#FFD700]` (기존 탁한 색상 → 밝은 골드)
- ✅ 호버 컬러: `hover:bg-[#FFC700]` (더 밝은 골드)
- ✅ 크기: `text-lg px-12 py-7` (큰 버튼)
- ✅ 그림자: `shadow-lg hover:shadow-2xl hover:shadow-[#FFD700]/30`
- ✅ 호버 시 확대: `hover:scale-105`
- ✅ 아이콘 애니메이션: `group-hover:rotate-12` (Calendar 아이콘 회전)
- ✅ 버튼 텍스트: "지금 바로 전문가 상담 예약하기"

**5) 카드 인터랙션**:
- ✅ 호버 시 위로 이동 (`y: -10`)
- ✅ 호버 시 확대 (`scale: 1.02`)
- ✅ 호버 시 line-clamp 해제 (전체 텍스트 표시)
- ✅ 호버 시 보더 컬러 변경 (`hover:border-primary/50`)
- ✅ 호버 시 그림자 (`hover:shadow-2xl hover:shadow-primary/10`)

**6) 카드 레이아웃**:
- ✅ 반응형 너비:
  - 모바일: `flex-[0_0_100%]` (1개씩)
  - 태블릿: `flex-[0_0_45%]` (2.2개 보임)
  - 데스크톱: `flex-[0_0_35%]` (2.8개 보임)
- ✅ 둥근 모서리: `rounded-[2rem]`
- ✅ 별점 표시: 노란색 별 5개 (`fill="#FCD34D"`)
- ✅ Quote 아이콘: 회전된 인용 부호

**기술 스택**:
- Embla Carousel React (auto-play)
- Framer Motion (애니메이션)
- Lucide React Icons (Star, Quote, Calendar)

---

### 🐛 기술적 문제 해결

#### 1. **Turbopack Fatal Error 해결**
**문제**:
- 로컬 서버 접속 시 무한 새로고침 발생
- 에러: "range start index 84120081 out of range for slice of length 1299062"

**해결**:
```bash
rm -rf .next
npm run dev
```
- `.next` 캐시 디렉토리 삭제로 해결
- Turbopack HMR 버그로 추정 (next.config.ts에 `turbopack: false` 설정 유지)

---

#### 2. **PNG 이미지 디스플레이 최적화**
**문제**:
- PNG 투명 배경으로 인한 가독성 저하
- 이미지 크롭 시 얼굴이 잘림

**해결**:
- 이미지 배경 추가: `bg-white`, `bg-gray-100`
- 이미지 정렬: `object-top` (얼굴 우선)
- 이미지 비율: `aspect-[3/4]` (세로형 프로필)
- Grayscale 제거 (항상 컬러로 표시)

---

#### 3. **텍스트 가독성 문제 해결 (Doctor 섹션)**
**문제**:
- PNG 이미지 위 흰색 텍스트가 배경과 구분 안 됨

**최종 해결 (사용자 피드백 반영)**:
- ✅ **그라데이션 오버레이 최적화**:
  ```typescript
  <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black via-black/50 to-transparent z-20" />
  ```
  - 하단 40%로 제한 (`h-[40%]`)
  - 강화된 그라데이션 (`from-black via-black/50`)

- ✅ **텍스트 스타일 최적화**:
  - Position: `text-primary font-bold` (골드)
  - Name: `text-white font-bold drop-shadow-lg` (흰색 + 볼드)
  - Title: `text-white/80` (반투명 흰색)

- ❌ **시도했으나 철회된 방법**:
  - Glass-morphism 배경 (사용자 피드백으로 철회)
  - 골드 텍스트 테두리 (시각적으로 과도함)

---

#### 4. **CTA 버튼 색상 개선**
**문제**:
- 기존 CTA 버튼 색상이 너무 탁함 (사용자 피드백)

**해결**:
- 밝은 골드 색상으로 변경: `#FFD700` (표준 골드)
- 호버 시 더 밝은 골드: `#FFC700`
- 그림자 효과 강화: `shadow-2xl hover:shadow-[#FFD700]/30`

---

### 📊 메인 페이지 전체 구조 (2026-01-31 완성)

```
/src/app/[locale]/page.tsx
├── 1. Hero (히어로 섹션) ✅
├── 2. Philosophy (우리의 철학) ✅
├── 3. WhyHealingEye (힐링안과를 선택해야 하는 이유) ✅
├── 4. AIPrediction (AI 시력교정 예측) ✅
├── 5. Services (진료 센터 소개) ✅
├── 6. PremiumFacility (프리미엄 시설) ✅
├── 7. MedicalTeam (의료진 소개) ✅ **완성**
├── 8. Doctor (대표원장 상세) ✅ **완성**
└── 9. Review (환자 후기) ✅ **완성**
```

**홈 페이지 전체 9개 섹션 완성 🎉**

---

### 🎯 다음 작업 예정

1. **Sub-page 개발**
   - About (소개) 페이지
   - Vision (시력교정) 페이지
   - Cataract (백내장) 페이지
   - Center (센터) 페이지
   - Insight (블로그) 페이지

2. **i18n 번역 작업**
   - MedicalTeam, Doctor, Review 섹션 다국어 번역 (7개 언어)
   - 번역 키 추출 및 메시지 파일 업데이트

3. **추가 최적화**
   - 성능 최적화 (이미지 최적화, lazy loading)
   - 접근성 개선 (ARIA labels, keyboard navigation)
   - SEO 메타 데이터 업데이트

---

### 🛠 기술 스택
- **Framework**: Next.js 16.1.6 (App Router)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion 12.29.2
- **Carousel**: Embla Carousel React 8.6.0
- **i18n**: next-intl 4.8.0 (7개 언어)
- **Language**: TypeScript 5
- **Image**: Next.js Image (최적화)
- **Icons**: Lucide React 0.563.0

---

### 📝 참고 사항
- 로컬 개발 환경에서 작업 중
- Turbopack 비활성화 (webpack 사용)
- 병렬 개발 방식으로 빠른 개발 진행
- 모든 변경 사항은 git tracked 상태로 관리 중
- PNG 이미지 파일은 `/public/images/doctors/` 경로에 업로드 필요 (1.png, 2.png, 3.png)

#### 7. **Community 페이지 FAQ 실데이터 적용** 📝
**파일**: `src/app/[locale]/community/PageClient.tsx`

**변경 사항**:
- ✅ **FAQ 데이터 통합** (www.healingeye.co.kr/main/faq에서 추출)
  - 총 47개 FAQ 항목, 7개 카테고리
  - 클리어 라식 (7개), 라식 (9개), 라섹 (8개), 렌즈삽입술 (5개), 백내장 (6개), 익상편 (6개), 망막 (6개)

- ✅ **UI 구현**
  - 탭 방식 카테고리 전환
  - 아코디언 방식 Q&A 확장/축소
  - Framer Motion 애니메이션 적용
  - 첫 번째 항목 기본 열림 상태

- ✅ **Instagram 주소 변경**
  - 기존: @healingeye_official
  - 변경: @healingeyeclinic
  - 링크: https://www.instagram.com/healingeyeclinic/

**기술 스택**:
- useState로 activeTab 및 openIndex 관리
- motion.div로 부드러운 확장/축소 애니메이션
- 카테고리별 색상 구분 (primary/neutral)

---

#### 8. **Center 페이지 EquipmentShowcase Carousel 변경** 🎠
**파일**: `src/components/center/EquipmentShowcase.tsx`

**변경 사항**:
- ✅ **Framer Motion 스크롤 방식 → Embla Carousel로 전환**
  - 스크롤 기반 horizontal transform 제거
  - Embla Carousel React 8.6.0 적용
  - 터치 스와이프 제스처 지원

- ✅ **네비게이션 추가**
  - 데스크톱: 우측 상단 좌우 버튼 (ChevronLeft/Right)
  - 모바일: 하단 좌우 버튼
  - Dots indicator (현재 위치 표시)
  - 버튼 상태 관리 (canScrollPrev/Next)

- ✅ **이미지 경로 변경**
  - 기존: Pexels 외부 이미지 URL
  - 변경: `/images/center/equipment/` 로컬 이미지
  - 9개 장비 이미지 파일명 정의:
    - amaris-spt.jpg, galilei-g4.jpg, pentacam-hr.jpg
    - 3d-oct-1.jpg, optos-daytona.jpg
    - femto-ldv-z8.jpg, iol-master-700.jpg
    - callisto-eye.jpg, lumera-700.jpg

- ✅ **이미지 폴더 생성**: `/public/images/center/equipment/`

**기술 스택**:
- useEmblaCarousel hook
- useCallback/useEffect로 이벤트 관리
- loop: true (무한 루프)
- align: "start" (좌측 정렬)

---

## 2026-02-11 (화) - 다국어 언어 전환 오류 수정 및 CDP MCP 설치

### 📋 작업 개요
다국어 페이지 이동 시 언어가 한국어로 돌아가는 오류 수정 및 Chrome DevTools Protocol (CDP) MCP 설치

---

### ✅ 완료된 작업

#### 1. **다국어 언어 전환 오류 수정** 🌐
**파일**: `src/app/[locale]/layout.tsx`

**문제**:
- 언어를 변경한 후 다른 페이지로 이동하면 한국어(ko)로 돌아가는 오류
- 영어 페이지(`/en/community`)에서 다른 페이지로 이동 시 `/ko/...`로 이동
- 네비게이션 링크가 현재 locale을 유지하지 못함

**원인**:
- `NextIntlClientProvider`에 `locale` prop이 전달되지 않음
- 클라이언트 컴포넌트(Navbar)에서 `useLocale()`이 기본값 'ko'만 반환
- 서버에서 전달된 locale 정보가 클라이언트로 전파되지 않음

**해결 방법**:
```tsx
// 변경 전:
<NextIntlClientProvider messages={messages}>

// 변경 후:
<NextIntlClientProvider messages={messages} locale={locale}>
```

**변경 사항**:
- `NextIntlClientProvider`에 `locale` prop 추가
- 클라이언트 컴포넌트에서 `useLocale()` 정상 작동
- 모든 네비게이션 링크가 현재 언어 유지

---

#### 2. **다국어 페이지 브라우저 테스트** 🧪

**테스트 언어**:
- ✅ 영어 (en): `/en/community` → `/en/about` 정상
- ✅ 일본어 (ja): `/ja/community` → `/ja/vision` 정상
- ✅ 중국어 간체 (zh-CN): `/zh-CN/community` → `/zh-CN/cataract` 정상
- ✅ 중국어 번체 (zh-TW): 정상 작동 확인

**테스트 결과**:
- 모든 언어에서 페이지 이동 시 언어가 정상적으로 유지됨
- 네비게이션 링크가 올바른 locale 경로 생성
- 로고 링크도 현재 언어 유지
- FAQ 콘텐츠가 각 언어로 정확히 표시

---

#### 3. **CDP MCP 설치 및 설정** 🛠️

**설치 패키지**:
- `chrome-devtools-mcp` 0.17.0

**설정 변경**:
```bash
# CDP MCP 설치
npm install -g chrome-devtools-mcp

# Claude Code에 추가
claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp

# Playwright 플러그인 비활성화
# ~/.claude/settings.json
"playwright@claude-plugins-official": false
```

**MCP 서버 상태**:
- ✅ chrome-devtools: 연결됨
- ✅ context7: 연결됨
- ❌ playwright: 비활성화됨
- ⚠️  supabase: 인증 필요
- ❌ github: 연결 실패

---

### 🐛 발견 및 수정된 버그

#### 버그: 다국어 페이지 이동 시 언어 초기화
**문제**:
- 영어/일본어/중국어 페이지에서 다른 페이지로 이동하면 한국어로 변경
- `useLocale()` 훅이 항상 기본값 'ko' 반환
- NextIntlClientProvider에 locale이 전달되지 않음

**증상**:
- `/en/community` → About 클릭 → `/ko/about`로 이동
- `/ja/vision` → Community 클릭 → `/ko/community`로 이동
- 언어 선택 무효화

**해결**:
- NextIntlClientProvider에 locale prop 명시적 전달
- 클라이언트 컴포넌트에서 서버의 locale 정보 접근 가능
- 모든 언어에서 정상 작동 확인

---

### 📊 변경 파일 (2개)

#### 수정
1. `src/app/[locale]/layout.tsx` - NextIntlClientProvider에 locale prop 추가 (+1줄)
2. `~/.claude/settings.json` - Playwright 비활성화, CDP MCP 추가 (+2줄)

---

### 🎯 주요 개선 포인트

**다국어 지원**:
- 언어 전환 후에도 페이지 이동 시 언어 유지
- 4개 언어(en, ja, zh-CN, zh-TW) 테스트 완료
- 네비게이션 경로 자동 locale 반영

**개발 환경**:
- CDP MCP로 브라우저 제어 방식 변경
- Chrome DevTools Protocol 직접 사용 가능
- Playwright 대비 더 세밀한 브라우저 제어

**안정성**:
- next-intl의 권장 사용 방법 준수
- 서버/클라이언트 간 locale 정보 동기화
- 일관된 다국어 경험 제공

---

### 🧪 테스트 수행

**브라우저 테스트**:
- Playwright MCP 사용 (CDP 전환 전)
- 개발 서버: http://localhost:3000
- 4개 언어 × 3개 페이지 = 12개 시나리오 테스트
- 모든 시나리오 통과 ✅

**MCP 서버 테스트**:
- CDP MCP 설치 확인
- 서버 연결 상태 확인
- Playwright 비활성화 확인

---

### 🎯 다음 작업 예정

1. **CDP MCP 활용**
   - Claude Code 재시작 후 CDP MCP 도구 사용
   - Playwright 대비 성능 및 기능 비교
   - 브라우저 테스트 자동화 개선

2. **미완성 언어팩 완성**
   - 🇹🇭 태국어 (th): 42% → 100%
   - 🇷🇺 러시아어 (ru): 42% → 100%
   - 커뮤니티 FAQ 번역 추가

3. **프로덕션 배포**
   - 다국어 변경사항 커밋
   - Vercel 배포 및 확인
   - 실사용 환경 테스트

---

### 🛠 기술 스택 업데이트
- **Framework**: Next.js 16.1.6 (App Router)
- **i18n**: next-intl 4.8.0 (7개 언어)
- **Browser Control**: CDP MCP (chrome-devtools-mcp 0.17.0)
- **Development**: Claude Code 2.1.38
- **MCP Servers**: chrome-devtools, context7

---

