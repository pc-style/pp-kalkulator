// wspólny komponent do wyświetlania informacji w neobrutalism stylu
// niebieski/turkusowy background, lista lub tekst

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface InfoCardProps {
  icon?: LucideIcon
  title?: string
  children: ReactNode
  bgColor?: string
  items?: string[]
}

export default function InfoCard({
  icon: Icon,
  title,
  children,
  bgColor = 'bg-blue-50',
  items,
}: InfoCardProps) {
  return (
    <div className={`neo-card ${bgColor}`}>
      {title && (
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
          {title}
        </h3>
      )}
      {items && (
        <ul className="space-y-2 text-sm" role="list">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="font-bold" aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {!items && children}
    </div>
  )
}
