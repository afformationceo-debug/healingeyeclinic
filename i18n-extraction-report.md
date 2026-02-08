# 힐링안과 다국어 번역 텍스트 추출 보고서

## 작업 개요
- **프로젝트**: 힐링안과 웹사이트
- **작업 일자**: 2026-02-08
- **작업 범위**: 홈페이지 및 About 페이지 전체 컴포넌트
- **총 파일 수**: 12개 컴포넌트

---

## 추출된 컴포넌트 목록

### 1. Home 페이지 컴포넌트
1. `/src/components/home/Hero.tsx`
2. `/src/components/home/Philosophy.tsx`
3. `/src/components/home/WhyHealingEye.tsx`
4. `/src/components/home/Review.tsx`
5. `/src/components/home/Doctor.tsx`
6. `/src/components/home/MedicalTeam.tsx`

### 2. About 페이지 컴포넌트
1. `/src/components/about/BrandStory.tsx`
2. `/src/components/about/DirectorMessage.tsx`
3. `/src/components/about/HistoryTimeline.tsx`
4. `/src/components/about/Location.tsx`
5. `/src/components/about/Philosophy.tsx`

### 3. Layout 컴포넌트
1. `/src/components/layout/Footer.tsx`

---

## JSON 구조 설계 원칙

### 1. 계층적 구조
```
Root
├── Home (홈페이지 섹션)
│   ├── Hero
│   ├── Philosophy
│   ├── WhyHealingEye
│   ├── Review
│   ├── Doctor
│   └── MedicalTeam
├── About (소개 페이지)
│   ├── BrandStory
│   ├── DirectorMessage
│   ├── HistoryTimeline
│   ├── Location
│   └── Philosophy
├── Footer (공통 푸터)
└── Common (공통 요소)
```

### 2. 키 명명 규칙
- **camelCase** 사용: `sectionTitle`, `mainQuote`, `headlineSubtitle`
- **의미론적 명명**: 용도가 명확하게 드러나도록
- **일관성 유지**: 같은 개념은 같은 키 이름 사용

### 3. 텍스트 분류

#### UI 텍스트
- 버튼 라벨: `ctaButton`, `viewProfile`, `book`
- 섹션 제목: `sectionTitle`, `headline`
- 네비게이션: `navigation.home`, `navigation.about`

#### 콘텐츠 텍스트
- 설명문: `description`, `philosophy`, `tagline`
- 인용문: `quote`, `mainQuote`
- 리뷰 내용: `reviews[].content`

#### 의학 용어
- 정확한 용어 보존: `스마일 라식`, `노안백내장`, `ICL 렌즈삽입술`
- 전문 장비명: `Zimer Z8`, `ZEISS SUITE`
- 직책: `안과전문의`, `임상교수`

---

## 주요 섹션별 텍스트 분석

### Home.Hero
**특징**: 브랜드 아이덴티티 강조
- 클리닉명, 위치, 설립년도
- 대표원장 이름
- 브랜드 메시지
- CTA 버튼

**핵심 메시지**:
> "We redefine the standard of vision correction with uncompromising precision and safety."

### Home.Philosophy
**특징**: 병원 철학 및 핵심 가치
- 3대 핵심 가치: 초정밀(Precision), 안전(Safety), 공감(Empathy)
- 감성적 메시지와 데이터 결합
- 움직이는 텍스트 효과용 키워드

**핵심 메시지**:
> "눈을 치료하는 것을 넘어 당신의 삶을 치유합니다."

### Home.WhyHealingEye
**특징**: 차별화 포인트 강조
- 통계 데이터: 4.9/5.0, 50,000+
- 3가지 강점: 의료진, 장비, 평생보증
- 외부 링크: 네이버/구글 리뷰

### Home.Review
**특징**: 실제 환자 후기 8건
- 각 리뷰별 필드:
  - `name`: 익명화된 이름
  - `age`: 연령대
  - `surgery`: 수술 종류
  - `content`: 후기 본문
  - `date`: 작성일

**수술 종류**:
- 스마일 라식
- 다초점 인공수정체 (노안백내장)
- ICL 렌즈삽입술
- 노안 라식
- 프리미엄 라섹
- 재수술
- 백내장 (프리미엄 렌즈)

### Home.Doctor & MedicalTeam
**특징**: 의료진 소개 (3명)

**공통 필드**:
- 한글명 / 영문명
- 직책 (대표원장/원장)
- 전문의 자격
- 전문 분야
- 진료 철학
- 경력사항 (배열)

**의료진**:
1. 김선영 대표원장 - 스마일·클리어 / 노안백내장 / 안구건조증
2. 임성웅 대표원장 - 망막 / 녹내장 / 시력교정
3. 이용은 원장 - 소아안과 / 드림렌즈

