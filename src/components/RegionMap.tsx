import { REGIONS, type Region } from '../lib/courses'

// 한국 지형에 대략 맞춘 그리드 배치
const CELL: Record<Region, string> = {
  수도권: 'gg',
  강원: 'gw',
  충청: 'cc',
  전라: 'jl',
  경상: 'gs',
  제주: 'jj',
}

interface Props {
  value: Region | '전체'
  onChange: (r: Region | '전체') => void
}

export default function RegionMap({ value, onChange }: Props) {
  return (
    <div className="rmap">
      <div className="rmap-board">
        {REGIONS.map((r) => (
          <button
            key={r}
            className={value === r ? 'rmap-tile active' : 'rmap-tile'}
            style={{ gridArea: CELL[r] }}
            onClick={() => onChange(r)}
          >
            {r}
          </button>
        ))}
      </div>
      <button
        className={value === '전체' ? 'rmap-all active' : 'rmap-all'}
        onClick={() => onChange('전체')}
      >
        🇰🇷 전국 전체 보기
      </button>
    </div>
  )
}
