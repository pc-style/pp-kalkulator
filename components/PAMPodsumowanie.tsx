'use client'

import { Award, CheckCircle, XCircle, TrendingUp, AlertCircle, Calculator } from 'lucide-react'

interface PAMPodsumowanieProps {
  cwiczeniaGrade: number | null
  egzaminGrade: number | null
}

export default function PAMPodsumowanie({
  cwiczeniaGrade,
  egzaminGrade,
}: PAMPodsumowanieProps) {
  const isCwiczeniaZaliczone = cwiczeniaGrade !== null && cwiczeniaGrade >= 3.0
  const isEgzaminZaliczony = egzaminGrade !== null && egzaminGrade >= 3.0

  // ocena końcowa = średnia arytmetyczna
  const ocenaKoncowa = (cwiczeniaGrade !== null && egzaminGrade !== null)
    ? (cwiczeniaGrade + egzaminGrade) / 2
    : null

  const isFinalPassed = ocenaKoncowa !== null && ocenaKoncowa >= 3.0
  const allPassed = isCwiczeniaZaliczone && isEgzaminZaliczony && isFinalPassed

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
              <p className="text-lg mt-1">Gratulacje, PAM zaliczony</p>
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

      {/* szczegóły ćwiczeń */}
      <div className="neo-card">
        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
          {isCwiczeniaZaliczone ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600" />
          )}
          Ćwiczenia
        </h3>

        {cwiczeniaGrade === null ? (
          <div className="p-4 bg-gray-200 border-4 border-black">
            <p className="text-gray-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Brak danych – wypełnij zakładkę Ćwiczenia
            </p>
          </div>
        ) : (
          <div className={`p-4 border-4 border-black ${isCwiczeniaZaliczone ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="text-4xl font-black">{cwiczeniaGrade.toFixed(2)}</p>
            <p className="text-sm mt-1">Ocena z ćwiczeń</p>
            {!isCwiczeniaZaliczone && (
              <p className="text-red-600 font-bold mt-2">Ćwiczenia niezaliczone – nie możesz przystąpić do egzaminu!</p>
            )}
          </div>
        )}
      </div>

      {/* szczegóły egzaminu */}
      <div className="neo-card">
        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
          {isEgzaminZaliczony ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600" />
          )}
          Egzamin
        </h3>

        {egzaminGrade === null ? (
          <div className="p-4 bg-gray-200 border-4 border-black">
            <p className="text-gray-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Brak danych – wypełnij zakładkę Egzamin
            </p>
          </div>
        ) : (
          <div className={`p-4 border-4 border-black ${isEgzaminZaliczony ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="text-4xl font-black">{egzaminGrade.toFixed(1)}</p>
            <p className="text-sm mt-1">Ocena z egzaminu</p>
            {!isEgzaminZaliczony && (
              <p className="text-red-600 font-bold mt-2">Egzamin niezaliczony</p>
            )}
          </div>
        )}
      </div>

      {/* ocena końcowa */}
      <div className="neo-card bg-yellow-100">
        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Award className="w-6 h-6" />
          Ocena końcowa z przedmiotu
        </h3>

        {ocenaKoncowa === null ? (
          <div className="p-4 bg-gray-200 border-4 border-black">
            <p className="text-gray-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Brak danych – wypełnij zakładki Ćwiczenia i Egzamin
            </p>
          </div>
        ) : (
          <div>
            <div className={`p-6 border-4 border-black ${isFinalPassed ? 'bg-green-200' : 'bg-red-200'}`}>
              <p className="text-5xl font-black">{ocenaKoncowa.toFixed(2)}</p>
              <p className="text-lg mt-2">Podstawy Analizy Matematycznej</p>
            </div>

            <div className="mt-4 p-4 bg-white border-4 border-black">
              <p className="font-bold mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Obliczenia:
              </p>
              <p className="text-sm">Ocena z ćwiczeń: {cwiczeniaGrade?.toFixed(2) ?? 'N/A'}</p>
              <p className="text-sm">Ocena z egzaminu: {egzaminGrade?.toFixed(1) ?? 'N/A'}</p>
              <p className="text-sm font-bold mt-2">
                Średnia arytmetyczna: ({cwiczeniaGrade?.toFixed(2)} + {egzaminGrade?.toFixed(1)}) / 2 = {ocenaKoncowa.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* wskazówki */}
      {!allPassed && (
        <div className="neo-card bg-orange-100">
          <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Co można poprawić?
          </h3>

          <div className="space-y-3">
            {!isCwiczeniaZaliczone && (
              <div className="p-3 bg-white border-2 border-black">
                <p className="font-bold">Ćwiczenia:</p>
                <ul className="text-sm mt-1 list-disc list-inside">
                  <li>Zwiększ punkty z kolokwium (min 10 pkt)</li>
                  <li>Popraw aktywność przy tablicy</li>
                  <li>Bierz udział w pracach grupowych</li>
                </ul>
              </div>
            )}

            {!isEgzaminZaliczony && isCwiczeniaZaliczone && (
              <div className="p-3 bg-white border-2 border-black">
                <p className="font-bold">Egzamin:</p>
                <ul className="text-sm mt-1 list-disc list-inside">
                  <li>Powtórz materiał z wykładów</li>
                  <li>Przećwicz zadania teoretyczne i praktyczne</li>
                  <li>Musisz zdobyć co najmniej 50% punktów</li>
                  <li>Sesja poprawkowa: 9-15 lutego 2026</li>
                </ul>
              </div>
            )}

            {isCwiczeniaZaliczone && isEgzaminZaliczony && !isFinalPassed && (
              <div className="p-3 bg-white border-2 border-black">
                <p className="font-bold">Ocena końcowa:</p>
                <p className="text-sm mt-1">
                  Ćwiczenia i egzamin zaliczone, ale średnia arytmetyczna wyszła poniżej 3.0.
                  Spróbuj poprawić któryś z komponentów.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
