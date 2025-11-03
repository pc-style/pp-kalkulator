'use client'

import { useState } from 'react'
import { Calculator, BookOpen, Award, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Laboratorium from '@/components/Laboratorium'
import Wyklad from '@/components/Wyklad'
import Podsumowanie from '@/components/Podsumowanie'

type Tab = 'lab' | 'wyklad' | 'podsumowanie'

export default function PPCalculator() {
  const [activeTab, setActiveTab] = useState<Tab>('lab')

  // stan współdzielony między zakładkami (opcjonalnie)
  const [labGrade, setLabGrade] = useState<number | null>(null)
  const [wykladGrade, setWykladGrade] = useState<number | null>(null)
  const [testGrade, setTestGrade] = useState<number | null>(null)
  const [courseGrade, setCourseGrade] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* przycisk powrotu */}
        <Link href="/" className="inline-flex items-center gap-2 mb-6 neo-button bg-gray-300">
          <ArrowLeft className="w-5 h-5" />
          Powrót do menu
        </Link>

        {/* nagłówek */}
        <div className="neo-card mb-8 bg-yellow-400">
          <h1 className="text-4xl md:text-5xl font-black mb-2 flex items-center gap-3">
            <Calculator className="w-10 h-10" />
            Kalkulator PP
          </h1>
          <p className="text-lg font-medium">Podstawy Programowania – Politechnika Częstochowska</p>
        </div>

        {/* nawigacja zakładkowa */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <button
            onClick={() => setActiveTab('lab')}
            className={`neo-tab flex items-center gap-2 justify-center ${
              activeTab === 'lab' ? 'neo-tab-active' : 'neo-tab-inactive'
            }`}
          >
            <Calculator className="w-5 h-5" />
            Laboratorium
          </button>

          <button
            onClick={() => setActiveTab('wyklad')}
            className={`neo-tab flex items-center gap-2 justify-center ${
              activeTab === 'wyklad' ? 'neo-tab-active' : 'neo-tab-inactive'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Wykład
          </button>

          <button
            onClick={() => setActiveTab('podsumowanie')}
            className={`neo-tab flex items-center gap-2 justify-center ${
              activeTab === 'podsumowanie' ? 'neo-tab-active' : 'neo-tab-inactive'
            }`}
          >
            <Award className="w-5 h-5" />
            Podsumowanie
          </button>
        </div>

        {/* zawartość zakładek */}
        <div>
          {activeTab === 'lab' && (
            <Laboratorium onGradeCalculated={setLabGrade} />
          )}
          {activeTab === 'wyklad' && (
            <Wyklad
              labGradeFromTab={labGrade}
              onGradesCalculated={(test, course, wyklad) => {
                setTestGrade(test)
                setCourseGrade(course)
                setWykladGrade(wyklad)
              }}
            />
          )}
          {activeTab === 'podsumowanie' && (
            <Podsumowanie
              labGrade={labGrade}
              testGrade={testGrade}
              courseGrade={courseGrade}
              finalGrade={wykladGrade}
            />
          )}
        </div>
      </div>
    </main>
  )
}
