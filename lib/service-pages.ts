export type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  priceFrom: string;
  problem: string;
  outcomes: string[];
  deliverables: string[];
  process: { title: string; description: string }[];
  relatedLinks: { href: string; label: string }[];
  faqs: { question: string; answer: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "siti-web-artigiani-ticino",
    eyebrow: "Artigiani e imprese locali",
    title: "Siti web per artigiani in Ticino che portano richieste",
    shortTitle: "Siti web per artigiani",
    metaTitle: "Siti web per artigiani Ticino | Calcolich",
    metaDescription: "Siti web veloci per artigiani in Ticino con servizi, zone coperte, WhatsApp, preventivi e SEO locale.",
    intro: "Un sito semplice deve far capire subito cosa fai, dove lavori e come chiederti un preventivo. Costruisco pagine veloci per elettricisti, falegnami, pittori, installatori e altre attivita artigianali.",
    priceFrom: "CHF 990",
    problem: "Molti artigiani ricevono lavoro dal passaparola ma perdono richieste quando il cliente cerca su Google, trova informazioni incomplete o non vede un modo rapido per chiedere un preventivo.",
    outcomes: ["Piu richieste di preventivo", "Servizi e zone coperte chiari", "Contatto WhatsApp o email immediato"],
    deliverables: ["Sito fino a 5 sezioni", "Pagine servizi e zone", "Modulo preventivo", "SEO locale di base", "Collegamento Google Business", "Misurazione dei contatti"],
    process: [
      { title: "Raccolta", description: "Servizi, fotografie, zone coperte e tipologia di cliente desiderata." },
      { title: "Costruzione", description: "Testi chiari, pagina veloce e percorso diretto verso il preventivo." },
      { title: "Pubblicazione", description: "Dominio, contatti, indicizzazione e controllo dei primi dati." },
    ],
    relatedLinks: [
      { href: "/calcolo-costo-orario", label: "Calcolatore costo orario" },
      { href: "/it/calcolatore-prezzo-vendita", label: "Calcolatore prezzo vendita" },
      { href: "/calcolo-margine-profitto", label: "Calcolatore margine" },
    ],
    faqs: [
      { question: "Quanto costa un sito per un artigiano?", answer: "Un progetto essenziale parte da CHF 990. Il prezzo finale dipende da pagine, lingue, fotografie e funzioni richieste." },
      { question: "Il sito puo ricevere richieste di preventivo?", answer: "Si. Il percorso puo includere modulo, email e WhatsApp con domande specifiche sul lavoro richiesto." },
      { question: "Posso comparire nelle ricerche della mia zona?", answer: "Il sito viene preparato per la SEO locale e collegato a Google Business, ma tempi e posizioni non possono essere garantiti." },
    ],
  },
  {
    slug: "siti-web-fiduciarie-ticino",
    eyebrow: "Fiduciarie e studi professionali",
    title: "Siti web per fiduciarie in Ticino chiari e credibili",
    shortTitle: "Siti web per fiduciarie",
    metaTitle: "Siti web per fiduciarie Ticino | Calcolich",
    metaDescription: "Siti web per fiduciarie e studi professionali in Ticino con servizi chiari, contenuti SEO e acquisizione contatti.",
    intro: "Per una fiduciaria il sito deve comunicare competenza senza diventare complicato. Organizzo servizi, settori e contatti in un percorso sobrio, veloce e misurabile.",
    priceFrom: "CHF 1.990",
    problem: "Un elenco generico di servizi non aiuta il potenziale cliente a capire se lo studio e adatto alla sua situazione. Servono pagine specifiche, linguaggio comprensibile e segnali di fiducia verificabili.",
    outcomes: ["Servizi comprensibili", "Contatti piu qualificati", "Base editoriale per la SEO"],
    deliverables: ["Architettura servizi", "Sito professionale", "Pagine per imprese e privati", "Modulo richiesta", "SEO tecnica e locale", "Analytics e conversioni"],
    process: [
      { title: "Posizionamento", description: "Definiamo clienti ideali, servizi prioritari e aree geografiche." },
      { title: "Contenuti", description: "Trasformo competenze tecniche in pagine chiare e ricercabili." },
      { title: "Acquisizione", description: "Collego moduli, misurazione e piano di contenuti continuativo." },
    ],
    relatedLinks: [
      { href: "/calcolo-iva-svizzera", label: "Calcolatore IVA Svizzera" },
      { href: "/calcolo-contributi-avs-indipendenti", label: "Contributi AVS indipendenti" },
      { href: "/it/calcolatore-tariffa-freelance-svizzera", label: "Tariffa freelance" },
    ],
    faqs: [
      { question: "Il sito puo essere multilingue?", answer: "Si. Italiano, tedesco, francese o inglese possono essere pianificati per priorita e pubblico, evitando traduzioni automatiche non controllate." },
      { question: "Potete creare contenuti fiscali?", answer: "Posso strutturare e ottimizzare i contenuti forniti o validati dalla fiduciaria. Le informazioni professionali restano sotto la sua revisione." },
      { question: "Quanto dura il progetto?", answer: "Un sito professionale essenziale richiede normalmente alcune settimane, in base alla velocita di approvazione dei contenuti." },
    ],
  },
  {
    slug: "siti-web-imprese-pulizie-ticino",
    eyebrow: "Pulizie e facility service",
    title: "Siti web per imprese di pulizie in Ticino con preventivo online",
    shortTitle: "Siti web per imprese di pulizie",
    metaTitle: "Siti web per imprese di pulizie Ticino | Calcolich",
    metaDescription: "Siti web per imprese di pulizie in Ticino con servizi, zone, preventivo online, WhatsApp, Google Business e misurazione dei contatti.",
    intro: "Chi cerca pulizie vuole capire rapidamente se copri la sua zona, quali lavori esegui e come ricevere un preventivo. Costruisco un percorso semplice per privati, uffici, condomini e attivita commerciali.",
    priceFrom: "CHF 990",
    problem: "Quando servizi, zone e tempi di risposta sono poco chiari, il visitatore confronta altre imprese. Un modulo generico raccoglie inoltre poche informazioni e obbliga a ricominciare ogni preventivo da zero.",
    outcomes: ["Preventivi con informazioni utili", "Servizi e zone facilmente trovabili", "Contatti attribuiti a pagina e campagna"],
    deliverables: ["Sito fino a 5 sezioni", "Pagine per servizi prioritari", "Zone servite in Ticino", "Modulo preventivo guidato", "WhatsApp e Google Business", "Misurazione richieste"],
    process: [
      { title: "Offerta", description: "Ordiniamo pulizie domestiche, uffici, fine cantiere, stabili e servizi speciali." },
      { title: "Preventivo", description: "Raccogliamo tipo di spazio, localita, frequenza e urgenza prima del contatto." },
      { title: "Acquisizione", description: "Pubblichiamo pagine locali e misuriamo quali servizi generano richieste." },
    ],
    relatedLinks: [
      { href: "/calcolo-costo-orario", label: "Calcolatore costo orario" },
      { href: "/it/calcolatore-prezzo-vendita", label: "Calcolatore prezzo vendita" },
      { href: "/calcolo-margine-profitto", label: "Calcolatore margine" },
    ],
    faqs: [
      { question: "Il sito puo raccogliere richieste di sopralluogo?", answer: "Si. Il modulo puo distinguere preventivo indicativo e sopralluogo, raccogliendo localita, metratura, frequenza e tipo di servizio." },
      { question: "Potete creare pagine per Lugano, Mendrisio, Locarno e Bellinzona?", answer: "Si, quando l'impresa serve realmente quelle zone. Ogni pagina deve avere informazioni utili e specifiche, non testo duplicato." },
      { question: "Le richieste arrivano anche su WhatsApp?", answer: "Il sito puo offrire WhatsApp per i contatti rapidi e un modulo guidato per i preventivi che richiedono piu dettagli." },
    ],
  },
  {
    slug: "siti-web-agenzie-immobiliari-ticino",
    eyebrow: "Immobiliare e amministrazione",
    title: "Siti web per agenzie immobiliari in Ticino orientati agli incarichi",
    shortTitle: "Siti web per agenzie immobiliari",
    metaTitle: "Siti web per agenzie immobiliari Ticino | Calcolich",
    metaDescription: "Siti web per agenzie immobiliari in Ticino con immobili, valutazioni, acquisizione incarichi, SEO locale e tracciamento dei lead.",
    intro: "Un sito immobiliare non deve soltanto mostrare oggetti: deve spiegare perche affidarti una vendita, una locazione o un'amministrazione. Organizzo immobili e servizi intorno ai contatti che hanno maggiore valore.",
    priceFrom: "CHF 1.990",
    problem: "I portali danno visibilita agli annunci ma non costruiscono un canale proprietario. Se il sito parla solo degli oggetti disponibili, perde proprietari che cercano valutazione, vendita, locazione o gestione.",
    outcomes: ["Piu richieste di valutazione", "Servizi immobiliari separati e chiari", "Lead collegati a immobile o servizio"],
    deliverables: ["Architettura servizi e immobili", "Pagine per vendita e locazione", "Modulo valutazione", "Integrazione annunci disponibile", "SEO locale e tecnica", "Analytics e gestione lead"],
    process: [
      { title: "Priorita", description: "Definiamo incarichi desiderati, aree servite, tipologia di immobili e clienti." },
      { title: "Percorsi", description: "Separiamo ricerca immobile, valutazione, vendita, locazione e amministrazione." },
      { title: "Misurazione", description: "Attribuiamo ogni richiesta alla pagina, all'oggetto o alla campagna corretta." },
    ],
    relatedLinks: [
      { href: "/it/calcolatore-affitto-sostenibile-svizzera", label: "Calcolatore affitto sostenibile" },
      { href: "/calcolo-roi", label: "Calcolatore ROI" },
      { href: "/calcolo-rata-prestito", label: "Calcolatore rata prestito" },
    ],
    faqs: [
      { question: "Il sito puo importare gli immobili dal gestionale?", answer: "Dipende dal gestionale e dalle API disponibili. L'integrazione viene verificata prima della proposta; in alternativa si prepara una gestione semplice degli oggetti." },
      { question: "Come si generano richieste di valutazione?", answer: "Con pagine dedicate a servizio e zona, un modulo breve e un percorso che chiarisce tempi, dati necessari e passaggio successivo." },
      { question: "Il sito puo essere multilingue?", answer: "Si. Per il mercato ticinese si possono pianificare italiano, tedesco e inglese in base a immobili, aree e pubblico reale." },
    ],
  },
  {
    slug: "seo-locale-ticino",
    eyebrow: "Visibilita locale",
    title: "SEO locale in Ticino per essere trovato da clienti vicini",
    shortTitle: "SEO locale Ticino",
    metaTitle: "SEO locale Ticino per PMI e professionisti | Calcolich",
    metaDescription: "SEO locale in Ticino: pagine servizi e citta, Google Business, contenuti e misurazione delle richieste per PMI e professionisti.",
    intro: "La SEO locale collega servizi, territorio e intenzione di ricerca. Miglioro struttura, pagine e Google Business per trasformare la visibilita in richieste misurabili.",
    priceFrom: "CHF 490/mese",
    problem: "Essere online non basta quando le pagine non spiegano servizi e zone, Google Business e incompleto e nessuno misura quali ricerche generano telefonate o moduli.",
    outcomes: ["Copertura delle ricerche locali", "Google Business piu completo", "Contatti attribuiti alle pagine"],
    deliverables: ["Analisi query locali", "Ottimizzazione pagine", "Piano contenuti", "Google Business", "Link interni e schema", "Report lead mensile"],
    process: [
      { title: "Audit", description: "Controllo sito, concorrenza, query, pagine e profilo Google Business." },
      { title: "Priorita", description: "Intervengo prima sulle pagine con maggiore valore commerciale." },
      { title: "Misurazione", description: "Seguo impression, click, contatti e proposte, non solo le posizioni." },
    ],
    relatedLinks: [
      { href: "/guide", label: "Guide SEO di Calcolich" },
      { href: "/servizi-ai-seo", label: "Pacchetti siti e SEO" },
      { href: "/contatti", label: "Contatta Calcolich" },
    ],
    faqs: [
      { question: "Quanto tempo serve per vedere risultati SEO?", answer: "Dipende da sito, concorrenza e punto di partenza. Si misurano subito indicizzazione e impression, mentre lead e posizioni richiedono normalmente piu tempo." },
      { question: "La SEO locale include Google Business?", answer: "Si, il profilo viene coordinato con servizi, categorie, aree e contenuti del sito." },
      { question: "Garantite la prima posizione?", answer: "No. Nessun professionista serio puo garantire una posizione organica. Il lavoro viene misurato su visibilita, traffico qualificato e contatti." },
    ],
  },
  {
    slug: "calcolatori-lead-generation",
    eyebrow: "Strumenti interattivi",
    title: "Calcolatori online per generare lead qualificati",
    shortTitle: "Calcolatori lead generation",
    metaTitle: "Calcolatori per lead generation e SEO | Calcolich",
    metaDescription: "Calcolatori personalizzati per aziende: risultato immediato, pagina SEO, raccolta lead, email automatica e misurazione conversioni.",
    intro: "Un calcolatore risponde a una domanda concreta e porta il visitatore piu vicino a una richiesta. Progetto strumenti personalizzati con pagina SEO, risultato immediato e acquisizione contatti.",
    priceFrom: "CHF 990",
    problem: "Guide e pagine servizi chiedono attenzione. Un calcolatore offre invece valore immediato: l'utente inserisce i propri numeri, vede un risultato e puo chiedere una verifica o un preventivo.",
    outcomes: ["Traffico su query specifiche", "Lead con contesto gia raccolto", "Contenuto differenziante e riutilizzabile"],
    deliverables: ["Formula e interfaccia", "Pagina SEO completa", "Modulo lead attribuito", "Email automatica", "Schema e sitemap", "Analytics conversioni"],
    process: [
      { title: "Domanda", description: "Identifichiamo il calcolo che il cliente cerca prima di acquistare." },
      { title: "Prototipo", description: "Costruisco formula, campi, risultato e percorso di conversione." },
      { title: "Crescita", description: "Pubblico, indicizzo e miglioro il tool usando dati reali." },
    ],
    relatedLinks: [
      { href: "/it/calcolatore-affitto-sostenibile-svizzera", label: "Esempio: affitto sostenibile" },
      { href: "/it/calcolatore-tariffa-freelance-svizzera", label: "Esempio: tariffa freelance" },
      { href: "/calcolo-rischio-trading", label: "Esempio: rischio trading" },
    ],
    faqs: [
      { question: "Che tipo di calcolatore si puo creare?", answer: "Preventivi, risparmi, costi, rate, convenienza, dimensionamento e altre formule coerenti con il servizio dell'azienda." },
      { question: "Il calcolatore raccoglie email?", answer: "Puo mostrare il risultato liberamente e offrire una verifica, un report o un preventivo tramite modulo, senza bloccare inutilmente l'utente." },
      { question: "Il tool puo essere inserito in un sito esistente?", answer: "Si, dopo una verifica tecnica del sito e della piattaforma utilizzata." },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
