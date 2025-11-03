'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Award, Calculator, AlertCircle, CheckCircle } from 'lucide-react'

interface WykladProps {
  labGradeFromTab?: number | null
  onGradesCalculated?: (testGrade: number | null, courseGrade: number, finalGrade: number | null) => void
}

export default function Wyklad({ labGradeFromTab, onGradesCalculated }: WykladProps) {
  const [testPercent, setTestPercent] = useState<number>(75)
  const [courseK, setCourseK] = useState<number>(3.5)
  const [labL, setLabL] = useState<number>(3.5)
  const [useLabFromTab, setUseLabFromTab] = useState<boolean>(false)

  // jak użytkownik chce użyć L z zakładki laboratorium
  useEffect(() => {
    if (useLabFromTab && labGradeFromTab !== null) {
      setLabL(labGradeFromTab)
    }
  }, [useLabFromTab, labGradeFromTab])

  // przeliczenie % testu na ocenę
  const calculateTestGrade = (percent: number): number | null => {
    if (percent < 50) return null // nie zda
    if (percent >= 95) return 5.0
    if (percent >= 85) return 4.5
    if (percent >= 75) return 4.0
    if (percent >= 65) return 3.5
    return 3.0
  }

  const testGrade = calculateTestGrade(testPercent)

  // końcowa ocena z całego PP
  const calculateFinalGrade = (): number | null => {
    if (testGrade === null) return null

    // wzór: Ok = 0.6 * Z + 0.4 * (30*K + 45*L) / 75
    const Z = testGrade
    const K = courseK
    const L = labL

    const finalGrade = 0.6 * Z + 0.4 * (30 * K + 45 * L) / 75
    return finalGrade
  }

  const finalGrade = calculateFinalGrade()

  // przekazujemy wyniki do rodzica
  useEffect(() => {
    if (onGradesCalculated) {
      onGradesCalculated(testGrade, courseK, finalGrade)
    }
  }, [testGrade, courseK, finalGrade, onGradesCalculated])

  return (
    <div className="space-y-6">
      {/* wynik testu */}
      <div className="neo-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Test końcowy z wykładu
        </h2>
        <div className="mb-4">
          <label className="block font-bold mb-2">Wynik testu (%):</label>
          <input
            type="number"
            value={testPercent}
            onChange={(e) => setTestPercent(parseFloat(e.target.value) || 0)}
            className="neo-input w-full md:w-64"
            min="0"
            max="100"
            step="1"
          />
        </div>

        <div className="p-4 bg-blue-100 border-4 border-black">
          {testGrade === null ? (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <p className="font-bold">Test niezaliczony (poniżej 50%)</p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-2xl">{testGrade.toFixed(1)}</p>
              <p className="text-sm mt-1">Ocena z testu (Z)</p>
            </div>
          )}
        </div>
      </div>

      {/* ocena z kursu wykładowego */}
      <div className="neo-card">
        <h2 className="text-2xl font-bold mb-4">Ocena z kursu wykładowego (K)</h2>
        <div className="mb-4">
          <label className="block font-bold mb-2">Ocena K (z moodle / wykład):</label>
          <input
            type="number"
            value={courseK}
            onChange={(e) => setCourseK(parseFloat(e.target.value) || 3.0)}
            className="neo-input w-full md:w-64"
            min="3.0"
            max="5.0"
            step="0.5"
          />
        </div>
        <p className="text-sm text-gray-600">
          Ocena wynikająca z udziału w wykładzie (aktywność na moodle, itp.)
        </p>
      </div>

      {/* ocena z laboratoriów */}
      <div className="neo-card">
        <h2 className="text-2xl font-bold mb-4">Ocena z laboratoriów (L)</h2>

        <div className="mb-4">
          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useLabFromTab}
              onChange={(e) => setUseLabFromTab(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="font-bold">Użyj oceny z zakładki Laboratorium</span>
          </label>

          {useLabFromTab && labGradeFromTab === null && (
            <p className="text-orange-600 text-sm mb-3">
              Brak oceny z zakładki Laboratorium – wypełnij dane w zakładce Laboratorium
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">
            {useLabFromTab ? 'Ocena L (z zakładki):' : 'Ocena L (ręcznie):'}
          </label>
          <input
            type="number"
            value={labL}
            onChange={(e) => setLabL(parseFloat(e.target.value) || 3.0)}
            className="neo-input w-full md:w-64"
            min="2.0"
            max="5.5"
            step="0.1"
            disabled={useLabFromTab && labGradeFromTab !== null}
          />
        </div>
      </div>

      {/* końcowa ocena z całego PP */}
      <div className="neo-card bg-yellow-100">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Award className="w-6 h-6" />
          Ocena końcowa z Podstaw Programowania
        </h2>

        {finalGrade === null ? (
          <div className="p-6 bg-red-200 border-4 border-black">
            <p className="text-2xl font-black text-red-700 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              BRAK ZALICZENIA
            </p>
            <p className="mt-2">Test z wykładu niezaliczony (poniżej 50%)</p>
          </div>
        ) : (
          <div>
            <div className="p-6 bg-green-200 border-4 border-black mb-4">
              <p className="text-5xl font-black">{finalGrade.toFixed(2)}</p>
              <p className="text-lg mt-2">Ocena końcowa (Ok)</p>
            </div>

            <div className="p-4 bg-white border-4 border-black">
              <p className="font-bold mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Szczegóły obliczeń:
              </p>
              <p className="text-sm mb-1">Wzór: Ok = 0.6 × Z + 0.4 × (30×K + 45×L) / 75</p>
              <p className="text-sm">Z (test) = {testGrade.toFixed(1)}</p>
              <p className="text-sm">K (kurs) = {courseK.toFixed(1)}</p>
              <p className="text-sm">L (lab) = {labL.toFixed(2)}</p>
              <p className="text-sm mt-2 font-bold">
                = 0.6 × {testGrade.toFixed(1)} + 0.4 × (30×{courseK.toFixed(1)} + 45×{labL.toFixed(2)}) / 75
              </p>
              <p className="text-sm font-bold">= {finalGrade.toFixed(2)}</p>
            </div>

            {finalGrade >= 4.5 && (
              <div className="mt-4 p-4 bg-green-300 border-4 border-black flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <p className="font-bold">Świetny wynik!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
