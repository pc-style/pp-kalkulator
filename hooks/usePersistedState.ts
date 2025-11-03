// hook do zapisywania stanu w localStorage
// auto-save, auto-restore, error handling

import { useState, useEffect } from 'react'

/**
 * hook do persystencji stanu w localStorage
 * @param key - klucz w localStorage (powinien być unikalny per przedmiot/komponent)
 * @param initialValue - wartość początkowa jeśli nie ma w localStorage
 * @returns [value, setValue] jak useState, ale z auto-save
 */
export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // funkcja do bezpiecznego odczytu z localStorage
  const readValue = (): T => {
    try {
      if (typeof window === 'undefined') {
        return initialValue
      }
      const item = window.localStorage.getItem(key)
      if (item === null) {
        return initialValue
      }
      return JSON.parse(item)
    } catch (error) {
      // jak coś się zepsuje, wróć do initialValue
      console.warn(`Nie można odczytać ${key} z localStorage:`, error)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState<T>(readValue)

  // zapisz do localStorage przy każdej zmianie
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      // obsłuż funkcje aktualizujące jak setState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // quota exceeded, private browsing, etc.
      console.warn(`Nie można zapisać ${key} do localStorage:`, error)
      // mimo to zaktualizuj stan (działa tylko w pamięci)
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
    }
  }

  // przy pierwszym mount, sprawdź czy są zmiany w localStorage z innej karty
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.warn(`Nie można odczytać ${key} z storage event:`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue]
}

/**
 * funkcja pomocnicza do czyszczenia konkretnego klucza
 */
export function clearPersistedState(key: string): void {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
    }
  } catch (error) {
    console.warn(`Nie można usunąć ${key} z localStorage:`, error)
  }
}
