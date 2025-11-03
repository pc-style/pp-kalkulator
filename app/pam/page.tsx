'use client'

import { ArrowLeft, Calculator } from 'lucide-react'
import Link from 'next/link'
import PAMKalkulator from '@/components/PAMKalkulator'

export default function PAMPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* przycisk powrotu */}
        <Link href="/" className="inline-flex items-center gap-2 mb-6 neo-button bg-gray-300">
          <ArrowLeft className="w-5 h-5" />
          Powrót do menu
        </Link>

        {/* nagłówek */}
        <div className="neo-card mb-8 bg-pink-400">
          <h1 className="text-4xl md:text-5xl font-black mb-2 flex items-center gap-3">
            <Calculator className="w-10 h-10" />
            Kalkulator PAM
          </h1>
          <p className="text-lg font-medium">Podstawy Analizy Matematycznej – Politechnika Częstochowska</p>
        </div>

        {/* kalkulator */}
        <PAMKalkulator />
      </div>
    </main>
  )
}
