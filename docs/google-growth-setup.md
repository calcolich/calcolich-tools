# Setup Google Growth

Usare account centrale:

```text
calcolich@gmail.com
```

## 1. Google Analytics 4

1. Vai su Google Analytics.
2. Crea proprieta per `calcolich.ch`.
3. Crea stream Web.
4. Copia Measurement ID, formato:

```text
G-XXXXXXXXXX
```

5. Inseriscilo in Vercel:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID
```

## 2. Google Search Console

Metodo consigliato: dominio.

1. Aggiungi proprieta dominio `calcolich.ch`.
2. Se Google chiede record DNS TXT, aggiungilo su Hostpoint.
3. In alternativa usa metodo URL prefix e copia codice meta verification.
4. Se usi meta verification, inserisci su Vercel:

```text
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
```

5. Dopo verifica, invia sitemap:

```text
https://calcolich.ch/sitemap.xml
```

## 3. Google AdSense

1. Crea o apri AdSense con `calcolich@gmail.com`.
2. Aggiungi sito:

```text
calcolich.ch
```

3. Copia Publisher ID:

```text
ca-pub-XXXXXXXXXXXXXXXX
```

4. Inserisci su Vercel:

```text
NEXT_PUBLIC_ADSENSE_CLIENT_ID
```

5. Dopo approvazione, crea due annunci display responsive:

```text
NEXT_PUBLIC_ADSENSE_CALCULATOR_SLOT
NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT
```

6. Controlla:

```text
https://calcolich.ch/ads.txt
```

## 4. Vercel variables complete

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
NEXT_PUBLIC_ADSENSE_CLIENT_ID
NEXT_PUBLIC_ADSENSE_CALCULATOR_SLOT
NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT
NEXT_PUBLIC_CONTACT_EMAIL
LEADS_WEBHOOK_URL
LEADS_WEBHOOK_SECRET
```

## 5. Routine dati

Ogni settimana controllare:

- Search Console: query con impression alte
- Analytics: pagine piu viste
- AdSense: RPM e pagine che monetizzano
- Lead sheet: richieste servizi e conversioni
