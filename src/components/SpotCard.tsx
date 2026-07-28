import {
  kakaoRouteUrl,
  naverSearchUrl,
  tmapRouteUrl,
  kakaoSearchUrl,
} from '../lib/courses'
import type { Spot } from '../data/spots'

export default function SpotCard({ spot }: { spot: Spot }) {
  return (
    <article className="spot">
      <div className="spot-photo">
        <img src={spot.image} alt={spot.title} loading="lazy" />
        <span className="spot-cat">{spot.cat}</span>
      </div>

      <div className="spot-body">
        <h3 className="spot-title">{spot.title}</h3>
        <div className="spot-area">📍 {spot.area}</div>

        <div className="nearby">
          <a className="nearby-btn food" href={kakaoSearchUrl(`${spot.area} 맛집`)} target="_blank" rel="noreferrer">🍽️ 주변 맛집</a>
          <a className="nearby-btn cafe" href={kakaoSearchUrl(`${spot.area} 카페`)} target="_blank" rel="noreferrer">☕ 주변 카페</a>
        </div>

        <div className="route-btns">
          <a className="route-btn kakao" href={kakaoRouteUrl(spot.title, spot.lat, spot.lng)} target="_blank" rel="noreferrer">카카오맵</a>
          <a className="route-btn naver" href={naverSearchUrl(`${spot.area} ${spot.title}`)} target="_blank" rel="noreferrer">네이버지도</a>
          <a className="route-btn tmap" href={tmapRouteUrl(spot.title, spot.lat, spot.lng)}>티맵 길찾기</a>
        </div>
        <p className="route-hint">🗺️ 정확한 위치 좌표 기준 · 티맵은 모바일 앱에서 열려요</p>
      </div>
    </article>
  )
}
