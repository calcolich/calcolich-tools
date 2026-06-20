# Calcolich Revenue Plan - CHF 1.500 netti/mese

## Obiettivo economico

- Target netto mensile: CHF 1.500
- Target lordo prudenziale: CHF 2.200
- Motivo: mantenere margine per software, acquisizione, imposte e costi operativi

## Motore ricavi

1. Servizi una tantum
   - 2 pacchetti Business da CHF 990 = CHF 1.980
   - AdSense e piccoli extra coprono la differenza verso il target lordo

2. Ricavi ricorrenti
   - 3 clienti Crescita da CHF 490 = CHF 1.470/mese
   - 1 cliente Presenza Locale da CHF 290 = CHF 1.760/mese
   - AdSense e un progetto Starter portano il totale oltre CHF 2.200

3. Traffico e AdSense
   - funzione: ricavo complementare e prova di domanda
   - priorita: pagine svizzere ad alto intento, non volume generico

## KPI settimanali

- 3 nuove pagine o miglioramenti SEO pubblicati
- 20 contatti diretti ad aziende locali
- 5 richieste commerciali qualificate
- risposta a ogni lead entro 24 ore
- 2 proposte inviate
- 1 vendita ogni 2 settimane nella prima fase

Il consuntivo va aggiornato ogni lunedi in `docs/revenue-scorecard-template.csv`.
Il campo `target_gap_chf` e calcolato come `1500 - month_to_date_net_chf` e mostra quanto manca
al target mensile netto.

## Funnel misurabile

1. Visita a calcolatore
2. Click su `Richiedi analisi gratuita`
3. Visita a `/servizi-ai-seo` con fonte e tool negli URL
4. Invio form tracciato come evento GA `generate_lead`
5. Risposta entro 24 ore
6. Proposta Starter, Business, Lead Engine o piano mensile

Le pagine commerciali generano eventi `commercial_page_view` e i pulsanti verso il
preventivo generano `commercial_cta_click`. Ogni invio del form genera inoltre
`lead_received`, `lead_delivered` o `lead_delivery_failed`. I log includono fonte,
pagina, pacchetto e canale di consegna, ma non contengono email, telefono, IP o
messaggio del contatto.

Metriche del funnel:

- tasso click CTA = `commercial_cta_click / commercial_page_view`
- tasso lead = `lead_received / commercial_page_view`
- tasso chiusura = `sales / qualified_leads`

## Priorita operative

1. Pubblicare i nuovi calcolatori svizzeri gia pronti.
2. Verificare `NEXT_PUBLIC_GA_MEASUREMENT_ID` e conversione `generate_lead`.
3. Creare una lista iniziale di 100 aziende locali con sito debole o assente.
4. Contattare 4 aziende al giorno con analisi specifica, non messaggi generici.
5. Misurare settimanalmente impression, click, lead, proposte, vendite e ricavi.

## Regola decisionale

Ogni nuova funzione deve migliorare almeno una di queste metriche:

- traffico organico qualificato
- tasso di click verso la pagina servizi
- lead ricevuti
- tasso di chiusura
- ricavo medio per cliente
