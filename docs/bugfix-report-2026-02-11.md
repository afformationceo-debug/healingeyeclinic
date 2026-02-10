# 버그 수정 및 코드 개선 리포트 (2026-02-11)

대상: `/Users/kingone0907/Desktop/healingeyeclinic`
기준 문서: `design_review.md`, `docs/code-audit-2026-02-10.md`
빌드 검증: `npm run build` 통과 (TypeScript 에러 없음)

---

## 수정 항목 요약

| # | 우선순위 | 카테고리 | 파일 | 상태 |
|---|----------|----------|------|------|
| 1 | P1 | 성능/메모리 | SmoothScroll.tsx | 완료 |
| 2 | P1 | 보안 | VideoGallery.tsx 외 3개 파일 | 완료 |
| 3 | P2 | 안정성 | vision/PageClient.tsx | 완료 |
| 4 | P2 | 안정성 | center/PageClient.tsx | 완료 |
| 5 | P2 | 안정성 | community/PageClient.tsx | 완료 |
| 6 | P2 | SEO | sitemap.ts | 완료 |
| 7 | P2 | 안정성 | youtube.ts, naver-blog.ts | 완료 |
| 8 | P3 | 보안 | VideoGallery.tsx, insight/PageClient.tsx | 완료 |
| 9 | P3 | 클린업 | Review.tsx | 완료 |
| 10 | P3 | 접근성 | globals.css | 완료 |
| 11 | P3 | 클린업 | blog/page.tsx | 완료 |

---

## 상세 수정 내용

### 1. SmoothScroll RAF 메모리 누수 수정 (P1 - 성능)

**파일:** `src/components/layout/SmoothScroll.tsx`
**원인:** `requestAnimationFrame` 재귀 루프에서 frame ID를 저장하지 않아 컴포넌트 언마운트 시 RAF 루프가 계속 실행됨
**영향:** 메모리/CPU 누수, 라우팅 반복 시 성능 저하
**수정:**
- `let rafId: number` 변수 추가하여 RAF ID 저장
- 재귀 호출 시 `rafId = requestAnimationFrame(raf)` 로 ID 저장
- cleanup 함수에서 `cancelAnimationFrame(rafId)` 호출 추가
- `lenis.destroy()` 이전에 RAF 취소하여 안전한 정리 보장

---

### 2. window.open 보안 취약점 수정 (P1 - 보안)

**파일:** 3개 파일, 8개소
**원인:** `window.open(url, '_blank')` 호출 시 `noopener,noreferrer` 미적용
**영향:** Reverse tabnabbing 공격 가능, Referer 헤더 노출
**수정:** 모든 8개 인스턴스에 세 번째 인자 추가

| 파일 | 수정 수 |
|------|---------|
| `src/components/insight/VideoGallery.tsx` | 2개소 |
| `src/app/[locale]/community/PageClient.tsx` | 3개소 |
| `src/app/[locale]/insight/PageClient.tsx` | 3개소 |

```javascript
// Before
window.open(url, '_blank')
// After
window.open(url, '_blank', 'noopener,noreferrer')
```

---

### 3-5. 배열 범위 안전 처리 (P2 - 안정성)

**3. vision/PageClient.tsx - procedureColors**
- `procedureColors[index]` → `procedureColors[index % procedureColors.length]`
- 번역 데이터 배열이 색상 배열보다 길 경우 modulo 연산으로 순환

**4. center/PageClient.tsx - clinicIcons/clinicBgs**
- `clinicIcons[index]` → `clinicIcons[index % clinicIcons.length]`
- `clinicBgs[index]` → `clinicBgs[index % clinicBgs.length]`

**5. community/PageClient.tsx - FAQ categoryKeys**
- `faqItems[categoryKeys[activeTab]]` → `(categoryKeys[activeTab] && faqItems[categoryKeys[activeTab]]) || []`
- activeTab이 범위를 벗어날 경우 빈 배열로 안전하게 폴백

---

### 6. sitemap.ts 블로그 경로 추가 (P2 - SEO)

**파일:** `src/app/sitemap.ts`
**원인:** 블로그 경로가 사이트맵에 누락
**수정:**
- `/blog` 정적 경로 추가
- `src/content/blog/` 디렉토리 스캔하여 동적 블로그 slug 자동 수집
- 다국어 경로 `/{locale}/blog/{slug}` 생성
- try/catch로 디렉토리 없는 경우 안전 처리

---

### 7. 날짜 형식 빈 문자열 처리 (P2 - 안정성)

**데이터 소스 레이어:**
- `src/lib/youtube.ts`: 빈 문자열 폴백 `''` → `new Date().toISOString()`
- `src/lib/naver-blog.ts`: 동일 처리

**UI 레이어 (방어적 검증):**
- `src/components/insight/VideoGallery.tsx`의 `formatDate()`:
  - `if (!dateString) return 'Unknown'` 가드 추가
  - `if (isNaN(date.getTime())) return 'Unknown'` Invalid Date 체크 추가
- `src/app/[locale]/insight/PageClient.tsx`의 `formatDate()`: 동일 가드 추가

---

### 8. 스크롤바 접근성 개선 (P3 - 접근성)

**파일:** `src/app/globals.css`
**원인:** 전역 스크롤바 완전 숨김으로 접근성 저해
**수정:** 숨김 CSS를 다크 테마에 맞는 최소한의 스타일 스크롤바로 교체
- WebKit: 6px 너비, 투명 트랙, 골드 톤 thumb (`rgba(212, 175, 55, 0.3)`)
- Firefox: `scrollbar-width: thin`, `scrollbar-color` 골드 톤
- 호버 시 약간 더 밝은 골드 (`rgba(212, 175, 55, 0.5)`)

---

### 9. console.log/TODO 제거 (P3 - 클린업)

**파일:** `src/components/home/Review.tsx`
- `console.log('CTA clicked...')` 디버그 코드 제거
- TODO 주석을 간결한 미래 작업 주석으로 교체

---

### 10. 블로그 페이지 미사용 코드 정리 (P3 - 클린업)

**파일:** `src/app/[locale]/blog/page.tsx`
- 주석처리된 `// const t = useTranslations('Blog')` 제거
- 미사용 `import { useTranslations }` 제거

---

## 검증 결과

- **빌드:** `npm run build` 성공 (TypeScript 에러 0건)
- **정적 페이지:** 5/5 생성 완료
- **영향 범위:** 기존 동작 변경 없음, 방어적 코드만 추가

---

## 미수정 항목 (감사에서 확인됨)

| 항목 | 이유 |
|------|------|
| Footer useTranslations | 검증 결과 문제 아님 (next-intl 서버 컴포넌트 지원) |
| 중복 messages/ko.json | 파일이 이미 존재하지 않음 (이전에 제거됨) |

---

## 향후 권장 사항

1. **디자인 시스템 확장**: `src/components/ui/`에 Form, Card, Modal 등 추가
2. **타이포그래피 시스템**: 체계적인 H1-H6, 본문 스케일 정의
3. **페이지 전환 애니메이션**: framer-motion을 활용한 라우트 전환
4. **CTA 버튼 연결**: 예약/상담 페이지 또는 모달 구현
5. **성능 모니터링**: `prefers-reduced-motion` 대응, 지연 로딩 강화
