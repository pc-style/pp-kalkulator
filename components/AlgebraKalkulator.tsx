'use client'

import { useState } from 'react'
import { Calculator, Users, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react'
import {
  calculateKolokwiumGrade,
  calculateActivityBonus,
  DEFAULT_KOLOKWIUM_THRESHOLDS,
  isGradePassed,
} from '@/utils/calculations'

export default function AlgebraKalkulator() {
  const [kolokwiumPunkty, setKolokwiumPunkty] = useState<number>(10)
  const [aktywnosc, setAktywnosc] = useState<number>(5)
  const [prawaGrupowe, setPrawaGrupowe] = useState<number>(5)

  // przeliczenie punktów z kolokwium na ocenę bazową
  const ocenaBazowa = calculateKolokwiumGrade(
    kolokwiumPunkty,
    10,
    DEFAULT_KOLOKWIUM_THRESHOLDS
  )

  // bonus z aktywności (0-1.0)
  const sumaAktywnosci = aktywnosc + prawaGrupowe
  const bonusAktywnosc = calculateActivityBonus(sumaAktywnosci, 20, 1.0)

  // ocena końcowa
  const ocenaKoncowa = ocenaBazowa !== null
    ? Math.min(ocenaBazowa + bonusAktywnosc, 5.0)
    : null

  const czyZaliczone = isGradePassed(ocenaBazowa)

  return (
    <section className="space-y-6" aria-labelledby="alg-kalkulator-heading">
      <h1 id="alg-kalkulator-heading" className="sr-only">
        Kalkulator Algebra Liniowa i Geometria - Ćwiczenia
      </h1>
      {/* kolokwium */}
      <section className="neo-card" aria-labelledby="kolokwium-heading">
        <h2 id="kolokwium-heading" className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Calculator className="w-6 h-6" aria-hidden="true" />
          Kolokwium
        </h2>
        <p className="text-sm mb-4 bg-gray-100 p-3 border-2 border-black">
          Maksymalnie 20 punktów. Minimum 10 punktów na zaliczenie (ocena dostateczna).
        </p>

        <div className="mb-4">
          <label htmlFor="kolokwium-punkty" className="block font-bold mb-2">
            Punkty z kolokwium (0-20):
          </label>
          <input
            id="kolokwium-punkty"
            type="number"
            value={kolokwiumPunkty}
            onChange={(e) => setKolokwiumPunkty(Math.max(0, Math.min(20, parseInt(e.target.value) || 0)))}
            className="neo-input w-full md:w-64"
            min="0"
            max="20"
            aria-label="Punkty z kolokwium, maksimum 20 punktów"
            aria-describedby="kolokwium-description"
          />
          <span id="kolokwium-description" className="sr-only">
            Maksymalnie 20 punktów. Minimum 10 punktów na zaliczenie.
          </span>
        </div>

        <div className="p-4 bg-blue-100 border-4 border-black">
          {ocenaBazowa === null ? (
            <div className="flex items-center gap-2 text-red-600" role="alert">
              <AlertCircle className="w-5 h-5" aria-hidden="true" />
              <p className="font-bold">Niezaliczone - mniej niż 10 pkt!</p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-2xl">{ocenaBazowa.toFixed(1)}</p>
              <p className="text-sm mt-1">Ocena bazowa z kolokwium</p>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border-2 border-black text-sm">
          <p className="font-bold mb-1">Skala ocen (z kolokwium):</p>
          <ul className="space-y-1">
            <li>• 18-20 pkt → 5.0</li>
            <li>• 16-17 pkt → 4.5</li>
            <li>• 14-15 pkt → 4.0</li>
            <li>• 12-13 pkt → 3.5</li>
            <li>• 10-11 pkt → 3.0</li>
            <li>• &lt;10 pkt → niezaliczone</li>
          </ul>
        </div>
      </section>

      {/* aktywność */}
      <section className="neo-card" aria-labelledby="aktywnosc-heading">
        <h2 id="aktywnosc-heading" className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Users className="w-6 h-6" aria-hidden="true" />
          Aktywność i prace grupowe
        </h2>
        <p className="text-sm mb-4 bg-gray-100 p-3 border-2 border-black">
          Aktywność przy tablicy oraz prace wykonywane w grupach mogą podnieść ocenę końcową.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="aktywnosc-tablica" className="block font-bold mb-2">
              Aktywność przy tablicy (0-10):
            </label>
            <input
              id="aktywnosc-tablica"
              type="number"
              value={aktywnosc}
              onChange={(e) => setAktywnosc(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
              className="neo-input w-full"
              min="0"
              max="10"
              aria-label="Punkty z aktywności przy tablicy, maksimum 10"
            />
          </div>
          <div>
            <label htmlFor="prace-grupowe" className="block font-bold mb-2">
              Prace grupowe (0-10):
            </label>
            <input
              id="prace-grupowe"
              type="number"
              value={prawaGrupowe}
              onChange={(e) => setPrawaGrupowe(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
              className="neo-input w-full"
              min="0"
              max="10"
              aria-label="Punkty z prac grupowych, maksimum 10"
            />
          </div>
        </div>

        <div className="p-4 bg-green-100 border-4 border-black">
          <p className="font-bold">Bonus z aktywności: +{bonusAktywnosc.toFixed(2)}</p>
          <p className="text-sm mt-1">Suma aktywności: {aktywnosc + prawaGrupowe} / 20 pkt</p>
        </div>
      </section>

      {/* wynik końcowy */}
      <section className="neo-card bg-purple-100" aria-labelledby="wynik-heading">
        <h2 id="wynik-heading" className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" aria-hidden="true" />
          Ocena końcowa z zaliczenia
        </h2>

        {ocenaKoncowa === null ? (
          <div className="p-6 bg-red-200 border-4 border-black">
            <p className="text-2xl font-black text-red-700 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              NIEZALICZONE
            </p>
            <p className="mt-2">Mniej niż 10 punktów z kolokwium.</p>
            <p className="mt-1 text-sm">Możliwość poprawy w II tygodniu stycznia.</p>
          </div>
        ) : (
          <div>
            <div className={`p-6 border-4 border-black ${czyZaliczone ? 'bg-green-200' : 'bg-red-200'}`}>
              <p className="text-5xl font-black">{ocenaKoncowa.toFixed(2)}</p>
              <p className="text-lg mt-2">Algebra Liniowa i Geometria</p>

              {czyZaliczone && (
                <div className="mt-4 flex items-center gap-2 text-green-700" role="status" aria-live="polite">
                  <CheckCircle className="w-6 h-6" aria-hidden="true" />
                  <p className="font-bold">ZALICZONE!</p>
                </div>
              )}
            </div>

            <div className="mt-4 p-4 bg-white border-4 border-black">
              <p className="font-bold mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Składowe oceny:
              </p>
              <p className="text-sm">Ocena z kolokwium: {ocenaBazowa?.toFixed(1) ?? 'N/A'}</p>
              <p className="text-sm">Bonus z aktywności: +{bonusAktywnosc.toFixed(2)}</p>
              <p className="text-sm font-bold mt-2">= {ocenaKoncowa.toFixed(2)} (max 5.0)</p>
            </div>
          </div>
        )}
      </section>

      {/* info o poprawce */}
      {!czyZaliczone && (
        <div className="neo-card bg-orange-100">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Terminy
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Kolokwium: II lub III tydzień grudnia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Poprawka: II tydzień stycznia (w razie niepowodzenia)</span>
            </li>
          </ul>
        </div>
      )}
    </section>
  )
}
