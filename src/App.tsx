import { useMemo, useState } from 'react'
import './App.css'
import CourseCard from './components/CourseCard'
import SpotCard from './components/SpotCard'
import RegionMap from './components/RegionMap'
import {
  COURSES,
  THEMES,
  SEASONS,
  type Region,
  type Theme,
  type Season,
} from './lib/courses'
import { SPOTS } from './data/spots'

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]
}

type Tab = 'course' | 'spot'
const PAGE = 24

// 스팟 카테고리 — 실제 데이터에 존재하는 것만, 많은 순
const SPOT_CATS = Object.entries(
  SPOTS.reduce<Record<string, number>>((m, s) => ((m[s.cat] = (m[s.cat] || 0) + 1), m), {}),
)
  .sort((a, b) => b[1] - a[1])
  .map(([c]) => c)

export default function App() {
  const [tab, setTab] = useState<Tab>('course')
  const [region, setRegion] = useState<Region | '전체'>('전체')
  const [themes, setThemes] = useState<Theme[]>([])
  const [seasons, setSeasons] = useState<Season[]>([])
  const [cats, setCats] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [visible, setVisible] = useState(PAGE)

  const resetPage = () => setVisible(PAGE)

  // 선택한 지역의 도시(시군구) 목록 — 명소 데이터 기준, 많은 순 [area, count]
  const regionCities = useMemo(() => {
    if (region === '전체') return [] as [string, number][]
    const m: Record<string, number> = {}
    for (const s of SPOTS) if (s.region === region) m[s.area] = (m[s.area] || 0) + 1
    return Object.entries(m).sort((a, b) => b[1] - a[1])
  }, [region])

  const changeRegion = (r: Region | '전체') => {
    setRegion(r)
    setCities([]) // 지역이 바뀌면 도시 선택 초기화
    resetPage()
  }

  const courses = useMemo(
    () =>
      COURSES.filter(
        (c) =>
          (region === '전체' || c.region === region) &&
          (themes.length === 0 || themes.some((t) => c.themes.includes(t))) &&
          (seasons.length === 0 || seasons.some((s) => c.seasons.includes(s))),
      ),
    [region, themes, seasons],
  )

  const spots = useMemo(
    () =>
      SPOTS.filter(
        (s) =>
          (region === '전체' || s.region === region) &&
          (cats.length === 0 || cats.includes(s.cat)) &&
          (cities.length === 0 || cities.includes(s.area)),
      ),
    [region, cats, cities],
  )

  return (
    <div className="app">
      <header className="hero">
        <h1 className="brand">🚗 오늘 어디로 달릴까</h1>
        <p className="tagline">지역·분위기·계절로 찾는 드라이브 코스 &amp; 명소</p>
      </header>

      <main className="container">
        <div className="tabs">
          <button
            className={tab === 'course' ? 'tab active' : 'tab'}
            onClick={() => setTab('course')}
          >
            🚗 추천 코스 <span className="tab-count">{COURSES.length}</span>
          </button>
          <button
            className={tab === 'spot' ? 'tab active' : 'tab'}
            onClick={() => {
              setTab('spot')
              resetPage()
            }}
          >
            📸 가볼만한 곳 <span className="tab-count">{SPOTS.length}</span>
          </button>
        </div>

        <section className="filters">
          <div className="filter-group">
            <span className="filter-label">지역 — 지도에서 눌러보세요</span>
            <RegionMap value={region} onChange={changeRegion} />
          </div>

          {/* 도시 세부 선택 — 명소 탭 + 특정 지역 선택 시 */}
          {tab === 'spot' && region !== '전체' && regionCities.length > 0 && (
            <div className="filter-group">
              <span className="filter-label">
                도시 <span className="filter-sub">— {region} 세부 지역</span>
                {cities.length > 0 && (
                  <button
                    className="clear-link"
                    onClick={() => {
                      setCities([])
                      resetPage()
                    }}
                  >
                    선택 지우기
                  </button>
                )}
              </span>
              <div className="chips city-chips">
                {regionCities.map(([area, count]) => (
                  <button
                    key={area}
                    className={cities.includes(area) ? 'chip active' : 'chip'}
                    onClick={() => {
                      setCities(toggle(cities, area))
                      resetPage()
                    }}
                  >
                    {area} <span className="chip-count">{count}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === 'course' ? (
            <>
              <div className="filter-group">
                <span className="filter-label">분위기</span>
                <div className="chips">
                  {THEMES.map((t) => (
                    <button
                      key={t}
                      className={themes.includes(t) ? 'chip active' : 'chip'}
                      onClick={() => setThemes(toggle(themes, t))}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <span className="filter-label">계절</span>
                <div className="chips">
                  {SEASONS.map((s) => (
                    <button
                      key={s}
                      className={seasons.includes(s) ? 'chip active' : 'chip'}
                      onClick={() => setSeasons(toggle(seasons, s))}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="filter-group">
              <span className="filter-label">카테고리</span>
              <div className="chips">
                {SPOT_CATS.map((c) => (
                  <button
                    key={c}
                    className={cats.includes(c) ? 'chip active' : 'chip'}
                    onClick={() => {
                      setCats(toggle(cats, c))
                      resetPage()
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {tab === 'course' ? (
          <>
            <div className="result-count">
              <b>{courses.length}</b>개 코스
            </div>
            {courses.length ? (
              <div className="course-list">
                {courses.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            ) : (
              <p className="empty">조건에 맞는 코스가 없어요. 필터를 조금 풀어보세요 🙂</p>
            )}
          </>
        ) : (
          <>
            <div className="result-count">
              <b>{spots.length}</b>개 명소
            </div>
            {spots.length ? (
              <>
                <div className="spot-list">
                  {spots.slice(0, visible).map((s) => (
                    <SpotCard key={s.id} spot={s} />
                  ))}
                </div>
                {visible < spots.length && (
                  <button className="more-btn" onClick={() => setVisible((v) => v + PAGE)}>
                    더 보기 ({spots.length - visible}개 남음)
                  </button>
                )}
              </>
            ) : (
              <p className="empty">조건에 맞는 명소가 없어요. 필터를 조금 풀어보세요 🙂</p>
            )}
          </>
        )}
      </main>

      <footer className="footer">
        🚗 오늘 어디로 달릴까 · 명소 정보 © 한국관광공사 TourAPI
      </footer>
    </div>
  )
}
