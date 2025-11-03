// hook do synchronizacji stanu z URL query params
// do share-owania linków z zapisanymi wartościami

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * hook do synchronizacji stanu z URL query params
 * @param key - nazwa parametru w URL (np. 'kolokwium')
 * @param initialValue - wartość początkowa
 * @param serialize - funkcja do serializacji wartości do stringa (default: String)
 * @param deserialize - funkcja do deserializacji wartości z stringa (default: Number dla liczby, String dla tekstu)
 * @returns [value, setValue, shareUrl] - wartość, setter, i funkcja do generowania share URL
 */
export function useUrlState<T>(
  key: string,
  initialValue: T,
  serialize?: (value: T) => string,
  deserialize?: (str: string) => T
): [T, (value: T) => void, () => string] {
  const router = useRouter()
  const searchParams = useSearchParams()

  // domyślne serialize/deserialize
  const defaultSerialize = (val: T): string => {
    if (typeof val === 'number') return val.toString()
    return String(val)
  }

  const defaultDeserialize = (str: string): T => {
    // spróbuj parsować jako liczbę
    const num = Number(str)
    if (!isNaN(num) && str.trim() !== '') {
      return num as T
    }
    return str as T
  }

  const serializeFn = serialize || defaultSerialize
  const deserializeFn = deserialize || defaultDeserialize

  // odczytaj z URL przy mount
  const getInitialValue = (): T => {
    const param = searchParams.get(key)
    if (param !== null) {
      try {
        return deserializeFn(param)
      } catch (error) {
        console.warn(`Nie można deserializować ${key} z URL:`, error)
        return initialValue
      }
    }
    return initialValue
  }

  const [value, setValueState] = useState<T>(getInitialValue)

  // zaktualizuj URL gdy zmieni się wartość
  const setValue = (newValue: T) => {
    setValueState(newValue)

    try {
      const params = new URLSearchParams(searchParams.toString())
      const serialized = serializeFn(newValue)

      // jeśli wartość to initialValue, usuń param (żeby URL był czystszy)
      if (serialized === serializeFn(initialValue)) {
        params.delete(key)
      } else {
        params.set(key, serialized)
      }

      // użyj replace żeby nie dodawać do historii
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname

      router.replace(newUrl, { scroll: false })
    } catch (error) {
      console.warn(`Nie można zaktualizować URL dla ${key}:`, error)
    }
  }

  // funkcja do generowania share URL
  const shareUrl = (): string => {
    try {
      const params = new URLSearchParams(searchParams.toString())
      params.set(key, serializeFn(value))

      return `${window.location.origin}${window.location.pathname}?${params.toString()}`
    } catch (error) {
      console.warn(`Nie można wygenerować share URL dla ${key}:`, error)
      return window.location.href
    }
  }

  // zaktualizuj stan gdy zmieni się URL (np. back/forward)
  useEffect(() => {
    const param = searchParams.get(key)
    if (param !== null) {
      try {
        const newValue = deserializeFn(param)
        setValueState(newValue)
      } catch (error) {
        // ignore - już mamy wartość w stanie
      }
    } else if (value !== initialValue) {
      // jeśli param został usunięty z URL, reset do initialValue
      setValueState(initialValue)
    }
  }, [searchParams, key]) // eslint-disable-line react-hooks/exhaustive-deps

  return [value, setValue, shareUrl]
}

/**
 * hook do synchronizacji wielu wartości jednocześnie
 * używa obiektu do przechowywania wszystkich wartości
 */
export function useUrlStateMultiple<T extends Record<string, unknown>>(
  initialValues: T,
  serializeMap?: Partial<{ [K in keyof T]: (value: T[K]) => string }>,
  deserializeMap?: Partial<{ [K in keyof T]: (str: string) => T[K] }>
): [T, (updates: Partial<T>) => void, () => string] {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [values, setValues] = useState<T>(() => {
    const result = { ...initialValues }
    Object.keys(initialValues).forEach((key) => {
      const param = searchParams.get(key)
      if (param !== null) {
        try {
          const deserialize = deserializeMap?.[key as keyof T] || ((str: string) => {
            const num = Number(str)
            return (isNaN(num) ? str : num) as T[keyof T]
          })
          result[key as keyof T] = deserialize(param) as T[keyof T]
        } catch (error) {
          // użyj initialValue w przypadku błędu
        }
      }
    })
    return result
  })

  const updateValues = (updates: Partial<T>) => {
    setValues((prev) => {
      const newValues = { ...prev, ...updates }
      
      const params = new URLSearchParams(searchParams.toString())
      Object.keys(updates).forEach((key) => {
        const serialize = serializeMap?.[key as keyof T] || String
        const value = newValues[key as keyof T]
        const serialized = serialize(value as T[keyof T])

        if (serialized === serialize(initialValues[key as keyof T] as T[keyof T])) {
          params.delete(key)
        } else {
          params.set(key, serialized)
        }
      })

      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname

      router.replace(newUrl, { scroll: false })
      return newValues
    })
  }

  const shareUrl = (): string => {
    const params = new URLSearchParams()
    Object.keys(values).forEach((key) => {
      const serialize = serializeMap?.[key as keyof T] || String
      const value = values[key as keyof T]
      const serialized = serialize(value as T[keyof T])
      if (serialized !== serialize(initialValues[key as keyof T] as T[keyof T])) {
        params.set(key, serialized)
      }
    })
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`
  }

  return [values, updateValues, shareUrl]
}
