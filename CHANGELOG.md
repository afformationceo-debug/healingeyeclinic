# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2026-02-11

### Added
- **SEO 관리 시스템**: 8개 페이지 x 7개 언어 = 56개 SEO 설정 관리
  - `/admin` 관리자 페이지 (다크 테마, 로그인 불필요)
  - JSON 파일 기반 SEO 데이터 저장 (`src/data/seo-settings.json`)
  - API Route: GET/PUT `/api/seo` (페이지별/언어별 조회/저장)
  - SEO 헬퍼 함수: `getSeoForPage()` (DB 우선, 번역 JSON 폴백)
  - Google 검색결과 미리보기 + 소셜 미디어 미리보기
  - 언어별 설정 완료 상태 뱃지 (초록=7/7, 주황=일부, 회색=0)
  - Title tag, Meta description, OG tags, Keywords, Canonical URL, Robots, JSON-LD 지원

### Changed
- **Navbar 모바일 UX 고도화**
  - 스크롤 다운 시 네비바 자동 숨김 (Framer Motion slide up)
  - 스크롤 업 시 재등장 + backdrop-blur + 반투명 배경 + 그림자
  - 상단 여백 축소 (모바일 py-3, 스크롤 시 py-2.5)
  - 로고 크기 스크롤 시 축소 애니메이션
  - 언어 전환 버튼을 햄버거 메뉴 옆으로 이동 (모바일)
  - 햄버거/X 아이콘 회전 전환 애니메이션
  - 활성 링크 금색 하이라이트 + 하단 인디케이터
  - 모바일 메뉴 패널 디자인 개선 (슬라이드 인, 순차 등장)
- **8개 페이지 generateMetadata**: Supabase → JSON SEO 조회 우선, 번역 폴백
- **middleware.ts**: `/admin` 경로 i18n 처리 제외

### New Files
```
src/data/seo-settings.json          # SEO 데이터 저장소 (8페이지 x 7언어)
src/lib/seo.ts                      # SEO 헬퍼 함수 (read/write/getForPage)
src/app/api/seo/route.ts            # SEO API (GET/PUT)
src/app/(admin)/admin/layout.tsx    # 관리자 레이아웃 (noindex)
src/app/(admin)/admin/page.tsx      # SEO 관리 UI
```

---

## [1.1.0] - 2026-02-11

### Added
- Thai (th) language pack: 100% complete (1564 lines, 368 leaf keys)
- Russian (ru) language pack: 100% complete (1564 lines, 368 leaf keys)
- Blog routes in sitemap.ts (static /blog + dynamic /blog/[slug])
- i18n verification script: scripts/verify-i18n.js
- i18n build script: scripts/build-i18n.js
- Bug fix report: docs/bugfix-report-2026-02-11.md

### Fixed
- **P1 - SmoothScroll RAF memory leak**: Added cancelAnimationFrame in cleanup (SmoothScroll.tsx)
- **P1 - window.open security**: Added 'noopener,noreferrer' to all 8 instances across 3 files
- **P2 - Array bounds safety**: Modulo wrap for procedureColors, clinicIcons, clinicBgs
- **P2 - FAQ category safety**: Fallback to empty array for out-of-bounds activeTab
- **P2 - Date format handling**: Invalid Date guards in VideoGallery.tsx, insight/PageClient.tsx
- **P2 - Date fallback**: Empty string → new Date().toISOString() in youtube.ts, naver-blog.ts

### Improved
- Scrollbar accessibility: Replaced hidden scrollbar with styled thin gold scrollbar (globals.css)
- Removed console.log debug code from Review.tsx
- Removed unused imports and commented code from blog/page.tsx

---

## [Unreleased] - 2024-01-XX

### Added
- Mobile-optimized layouts across all pages
- Responsive typography and spacing system
- Dual layout system (Desktop/Mobile) for complex sections

### Changed

#### Global Components
- **Footer**: Updated hospital information to match Visit Us section
  - Address: 서울특별시 강남구 강남대로 470 808타워 10-11층 (신논현역 6번 출구 도보 1분)
  - Phone: 02-566-1222
  - Kakao: @healingeye
  - Hours: Updated with detailed schedule including Friday night clinic

#### Home Page
- **Services Section**: Fixed Medical Centers grid layout
  - Restored desktop Bento Grid layout (3-column)
  - Maintained mobile vertical stacking
  - Fixed card border-radius (`2.5rem` on desktop)

