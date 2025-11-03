#!/usr/bin/env node

// skrypt do generowania nowych przedmiotów
// używa: npm run generate:subject

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// helper do pytań
function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

// helper do capitalizacji
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// helper do nazwy komponentu (np. "aisd" -> "AiSDKalkulator")
function toComponentName(id) {
  return id
    .split('-')
    .map(part => capitalize(part.toLowerCase()))
    .join('')
}

// szablony komponentów
const templates = {
  kalkulator: (subject) => `'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import {
  calculateKolokwiumGrade,
  calculateActivityBonus,
  DEFAULT_KOLOKWIUM_THRESHOLDS,
  isGradePassed,
} from '@/utils/calculations'
import KolokwiumInput from '@/components/shared/KolokwiumInput'
import GradeDisplay from '@/components/shared/GradeDisplay'

export default function ${subject.componentName}Kalkulator() {
  const [kolokwiumPunkty, setKolokwiumPunkty] = useState<number>(10)
  const [aktywnosc, setAktywnosc] = useState<number>(5)
  const [prawaGrupowe, setPrawaGrupowe] = useState<number>(5)

  const ocenaBazowa = calculateKolokwiumGrade(
    kolokwiumPunkty,
    10,
    DEFAULT_KOLOKWIUM_THRESHOLDS
  )

  const sumaAktywnosci = aktywnosc + prawaGrupowe
  const bonusAktywnosc = calculateActivityBonus(sumaAktywnosci, 20, 1.0)
  const ocenaKoncowa = ocenaBazowa !== null
    ? Math.min(ocenaBazowa + bonusAktywnosc, 5.0)
    : null

  const czyZaliczone = isGradePassed(ocenaBazowa)

  return (
    <section className="space-y-6" aria-labelledby="${subject.id}-heading">
      <h1 id="${subject.id}-heading" className="sr-only">
        Kalkulator ${subject.fullName} - Ćwiczenia
      </h1>

      <KolokwiumInput
        points={kolokwiumPunkty}
        onChange={setKolokwiumPunkty}
        label="Punkty z kolokwium"
        description="Maksymalnie 20 punktów. Minimum 10 punktów na zaliczenie."
      />

      {/* aktywność - możesz dodać więcej sekcji tutaj */}
      <section className="neo-card" aria-labelledby="aktywnosc-heading">
        <h2 id="aktywnosc-heading" className="text-2xl font-bold mb-4">
          Aktywność
        </h2>
        <p className="text-sm mb-4 bg-gray-100 p-3 border-2 border-black">
          Dostosuj sekcję aktywności według potrzeb przedmiotu.
        </p>
      </section>

      {/* wynik końcowy */}
      <section className="neo-card bg-purple-100" aria-labelledby="wynik-heading">
        <h2 id="wynik-heading" className="text-2xl font-bold mb-4">
          Ocena końcowa
        </h2>
        <GradeDisplay
          grade={ocenaKoncowa}
          label="${subject.fullName}"
          size="lg"
          showStatus
        />
      </section>
    </section>
  )
}
`,

  wyklad: (subject) => `'use client'

import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import {
  calculateKolokwiumGrade,
  DEFAULT_KOLOKWIUM_THRESHOLDS,
  isGradePassed,
} from '@/utils/calculations'
import GradeDisplay from '@/components/shared/GradeDisplay'

export default function ${subject.componentName}Wyklad() {
  const [kolokwiumPunkty, setKolokwiumPunkty] = useState<number>(10)

  const ocena = calculateKolokwiumGrade(
    kolokwiumPunkty,
    10,
    DEFAULT_KOLOKWIUM_THRESHOLDS
  )
  const czyZaliczone = isGradePassed(ocena)

  return (
    <section className="space-y-6" aria-labelledby="${subject.id}-wyklad-heading">
      <h1 id="${subject.id}-wyklad-heading" className="sr-only">
        Kalkulator ${subject.fullName} - Wykład
      </h1>

      <section className="neo-card" aria-labelledby="wyklad-kolokwium-heading">
        <h2 id="wyklad-kolokwium-heading" className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6" aria-hidden="true" />
          Kolokwium zaliczeniowe
        </h2>
        <p className="text-sm mb-4 bg-gray-100 p-3 border-2 border-black">
          Maksymalnie 20 punktów. Minimum 10 punktów na zaliczenie.
        </p>

        <div className="mb-4">
          <label htmlFor="wyklad-kolokwium" className="block font-bold mb-2">
            Punkty z kolokwium (0-20):
          </label>
          <input
            id="wyklad-kolokwium"
            type="number"
            value={kolokwiumPunkty}
            onChange={(e) => setKolokwiumPunkty(Math.max(0, Math.min(20, parseInt(e.target.value) || 0)))}
            className="neo-input w-full md:w-64"
            min="0"
            max="20"
            aria-label="Punkty z kolokwium, maksimum 20 punktów"
          />
        </div>

        <GradeDisplay
          grade={ocena}
          label="Ocena z wykładu"
          size="sm"
        />
      </section>
    </section>
  )
}
`,

  podsumowanie: (subject) => `'use client'

import { Award } from 'lucide-react'
import StatusCard from '@/components/shared/StatusCard'
import GradeDisplay from '@/components/shared/GradeDisplay'

interface ${subject.componentName}PodsumowanieProps {
  cwiczeniaGrade?: number | null
  wykladGrade?: number | null
}

export default function ${subject.componentName}Podsumowanie({
  cwiczeniaGrade,
  wykladGrade,
}: ${subject.componentName}PodsumowanieProps) {
  // dostosuj logikę obliczania oceny końcowej tutaj
  const ocenaKoncowa = (cwiczeniaGrade !== null && wykladGrade !== null)
    ? (cwiczeniaGrade + wykladGrade) / 2
    : null

  const allPassed = ocenaKoncowa !== null && ocenaKoncowa >= 3.0

  return (
    <section className="space-y-6" aria-labelledby="${subject.id}-podsumowanie-heading">
      <h1 id="${subject.id}-podsumowanie-heading" className="sr-only">
        Podsumowanie ${subject.fullName}
      </h1>

      <StatusCard
        passed={allPassed}
        title="Status zaliczenia"
        message={allPassed ? 'Gratulacje!' : 'Zobacz szczegóły poniżej'}
        size="lg"
      />

      {ocenaKoncowa !== null && (
        <section className="neo-card bg-yellow-100">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" aria-hidden="true" />
            Ocena końcowa
          </h2>
          <GradeDisplay
            grade={ocenaKoncowa}
            label="${subject.fullName}"
            size="lg"
            showStatus
          />
        </section>
      )}
    </section>
  )
}
`,

  page: (subject) => `'use client'

import { useState } from 'react'
import { ArrowLeft, Calculator, BookOpen${subject.hasSummary ? ', Award' : ''} } from 'lucide-react'
import Link from 'next/link'
import ${subject.componentName}Kalkulator from '@/components/${subject.componentName}Kalkulator'
${subject.hasWyklad ? `import ${subject.componentName}Wyklad from '@/components/${subject.componentName}Wyklad'` : ''}
${subject.hasSummary ? `import ${subject.componentName}Podsumowanie from '@/components/${subject.componentName}Podsumowanie'` : ''}

type Tab = 'cwiczenia'${subject.hasWyklad ? " | 'wyklad'" : ''}${subject.hasSummary ? " | 'podsumowanie'" : ''}

export default function ${subject.componentName}Page() {
  const [activeTab, setActiveTab] = useState<Tab>('cwiczenia')
  ${subject.hasSummary ? `const [cwiczeniaGrade, setCwiczeniaGrade] = useState<number | null>(null)` : ''}
  ${subject.hasSummary && subject.hasWyklad ? `const [wykladGrade, setWykladGrade] = useState<number | null>(null)` : ''}

  return (
    <main className="min-h-screen bg-gradient-to-br from-${subject.color}-100 via-pink-50 to-blue-100 p-8 md:p-12 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 mb-12 neo-button" aria-label="Powrót do menu głównego">
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          Powrót do menu
        </Link>

        <div className="neo-card mb-12 bg-${subject.color}-400">
          <h1 className="text-4xl md:text-5xl font-black mb-2 flex items-center gap-3">
            <Calculator className="w-10 h-10" aria-hidden="true" />
            Kalkulator ${subject.shortName}
          </h1>
          <p className="text-lg font-medium">${subject.fullName} – Politechnika Częstochowska</p>
        </div>

        <nav className="flex flex-col md:flex-row gap-4 mb-12" aria-label="Zakładki kalkulatora">
          <button
            onClick={() => setActiveTab('cwiczenia')}
            className={\`neo-tab flex items-center gap-2 justify-center \${
              activeTab === 'cwiczenia' ? 'neo-tab-active' : 'neo-tab-inactive'
            }\`}
            aria-current={activeTab === 'cwiczenia' ? 'page' : undefined}
            aria-label="Zakładka Ćwiczenia"
          >
            <Calculator className="w-5 h-5" aria-hidden="true" />
            Ćwiczenia
          </button>
${subject.hasWyklad ? `          <button
            onClick={() => setActiveTab('wyklad')}
            className={\`neo-tab flex items-center gap-2 justify-center \${
              activeTab === 'wyklad' ? 'neo-tab-active' : 'neo-tab-inactive'
            }\`}
            aria-current={activeTab === 'wyklad' ? 'page' : undefined}
            aria-label="Zakładka Wykład"
          >
            <BookOpen className="w-5 h-5" aria-hidden="true" />
            Wykład
          </button>
` : ''}${subject.hasSummary ? `          <button
            onClick={() => setActiveTab('podsumowanie')}
            className={\`neo-tab flex items-center gap-2 justify-center \${
              activeTab === 'podsumowanie' ? 'neo-tab-active' : 'neo-tab-inactive'
            }\`}
            aria-current={activeTab === 'podsumowanie' ? 'page' : undefined}
            aria-label="Zakładka Podsumowanie"
          >
            <Award className="w-5 h-5" aria-hidden="true" />
            Podsumowanie
          </button>
` : ''}        </nav>

        <div>
          {activeTab === 'cwiczenia' && (
            <${subject.componentName}Kalkulator${subject.hasSummary ? ' onGradeCalculated={setCwiczeniaGrade}' : ''} />
          )}
${subject.hasWyklad ? `          {activeTab === 'wyklad' && (
            <${subject.componentName}Wyklad${subject.hasSummary ? ' onWykladCalculated={setWykladGrade}' : ''} />
          )}
` : ''}${subject.hasSummary ? `          {activeTab === 'podsumowanie' && (
            <${subject.componentName}Podsumowanie
              cwiczeniaGrade={cwiczeniaGrade}${subject.hasWyklad ? `
              wykladGrade={wykladGrade}` : ''}
            />
          )}
` : ''}        </div>
      </div>
    </main>
  )
}
`,

  layout: (subject) => `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kalkulator ${subject.shortName} - ${subject.fullName}',
  description: 'Kalkulator ocen z ${subject.fullName} (${subject.shortName}) - Politechnika Częstochowska',
}

