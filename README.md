# kalkulatory pcz

hej, to jest strona do liczenia ocen z przedmiotów na politechnice częstochowskiej. 
zrobiłem to bo miałem dość liczenia w excelu. działa i tyle.

## co tu jest

### ✅ podstawy programowania (pp)
kompletny kalkulator z trzema zakładkami:
- **laboratorium**: punkty z aktywności, współczynniki (as, p), oceny z kolokwiów i końcowa ocena L
- **wykład**: ocena z testu końcowego, ocena z kursu (K) i końcowa ocena z całego przedmiotu (Ok)
- **podsumowanie**: wszystko w jednym miejscu, żeby było wiadomo czy zaliczone czy nie

### ✅ algebra liniowa i geometria (alg)
dwie zakładki:
- **ćwiczenia**: kolokwium (max 20 pkt) + aktywność przy tablicy + prace grupowe
- **wykład**: kolokwium zaliczeniowe (quizy nie liczą się do oceny końcowej, sorry)

### ✅ podstawy analizy matematycznej (pam)
- kolokwium (max 20 pkt, min 10 pkt na zaliczenie)
- aktywność przy tablicy
- prace wykonywane w grupach
- system bonusów z aktywności - można podbić ocenę!

### ⏳ wkrótce dostępne
- aisd - algorytmy i struktury danych (jak będę miał czas)
- faipe - foundations of ai and prompt engineering
- prakp - praktyka programowania

## technologie

- **next.js 16** (app router) - działa dobrze, nie pytaj czemu
- **react 19** - najnowsze rzeczy
- **typescript** - żeby było mniej błędów
- **tailwind css 3.4.1** - szybkie stylowanie
- **lucide-react** - ikony, są fajne

## jak to uruchomić lokalnie

```bash
npm install
npm run dev
```

otwórz `http://localhost:3000` i gotowe. proste, prawda?

## deployment na vercel

1. wrzuć kod na github
2. połącz z vercel (zrobi to automatycznie dla next.js)
3. czekaj aż się zbuduje
4. działa!

albo użyj cli:
```bash
npm install -g vercel
vercel
```

## styl ui - neo-brutalism

strona używa stylu neo-brutalism bo wygląda cool:
- grube obramowania (4-6px border-black) - wygląda jakby ktoś użył flamastra
- mocne cienie (shadow offset 8px/12px) - wszystko się wygląda jak z kartki
- płaskie kolory (żółty, różowy, niebieski, fioletowy) - żywe, bez gradientów
- duże nagłówki i inputy - łatwo kliknąć
- responsywne (mobile: 1 kolumna, desktop: multi-column) - działa na telefonie też

nie ma tu płynnych przejść i pastelowych kolorów. tylko hardcore design.

## dodawanie nowych przedmiotów

1. dodaj przedmiot do `app/page.tsx` w tablicy `subjects`
2. ustaw `available: true` (inaczej będzie szare i nieaktywne)
3. stwórz katalog `app/{id}/` (np. `app/aisd/`)
4. dodaj komponent kalkulatora w `components/`
5. zbuduj stronę `page.tsx` z zakładkami (jeśli chcesz)

kod jest open source, więc możesz sobie zrobić fork i dodać swoje przedmioty. 
jak zrobisz coś fajnego, zrób pull request - może wrzucę to do głównego repo.

## struktura projektu

```
app/
├── page.tsx          # menu główne (tutaj wybierasz przedmiot)
├── pp/page.tsx       # kalkulator pp
├── alg/page.tsx      # kalkulator alg
└── pam/page.tsx      # kalkulator pam

components/
├── Laboratorium.tsx      # pp - laboratorium
├── Wyklad.tsx            # pp - wykład
├── Podsumowanie.tsx      # pp - podsumowanie
├── AlgebraKalkulator.tsx # alg - ćwiczenia
├── AlgebraWyklad.tsx     # alg - wykład
└── PAMKalkulator.tsx     # pam
```

## licencja

open source - użyj jak chcesz. jeśli coś zmienisz i będzie lepsze, daj znać.

---

made by adam krupa. miłego używania!
