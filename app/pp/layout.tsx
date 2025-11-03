import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kalkulator PP - Podstawy Programowania',
  description: 'Kalkulator punktów i ocen z Podstaw Programowania (PP) - Politechnika Częstochowska',
}

export default function PPLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
