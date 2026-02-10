# 전체 코드 점검 리포트 (2026-02-10)

대상: `/Users/kingone0907/Desktop/healingeyeclinic` 전체
점검 범위: Next.js App Router, i18n, UI/UX 컴포넌트, 데이터 연동(RSS), SEO
점검 방식: 정적 코드 리뷰 (테스트/빌드 미실행)

---

## 1. 프로젝트 구조 요약

- App Router 기반 다국어 구조: `src/app/[locale]/*`
- i18n: `next-intl` + `src/messages/*.json`
- 컨텐츠:
  - RSS 기반: YouTube/네이버 블로그 (`src/lib/youtube.ts`, `src/lib/naver-blog.ts`)
  - MDX 블로그: `src/content/blog/*`
- UI/UX: Tailwind v4 + Framer Motion + Embla Carousel
- SEO: `robots.ts`, `sitemap.ts`

---

## 2. 주요 리스크/버그 후보 (우선순위 순)

### P1 (실제 런타임 문제 가능성 높음)
1) **`SmoothScroll` RAF 누수**
- 파일: `src/components/layout/SmoothScroll.tsx`
- 문제: `requestAnimationFrame` 루프가 cleanup에서 중지되지 않음 → 페이지 이동 시 루프 지속 가능
- 영향: 메모리/CPU 누수, 라우팅 반복 시 성능 저하
- 권장 수정: RAF id 저장 후 cleanup에서 `cancelAnimationFrame` 호출

2) **`Footer`에서 `useTranslations` 사용 + Server Component 가능성**
- 파일: `src/components/layout/Footer.tsx`
- 문제: `useTranslations`는 Client Hook으로 인식되는 경우가 많음. `"use client"` 없이 서버 컴포넌트로 렌더되면 빌드 실패 가능
- 영향: 빌드 에러 또는 런타임 오류 가능
- 권장 수정: `"use client"` 추가 또는 `getTranslations`로 서버화

### P2 (데이터 불일치 시 UI 깨짐 가능)
3) **번역 데이터 배열 길이 의존 로직**
- 파일: `src/app/[locale]/vision/PageClient.tsx`
- 문제: `procedureColors[index]`가 없으면 `...undefined` spread → 런타임 에러 가능
- 권장 수정: 길이 보정 또는 기본값 제공

4) **클리닉/FAQ 데이터 길이 불일치 처리 부족**
- 파일: `src/app/[locale]/center/PageClient.tsx`, `src/app/[locale]/community/PageClient.tsx`
- 문제: 번역 데이터 변경 시 아이콘/카테고리 매핑 누락 가능
- 권장 수정: 데이터 키 기반 매핑 또는 fallback

5) **YouTube/Blog 날짜 포맷: 빈 문자열 처리 미흡**
- 파일: `src/components/insight/VideoGallery.tsx`, `src/app/[locale]/insight/PageClient.tsx`
- 문제: `publishedAt` 빈 문자열일 때 `Invalid Date` 발생
- 권장 수정: 날짜 검증/기본값 처리

### P3 (운영/보안/SEO 개선 권장)
6) **`window.open` 보안 옵션 누락**
- 파일: `src/app/[locale]/community/PageClient.tsx`, `src/components/insight/VideoGallery.tsx`, `src/app/[locale]/insight/PageClient.tsx`
- 문제: `window.open(url, '_blank')`는 `noopener` 미적용 가능
- 권장 수정: `window.open(url, '_blank', 'noopener,noreferrer')`

7) **`sitemap.ts`에 블로그 경로 미포함**
- 파일: `src/app/sitemap.ts`
- 문제: 블로그 목록/포스트가 사이트맵에 없음
- 권장 수정: `/blog`, `/blog/[slug]` 포함

8) **루트 `messages/ko.json` 중복 파일**
- 파일: `/Users/kingone0907/Desktop/healingeyeclinic/messages/ko.json`
- 문제: 실제 참조는 `src/messages/*.json` → 혼동 가능
- 권장 수정: 미사용이면 제거 또는 문서화

9) **CTA 버튼 TODO/콘솔 로그**
- 파일: `src/components/home/Review.tsx`
- 문제: `console.log`/TODO 그대로 유지
- 권장 수정: 예약/문의 라우팅 연결 또는 이벤트 제거

---

## 3. 개선 제안 (우선순위별 액션)

### 즉시 수정 권장 (안정성/성능)
- `SmoothScroll` RAF 누수 제거
- `Footer`의 Client/Server 경계 정리
- `procedureColors`/`clinics`/`faq` 배열 안전 처리

### 빠른 개선 (SEO/보안)
- `window.open` 보안 옵션 적용
- `sitemap.ts`에 블로그 경로 추가
- `robots.ts`의 sitemap URL을 환경변수 기반으로 전환

### 중기 개선 (유지보수)
- 번역 데이터 스키마 정의 (Zod 등) → raw 데이터 검증
- 루트 `messages/` 폴더 정리
- 공통 링크/외부 URL 상수화

---

## 4. 개발 방향성 제안 (다음 사이클)

1) **콘텐츠 안정화**
- RSS 실패 시 fallback UI 강화
- 유튜브/네이버 블로그 데이터 로드 실패 로그 수집

2) **i18n 품질 관리**
- 메시지 키 정합성 검사 스크립트 추가
- 언어별 데이터 길이/구조 일치 검증

3) **성능 최적화**
- 대형 애니메이션 섹션에 `prefers-reduced-motion` 대응
- 이미지/비디오 lazy strategy 점검

4) **예약/상담 플로우 연결**
- CTA 버튼 클릭 → 예약 페이지/상담 모달 연결
- 이벤트 추적(전환율) 도입

---

## 5. 점검 메모

- 테스트/빌드/런타임 검증은 수행하지 않았음.
- 문제 후보들은 번역 데이터 변경, 환경 변수 누락, 프로덕션 캐시 상황에서 재현 가능.

---

## 6. 다음 작업 제안

원하시면 아래를 바로 진행할 수 있습니다.
1) P1/P2 항목 즉시 수정 (코드 수정)
2) sitemap/blog 경로 확장 및 SEO 개선
3) i18n 데이터 스키마 검증 도입

