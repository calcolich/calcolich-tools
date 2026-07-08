# Calcolich Project Memory

## Project

- Production: `https://www.calcolich.ch`
- Repository: `calcolich/calcolich-tools`
- Local path: `/Users/giuseppegiordanelli/Documents/Codex/2026-06-13/calcolich-calcolatori/work/calcolich-tools-live`
- Framework: Next.js App Router.

## Route Structure

- Main domain: `https://www.calcolich.ch`
- Locales: `/de`, `/it`, `/en`, `/fr`
- Important rule: keep locale directories static. Do not replace them with dynamic `[lang]`.

## Current German Assets

Priority calculators include:

- `/de/stundenrechner`
- `/de/arbeitszeitrechner`
- `/de/lohnrechner-schweiz`
- `/de/brutto-netto-rechner-schweiz`
- `/de/mehrwertsteuer-rechner-schweiz`
- `/de/prozentrechner`
- `/de/zinsrechner`
- `/de/kreditrechner`
- `/de/budget-rechner-schweiz`
- `/de/ferienrechner-schweiz`

Guide section:

- `/de/ratgeber`
- `/de/ratgeber/mehrwertsteuer-schweiz-2026`
- `/de/ratgeber/stundenlohn-berechnen-schweiz`
- `/de/ratgeber/ferienanspruch-teilzeit-schweiz`
- `/de/ratgeber/pausenregelung-arbeitszeit-schweiz`

## Important Files

- `lib/calculator-model.ts`
- `lib/calculators.ts`
- `lib/german-calculators.ts`
- `components/CalculatorPage.tsx`
- `content/de/ratgeber/`
- `app/de/`

## Verification

For site changes:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

