// 한국관광공사 TourAPI(KorService2) 데이터 수집 — 지역별 관광지(사진 있는 것만)
// 사용: node scripts/fetch-tour.mjs
import { readFileSync, writeFileSync } from 'node:fs'

function loadKey() {
  let key = process.env.TOUR_KEY
  try {
    const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    const m = env.match(/TOUR_KEY\s*=\s*(.+)/)
    if (m) key = m[1].trim().replace(/^["']|["']$/g, '')
  } catch {}
  return key
}
const KEY = loadKey()
if (!KEY) { console.error('❌ TOUR_KEY 없음'); process.exit(1) }

const BASE = 'https://apis.data.go.kr/B551011/KorService2'
const COMMON = `serviceKey=${encodeURIComponent(KEY)}&MobileOS=ETC&MobileApp=DriveCourse&_type=json`

// 지역 → 관광공사 areaCode
const REGION_AREAS = {
  수도권: [1, 2, 31],       // 서울, 인천, 경기
  강원: [32],
  충청: [3, 8, 33, 34],     // 대전, 세종, 충북, 충남
  전라: [5, 37, 38],        // 광주, 전북, 전남
  경상: [4, 6, 7, 35, 36],  // 대구, 부산, 울산, 경북, 경남
  제주: [39],
}

async function call(op, params) {
  const url = `${BASE}/${op}?${COMMON}&${params}`
  const res = await fetch(url)
  const text = await res.text()
  try { return JSON.parse(text) }
  catch { throw new Error(`파싱 실패(${res.status}): ${text.slice(0, 200)}`) }
}

async function fetchArea(areaCode, contentTypeId, rows) {
  const data = await call(
    'areaBasedList2',
    `numOfRows=${rows}&pageNo=1&arrange=O&areaCode=${areaCode}&contentTypeId=${contentTypeId}`,
  )
  const items = data?.response?.body?.items?.item ?? []
  return Array.isArray(items) ? items : [items]
}

const all = []
for (const [region, codes] of Object.entries(REGION_AREAS)) {
  for (const code of codes) {
    // contentTypeId 12=관광지, 25=여행코스
    const spots = await fetchArea(code, 12, 50)
    for (const it of spots) {
      if (!it.firstimage || !it.mapx || !it.mapy) continue
      all.push({
        id: it.contentid,
        title: it.title,
        region,
        addr: it.addr1 || '',
        lat: Number(it.mapy),
        lng: Number(it.mapx),
        image: it.firstimage,
        cat1: it.cat1, cat2: it.cat2, cat3: it.cat3,
        tel: it.tel || '',
      })
    }
    process.stdout.write(`  ${region}/area${code}: +${spots.length}\n`)
  }
}

// dedupe by id
const seen = new Set()
const uniq = all.filter((s) => (seen.has(s.id) ? false : seen.add(s.id)))

writeFileSync(new URL('../scripts/spots-raw.json', import.meta.url), JSON.stringify(uniq, null, 2))

// ── 앱용 형태로 변환 ──
const CAT2 = {
  A0101: '자연', A0102: '자연',
  A0201: '역사·유적', A0202: '공원·휴양', A0203: '체험', A0204: '레포츠',
  A0205: '산업관광', A0206: '문화시설', A0207: '축제·행사', A0208: '공연·행사',
}
const SIDO = {
  서울특별시: '서울', 인천광역시: '인천', 경기도: '경기',
  강원특별자치도: '강원', 강원도: '강원',
  대전광역시: '대전', 세종특별자치시: '세종', 세종시: '세종', 충청북도: '충북', 충청남도: '충남',
  광주광역시: '광주', 전라북도: '전북', 전북특별자치도: '전북', 전라남도: '전남',
  대구광역시: '대구', 부산광역시: '부산', 울산광역시: '울산', 경상북도: '경북', 경상남도: '경남',
  제주특별자치도: '제주', 제주도: '제주',
}
function shortArea(addr) {
  const t = addr.split(/\s+/)
  const sido = SIDO[t[0]] || t[0] || ''
  return (sido + ' ' + (t[1] || '')).trim()
}

const spots = uniq.map((s) => ({
  id: s.id,
  title: s.title.trim(),
  region: s.region,
  area: shortArea(s.addr),
  addr: s.addr,
  lat: s.lat,
  lng: s.lng,
  image: s.image.replace(/^http:\/\//, 'https://'),
  cat: CAT2[s.cat2] || '관광지',
}))

const ts =
  `// 자동 생성 파일 — 한국관광공사 TourAPI(KorService2) 기반. 직접 수정 금지.\n` +
  `// 재생성: node scripts/fetch-tour.mjs\n` +
  `export interface Spot {\n` +
  `  id: string\n  title: string\n  region: string\n  area: string\n  addr: string\n` +
  `  lat: number\n  lng: number\n  image: string\n  cat: string\n}\n\n` +
  `export const SPOTS: Spot[] = ${JSON.stringify(spots, null, 0)}\n`

writeFileSync(new URL('../src/data/spots.ts', import.meta.url), ts)

console.log('\n=== 지역별 개수 (사진+좌표 있는 것만) ===')
const byRegion = {}
for (const s of spots) byRegion[s.region] = (byRegion[s.region] || 0) + 1
for (const [r, n] of Object.entries(byRegion)) console.log(`  ${r}: ${n}`)
console.log(`  총합: ${spots.length}`)
console.log('\n=== 카테고리 분포 ===')
const byCat = {}
for (const s of spots) byCat[s.cat] = (byCat[s.cat] || 0) + 1
for (const [c, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) console.log(`  ${c}: ${n}`)
console.log(`\n저장: scripts/spots-raw.json, src/data/spots.ts`)
