'use client'

import { useState } from 'react'
import { ArrowLeft, Calculator, BookOpen, Award } from 'lucide-react'
import Link from 'next/link'
import PAMKalkulator from '@/components/PAMKalkulator'
import PAMWyklad from '@/components/PAMWyklad'
import PAMPodsumowanie from '@/components/PAMPodsumowanie'

type Tab = 'cwiczenia' | 'egzamin' | 'podsumowanie'

export default function PAMPage() {
  const [activeTab, setActiveTab] = useState<Tab>('cwiczenia')

  // stan współdzielony między zakładkami
  const [cwiczeniaGrade, setCwiczeniaGrade] = useState<number | null>(null)
  const [egzaminGrade, setEgzaminGrade] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-8 md:p-12 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* przycisk powrotu */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 neo-button">
            <ArrowLeft className="w-5 h-5" />
            Powrót do menu
          </Link>
        </div>

        {/* nagłówek */}
        <div className="neo-card mb-12 bg-pink-400">
          <h1 className="text-4xl md:text-5xl font-black mb-2 flex items-center gap-3">
            <Calculator className="w-10 h-10" />
            Kalkulator PAM
          </h1>
          <p className="text-lg font-medium">Podstawy Analizy Matematycznej – Politechnika Częstochowska</p>
        </div>

        {/* nawigacja zakładkowa */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <button
            onClick={() => setActiveTab('cwiczenia')}
            className={`neo-tab flex items-center gap-2 justify-center ${
              activeTab === 'cwiczenia' ? 'neo-tab-active' : 'neo-tab-inactive'
            }`}
          >
            <Calculator className="w-5 h-5" />
            Ćwiczenia
          </button>

          <button
            onClick={() => setActiveTab('egzamin')}
            className={`neo-tab flex items-center gap-2 justify-center ${
              activeTab === 'egzamin' ? 'neo-tab-active' : 'neo-tab-inactive'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Egzamin
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
          {activeTab === 'cwiczenia' && (
            <PAMKalkulator onGradeCalculated={setCwiczeniaGrade} />
          )}
          {activeTab === 'egzamin' && (
            <PAMWyklad onEgzaminCalculated={setEgzaminGrade} />
          )}
          {activeTab === 'podsumowanie' && (
            <PAMPodsumowanie
              cwiczeniaGrade={cwiczeniaGrade}
              egzaminGrade={egzaminGrade}
            />
          )}
        </div>
      </div>
    </main>
  )
}
