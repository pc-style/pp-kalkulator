'use client'

import { useState } from 'react'
import { BookOpen, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react'
import {
  calculateKolokwiumGrade,
  DEFAULT_KOLOKWIUM_THRESHOLDS,
  isGradePassed,
} from '@/utils/calculations'

export default function AlgebraWyklad() {
  const [kolokwiumPunkty, setKolokwiumPunkty] = useState<number>(10)

  // przeliczenie punktów na ocenę (wykład - tylko kolokwium)
  const ocena = calculateKolokwiumGrade(kolokwiumPunkty, 10, DEFAULT_KOLOKWIUM_THRESHOLDS)
  const czyZaliczone = isGradePassed(ocena)

  return (
    <div className="space-y-6">
      {/* info o wykładzie */}
      <div className="neo-card bg-blue-50">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Informacje o zaliczeniu wykładu
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>Kolokwium zaliczeniowe w grudniu (cały materiał z wykładów)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>Kolokwium poprawkowe w styczniu</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>Quizy NIE wpływają na ocenę końcową</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span className="font-bold text-green-700">Liczy się TYLKO kolokwium!</span>
          </li>
        </ul>
      </div>

      {/* kolokwium */}
      <div className="neo-card">
        <h2 className="text-2xl font-bold mb-4">Kolokwium zaliczeniowe</h2>
        <p className="text-sm mb-4 bg-gray-100 p-3 border-2 border-black">
          Maksymalnie 20 punktów. Minimum 10 punktów na zaliczenie.
        </p>

        <div className="mb-4">
          <label className="block font-bold mb-2">Punkty z kolokwium (0-20):</label>
          <input
            type="number"
            value={kolokwiumPunkty}
            onChange={(e) => setKolokwiumPunkty(Math.max(0, Math.min(20, parseInt(e.target.value) || 0)))}
            className="neo-input w-full md:w-64"
            min="0"
            max="20"
          />
        </div>

        <div className="p-4 bg-blue-100 border-4 border-black">
          {ocena === null ? (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <p className="font-bold">Niezaliczone - mniej niż 10 pkt!</p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-2xl">{ocena.toFixed(1)}</p>
              <p className="text-sm mt-1">Ocena z wykładu</p>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border-2 border-black text-sm">
          <p className="font-bold mb-1">Skala ocen:</p>
          <ul className="space-y-1">
            <li>• 18-20 pkt → 5.0</li>
            <li>• 16-17 pkt → 4.5</li>
            <li>• 14-15 pkt → 4.0</li>
            <li>• 12-13 pkt → 3.5</li>
            <li>• 10-11 pkt → 3.0</li>
            <li>• &lt;10 pkt → niezaliczone</li>
          </ul>
        </div>
      </div>

      {/* wynik końcowy */}
      <div className="neo-card bg-purple-100">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Ocena końcowa z wykładu
        </h2>

        {ocena === null ? (
          <div className="p-6 bg-red-200 border-4 border-black">
            <p className="text-2xl font-black text-red-700 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              NIEZALICZONE
            </p>
            <p className="mt-2">Mniej niż 10 punktów z kolokwium.</p>
            <p className="mt-1 text-sm">Możliwość poprawy w styczniu.</p>
          </div>
        ) : (
          <div className={`p-6 border-4 border-black ${czyZaliczone ? 'bg-green-200' : 'bg-red-200'}`}>
            <p className="text-5xl font-black">{ocena.toFixed(1)}</p>
            <p className="text-lg mt-2">Algebra - Wykład</p>

            {czyZaliczone && (
              <div className="mt-4 flex items-center gap-2 text-green-700">
                <CheckCircle className="w-6 h-6" />
                <p className="font-bold">ZALICZONE!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
