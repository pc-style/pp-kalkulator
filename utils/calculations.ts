// wspólne funkcje do obliczania ocen
// nie pytaj czemu to działa, działa i tyle

export interface GradeThreshold {
  min: number
  grade: number
}

// standardowa skala dla kolokwium (20 pkt, min 10)
export const DEFAULT_KOLOKWIUM_THRESHOLDS: GradeThreshold[] = [
  { min: 18, grade: 5.0 },
  { min: 16, grade: 4.5 },
  { min: 14, grade: 4.0 },
  { min: 12, grade: 3.5 },
  { min: 10, grade: 3.0 },
]

// skala dla testu (procenty, min 50%)
export const DEFAULT_TEST_THRESHOLDS: GradeThreshold[] = [
  { min: 95, grade: 5.0 },
  { min: 85, grade: 4.5 },
  { min: 75, grade: 4.0 },
  { min: 65, grade: 3.5 },
  { min: 50, grade: 3.0 },
]

// skala dla egzaminu (procenty, min 50%)
export const DEFAULT_EXAM_THRESHOLDS: GradeThreshold[] = [
  { min: 90, grade: 5.0 },
  { min: 80, grade: 4.5 },
  { min: 70, grade: 4.0 },
  { min: 60, grade: 3.5 },
  { min: 50, grade: 3.0 },
]

/**
 * oblicza ocenę na podstawie punktów i progów
 * thresholds powinny być posortowane malejąco (najwyższa ocena najpierw)
 */
export function calculateKolokwiumGrade(
  points: number,
  minPassingPoints: number,
  thresholds: GradeThreshold[]
): number | null {
  if (points < minPassingPoints) return null

  // sprawdzamy progi od najwyższego do najniższego
  for (const threshold of thresholds) {
    if (points >= threshold.min) {
      return threshold.grade
    }
  }

  return null
}

/**
 * oblicza ocenę na podstawie procentów
 * thresholds powinny być posortowane malejąco
 */
export function calculatePercentageGrade(
  percent: number,
  thresholds: GradeThreshold[]
): number | null {
  // sprawdzamy progi od najwyższego do najniższego
  for (const threshold of thresholds) {
    if (percent >= threshold.min) {
      return threshold.grade
    }
  }

  return null
}

/**
 * oblicza bonus z aktywności (0-maxBonus)
 * maxPoints to maksymalna liczba punktów z aktywności
 * maxBonus to maksymalny bonus (np. 1.0 dla +1.0 do oceny)
 */
export function calculateActivityBonus(
  activityPoints: number,
  maxPoints: number,
  maxBonus: number
): number {
  if (maxPoints === 0) return 0
  const bonus = (activityPoints / maxPoints) * maxBonus
  return Math.min(bonus, maxBonus) // nie więcej niż maxBonus
}

/**
 * sprawdza czy ocena jest zaliczona (>= 3.0)
 */
export function isGradePassed(grade: number | null): boolean {
  return grade !== null && grade >= 3.0
}

/**
 * formatuje ocenę na określoną liczbę miejsc po przecinku
 */
export function formatGrade(grade: number | null, decimals: number = 1): string {
  if (grade === null) return 'N/A'
  return grade.toFixed(decimals)
}
