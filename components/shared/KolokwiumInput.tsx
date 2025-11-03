// standardowy input do punktów z kolokwium + wyświetlanie oceny
// używa wspólnych funkcji z utils/calculations

import { Calculator, AlertCircle } from 'lucide-react'
import {
  calculateKolokwiumGrade,
  DEFAULT_KOLOKWIUM_THRESHOLDS,
  GradeThreshold,
  isGradePassed,
} from '@/utils/calculations'
import GradeDisplay from './GradeDisplay'

interface KolokwiumInputProps {
  points: number
  onChange: (points: number) => void
  maxPoints?: number
  minPassingPoints?: number
  thresholds?: GradeThreshold[]
  label?: string
  description?: string
  showScale?: boolean
}

export default function KolokwiumInput({
  points,
  onChange,
  maxPoints = 20,
  minPassingPoints = 10,
  thresholds = DEFAULT_KOLOKWIUM_THRESHOLDS,
  label = 'Punkty z kolokwium',
  description,
  showScale = true,
}: KolokwiumInputProps) {
  const grade = calculateKolokwiumGrade(points, minPassingPoints, thresholds)
  const passed = isGradePassed(grade)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    const clamped = Math.max(0, Math.min(maxPoints, value))
    onChange(clamped)
  }

  // generuj skalę ocen z progów
  const scaleItems = thresholds.map((t, i) => {
    const nextThreshold = thresholds[i + 1]
    const range = nextThreshold
      ? `${t.min}-${nextThreshold.min - 1}`
      : `${t.min}-${maxPoints}`
    return { range, grade: t.grade }
  })

  return (
    <div className="neo-card">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Calculator className="w-6 h-6" />
        Kolokwium
      </h2>
      
      {description && (
        <p className="text-sm mb-4 bg-gray-100 p-3 border-2 border-black">
          {description}
        </p>
      )}

      <div className="mb-4">
        <label className="block font-bold mb-2">
          {label} (0-{maxPoints}):
        </label>
        <input
          type="number"
          value={points}
          onChange={handleChange}
          className="neo-input w-full md:w-64"
          min="0"
          max={maxPoints}
          aria-label={`${label}, maksimum ${maxPoints} punktów`}
          aria-describedby={description ? 'kolokwium-description' : undefined}
        />
      </div>

      <div className="p-4 bg-blue-100 border-4 border-black">
        {grade === null ? (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" aria-hidden="true" />
            <p className="font-bold">Niezaliczone - mniej niż {minPassingPoints} pkt!</p>
          </div>
        ) : (
          <GradeDisplay grade={grade} label="Ocena bazowa z kolokwium" size="sm" />
        )}
      </div>

      {showScale && (
        <div className="mt-4 p-3 bg-yellow-50 border-2 border-black text-sm">
          <p className="font-bold mb-1">Skala ocen (z kolokwium):</p>
          <ul className="space-y-1" role="list">
            {scaleItems.map((item, idx) => (
              <li key={idx}>• {item.range} pkt → {item.grade.toFixed(1)}</li>
            ))}
            <li>• &lt;{minPassingPoints} pkt → niezaliczone</li>
          </ul>
        </div>
      )}
    </div>
  )
}
