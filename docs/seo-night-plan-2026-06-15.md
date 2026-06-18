# Calcolich SEO Night Plan - 2026-06-15

## Stato attuale

- Dominio live: https://calcolich.ch
- Progetto Vercel live: `calcolich-tools`
- Search Console: proprieta `sc-domain:calcolich.ch` attiva
- Sitemap inviata: `https://calcolich.ch/sitemap.xml`
- AdSense: configurato con `ca-pub-4502757971319425`
- ads.txt live: `google.com, pub-4502757971319425, DIRECT, f08c47fec0942fa0`

## Interventi fatti stanotte

- Aggiunto footer globale a tutte le pagine.
- Aggiunte pagine istituzionali:
  - `/chi-siamo`
  - `/privacy`
  - `/cookie`
  - `/disclaimer`
  - `/contatti`
- Aggiunte le pagine istituzionali alla sitemap.
- Migliorata la homepage con blocco categorie prima della griglia completa.
- Aggiunte pagine hub categoria:
  - `/categorie/stipendio-lavoro`
  - `/categorie/casa-budget`
  - `/categorie/business-freelance`
  - `/categorie/trading`
  - `/categorie/finanza`
- Collegate le categorie dalla homepage e dal footer globale.
- Aggiunte le categorie alla sitemap.
- Deploy produzione completato su Vercel.
- Sitemap reinviata in Search Console dopo il deploy.
- Aggiunte prime guide editoriali SEO:
  - `/guide/stipendio-netto-svizzera`
  - `/guide/costo-vita-svizzera`
  - `/guide/freelance-svizzera`
  - `/guide/risk-management-trading`
- Collegate le guide dalla homepage e dal footer.
- Aggiunte le guide alla sitemap.
- Secondo deploy produzione completato su Vercel con 93 pagine generate.
- Sitemap reinviata in Search Console dopo il secondo deploy.
- Search Console ha mostrato la sitemap `https://calcolich.ch/sitemap.xml` con stato `Erfolgreich` e 82 pagine rilevate prima dell'ultimo reinvio.
- Aggiunta pagina indice `/guide`.
- Collegato il footer a `/guide` invece che a una singola guida.
- Aggiunti link alle guide correlate nelle pagine categoria.
- Aggiunto schema `Article` e `BreadcrumbList` alle guide.
- Deploy produzione completato su Vercel con 94 pagine generate.
- Sitemap reinviata in Search Console dopo l'aggiunta dell'indice guide.
- Aggiunte altre guide SEO:
  - `/guide/imposta-alla-fonte-svizzera`
  - `/guide/cassa-malati-svizzera`
  - `/guide/affitto-sostenibile-svizzera`
  - `/guide/terzo-pilastro-risparmio-fiscale`
- Deploy produzione completato su Vercel con 98 pagine generate.
- Verificato che le nuove guide siano live e presenti nella sitemap.
- Search Console ha mostrato `Erfolgreich` e 87 pagine rilevate; il reinvio finale della sitemap e stato tentato, ma il browser integrato ha bloccato la digitazione nel campo Google per clipboard virtuale non disponibile.
- Migliorato formato email lead:
  - oggetto piu chiaro con fonte e contatto
  - email HTML leggibile
  - fallback testo
  - `reply_to` impostato sul lead quando disponibile
  - fallback `mailto` piu ordinato
- Verificato Vercel env lead:
  - `RESEND_API_KEY`, `LEADS_TO_EMAIL`, `LEADS_FROM_EMAIL` presenti
  - i valori email erano stati inseriti con prefisso `NOME_VARIABILE =`, ora il codice li ripulisce
  - Resend rifiuta comunque la chiave con `API key is invalid`
  - finche non viene rigenerata una chiave valida, il form usa fallback `mailto` senza errore tecnico per l'utente
- Test live `/api/leads` completato dopo il fix: risposta `ok: true`, `configured: false`, `emailFallback: true`.
- Prossima azione email: rigenerare una API key Resend valida e sostituire `RESEND_API_KEY` su Vercel in Production e Preview.
- Blindato fallback contatti: anche senza `RESEND_API_KEY`, il form apre `mailto` invece di mostrare falso invio riuscito.
- Rafforzato internal linking SEO dai calcolatori commerciali verso le guide:
  - stipendio netto e lordo netto verso guide stipendio/imposta alla fonte
  - imposta alla fonte verso guide fiscali e stipendio
  - cassa malati, affitto sostenibile e budget mensile verso guide costo vita/casa
- Aggiunti tre calcolatori svizzeri basati su fonti ufficiali:
  - `/calcolo-tredicesima-avs-2026`
  - `/calcolo-contributi-avs-indipendenti`
  - `/calcolo-indennita-maternita-svizzera`
- Collegati i nuovi strumenti alle categorie finanza, business e stipendio/lavoro; inclusione sitemap automatica.
- Aggiunto secondo blocco di calcolatori sociali svizzeri:
  - `/calcolo-indennita-disoccupazione-svizzera`
  - `/calcolo-pensione-avs-stimata`
  - `/calcolo-indennita-altro-genitore-svizzera`

## Priorita SEO prossime

1. Rafforzare le pagine con maggiore intento commerciale:
   - `/calcolo-salario-netto-svizzera`
   - `/calcolo-lordo-netto-svizzera`
   - `/calcolo-imposta-alla-fonte-svizzera`
   - `/calcolo-cassa-malati-svizzera`
   - `/calcolo-affitto-sostenibile-svizzera`

2. Creare cluster contenuti:
   - stipendio Svizzera
   - budget e costo vita Svizzera
   - freelance e business
   - trading risk management

   Stato: avviato con gli hub categoria. Prossimo passo: aggiungere guide editoriali lunghe e collegarle agli hub.

3. Aggiungere pagine guida non-calcolatore:
   - `/guide/stipendio-netto-svizzera`
   - `/guide/costo-vita-svizzera`
   - `/guide/freelance-svizzera`
   - `/guide/risk-management-trading`

   Stato: completato primo blocco. Prossimo passo: espandere ogni guida con esempi numerici e link interni piu profondi.

4. Migliorare conversione:
   - CTA piu specifiche per cluster
   - lead magnet PDF per stipendio/budget
   - form contatti dedicato ai servizi AI SEO

## Note operative

- Non spostare `calcolich.ch` sul progetto statico `calcolich-calcolatori`: il dominio live usa gia `calcolich-tools`, progetto Next.js piu maturo.
- Per modifiche al dominio vero lavorare sempre in `/Users/giuseppegiordanelli/Documents/Codex/calcolich-tools`.
