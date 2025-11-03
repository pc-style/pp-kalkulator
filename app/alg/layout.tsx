import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kalkulator ALG - Algebra Liniowa i Geometria',
  description: 'Kalkulator ocen z Algebry Liniowej i Geometrii (ALG) - Politechnika Częstochowska',
}

export default function ALGLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
