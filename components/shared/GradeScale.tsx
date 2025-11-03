// komponent do wyświetlania skali ocen
// żółte tło, lista progów

import { GradeThreshold } from '@/utils/calculations'

interface GradeScaleProps {
  thresholds: GradeThreshold[]
  maxValue: number
  minPassingValue: number
  unit?: string
  title?: string
}

export default function GradeScale({
  thresholds,
  maxValue,
  minPassingValue,
  unit = 'pkt',
  title = 'Skala ocen:',
}: GradeScaleProps) {
  // generuj elementy skali
  const scaleItems = thresholds.map((t, i) => {
    const nextThreshold = thresholds[i + 1]
    const range = nextThreshold
      ? `${t.min}-${nextThreshold.min - 1}`
      : `${t.min}-${maxValue}`
    return { range, grade: t.grade }
  })

  return (
    <div className="mt-4 p-3 bg-yellow-50 border-2 border-black text-sm">
      <p className="font-bold mb-1">{title}</p>
      <ul className="space-y-1" role="list">
        {scaleItems.map((item, idx) => (
          <li key={idx}>
            • {item.range} {unit} → {item.grade.toFixed(1)}
          </li>
        ))}
        <li>• &lt;{minPassingValue} {unit} → niezaliczone</li>
      </ul>
    </div>
  )
}
