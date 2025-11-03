// komponent do wyświetlania statusu zaliczenia/niezaliczenia
// zielony/czerwony background, ikony, duży tekst

import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface StatusCardProps {
  passed: boolean | null
  title: string
  message?: string
  icon?: 'check' | 'cross' | 'alert'
  size?: 'sm' | 'md' | 'lg'
}

export default function StatusCard({
  passed,
  title,
  message,
  icon,
  size = 'md',
}: StatusCardProps) {
  const bgColor = passed === null 
    ? 'bg-gray-200' 
    : passed 
      ? 'bg-green-200' 
      : 'bg-red-200'

  const textColor = passed === null
    ? 'text-gray-600'
    : passed
      ? 'text-green-700'
      : 'text-red-700'

  const IconComponent = icon === 'alert' 
    ? AlertCircle
    : passed 
      ? CheckCircle 
      : XCircle

  const iconSize = size === 'lg' ? 'w-12 h-12' : size === 'md' ? 'w-8 h-8' : 'w-6 h-6'
  const titleSize = size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-xl'

  return (
    <div className={`neo-card ${bgColor}`}>
      <h2 className={`${titleSize} font-black mb-4 flex items-center gap-3`}>
        <IconComponent className={iconSize} aria-hidden="true" />
        {title}
      </h2>
      {passed !== null && (
        <div className="flex items-center gap-3">
          <IconComponent className={`w-12 h-12 ${textColor}`} aria-hidden="true" />
          <div>
            <p className={`${titleSize} font-black ${textColor}`}>
              {passed ? 'ZALICZONE!' : 'NIEZALICZONE'}
            </p>
            {message && <p className="text-lg mt-1">{message}</p>}
          </div>
        </div>
      )}
      {passed === null && message && (
        <p className="text-lg">{message}</p>
      )}
    </div>
  )
}
