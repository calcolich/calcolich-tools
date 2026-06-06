# Calcolich Tools

Sistema di calcolatori SEO per generare traffico organico, lead e prime entrate online.

## Stato attuale

Il progetto include:

- struttura scalabile data-driven in `lib/calculators.ts`
- renderer unico in `components/CalculatorPage.tsx`
- widget interattivo unico in `components/CalculatorWidget.tsx`
- 10 calcolatori prioritari con SEO, articolo, FAQ, CTA, internal links e JSON-LD
- sitemap e robots
- landing servizi AI/SEO
- cartella contenuti ForexFundingGenius
- script base per generare asset contenuto da un nuovo calcolatore
- automazione batch per creare nuovi tool da blueprint JSON
- Google Analytics e Google AdSense configurabili da Vercel

## Calcolatori attivi

Il catalogo principale vive in `lib/calculators.ts`.

Sono gia attivi i 10 calcolatori prioritari iniziali piu i tool generati in batch da
`scripts/calculator-blueprints.json`.

## Cosa mancava

- struttura centrale per aggiungere 100+ tool
- metadata SEO coerenti per ogni calcolatore
- FAQ e JSON-LD
- CTA newsletter
- internal linking
- pagine trading per monetizzazione con contenuti YouTube
- landing per vendere servizi AI/SEO
- processo di automazione contenuti

## Roadmap tecnica

1. Portare tutti i calcolatori storici nel catalogo `lib/calculators.ts`.
2. Aggiungere nuove formule in `components/CalculatorWidget.tsx`.
3. Creare cluster SEO:
   - lavoro Svizzera
   - stipendio netto/lordo
   - business e IVA
   - finanza personale
   - trading e prop firm
4. Collegare newsletter reale.
5. Collegare modulo contatto a email, CRM o Google Sheet.
6. Aggiungere analytics e Search Console.
7. Pubblicare 5-10 nuovi tool a settimana.

## Come aggiungere un nuovo calcolatore

Metodo manuale:

1. Aggiungi una voce in `lib/calculators.ts`.
2. Inserisci `slug`, titolo, SEO, intro, input, articolo, FAQ e related links.
3. Se serve una nuova formula, aggiungi un caso nello switch di `components/CalculatorWidget.tsx`.
4. La pagina sara disponibile automaticamente su:

```text
https://calcolich.ch/<slug>
```

Metodo automatico batch:

1. Aggiungi uno o piu oggetti in `scripts/calculator-blueprints.json`.
2. Usa una formula gia supportata da `components/CalculatorWidget.tsx`, per esempio:
   - `percentage`
   - `discount`
   - `percentage-change`
   - `margin-markup`
   - `roi`
   - `break-even`
   - `loan-payment`
   - `profit-loss`
   - `risk-reward`
   - `savings-goal`
   - `hourly-cost`
   - `annual-monthly`
3. Lancia:

```bash
npm run tools:add
```

Lo script aggiunge i nuovi tool a `lib/calculators.ts` e crea asset in `generated/<slug>/`:

- articolo
- FAQ
- post social
- script Short YouTube
- email newsletter

## Generare asset contenuto

```bash
node scripts/generate-calculator-assets.mjs "nuovo-slug" "Titolo Calcolatore" "Categoria"
```

Output:

- articolo
- FAQ
- post social
- script Short YouTube
- email newsletter

## Verifica locale

Usare prima:

```bash
npm run lint
npm run build
```

Se `next dev` genera `EMFILE: too many open files`, chiudere:

```bash
pkill -f "next dev"
pkill -f "curl"
```

Poi riprovare solo dopo che il Mac e stabile.

## Analytics e AdSense

Il sito legge gli ID da variabili ambiente, cosi non bisogna modificare codice per cambiare account.

Su Vercel vai in:

```text
Project Settings -> Environment Variables
```

Aggiungi:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CALCULATOR_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT=1234567890
NEXT_PUBLIC_CONTACT_EMAIL=calcolich@gmail.com
LEADS_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-url
LEADS_WEBHOOK_SECRET=change-this-secret
```

Poi fai un nuovo deploy.

Quando `NEXT_PUBLIC_ADSENSE_CLIENT_ID` e presente, il sito genera anche:

```text
https://calcolich.ch/ads.txt
```

Questo aiuta Google AdSense a verificare il publisher.

Gli slot `NEXT_PUBLIC_ADSENSE_CALCULATOR_SLOT` e `NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT`
servono per inserire annunci nelle pagine calcolatore. Se non sono presenti, il sito
carica solo lo script AdSense/Auto Ads.

## Lead e contatti

I form del sito inviano i contatti a:

```text
/api/leads
```

Se `LEADS_WEBHOOK_URL` e configurato, il sito inoltra i lead a Make/Zapier/Google Sheet.
Se non e configurato, il form usa come fallback una email a:

```text
calcolich@gmail.com
```

Per una macchina cashflow vera, il setup consigliato e:

1. creare un Google Sheet con account `calcolich@gmail.com`
2. creare un webhook Make
3. salvare ogni lead nel Google Sheet
4. mandare una email di notifica a `calcolich@gmail.com`
5. rispondere entro 24 ore ai lead servizi AI/SEO

## Pubblicazione

Quando i controlli passano:

```bash
git add .
git commit -m "add calculator automation and new tools"
git push origin main
```
