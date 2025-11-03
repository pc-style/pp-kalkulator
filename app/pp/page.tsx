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
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 p-8 md:p-12 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* przycisk powrotu */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 neo-button">
            <ArrowLeft className="w-5 h-5" />
            Powrót do menu
          </Link>
        </div>

        {/* nagłówek */}
        <div className="neo-card mb-12 bg-yellow-400">
          <h1 className="text-4xl md:text-5xl font-black mb-2 flex items-center gap-3">
            <Calculator className="w-10 h-10" />
            Kalkulator PP
          </h1>
          <p className="text-lg font-medium">Podstawy Programowania – Politechnika Częstochowska</p>
        </div>

        {/* nawigacja zakładkowa */}
        <nav className="flex flex-col md:flex-row gap-4 mb-12" aria-label="Zakładki kalkulatora">
          <button
            onClick={() => setActiveTab('lab')}
            className={`neo-tab flex items-center gap-2 justify-center ${
              activeTab === 'lab' ? 'neo-tab-active' : 'neo-tab-inactive'
            }`}
            aria-current={activeTab === 'lab' ? 'page' : undefined}
            aria-label="Zakładka Laboratorium"
          >
            <Calculator className="w-5 h-5" aria-hidden="true" />
            Laboratorium
          </button>

          <button
            onClick={() => setActiveTab('wyklad')}
            className={`neo-tab flex items-center gap-2 justify-center ${
              activeTab === 'wyklad' ? 'neo-tab-active' : 'neo-tab-inactive'
            }`}
            aria-current={activeTab === 'wyklad' ? 'page' : undefined}
            aria-label="Zakładka Wykład"
          >
            <BookOpen className="w-5 h-5" aria-hidden="true" />
            Wykład
          </button>

          <button
            onClick={() => setActiveTab('podsumowanie')}
            className={`neo-tab flex items-center gap-2 justify-center ${
              activeTab === 'podsumowanie' ? 'neo-tab-active' : 'neo-tab-inactive'
            }`}
            aria-current={activeTab === 'podsumowanie' ? 'page' : undefined}
            aria-label="Zakładka Podsumowanie"
          >
            <Award className="w-5 h-5" aria-hidden="true" />
            Podsumowanie
          </button>
        </nav>

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
