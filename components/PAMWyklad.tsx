'use client'

import { useState } from 'react'
import { BookOpen, TrendingUp, CheckCircle, AlertCircle, Calendar } from 'lucide-react'
import {
  calculatePercentageGrade,
  DEFAULT_EXAM_THRESHOLDS,
  isGradePassed,
} from '@/utils/calculations'

interface PAMWykladProps {
  onEgzaminCalculated?: (grade: number | null) => void
}

export default function PAMWyklad({ onEgzaminCalculated }: PAMWykladProps) {
  const [egzaminProcent, setEgzaminProcent] = useState<number>(60)

  // przeliczenie % na ocenę
  const ocena = calculatePercentageGrade(egzaminProcent, DEFAULT_EXAM_THRESHOLDS)
  const czyZaliczone = isGradePassed(ocena)

  // przekazujemy ocenę do rodzica
  if (onEgzaminCalculated && ocena !== (onEgzaminCalculated as any).lastValue) {
    (onEgzaminCalculated as any).lastValue = ocena
    onEgzaminCalculated(ocena)
  }

  return (
    <div className="space-y-6">
      {/* info o egzaminie */}
      <div className="neo-card bg-blue-50">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Informacje o egzaminie
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Sesja zimowa:</strong> 31.01.2025 - 8.02.2025</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Sesja poprawkowa:</strong> 9-15 lutego 2026</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>Zadania teoretyczne + praktyczne (razem)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span className="font-bold text-red-600">Wymagane zaliczenie ćwiczeń aby przystąpić!</span>
          </li>
        </ul>
      </div>

      {/* egzamin */}
      <div className="neo-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Egzamin
        </h2>
        <p className="text-sm mb-4 bg-gray-100 p-3 border-2 border-black">
          Warunek zdania: minimum 50% punktów ze wszystkich zadań (teoretycznych + praktycznych).
        </p>

        <div className="mb-4">
          <label className="block font-bold mb-2">Wynik egzaminu (%):</label>
          <input
            type="number"
            value={egzaminProcent}
            onChange={(e) => setEgzaminProcent(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
            className="neo-input w-full md:w-64"
            min="0"
            max="100"
            step="1"
          />
        </div>

        <div className="p-4 bg-blue-100 border-4 border-black">
          {ocena === null ? (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <p className="font-bold">Niezaliczony - mniej niż 50%!</p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-2xl">{ocena.toFixed(1)}</p>
              <p className="text-sm mt-1">Ocena z egzaminu</p>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border-2 border-black text-sm">
          <p className="font-bold mb-1">Skala ocen:</p>
          <ul className="space-y-1">
            <li>• 90-100% → 5.0 (bardzo dobry)</li>
            <li>• 80-90% → 4.5 (+dobry)</li>
            <li>• 70-80% → 4.0 (dobry)</li>
            <li>• 60-70% → 3.5 (+dostateczny)</li>
            <li>• 50-60% → 3.0 (dostateczny)</li>
            <li>• &lt;50% → niezaliczony</li>
          </ul>
        </div>
      </div>

      {/* wynik */}
      <div className="neo-card bg-pink-100">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Wynik egzaminu
        </h2>

        {ocena === null ? (
          <div className="p-6 bg-red-200 border-4 border-black">
            <p className="text-2xl font-black text-red-700 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              NIEZALICZONY
            </p>
            <p className="mt-2">Mniej niż 50% punktów z egzaminu.</p>
            <p className="mt-1 text-sm">Możliwość poprawy: 9-15 lutego 2026.</p>
          </div>
        ) : (
          <div className={`p-6 border-4 border-black ${czyZaliczone ? 'bg-green-200' : 'bg-red-200'}`}>
            <p className="text-5xl font-black">{ocena.toFixed(1)}</p>
            <p className="text-lg mt-2">PAM - Egzamin</p>

            {czyZaliczone && (
              <div className="mt-4 flex items-center gap-2 text-green-700">
                <CheckCircle className="w-6 h-6" />
                <p className="font-bold">ZALICZONY!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* przypomnienie */}
      <div className="neo-card bg-orange-100">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Ważne!
        </h3>
        <p className="text-sm">
          <strong>Ocena końcowa</strong> z Podstaw Analizy Matematycznej = <strong>średnia arytmetyczna</strong> oceny z ćwiczeń i oceny z egzaminu.
        </p>
        <p className="text-sm mt-2">
          Sprawdź zakładkę <strong>Podsumowanie</strong>, aby zobaczyć ocenę końcową!
        </p>
      </div>
    </div>
  )
}
