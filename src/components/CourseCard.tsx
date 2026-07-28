import {
  kakaoSearchUrl,
  naverSearchUrl,
  tmapRouteUrl,
  COURSE_COORD,
  THEME_GRADIENT,
  type Course,
} from '../lib/courses'

export default function CourseCard({ course }: { course: Course }) {
  const last = course.stops[course.stops.length - 1]
  const coord = COURSE_COORD[course.id]
  return (
    <article className="course">
      <div className="course-hero" style={{ background: THEME_GRADIENT[course.themes[0]] }}>
        <span className="course-emoji">{course.emoji}</span>
        <div className="course-hero-text">
          <h2 className="course-name">{course.name}</h2>
          <div className="course-area">📍 {course.region} · {course.area}</div>
        </div>
      </div>

      <div className="course-body">
        <div className="course-tags">
          {course.themes.map((t) => (
            <span className="tag tag-theme" key={t}>{t}</span>
          ))}
          {course.seasons.map((s) => (
            <span className="tag tag-season" key={s}>{s}</span>
          ))}
        </div>

        <p className="course-summary">{course.summary}</p>

        <div className="course-meta">
          <span>🕒 {course.duration}</span>
          <span>🚗 {course.distance}</span>
        </div>

        <ol className="stops">
          {course.stops.map((s, i) => (
            <li className="stop" key={s.name}>
              <a className="stop-link" href={kakaoSearchUrl(s.name)} target="_blank" rel="noreferrer">
                <span className="stop-num">{i + 1}</span>
                <span className="stop-body">
                  <b className="stop-name">{s.name}</b>
                  <span className="stop-desc">{s.desc}</span>
                </span>
                <span className="stop-map">지도 ›</span>
              </a>
            </li>
          ))}
        </ol>

        <div className="nearby">
          <a className="nearby-btn food" href={kakaoSearchUrl(`${course.area} 맛집`)} target="_blank" rel="noreferrer">🍽️ 주변 맛집</a>
          <a className="nearby-btn cafe" href={kakaoSearchUrl(`${course.area} 카페`)} target="_blank" rel="noreferrer">☕ 주변 카페</a>
        </div>

        <div className="route-btns">
          <a className="route-btn kakao" href={kakaoSearchUrl(last.name)} target="_blank" rel="noreferrer">카카오맵</a>
          <a className="route-btn naver" href={naverSearchUrl(last.name)} target="_blank" rel="noreferrer">네이버지도</a>
          {coord && (
            <a className="route-btn tmap" href={tmapRouteUrl(last.name, coord.lat, coord.lng)}>티맵 길찾기</a>
          )}
        </div>
        <p className="route-hint">🗺️ 목적지(마지막 경유지) 기준 · 티맵은 모바일 앱에서 열려요</p>
      </div>
    </article>
  )
}