- **Premium Facility**: Optimized carousel for mobile
  - Adjusted card border-radius (responsive: `xl → 2xl → 2rem`)
  - Mobile-specific carousel navigation improvements

#### Vision Correction Page
- **VisionProcess**: Enhanced timeline design for mobile
  - Adjusted icon positioning (left-8 → left-[60px])
  - Improved vertical line centering
  - Better content spacing on mobile

- **VisionComparison**: Dual layout system
  - Desktop: Horizontal comparison table
  - Mobile: Vertical cards with grouped information

#### Cataract Page
- **AgingProcess**: Reverted spacing to original
  - Section padding: `py-32` (original restored)
  - Flex gap: `gap-16` (original restored)
  - Kept graphic size improvements (container height, SVG scale)

- **PageClient**: Reverted hero section spacing
  - Section alignment: `justify-end pb-20` (original restored)
  - Kept responsive text improvements

#### Eye Disease Center Page
- **EquipmentShowcase**: Mobile text optimization
  - Reduced font sizes for mobile (10px → xs → base → xl)
  - Added `line-clamp-3` for descriptions
  - Optimized padding and spacing
  - Spec badge sizes adjusted for mobile
  - **PC version unchanged**

- **TreatmentProcess**: Dual layout implementation
  - Desktop: Original horizontal layout preserved
  - Mobile: New vertical timeline with cards
  - Framer Motion animations for both layouts

#### Insight Page
- **Hero Section**: Mobile design enhancement
  - Improved title sizing (4xl → 5xl → 7xl → 9xl)
  - Better text alignment and spacing
  - Responsive decorative elements

- **Featured Video**: Mobile layout restructure
  - Desktop: Text overlay on video (original)
  - Mobile: Text below video with optimized button
  - Play button size optimization
  - Full-width button on mobile

- **PageClient**: Navbar spacing adjustment
  - Top padding: `pt-24 sm:pt-28 md:pt-32`
  - Prevents overlap with navbar

#### Community Page
- **PageClient**: Title alignment change
  - Changed from `items-end` to `items-start`
  - Left-aligned title and buttons
  - Mobile-optimized button layout (vertical stacking)

### Technical Details
- All changes maintain desktop layouts while optimizing mobile experience
- Responsive breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- Used Tailwind CSS responsive utilities throughout
- Framer Motion for enhanced animations

### Files Modified (29 files)
```
src/app/[locale]/cataract/PageClient.tsx
src/app/[locale]/community/PageClient.tsx
src/app/[locale]/insight/PageClient.tsx
src/app/[locale]/vision/PageClient.tsx
src/components/about/BrandStory.tsx
src/components/about/DirectorMessage.tsx
src/components/about/HistoryTimeline.tsx
src/components/about/Location.tsx
src/components/about/Philosophy.tsx
src/components/cataract/AgingProcess.tsx
src/components/cataract/LensGuide.tsx
src/components/cataract/LifestyleMatch.tsx
src/components/center/EquipmentShowcase.tsx
src/components/center/TreatmentProcess.tsx
src/components/home/AIPrediction.tsx
src/components/home/Doctor.tsx
src/components/home/Hero.tsx
src/components/home/MedicalTeam.tsx
src/components/home/Philosophy.tsx
src/components/home/PremiumFacility.tsx
src/components/home/Review.tsx
src/components/home/Services.tsx
src/components/home/WhyHealingEye.tsx
src/components/insight/VideoGallery.tsx
src/components/layout/Footer.tsx
src/components/layout/Navbar.tsx
src/components/vision/SafetySystem.tsx
src/components/vision/VisionComparison.tsx
src/components/vision/VisionProcess.tsx
```

---

## Development Notes

### Mobile Optimization Strategy
1. **Text Hierarchy**: Responsive font sizes (xs → sm → base → lg → xl → 2xl)
2. **Spacing System**: Progressive padding/margin (4 → 6 → 8 → 10 → 12)
3. **Layout Patterns**:
   - Conditional rendering for complex layouts
   - `hidden md:block` / `block md:hidden` pattern
   - Flex direction changes: `flex-col md:flex-row`

### Next Steps
- [x] Implement i18n language pack (multi-language support) ✅ 7개 언어 완료
- [x] SEO 관리 시스템 ✅ 8페이지 x 7언어
- [x] Navbar 모바일 UX 고도화 ✅
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Production deployment
