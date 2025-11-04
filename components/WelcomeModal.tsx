'use client'

import { useState, useEffect } from 'react'
import { usePersistedState } from '@/hooks/usePersistedState'
import { GraduationCap, Calculator, Sparkles } from 'lucide-react'

export default function WelcomeModal() {
  const [hasSeenWelcome, setHasSeenWelcome] = usePersistedState<boolean>('welcome-seen', false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // pokazujemy modal tylko jeśli użytkownik nie widział go wcześniej
    if (!hasSeenWelcome) {
      setIsVisible(true)
    }
  }, [hasSeenWelcome])

  const handleDismiss = () => {
    setHasSeenWelcome(true)
    setIsVisible(false)
  }

  // nie renderuj jeśli już widziane lub jeszcze nie sprawdziliśmy
  if (!isVisible || hasSeenWelcome) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 p-8 overflow-y-auto">
      {/* główna karta powitalna */}
      <div className="max-w-4xl w-full space-y-6">
        {/* nagłówek z uniwersytetem */}
        <div className="neo-card bg-pink-300 neo-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <GraduationCap className="w-16 h-16 flex-shrink-0" />
            <div>
              <h1 className="text-5xl md:text-7xl font-black mb-2">
                Witaj na Politechnice Częstochowskiej!
              </h1>
              <p className="text-2xl font-bold">Studencie, ciesz się kalkulatorami</p>
            </div>
          </div>
        </div>

        {/* opis z ikonkami */}
        <div className="neo-card bg-yellow-100 neo-fade-in neo-stagger-1">
          <div className="flex items-start gap-4">
            <Calculator className="w-12 h-12 flex-shrink-0 mt-2" />
            <div>
              <h2 className="text-3xl font-black mb-3">Co tu znajdziesz?</h2>
              <p className="text-lg font-bold mb-2">
                Kalkulatory ocen z różnych przedmiotów - wszystko w jednym miejscu.
              </p>
              <p className="text-base">
                Wystarczy wpisać swoje punkty i zobaczyć, jaką ocenę dostaniesz. 
                Proste, szybkie i bez zbędnych komplikacji.
              </p>
            </div>
          </div>
        </div>

        {/* karta z stylistyką */}
        <div className="neo-card bg-blue-100 neo-fade-in neo-stagger-2">
          <div className="flex items-start gap-4">
            <Sparkles className="w-12 h-12 flex-shrink-0 mt-2" />
            <div>
              <h2 className="text-3xl font-black mb-3">Neobrutalizm w akcji</h2>
              <p className="text-base">
                Ta strona używa stylu neobrutalizmu - grube obramowania, 
                żywe kolory i ciężkie cienie. Nie znajdziesz tu płynnych przejść 
                i pastelowych kolorów. Tylko hardcore design.
              </p>
            </div>
          </div>
        </div>

        {/* przycisk rozpocznij */}
        <div className="flex justify-center neo-fade-in neo-stagger-3">
          <button
            onClick={handleDismiss}
            className="neo-button text-2xl px-12 py-6"
          >
            ROZPOCZNIJ
          </button>
        </div>

        {/* mała notka o autorze */}
        <div className="text-center mt-8 neo-fade-in neo-stagger-4">
          <p className="text-sm text-gray-600 lowercase">
            hej, to ja adam krupa - zrobiłem to żeby było łatwiej liczyć oceny. miłego używania!
          </p>
        </div>
      </div>
    </div>
  )
}