### About.BrandStory
**특징**: 브랜드 스토리 및 미션
- 홀로그래픽 스캔 효과 배경
- 통계 카드 3개
- 기술과 예술의 조화 강조

### About.DirectorMessage
**특징**: 대표원장 인사말
- 4개 단락으로 구성
- 공감과 진정성 강조
- 개인적 철학 공유

### About.HistoryTimeline
**특징**: 연혁 타임라인 (2018-2024)
- 7개 주요 이정표
- 수평 스크롤 효과
- 시간순 배치

### About.Location
**특징**: 병원 위치 및 운영시간
- 주소, 연락처, 진료시간
- 지도 시각화
- 교통 안내

### About.Philosophy
**특징**: 핵심 가치 3가지
- Safety First: 60단계 검사, 3중 검증
- Personalized: 1:1 맞춤, 20+ 분석항목
- Lifetime Care: 평생 데이터 보관, 무료 정기검진

### Footer
**특징**: 전역 푸터
- 브랜드 소개
- 연락처 정보
- 진료시간 (주간별 상세)
- 저작권 정보
- 정책 링크

---

## 의학 용어 정리

### 수술/시술 용어
- 스마일 라식 (SMILE LASIK)
- 라섹 (LASEK)
- 노안 라식 (Presbyopia LASIK)
- 클리어라식 (CLEAR LASIK)
- ICL 렌즈삽입술 (ICL Lens Implantation)
- 다초점 인공수정체 (Multifocal IOL)
- 백내장 (Cataract)
- 드림렌즈 (Orthokeratology / Dream Lens)

### 질환/증상 용어
- 노안 (Presbyopia)
- 안구건조증 (Dry Eye Syndrome)
- 녹내장 (Glaucoma)
- 망막 (Retina)
- 근시 (Myopia)
- 각막 (Cornea)

### 장비/기술 용어
- Zimer Z8
- ZEISS SUITE
- 판옵틱스 (PanOptix)
- 라라렌즈 (Lara Lens)
- AI 정밀 검사 시스템

### 전문 자격/기관
- 안과전문의 (Ophthalmologist)
- 임상교수 (Clinical Professor)
- 대한안과학회 (KOS - Korean Ophthalmological Society)
- 한국망막학회 (Korean Retina Society)
- 유럽백내장굴절수술학회 (ESCRS)
- 미국백내장굴절수술학회 (ASCRS)

---

## 번역 시 주의사항

### 1. 의학 용어
- 정확성 최우선
- 현지 의료 관행에 맞는 용어 사용
- 전문가 검수 필수

### 2. 브랜드 메시지
- 감성적 뉘앙스 보존
- 문화적 맥락 고려
- "힐링" 개념의 현지화

### 3. 통계 및 수치
- 형식 현지화 (날짜, 평점 등)
- 단위 변환 여부 확인
- 신뢰성 유지

### 4. 법적/윤리적 고려
- 의료 광고 규제 준수
- 과장 표현 주의
- 환자 후기 진정성 유지

### 5. SEO 최적화
- 현지 검색어 고려
- 메타 태그용 짧은 버전 준비
- 키워드 자연스러운 삽입

---

## 다음 단계 권장사항

### 1. en.json 생성
- 전문 의료 번역가 섭외
- 원어민 검수
- 의학 용어 일관성 체크

### 2. 컴포넌트 리팩토링
- `useTranslations` 훅 적용
- 하드코딩된 텍스트 제거
- 동적 콘텐츠 처리

### 3. 추가 언어 지원 (선택)
- 중국어 (간체/번체)
- 일본어
- 베트남어
- 러시아어

### 4. 품질 관리
- 번역 메모리 구축
- 용어집 관리
- 정기적 업데이트 프로세스

### 5. 테스트
- 각 언어별 UI 검증
- 텍스트 오버플로우 확인
- 모바일 반응형 테스트

---

## 파일 정보

**생성된 파일**: `/messages/ko.json`
**파일 크기**: ~25KB (추정)
**총 메시지 키**: 200+ 개
**중첩 레벨**: 최대 4단계

---

## 연락처

**프로젝트 디렉토리**: `/Users/kingone0907/Desktop/healingeyeclinic`
**작업 완료 파일**:
- `/messages/ko.json` - 한국어 메시지 파일
- `/i18n-extraction-report.md` - 본 보고서

---

## 체크리스트

- [x] 모든 컴포넌트 텍스트 추출
- [x] 구조화된 JSON 설계
- [x] 의학 용어 정리
- [x] ko.json 파일 생성
- [x] 추출 보고서 작성
- [ ] en.json 번역 (다음 단계)
- [ ] 컴포넌트에 i18n 적용 (다음 단계)
- [ ] 번역 품질 검수 (다음 단계)
- [ ] 프로덕션 배포 (다음 단계)

---

**작업 완료일**: 2026-02-08
**작성자**: Claude Code AI Assistant
