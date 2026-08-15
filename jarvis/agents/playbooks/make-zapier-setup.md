# Make/Zapier Setup

## Lead Proprietari

Webhook: `LEADS_WEBHOOK_URL`

Azioni:

1. ricevi payload da `/api/leads`;
2. salva email, consenso, source, segment, interest, leadMagnet, page, referrer e UTM;
3. assegna il tag dal campo `jarvis.segmentId` (`tax_salary_ch`, `mortgage_ch`, `pension_tax_ch` o fallback);
4. iscrivi alla lista newsletter corretta;
5. avvia la sequenza indicata in `jarvis.followUpSequence`;
6. salva riga in Google Sheet o CRM.

## Eventi Funnel

Webhook: endpoint esistente `/api/events` e logging analytics.

Azioni:

1. salva eventi di calcolo, lead e click partner;
2. aggrega per pagina, calcolatore, partner e segmento;
3. calcola conversione visita -> calcolo -> lead -> click partner.

## Conversioni Affiliate

Webhook: `CONVERSIONS_WEBHOOK_URL`

Azioni:

1. ricevi conversioni confermate da import manuale, Adtraction o report partner;
2. salva partner, conversionId, status, amount e currency;
3. collega conversione a calculatorSlug e segment quando disponibili;
4. aggiorna revenue per 1'000 visite;
5. manda a Jarvis un task di ottimizzazione se una pagina converte sopra media.

Note:

- I link partner 3a sono visibili solo se `NEXT_PUBLIC_FRANKLY_AFFILIATE_URL` o `NEXT_PUBLIC_YUH_AFFILIATE_URL` contengono URL reali e approvati.
- Non inserire link inventati: se un programma affiliate non e approvato, lasciare lo spazio partner in stato riservato.
