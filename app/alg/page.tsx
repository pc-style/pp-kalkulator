'use client'

import { ArrowLeft, Calculator } from 'lucide-react'
import Link from 'next/link'
import AlgebraKalkulator from '@/components/AlgebraKalkulator'

export default function ALGPage() {
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
          <p className="text-sm mt-2 opacity-80">Ćwiczenia - JB 2025/26ST-Z</p>
        </div>

        {/* kalkulator */}
        <AlgebraKalkulator />
      </div>
    </main>
  )
}
