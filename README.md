# Kalkulatory PCz

Aplikacja webowa do obliczania punktów i ocen z przedmiotów na Politechnice Częstochowskiej.

## Dostępne kalkulatory

### ✅ Podstawy Programowania (PP)
Kompleksowy kalkulator z trzema zakładkami:
- **Laboratorium**: punkty z aktywności, współczynniki (as, p), oceny z kolokwiów i końcowa ocena L
- **Wykład**: ocena z testu końcowego, ocena z kursu (K) i końcowa ocena z całego przedmiotu (Ok)
- **Podsumowanie**: zbiorczy widok wszystkich ocen i statusu zaliczenia

### ✅ Algebra Liniowa i Geometria (ALG)
Kalkulator z dwiema zakładkami:
- **Ćwiczenia**: kolokwium (max 20 pkt) + aktywność przy tablicy + prace grupowe
- **Wykład**: kolokwium zaliczeniowe (quizy nie liczą się do oceny końcowej)

### ✅ Podstawy Analizy Matematycznej (PAM)
- Kolokwium (max 20 pkt, min 10 pkt na zaliczenie)
- Aktywność przy tablicy
- Prace wykonywane w grupach
- System bonusów z aktywności

### ⏳ Wkrótce dostępne
- AiSD - Algorytmy i Struktury Danych
- FAIPE - Foundations of AI and Prompt Engineering
- PrakP - Praktyka Programowania

## Technologie

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 3.4.1**
- **lucide-react** (ikony)

## Uruchomienie lokalnie

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`

## Deployment na Vercel

1. Wrzuć kod do repozytorium GitHub
2. Połącz z Vercel
3. Vercel automatycznie wykryje Next.js i zbuduje aplikację
4. Gotowe!

Lub użyj Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Styl UI - Neo-Brutalism

Aplikacja używa stylu **neo-brutalism**:
- Grube obramowania (4px border-black)
- Mocne cienie (shadow offset 8px/4px)
- Płaskie kolory (żółty, różowy, niebieski, fioletowy)
- Duże nagłówki i inputy
- Brak gradientów, wszystko płaskie i czytelne
- Responsywne (mobile: 1 kolumna, desktop: multi-column)

## Dodawanie nowych przedmiotów

1. Dodaj przedmiot do `app/page.tsx` w tablicy `subjects`
2. Ustaw `available: true`
3. Stwórz katalog `app/{id}/` (np. `app/aisd/`)
4. Dodaj komponent kalkulatora w `components/`
5. Zbuduj stronę `page.tsx` z zakładkami (opcjonalnie)

## Struktura projektu

```
app/
├── page.tsx          # Menu główne
├── pp/page.tsx       # Kalkulator PP
├── alg/page.tsx      # Kalkulator ALG
└── pam/page.tsx      # Kalkulator PAM

components/
├── Laboratorium.tsx      # PP - Laboratorium
├── Wyklad.tsx            # PP - Wykład
├── Podsumowanie.tsx      # PP - Podsumowanie
├── AlgebraKalkulator.tsx # ALG - Ćwiczenia
├── AlgebraWyklad.tsx     # ALG - Wykład
└── PAMKalkulator.tsx     # PAM
```

## Licencja

Open source - użyj jak chcesz.
