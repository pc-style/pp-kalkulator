'use client'

import Link from 'next/link'
import { Calculator, BookOpen, Code, Database, Cpu, Lock } from 'lucide-react'

// lista przedmiotów - łatwo dodać kolejne
const subjects = [
  {
    id: 'pp',
    name: 'Podstawy Programowania',
    shortName: 'PP',
    description: 'Kalkulator punktów i ocen z laboratoriów i wykładu',
    icon: Calculator,
    color: 'bg-yellow-400',
    available: true,
  },
  {
    id: 'aisd',
    name: 'Algorytmy i Struktury Danych',
    shortName: 'AiSD',
    description: 'Wkrótce dostępne...',
    icon: Code,
    color: 'bg-blue-400',
    available: false,
  },
  {
    id: 'alg',
    name: 'Algebra Liniowa i Geometria',
    shortName: 'ALG',
    description: 'Kalkulator ocen z kolokwium i aktywności',
    icon: Calculator,
    color: 'bg-purple-400',
    available: true,
  },
  {
    id: 'pam',
    name: 'Podstawy Analizy Matematycznej',
    shortName: 'PAM',
    description: 'Wkrótce dostępne...',
    icon: Calculator,
    color: 'bg-pink-400',
    available: false,
  },
  {
    id: 'faipe',
    name: 'Foundations of AI and Prompt Engineering',
    shortName: 'FAIPE',
    description: 'Wkrótce dostępne...',
    icon: Cpu,
    color: 'bg-purple-500',
    available: false,
  },
  {
    id: 'prakp',
    name: 'Praktyka Programowania',
    shortName: 'PrakP',
    description: 'Wkrótce dostępne...',
    icon: Code,
    color: 'bg-green-400',
    available: false,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* nagłówek główny */}
        <div className="neo-card mb-8 bg-pink-300">
          <h1 className="text-4xl md:text-6xl font-black mb-3 flex items-center gap-3">
            <BookOpen className="w-12 h-12" />
            Kalkulatory PCz
          </h1>
          <p className="text-xl font-bold">Politechnika Częstochowska</p>
          <p className="text-lg mt-2">Wybierz przedmiot, żeby obliczyć swoją ocenę</p>
        </div>

        {/* siatka przedmiotów */}
        <div className="grid md:grid-cols-2 gap-6">
          {subjects.map((subject) => {
            const Icon = subject.icon

            if (subject.available) {
              // dostępny przedmiot - klikalne
              return (
                <Link key={subject.id} href={`/${subject.id}`}>
                  <div className={`neo-card ${subject.color} hover:translate-x-1 hover:translate-y-1 transition-transform cursor-pointer h-full`}>
                    <div className="flex items-start gap-4">
                      <Icon className="w-12 h-12 flex-shrink-0" />
                      <div>
                        <h2 className="text-3xl font-black mb-2">{subject.shortName}</h2>
                        <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                        <p className="text-base">{subject.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            } else {
              // niedostępny przedmiot - szare, nieaktywne
              return (
                <div key={subject.id} className="neo-card bg-gray-300 opacity-60 cursor-not-allowed h-full">
                  <div className="flex items-start gap-4">
                    <Icon className="w-12 h-12 flex-shrink-0" />
                    <div>
                      <h2 className="text-3xl font-black mb-2">{subject.shortName}</h2>
                      <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                      <p className="text-base italic">{subject.description}</p>
                    </div>
                  </div>
                  <div className="mt-3 inline-block px-3 py-1 bg-gray-500 text-white text-sm font-bold border-2 border-black">
                    NIEDOSTĘPNE
                  </div>
                </div>
              )
            }
          })}
        </div>

        {/* stopka */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            Masz pomysł na kolejny przedmiot? Dodaj go sam - kod jest open source!
          </p>
        </div>
      </div>
    </main>
  )
}
