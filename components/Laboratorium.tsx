'use client'

import { useState, useEffect } from 'react'
import { Calculator, TrendingUp, Users, CheckCircle, AlertCircle, Award } from 'lucide-react'

interface LaboratoriumProps {
  onGradeCalculated?: (grade: number | null) => void
}

export default function Laboratorium({ onGradeCalculated }: LaboratoriumProps) {
  // struktura semestru
  const [totalLabs, setTotalLabs] = useState<number>(13)
  const [completedLabs, setCompletedLabs] = useState<number>(6)

  // punkty z aktywności
  const [labPoints, setLabPoints] = useState<number[]>([])
  const [plannedAvg, setPlannedAvg] = useState<number>(2)

  // obecność
  const [present, setPresent] = useState<number>(0)
  const [excused, setExcused] = useState<number>(0)
  const [unexcused, setUnexcused] = useState<number>(0)

  // kolokwia
  const [m1, setM1] = useState<number>(3.0)
  const [m2, setM2] = useState<number>(3.0)

  // inicjalizacja punktów z labów
  useEffect(() => {
    setLabPoints(new Array(completedLabs).fill(0))
  }, [completedLabs])

  // dobra, tu liczymy współczynnik aktywności "as"
  const calculateAs = () => {
    const labsWithPoints = labPoints.filter(p => p >= 1).length
    const percentage = completedLabs > 0 ? (labsWithPoints / completedLabs) * 100 : 0

    if (percentage >= 90) return 0.5
    if (percentage >= 70) return 0.3
    if (percentage >= 40) return 0.1
    if (percentage >= 1) return 0
    return -0.2
  }

  // współczynnik obecności "p"
  const calculateP = () => {
    const totalAttendance = present + excused + unexcused
    if (totalAttendance === 0) return 0

    const attendanceRate = (present + excused) / totalAttendance * 100
    const unexcusedRate = unexcused / totalAttendance * 100

    // jak ktoś ma dużo nieusprawiedliwionych, to ujemne
    if (unexcusedRate > 30) return -0.2

    if (attendanceRate >= 95) return 0.5
    if (attendanceRate >= 80) return 0.4
    if (attendanceRate >= 60) return 0.3
    if (attendanceRate >= 40) return 0.2
    return 0.0
  }

  // suma punktów aktywności
  const calculateAz = () => {
    return labPoints.reduce((sum, p) => sum + p, 0)
  }

  // szacowana suma na koniec
  const calculateEstimatedAz = () => {
    const current = calculateAz()
    const remaining = totalLabs - completedLabs
    return current + (remaining * plannedAvg)
  }

  // średnia z kolosów
  const calculateAvgKolokwia = () => {
    return (2 * m1 + 5 * m2) / 7
  }

  // końcowa ocena L
  const calculateL = () => {
    const az = calculateEstimatedAz()
    const avgKol = calculateAvgKolokwia()
    const as = calculateAs()
    const p = calculateP()

    // jak ktoś ma mniej niż 11 pkt, to rip
    if (az < 11) return null

    // wysoka aktywność
    if (az >= 22) {
      if (avgKol > 3.5 && p >= 0.4) {
        return avgKol + as + p
      }
      if (avgKol >= 3.0 && p > 0.25) {
        return avgKol + as + 0.5 * p
      }
      if (avgKol >= 3.0) {
        return avgKol + 0.5 * as
      }
    }

    // niska aktywność
    if (az >= 11 && az < 22) {
      if (avgKol >= 3.5) {
        return avgKol - as
      }
      if (avgKol >= 3.0) {
        return avgKol
      }
    }

    return null
  }

  const az = calculateAz()
  const estimatedAz = calculateEstimatedAz()
  const as = calculateAs()
  const p = calculateP()
  const avgKol = calculateAvgKolokwia()
  const L = calculateL()

  // przekazujemy wynik do rodzica
  useEffect(() => {
    if (onGradeCalculated) {
      onGradeCalculated(L)
    }
  }, [L, onGradeCalculated])

  const handleLabPointChange = (index: number, value: string) => {
    const num = parseInt(value) || 0
    const clamped = Math.max(-1, Math.min(4, num))
    const newPoints = [...labPoints]
    newPoints[index] = clamped
    setLabPoints(newPoints)
  }

  return (
    <div className="space-y-6">
      {/* struktura semestru */}
      <div className="neo-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Struktura semestru
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-2">Liczba wszystkich zajęć:</label>
            <input
              type="number"
              value={totalLabs}
              onChange={(e) => setTotalLabs(parseInt(e.target.value) || 0)}
              className="neo-input w-full"
              min="1"
              max="20"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Liczba odbytych zajęć:</label>
            <input
              type="number"
              value={completedLabs}
              onChange={(e) => setCompletedLabs(parseInt(e.target.value) || 0)}
              className="neo-input w-full"
              min="0"
              max={totalLabs}
            />
          </div>
        </div>
      </div>

      {/* punkty z aktywności */}
      <div className="neo-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Punkty z aktywności
        </h2>
        <div className="mb-4">
          <p className="text-sm mb-3 bg-gray-100 p-3 border-2 border-black">
            Zakres: -1 (brak zgłoszenia) do 4 (kilka zadań)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {labPoints.map((points, idx) => (
              <div key={idx}>
                <label className="block font-bold mb-1 text-sm">Lab {idx + 1}</label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => handleLabPointChange(idx, e.target.value)}
                  className="neo-input w-full"
                  min="-1"
                  max="4"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-bold mb-2">Planowana średnia (przyszłe zajęcia):</label>
          <input
            type="number"
            value={plannedAvg}
            onChange={(e) => setPlannedAvg(parseFloat(e.target.value) || 0)}
            className="neo-input w-full md:w-48"
            step="0.5"
            min="0"
            max="4"
          />
        </div>

        <div className="mt-6 p-4 bg-blue-100 border-4 border-black">
          <p className="font-bold">Aktualna suma az: {az} pkt</p>
          <p className="font-bold">Szacowana suma (koniec semestru): {estimatedAz.toFixed(1)} pkt</p>
          <p className="text-sm mt-2">Procent z 66 pkt: {((estimatedAz / 66) * 100).toFixed(1)}%</p>
        </div>

        <div className="mt-4 p-4 bg-yellow-100 border-4 border-black">
          <p className="font-bold">Współczynnik aktywności (as): {as > 0 ? '+' : ''}{as.toFixed(1)}</p>
          {estimatedAz < 11 && (
            <p className="text-red-600 font-bold mt-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Brak wymaganej aktywności – konieczna poprawka!
            </p>
          )}
          {estimatedAz >= 11 && estimatedAz < 22 && (
            <p className="text-orange-600 font-bold mt-2">Niska aktywność</p>
          )}
          {estimatedAz >= 22 && (
            <p className="text-green-600 font-bold mt-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Wysoka aktywność
            </p>
          )}
        </div>
      </div>

      {/* obecność */}
      <div className="neo-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Users className="w-6 h-6" />
          Obecność
        </h2>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block font-bold mb-2">Obecności:</label>
            <input
              type="number"
              value={present}
              onChange={(e) => setPresent(parseInt(e.target.value) || 0)}
              className="neo-input w-full"
              min="0"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Usprawiedliwione:</label>
            <input
              type="number"
              value={excused}
              onChange={(e) => setExcused(parseInt(e.target.value) || 0)}
              className="neo-input w-full"
              min="0"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Nieusprawiedliwione:</label>
            <input
              type="number"
              value={unexcused}
              onChange={(e) => setUnexcused(parseInt(e.target.value) || 0)}
              className="neo-input w-full"
              min="0"
            />
          </div>
        </div>

        <div className="p-4 bg-green-100 border-4 border-black">
          <p className="font-bold">Współczynnik obecności (p): {p > 0 ? '+' : ''}{p.toFixed(1)}</p>
        </div>
      </div>

      {/* kolokwia */}
      <div className="neo-card">
        <h2 className="text-2xl font-bold mb-4">Kolokwia</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-bold mb-2">Kolokwium 1 (m1):</label>
            <input
              type="number"
              value={m1}
              onChange={(e) => setM1(parseFloat(e.target.value) || 2.0)}
              className="neo-input w-full"
              step="0.5"
              min="2.0"
              max="5.0"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Kolokwium 2 (m2):</label>
            <input
              type="number"
              value={m2}
              onChange={(e) => setM2(parseFloat(e.target.value) || 2.0)}
              className="neo-input w-full"
              step="0.5"
              min="2.0"
              max="5.0"
            />
          </div>
        </div>

        <div className="p-4 bg-purple-100 border-4 border-black">
          <p className="font-bold">Średnia ważona kolokwiów: {avgKol.toFixed(2)}</p>
          <p className="text-sm mt-1">(2×m1 + 5×m2) / 7</p>
          {avgKol < 3.0 && (
            <p className="text-red-600 font-bold mt-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Średnia poniżej 3.0 – warunek niezaliczony!
            </p>
          )}
        </div>
      </div>

      {/* wynik końcowy */}
      <div className="neo-card bg-pink-100">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Award className="w-6 h-6" />
          Ocena z laboratoriów (L)
        </h2>

        {L === null ? (
          <div className="p-6 bg-red-200 border-4 border-black">
            <p className="text-2xl font-black text-red-700">BRAK ZALICZENIA</p>
            {estimatedAz < 11 && (
              <p className="mt-2">Niewystarczająca aktywność (az &lt; 11)</p>
            )}
            {avgKol < 3.0 && (
              <p className="mt-2">Średnia z kolokwiów poniżej 3.0</p>
            )}
          </div>
        ) : (
          <div className="p-6 bg-green-200 border-4 border-black">
            <p className="text-5xl font-black">{L.toFixed(2)}</p>
            <p className="text-sm mt-3 text-gray-700">
              Obliczenia: średnia_kolokwiów ({avgKol.toFixed(2)}) + modyfikatory (as: {as.toFixed(1)}, p: {p.toFixed(1)})
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
