export type Region = '수도권' | '강원' | '충청' | '전라' | '경상' | '제주'
export type Theme = '바다' | '야경' | '단풍·가을' | '카페' | '자연·힐링' | '데이트' | '노을'
export type Season = '봄' | '여름' | '가을' | '겨울'

export interface Stop {
  name: string // 장소명 (카카오맵 검색용)
  desc: string // 한 줄 설명
}

export interface Course {
  id: string
  name: string
  region: Region
  area: string // 세부 지역
  themes: Theme[]
  seasons: Season[]
  emoji: string
  summary: string
  duration: string
  distance: string
  stops: Stop[]
}

export const REGIONS: Region[] = ['수도권', '강원', '충청', '전라', '경상', '제주']
export const THEMES: Theme[] = ['바다', '야경', '단풍·가을', '카페', '자연·힐링', '데이트', '노을']
export const SEASONS: Season[] = ['봄', '여름', '가을', '겨울']

// 테마별 카드 헤더 그라데이션 (분위기 색)
export const THEME_GRADIENT: Record<Theme, string> = {
  바다: 'linear-gradient(135deg, #35a7d6, #1f7aa8)',
  야경: 'linear-gradient(135deg, #5560a8, #2c2f5e)',
  '단풍·가을': 'linear-gradient(135deg, #e79246, #c9552a)',
  카페: 'linear-gradient(135deg, #a9835a, #7c5c3a)',
  '자연·힐링': 'linear-gradient(135deg, #54b56d, #2f8a4c)',
  데이트: 'linear-gradient(135deg, #e783a6, #c85a82)',
  노을: 'linear-gradient(135deg, #f39e63, #e0623c)',
}

// 카카오맵 검색 링크 (좌표 없이 장소명 검색 → 모바일은 앱으로 연결)
export function kakaoSearchUrl(query: string): string {
  return `https://map.kakao.com/?q=${encodeURIComponent(query)}`
}

// 네이버 지도 검색 링크 (웹·모바일)
export function naverSearchUrl(query: string): string {
  return `https://map.naver.com/p/search/${encodeURIComponent(query)}`
}

// 티맵 길찾기 딥링크 (모바일 앱 전용, 좌표 기반: goalx=경도, goaly=위도)
export function tmapRouteUrl(name: string, lat: number, lng: number): string {
  return `tmap://route?goalname=${encodeURIComponent(name)}&goalx=${lng}&goaly=${lat}`
}

// 카카오맵 길찾기 (정확 좌표 기반 도착지 핀)
export function kakaoRouteUrl(name: string, lat: number, lng: number): string {
  return `https://map.kakao.com/link/to/${encodeURIComponent(name)},${lat},${lng}`
}

// 코스별 목적지(마지막 경유지) 좌표 — 티맵 길찾기용 (대략치)
export const COURSE_COORD: Record<string, { lat: number; lng: number }> = {
  bukak: { lat: 37.6055, lng: 126.986 },
  yangpyeong: { lat: 37.554, lng: 127.346 },
  ganghwa: { lat: 37.787, lng: 126.436 },
  gangneung: { lat: 37.6893, lng: 129.0336 },
  hangyeryeong: { lat: 38.2105, lng: 128.599 },
  anbandegi: { lat: 37.662, lng: 128.725 },
  taean: { lat: 36.833, lng: 126.178 },
  danyang: { lat: 36.987, lng: 128.362 },
  yeosu: { lat: 34.742, lng: 127.741 },
  damyang: { lat: 35.323, lng: 126.993 },
  boseong: { lat: 34.917, lng: 127.503 },
  'busan-gijang': { lat: 35.1785, lng: 129.1995 },
  gyeongju: { lat: 35.806, lng: 129.501 },
  tongyeong: { lat: 34.789, lng: 128.662 },
  'jeju-east': { lat: 33.458, lng: 126.9425 },
  'jeju-west': { lat: 33.348, lng: 126.301 },
  gapyeong: { lat: 37.744, lng: 127.351 },
  paju: { lat: 37.888, lng: 126.744 },
  yeongjong: { lat: 37.447, lng: 126.373 },
  namhansanseong: { lat: 37.478, lng: 127.181 },
  chuncheon: { lat: 37.905, lng: 127.759 },
  samcheok: { lat: 37.324, lng: 129.264 },
  yeongwol: { lat: 37.19, lng: 128.47 },
  taebaek: { lat: 37.19, lng: 128.99 },
  boryeong: { lat: 36.24, lng: 126.55 },
  jecheon: { lat: 37.0, lng: 128.18 },
  seocheon: { lat: 36.13, lng: 126.51 },
  gunsan: { lat: 35.8, lng: 126.42 },
  cheongsando: { lat: 34.31, lng: 126.75 },
  namwon: { lat: 35.33, lng: 127.55 },
  jinan: { lat: 35.76, lng: 127.4 },
  pohang: { lat: 36.06, lng: 129.38 },
  andong: { lat: 36.55, lng: 128.71 },
  namhae: { lat: 34.75, lng: 127.98 },
  miryang: { lat: 35.49, lng: 128.98 },
  'jeju-south': { lat: 33.24, lng: 126.42 },
  udo: { lat: 33.5, lng: 126.95 },
  'namyangju-bukhan': { lat: 37.556, lng: 127.315 },
  pocheon: { lat: 37.99, lng: 127.3 },
  gimpo: { lat: 37.72, lng: 126.56 },
  songdo: { lat: 37.393, lng: 126.639 },
  hwaseong: { lat: 37.129, lng: 126.725 },
  daebudo: { lat: 37.19, lng: 126.6 },
  yeoju: { lat: 37.323, lng: 127.618 },
  icheon: { lat: 37.283, lng: 127.447 },
  yongin: { lat: 37.16, lng: 127.32 },
  anseong: { lat: 37.1, lng: 127.28 },
  yeoncheon: { lat: 38.09, lng: 127.02 },
  'paju-lake': { lat: 37.83, lng: 126.87 },
  'gapyeong-cheongpyeong': { lat: 37.75, lng: 127.42 },
  muuido: { lat: 37.375, lng: 126.41 },
  'pocheon-art': { lat: 37.94, lng: 127.25 },
  siheung: { lat: 37.39, lng: 126.74 },
}

