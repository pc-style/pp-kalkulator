import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kalkulator PAM - Podstawy Analizy Matematycznej',
  description: 'Kalkulator ocen z Podstaw Analizy Matematycznej (PAM) - Politechnika Częstochowska',
}

export default function PAMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
