# Calcolich Cashflow Machine

Obiettivo: trasformare Calcolich in una macchina semplice per traffico, lead e prime entrate.

## Account centrale

Usare `calcolich@gmail.com` come account operativo per:

- Google Search Console
- Google Analytics
- Google AdSense
- notifiche lead
- Google Sheet contatti
- Make/Zapier per automazioni

## Flusso traffico

1. Pubblicare calcolatori SEO.
2. Ogni calcolatore ha CTA newsletter.
3. Ogni contenuto YouTube/Short rimanda a un calcolatore.
4. Ogni calcolatore rimanda a strumenti collegati.
5. Le pagine servizi raccolgono richieste per pacchetti pagati.

## Flusso lead

Il sito invia i contatti a:

```text
POST /api/leads
```

L'endpoint puo inoltrare tutto a un webhook esterno tramite:

```text
LEADS_WEBHOOK_URL
LEADS_WEBHOOK_SECRET
```

Setup consigliato Make:

1. Crea scenario Make.
2. Modulo iniziale: Custom Webhook.
3. Copia URL webhook.
4. Inserisci URL su Vercel come `LEADS_WEBHOOK_URL`.
5. Azioni successive:
   - aggiungi riga su Google Sheet
   - manda email a `calcolich@gmail.com`
   - opzionale: manda notifica Telegram/WhatsApp

## Google Sheet lead

Colonne consigliate:

```text
createdAt
source
name
email
phone
packageName
message
page
site
status
nextAction
value
```

Status consigliati:

```text
new
contacted
proposal_sent
won
lost
newsletter
```

## Priorita entrate

1. Servizi AI/SEO: prima vendita possibile 490-1.990.
2. Newsletter: costruzione asset proprietario.
3. AdSense: monetizzazione traffico organico.
4. Affiliate trading/prop firm: monetizzazione contenuti ForexFundingGenius.
5. Prodotti digitali: template, checklist, mini-guide.

## Routine settimanale

Lunedi:
- pubblicare 5 nuovi calcolatori
- mandare sitemap a Search Console

Martedi:
- creare 10 Shorts da `forexfundinggenius/content-plan.md`
- CTA verso calcolatori trading

Mercoledi:
- contattare 20 aziende Svizzera/Puglia per servizi AI/SEO
- usare script WhatsApp nella landing

Giovedi:
- controllare Analytics e Search Console
- segnare tool con impression ma CTR basso

Venerdi:
- migliorare titoli/meta dei tool che ricevono impression
- pubblicare 1 articolo guida lungo

## Variabili Vercel

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT=
NEXT_PUBLIC_ADSENSE_CALCULATOR_SLOT=
NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT=
NEXT_PUBLIC_CONTACT_EMAIL=calcolich@gmail.com
LEADS_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-url
LEADS_WEBHOOK_SECRET=change-this-secret
RESEND_API_KEY=re_XXXXXXXXXXXXXXXX
LEADS_TO_EMAIL=calcolich@gmail.com
LEADS_FROM_EMAIL=onboarding@resend.dev
```

## Email automatiche lead

Ci sono tre livelli:

1. `LEADS_WEBHOOK_URL` configurato: il lead va a Make/Zapier/Google Sheet.
2. `RESEND_API_KEY` configurato: il lead viene inviato via email a `LEADS_TO_EMAIL`.
3. Nessuno dei due configurato: il sito apre una bozza email sul dispositivo dell'utente.

Formato email Resend:

- oggetto: `[Calcolich] Nuovo lead Fonte - Contatto`
- corpo HTML con priorita, fonte, dati contatto, richiesta e pagina di provenienza
- corpo testo come fallback
- risposta diretta al lead quando l'email e presente

Per ricevere subito email automatiche su `calcolich@gmail.com`, usare Resend:

- creare account Resend
- creare API key
- inserirla in Vercel come `RESEND_API_KEY`
- impostare `LEADS_TO_EMAIL=calcolich@gmail.com`

Nota operativa 2026-06-16:

- `RESEND_API_KEY` risulta presente su Vercel ma Resend risponde `API key is invalid`.
- Il codice ripulisce valori Vercel inseriti nel formato `NOME_VARIABILE = valore`.
- Finche la chiave Resend non viene rigenerata, il form apre un fallback `mailto` invece di mostrare errore tecnico all'utente.
- Anche se `RESEND_API_KEY` viene rimossa, il form apre il fallback `mailto` e non mostra un falso successo.
- Per attivare le email automatiche reali: generare una nuova API key Resend valida e sostituire `RESEND_API_KEY` in Production e Preview.

## AdSense

Prima fase:

- attivare account AdSense con `calcolich@gmail.com`
- aggiungere `calcolich.ch`
- inserire `NEXT_PUBLIC_ADSENSE_CLIENT`
- aspettare approvazione Google

Seconda fase:

- creare slot display responsive in AdSense
- inserire gli ID slot in Vercel:
  - `NEXT_PUBLIC_ADSENSE_CALCULATOR_SLOT`
  - `NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT`

Il sito posiziona gli annunci:

- dopo il calcolatore
- dentro la guida prima delle FAQ

## Analytics

Creare GA4 con account `calcolich@gmail.com`.

Evento minimo da controllare ogni settimana:

- pagine piu viste
- calcolatori con piu traffico
- sorgenti traffico
- query Search Console con impression alte e CTR basso
