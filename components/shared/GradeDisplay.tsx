// wspólny komponent do wyświetlania ocen
// ok state, green/red background, duża czcionka

import { CheckCircle, AlertCircle } from 'lucide-react'
import { isGradePassed } from '@/utils/calculations'

interface GradeDisplayProps {
  grade: number | null
  label?: string
  decimals?: number
  showStatus?: boolean
  passedBgColor?: string
  failedBgColor?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function GradeDisplay({
  grade,
  label,
  decimals = 1,
  showStatus = false,
  passedBgColor = 'bg-green-200',
  failedBgColor = 'bg-red-200',
  size = 'md',
}: GradeDisplayProps) {
  const passed = isGradePassed(grade)
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  }

  if (grade === null) {
    return (
      <div className={`p-6 border-4 border-black ${failedBgColor}`}>
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="w-6 h-6" />
          <p className="font-bold text-xl">Niezaliczone</p>
        </div>
        {label && <p className="text-sm mt-1">{label}</p>}
      </div>
    )
  }

  return (
    <div className={`p-6 border-4 border-black ${passed ? passedBgColor : failedBgColor}`}>
      <p className={`font-black ${sizeClasses[size]}`}>{grade.toFixed(decimals)}</p>
      {label && <p className={`${size === 'lg' ? 'text-lg' : 'text-sm'} mt-2`}>{label}</p>}
      {showStatus && (
        <div className={`mt-4 flex items-center gap-2 ${passed ? 'text-green-700' : 'text-red-700'}`}>
          {passed ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
          <p className="font-bold">{passed ? 'ZALICZONE!' : 'NIEZALICZONE'}</p>
        </div>
      )}
    </div>
  )
}
