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

## Calcolatori attivi

1. Calcolatore ore lavorate
2. Calcolatore stipendio netto Svizzera
3. Calcolatore lordo-netto Svizzera
4. Calcolatore ferie Svizzera
5. Calcolatore IVA Svizzera
6. Calcolatore interessi composti
7. Calcolatore mutuo Svizzera
8. Calcolatore rischio trading
9. Calcolatore lot size forex
10. Calcolatore drawdown

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

1. Aggiungi una voce in `lib/calculators.ts`.
2. Inserisci `slug`, titolo, SEO, intro, input, articolo, FAQ e related links.
3. Se serve una nuova formula, aggiungi un caso nello switch di `components/CalculatorWidget.tsx`.
4. La pagina sara disponibile automaticamente su:

```text
https://calcolich.ch/<slug>
```

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

## Pubblicazione

Quando i controlli passano:

```bash
git add .
git commit -m "add scalable calculator system and growth assets"
git push origin main
```
