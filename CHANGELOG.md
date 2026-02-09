# Changelog

All notable changes to this project will be documented in this file.

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
- [ ] Implement i18n language pack (multi-language support)
- [ ] Additional feature development
- [ ] Performance optimization
- [ ] Cross-browser testing
