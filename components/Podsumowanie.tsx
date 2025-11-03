'use client'

import { Award, CheckCircle, XCircle, TrendingUp, AlertCircle } from 'lucide-react'

interface PodsumowanieProps {
  labGrade: number | null
  testGrade: number | null
  courseGrade: number | null
  finalGrade: number | null
}

export default function Podsumowanie({
  labGrade,
  testGrade,
  courseGrade,
  finalGrade,
}: PodsumowanieProps) {
  const isLabPassed = labGrade !== null && labGrade >= 3.0
  const isTestPassed = testGrade !== null && testGrade >= 3.0
  const isFinalPassed = finalGrade !== null && finalGrade >= 3.0

  const allPassed = isLabPassed && isTestPassed && isFinalPassed

  return (
    <div className="space-y-6">
      {/* ogólny status */}
      <div className={`neo-card ${allPassed ? 'bg-green-200' : 'bg-red-200'}`}>
        <h2 className="text-3xl font-black mb-4 flex items-center gap-3">
          <Award className="w-8 h-8" />
          Status zaliczenia
        </h2>

        {allPassed ? (
          <div className="flex items-center gap-3">
            <CheckCircle className="w-12 h-12 text-green-700" />
            <div>
              <p className="text-3xl font-black text-green-700">ZALICZONE!</p>
              <p className="text-lg mt-1">Gratulacje, masz przedmiot w kieszeni</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <XCircle className="w-12 h-12 text-red-700" />
            <div>
              <p className="text-3xl font-black text-red-700">NIEZALICZONE</p>
              <p className="text-lg mt-1">Zobacz szczegóły poniżej</p>
            </div>
          </div>
        )}
      </div>

      {/* szczegóły laboratoriów */}
      <div className="neo-card">
        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
          {isLabPassed ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600" />
          )}
          Laboratorium
        </h3>

        {labGrade === null ? (
          <div className="p-4 bg-gray-200 border-4 border-black">
            <p className="text-gray-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Brak danych – wypełnij zakładkę Laboratorium
            </p>
          </div>
        ) : (
          <div className={`p-4 border-4 border-black ${isLabPassed ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="text-4xl font-black">{labGrade.toFixed(2)}</p>
            <p className="text-sm mt-1">Ocena z laboratoriów (L)</p>
            {!isLabPassed && (
              <p className="text-red-600 font-bold mt-2">Ocena poniżej 3.0 – laboratorium niezaliczone</p>
            )}
          </div>
        )}
      </div>

      {/* szczegóły testu */}
      <div className="neo-card">
        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
          {isTestPassed ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600" />
          )}
          Test z wykładu
        </h3>

        {testGrade === null ? (
          <div className="p-4 bg-gray-200 border-4 border-black">
            <p className="text-gray-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Brak danych – wypełnij zakładkę Wykład
            </p>
          </div>
        ) : (
          <div className={`p-4 border-4 border-black ${isTestPassed ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="text-4xl font-black">{testGrade.toFixed(1)}</p>
            <p className="text-sm mt-1">Ocena z testu (Z)</p>
            {!isTestPassed && (
              <p className="text-red-600 font-bold mt-2">Test niezaliczony</p>
            )}
          </div>
        )}
      </div>

      {/* szczegóły oceny końcowej */}
      <div className="neo-card bg-yellow-100">
        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Award className="w-6 h-6" />
          Ocena końcowa z przedmiotu
        </h3>

        {finalGrade === null ? (
          <div className="p-4 bg-gray-200 border-4 border-black">
            <p className="text-gray-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Brak danych – wypełnij zakładki Laboratorium i Wykład
            </p>
          </div>
        ) : (
          <div>
            <div className={`p-6 border-4 border-black ${isFinalPassed ? 'bg-green-200' : 'bg-red-200'}`}>
              <p className="text-5xl font-black">{finalGrade.toFixed(2)}</p>
              <p className="text-lg mt-2">Podstawy Programowania (Ok)</p>
            </div>

            {courseGrade !== null && labGrade !== null && testGrade !== null && (
              <div className="mt-4 p-4 bg-white border-4 border-black">
                <p className="font-bold mb-2">Składowe oceny końcowej:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Test (Z): {testGrade.toFixed(1)}</li>
                  <li>• Kurs wykładowy (K): {courseGrade.toFixed(1)}</li>
                  <li>• Laboratorium (L): {labGrade.toFixed(2)}</li>
                </ul>
                <p className="text-xs mt-3 text-gray-600">
                  Ok = 0.6 × Z + 0.4 × (30×K + 45×L) / 75
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* wskazówki / tips */}
      {!allPassed && (
        <div className="neo-card bg-orange-100">
          <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Co można poprawić?
          </h3>

          <div className="space-y-3">
            {!isLabPassed && (
              <div className="p-3 bg-white border-2 border-black">
                <p className="font-bold">Laboratorium:</p>
                <ul className="text-sm mt-1 list-disc list-inside">
                  <li>Zwiększ aktywność na zajęciach (zgłaszaj więcej zadań)</li>
                  <li>Popraw wyniki z kolokwiów</li>
                  <li>Zadbaj o obecność</li>
                </ul>
              </div>
            )}

            {!isTestPassed && (
              <div className="p-3 bg-white border-2 border-black">
                <p className="font-bold">Test z wykładu:</p>
                <ul className="text-sm mt-1 list-disc list-inside">
                  <li>Powtórz materiał z wykładów</li>
                  <li>Przećwicz zadania testowe</li>
                  <li>Musisz zdobyć co najmniej 50% na teście</li>
                </ul>
              </div>
            )}

            {isLabPassed && isTestPassed && !isFinalPassed && (
              <div className="p-3 bg-white border-2 border-black">
                <p className="font-bold">Ocena końcowa:</p>
                <p className="text-sm mt-1">
                  Poszczególne komponenty są zaliczone, ale końcowa ocena wyszła poniżej 3.0.
                  Spróbuj poprawić wyniki z testu lub laboratorium.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