export default function ${subject.componentName}Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
`,
}

async function main() {
  console.log('🎓 Generator nowych przedmiotów\n')

  const id = await question('ID przedmiotu (np. aisd, faipe): ')
  const shortName = await question('Skrót przedmiotu (np. AiSD, FAIPE): ')
  const fullName = await question('Pełna nazwa przedmiotu: ')
  const color = await question('Kolor (yellow/pink/purple/blue/green, default: blue): ') || 'blue'

  const hasWyklad = (await question('Czy ma wykład? (t/n, default: t): ')).toLowerCase() !== 'n'
  const hasSummary = (await question('Czy ma podsumowanie? (t/n, default: t): ')).toLowerCase() !== 'n'

  const componentName = toComponentName(id)
  const subject = {
    id,
    shortName,
    fullName,
    color,
    componentName,
    hasWyklad,
    hasSummary,
  }

  console.log('\n📝 Generuję pliki...\n')

  // tworzenie katalogów
  const appDir = path.join(process.cwd(), 'app', id)
  const componentsDir = path.join(process.cwd(), 'components')

  fs.mkdirSync(appDir, { recursive: true })
  fs.mkdirSync(componentsDir, { recursive: true })

  // generowanie plików
  fs.writeFileSync(
    path.join(componentsDir, `${componentName}Kalkulator.tsx`),
    templates.kalkulator(subject)
  )
  console.log(`✓ components/${componentName}Kalkulator.tsx`)

  if (hasWyklad) {
    fs.writeFileSync(
      path.join(componentsDir, `${componentName}Wyklad.tsx`),
      templates.wyklad(subject)
    )
    console.log(`✓ components/${componentName}Wyklad.tsx`)
  }

  if (hasSummary) {
    fs.writeFileSync(
      path.join(componentsDir, `${componentName}Podsumowanie.tsx`),
      templates.podsumowanie(subject)
    )
    console.log(`✓ components/${componentName}Podsumowanie.tsx`)
  }

  fs.writeFileSync(
    path.join(appDir, 'page.tsx'),
    templates.page(subject)
  )
  console.log(`✓ app/${id}/page.tsx`)

  fs.writeFileSync(
    path.join(appDir, 'layout.tsx'),
    templates.layout(subject)
  )
  console.log(`✓ app/${id}/layout.tsx`)

  // aktualizacja app/page.tsx
  const pagePath = path.join(process.cwd(), 'app', 'page.tsx')
  let pageContent = fs.readFileSync(pagePath, 'utf8')

  // znajdź tablicę subjects
  const subjectsMatch = pageContent.match(/const subjects = \[([\s\S]*?)\]/)
  if (subjectsMatch) {
    const subjectsArray = subjectsMatch[1]
    const newSubject = `\n  {\n    id: '${id}',\n    name: '${fullName}',\n    shortName: '${shortName}',\n    description: 'Kalkulator ocen z ${shortName}',\n    icon: Calculator,\n    color: 'bg-${color}-400',\n    available: true,\n  },`

    // dodaj przed ostatnim przedmiotem albo na końcu
    const lastSubjectMatch = pageContent.match(/(\s+)(available: false,)/)
    if (lastSubjectMatch) {
      pageContent = pageContent.replace(
        lastSubjectMatch[0],
        `${newSubject}\n${lastSubjectMatch[1]}available: false,`
      )
    } else {
      // dodaj przed zamknięciem tablicy
      pageContent = pageContent.replace(
        subjectsArray,
        `${subjectsArray}${newSubject}\n`
      )
    }

    fs.writeFileSync(pagePath, pageContent)
    console.log(`✓ app/page.tsx (zaktualizowano listę przedmiotów)`)
  }

  console.log('\n✅ Gotowe! Przedmiot został dodany.')
  console.log(`\n📚 Następne kroki:`)
  console.log(`   1. Dostosuj komponenty w components/${componentName}*.tsx`)
  console.log(`   2. Sprawdź czy wszystko działa: npm run dev`)
  console.log(`   3. Dostosuj kolory i logikę obliczeń według potrzeb\n`)

  rl.close()
}

main().catch((error) => {
  console.error('❌ Błąd:', error)
  rl.close()
  process.exit(1)
})
