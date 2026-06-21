export type Guide = {
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  categoryHref: string;
  categoryLabel: string;
  calculatorLinks: { href: string; label: string }[];
  sections: { heading: string; body: string[] }[];
};

export const guides: Guide[] = [
  {
    slug: "stipendio-netto-svizzera",
    title: "Stipendio netto in Svizzera: cosa controllare prima di accettare un'offerta",
    description: "Guida pratica per capire la differenza tra lordo e netto, le deduzioni principali e i calcolatori utili per stimare il salario disponibile.",
    metaTitle: "Stipendio netto Svizzera: guida pratica | Calcolich",
    metaDescription: "Guida pratica allo stipendio netto in Svizzera: lordo, deduzioni, imposta alla fonte, tredicesima e calcolatori utili.",
    categoryHref: "/categorie/stipendio-lavoro",
    categoryLabel: "Stipendio e lavoro",
    calculatorLinks: [
      { href: "/calcolo-salario-netto-svizzera", label: "Calcolatore stipendio netto" },
      { href: "/calcolo-lordo-netto-svizzera", label: "Calcolatore lordo netto" },
      { href: "/calcolo-tredicesima-svizzera", label: "Calcolatore tredicesima" },
    ],
    sections: [
      {
        heading: "Lordo e netto non sono la stessa cosa",
        body: [
          "Quando valuti un'offerta di lavoro in Svizzera, il salario lordo e solo il punto di partenza. Dal lordo vengono sottratti contributi sociali, assicurazioni, cassa pensione e, in alcuni casi, imposta alla fonte.",
          "Per questo due offerte con lo stesso lordo possono generare netti diversi. Eta, cantone, cassa pensione, situazione familiare e datore di lavoro possono cambiare il risultato finale.",
        ],
      },
      {
        heading: "Quali voci guardare",
        body: [
          "Controlla sempre salario mensile, numero di mensilita, percentuali di deduzione, eventuale imposta alla fonte e contributi alla cassa pensione. Se hai gia una busta paga simile, usala come riferimento.",
          "Una stima rapida aiuta a negoziare meglio, ma per decisioni ufficiali bisogna leggere contratto, regolamento aziendale e conteggio salariale.",
        ],
      },
      {
        heading: "Come usare Calcolich",
        body: [
          "Parti dal calcolatore stipendio netto per stimare il mensile disponibile. Poi usa lordo netto se vuoi capire quale lordo chiedere per ottenere un certo netto.",
          "Se l'offerta prevede tredicesima o part-time, collega piu strumenti: il quadro diventa piu realistico e meno dipendente da calcoli mentali.",
        ],
      },
    ],
  },
  {
    slug: "costo-vita-svizzera",
    title: "Costo della vita in Svizzera: budget, affitto e spese da stimare",
    description: "Una guida pratica per stimare budget mensile, affitto sostenibile, cassa malati e spese ricorrenti in Svizzera.",
    metaTitle: "Costo della vita in Svizzera: guida budget | Calcolich",
    metaDescription: "Guida al costo della vita in Svizzera: budget mensile, affitto sostenibile, cassa malati, auto e risparmio.",
    categoryHref: "/categorie/casa-budget",
    categoryLabel: "Casa e budget",
    calculatorLinks: [
      { href: "/it/calcolatore-budget-mensile-svizzera", label: "Calcolatore budget mensile" },
      { href: "/it/calcolatore-affitto-sostenibile-svizzera", label: "Calcolatore affitto sostenibile" },
      { href: "/it/calcolatore-cassa-malati-svizzera", label: "Calcolatore cassa malati" },
    ],
    sections: [
      {
        heading: "Il budget va visto mese per mese",
        body: [
          "In Svizzera molte spese sono prevedibili, ma possono incidere parecchio: affitto, assicurazione malattia, trasporti, auto, imposte, alimentari e risparmio.",
          "Prima di cambiare lavoro, trasferirti o firmare un affitto, conviene trasformare tutto in una stima mensile semplice.",
        ],
      },
      {
        heading: "Affitto e assicurazione pesano molto",
        body: [
          "L'affitto sostenibile dipende dal reddito netto e dalla quota di budget che vuoi destinare alla casa. La cassa malati dipende invece da premio, franchigia e costi sanitari previsti.",
          "Non guardare solo una singola voce: un affitto basso puo essere compensato da trasporti alti, e una franchigia elevata puo non essere ideale se prevedi molte spese mediche.",
        ],
      },
      {
        heading: "Come usare Calcolich",
        body: [
          "Usa il calcolatore budget mensile come base. Poi aggiungi affitto sostenibile, cassa malati e spese auto per costruire una vista piu concreta del tuo cashflow.",
          "Le stime non sostituiscono preventivi o documenti ufficiali, ma aiutano a evitare decisioni prese solo a sensazione.",
        ],
      },
    ],
  },
  {
    slug: "freelance-svizzera",
    title: "Freelance in Svizzera: tariffa, margine e prezzo vendita",
    description: "Guida per stimare tariffa oraria, prezzi, margini, IVA e break even quando lavori da freelance o vendi servizi.",
    metaTitle: "Freelance Svizzera: tariffa e prezzi | Calcolich",
    metaDescription: "Guida freelance in Svizzera: tariffa oraria, prezzo vendita, IVA, margini e break even con calcolatori gratuiti.",
    categoryHref: "/categorie/business-freelance",
    categoryLabel: "Business e freelance",
    calculatorLinks: [
      { href: "/it/calcolatore-tariffa-freelance-svizzera", label: "Calcolatore tariffa freelance" },
      { href: "/it/calcolatore-prezzo-vendita", label: "Calcolatore prezzo vendita" },
      { href: "/calcolo-break-even", label: "Calcolatore break even" },
    ],
    sections: [
      {
        heading: "La tariffa non e solo reddito desiderato",
        body: [
          "Una tariffa freelance sostenibile deve coprire costi, giorni non fatturabili, imposte, assicurazioni, ferie, formazione e rischio commerciale.",
          "Se parti solo dallo stipendio desiderato, rischi di sottostimare il prezzo reale del tuo lavoro.",
        ],
      },
      {
        heading: "Margine, IVA e break even",
        body: [
          "Per vendere servizi o prodotti devi distinguere costo, prezzo, margine e IVA. Il break even ti dice quante vendite servono per coprire i costi prima di generare profitto.",
          "Questi calcoli sono utili anche per preventivi: puoi capire se un prezzo e sostenibile prima di proporlo al cliente.",
        ],
      },
      {
        heading: "Come usare Calcolich",
        body: [
          "Parti dalla tariffa freelance, poi controlla prezzo vendita e margine. Se hai costi fissi, usa il break even per capire quanto devi vendere ogni mese.",
          "I risultati sono stime operative e vanno adattati alla tua situazione fiscale, assicurativa e commerciale.",
        ],
      },
    ],
  },
  {
    slug: "risk-management-trading",
    title: "Risk management trading: rischio, size e drawdown prima del trade",
    description: "Guida pratica per usare calcolatori di rischio trading, lot size, drawdown, profitto e rapporto rischio rendimento.",
    metaTitle: "Risk management trading: guida pratica | Calcolich",
    metaDescription: "Guida al risk management trading: rischio per trade, lot size, drawdown, profitto e risk reward con calcolatori gratuiti.",
    categoryHref: "/categorie/trading",
    categoryLabel: "Trading",
    calculatorLinks: [
      { href: "/calcolo-rischio-trading", label: "Calcolatore rischio trading" },
      { href: "/calcolo-lot-size-forex", label: "Calcolatore lot size forex" },
      { href: "/calcolo-drawdown", label: "Calcolatore drawdown" },
    ],
    sections: [
      {
        heading: "Il rischio si decide prima dell'entrata",
        body: [
          "Una strategia puo anche avere buoni segnali, ma senza controllo del rischio puo diventare instabile. Prima di aprire una posizione conviene sapere quanto capitale stai mettendo a rischio.",
          "Il rischio per trade, la distanza dello stop e la dimensione posizione devono essere coerenti tra loro.",
        ],
      },
      {
        heading: "Drawdown e recupero",
        body: [
          "Il drawdown misura quanto capitale hai perso dal massimo precedente. Piu il drawdown cresce, piu rendimento serve per tornare al punto di partenza.",
          "Questo rende importante limitare la perdita media e non aumentare la size in modo impulsivo dopo una serie negativa.",
        ],
      },
      {
        heading: "Come usare Calcolich",
        body: [
          "Usa il calcolatore rischio trading per definire la perdita massima accettabile, poi il lot size per tradurla in posizione. Con drawdown e risk reward puoi valutare scenari e sostenibilita.",
          "I calcolatori non danno segnali di investimento e non eliminano il rischio. Servono a prendere decisioni piu disciplinate.",
        ],
      },
    ],
  },
  {
    slug: "imposta-alla-fonte-svizzera",
    title: "Imposta alla fonte in Svizzera: come stimarla nel salario mensile",
    description: "Guida pratica per capire quando l'imposta alla fonte incide sul netto, quali dati servono e quali calcolatori usare.",
    metaTitle: "Imposta alla fonte Svizzera: guida pratica | Calcolich",
    metaDescription: "Guida all'imposta alla fonte in Svizzera: come stimarla sul salario mensile e collegarla a stipendio netto e lordo netto.",
    categoryHref: "/categorie/stipendio-lavoro",
    categoryLabel: "Stipendio e lavoro",
    calculatorLinks: [
      { href: "/it/calcolatore-imposta-alla-fonte-svizzera", label: "Calcolatore imposta alla fonte" },
      { href: "/calcolo-salario-netto-svizzera", label: "Calcolatore stipendio netto" },
      { href: "/calcolo-lordo-netto-svizzera", label: "Calcolatore lordo netto" },
    ],
    sections: [
      {
        heading: "Perche incide sul netto",
        body: [
          "L'imposta alla fonte puo ridurre direttamente il salario netto mensile. Per chi la paga, non basta guardare solo contributi sociali e cassa pensione: bisogna considerare anche la trattenuta fiscale.",
          "La percentuale dipende da situazione personale, cantone, reddito e altre condizioni. Per questo una stima rapida e utile, ma non sostituisce le tabelle ufficiali.",
        ],
      },
      {
        heading: "Quali dati preparare",
        body: [
          "Per fare una simulazione sensata servono salario lordo, percentuale stimata di imposta, altre deduzioni e frequenza di pagamento. Se hai una busta paga recente, usala come riferimento iniziale.",
          "Quando confronti due offerte, verifica se entrambe includono la stessa ipotesi fiscale. Un lordo piu alto puo non tradursi nello stesso aumento netto.",
        ],
      },
      {
        heading: "Come usare Calcolich",
        body: [
          "Inizia dal calcolatore imposta alla fonte per isolare la trattenuta. Poi usa stipendio netto e lordo netto per vedere l'effetto complessivo sul mensile disponibile.",
          "Il risultato serve per orientarsi e fare domande migliori a datore di lavoro, fiduciario o ufficio competente.",
        ],
      },
    ],
  },
  {
    slug: "cassa-malati-svizzera",
    title: "Cassa malati in Svizzera: premio, franchigia e costo annuo",
    description: "Guida per stimare il costo reale della cassa malati considerando premio mensile, franchigia e spese mediche previste.",
    metaTitle: "Cassa malati Svizzera: guida costo annuo | Calcolich",
    metaDescription: "Guida pratica alla cassa malati in Svizzera: premio, franchigia, spese mediche e calcolo del costo annuo stimato.",
    categoryHref: "/categorie/casa-budget",
    categoryLabel: "Casa e budget",
    calculatorLinks: [
      { href: "/it/calcolatore-cassa-malati-svizzera", label: "Calcolatore cassa malati" },
      { href: "/it/calcolatore-budget-mensile-svizzera", label: "Calcolatore budget mensile" },
      { href: "/it/calcolatore-affitto-sostenibile-svizzera", label: "Calcolatore affitto sostenibile" },
    ],
    sections: [
      {
        heading: "Il premio mensile non basta",
        body: [
          "Quando confronti una cassa malati, il premio mensile e solo una parte del costo. La franchigia e le spese mediche previste possono cambiare parecchio il totale annuo.",
          "Una polizza con premio basso puo risultare meno conveniente se hai molte spese sanitarie e una franchigia alta.",
        ],
      },
      {
        heading: "Ragiona su base annua",
        body: [
          "Per capire il peso reale sul budget, conviene sommare dodici premi mensili, franchigia potenziale e costi sanitari attesi. Poi puoi trasformare il totale in costo medio mensile.",
          "Questo approccio aiuta a non sottovalutare una spesa che incide sul cashflow familiare per tutto l'anno.",
        ],
      },
      {
        heading: "Come usare Calcolich",
        body: [
          "Usa il calcolatore cassa malati per stimare il costo annuo, poi inserisci il valore nel budget mensile. Se stai valutando un trasferimento, collega anche affitto e spese ricorrenti.",
          "Le stime servono a confrontare scenari. Prima di cambiare assicurazione, verifica sempre condizioni, coperture e scadenze ufficiali.",
        ],
      },
    ],
  },
  {
    slug: "affitto-sostenibile-svizzera",
    title: "Affitto sostenibile in Svizzera: quanto puoi permetterti",
    description: "Guida per stimare un affitto sostenibile partendo dal reddito netto, dalle spese ricorrenti e dal margine di sicurezza.",
    metaTitle: "Affitto sostenibile Svizzera: guida budget | Calcolich",
    metaDescription: "Guida per calcolare un affitto sostenibile in Svizzera usando reddito netto, quota casa e budget mensile.",
    categoryHref: "/categorie/casa-budget",
    categoryLabel: "Casa e budget",
    calculatorLinks: [
      { href: "/it/calcolatore-affitto-sostenibile-svizzera", label: "Calcolatore affitto sostenibile" },
      { href: "/it/calcolatore-budget-mensile-svizzera", label: "Calcolatore budget mensile" },
      { href: "/calcolo-salario-netto-svizzera", label: "Calcolatore stipendio netto" },
    ],
    sections: [
      {
        heading: "Parti dal reddito netto",
        body: [
          "Il reddito netto mensile e la base piu concreta per valutare un affitto. Il lordo puo sembrare comodo, ma non rappresenta il denaro realmente disponibile ogni mese.",
          "Una quota casa troppo alta riduce margine per assicurazioni, trasporti, imprevisti e risparmio.",
        ],
      },
      {
        heading: "Non guardare solo l'affitto",
        body: [
          "Nel costo abitativo entrano spesso spese accessorie, energia, trasporti, assicurazioni e distanza dal lavoro. Un appartamento apparentemente economico puo diventare meno conveniente se aumenta altri costi.",
          "Per questo conviene ragionare sul budget completo e non solo sul canone.",
        ],
      },
      {
        heading: "Come usare Calcolich",
        body: [
          "Usa il calcolatore affitto sostenibile per trovare una soglia iniziale. Poi controlla il budget mensile e lo stipendio netto per capire quanto margine resta davvero.",
          "La stima non e una regola bancaria, ma una bussola utile prima di candidarti per un appartamento o firmare un contratto.",
        ],
      },
    ],
  },
  {
    slug: "terzo-pilastro-risparmio-fiscale",
    title: "Terzo pilastro: come stimare il risparmio fiscale",
    description: "Guida pratica per capire come una simulazione del terzo pilastro puo aiutare a stimare risparmio fiscale e pianificazione.",
    metaTitle: "Terzo pilastro risparmio fiscale: guida | Calcolich",
    metaDescription: "Guida al terzo pilastro e al risparmio fiscale: come stimare vantaggio, versamento e impatto sul budget.",
    categoryHref: "/categorie/finanza",
    categoryLabel: "Finanza",
    calculatorLinks: [
      { href: "/it/calcolatore-terzo-pilastro-risparmio-fiscale", label: "Calcolatore terzo pilastro" },
      { href: "/calcolo-interessi-composti", label: "Calcolatore interessi composti" },
      { href: "/it/calcolatore-budget-mensile-svizzera", label: "Calcolatore budget mensile" },
    ],
    sections: [
      {
        heading: "Perche simulare prima",
        body: [
          "Il terzo pilastro puo avere un impatto fiscale interessante, ma il beneficio dipende da reddito, aliquota marginale, versamento e situazione personale.",
          "Prima di versare, conviene capire quanto puoi permetterti senza indebolire il budget mensile.",
        ],
      },
      {
        heading: "Risparmio fiscale e liquidita",
        body: [
          "Il risparmio fiscale stimato non va visto isolato. Un versamento piu alto puo ridurre il reddito disponibile nel breve periodo, anche se crea vantaggio fiscale e previdenziale.",
          "Il calcolo migliore e quello che collega impatto fiscale, obiettivo di risparmio e liquidita necessaria per spese e imprevisti.",
        ],
      },
      {
        heading: "Come usare Calcolich",
        body: [
          "Parti dal calcolatore terzo pilastro per stimare il beneficio. Poi usa interessi composti per simulare orizzonti lunghi e budget mensile per verificare sostenibilita.",
          "Il risultato e informativo. Per decisioni fiscali e previdenziali importanti resta utile il confronto con un consulente qualificato.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuidesByCategory(categoryHref: string) {
  return guides.filter((guide) => guide.categoryHref === categoryHref);
}