export const COURSES: Course[] = [
  {
    id: 'bukak',
    name: '북악 스카이웨이 야경',
    region: '수도권', area: '서울',
    themes: ['야경', '데이트', '자연·힐링'],
    seasons: ['봄', '여름', '가을', '겨울'],
    emoji: '🌃',
    summary: '서울 도심을 한눈에 내려다보는 대표 야경 드라이브. 해질 무렵 출발하면 낮과 밤을 모두 즐길 수 있어요.',
    duration: '1~2시간', distance: '약 10km',
    stops: [
      { name: '자하문고개', desc: '드라이브 시작점, 성곽길 초입' },
      { name: '북악팔각정', desc: '서울 시내가 펼쳐지는 전망 포인트' },
      { name: '북악스카이웨이 하늘전망대', desc: '야경 명소, 카페에서 휴식' },
    ],
  },
  {
    id: 'yangpyeong',
    name: '양평 두물머리·카페거리',
    region: '수도권', area: '양평',
    themes: ['카페', '자연·힐링', '데이트'],
    seasons: ['봄', '여름', '가을'],
    emoji: '☕',
    summary: '남한강 물안개와 감성 카페가 어우러진 반나절 힐링 코스. 아침 물안개가 특히 예뻐요.',
    duration: '반나절', distance: '약 20km',
    stops: [
      { name: '두물머리', desc: '북한강·남한강이 만나는 물안개 명소' },
      { name: '세미원', desc: '연꽃과 정원 산책' },
      { name: '문호리 카페거리', desc: '강뷰 카페에서 마무리' },
    ],
  },
  {
    id: 'ganghwa',
    name: '강화도 해안 일주',
    region: '수도권', area: '인천 강화',
    themes: ['바다', '자연·힐링', '노을'],
    seasons: ['봄', '여름', '가을'],
    emoji: '🌊',
    summary: '섬 해안을 따라 도는 여유로운 드라이브. 서해 갯벌과 낙조가 매력이에요.',
    duration: '하루', distance: '약 40km',
    stops: [
      { name: '강화 초지진', desc: '역사 유적과 바다 전망' },
      { name: '동막해변', desc: '넓은 갯벌과 노을' },
      { name: '강화 평화전망대', desc: '북녘이 보이는 전망 포인트' },
    ],
  },
  {
    id: 'gangneung',
    name: '강릉 바다 커피 드라이브',
    region: '강원', area: '강릉',
    themes: ['바다', '카페'],
    seasons: ['봄', '여름', '가을', '겨울'],
    emoji: '🏖️',
    summary: '동해 바다와 커피 향이 함께하는 강릉 대표 코스. 커피거리에서 한 잔 들고 해변으로!',
    duration: '반나절~하루', distance: '약 25km',
    stops: [
      { name: '경포호수', desc: '호숫가 자전거·산책길' },
      { name: '안목해변 커피거리', desc: '바다 보며 커피 한 잔' },
      { name: '정동진', desc: '기차와 바다가 만나는 일출 명소' },
    ],
  },
  {
    id: 'hangyeryeong',
    name: '한계령·미시령 단풍',
    region: '강원', area: '설악·인제',
    themes: ['단풍·가을', '자연·힐링'],
    seasons: ['가을'],
    emoji: '🍁',
    summary: '설악 단풍을 만끽하는 가을 산악 드라이브. 10월 중순~말이 절정이에요.',
    duration: '하루', distance: '약 60km',
    stops: [
      { name: '인제 원대리 자작나무숲', desc: '하얀 자작나무 산책' },
      { name: '한계령', desc: '굽이길 단풍 절경' },
      { name: '속초 영금정', desc: '바다로 마무리, 회 한 접시' },
    ],
  },
  {
    id: 'anbandegi',
    name: '정선 안반데기·대관령 고원',
    region: '강원', area: '평창·정선',
    themes: ['자연·힐링', '노을'],
    seasons: ['여름', '가을'],
    emoji: '⛰️',
    summary: '해발 1,000m 고원의 탁 트인 풍경. 밤엔 별, 낮엔 초록 능선이 펼쳐져요.',
    duration: '하루', distance: '약 50km',
    stops: [
      { name: '안반데기', desc: '고랭지 배추밭과 능선 뷰' },
      { name: '대관령 양떼목장', desc: '초원과 양떼 산책' },
      { name: '대관령 하늘목장', desc: '전망대에서 노을 감상' },
    ],
  },
  {
    id: 'taean',
    name: '태안 안면도 해안 노을',
    region: '충청', area: '태안',
    themes: ['바다', '노을', '자연·힐링'],
    seasons: ['봄', '여름', '가을'],
    emoji: '🌅',
    summary: '서해 낙조가 아름다운 노을 드라이브. 해질 무렵 꽃지해변이 하이라이트예요.',
    duration: '하루', distance: '약 45km',
    stops: [
      { name: '간월암', desc: '물때 맞춰 걸어 들어가는 섬 암자' },
      { name: '안면도 꽃지해변', desc: '할미·할아비 바위 사이 낙조' },
      { name: '신두리 해안사구', desc: '이국적인 모래언덕 산책' },
    ],
  },
  {
    id: 'danyang',
    name: '단양 남한강 절경',
    region: '충청', area: '단양',
    themes: ['자연·힐링', '데이트'],
    seasons: ['봄', '가을'],
    emoji: '🏞️',
    summary: '강과 절벽이 어우러진 절경 코스. 스카이워크와 잔도로 스릴도 즐겨요.',
    duration: '하루', distance: '약 20km',
    stops: [
      { name: '도담삼봉', desc: '남한강 위 세 봉우리' },
      { name: '만천하 스카이워크', desc: '강을 내려다보는 전망대' },
      { name: '단양강 잔도', desc: '절벽에 매달린 산책로' },
    ],
  },
  {
    id: 'yeosu',
    name: '여수 밤바다',
    region: '전라', area: '여수',
    themes: ['야경', '바다', '데이트'],
    seasons: ['봄', '여름', '가을', '겨울'],
    emoji: '🌉',
    summary: '노래로도 유명한 여수 밤바다 야경 드라이브. 케이블카와 포차로 완성돼요.',
    duration: '하루', distance: '약 15km',
    stops: [
      { name: '돌산공원', desc: '여수 야경 조망 포인트' },
      { name: '여수해상케이블카', desc: '바다 위를 건너는 케이블카' },
      { name: '여수 낭만포차거리', desc: '밤바다 보며 야식' },
    ],
  },
  {
    id: 'damyang',
    name: '담양 메타세쿼이아길',
    region: '전라', area: '담양',
    themes: ['자연·힐링', '카페', '데이트'],
    seasons: ['봄', '여름', '가을'],
    emoji: '🌳',
    summary: '초록 터널을 달리는 힐링 드라이브. 대나무숲까지 이어지는 청량한 코스.',
    duration: '반나절', distance: '약 15km',
    stops: [
      { name: '담양 메타세쿼이아 가로수길', desc: '끝없이 이어지는 나무 터널' },
      { name: '죽녹원', desc: '시원한 대나무숲 산책' },
      { name: '관방제림', desc: '강변 고목길에서 마무리' },
    ],
  },
  {
    id: 'boseong',
    name: '보성·순천 초록 풍경',
    region: '전라', area: '보성·순천',
    themes: ['자연·힐링'],
    seasons: ['봄', '가을'],
    emoji: '🍃',
    summary: '녹차밭과 갈대밭의 초록·황금빛 풍경. 계절마다 색이 달라지는 코스예요.',
    duration: '하루', distance: '약 40km',
    stops: [
      { name: '보성 대한다원', desc: '계단식 녹차밭 산책' },
      { name: '순천만습지', desc: '드넓은 갈대밭과 철새' },
      { name: '순천만국가정원', desc: '테마 정원 산책' },
    ],
  },
  {
    id: 'busan-gijang',
    name: '부산 기장 해안',
    region: '경상', area: '부산',
    themes: ['바다', '카페'],
    seasons: ['봄', '여름', '가을', '겨울'],
    emoji: '🌊',
    summary: '탁 트인 동해와 카페가 늘어선 해안 드라이브. 바다 절 해동용궁사도 필수.',
    duration: '반나절~하루', distance: '약 20km',
    stops: [
      { name: '청사포 다릿돌전망대', desc: '바다 위로 뻗은 전망대' },
      { name: '해동용궁사', desc: '바다와 맞닿은 사찰' },
      { name: '송정해변', desc: '서핑과 카페로 마무리' },
    ],
  },
  {
    id: 'gyeongju',
    name: '경주 보문·감포 바다',
    region: '경상', area: '경주',
    themes: ['자연·힐링', '바다', '데이트'],
    seasons: ['봄', '가을'],
    emoji: '🏯',
    summary: '천년 고도와 동해 바다를 잇는 코스. 벚꽃 시즌 보문호수가 특히 예뻐요.',
    duration: '하루', distance: '약 35km',
    stops: [
      { name: '보문호수', desc: '호반 벚꽃길 드라이브' },
      { name: '감은사지 삼층석탑', desc: '고즈넉한 통일신라 유적' },
      { name: '감포 오류고아라해변', desc: '동해 바다에서 마무리' },
    ],
  },
  {
    id: 'tongyeong',
    name: '통영·거제 한려수도',
    region: '경상', area: '통영·거제',
    themes: ['바다', '노을'],
    seasons: ['봄', '여름', '가을'],
    emoji: '⛵',
    summary: '다도해 절경이 펼쳐지는 남해 드라이브. 케이블카와 바람의언덕이 백미.',
    duration: '하루', distance: '약 50km',
    stops: [
      { name: '통영 케이블카', desc: '미륵산에서 보는 한려수도' },
      { name: '거제 바람의언덕', desc: '바다 위 초원 언덕' },
      { name: '거제 신선대', desc: '기암과 파도의 절경' },
    ],
  },
  {
    id: 'jeju-east',
    name: '제주 동부 해안도로',
    region: '제주', area: '제주 동부',
    themes: ['바다', '카페', '데이트'],
    seasons: ['봄', '여름', '가을', '겨울'],
    emoji: '🏝️',
    summary: '에메랄드빛 바다를 따라 달리는 제주 대표 코스. 해변마다 감성 카페가 가득해요.',
    duration: '하루', distance: '약 30km',
    stops: [
      { name: '함덕 서우봉해변', desc: '옥빛 바다와 오름 산책' },
      { name: '월정리해변', desc: '카페거리와 하얀 모래' },
      { name: '성산일출봉', desc: '웅장한 화산 분화구' },
    ],
  },
  {
    id: 'jeju-west',
    name: '제주 서부 노을·오름',
    region: '제주', area: '제주 서부',
    themes: ['노을', '자연·힐링'],
    seasons: ['봄', '여름', '가을', '겨울'],
    emoji: '🌄',
    summary: '오름과 노을이 어우러진 서부 드라이브. 해질 무렵 새별오름 억새가 장관이에요.',
    duration: '하루', distance: '약 35km',
    stops: [
      { name: '애월 해안도로', desc: '카페와 바다가 이어지는 길' },
      { name: '새별오름', desc: '억새 능선과 노을' },
      { name: '금오름', desc: '분화구 호수와 파노라마 뷰' },
    ],
  },
  {
    id: 'gapyeong', name: '가평 호반 드라이브', region: '수도권', area: '가평',
    themes: ['자연·힐링', '데이트', '카페'], seasons: ['봄', '여름', '가을'], emoji: '🚤',
    summary: '북한강 호반과 섬·수목원을 잇는 힐링 코스. 사계절 다르게 예뻐요.',
    duration: '하루', distance: '약 35km',
    stops: [
      { name: '자라섬', desc: '강변 캠핑·산책' },
      { name: '남이섬', desc: '메타세쿼이아 나무길' },
      { name: '아침고요수목원', desc: '아름다운 정원 산책' },
    ],
  },
  {
    id: 'paju', name: '파주 임진강·헤이리', region: '수도권', area: '파주',
    themes: ['카페', '자연·힐링', '데이트'], seasons: ['봄', '여름', '가을', '겨울'], emoji: '🎨',
    summary: '예술마을과 강변 전망이 어우러진 코스.',
    duration: '반나절', distance: '약 25km',
    stops: [
      { name: '헤이리 예술마을', desc: '갤러리·카페 골목' },
      { name: '파주 프로방스마을', desc: '알록달록 유럽풍 거리' },
      { name: '임진각 평화누리', desc: '너른 언덕과 바람개비' },
    ],
  },
  {
    id: 'yeongjong', name: '인천 영종도 을왕리', region: '수도권', area: '인천',
    themes: ['바다', '노을', '카페'], seasons: ['봄', '여름', '가을'], emoji: '🌇',
    summary: '공항 옆 서해 노을 드라이브. 해질 무렵이 백미.',
    duration: '반나절', distance: '약 20km',
    stops: [
      { name: '구읍뱃터', desc: '회·조개구이 포장마차' },
      { name: '을왕리해수욕장', desc: '서해 낙조 명소' },
      { name: '마시안해변', desc: '갯벌 체험과 카페' },
    ],
  },
  {
    id: 'namhansanseong', name: '남한산성 순환 드라이브', region: '수도권', area: '경기 광주',
    themes: ['자연·힐링', '야경', '단풍·가을'], seasons: ['봄', '가을'], emoji: '🏰',
    summary: '성곽 따라 도는 숲길, 서울 근교 단풍·야경 명소.',
    duration: '반나절', distance: '약 15km',
    stops: [
      { name: '남한산성 남문', desc: '성곽 산책 시작점' },
      { name: '수어장대', desc: '숲과 전망' },
      { name: '남한산성 로터리', desc: '백숙 맛집 거리' },
    ],
  },
  {
    id: 'chuncheon', name: '춘천 호반 드라이브', region: '강원', area: '춘천',
    themes: ['자연·힐링', '데이트', '카페'], seasons: ['봄', '여름', '가을', '겨울'], emoji: '🚣',
    summary: '의암호를 도는 물의 도시. 닭갈비와 함께!',
    duration: '하루', distance: '약 25km',
    stops: [
      { name: '소양강 스카이워크', desc: '강 위를 걷는 전망대' },
      { name: '의암호 상상마당', desc: '호반 카페·전시' },
      { name: '김유정역', desc: '레일바이크와 감성 역사' },
    ],
  },
  {
    id: 'samcheok', name: '삼척 새천년 해안도로', region: '강원', area: '삼척',
    themes: ['바다'], seasons: ['봄', '여름', '가을'], emoji: '🌊',
    summary: '동해 절경 해안도로와 투명카누 어촌.',
    duration: '하루', distance: '약 30km',
    stops: [
      { name: '삼척해수욕장', desc: '넓은 백사장' },
      { name: '새천년해안도로', desc: '기암 절경 드라이브' },
      { name: '장호항', desc: '투명카누·케이블카' },
    ],
  },
  {
    id: 'yeongwol', name: '영월 동강 절경', region: '강원', area: '영월',
    themes: ['자연·힐링', '단풍·가을'], seasons: ['여름', '가을'], emoji: '🏞️',
    summary: '굽이치는 동강과 별빛 천문대 코스.',
    duration: '하루', distance: '약 35km',
    stops: [
      { name: '선돌', desc: '강 위로 솟은 절벽' },
      { name: '한반도지형', desc: '한반도 모양 물돌이' },
      { name: '별마로천문대', desc: '밤하늘 별 관측' },
    ],
  },
  {
    id: 'taebaek', name: '태백 매봉산 바람의언덕', region: '강원', area: '태백',
    themes: ['자연·힐링', '노을'], seasons: ['여름', '가을'], emoji: '🌬️',
    summary: '고랭지 배추밭과 풍력발전기 능선, 시원한 고원.',
    duration: '하루', distance: '약 30km',
    stops: [
      { name: '매봉산 바람의언덕', desc: '풍차와 배추밭 능선' },
      { name: '검룡소', desc: '한강 발원지 숲길' },
      { name: '추전역', desc: '국내 최고지대 기차역' },
    ],
  },
  {
    id: 'boryeong', name: '보령 대천·무창포', region: '충청', area: '보령',
    themes: ['바다', '노을'], seasons: ['여름'], emoji: '🏖️',
    summary: '서해 대표 해변과 신비의 바닷길.',
    duration: '하루', distance: '약 25km',
    stops: [
      { name: '대천해수욕장', desc: '머드축제로 유명한 해변' },
      { name: '무창포해수욕장', desc: '갈라지는 신비의 바닷길' },
      { name: '죽도 상화원', desc: '섬 정원 산책' },
    ],
  },
  {
    id: 'jecheon', name: '제천 청풍호 드라이브', region: '충청', area: '제천',
    themes: ['자연·힐링', '데이트'], seasons: ['봄', '가을'], emoji: '🚠',
    summary: '호수 위 케이블카와 모노레일이 있는 절경.',
    duration: '하루', distance: '약 25km',
    stops: [
      { name: '청풍호 케이블카', desc: '호수와 산 파노라마' },
      { name: '비봉산 전망대', desc: '360도 호반 뷰' },
      { name: '청풍문화재단지', desc: '호반 옛 건축 산책' },
    ],
  },
  {
    id: 'seocheon', name: '서천 춘장대·마량', region: '충청', area: '서천',
    themes: ['바다', '노을', '자연·힐링'], seasons: ['봄', '여름', '가을'], emoji: '🌅',
    summary: '동백숲과 서해 낙조가 어우러진 코스.',
    duration: '하루', distance: '약 20km',
    stops: [
      { name: '춘장대해수욕장', desc: '솔숲과 완만한 백사장' },
      { name: '마량리 동백나무숲', desc: '바다 위 동백 군락' },
      { name: '홍원항', desc: '전어·주꾸미 항구' },
    ],
  },
  {
    id: 'gunsan', name: '군산 고군산군도', region: '전라', area: '군산',
    themes: ['바다', '카페'], seasons: ['봄', '여름', '가을', '겨울'], emoji: '🌉',
    summary: '섬과 섬을 잇는 다리를 달리는 바닷길.',
    duration: '하루', distance: '약 40km',
    stops: [
      { name: '새만금방조제', desc: '바다를 가르는 33km 방조제' },
      { name: '신시도', desc: '섬 전망 포인트' },
      { name: '선유도', desc: '고운 모래와 섬 카페' },
    ],
  },
  {
    id: 'cheongsando', name: '완도 청산도 슬로길', region: '전라', area: '완도',
    themes: ['자연·힐링', '바다'], seasons: ['봄'], emoji: '🚢',
    summary: '배로 건너 느리게 도는 슬로시티 섬 (봄 유채가 절정).',
    duration: '하루', distance: '약 20km',
    stops: [
      { name: '완도항', desc: '청산도행 여객선 승선' },
      { name: '청산도 서편제길', desc: '돌담과 유채꽃 언덕' },
      { name: '청산도 범바위', desc: '바다 절벽 전망' },
    ],
  },
  {
    id: 'namwon', name: '남원 지리산 정령치', region: '전라', area: '남원',
    themes: ['단풍·가을', '자연·힐링'], seasons: ['가을'], emoji: '🍁',
    summary: '지리산 고갯길을 오르는 단풍 드라이브.',
    duration: '하루', distance: '약 40km',
    stops: [
      { name: '뱀사골', desc: '맑은 계곡 단풍' },
      { name: '정령치 전망대', desc: '지리산 능선 파노라마' },
      { name: '광한루원', desc: '춘향전의 무대 정원' },
    ],
  },
  {
    id: 'jinan', name: '진안 마이산 벚꽃길', region: '전라', area: '진안',
    themes: ['자연·힐링'], seasons: ['봄', '가을'], emoji: '⛰️',
    summary: '말 귀 모양 봉우리와 벚꽃 터널.',
    duration: '반나절', distance: '약 15km',
    stops: [
      { name: '마이산 탑사', desc: '돌탑 군락과 봉우리' },
      { name: '은수사', desc: '고즈넉한 산사' },
      { name: '마이산 벚꽃길', desc: '봄엔 벚꽃 터널' },
    ],
  },
  {
    id: 'pohang', name: '포항 호미곶·영일대', region: '경상', area: '포항',
    themes: ['바다', '야경'], seasons: ['봄', '여름', '가을', '겨울'], emoji: '🌅',
    summary: '일출 명소와 해상누각 야경을 잇는 코스.',
    duration: '하루', distance: '약 35km',
    stops: [
      { name: '호미곶 상생의손', desc: '일출 명소 손 조형물' },
      { name: '구룡포 근대문화거리', desc: '옛 항구 골목' },
      { name: '영일대해수욕장', desc: '해상누각과 야경' },
    ],
  },
  {
    id: 'andong', name: '안동 월영교·하회마을', region: '경상', area: '안동',
    themes: ['자연·힐링', '야경', '데이트'], seasons: ['봄', '가을'], emoji: '🏯',
    summary: '전통과 강, 달빛 다리가 어우러진 코스.',
    duration: '하루', distance: '약 25km',
    stops: [
      { name: '하회마을', desc: '강이 감싸는 전통마을' },
      { name: '부용대', desc: '하회마을 조망 절벽' },
      { name: '월영교', desc: '밤에 빛나는 나무 다리' },
    ],
  },
  {
    id: 'namhae', name: '남해 다랭이·독일마을', region: '경상', area: '남해',
    themes: ['바다', '노을', '자연·힐링'], seasons: ['봄', '여름', '가을'], emoji: '🏘️',
    summary: '계단식 논과 이국적 마을, 남해 바다 드라이브.',
    duration: '하루', distance: '약 40km',
    stops: [
      { name: '가천 다랭이마을', desc: '바다로 이어진 계단식 논' },
      { name: '남해 독일마을', desc: '독일풍 언덕 마을' },
      { name: '상주은모래비치', desc: '고운 모래 해변' },
    ],
  },
  {
    id: 'miryang', name: '밀양 얼음골·표충사', region: '경상', area: '밀양',
    themes: ['자연·힐링', '단풍·가을'], seasons: ['여름', '가을'], emoji: '🍃',
    summary: '한여름에도 시원한 얼음골 계곡 코스.',
    duration: '하루', distance: '약 30km',
    stops: [
      { name: '밀양 얼음골', desc: '한여름 얼음 어는 계곡' },
      { name: '표충사', desc: '단풍 아름다운 산사' },
      { name: '위양지', desc: '못가에 비친 이팝나무' },
    ],
  },
  {
    id: 'jeju-south', name: '제주 남부 서귀포 해안', region: '제주', area: '제주 남부',
    themes: ['바다', '자연·힐링'], seasons: ['봄', '여름', '가을', '겨울'], emoji: '🌊',
    summary: '폭포와 주상절리, 서귀포 해안 절경.',
    duration: '하루', distance: '약 25km',
    stops: [
      { name: '쇠소깍', desc: '카약 타는 에메랄드 물길' },
      { name: '정방폭포', desc: '바다로 직접 떨어지는 폭포' },
      { name: '대포주상절리', desc: '육각 기둥 해안 절벽' },
    ],
  },
  {
    id: 'udo', name: '우도 섬 드라이브', region: '제주', area: '제주 우도',
    themes: ['바다', '카페', '데이트'], seasons: ['봄', '여름', '가을', '겨울'], emoji: '🛵',
    summary: '배로 건너 도는 작은 섬 (차량 반입 제한, 전기차·스쿠터 추천).',
    duration: '반나절', distance: '약 17km',
    stops: [
      { name: '우도봉', desc: '섬과 바다 파노라마' },
      { name: '하고수동해변', desc: '옥빛 바다와 카페' },
      { name: '검멀레해변', desc: '검은 모래와 동굴' },
    ],
  },
  {
    id: 'namyangju-bukhan', name: '남양주 북한강 드라이브', region: '수도권', area: '남양주',
    themes: ['자연·힐링', '카페', '데이트'], seasons: ['봄', '여름', '가을'], emoji: '🌿',
    summary: '북한강을 따라 달리는 물안개·카페 코스. 서울 근교 최고의 강변 드라이브예요.',
    duration: '반나절~하루', distance: '약 25km',
    stops: [
      { name: '물의정원', desc: '강변 꽃밭과 산책로' },
      { name: '다산생태공원', desc: '정약용 유적과 강변길' },
      { name: '북한강로 카페거리', desc: '강뷰 대형 카페' },
    ],
  },
  {
    id: 'pocheon', name: '포천 산정호수·허브아일랜드', region: '수도권', area: '포천',
    themes: ['자연·힐링', '야경', '데이트'], seasons: ['봄', '여름', '가을', '겨울'], emoji: '💡',
    summary: '낮엔 호수 산책, 밤엔 불빛정원. 사계절 데이트 코스.',
    duration: '하루', distance: '약 30km',
    stops: [
      { name: '산정호수', desc: '둘레길과 오리배' },
      { name: '허브아일랜드', desc: '밤엔 불빛동화축제' },
      { name: '비둘기낭폭포', desc: '주상절리 협곡 폭포' },
    ],
  },
  {
    id: 'gimpo', name: '김포 대명항·평화누리', region: '수도권', area: '김포',
    themes: ['바다', '자연·힐링'], seasons: ['봄', '여름', '가을'], emoji: '⚓',
    summary: '서해 포구와 강화 초입, 강 건너 북녘이 보이는 코스.',
    duration: '반나절', distance: '약 25km',
    stops: [
      { name: '대명항', desc: '수산시장과 함상공원' },
      { name: '덕포진', desc: '바다 방어 유적과 노을' },
      { name: '애기봉 평화생태공원', desc: '한강하구 전망대' },
    ],
  },
  {
    id: 'songdo', name: '인천 송도 센트럴파크 야경', region: '수도권', area: '인천 송도',
    themes: ['야경', '데이트', '카페'], seasons: ['봄', '여름', '가을', '겨울'], emoji: '🌆',
    summary: '고층 빌딩과 수로가 어우러진 도심 야경 드라이브.',
    duration: '반나절', distance: '약 12km',
    stops: [
      { name: '송도 센트럴파크', desc: '수로와 빌딩 숲 야경' },
      { name: '트라이볼', desc: '독특한 건축물 포토존' },
      { name: '송도달빛축제공원', desc: '넓은 잔디와 야경' },
    ],
  },
  {
    id: 'hwaseong', name: '화성 제부도·서해 바닷길', region: '수도권', area: '화성',
    themes: ['바다', '노을', '데이트'], seasons: ['봄', '여름', '가을'], emoji: '🌊',
    summary: '하루 두 번 열리는 바닷길과 서해 낙조. 물때를 미리 확인하고 출발하세요.',
    duration: '하루', distance: '약 30km',
    stops: [
      { name: '제부도', desc: '갈라지는 모세의 기적 바닷길' },
      { name: '전곡항', desc: '요트가 있는 마리나 항구' },
      { name: '궁평항', desc: '낙조전망대와 서해 노을' },
    ],
  },
  {
    id: 'daebudo', name: '안산 대부도·시화나래', region: '수도권', area: '안산',
    themes: ['바다', '노을', '야경'], seasons: ['봄', '여름', '가을', '겨울'], emoji: '🌉',
    summary: '섬 아닌 섬 대부도와 조력발전소 달빛 전망 코스.',
    duration: '하루', distance: '약 35km',
    stops: [
      { name: '시화나래 달전망대', desc: '조력발전소와 바다 전망' },
      { name: '대부도 바다향기수목원', desc: '해안 정원 산책' },
      { name: '탄도항 누에섬', desc: '등대 전망대와 낙조' },
    ],
  },
  {
    id: 'yeoju', name: '여주 남한강·강천섬', region: '수도권', area: '여주',
    themes: ['자연·힐링', '데이트', '단풍·가을'], seasons: ['봄', '가을'], emoji: '🍂',
    summary: '남한강변 은행나무길과 천년 고찰을 잇는 코스.',
    duration: '하루', distance: '약 25km',
    stops: [
      { name: '신륵사', desc: '강변에 자리한 사찰' },
      { name: '강천섬', desc: '가을 은행나무길로 유명' },
      { name: '명성황후 생가', desc: '고즈넉한 한옥과 정원' },
    ],
  },
  {
    id: 'icheon', name: '이천 도예촌·설봉', region: '수도권', area: '이천',
    themes: ['카페', '자연·힐링', '데이트'], seasons: ['봄', '여름', '가을'], emoji: '🏺',
    summary: '도자기 마을과 호수 공원, 감성 카페 코스.',
    duration: '반나절~하루', distance: '약 15km',
    stops: [
      { name: '설봉공원', desc: '호수와 조각·산책로' },
      { name: '이천 예스파크', desc: '도자예술마을·공방 카페' },
      { name: '안흥지 애련정', desc: '연못과 정자, 야경도 예쁨' },
    ],
  },
  {
    id: 'yongin', name: '용인 식물원·휴양림', region: '수도권', area: '용인',
    themes: ['자연·힐링', '데이트'], seasons: ['봄', '여름', '가을'], emoji: '🌷',
    summary: '수목원과 휴양림으로 초록 힐링 드라이브.',
    duration: '하루', distance: '약 30km',
    stops: [
      { name: '한택식물원', desc: '국내 최대 규모 식물원' },
      { name: '용인농촌테마파크', desc: '꽃밭과 체험 정원' },
      { name: '용인자연휴양림', desc: '숲속 산책과 전망' },
    ],
  },
  {
    id: 'anseong', name: '안성 팜랜드·서일농원', region: '수도권', area: '안성',
    themes: ['자연·힐링', '데이트'], seasons: ['봄', '여름', '가을'], emoji: '🐑',
    summary: '드넓은 목장과 장독대 정원, 목가적인 코스.',
    duration: '하루', distance: '약 25km',
    stops: [
      { name: '안성팜랜드', desc: '넓은 초지와 동물 체험' },
      { name: '서일농원', desc: '수천 개 장독대와 솔숲' },
      { name: '미리내성지', desc: '고요한 성지와 단풍길' },
    ],
  },
  {
    id: 'yeoncheon', name: '연천 한탄강·재인폭포', region: '수도권', area: '연천',
    themes: ['자연·힐링', '단풍·가을'], seasons: ['여름', '가을'], emoji: '🏞️',
    summary: '주상절리 협곡과 절벽 폭포, 유네스코 지질공원.',
    duration: '하루', distance: '약 35km',
    stops: [
      { name: '재인폭포', desc: '현무암 절벽 폭포' },
      { name: '한탄강 주상절리길', desc: '절벽에 매달린 잔도' },
      { name: '임진강 옥녀봉', desc: '강 굽이가 보이는 전망' },
    ],
  },
  {
    id: 'paju-lake', name: '파주 마장호수·감악산', region: '수도권', area: '파주',
    themes: ['자연·힐링', '데이트'], seasons: ['봄', '여름', '가을'], emoji: '🌉',
    summary: '호수와 산의 출렁다리를 잇는 스릴 코스.',
    duration: '하루', distance: '약 30km',
    stops: [
      { name: '마장호수 출렁다리', desc: '호수를 가르는 흔들다리' },
      { name: '감악산 출렁다리', desc: '산 계곡 위 아찔한 다리' },
      { name: '벽초지수목원', desc: '아기자기한 테마 정원' },
    ],
  },
  {
    id: 'gapyeong-cheongpyeong', name: '가평 청평호반·쁘띠프랑스', region: '수도권', area: '가평',
    themes: ['데이트', '자연·힐링'], seasons: ['봄', '여름', '가을', '겨울'], emoji: '🎠',
    summary: '동화 같은 마을과 하늘 호수를 도는 데이트 코스.',
    duration: '하루', distance: '약 25km',
    stops: [
      { name: '쁘띠프랑스', desc: '유럽 동화풍 마을' },
      { name: '청평호반', desc: '호수를 따라 달리는 길' },
      { name: '호명호수', desc: '산 위 하늘 호수 정원' },
    ],
  },
  {
    id: 'muuido', name: '인천 무의도 바다', region: '수도권', area: '인천',
    themes: ['바다', '자연·힐링'], seasons: ['봄', '여름', '가을'], emoji: '🏝️',
    summary: '다리로 건너는 섬, 해변과 해상 둘레길.',
    duration: '하루', distance: '약 20km',
    stops: [
      { name: '하나개해변', desc: '넓은 갯벌과 낙조' },
      { name: '무의바다누리길', desc: '절벽을 잇는 해상 데크길' },
      { name: '광명항', desc: '작은 포구에서 해산물' },
    ],
  },
  {
    id: 'pocheon-art', name: '포천 광릉숲·아트밸리', region: '수도권', area: '포천',
    themes: ['자연·힐링', '단풍·가을'], seasons: ['봄', '여름', '가을'], emoji: '🌲',
    summary: '유네스코 광릉숲과 폐채석장 예술공간을 잇는 코스.',
    duration: '하루', distance: '약 30km',
    stops: [
      { name: '국립수목원(광릉숲)', desc: '울창한 원시림 산책' },
      { name: '봉선사', desc: '연꽃과 단풍의 고찰' },
      { name: '포천아트밸리', desc: '폐채석장 호수와 예술' },
    ],
  },
  {
    id: 'siheung', name: '시흥 오이도·갯골', region: '수도권', area: '시흥',
    themes: ['바다', '노을', '자연·힐링'], seasons: ['봄', '여름', '가을'], emoji: '🦀',
    summary: '빨간등대와 갯벌 노을, 도심 속 습지 코스.',
    duration: '반나절', distance: '약 20km',
    stops: [
      { name: '오이도 빨간등대', desc: '서해 노을 명소' },
      { name: '시흥갯골생태공원', desc: '갈대밭과 흔들전망대' },
      { name: '월곶포구', desc: '해산물과 바다 산책' },
    ],
  },
]
