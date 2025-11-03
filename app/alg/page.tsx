'use client'

import { useState } from 'react'
import { ArrowLeft, Calculator, BookOpen } from 'lucide-react'
import Link from 'next/link'
import AlgebraKalkulator from '@/components/AlgebraKalkulator'
import AlgebraWyklad from '@/components/AlgebraWyklad'

type Tab = 'cwiczenia' | 'wyklad'

export default function ALGPage() {
  const [activeTab, setActiveTab] = useState<Tab>('cwiczenia')

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* przycisk powrotu */}
        <Link href="/" className="inline-flex items-center gap-2 mb-6 neo-button bg-gray-300">
          <ArrowLeft className="w-5 h-5" />
          Powrót do menu
        </Link>

        {/* nagłówek */}
        <div className="neo-card mb-8 bg-purple-400">
          <h1 className="text-4xl md:text-5xl font-black mb-2 flex items-center gap-3">
            <Calculator className="w-10 h-10" />
            Kalkulator ALG
          </h1>
          <p className="text-lg font-medium">Algebra Liniowa i Geometria – Politechnika Częstochowska</p>
        </div>

        {/* nawigacja zakładkowa */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
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
            onClick={() => setActiveTab('wyklad')}
            className={`neo-tab flex items-center gap-2 justify-center ${
              activeTab === 'wyklad' ? 'neo-tab-active' : 'neo-tab-inactive'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Wykład
          </button>
        </div>

        {/* zawartość zakładek */}
        <div>
          {activeTab === 'cwiczenia' && <AlgebraKalkulator />}
          {activeTab === 'wyklad' && <AlgebraWyklad />}
        </div>
      </div>
    </main>
  )
}
