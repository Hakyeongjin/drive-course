# 🚗 오늘 어디로 달릴까

지역·분위기·계절로 찾는 **드라이브 코스 & 명소 추천** 웹앱.

> 🔗 **라이브 데모: https://drive-course-steel.vercel.app**

## 기능
- **🚗 추천 코스** — 손수 구성한 멀티 경유지 드라이브 코스 (지역·분위기·계절 필터)
- **📸 가볼만한 곳** — 전국 관광지 800여 곳 (사진·정확한 좌표, 지역·카테고리 필터)
- 지도 앱 연동 — **카카오맵 · 네이버지도 · 티맵**(정확 좌표) 길찾기
- 각 장소 **주변 맛집·카페** 바로 검색

## 데이터 출처
명소 정보는 **한국관광공사 [TourAPI](https://www.data.go.kr/)** (국문 관광정보 서비스, KorService2)를 활용합니다.

## 개발
```bash
npm install
npm run dev
```

## 명소 데이터 갱신
1. `.env.example` 를 복사해 `.env.local` 생성 후 발급받은 `TOUR_KEY` 입력
2. 아래 실행 → `src/data/spots.ts` 재생성
```bash
node scripts/fetch-tour.mjs
```

## 빌드
```bash
npm run build
```

## 기술 스택
Vite · React · TypeScript (백엔드 없는 정적 SPA)
