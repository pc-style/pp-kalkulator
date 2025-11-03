# Kalkulator PP - Podstawy Programowania

Aplikacja webowa do obliczania punktów i ocen z przedmiotu "Podstawy Programowania" (Politechnika Częstochowska).

## Funkcje

- **Zakładka Laboratorium**: obliczanie punktów z aktywności, współczynników (as, p), ocen z kolokwiów i końcowej oceny L
- **Zakładka Wykład**: obliczanie oceny z testu końcowego, oceny z kursu (K) i końcowej oceny z całego przedmiotu (Ok)
- **Zakładka Podsumowanie**: zbiorczy widok wszystkich ocen i statusu zaliczenia

## Technologie

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
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

## Styl

Aplikacja używa stylu **neo-brutalism**:
- grube obramowania (4px)
- mocne cienie (shadow offset)
- płaskie kolory (żółty, różowy, niebieski akcent)
- duże, czytelne elementy UI

## Licencja

Open source - użyj jak chcesz.
