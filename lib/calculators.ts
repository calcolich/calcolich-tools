export type CalculatorKind =
  | "work-hours"
  | "working-time"
  | "overtime-ch"
  | "working-days-ch"
  | "work-percentage-ch"
  | "salary-net-ch"
  | "gross-net-ch"
  | "vacation-ch"
  | "vat-ch"
  | "compound-interest"
  | "mortgage-ch"
  | "mortgage-affordability-ch"
  | "trading-risk"
  | "forex-lot-size"
  | "drawdown"
  | "percentage"
  | "discount"
  | "percentage-change"
  | "margin-markup"
  | "roi"
  | "break-even"
  | "loan-payment"
  | "profit-loss"
  | "risk-reward"
  | "savings-goal"
  | "hourly-cost"
  | "annual-monthly"
  | "withholding-tax-ch"
  | "health-insurance-ch"
  | "premium-subsidy-ch"
  | "rent-affordability-ch"
  | "hourly-wage-ch"
  | "part-time-salary-ch"
  | "pillar3a-tax-ch"
  | "monthly-budget-ch"
  | "car-cost-ch"
  | "freelance-rate-ch"
  | "selling-price"
  | "ahv-13th-pension-ch"
  | "self-employed-ahv-ch"
  | "family-allowances-ch"
  | "maternity-allowance-ch"
  | "unemployment-benefit-ch"
  | "ahv-pension-gap-ch";

export type CalculatorInput = {
  key: string;
  label: string;
  type?: "number" | "time" | "date" | "select";
  defaultValue: string;
  placeholder?: string;
  step?: string;
  min?: string;
  max?: string;
  options?: { label: string; value: string }[];
};

export type Calculator = {
  slug: string;
  kind: CalculatorKind;
  title: string;
  shortTitle: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  cta: string;
  inputs: CalculatorInput[];
  article: string[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
  guideLinks?: { href: string; label: string; description: string }[];
  id?: string;
  locale?: "de" | "it" | "en" | "fr";
  h1?: string;
  formula?: string;
  example?: string;
  relatedCalculators?: string[];
  monetizationType?: "adsense" | "affiliate" | "lead" | "mixed";
  schemaType?: "WebApplication" | "SoftwareApplication";
  isPriority?: boolean;
  searchIntent?: string;
  updatedAt?: string;
  sources?: { label: string; href: string }[];
  resultLabels?: string[];
  contentSections?: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
};

export const calculators: Calculator[] = [
  {
    slug: "calcolo-ore-lavoro",
    kind: "work-hours",
    title: "Calcolatore Ore Lavorate",
    shortTitle: "Ore lavorate",
    category: "Lavoro Svizzera",
    metaTitle: "Calcolatore Ore Lavorate Online | Calcolich",
    metaDescription: "Calcola ore lavorate, pause e totale netto tra orario di inizio e fine.",
    intro: "Calcola rapidamente quante ore hai lavorato sottraendo pause e minuti non retribuiti.",
    cta: "Ricevi nuovi calcolatori per lavoro, salario e produttivita in Svizzera.",
    inputs: [
      { key: "start", label: "Ora inizio", type: "time", defaultValue: "08:00" },
      { key: "end", label: "Ora fine", type: "time", defaultValue: "17:30" },
      { key: "breakMinutes", label: "Pausa in minuti", defaultValue: "60", min: "0" },
    ],
    article: [
      "Il calcolo delle ore lavorate sembra semplice, ma nella pratica diventa spesso confuso quando entrano in gioco pause, turni spezzati, straordinari o giornate con orari diversi. Questo strumento nasce per dare una risposta immediata: inserisci ora di inizio, ora di fine e minuti di pausa, poi ottieni il totale netto lavorato. E utile per dipendenti, freelance, studenti che lavorano a ore e piccole aziende che vogliono fare un controllo veloce prima di compilare un foglio ore.",
      "In Svizzera molte persone lavorano con orari settimanali definiti, ma la registrazione precisa delle ore resta importante. Può servire per confrontare il totale effettivo con il contratto, controllare eventuali straordinari o verificare se una pausa e stata conteggiata correttamente. Un calcolatore semplice riduce errori manuali e rende piu chiaro il rapporto tra tempo lavorato e compenso.",
      "Per usare bene il risultato, considera sempre le regole del tuo contratto o della tua azienda. Alcune pause possono essere obbligatorie, altre non retribuite, e in certi casi il tempo di preparazione o chiusura turno puo essere gestito separatamente. Il calcolo qui proposto e pratico e immediato, ma non sostituisce un conteggio ufficiale del datore di lavoro.",
      "Il vantaggio principale e la velocita. Invece di fare conversioni mentali tra ore e minuti, puoi usare il risultato come base per note personali, fatture, controllo salario o pianificazione. Collegando questo strumento agli altri calcolatori di stipendio, ferie e straordinari, puoi costruire una visione piu completa del tuo tempo lavorativo.",
    ],
    faqs: [
      { question: "Il calcolatore sottrae la pausa?", answer: "Si, sottrae i minuti di pausa inseriti dal totale tra ora di inizio e ora di fine." },
      { question: "Funziona per turni notturni?", answer: "Questa versione e pensata per turni nella stessa giornata. Per turni oltre mezzanotte conviene dividere il conteggio in due parti." },
      { question: "Il risultato e valido per la busta paga?", answer: "E una stima pratica. Per la busta paga valgono contratto, regolamenti aziendali e conteggio ufficiale." },
    ],
    relatedSlugs: ["calcolo-straordinari-svizzera", "calcolo-salario-netto-svizzera", "calcolo-ferie-svizzera"],
  },
  {
    slug: "calcolo-percentuale-lavoro-svizzera",
    kind: "work-percentage-ch",
    title: "Calcolatore Percentuale Lavoro Svizzera",
    shortTitle: "Percentuale lavoro",
    category: "Lavoro Svizzera",
    metaTitle: "Calcolo Percentuale Lavoro Svizzera | Grado d'occupazione",
    metaDescription: "Calcola la percentuale di lavoro in Svizzera partendo dalle ore settimanali. Trova subito grado d'occupazione e ore medie al giorno.",
    intro: "Confronta le tue ore settimanali con un tempo pieno e calcola subito il grado d'occupazione.",
    cta: "Ricevi strumenti gratuiti per percentuale di lavoro, salario part-time, ferie e ore in Svizzera.",
    inputs: [
      { key: "fullTimeHours", label: "Ore settimanali al 100%", defaultValue: "42", step: "0.1", min: "1", max: "60" },
      { key: "weeklyHours", label: "Ore lavorate a settimana", defaultValue: "33.6", step: "0.1", min: "0", max: "60" },
      { key: "workDays", label: "Giorni lavorati a settimana", defaultValue: "4", step: "0.5", min: "1", max: "7" },
    ],
    article: [
      "La percentuale di lavoro, chiamata anche grado d'occupazione, indica quanto un impiego part-time rappresenta rispetto all'orario settimanale previsto per un posto al 100 per cento. In Svizzera l'orario completo puo variare in base ad azienda, settore e contratto: per questo il calcolatore permette di inserire direttamente le ore settimanali del proprio tempo pieno.",
      "La formula e semplice: ore lavorate a settimana divise per le ore previste al 100 per cento, moltiplicate per cento. Se il tempo pieno e di 42 ore e ne lavori 33.6, il grado d'occupazione e dell'80 per cento. Il risultato puo aiutarti a controllare un'offerta, leggere il contratto o confrontare diversi modelli di lavoro.",
      "Il numero di giorni lavorati non cambia la percentuale contrattuale, ma serve a calcolare la media di ore per giornata. Due persone all'80 per cento possono distribuire le stesse ore in quattro oppure cinque giorni e avere quindi giornate di durata diversa.",
      "Il calcolo e matematico e non sostituisce il contratto di lavoro. Per salario, ferie, festivi e ore supplementari possono valere regole aziendali o collettive specifiche. Usa il risultato insieme ai calcolatori di salario part-time, ferie e ore lavorate per ottenere una stima piu completa.",
    ],
    faqs: [
      { question: "Come si calcola la percentuale di lavoro?", answer: "Dividi le ore lavorate a settimana per le ore previste al 100% e moltiplica il risultato per 100." },
      { question: "Quante ore sono un impiego all'80%?", answer: "Dipende dal tempo pieno aziendale. Con 42 ore settimanali al 100%, un impiego all'80% corrisponde a 33.6 ore." },
      { question: "I giorni lavorati cambiano il grado d'occupazione?", answer: "No. Cambiano la distribuzione delle ore e la durata media delle giornate, non la percentuale complessiva." },
    ],
    relatedSlugs: ["calcolo-salario-part-time-svizzera", "calcolo-ore-lavoro", "calcolo-ferie-svizzera"],
    guideLinks: [
      {
        href: "/guide/stipendio-netto-svizzera",
        label: "Guida stipendio netto Svizzera",
        description: "Come collegare percentuale di lavoro, salario lordo e netto mensile.",
      },
    ],
  },
  {
    slug: "calcolo-salario-netto-svizzera",
    kind: "salary-net-ch",
    title: "Calcolatore Stipendio Netto Svizzera",
    shortTitle: "Stipendio netto",
    category: "Stipendio Svizzera",
    metaTitle: "Calcolo Stipendio Netto Svizzera 2026 | Calcolich",
    metaDescription: "Stima lo stipendio netto in Svizzera partendo dal lordo e dalle principali deduzioni salariali.",
    intro: "Inserisci il salario lordo e le deduzioni principali per stimare il netto mensile.",
    cta: "Ricevi strumenti gratuiti per capire meglio salario, tasse e lavoro in Svizzera.",
    inputs: [
      { key: "gross", label: "Salario lordo mensile CHF", defaultValue: "6500", min: "0" },
      { key: "avs", label: "AVS/AI/IPG %", defaultValue: "5.3", step: "0.1", min: "0" },
      { key: "alv", label: "AD/ALV %", defaultValue: "1.1", step: "0.1", min: "0" },
      { key: "accident", label: "Infortunio non professionale %", defaultValue: "1.2", step: "0.1", min: "0" },
      { key: "pension", label: "Cassa pensione %", defaultValue: "7", step: "0.1", min: "0" },
      { key: "other", label: "Altre deduzioni / imposta alla fonte %", defaultValue: "0", step: "0.1", min: "0" },
    ],
    article: [
      "Capire lo stipendio netto in Svizzera e fondamentale quando si valuta un nuovo lavoro, un trasferimento o una trattativa salariale. Il lordo indicato nel contratto non corrisponde al denaro che arriva sul conto, perche vengono sottratti contributi sociali, assicurazioni, cassa pensione e in alcuni casi imposta alla fonte. Questo calcolatore permette di stimare il netto mensile modificando le percentuali principali.",
      "Il punto forte dello strumento e la flessibilita. In Svizzera non esiste un unico netto valido per tutti: eta, cantone, datore di lavoro, cassa pensione, settore e situazione personale possono cambiare parecchio il risultato. Per questo il calcolatore non impone una formula rigida, ma lascia modificare ogni voce. Puoi partire dai valori indicativi e adattarli ai dati reali della tua busta paga.",
      "Per usare il calcolatore in modo intelligente, inserisci prima il salario lordo mensile. Poi controlla le percentuali riportate nel tuo conteggio salario o nel contratto. Se sei soggetto a imposta alla fonte, puoi inserirla nel campo delle altre deduzioni. Il risultato finale mostra sia il totale percentuale trattenuto sia il netto stimato.",
      "Questo strumento e utile anche per confrontare offerte di lavoro. Due stipendi lordi simili possono generare netti diversi se cambiano cassa pensione, assicurazioni o imposte. Prima di prendere decisioni importanti, usa sempre il risultato come stima iniziale e verifica con documenti ufficiali o consulenti qualificati.",
    ],
    faqs: [
      { question: "Il calcolo include le imposte?", answer: "Solo se inserisci una percentuale nel campo altre deduzioni o imposta alla fonte." },
      { question: "Perche il netto cambia da persona a persona?", answer: "Dipende da cantone, eta, cassa pensione, assicurazioni, imposte e situazione personale." },
      { question: "Posso usare il risultato per negoziare?", answer: "Si, come stima iniziale. Per decisioni finali verifica sempre la busta paga o un calcolo professionale." },
    ],
    relatedSlugs: ["calcolo-lordo-netto-svizzera", "calcolo-tredicesima-svizzera", "calcolo-ferie-svizzera"],
    guideLinks: [
      {
        href: "/guide/stipendio-netto-svizzera",
        label: "Guida stipendio netto Svizzera",
        description: "Deduzioni, lordo, netto, tredicesima e controlli prima di accettare un'offerta.",
      },
      {
        href: "/guide/imposta-alla-fonte-svizzera",
        label: "Guida imposta alla fonte",
        description: "Come leggere l'effetto della trattenuta fiscale sul salario mensile.",
      },
    ],
  },
  {
    slug: "calcolo-lordo-netto-svizzera",
    kind: "gross-net-ch",
    title: "Calcolatore Lordo Netto Svizzera",
    shortTitle: "Lordo netto",
    category: "Stipendio Svizzera",
    metaTitle: "Calcolo Lordo Netto Svizzera | Calcolich",
    metaDescription: "Converti stipendio lordo in netto stimato e netto desiderato in lordo necessario.",
    intro: "Calcola il netto stimato dal lordo oppure il lordo necessario per ottenere un netto desiderato.",
    cta: "Ricevi guide pratiche su stipendio netto, tredicesima e lavoro in Svizzera.",
    inputs: [
      { key: "mode", label: "Modalita", type: "select", defaultValue: "gross-to-net", options: [{ label: "Da lordo a netto", value: "gross-to-net" }, { label: "Da netto a lordo", value: "net-to-gross" }] },
      { key: "amount", label: "Importo CHF", defaultValue: "6500", min: "0" },
      { key: "deductionRate", label: "Deduzioni totali %", defaultValue: "15", step: "0.1", min: "0", max: "80" },
    ],
    article: [
      "Il confronto tra lordo e netto e una delle ricerche piu frequenti quando si parla di lavoro in Svizzera. Il lordo e il valore contrattuale prima delle trattenute, mentre il netto e l'importo effettivo disponibile dopo deduzioni e imposte applicabili. Questo calcolatore consente di passare velocemente da un valore all'altro usando una percentuale totale di deduzioni.",
      "La modalita da lordo a netto e utile quando hai un'offerta salariale e vuoi capire quanto potrebbe arrivare sul conto ogni mese. La modalita da netto a lordo e utile invece quando sai quanto vuoi incassare e devi stimare quale salario lordo chiedere o negoziare. In entrambi i casi il valore dipende dalla percentuale inserita.",
      "Per ottenere una stima realistica, usa come percentuale totale quella che trovi su una busta paga simile o su un calcolo precedente. Se non hai dati, puoi partire da una percentuale indicativa e poi correggerla. Ricorda che imposta alla fonte, cassa pensione e assicurazioni possono influire molto sul netto.",
      "Il calcolatore lordo netto non sostituisce un conteggio fiscale o salariale ufficiale, ma e un ottimo strumento per orientarsi rapidamente. Collegalo al calcolatore stipendio netto e alla tredicesima per avere una visione piu completa del reddito mensile e annuale.",
    ],
    faqs: [
      { question: "Che percentuale devo inserire?", answer: "Inserisci la percentuale totale delle trattenute. Se non la conosci, parti da una stima e poi correggila con la tua busta paga." },
      { question: "Il lordo netto e uguale in tutti i cantoni?", answer: "No, soprattutto se entra in gioco l'imposta alla fonte o la fiscalita personale." },
      { question: "Posso calcolare il lordo partendo dal netto desiderato?", answer: "Si, scegli la modalita da netto a lordo e inserisci il netto che vuoi ottenere." },
    ],
    relatedSlugs: ["calcolo-salario-netto-svizzera", "calcolo-tredicesima-svizzera", "calcolo-ore-lavoro"],
    guideLinks: [
      {
        href: "/guide/stipendio-netto-svizzera",
        label: "Guida stipendio netto Svizzera",
        description: "Quando usare lordo, netto e deduzioni per confrontare offerte di lavoro.",
      },
      {
        href: "/guide/imposta-alla-fonte-svizzera",
        label: "Guida imposta alla fonte",
        description: "Cosa verificare se nel netto entra anche la trattenuta fiscale.",
      },
    ],
  },
  {
    slug: "calcolo-ferie-svizzera",
    kind: "vacation-ch",
    title: "Calcolatore Ferie Svizzera",
    shortTitle: "Ferie Svizzera",
    category: "Lavoro Svizzera",
    metaTitle: "Calcolo Ferie Svizzera | Calcolich",
    metaDescription: "Calcola giorni di ferie annui e ferie maturate in base a giorni lavorativi, settimane e mesi lavorati.",
    intro: "Stima ferie annue e ferie maturate proporzionalmente ai mesi lavorati.",
    cta: "Ricevi calcolatori gratuiti per ferie, ore e salario in Svizzera.",
    inputs: [
      { key: "daysPerWeek", label: "Giorni lavorati a settimana", defaultValue: "5", min: "1", max: "7" },
      { key: "weeks", label: "Settimane di ferie annue", defaultValue: "4", step: "0.5", min: "0" },
      { key: "months", label: "Mesi lavorati", defaultValue: "12", min: "0", max: "12" },
    ],
    article: [
      "Le ferie sono una parte importante del rapporto di lavoro e meritano un calcolo chiaro. In Svizzera il diritto alle ferie dipende dalla legge, dal contratto individuale, da eventuali contratti collettivi e dalle condizioni aziendali. Questo strumento aiuta a stimare i giorni annui e quelli maturati in proporzione ai mesi lavorati.",
      "Il calcolo base e semplice: giorni lavorati a settimana moltiplicati per settimane di ferie. Chi lavora cinque giorni a settimana e ha quattro settimane di ferie ottiene normalmente venti giorni annui. Se il rapporto di lavoro dura solo una parte dell'anno, i giorni maturati vengono proporzionati ai mesi effettivi.",
      "Il calcolatore e utile quando inizi un nuovo lavoro, lasci un impiego, lavori part-time o vuoi controllare il saldo ferie. Inserendo giorni settimanali, settimane annue e mesi lavorati, ottieni subito una stima leggibile. Il risultato non considera casi speciali come assenze prolungate, accordi individuali o arrotondamenti aziendali.",
      "Per decisioni ufficiali bisogna sempre fare riferimento al contratto e al conteggio aziendale. Tuttavia, avere una stima indipendente aiuta a fare domande migliori e a evitare incomprensioni. Puoi usare questo strumento insieme al calcolatore ore lavorate e giorni lavorativi per pianificare meglio il tuo anno.",
    ],
    faqs: [
      { question: "Quante settimane di ferie devo inserire?", answer: "Inserisci quelle previste dal tuo contratto o regolamento aziendale." },
      { question: "Il calcolo funziona per il part-time?", answer: "Si, basta impostare i giorni lavorati a settimana in modo coerente con il tuo impiego." },
      { question: "Le ferie maturate sono ufficiali?", answer: "Sono una stima. Il saldo ufficiale dipende dal datore di lavoro e dal contratto." },
    ],
    relatedSlugs: ["calcolo-giorni-lavorativi-svizzera", "calcolo-ore-lavoro", "calcolo-salario-netto-svizzera"],
  },
  {
    slug: "calcolo-iva-svizzera",
    kind: "vat-ch",
    title: "Calcolatore IVA Svizzera",
    shortTitle: "IVA Svizzera",
    category: "Business Svizzera",
    metaTitle: "Calcolatrice IVA Svizzera 2026: calcolo e scorporo",
    metaDescription: "Calcola o scorpora l'IVA svizzera all'8.1%, 3.8% o 2.6%. Ottieni subito imponibile, imposta e totale in CHF.",
    intro: "Aggiungi o scorpora l'IVA svizzera e calcola subito imponibile, imposta e totale in CHF.",
    cta: "Ricevi strumenti gratuiti per freelance, aziende e calcoli fiscali in Svizzera.",
    inputs: [
      { key: "mode", label: "Modalita", type: "select", defaultValue: "add", options: [{ label: "Aggiungi IVA", value: "add" }, { label: "Scorpora IVA", value: "remove" }] },
      { key: "amount", label: "Importo CHF", defaultValue: "100", min: "0" },
      { key: "rate", label: "Aliquota IVA", type: "select", defaultValue: "8.1", options: [{ label: "8.1%", value: "8.1" }, { label: "3.8%", value: "3.8" }, { label: "2.6%", value: "2.6" }] },
    ],
    article: [
      "L'IVA svizzera e un calcolo quotidiano per aziende, freelance, negozi online e professionisti. Le aliquote principali possono cambiare in base al tipo di bene o servizio, quindi e utile avere uno strumento veloce che permetta sia di aggiungere l'IVA a un importo netto sia di scorporarla da un totale gia comprensivo d'imposta.",
      "La modalita aggiungi IVA parte da un imponibile e calcola il totale finale. La modalita scorpora IVA parte invece da un importo lordo e separa base imponibile e imposta inclusa. Questo secondo caso e molto utile quando ricevi un pagamento, una fattura o un prezzo finale e devi capire quanta IVA e contenuta.",
      "Il calcolatore include le aliquote 8.1%, 3.8% e 2.6%, usate frequentemente in Svizzera. Prima di usare il risultato su documenti ufficiali, verifica sempre quale aliquota si applica alla tua categoria di prodotto o servizio. Un errore di aliquota puo alterare fatture, margini e dichiarazioni.",
      "Per chi lavora online o vende servizi, il calcolo IVA e collegato anche al prezzo finale e al margine. Usare questo strumento insieme a calcolatori di profitto, interessi o business permette di prendere decisioni piu rapide e ridurre errori manuali nei conteggi.",
    ],
    faqs: [
      { question: "Quali aliquote IVA include?", answer: "Include 8.1%, 3.8% e 2.6%, tra le aliquote principali in Svizzera." },
      { question: "Posso scorporare l'IVA da un totale?", answer: "Si, scegli la modalita scorpora IVA e inserisci il totale comprensivo di imposta." },
      { question: "Il risultato vale per la dichiarazione IVA?", answer: "E un supporto di calcolo. Per dichiarazioni ufficiali verifica aliquote e regole con fonti competenti." },
    ],
    relatedSlugs: ["calcolo-interessi-composti", "calcolo-mutuo-svizzera", "calcolo-lordo-netto-svizzera"],
  },
  {
    slug: "calcolo-interessi-composti",
    kind: "compound-interest",
    title: "Calcolatore Interessi Composti",
    shortTitle: "Interessi composti",
    category: "Finanza",
    metaTitle: "Calcolatore Interessi Composti Online | Calcolich",
    metaDescription: "Calcola crescita del capitale con interessi composti, versamenti periodici, anni e rendimento annuo.",
    intro: "Simula la crescita di un capitale nel tempo con rendimento composto e versamenti periodici.",
    cta: "Ricevi nuovi strumenti per investimenti, risparmio e gestione capitale.",
    inputs: [
      { key: "initial", label: "Capitale iniziale", defaultValue: "5000", min: "0" },
      { key: "monthly", label: "Versamento mensile", defaultValue: "200", min: "0" },
      { key: "years", label: "Anni", defaultValue: "10", min: "1" },
      { key: "rate", label: "Rendimento annuo %", defaultValue: "6", step: "0.1" },
    ],
    article: [
      "Gli interessi composti sono uno dei concetti piu potenti della finanza personale. A differenza dell'interesse semplice, il rendimento maturato viene reinvestito e produce a sua volta nuovo rendimento. Con il tempo questo effetto puo diventare molto rilevante, soprattutto quando si combinano capitale iniziale, versamenti periodici e orizzonte lungo.",
      "Questo calcolatore permette di stimare il valore futuro di un investimento partendo da quattro variabili: capitale iniziale, versamento mensile, anni e rendimento annuo. Il risultato mostra quanto capitale potresti accumulare, quanto hai versato e quanta parte deriva dalla crescita composta.",
      "La simulazione e utile per obiettivi concreti: creare un fondo emergenza, pianificare investimenti, stimare un capitale per trasferirsi, comprare casa o costruire una rendita futura. Cambiando rendimento e durata puoi capire quanto il tempo incide sul risultato finale. Spesso pochi anni in piu hanno un impatto enorme.",
      "Naturalmente il rendimento reale non e garantito. Mercati, inflazione, tasse, commissioni e rischio possono cambiare il risultato. Il calcolatore serve come bussola iniziale, non come promessa. Usalo per confrontare scenari e mantenere una visione disciplinata sul lungo periodo.",
    ],
    faqs: [
      { question: "Gli interessi composti sono garantiti?", answer: "No. Il calcolo e una simulazione basata sul rendimento annuo inserito." },
      { question: "Il versamento mensile viene capitalizzato?", answer: "Si, viene aggiunto ogni mese e partecipa alla crescita del capitale." },
      { question: "Posso usare il calcolatore per investimenti ETF?", answer: "Si, come simulazione indicativa. Considera sempre costi, tasse e rischio di mercato." },
    ],
    relatedSlugs: ["calcolo-mutuo-svizzera", "calcolo-rischio-trading", "calcolo-drawdown"],
  },
  {
    slug: "calcolo-mutuo-svizzera",
    kind: "mortgage-ch",
    title: "Calcolatore Mutuo Svizzera",
    shortTitle: "Mutuo Svizzera",
    category: "Casa e finanza",
    metaTitle: "Calcolatore Mutuo Svizzera | Rata e Interessi | Calcolich",
    metaDescription: "Stima rata mensile, interessi e costo totale di un mutuo in Svizzera.",
    intro: "Stima una rata mensile indicativa partendo da importo, durata e tasso annuo.",
    cta: "Ricevi strumenti per pianificare casa, mutuo, capitale e cashflow.",
    inputs: [
      { key: "principal", label: "Importo mutuo CHF", defaultValue: "500000", min: "0" },
      { key: "years", label: "Durata anni", defaultValue: "20", min: "1" },
      { key: "rate", label: "Tasso annuo %", defaultValue: "2.5", step: "0.1", min: "0" },
    ],
    article: [
      "Comprare casa o valutare un mutuo richiede numeri chiari. Anche una piccola variazione del tasso puo cambiare la rata mensile e il costo totale nel tempo. Questo calcolatore aiuta a stimare la rata indicativa di un mutuo partendo da importo finanziato, durata e tasso annuo.",
      "Il calcolo usa una formula di ammortamento standard per stimare una rata costante. In Svizzera le strutture ipotecarie possono essere piu articolate, con ipoteche fisse, SARON, ammortamento diretto o indiretto e requisiti di sostenibilita. Per questo il risultato va interpretato come scenario iniziale, non come offerta bancaria.",
      "Lo strumento e utile per capire la sensibilita del mutuo. Puoi aumentare o ridurre il tasso, cambiare durata e importo, poi osservare come cambiano rata e interessi totali. Questo aiuta a non ragionare solo sul prezzo dell'immobile, ma anche sul cashflow mensile necessario per sostenerlo.",
      "Prima di firmare o fare offerte, confronta sempre piu banche o consulenti e considera anche manutenzione, assicurazioni, tasse, spese condominiali e capitale proprio. Il mutuo e una decisione lunga: un calcolo rapido aiuta, ma la pianificazione completa resta fondamentale.",
    ],
    faqs: [
      { question: "La rata calcolata e ufficiale?", answer: "No, e una stima. Le banche possono usare condizioni e strutture diverse." },
      { question: "Il calcolo include tasse e manutenzione?", answer: "No, considera solo importo, durata e tasso del finanziamento." },
      { question: "Posso confrontare tassi diversi?", answer: "Si, cambia il tasso annuo per vedere come varia rata e costo totale." },
    ],
    relatedSlugs: ["calcolo-interessi-composti", "calcolo-salario-netto-svizzera", "calcolo-lordo-netto-svizzera"],
  },
  {
    slug: "calcolo-sostenibilita-ipoteca-svizzera",
    kind: "mortgage-affordability-ch",
    title: "Calcolatore sostenibilita ipoteca Svizzera",
    shortTitle: "Sostenibilita ipoteca",
    category: "Casa Svizzera",
    metaTitle: "Calcolo sostenibilita ipoteca Svizzera | Calcolich",
    metaDescription: "Stima la sostenibilita di un'ipoteca in Svizzera con reddito lordo, prezzo immobile, capitale proprio, tasso teorico e costi accessori.",
    intro: "Verifica se i costi teorici di un'ipoteca restano entro una quota sostenibile del reddito lordo.",
    cta: "Ricevi nuovi calcolatori per casa, budget e finanza in Svizzera.",
    inputs: [
      { key: "grossIncome", label: "Reddito lordo annuo (CHF)", defaultValue: "150000", min: "0" },
      { key: "propertyPrice", label: "Prezzo immobile (CHF)", defaultValue: "850000", min: "0" },
      { key: "equity", label: "Capitale proprio (CHF)", defaultValue: "180000", min: "0" },
      { key: "imputedRate", label: "Tasso teorico (%)", defaultValue: "5", step: "0.1", min: "0" },
      { key: "ancillaryRate", label: "Manutenzione e costi accessori (%)", defaultValue: "1", step: "0.1", min: "0" },
      { key: "maxShare", label: "Quota massima reddito (%)", defaultValue: "33", step: "1", min: "1", max: "80" },
    ],
    article: [
      "La sostenibilita ipotecaria e uno dei controlli centrali prima di comprare casa in Svizzera. Le banche non guardano solo il tasso effettivo del momento, ma spesso simulano un tasso teorico piu prudente.",
      "Il calcolatore stima debito ipotecario, costi annui teorici e quota del reddito lordo. Se la quota supera il limite impostato, il finanziamento potrebbe risultare difficile o richiedere piu capitale proprio.",
      "Il risultato e indicativo: ogni banca applica criteri propri e puo considerare ammortamento, secondo pilastro, eta, oggetto, sostenibilita a lungo termine e situazione familiare.",
    ],
    faqs: [
      { question: "Che tasso devo usare?", answer: "Molte simulazioni usano un tasso teorico prudente, ad esempio 5%, ma la banca decide il criterio effettivo." },
      { question: "Il capitale proprio minimo e sempre 20%?", answer: "Spesso si parte da almeno 20%, ma provenienza dei fondi e regole bancarie contano." },
      { question: "Il risultato garantisce l'approvazione?", answer: "No. E una stima per preparare una valutazione, non una decisione di credito." },
      { question: "Sono inclusi ammortamenti e imposte?", answer: "No. Il modello include interessi teorici e costi accessori stimati; altri costi vanno valutati separatamente." },
      { question: "Perche si usa il reddito lordo?", answer: "La sostenibilita bancaria viene spesso confrontata con il reddito lordo annuo del nucleo." },
    ],
    relatedSlugs: ["calcolo-mutuo-svizzera", "calcolo-affitto-sostenibile-svizzera", "calcolo-budget-mensile"],
  },
  {
    slug: "calcolo-rischio-trading",
    kind: "trading-risk",
    title: "Calcolatore Rischio Trading",
    shortTitle: "Rischio trading",
    category: "Trading",
    metaTitle: "Calcolatore Rischio Trading | Risk Management | Calcolich",
    metaDescription: "Calcola quanto rischiare per trade in base a capitale, percentuale di rischio e stop loss.",
    intro: "Definisci il rischio massimo per operazione e proteggi il capitale prima di entrare a mercato.",
    cta: "Ricevi strumenti e script per risk management, lot size e prop firm.",
    inputs: [
      { key: "account", label: "Capitale conto", defaultValue: "10000", min: "0" },
      { key: "riskPercent", label: "Rischio per trade %", defaultValue: "1", step: "0.1", min: "0" },
      { key: "stopPips", label: "Stop loss in pips/punti", defaultValue: "20", step: "0.1", min: "0" },
      { key: "pipValue", label: "Valore per pip/punto per 1 lotto", defaultValue: "10", step: "0.01", min: "0" },
    ],
    article: [
      "Il risk management e la parte del trading che decide se puoi sopravvivere abbastanza a lungo da migliorare. Molti trader principianti pensano prima all'entrata, al pattern o al profitto potenziale, ma il punto piu importante e sapere quanto puoi perdere se l'idea e sbagliata. Questo calcolatore parte dal capitale e dalla percentuale di rischio per definire il rischio massimo per trade.",
      "Inserendo capitale, percentuale di rischio, stop loss e valore per pip, ottieni una dimensione indicativa della posizione. L'obiettivo e evitare posizioni casuali. Se rischi sempre una quota controllata del conto, una serie negativa fa male ma non distrugge il capitale. Se invece aumenti size senza regole, pochi trade possono compromettere tutto.",
      "Il calcolatore e utile per forex, indici, CFD e strumenti dove puoi stimare valore per punto. Prima di usarlo su conto reale verifica sempre specifiche del broker, contratto, valuta del conto e valore effettivo del pip. Una differenza di specifiche puo cambiare molto il rischio reale.",
      "Per costruire cashflow dal trading o dai contenuti sul trading, la credibilita nasce da regole semplici e ripetibili: rischio fisso, stop definito, size coerente e diario operativo. Questo strumento puo diventare una CTA importante per contenuti ForexFundingGenius, Shorts e guide sulle prop firm.",
    ],
    faqs: [
      { question: "Quanto rischio per trade e consigliabile?", answer: "Molti trader usano 0.5%-1% per trade, ma dipende da strategia, esperienza e tolleranza al rischio." },
      { question: "Il calcolatore apre trade?", answer: "No, serve solo a stimare rischio e dimensione posizione." },
      { question: "Funziona per prop firm?", answer: "Si, e utile per rispettare limiti di drawdown, ma devi adattarlo alle regole della prop firm." },
    ],
    relatedSlugs: ["calcolo-lot-size-forex", "calcolo-drawdown", "calcolo-interessi-composti"],
  },
  {
    slug: "calcolo-lot-size-forex",
    kind: "forex-lot-size",
    title: "Calcolatore Lot Size Forex",
    shortTitle: "Lot size forex",
    category: "Trading",
    metaTitle: "Calcolatore Lot Size Forex | Calcolich",
    metaDescription: "Calcola la lot size forex in base a capitale, rischio percentuale, stop loss e valore pip.",
    intro: "Calcola la dimensione posizione forex coerente con rischio e stop loss.",
    cta: "Ricevi template e strumenti per lot size, drawdown e prop firm.",
    inputs: [
      { key: "account", label: "Capitale conto", defaultValue: "10000", min: "0" },
      { key: "riskPercent", label: "Rischio %", defaultValue: "1", step: "0.1", min: "0" },
      { key: "stopPips", label: "Stop loss pips", defaultValue: "25", step: "0.1", min: "0" },
      { key: "pipValue", label: "Valore pip per 1 lotto", defaultValue: "10", step: "0.01", min: "0" },
    ],
    article: [
      "La lot size forex e uno degli elementi piu importanti per controllare il rischio. Entrare con un setup corretto ma size sbagliata puo trasformare una perdita normale in un danno enorme. Questo calcolatore aiuta a definire la size partendo dal capitale, dalla percentuale di rischio e dalla distanza dello stop loss.",
      "La logica e semplice: prima decidi quanto sei disposto a perdere se il trade va male, poi dividi quel rischio monetario per il rischio per lotto. Se lo stop e ampio, la size si riduce. Se lo stop e stretto, la size puo aumentare, ma sempre entro il rischio massimo impostato.",
      "Per usare lo strumento in modo corretto devi conoscere il valore del pip per lo strumento e per la valuta del conto. Su molte coppie major un lotto standard vale circa 10 per pip, ma non e sempre cosi. Broker, simboli, contratti e valute possono cambiare il valore reale.",
      "La lot size non serve a massimizzare l'adrenalina, serve a mantenere la curva del conto sotto controllo. Nei contenuti ForexFundingGenius, questo concetto puo diventare centrale: proteggi capitale piccolo, evita overlotting e rispetta i limiti di drawdown delle prop firm.",
    ],
    faqs: [
      { question: "Cos'e la lot size?", answer: "E la dimensione della posizione aperta sul mercato forex." },
      { question: "Perche lo stop loss cambia la size?", answer: "Perche uno stop piu largo aumenta il rischio per lotto, quindi la size deve diminuire." },
      { question: "Il valore pip e sempre 10?", answer: "No. Dipende da coppia, broker, contratto e valuta del conto." },
    ],
    relatedSlugs: ["calcolo-rischio-trading", "calcolo-drawdown", "calcolo-interessi-composti"],
  },
  {
    slug: "calcolo-drawdown",
    kind: "drawdown",
    title: "Calcolatore Drawdown",
    shortTitle: "Drawdown",
    category: "Trading",
    metaTitle: "Calcolatore Drawdown Trading | Calcolich",
    metaDescription: "Calcola drawdown percentuale, capitale residuo e recupero necessario dopo una perdita.",
    intro: "Misura quanto capitale perdi e quanto rendimento serve per tornare al punto di partenza.",
    cta: "Ricevi strumenti per proteggere il capitale e migliorare il risk management.",
    inputs: [
      { key: "startEquity", label: "Capitale iniziale", defaultValue: "10000", min: "0" },
      { key: "currentEquity", label: "Capitale attuale", defaultValue: "8500", min: "0" },
    ],
    article: [
      "Il drawdown misura la perdita dal massimo o dal capitale iniziale a un valore piu basso. Nel trading e una metrica fondamentale per capire quanto una strategia o una fase negativa sta danneggiando il conto. Non basta guardare il profitto potenziale: bisogna sapere quanto capitale si puo perdere prima che il recupero diventi difficile.",
      "Questo calcolatore confronta capitale iniziale e capitale attuale, poi mostra perdita monetaria, drawdown percentuale e rendimento necessario per recuperare. Il punto spesso sottovalutato e che recuperare una perdita richiede una percentuale maggiore della perdita stessa. Per esempio, dopo un -50% serve un +100% per tornare al punto di partenza.",
      "Per trader retail e prop firm, il drawdown e ancora piu importante perche molte regole impongono limiti giornalieri o massimi. Se non controlli size e rischio, puoi violare una regola anche con una strategia teoricamente valida. Un calcolatore semplice rende visibile il costo delle perdite.",
      "Usa questo strumento insieme al calcolatore rischio trading e lot size forex. La combinazione ti aiuta a decidere prima quanto rischiare, quanto puoi perdere in serie negative e quando ridurre size. Nel trading, proteggere capitale piccolo e spesso piu importante che cercare subito grandi profitti.",
    ],
    faqs: [
      { question: "Cos'e il drawdown?", answer: "E la perdita rispetto al capitale iniziale o a un massimo precedente." },
      { question: "Perche il recupero richiesto e piu alto?", answer: "Perche dopo una perdita il capitale di partenza e piu piccolo, quindi serve una crescita percentuale maggiore." },
      { question: "Serve per le prop firm?", answer: "Si, aiuta a rispettare limiti di perdita giornaliera e massima." },
    ],
    relatedSlugs: ["calcolo-rischio-trading", "calcolo-lot-size-forex", "calcolo-interessi-composti"],
  },
  {
    slug: "calcolo-percentuale",
    kind: "percentage",
    title: "Calcolatore Percentuale",
    shortTitle: "Percentuale",
    category: "Matematica",
    metaTitle: "Calcolatore Percentuale Online | Calcolich",
    metaDescription: "Calcola rapidamente una percentuale di un importo senza formule manuali. Strumento gratuito con spiegazione semplice, FAQ e link utili.",
    intro: "Calcola rapidamente una percentuale di un importo senza formule manuali.",
    cta: "Ricevi nuovi calcolatori gratuiti per lavoro, finanza, business e trading.",
    inputs: [
      {
        key: "base",
        label: "Importo base",
        defaultValue: "1000",
        min: "0"
      },
      {
        key: "rate",
        label: "Percentuale %",
        defaultValue: "15",
        step: "0.1"
      }
    ],
    article: [
      "Il Calcolatore Percentuale nasce per risolvere un problema semplice ma frequente: ottenere un numero chiaro senza perdere tempo con formule manuali. In molti casi, chi cerca percentuale vuole una risposta immediata per decidere, confrontare alternative o controllare un conteggio prima di usare il dato in una fattura, in un budget, in una trattativa o in una strategia operativa.",
      "Il funzionamento e pratico: inserisci i valori richiesti, controlli che siano coerenti con il tuo caso e leggi subito il risultato principale. La pagina e pensata per persone che vogliono usare lo strumento velocemente, ma anche capire il significato del risultato. Per questo ogni calcolatore include una spiegazione semplice, FAQ, dati strutturati e collegamenti ad altri strumenti utili.",
      "Quando usi questo calcolo, evita l'errore piu comune: trattare una stima come se fosse un dato ufficiale. Il risultato serve per orientarti e fare controlli rapidi, ma per decisioni fiscali, contrattuali, bancarie o di investimento conviene verificare sempre con fonti ufficiali, documenti aggiornati o un professionista qualificato.",
      "Dal punto di vista SEO e business, questo tool ha un obiettivo preciso: portare traffico qualificato su Calcolich e trasformare visite in lead tramite newsletter, richieste servizi o contenuti collegati. Per questo la pagina collega strumenti simili e puo essere usata come destinazione per post social, video brevi, guide e campagne locali."
    ],
    faqs: [
      {
        question: "A cosa serve Calcolatore Percentuale?",
        answer: "Serve a calcolare rapidamente percentuale partendo dai valori principali inseriti dall'utente."
      },
      {
        question: "Il risultato e ufficiale?",
        answer: "No, e una stima pratica. Per decisioni importanti verifica sempre documenti ufficiali, contratto, banca, consulente o fonte competente."
      },
      {
        question: "Posso usare il calcolatore gratis?",
        answer: "Si, lo strumento e gratuito e pensato per essere usato online senza installare nulla."
      }
    ],
    relatedSlugs: [
      "calcolo-sconto",
      "calcolo-aumento-percentuale",
      "calcolo-iva-svizzera"
    ]
  },
  {
    slug: "calcolo-sconto",
    kind: "discount",
    title: "Calcolatore Sconto",
    shortTitle: "Sconto",
    category: "Business",
    metaTitle: "Calcolatore Sconto Online | Calcolich",
    metaDescription: "Calcola sconto, importo risparmiato e prezzo finale partendo dal prezzo iniziale. Strumento gratuito con spiegazione semplice, FAQ e link utili.",
    intro: "Calcola sconto, importo risparmiato e prezzo finale partendo dal prezzo iniziale.",
    cta: "Ricevi nuovi calcolatori gratuiti per lavoro, finanza, business e trading.",
    inputs: [
      {
        key: "price",
        label: "Prezzo iniziale",
        defaultValue: "199",
        min: "0"
      },
      {
        key: "discountRate",
        label: "Sconto %",
        defaultValue: "20",
        step: "0.1",
        min: "0"
      }
    ],
    article: [
      "Il Calcolatore Sconto nasce per risolvere un problema semplice ma frequente: ottenere un numero chiaro senza perdere tempo con formule manuali. In molti casi, chi cerca sconto vuole una risposta immediata per decidere, confrontare alternative o controllare un conteggio prima di usare il dato in una fattura, in un budget, in una trattativa o in una strategia operativa.",
      "Il funzionamento e pratico: inserisci i valori richiesti, controlli che siano coerenti con il tuo caso e leggi subito il risultato principale. La pagina e pensata per persone che vogliono usare lo strumento velocemente, ma anche capire il significato del risultato. Per questo ogni calcolatore include una spiegazione semplice, FAQ, dati strutturati e collegamenti ad altri strumenti utili.",
      "Quando usi questo calcolo, evita l'errore piu comune: trattare una stima come se fosse un dato ufficiale. Il risultato serve per orientarti e fare controlli rapidi, ma per decisioni fiscali, contrattuali, bancarie o di investimento conviene verificare sempre con fonti ufficiali, documenti aggiornati o un professionista qualificato.",
      "Dal punto di vista SEO e business, questo tool ha un obiettivo preciso: portare traffico qualificato su Calcolich e trasformare visite in lead tramite newsletter, richieste servizi o contenuti collegati. Per questo la pagina collega strumenti simili e puo essere usata come destinazione per post social, video brevi, guide e campagne locali."
    ],
    faqs: [
      {
        question: "A cosa serve Calcolatore Sconto?",
        answer: "Serve a calcolare rapidamente sconto partendo dai valori principali inseriti dall'utente."
      },
      {
        question: "Il risultato e ufficiale?",
        answer: "No, e una stima pratica. Per decisioni importanti verifica sempre documenti ufficiali, contratto, banca, consulente o fonte competente."
      },
      {
        question: "Posso usare il calcolatore gratis?",
        answer: "Si, lo strumento e gratuito e pensato per essere usato online senza installare nulla."
      }
    ],
    relatedSlugs: [
      "calcolo-percentuale",
      "calcolo-margine-profitto",
      "calcolo-prezzo-vendita"
    ]
  },
  {
    slug: "calcolo-aumento-percentuale",
    kind: "percentage-change",
    title: "Calcolatore Aumento Percentuale",
    shortTitle: "Aumento %",
    category: "Matematica",
    metaTitle: "Calcolatore Aumento Percentuale Online | Calcolich",
    metaDescription: "Misura aumento o diminuzione percentuale tra due valori. Strumento gratuito con spiegazione semplice, FAQ e link utili.",
    intro: "Misura aumento o diminuzione percentuale tra due valori.",
    cta: "Ricevi nuovi calcolatori gratuiti per lavoro, finanza, business e trading.",
    inputs: [
      {
        key: "startValue",
        label: "Valore iniziale",
        defaultValue: "100",
        min: "0"
      },
      {
        key: "endValue",
        label: "Valore finale",
        defaultValue: "125",
        min: "0"
      }
    ],
    article: [
      "Il Calcolatore Aumento Percentuale nasce per risolvere un problema semplice ma frequente: ottenere un numero chiaro senza perdere tempo con formule manuali. In molti casi, chi cerca aumento percentuale vuole una risposta immediata per decidere, confrontare alternative o controllare un conteggio prima di usare il dato in una fattura, in un budget, in una trattativa o in una strategia operativa.",
      "Il funzionamento e pratico: inserisci i valori richiesti, controlli che siano coerenti con il tuo caso e leggi subito il risultato principale. La pagina e pensata per persone che vogliono usare lo strumento velocemente, ma anche capire il significato del risultato. Per questo ogni calcolatore include una spiegazione semplice, FAQ, dati strutturati e collegamenti ad altri strumenti utili.",
      "Quando usi questo calcolo, evita l'errore piu comune: trattare una stima come se fosse un dato ufficiale. Il risultato serve per orientarti e fare controlli rapidi, ma per decisioni fiscali, contrattuali, bancarie o di investimento conviene verificare sempre con fonti ufficiali, documenti aggiornati o un professionista qualificato.",
      "Dal punto di vista SEO e business, questo tool ha un obiettivo preciso: portare traffico qualificato su Calcolich e trasformare visite in lead tramite newsletter, richieste servizi o contenuti collegati. Per questo la pagina collega strumenti simili e puo essere usata come destinazione per post social, video brevi, guide e campagne locali."
    ],
    faqs: [
      {
        question: "A cosa serve Calcolatore Aumento Percentuale?",
        answer: "Serve a calcolare rapidamente aumento percentuale partendo dai valori principali inseriti dall'utente."
      },
      {
        question: "Il risultato e ufficiale?",
        answer: "No, e una stima pratica. Per decisioni importanti verifica sempre documenti ufficiali, contratto, banca, consulente o fonte competente."
      },
      {
        question: "Posso usare il calcolatore gratis?",
        answer: "Si, lo strumento e gratuito e pensato per essere usato online senza installare nulla."
      }
    ],
    relatedSlugs: [
      "calcolo-percentuale",
      "calcolo-roi",
      "calcolo-interessi-composti"
    ]
  },
  {
    slug: "calcolo-margine-profitto",
    kind: "margin-markup",
    title: "Calcolatore Margine Profitto",
    shortTitle: "Margine profitto",
    category: "Business",
    metaTitle: "Calcolatore Margine Profitto Online | Calcolich",
    metaDescription: "Calcola profitto, margine e markup partendo da costo e prezzo di vendita. Strumento gratuito con spiegazione semplice, FAQ e link utili.",
    intro: "Calcola profitto, margine e markup partendo da costo e prezzo di vendita.",
    cta: "Ricevi nuovi calcolatori gratuiti per lavoro, finanza, business e trading.",
    inputs: [
      {
        key: "cost",
        label: "Costo prodotto/servizio",
        defaultValue: "60",
        min: "0"
      },
      {
        key: "price",
        label: "Prezzo vendita",
        defaultValue: "100",
        min: "0"
      }
    ],
    article: [
      "Il Calcolatore Margine Profitto nasce per risolvere un problema semplice ma frequente: ottenere un numero chiaro senza perdere tempo con formule manuali. In molti casi, chi cerca margine profitto vuole una risposta immediata per decidere, confrontare alternative o controllare un conteggio prima di usare il dato in una fattura, in un budget, in una trattativa o in una strategia operativa.",
      "Il funzionamento e pratico: inserisci i valori richiesti, controlli che siano coerenti con il tuo caso e leggi subito il risultato principale. La pagina e pensata per persone che vogliono usare lo strumento velocemente, ma anche capire il significato del risultato. Per questo ogni calcolatore include una spiegazione semplice, FAQ, dati strutturati e collegamenti ad altri strumenti utili.",
      "Quando usi questo calcolo, evita l'errore piu comune: trattare una stima come se fosse un dato ufficiale. Il risultato serve per orientarti e fare controlli rapidi, ma per decisioni fiscali, contrattuali, bancarie o di investimento conviene verificare sempre con fonti ufficiali, documenti aggiornati o un professionista qualificato.",
      "Dal punto di vista SEO e business, questo tool ha un obiettivo preciso: portare traffico qualificato su Calcolich e trasformare visite in lead tramite newsletter, richieste servizi o contenuti collegati. Per questo la pagina collega strumenti simili e puo essere usata come destinazione per post social, video brevi, guide e campagne locali."
    ],
    faqs: [
      {
        question: "A cosa serve Calcolatore Margine Profitto?",
        answer: "Serve a calcolare rapidamente margine profitto partendo dai valori principali inseriti dall'utente."
      },
      {
        question: "Il risultato e ufficiale?",
        answer: "No, e una stima pratica. Per decisioni importanti verifica sempre documenti ufficiali, contratto, banca, consulente o fonte competente."
      },
      {
        question: "Posso usare il calcolatore gratis?",
        answer: "Si, lo strumento e gratuito e pensato per essere usato online senza installare nulla."
      }
    ],
    relatedSlugs: [
      "calcolo-break-even",
      "calcolo-prezzo-vendita",
      "calcolo-sconto"
    ]
  },
  {
    slug: "calcolo-roi",
    kind: "roi",
    title: "Calcolatore ROI",
    shortTitle: "ROI",
    category: "Finanza",
    metaTitle: "Calcolatore ROI Online | Calcolich",
    metaDescription: "Calcola ritorno sull'investimento, profitto netto e rendimento percentuale. Strumento gratuito con spiegazione semplice, FAQ e link utili.",
    intro: "Calcola ritorno sull'investimento, profitto netto e rendimento percentuale.",
    cta: "Ricevi nuovi calcolatori gratuiti per lavoro, finanza, business e trading.",
    inputs: [
      {
        key: "cost",
        label: "Investimento iniziale",
        defaultValue: "1000",
        min: "0"
      },
      {
        key: "gain",
        label: "Valore finale o ricavo",
        defaultValue: "1250",
        min: "0"
      }
    ],
    article: [
      "Il Calcolatore ROI nasce per risolvere un problema semplice ma frequente: ottenere un numero chiaro senza perdere tempo con formule manuali. In molti casi, chi cerca roi vuole una risposta immediata per decidere, confrontare alternative o controllare un conteggio prima di usare il dato in una fattura, in un budget, in una trattativa o in una strategia operativa.",
      "Il funzionamento e pratico: inserisci i valori richiesti, controlli che siano coerenti con il tuo caso e leggi subito il risultato principale. La pagina e pensata per persone che vogliono usare lo strumento velocemente, ma anche capire il significato del risultato. Per questo ogni calcolatore include una spiegazione semplice, FAQ, dati strutturati e collegamenti ad altri strumenti utili.",
      "Quando usi questo calcolo, evita l'errore piu comune: trattare una stima come se fosse un dato ufficiale. Il risultato serve per orientarti e fare controlli rapidi, ma per decisioni fiscali, contrattuali, bancarie o di investimento conviene verificare sempre con fonti ufficiali, documenti aggiornati o un professionista qualificato.",
      "Dal punto di vista SEO e business, questo tool ha un obiettivo preciso: portare traffico qualificato su Calcolich e trasformare visite in lead tramite newsletter, richieste servizi o contenuti collegati. Per questo la pagina collega strumenti simili e puo essere usata come destinazione per post social, video brevi, guide e campagne locali."
    ],
    faqs: [
      {
        question: "A cosa serve Calcolatore ROI?",
        answer: "Serve a calcolare rapidamente roi partendo dai valori principali inseriti dall'utente."
      },
      {
        question: "Il risultato e ufficiale?",
        answer: "No, e una stima pratica. Per decisioni importanti verifica sempre documenti ufficiali, contratto, banca, consulente o fonte competente."
      },
      {
        question: "Posso usare il calcolatore gratis?",
        answer: "Si, lo strumento e gratuito e pensato per essere usato online senza installare nulla."
      }
    ],
    relatedSlugs: [
      "calcolo-interessi-composti",
      "calcolo-aumento-percentuale",
      "calcolo-profitto-trading"
    ]
  },
  {
    slug: "calcolo-break-even",
    kind: "break-even",
    title: "Calcolatore Break Even",
    shortTitle: "Break even",
    category: "Business",
    metaTitle: "Calcolatore Break Even Online | Calcolich",
    metaDescription: "Scopri quante vendite servono per coprire i costi e arrivare al pareggio. Strumento gratuito con spiegazione semplice, FAQ e link utili.",
    intro: "Scopri quante vendite servono per coprire i costi e arrivare al pareggio.",
    cta: "Ricevi nuovi calcolatori gratuiti per lavoro, finanza, business e trading.",
    inputs: [
      {
        key: "fixedCosts",
        label: "Costi fissi",
        defaultValue: "1000",
        min: "0"
      },
      {
        key: "price",
        label: "Prezzo vendita unitario",
        defaultValue: "100",
        min: "0"
      },
      {
        key: "variableCost",
        label: "Costo variabile unitario",
        defaultValue: "35",
        min: "0"
      }
    ],
    article: [
      "Il Calcolatore Break Even nasce per risolvere un problema semplice ma frequente: ottenere un numero chiaro senza perdere tempo con formule manuali. In molti casi, chi cerca break even vuole una risposta immediata per decidere, confrontare alternative o controllare un conteggio prima di usare il dato in una fattura, in un budget, in una trattativa o in una strategia operativa.",
      "Il funzionamento e pratico: inserisci i valori richiesti, controlli che siano coerenti con il tuo caso e leggi subito il risultato principale. La pagina e pensata per persone che vogliono usare lo strumento velocemente, ma anche capire il significato del risultato. Per questo ogni calcolatore include una spiegazione semplice, FAQ, dati strutturati e collegamenti ad altri strumenti utili.",
      "Quando usi questo calcolo, evita l'errore piu comune: trattare una stima come se fosse un dato ufficiale. Il risultato serve per orientarti e fare controlli rapidi, ma per decisioni fiscali, contrattuali, bancarie o di investimento conviene verificare sempre con fonti ufficiali, documenti aggiornati o un professionista qualificato.",
      "Dal punto di vista SEO e business, questo tool ha un obiettivo preciso: portare traffico qualificato su Calcolich e trasformare visite in lead tramite newsletter, richieste servizi o contenuti collegati. Per questo la pagina collega strumenti simili e puo essere usata come destinazione per post social, video brevi, guide e campagne locali."
    ],
    faqs: [
      {
        question: "A cosa serve Calcolatore Break Even?",
        answer: "Serve a calcolare rapidamente break even partendo dai valori principali inseriti dall'utente."
      },
      {
        question: "Il risultato e ufficiale?",
        answer: "No, e una stima pratica. Per decisioni importanti verifica sempre documenti ufficiali, contratto, banca, consulente o fonte competente."
      },
      {
        question: "Posso usare il calcolatore gratis?",
        answer: "Si, lo strumento e gratuito e pensato per essere usato online senza installare nulla."
      }
    ],
    relatedSlugs: [
      "calcolo-margine-profitto",
      "calcolo-prezzo-vendita",
      "calcolo-fattura-freelance"
    ]
  },
  {
    slug: "calcolo-rata-prestito",
    kind: "loan-payment",
    title: "Calcolatore Rata Prestito",
    shortTitle: "Rata prestito",
    category: "Finanza",
    metaTitle: "Calcolatore Rata Prestito Online | Calcolich",
    metaDescription: "Stima rata mensile, interessi e totale pagato per un prestito. Strumento gratuito con spiegazione semplice, FAQ e link utili.",
    intro: "Stima rata mensile, interessi e totale pagato per un prestito.",
    cta: "Ricevi nuovi calcolatori gratuiti per lavoro, finanza, business e trading.",
    inputs: [
      {
        key: "principal",
        label: "Importo prestito",
        defaultValue: "15000",
        min: "0"
      },
      {
        key: "months",
        label: "Durata mesi",
        defaultValue: "48",
        min: "1"
      },
      {
        key: "rate",
        label: "Tasso annuo %",
        defaultValue: "5.5",
        step: "0.1",
        min: "0"
      }
    ],
    article: [
      "Il Calcolatore Rata Prestito nasce per risolvere un problema semplice ma frequente: ottenere un numero chiaro senza perdere tempo con formule manuali. In molti casi, chi cerca rata prestito vuole una risposta immediata per decidere, confrontare alternative o controllare un conteggio prima di usare il dato in una fattura, in un budget, in una trattativa o in una strategia operativa.",
      "Il funzionamento e pratico: inserisci i valori richiesti, controlli che siano coerenti con il tuo caso e leggi subito il risultato principale. La pagina e pensata per persone che vogliono usare lo strumento velocemente, ma anche capire il significato del risultato. Per questo ogni calcolatore include una spiegazione semplice, FAQ, dati strutturati e collegamenti ad altri strumenti utili.",
      "Quando usi questo calcolo, evita l'errore piu comune: trattare una stima come se fosse un dato ufficiale. Il risultato serve per orientarti e fare controlli rapidi, ma per decisioni fiscali, contrattuali, bancarie o di investimento conviene verificare sempre con fonti ufficiali, documenti aggiornati o un professionista qualificato.",
      "Dal punto di vista SEO e business, questo tool ha un obiettivo preciso: portare traffico qualificato su Calcolich e trasformare visite in lead tramite newsletter, richieste servizi o contenuti collegati. Per questo la pagina collega strumenti simili e puo essere usata come destinazione per post social, video brevi, guide e campagne locali."
    ],
    faqs: [
      {
        question: "A cosa serve Calcolatore Rata Prestito?",
        answer: "Serve a calcolare rapidamente rata prestito partendo dai valori principali inseriti dall'utente."
      },
      {
        question: "Il risultato e ufficiale?",
        answer: "No, e una stima pratica. Per decisioni importanti verifica sempre documenti ufficiali, contratto, banca, consulente o fonte competente."
      },
      {
        question: "Posso usare il calcolatore gratis?",
        answer: "Si, lo strumento e gratuito e pensato per essere usato online senza installare nulla."
      }
    ],
    relatedSlugs: [
      "calcolo-mutuo-svizzera",
      "calcolo-interessi-composti",
      "calcolo-budget-mensile"
    ]
  },
  {
    slug: "calcolo-profitto-trading",
    kind: "profit-loss",
    title: "Calcolatore Profitto Trading",
    shortTitle: "Profitto trading",
    category: "Trading",
    metaTitle: "Calcolatore Profitto Trading Online | Calcolich",
    metaDescription: "Calcola profitto o perdita di un trade partendo da entrata, uscita e quantita. Strumento gratuito con spiegazione semplice, FAQ e link utili.",
    intro: "Calcola profitto o perdita di un trade partendo da entrata, uscita e quantita.",
    cta: "Ricevi nuovi calcolatori gratuiti per lavoro, finanza, business e trading.",
    inputs: [
      {
        key: "direction",
        label: "Direzione",
        type: "select",
        defaultValue: "long",
        options: [
          {
            label: "Long",
            value: "long"
          },
          {
            label: "Short",
            value: "short"
          }
        ]
      },
      {
        key: "entry",
        label: "Prezzo entrata",
        defaultValue: "100",
        min: "0"
      },
      {
        key: "exit",
        label: "Prezzo uscita",
        defaultValue: "112",
        min: "0"
      },
      {
        key: "quantity",
        label: "Quantita",
        defaultValue: "10",
        min: "0"
      }
    ],
    article: [
      "Il Calcolatore Profitto Trading nasce per risolvere un problema semplice ma frequente: ottenere un numero chiaro senza perdere tempo con formule manuali. In molti casi, chi cerca profitto trading vuole una risposta immediata per decidere, confrontare alternative o controllare un conteggio prima di usare il dato in una fattura, in un budget, in una trattativa o in una strategia operativa.",
      "Il funzionamento e pratico: inserisci i valori richiesti, controlli che siano coerenti con il tuo caso e leggi subito il risultato principale. La pagina e pensata per persone che vogliono usare lo strumento velocemente, ma anche capire il significato del risultato. Per questo ogni calcolatore include una spiegazione semplice, FAQ, dati strutturati e collegamenti ad altri strumenti utili.",
      "Quando usi questo calcolo, evita l'errore piu comune: trattare una stima come se fosse un dato ufficiale. Il risultato serve per orientarti e fare controlli rapidi, ma per decisioni fiscali, contrattuali, bancarie o di investimento conviene verificare sempre con fonti ufficiali, documenti aggiornati o un professionista qualificato.",
      "Dal punto di vista SEO e business, questo tool ha un obiettivo preciso: portare traffico qualificato su Calcolich e trasformare visite in lead tramite newsletter, richieste servizi o contenuti collegati. Per questo la pagina collega strumenti simili e puo essere usata come destinazione per post social, video brevi, guide e campagne locali."
    ],
    faqs: [
      {
        question: "A cosa serve Calcolatore Profitto Trading?",
        answer: "Serve a calcolare rapidamente profitto trading partendo dai valori principali inseriti dall'utente."
      },
      {
        question: "Il risultato e ufficiale?",
        answer: "No, e una stima pratica. Per decisioni importanti verifica sempre documenti ufficiali, contratto, banca, consulente o fonte competente."
      },
      {
        question: "Posso usare il calcolatore gratis?",
        answer: "Si, lo strumento e gratuito e pensato per essere usato online senza installare nulla."
      }
    ],
    relatedSlugs: [
      "calcolo-rischio-trading",
      "calcolo-risk-reward",
      "calcolo-drawdown"
    ]
  },
  {
    slug: "calcolo-risk-reward",
    kind: "risk-reward",
    title: "Calcolatore Risk Reward",
    shortTitle: "Risk reward",
    category: "Trading",
    metaTitle: "Calcolatore Risk Reward Online | Calcolich",
    metaDescription: "Confronta rischio e potenziale profitto prima di aprire un trade. Strumento gratuito con spiegazione semplice, FAQ e link utili.",
    intro: "Confronta rischio e potenziale profitto prima di aprire un trade.",
    cta: "Ricevi nuovi calcolatori gratuiti per lavoro, finanza, business e trading.",
    inputs: [
      {
        key: "entry",
        label: "Prezzo entrata",
        defaultValue: "100",
        min: "0"
      },
      {
        key: "stop",
        label: "Stop loss",
        defaultValue: "96",
        min: "0"
      },
      {
        key: "target",
        label: "Take profit",
        defaultValue: "112",
        min: "0"
      }
    ],
    article: [
      "Il Calcolatore Risk Reward nasce per risolvere un problema semplice ma frequente: ottenere un numero chiaro senza perdere tempo con formule manuali. In molti casi, chi cerca risk reward vuole una risposta immediata per decidere, confrontare alternative o controllare un conteggio prima di usare il dato in una fattura, in un budget, in una trattativa o in una strategia operativa.",
      "Il funzionamento e pratico: inserisci i valori richiesti, controlli che siano coerenti con il tuo caso e leggi subito il risultato principale. La pagina e pensata per persone che vogliono usare lo strumento velocemente, ma anche capire il significato del risultato. Per questo ogni calcolatore include una spiegazione semplice, FAQ, dati strutturati e collegamenti ad altri strumenti utili.",
      "Quando usi questo calcolo, evita l'errore piu comune: trattare una stima come se fosse un dato ufficiale. Il risultato serve per orientarti e fare controlli rapidi, ma per decisioni fiscali, contrattuali, bancarie o di investimento conviene verificare sempre con fonti ufficiali, documenti aggiornati o un professionista qualificato.",
      "Dal punto di vista SEO e business, questo tool ha un obiettivo preciso: portare traffico qualificato su Calcolich e trasformare visite in lead tramite newsletter, richieste servizi o contenuti collegati. Per questo la pagina collega strumenti simili e puo essere usata come destinazione per post social, video brevi, guide e campagne locali."
    ],
    faqs: [
      {
        question: "A cosa serve Calcolatore Risk Reward?",
        answer: "Serve a calcolare rapidamente risk reward partendo dai valori principali inseriti dall'utente."
      },
      {
        question: "Il risultato e ufficiale?",
        answer: "No, e una stima pratica. Per decisioni importanti verifica sempre documenti ufficiali, contratto, banca, consulente o fonte competente."
      },
      {
        question: "Posso usare il calcolatore gratis?",
        answer: "Si, lo strumento e gratuito e pensato per essere usato online senza installare nulla."
      }
    ],
    relatedSlugs: [
      "calcolo-rischio-trading",
      "calcolo-profitto-trading",
      "calcolo-lot-size-forex"
    ]
  },
  {
    slug: "calcolo-obiettivo-risparmio",
    kind: "savings-goal",
    title: "Calcolatore Obiettivo Risparmio",
    shortTitle: "Obiettivo risparmio",
    category: "Finanza personale",
    metaTitle: "Calcolatore Obiettivo Risparmio Online | Calcolich",
    metaDescription: "Calcola quanto tempo serve per raggiungere un obiettivo di risparmio. Strumento gratuito con spiegazione semplice, FAQ e link utili.",
    intro: "Calcola quanto tempo serve per raggiungere un obiettivo di risparmio.",
    cta: "Ricevi nuovi calcolatori gratuiti per lavoro, finanza, business e trading.",
    inputs: [
      {
        key: "goal",
        label: "Obiettivo",
        defaultValue: "10000",
        min: "0"
      },
      {
        key: "current",
        label: "Gia risparmiato",
        defaultValue: "2500",
        min: "0"
      },
      {
        key: "monthly",
        label: "Risparmio mensile",
        defaultValue: "500",
        min: "0"
      }
    ],
    article: [
      "Il Calcolatore Obiettivo Risparmio nasce per risolvere un problema semplice ma frequente: ottenere un numero chiaro senza perdere tempo con formule manuali. In molti casi, chi cerca obiettivo risparmio vuole una risposta immediata per decidere, confrontare alternative o controllare un conteggio prima di usare il dato in una fattura, in un budget, in una trattativa o in una strategia operativa.",
      "Il funzionamento e pratico: inserisci i valori richiesti, controlli che siano coerenti con il tuo caso e leggi subito il risultato principale. La pagina e pensata per persone che vogliono usare lo strumento velocemente, ma anche capire il significato del risultato. Per questo ogni calcolatore include una spiegazione semplice, FAQ, dati strutturati e collegamenti ad altri strumenti utili.",
      "Quando usi questo calcolo, evita l'errore piu comune: trattare una stima come se fosse un dato ufficiale. Il risultato serve per orientarti e fare controlli rapidi, ma per decisioni fiscali, contrattuali, bancarie o di investimento conviene verificare sempre con fonti ufficiali, documenti aggiornati o un professionista qualificato.",
      "Dal punto di vista SEO e business, questo tool ha un obiettivo preciso: portare traffico qualificato su Calcolich e trasformare visite in lead tramite newsletter, richieste servizi o contenuti collegati. Per questo la pagina collega strumenti simili e puo essere usata come destinazione per post social, video brevi, guide e campagne locali."
    ],
    faqs: [
      {
        question: "A cosa serve Calcolatore Obiettivo Risparmio?",
        answer: "Serve a calcolare rapidamente obiettivo risparmio partendo dai valori principali inseriti dall'utente."
      },
      {
        question: "Il risultato e ufficiale?",
        answer: "No, e una stima pratica. Per decisioni importanti verifica sempre documenti ufficiali, contratto, banca, consulente o fonte competente."
      },
      {
        question: "Posso usare il calcolatore gratis?",
        answer: "Si, lo strumento e gratuito e pensato per essere usato online senza installare nulla."
      }
    ],
    relatedSlugs: [
      "calcolo-budget-mensile",
      "calcolo-interessi-composti",
      "calcolo-rata-prestito"
    ]
  },
  {
    slug: "calcolo-costo-orario",
    kind: "hourly-cost",
    title: "Calcolatore Costo Orario",
    shortTitle: "Costo orario",
    category: "Lavoro",
    metaTitle: "Calcolatore Costo Orario Online | Calcolich",
    metaDescription: "Trasforma un costo mensile in costo orario per lavoro, servizi o freelance. Strumento gratuito con spiegazione semplice, FAQ e link utili.",
    intro: "Trasforma un costo mensile in costo orario per lavoro, servizi o freelance.",
    cta: "Ricevi nuovi calcolatori gratuiti per lavoro, finanza, business e trading.",
    inputs: [
      {
        key: "monthlyCost",
        label: "Costo mensile",
        defaultValue: "6000",
        min: "0"
      },
      {
        key: "hours",
        label: "Ore mensili",
        defaultValue: "160",
        min: "1"
      }
    ],
    article: [
      "Il Calcolatore Costo Orario nasce per risolvere un problema semplice ma frequente: ottenere un numero chiaro senza perdere tempo con formule manuali. In molti casi, chi cerca costo orario vuole una risposta immediata per decidere, confrontare alternative o controllare un conteggio prima di usare il dato in una fattura, in un budget, in una trattativa o in una strategia operativa.",
      "Il funzionamento e pratico: inserisci i valori richiesti, controlli che siano coerenti con il tuo caso e leggi subito il risultato principale. La pagina e pensata per persone che vogliono usare lo strumento velocemente, ma anche capire il significato del risultato. Per questo ogni calcolatore include una spiegazione semplice, FAQ, dati strutturati e collegamenti ad altri strumenti utili.",
      "Quando usi questo calcolo, evita l'errore piu comune: trattare una stima come se fosse un dato ufficiale. Il risultato serve per orientarti e fare controlli rapidi, ma per decisioni fiscali, contrattuali, bancarie o di investimento conviene verificare sempre con fonti ufficiali, documenti aggiornati o un professionista qualificato.",
      "Dal punto di vista SEO e business, questo tool ha un obiettivo preciso: portare traffico qualificato su Calcolich e trasformare visite in lead tramite newsletter, richieste servizi o contenuti collegati. Per questo la pagina collega strumenti simili e puo essere usata come destinazione per post social, video brevi, guide e campagne locali."
    ],
    faqs: [
      {
        question: "A cosa serve Calcolatore Costo Orario?",
        answer: "Serve a calcolare rapidamente costo orario partendo dai valori principali inseriti dall'utente."
      },
      {
        question: "Il risultato e ufficiale?",
        answer: "No, e una stima pratica. Per decisioni importanti verifica sempre documenti ufficiali, contratto, banca, consulente o fonte competente."
      },
      {
        question: "Posso usare il calcolatore gratis?",
        answer: "Si, lo strumento e gratuito e pensato per essere usato online senza installare nulla."
      }
    ],
    relatedSlugs: [
      "calcolo-ore-lavoro",
      "calcolo-fattura-freelance",
      "calcolo-salario-netto-svizzera"
    ]
  },
  {
    slug: "calcolo-stipendio-annuale-mensile",
    kind: "annual-monthly",
    title: "Calcolatore Stipendio Annuale Mensile",
    shortTitle: "Annuale mensile",
    category: "Stipendio Svizzera",
    metaTitle: "Calcolatore Stipendio Annuale Mensile Online | Calcolich",
    metaDescription: "Converti uno stipendio annuale in importo mensile su 12 o 13 mensilita. Strumento gratuito con spiegazione semplice, FAQ e link utili.",
    intro: "Converti uno stipendio annuale in importo mensile su 12 o 13 mensilita.",
    cta: "Ricevi nuovi calcolatori gratuiti per lavoro, finanza, business e trading.",
    inputs: [
      {
        key: "annual",
        label: "Stipendio annuale",
        defaultValue: "78000",
        min: "0"
      },
      {
        key: "months",
        label: "Mensilita",
        defaultValue: "13",
        min: "1",
        max: "14"
      }
    ],
    article: [
      "Il Calcolatore Stipendio Annuale Mensile nasce per risolvere un problema semplice ma frequente: ottenere un numero chiaro senza perdere tempo con formule manuali. In molti casi, chi cerca stipendio annuale mensile vuole una risposta immediata per decidere, confrontare alternative o controllare un conteggio prima di usare il dato in una fattura, in un budget, in una trattativa o in una strategia operativa.",
      "Il funzionamento e pratico: inserisci i valori richiesti, controlli che siano coerenti con il tuo caso e leggi subito il risultato principale. La pagina e pensata per persone che vogliono usare lo strumento velocemente, ma anche capire il significato del risultato. Per questo ogni calcolatore include una spiegazione semplice, FAQ, dati strutturati e collegamenti ad altri strumenti utili.",
      "Quando usi questo calcolo, evita l'errore piu comune: trattare una stima come se fosse un dato ufficiale. Il risultato serve per orientarti e fare controlli rapidi, ma per decisioni fiscali, contrattuali, bancarie o di investimento conviene verificare sempre con fonti ufficiali, documenti aggiornati o un professionista qualificato.",
      "Dal punto di vista SEO e business, questo tool ha un obiettivo preciso: portare traffico qualificato su Calcolich e trasformare visite in lead tramite newsletter, richieste servizi o contenuti collegati. Per questo la pagina collega strumenti simili e puo essere usata come destinazione per post social, video brevi, guide e campagne locali."
    ],
    faqs: [
      {
        question: "A cosa serve Calcolatore Stipendio Annuale Mensile?",
        answer: "Serve a calcolare rapidamente stipendio annuale mensile partendo dai valori principali inseriti dall'utente."
      },
      {
        question: "Il risultato e ufficiale?",
        answer: "No, e una stima pratica. Per decisioni importanti verifica sempre documenti ufficiali, contratto, banca, consulente o fonte competente."
      },
      {
        question: "Posso usare il calcolatore gratis?",
        answer: "Si, lo strumento e gratuito e pensato per essere usato online senza installare nulla."
      }
    ],
    relatedSlugs: [
      "calcolo-salario-netto-svizzera",
      "calcolo-lordo-netto-svizzera",
      "calcolo-tredicesima-svizzera"
    ]
  },
  {
    slug: "calcolo-imposta-alla-fonte-svizzera",
    kind: "withholding-tax-ch",
    title: "Calcolatore Imposta alla Fonte Svizzera",
    shortTitle: "Imposta alla fonte",
    category: "Tasse Svizzera",
    metaTitle: "Calcolo Imposta alla Fonte Svizzera | Calcolich",
    metaDescription: "Stima imposta alla fonte, salario netto e trattenuta mensile partendo da lordo, cantone e aliquota.",
    intro: "Stima rapidamente quanta imposta alla fonte puo incidere sul salario mensile in Svizzera.",
    cta: "Ricevi nuovi strumenti per capire salario netto, imposte e lavoro in Svizzera.",
    inputs: [
      { key: "gross", label: "Salario lordo mensile CHF", defaultValue: "6500", min: "0" },
      { key: "socialRate", label: "Deduzioni sociali %", defaultValue: "12", step: "0.1", min: "0", max: "60" },
      { key: "taxRate", label: "Aliquota imposta alla fonte %", defaultValue: "8", step: "0.1", min: "0", max: "60" },
    ],
    article: [
      "L'imposta alla fonte e una delle ricerche piu importanti per chi lavora in Svizzera con permesso, trasferimento recente o situazione fiscale non ancora ordinaria. Questo calcolatore aiuta a stimare l'effetto della trattenuta mensile partendo dal salario lordo, dalle deduzioni sociali e da una aliquota indicativa.",
      "Il risultato non sostituisce le tabelle ufficiali cantonali, ma rende immediata la differenza tra lordo, contributi e netto stimato. Per un calcolo piu preciso bisogna verificare cantone, stato civile, figli, confessione, permesso e tariffa applicabile.",
      "La pagina e pensata anche per chi cerca in tedesco o inglese termini come Quellensteuer Rechner Schweiz o withholding tax calculator Switzerland. Il focus resta pratico: capire subito se una offerta salariale e sostenibile.",
      "Usa questo strumento insieme al calcolatore stipendio netto, lordo netto e budget mensile per valutare il cashflow reale prima di trasferirti o accettare una nuova posizione.",
    ],
    faqs: [
      { question: "Il calcolo usa le tabelle cantonali ufficiali?", answer: "No, usa una aliquota inserita dall'utente. Per il valore ufficiale bisogna consultare le tabelle del cantone." },
      { question: "A chi serve l'imposta alla fonte?", answer: "Di solito riguarda lavoratori stranieri o situazioni specifiche. Le regole cambiano in base a permesso, cantone e situazione personale." },
      { question: "Posso usarlo per confrontare offerte di lavoro?", answer: "Si, come stima iniziale del netto mensile dopo deduzioni e imposta alla fonte." },
    ],
    relatedSlugs: ["calcolo-salario-netto-svizzera", "calcolo-lordo-netto-svizzera", "calcolo-budget-mensile"],
    guideLinks: [
      {
        href: "/guide/imposta-alla-fonte-svizzera",
        label: "Guida imposta alla fonte Svizzera",
        description: "Dati da preparare, limiti della stima e collegamento con lo stipendio netto.",
      },
      {
        href: "/guide/stipendio-netto-svizzera",
        label: "Guida stipendio netto",
        description: "Come leggere deduzioni e netto disponibile prima di una decisione salariale.",
      },
    ],
  },
  {
    slug: "calcolo-cassa-malati-svizzera",
    kind: "health-insurance-ch",
    title: "Calcolatore Cassa Malati Svizzera",
    shortTitle: "Cassa malati",
    category: "Assicurazioni Svizzera",
    metaTitle: "Calcolo Cassa Malati Svizzera | Premi e Franchigia | Calcolich",
    metaDescription: "Stima costo annuo della cassa malati in Svizzera combinando premio mensile, franchigia e spese mediche.",
    intro: "Confronta premio mensile, franchigia e spese previste per stimare il costo annuo della cassa malati.",
    cta: "Ricevi strumenti utili per pianificare spese, assicurazioni e budget in Svizzera.",
    inputs: [
      { key: "premium", label: "Premio mensile CHF", defaultValue: "380", min: "0" },
      { key: "franchise", label: "Franchigia CHF", defaultValue: "2500", min: "0" },
      { key: "medicalCosts", label: "Spese mediche annue previste CHF", defaultValue: "1200", min: "0" },
    ],
    article: [
      "La cassa malati e una delle spese ricorrenti piu importanti in Svizzera. Il premio mensile non racconta tutto: franchigia, spese mediche previste e partecipazione ai costi cambiano molto il costo annuo reale.",
      "Questo calcolatore confronta premio annuo, quota di spese fino alla franchigia e una stima semplice della partecipazione. Serve per ragionare su scenari, non per sostituire un confronto assicurativo ufficiale.",
      "Il tema ha forte domanda anche in tedesco e inglese, da Krankenkasse Pramien Rechner a health insurance premium calculator Switzerland. Una pagina chiara puo intercettare persone residenti, expat e nuovi arrivati.",
      "Collega il risultato al budget mensile e al salario netto per capire quanto pesa davvero la cassa malati sul reddito disponibile.",
    ],
    faqs: [
      { question: "Il calcolo confronta tutte le assicurazioni?", answer: "No, stima il costo annuo partendo dai valori inseriti. Per confronti ufficiali serve un comparatore aggiornato." },
      { question: "La franchigia piu alta conviene sempre?", answer: "Non sempre. Dipende da premio, spese mediche previste e rischio personale." },
      { question: "Il risultato include il modello assicurativo?", answer: "No, considera solo premio, franchigia e spese previste." },
    ],
    relatedSlugs: ["calcolo-budget-mensile", "calcolo-salario-netto-svizzera", "calcolo-obiettivo-risparmio"],
    guideLinks: [
      {
        href: "/guide/cassa-malati-svizzera",
        label: "Guida cassa malati Svizzera",
        description: "Premio, franchigia e costo annuo letti insieme per evitare confronti parziali.",
      },
      {
        href: "/guide/costo-vita-svizzera",
        label: "Guida costo della vita",
        description: "Come inserire la cassa malati dentro il budget mensile svizzero.",
      },
    ],
  },
  {
    slug: "calcolo-riduzione-premi-cassa-malati-svizzera",
    kind: "premium-subsidy-ch",
    title: "Calcolatore Riduzione Premi Cassa Malati Svizzera",
    shortTitle: "Riduzione premi",
    category: "Assicurazioni Svizzera",
    metaTitle: "Calcolo Riduzione Premi Cassa Malati Svizzera | Calcolich",
    metaDescription: "Stima la riduzione premi della cassa malati in Svizzera partendo da reddito annuo, premio annuo e quota massima sostenibile.",
    intro: "Stima una riduzione indicativa dei premi cassa malati confrontando il costo annuo con la quota sostenibile del reddito.",
    cta: "Ricevi strumenti utili per budget, assicurazioni e trasferimento in Svizzera.",
    inputs: [
      { key: "annualIncome", label: "Reddito annuo CHF", defaultValue: "65000", min: "0" },
      { key: "annualPremium", label: "Premio annuo cassa malati CHF", defaultValue: "4800", min: "0" },
      { key: "maxShare", label: "Quota massima sostenibile %", defaultValue: "10", step: "0.1", min: "0", max: "100" },
    ],
    article: [
      "La riduzione premi della cassa malati e una misura cantonale pensata per alleggerire il peso dei premi obbligatori quando il reddito del nucleo familiare e modesto. Il diritto e le modalita cambiano da cantone a cantone, quindi un calcolatore puo solo fornire una stima operativa.",
      "Questo strumento confronta il premio annuo con una quota massima sostenibile del reddito. La differenza indica una riduzione potenziale, se la situazione del nucleo familiare rientra nelle regole applicabili.",
      "Il valore e utile quando vuoi capire se la tua spesa sanitaria e fuori scala rispetto al reddito, prima di chiedere una verifica formale al cantone competente.",
      "Usa il risultato insieme al budget mensile, al salario netto e all'affitto sostenibile per capire quanto margine reale ti resta ogni mese.",
    ],
    faqs: [
      { question: "La riduzione premi e uguale in tutti i cantoni?", answer: "No. Ogni cantone applica regole, soglie e procedure proprie." },
      { question: "Il risultato e ufficiale?", answer: "No. E una stima indicativa da confrontare con la procedura del cantone competente." },
      { question: "Cosa devo inserire nel premio annuo?", answer: "L'importo totale annuo dei premi della base assicurativa che vuoi confrontare." },
    ],
    relatedSlugs: ["calcolo-cassa-malati-svizzera", "calcolo-budget-mensile", "calcolo-affitto-sostenibile-svizzera"],
    guideLinks: [
      {
        href: "/guide/cassa-malati-svizzera",
        label: "Guida cassa malati Svizzera",
        description: "Premi, franchigia e costo annuo letti insieme prima di richiedere una verifica cantonale.",
      },
      {
        href: "/guide/costo-vita-svizzera",
        label: "Guida costo della vita",
        description: "Come integrare la cassa malati nel budget mensile svizzero.",
      },
    ],
    updatedAt: "13 luglio 2026",
    sources: [
      { label: "BAG: riduzione dei premi", href: "https://www.bag.admin.ch/bag/de/home/versicherungen/krankenversicherung/krankenversicherung-versicherte-mit-wohnsitz-in-der-schweiz/praemienverbilligung.html" },
    ],
    monetizationType: "lead",
  },
  {
    slug: "calcolo-assegni-familiari-svizzera",
    kind: "family-allowances-ch",
    title: "Calcolatore Assegni Familiari Svizzera",
    shortTitle: "Assegni familiari",
    category: "Famiglia Svizzera",
    metaTitle: "Calcolo Assegni Familiari Svizzera | Calcolich",
    metaDescription: "Calcola gli assegni familiari in Svizzera usando importo mensile per figlio, assegno formazione e numero di mesi.",
    intro: "Calcola l'importo annuo degli assegni familiari partendo dagli importi mensili riconosciuti nel tuo cantone.",
    cta: "Ricevi strumenti per famiglia, lavoro e budget in Svizzera.",
    inputs: [
      { key: "childAllowance", label: "Assegno per figlio mensile CHF", defaultValue: "250", min: "0" },
      { key: "educationAllowance", label: "Assegno di formazione mensile CHF", defaultValue: "300", min: "0" },
      { key: "childCount", label: "Numero di figli con assegno per figlio", defaultValue: "2", min: "0" },
      { key: "trainingCount", label: "Numero di figli in formazione", defaultValue: "1", min: "0" },
      { key: "months", label: "Mesi di diritto", defaultValue: "12", min: "1", max: "12" },
    ],
    article: [
      "Gli assegni familiari in Svizzera dipendono dal cantone di attivita e dal tipo di assegno. In generale ci sono un assegno per figlio e un assegno di formazione, ma gli importi minimi e le condizioni pratiche possono variare.",
      "Questo calcolatore somma gli importi mensili, li moltiplica per il numero di figli o giovani in formazione e poi li proietta sui mesi di diritto inseriti. E utile per stimare il sostegno annuo prima di leggere una decisione ufficiale o una busta paga.",
      "L'uso pratico e chiaro per famiglie e genitori che vogliono capire quanto incide un importo mensile riconosciuto dal cantone sul budget complessivo.",
      "Collega il risultato al salario netto, al budget mensile e all'imposta alla fonte per vedere il quadro familiare completo.",
    ],
    faqs: [
      { question: "Gli importi sono uguali in tutta la Svizzera?", answer: "No. Gli importi minimi sono regolati a livello federale, ma l'applicazione pratica dipende dal cantone." },
      { question: "Il risultato include nati e adozioni?", answer: "No. Questo calcolatore stima solo assegni mensili per figlio e in formazione." },
      { question: "Posso usare valori diversi per ogni cantone?", answer: "Si. Inserisci gli importi del tuo cantone per ottenere una stima piu vicina al tuo caso." },
    ],
    relatedSlugs: ["calcolo-budget-mensile", "calcolo-salario-netto-svizzera", "calcolo-imposta-alla-fonte-svizzera"],
    guideLinks: [
      {
        href: "/guide/costo-vita-svizzera",
        label: "Guida costo della vita",
        description: "Come gli assegni familiari entrano nel budget mensile e nelle spese di casa.",
      },
      {
        href: "/guide/stipendio-netto-svizzera",
        label: "Guida stipendio netto",
        description: "Come leggere salario, deduzioni e sostegno familiare insieme.",
      },
    ],
    updatedAt: "13 luglio 2026",
    sources: [
      { label: "BSV: Familienzulagen", href: "https://www.bsv.admin.ch/de/familienzulagen-gesetze-und-verordnungen" },
    ],
    monetizationType: "lead",
  },
  {
    slug: "calcolo-affitto-sostenibile-svizzera",
    kind: "rent-affordability-ch",
    title: "Calcolatore Affitto Sostenibile Svizzera",
    shortTitle: "Affitto sostenibile",
    category: "Casa Svizzera",
    metaTitle: "Calcolo Affitto Sostenibile Svizzera | Calcolich",
    metaDescription: "Calcola quanto affitto puoi sostenere in Svizzera in base al reddito netto e alla percentuale del budget.",
    intro: "Stima un affitto mensile sostenibile partendo dal reddito netto e dalla quota massima del budget.",
    cta: "Ricevi strumenti per pianificare casa, budget e trasferimento in Svizzera.",
    inputs: [
      { key: "netIncome", label: "Reddito netto mensile CHF", defaultValue: "5200", min: "0" },
      { key: "rentRate", label: "Quota massima per affitto %", defaultValue: "30", step: "0.1", min: "0", max: "80" },
      { key: "otherHousingCosts", label: "Spese casa extra CHF", defaultValue: "250", min: "0" },
    ],
    article: [
      "Trovare casa in Svizzera richiede numeri realistici. Un affitto che sembra gestibile sulla carta puo diventare pesante quando si aggiungono cassa malati, trasporti, tasse e spese quotidiane.",
      "Questo calcolatore parte dal reddito netto mensile e applica una quota massima dedicata all'abitazione. Sottrae poi eventuali costi extra per ottenere un affitto indicativo sostenibile.",
      "La pagina intercetta intenti in italiano, tedesco e inglese come Mietbudget Rechner Schweiz e rent affordability calculator Switzerland. E utile per residenti, frontalieri e persone in trasferimento.",
      "Usa il risultato insieme al budget mensile e allo stipendio netto per capire se una zona o una offerta immobiliare sono davvero compatibili con il tuo cashflow.",
    ],
    faqs: [
      { question: "Quale percentuale del reddito usare per l'affitto?", answer: "Molte persone partono dal 25-35% del netto, ma dipende da citta, famiglia e altre spese." },
      { question: "Il calcolo include spese accessorie?", answer: "Puoi inserirle nel campo spese casa extra per ottenere un limite piu prudente." },
      { question: "Serve per ottenere un contratto di affitto?", answer: "No, e una stima personale. Agenzie e proprietari possono usare criteri diversi." },
    ],
    relatedSlugs: ["calcolo-budget-mensile", "calcolo-salario-netto-svizzera", "calcolo-cassa-malati-svizzera"],
    guideLinks: [
      {
        href: "/guide/affitto-sostenibile-svizzera",
        label: "Guida affitto sostenibile",
        description: "Come partire dal netto e mantenere margine per spese, imprevisti e risparmio.",
      },
      {
        href: "/guide/costo-vita-svizzera",
        label: "Guida costo della vita",
        description: "Affitto, cassa malati, trasporti e budget mensile letti insieme.",
      },
    ],
  },
  {
    slug: "calcolo-salario-orario-svizzera",
    kind: "hourly-wage-ch",
    title: "Calcolatore Salario Orario Svizzera",
    shortTitle: "Salario orario",
    category: "Stipendio Svizzera",
    metaTitle: "Calcolo Salario Orario Svizzera | Calcolich",
    metaDescription: "Trasforma salario mensile in salario orario stimato usando ore settimanali e settimane lavorate.",
    intro: "Calcola una stima del salario orario partendo da salario mensile e ore lavorate.",
    cta: "Ricevi strumenti per salario, ore lavoro e part-time in Svizzera.",
    inputs: [
      { key: "monthlySalary", label: "Salario mensile CHF", defaultValue: "5500", min: "0" },
      { key: "hoursPerWeek", label: "Ore settimanali", defaultValue: "42", step: "0.1", min: "1" },
      { key: "weeksPerYear", label: "Settimane pagate annue", defaultValue: "52", step: "0.1", min: "1" },
    ],
    article: [
      "Il salario orario e utile per confrontare offerte, part-time, turni, lavori a chiamata e proposte freelance. In Svizzera molte offerte parlano di salario mensile, ma il valore orario rende il confronto piu trasparente.",
      "Il calcolatore stima il salario annuo dal mensile e lo divide per le ore annue. Puoi modificare ore settimanali e settimane pagate per adattare il risultato al tuo contratto.",
      "La stessa esigenza compare spesso come Stundenlohn Rechner Schweiz o hourly wage calculator Switzerland. Una pagina dedicata puo intercettare utenti molto vicini a una decisione lavorativa.",
      "Per un quadro completo, confronta questo risultato con ore lavorate, straordinari e salario netto.",
    ],
    faqs: [
      { question: "Il salario orario e lordo o netto?", answer: "Dipende dal valore inserito. Se inserisci un salario lordo, il risultato e lordo; se inserisci un netto, il risultato e netto." },
      { question: "Come gestisco la tredicesima?", answer: "Puoi inserirla nel salario mensile medio oppure usare prima il calcolatore stipendio annuale mensile." },
      { question: "Funziona per part-time?", answer: "Si, basta inserire le ore settimanali reali del part-time." },
    ],
    relatedSlugs: ["calcolo-ore-lavoro", "calcolo-straordinari-svizzera", "calcolo-salario-part-time-svizzera"],
  },
  {
    slug: "calcolo-salario-part-time-svizzera",
    kind: "part-time-salary-ch",
    title: "Calcolatore Salario Part-Time Svizzera",
    shortTitle: "Salario part-time",
    category: "Stipendio Svizzera",
    metaTitle: "Calcolo Salario Part-Time Svizzera | Calcolich",
    metaDescription: "Calcola salario part-time proporzionale partendo da salario full-time e percentuale di lavoro.",
    intro: "Stima il salario part-time proporzionale in base al salario full-time e alla percentuale lavorativa.",
    cta: "Ricevi strumenti gratuiti per lavoro, salario e contratti in Svizzera.",
    inputs: [
      { key: "fullTimeSalary", label: "Salario full-time CHF", defaultValue: "6500", min: "0" },
      { key: "workPercent", label: "Percentuale lavoro %", defaultValue: "80", step: "1", min: "1", max: "100" },
      { key: "deductionRate", label: "Deduzioni stimate %", defaultValue: "14", step: "0.1", min: "0", max: "60" },
    ],
    article: [
      "Il part-time e comune in Svizzera, ma il confronto tra percentuale lavorativa, salario lordo e netto non e sempre immediato. Questo calcolatore trasforma un salario full-time in una stima proporzionale part-time.",
      "Inserisci il salario full-time, la percentuale lavorativa e una deduzione stimata. Il risultato mostra lordo part-time, deduzioni e netto indicativo.",
      "Il tema copre query come Teilzeit Lohn Rechner e part time salary calculator Switzerland. E utile per chi valuta riduzione ore, nuova offerta o rientro al lavoro.",
      "Il calcolo resta indicativo: tredicesima, previdenza, imposte e benefit possono cambiare il risultato reale.",
    ],
    faqs: [
      { question: "Il salario part-time e sempre proporzionale?", answer: "Di solito si parte dalla proporzione, ma contratto, benefit e deduzioni possono cambiare il netto." },
      { question: "Posso stimare il netto?", answer: "Si, inserendo una percentuale di deduzioni stimata." },
      { question: "Funziona con 13 mensilita?", answer: "Si come stima mensile, ma per il dettaglio usa anche il calcolatore tredicesima." },
    ],
    relatedSlugs: ["calcolo-salario-netto-svizzera", "calcolo-salario-orario-svizzera", "calcolo-tredicesima-svizzera"],
  },
  {
    slug: "calcolo-terzo-pilastro-risparmio-fiscale",
    kind: "pillar3a-tax-ch",
    title: "Calcolatore Terzo Pilastro Risparmio Fiscale",
    shortTitle: "Terzo pilastro",
    category: "Finanza Svizzera",
    metaTitle: "Calcolo Terzo Pilastro Risparmio Fiscale | Calcolich",
    metaDescription: "Stima il risparmio fiscale del pilastro 3a in Svizzera partendo dal versamento e dall'aliquota marginale.",
    intro: "Stima quanto puoi risparmiare fiscalmente con un versamento nel terzo pilastro.",
    cta: "Ricevi strumenti per pianificare risparmio, pensione e imposte in Svizzera.",
    inputs: [
      { key: "contribution", label: "Versamento 3a CHF", defaultValue: "7056", min: "0" },
      { key: "marginalTaxRate", label: "Aliquota marginale stimata %", defaultValue: "22", step: "0.1", min: "0", max: "60" },
      { key: "years", label: "Anni di versamento", defaultValue: "10", min: "1" },
    ],
    article: [
      "Il terzo pilastro e uno degli strumenti piu cercati in Svizzera per risparmio pensionistico e ottimizzazione fiscale. Il vantaggio immediato spesso e il risparmio d'imposta generato dal versamento deducibile.",
      "Questo calcolatore stima il beneficio usando versamento, aliquota marginale e numero di anni. Non sostituisce una consulenza fiscale, ma rende chiaro l'ordine di grandezza.",
      "In tedesco e inglese il tema vive con query come Saule 3a Steuerersparnis Rechner e pillar 3a tax savings calculator. Il valore commerciale della pagina e alto.",
      "Collega il risultato al calcolatore interessi composti e obiettivo risparmio per valutare anche il capitale futuro.",
    ],
    faqs: [
      { question: "Il risparmio fiscale e garantito?", answer: "No, dipende da reddito, cantone, situazione fiscale e limiti annui applicabili." },
      { question: "Il calcolo include rendimento degli investimenti?", answer: "No, mostra il risparmio fiscale stimato. Per la crescita usa il calcolatore interessi composti." },
      { question: "Quale aliquota devo inserire?", answer: "Inserisci una stima della tua aliquota marginale o un valore calcolato da un consulente/fonte fiscale." },
    ],
    relatedSlugs: ["calcolo-interessi-composti", "calcolo-obiettivo-risparmio", "calcolo-imposta-alla-fonte-svizzera"],
  },
  {
    slug: "calcolo-budget-mensile",
    kind: "monthly-budget-ch",
    title: "Calcolatore Budget Mensile Svizzera",
    shortTitle: "Budget mensile",
    category: "Finanza personale",
    metaTitle: "Calcolo Budget Mensile Svizzera | Calcolich",
    metaDescription: "Calcola saldo mensile disponibile dopo affitto, cassa malati, trasporti, spesa e altri costi.",
    intro: "Stima il budget mensile disponibile in Svizzera dopo le spese principali.",
    cta: "Ricevi strumenti per gestire cashflow, spese e risparmio in Svizzera.",
    inputs: [
      { key: "income", label: "Entrate nette mensili CHF", defaultValue: "5200", min: "0" },
      { key: "rent", label: "Affitto e spese casa CHF", defaultValue: "1600", min: "0" },
      { key: "healthInsurance", label: "Cassa malati CHF", defaultValue: "380", min: "0" },
      { key: "otherCosts", label: "Altre spese CHF", defaultValue: "1800", min: "0" },
    ],
    article: [
      "Un budget mensile realistico e fondamentale in Svizzera, dove alcune spese fisse possono essere alte. Salario netto, affitto, cassa malati, trasporti e spese quotidiane vanno letti insieme.",
      "Il calcolatore sottrae le principali uscite dalle entrate nette e mostra saldo disponibile, spese totali e percentuale di risparmio potenziale.",
      "La pagina supporta query come Budget Rechner Schweiz e monthly budget calculator Switzerland, utili per residenti, expat e persone che stanno valutando trasferimento.",
      "Usalo come centro del cluster: collega stipendio netto, cassa malati, affitto sostenibile e obiettivo risparmio.",
    ],
    faqs: [
      { question: "Quali spese devo inserire?", answer: "Inserisci affitto, cassa malati e una stima delle altre spese ricorrenti come trasporti, cibo, telefono e tempo libero." },
      { question: "Il saldo disponibile e risparmio?", answer: "Non necessariamente. E la parte non assegnata dopo le spese inserite." },
      { question: "Serve per trasferirsi in Svizzera?", answer: "Si, aiuta a stimare se un reddito netto puo sostenere il costo della vita previsto." },
    ],
    relatedSlugs: ["calcolo-affitto-sostenibile-svizzera", "calcolo-cassa-malati-svizzera", "calcolo-obiettivo-risparmio"],
    guideLinks: [
      {
        href: "/guide/costo-vita-svizzera",
        label: "Guida costo della vita Svizzera",
        description: "Budget, affitto, cassa malati e spese ricorrenti prima di trasferirti o cambiare lavoro.",
      },
      {
        href: "/guide/affitto-sostenibile-svizzera",
        label: "Guida affitto sostenibile",
        description: "Come collegare il limite di affitto al budget reale disponibile ogni mese.",
      },
    ],
  },
  {
    slug: "calcolo-spese-auto-svizzera",
    kind: "car-cost-ch",
    title: "Calcolatore Spese Auto Svizzera",
    shortTitle: "Spese auto",
    category: "Mobilita Svizzera",
    metaTitle: "Calcolo Spese Auto Svizzera | Calcolich",
    metaDescription: "Stima costo mensile e annuo dell'auto in Svizzera includendo leasing, assicurazione, carburante e manutenzione.",
    intro: "Calcola il costo reale mensile dell'auto sommando rate, assicurazione, carburante e manutenzione.",
    cta: "Ricevi strumenti per budget, mobilita e spese ricorrenti in Svizzera.",
    inputs: [
      { key: "leasing", label: "Rata/leasing mensile CHF", defaultValue: "450", min: "0" },
      { key: "insurance", label: "Assicurazione mensile CHF", defaultValue: "120", min: "0" },
      { key: "fuel", label: "Carburante/ricarica mensile CHF", defaultValue: "180", min: "0" },
      { key: "maintenance", label: "Manutenzione e tasse mensili CHF", defaultValue: "150", min: "0" },
    ],
    article: [
      "Il costo di un'auto in Svizzera non e solo la rata. Assicurazione, carburante, manutenzione, pneumatici, parcheggio e tasse possono cambiare molto il budget mensile.",
      "Questo calcolatore somma le principali voci ricorrenti e mostra costo mensile, costo annuo e incidenza sul budget.",
      "La domanda esiste anche come Autokosten Rechner Schweiz e car cost calculator Switzerland. E un contenuto utile per chi sta scegliendo tra auto, leasing, treno o car sharing.",
      "Collega il risultato al budget mensile per capire se l'auto e sostenibile rispetto al reddito netto.",
    ],
    faqs: [
      { question: "Il calcolo include deprezzamento?", answer: "No, questa versione stima le spese mensili ricorrenti. Il deprezzamento puo essere aggiunto come costo extra nella manutenzione." },
      { question: "Funziona per auto elettriche?", answer: "Si, inserisci il costo medio di ricarica nel campo carburante/ricarica." },
      { question: "Posso usarlo per confrontare leasing e acquisto?", answer: "Si, inserendo una rata media o un costo mensile equivalente." },
    ],
    relatedSlugs: ["calcolo-budget-mensile", "calcolo-rata-prestito", "calcolo-affitto-sostenibile-svizzera"],
  },
  {
    slug: "calcolo-fattura-freelance",
    kind: "freelance-rate-ch",
    title: "Calcolatore Tariffa Freelance Svizzera",
    shortTitle: "Tariffa freelance",
    category: "Business Svizzera",
    metaTitle: "Calcolo Tariffa Freelance Svizzera | Calcolich",
    metaDescription: "Calcola tariffa oraria freelance partendo da reddito desiderato, costi, giorni fatturabili e margine.",
    intro: "Stima la tariffa oraria freelance necessaria per coprire costi e reddito desiderato.",
    cta: "Ricevi strumenti per freelance, prezzi, margini e lavoro indipendente.",
    inputs: [
      { key: "targetIncome", label: "Reddito annuo desiderato CHF", defaultValue: "90000", min: "0" },
      { key: "annualCosts", label: "Costi annui CHF", defaultValue: "18000", min: "0" },
      { key: "billableDays", label: "Giorni fatturabili annui", defaultValue: "180", min: "1" },
      { key: "hoursPerDay", label: "Ore fatturabili al giorno", defaultValue: "6", min: "1" },
    ],
    article: [
      "Molti freelance sottostimano la tariffa necessaria per lavorare in modo sostenibile. In Svizzera bisogna considerare reddito desiderato, costi, giorni non fatturabili, assicurazioni, tasse e tempo commerciale.",
      "Il calcolatore divide reddito piu costi per le ore fatturabili annue e restituisce tariffa oraria e giornaliera indicativa.",
      "Il tema intercetta query come Freelancer Stundensatz Rechner Schweiz e freelance rate calculator Switzerland. Ha anche valore commerciale per servizi AI, SEO e siti web.",
      "Usa il risultato con margine profitto, break even e prezzo vendita per costruire offerte piu solide.",
    ],
    faqs: [
      { question: "Perche usare giorni fatturabili e non giorni totali?", answer: "Perche ferie, malattia, amministrazione e vendita riducono il tempo realmente vendibile." },
      { question: "La tariffa include tasse?", answer: "Include solo i costi che inserisci. Aggiungi imposte e contributi nei costi annui se vuoi una stima piu prudente." },
      { question: "Funziona per agenzie e consulenti?", answer: "Si, come base per stimare tariffe orarie o giornaliere." },
    ],
    relatedSlugs: ["calcolo-costo-orario", "calcolo-margine-profitto", "calcolo-prezzo-vendita"],
  },
  {
    slug: "calcolo-prezzo-vendita",
    kind: "selling-price",
    title: "Calcolatore Prezzo Vendita",
    shortTitle: "Prezzo vendita",
    category: "Business",
    metaTitle: "Calcolo Prezzo Vendita | Margine e Markup | Calcolich",
    metaDescription: "Calcola prezzo di vendita partendo da costo, margine desiderato e IVA.",
    intro: "Trova un prezzo di vendita sostenibile partendo da costo, margine e IVA.",
    cta: "Ricevi strumenti per business, pricing, IVA e margini.",
    inputs: [
      { key: "cost", label: "Costo CHF", defaultValue: "60", min: "0" },
      { key: "marginRate", label: "Margine desiderato %", defaultValue: "40", step: "0.1", min: "0", max: "95" },
      { key: "vatRate", label: "IVA %", defaultValue: "8.1", step: "0.1", min: "0" },
    ],
    article: [
      "Il prezzo di vendita non dovrebbe nascere a caso. Se parti dal costo e scegli un margine target, puoi capire subito quanto devi chiedere per coprire costi, imposte e utile.",
      "Questo calcolatore usa costo, margine desiderato e IVA per stimare prezzo netto, IVA e prezzo finale al cliente.",
      "La pagina chiude un buco interno gia presente nei link del sito e rafforza il cluster business insieme a margine profitto, break even e IVA Svizzera.",
      "Per decisioni commerciali reali considera anche concorrenza, posizionamento, costi fissi e disponibilita del cliente a pagare.",
    ],
    faqs: [
      { question: "Margine e markup sono la stessa cosa?", answer: "No. Il margine si calcola sul prezzo di vendita, il markup sul costo." },
      { question: "Il prezzo include IVA?", answer: "Il risultato mostra sia prezzo netto sia prezzo finale con IVA." },
      { question: "Posso usarlo per servizi?", answer: "Si, inserendo il costo stimato di produzione o erogazione del servizio." },
    ],
    relatedSlugs: ["calcolo-margine-profitto", "calcolo-break-even", "calcolo-iva-svizzera"],
  },
  {
    slug: "calcolo-tredicesima-avs-2026",
    kind: "ahv-13th-pension-ch",
    title: "Calcolatore Tredicesima AVS 2026",
    shortTitle: "Tredicesima AVS",
    category: "Finanza Svizzera",
    metaTitle: "Calcolo Tredicesima AVS 2026 | Calcolich",
    metaDescription: "Stima la tredicesima rendita AVS 2026 partendo dalla rendita mensile e dai mesi di diritto nell'anno.",
    intro: "Stima l'importo della tredicesima rendita AVS versata per la prima volta a dicembre 2026.",
    cta: "Ricevi strumenti gratuiti per AVS, previdenza e pianificazione finanziaria in Svizzera.",
    inputs: [
      { key: "monthlyPension", label: "Rendita AVS mensile CHF", defaultValue: "2520", min: "0" },
      { key: "eligibleMonths", label: "Mesi di rendita nell'anno", defaultValue: "12", min: "1", max: "12" },
    ],
    article: [
      "Dal 2026 le persone che hanno diritto a una rendita di vecchiaia AVS nel mese di dicembre ricevono una mensilita aggiuntiva. Il primo versamento della tredicesima AVS e previsto nel dicembre 2026 insieme alla rendita ordinaria del mese.",
      "L'importo corrisponde a un dodicesimo della rendita di vecchiaia AVS percepita durante l'anno. Se la rendita mensile e rimasta invariata per dodici mesi, la tredicesima stimata coincide quindi con una mensilita. Se il diritto e iniziato durante l'anno, il calcolo considera soltanto i mesi effettivi inseriti.",
      "Rendite per figli, rendite completive e supplementi speciali non entrano nel calcolo. Il risultato viene arrotondato al franco e resta una stima, perche l'importo preciso puo essere determinato soltanto nel mese di dicembre.",
      "Usa questo strumento insieme al calcolatore del terzo pilastro e degli interessi composti per costruire una visione piu completa della previdenza e del reddito disponibile dopo il pensionamento.",
    ],
    faqs: [
      { question: "Quando viene pagata la tredicesima AVS?", answer: "Il primo versamento e previsto a dicembre 2026, insieme alla rendita ordinaria del mese." },
      { question: "Come si calcola la tredicesima AVS?", answer: "Corrisponde a un dodicesimo della rendita di vecchiaia AVS percepita nell'anno, arrotondato al franco." },
      { question: "Spetta anche alle rendite AI o per superstiti?", answer: "No. La mensilita aggiuntiva riguarda le rendite di vecchiaia AVS, non le rendite AI o per superstiti." },
    ],
    relatedSlugs: ["calcolo-terzo-pilastro-risparmio-fiscale", "calcolo-interessi-composti", "calcolo-budget-mensile"],
    guideLinks: [
      {
        href: "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Assicurazione-vecchiaia-e-superstiti-AVS/13a-mensilit%C3%A0-AVS/",
        label: "Fonte ufficiale: tredicesima AVS",
        description: "Regole, beneficiari e modalita del primo versamento a dicembre 2026.",
      },
      {
        href: "/guide/terzo-pilastro-risparmio-fiscale",
        label: "Guida terzo pilastro",
        description: "Come collegare previdenza, risparmio fiscale e pianificazione finanziaria.",
      },
    ],
  },
  {
    slug: "calcolo-contributi-avs-indipendenti",
    kind: "self-employed-ahv-ch",
    title: "Calcolatore Contributi AVS Indipendenti",
    shortTitle: "AVS indipendenti",
    category: "Business Svizzera",
    metaTitle: "Calcolo Contributi AVS Indipendenti 2026 | Calcolich",
    metaDescription: "Stima contributi AVS, AI e IPG per indipendenti in Svizzera usando reddito netto, aliquota e spese amministrative.",
    intro: "Stima il costo annuo dei contributi AVS, AI e IPG per un'attivita indipendente in Svizzera.",
    cta: "Ricevi strumenti per freelance, contributi, tariffe e gestione dell'attivita in Svizzera.",
    inputs: [
      { key: "netIncome", label: "Reddito netto annuo CHF", defaultValue: "90000", min: "0" },
      { key: "contributionRate", label: "Aliquota AVS/AI/IPG %", defaultValue: "10", step: "0.001", min: "0", max: "10" },
      { key: "adminRate", label: "Spese amministrative %", defaultValue: "5", step: "0.1", min: "0", max: "5" },
      { key: "minimumContribution", label: "Contributo minimo CHF", defaultValue: "529.20", step: "0.05", min: "0" },
    ],
    article: [
      "Chi lavora come indipendente in Svizzera versa personalmente i contributi AVS, AI e IPG. Il costo dipende dal reddito netto riconosciuto dalla cassa di compensazione e, per i redditi piu bassi, da una scala contributiva decrescente.",
      "Il calcolatore applica l'aliquota inserita al reddito netto annuo, considera il contributo minimo e aggiunge le spese amministrative. L'aliquota massima AVS, AI e IPG per gli indipendenti e normalmente il 10 per cento; per redditi inferiori va sostituita con quella applicabile alla propria fascia.",
      "Le casse di compensazione possono applicare anche contributi cantonali, come quelli per gli assegni familiari, che non sono inclusi in questa stima. Per questo il risultato e utile per il budget, ma non sostituisce la decisione ufficiale della cassa.",
      "Collega questa stima al calcolatore tariffa freelance: inserendo i contributi nei costi annui puoi determinare una tariffa oraria piu realistica e proteggere il margine dell'attivita.",
    ],
    faqs: [
      { question: "Quale aliquota devo inserire?", answer: "Per redditi elevati puoi partire dal 10%. Per redditi inferiori usa l'aliquota della scala contributiva ufficiale o quella comunicata dalla cassa." },
      { question: "Il calcolo include gli assegni familiari?", answer: "No. I contributi cantonali e altre voci specifiche non sono inclusi e possono aumentare il totale." },
      { question: "Il risultato e vincolante?", answer: "No. Solo la decisione della cassa di compensazione competente determina i contributi dovuti." },
    ],
    relatedSlugs: ["calcolo-fattura-freelance", "calcolo-costo-orario", "calcolo-budget-mensile"],
    guideLinks: [
      {
        href: "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Assicurazione-vecchiaia-e-superstiti-AVS/Ausilio-per-il-calcolo/Calcolo-dei-contributi-degli-indipendenti",
        label: "Calcolo ufficiale AVS/AI",
        description: "Verifica cantone, aliquota e contributi definitivi sul portale ufficiale.",
      },
      {
        href: "/guide/freelance-svizzera",
        label: "Guida freelance Svizzera",
        description: "Tariffa, costi, margini e sostenibilita di un'attivita indipendente.",
      },
    ],
    updatedAt: "13 luglio 2026",
    sources: [
      { label: "ahv-iv.ch: contributi degli indipendenti", href: "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Assicurazione-vecchiaia-e-superstiti-AVS/Ausilio-per-il-calcolo/Calcolo-dei-contributi-degli-indipendenti" },
    ],
  },
  {
    slug: "calcolo-indennita-maternita-svizzera",
    kind: "maternity-allowance-ch",
    title: "Calcolatore Indennita Maternita Svizzera",
    shortTitle: "Indennita maternita",
    category: "Lavoro Svizzera",
    metaTitle: "Calcolo Indennita Maternita Svizzera 2026 | Calcolich",
    metaDescription: "Stima indennita giornaliera e totale del congedo maternita in Svizzera: 80% del reddito, massimo CHF 220 al giorno.",
    intro: "Stima l'indennita giornaliera e totale di maternita in base al reddito determinante.",
    cta: "Ricevi strumenti gratuiti per salario, congedi e lavoro in Svizzera.",
    inputs: [
      {
        key: "incomeType",
        label: "Tipo di reddito",
        type: "select",
        defaultValue: "monthly",
        options: [
          { label: "Salario mensile dipendente", value: "monthly" },
          { label: "Reddito annuo indipendente", value: "annual" },
        ],
      },
      { key: "income", label: "Reddito determinante CHF", defaultValue: "6500", min: "0" },
      { key: "days", label: "Indennita giornaliere", defaultValue: "98", min: "1", max: "154" },
    ],
    article: [
      "In Svizzera l'indennita di maternita compensa una parte del reddito perso dopo la nascita. Per chi soddisfa le condizioni previste, viene versata sotto forma di indennita giornaliera per le prime 14 settimane, equivalenti normalmente a 98 giorni.",
      "L'importo giornaliero corrisponde all'80 per cento del reddito medio precedente, fino a un massimo di 220 franchi al giorno. Il massimale viene raggiunto con un salario mensile di 8'250 franchi o, per una lavoratrice indipendente, con un reddito annuo soggetto all'AVS di 99'000 franchi.",
      "Seleziona il tipo di reddito corretto: salario mensile per una dipendente oppure reddito annuo soggetto all'AVS per un'indipendente. Il calcolatore converte il dato in reddito giornaliero, applica l'80 per cento e il limite massimo ufficiale.",
      "Il risultato e una stima economica. Diritto, durata effettiva, eventuali prolungamenti e importo definitivo devono essere confermati dal datore di lavoro o dalla cassa di compensazione competente.",
    ],
    faqs: [
      { question: "Quanto dura normalmente l'indennita di maternita?", answer: "Il diritto ordinario copre 14 settimane, equivalenti a 98 indennita giornaliere." },
      { question: "Qual e l'importo massimo giornaliero?", answer: "L'indennita e pari all'80% del reddito medio, fino a un massimo di CHF 220 al giorno." },
      { question: "Il calcolo funziona per le indipendenti?", answer: "Si. Seleziona reddito annuo indipendente e inserisci il reddito soggetto all'AVS." },
    ],
    relatedSlugs: ["calcolo-salario-netto-svizzera", "calcolo-salario-part-time-svizzera", "calcolo-budget-mensile"],
    guideLinks: [
      {
        href: "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Prestazioni-dell-IPG-servizio-maternit%C3%A0-per-laltro-genitore-assistenza-e-adozione/Indennit%C3%A0-in-caso-di-maternit%C3%A0",
        label: "Fonte ufficiale: indennita di maternita",
        description: "Condizioni, durata, calcolo e procedura sul portale AVS/AI.",
      },
      {
        href: "/guide/stipendio-netto-svizzera",
        label: "Guida stipendio netto",
        description: "Come leggere reddito, deduzioni e disponibilita mensile in Svizzera.",
      },
    ],
  },
  {
    slug: "calcolo-indennita-disoccupazione-svizzera",
    kind: "unemployment-benefit-ch",
    title: "Calcolatore Indennita Disoccupazione Svizzera",
    shortTitle: "Indennita disoccupazione",
    category: "Lavoro Svizzera",
    metaTitle: "Calcolo Indennita Disoccupazione Svizzera 2026 | Calcolich",
    metaDescription: "Stima l'indennita giornaliera e mensile di disoccupazione in Svizzera applicando il 70% o 80% al guadagno assicurato.",
    intro: "Stima l'indennita lorda di disoccupazione partendo dal guadagno assicurato e dall'aliquota applicabile.",
    cta: "Ricevi strumenti gratuiti per salario, lavoro e protezione del reddito in Svizzera.",
    inputs: [
      { key: "insuredIncome", label: "Guadagno assicurato mensile CHF", defaultValue: "6500", min: "0" },
      {
        key: "compensationRate",
        label: "Aliquota indennita",
        type: "select",
        defaultValue: "70",
        options: [
          { label: "70% - aliquota ordinaria", value: "70" },
          { label: "80% - figli/reddito basso/AI", value: "80" },
        ],
      },
      { key: "payableDays", label: "Giorni indennizzabili nel mese", defaultValue: "21.7", step: "0.1", min: "1", max: "23" },
    ],
    article: [
      "In Svizzera l'indennita di disoccupazione viene calcolata sul guadagno assicurato, determinato in genere dalla cassa sulla base del reddito degli ultimi sei mesi oppure degli ultimi dodici se piu favorevole.",
      "L'aliquota ordinaria e il 70 per cento. Si applica normalmente l'80 per cento a chi ha obblighi di mantenimento verso figli minori di 25 anni, a chi ha un guadagno assicurato non superiore a 3'797 franchi o percepisce una rendita AI con grado almeno del 40 per cento.",
      "Per il 2026 il guadagno massimo assicurato e 148'200 franchi annui, equivalente a 12'350 franchi mensili. Il calcolatore limita automaticamente il reddito a questa soglia e usa i giorni indennizzabili inseriti per stimare il pagamento lordo del mese.",
      "Dal risultato vengono normalmente dedotti contributi sociali, assicurazione infortuni, eventuale previdenza professionale e imposta alla fonte. Il conteggio definitivo dipende dalla cassa di disoccupazione e dal numero effettivo di giorni lavorativi del mese.",
    ],
    faqs: [
      { question: "Quando si applica l'80 per cento?", answer: "Di regola con figli a carico sotto i 25 anni, guadagno assicurato fino a CHF 3'797 o rendita AI di almeno il 40%." },
      { question: "Qual e il guadagno massimo assicurato?", answer: "Per il 2026 e CHF 148'200 annui, pari a CHF 12'350 mensili." },
      { question: "Il risultato e netto?", answer: "No. E una stima lorda prima di contributi sociali, assicurazioni ed eventuale imposta alla fonte." },
    ],
    relatedSlugs: ["calcolo-salario-netto-svizzera", "calcolo-budget-mensile", "calcolo-affitto-sostenibile-svizzera"],
    guideLinks: [
      {
        href: "https://www.arbeit.swiss/secoalv/it/home/menue/stellensuchende/arbeitslos-was-tun-/finanzielles.html",
        label: "Fonte ufficiale: assicurazione disoccupazione",
        description: "Regole sul guadagno assicurato, aliquote e pagamento delle indennita.",
      },
      {
        href: "/guide/costo-vita-svizzera",
        label: "Guida costo della vita",
        description: "Come rivedere budget, affitto e spese quando cambia il reddito disponibile.",
      },
    ],
    updatedAt: "13 luglio 2026",
    sources: [
      { label: "arbeit.swiss: prestazioni dell'assicurazione", href: "https://www.arbeit.swiss/it/persone-in-cerca-dimpiego/prestazioni-dellassicurazione" },
    ],
  },
  {
    slug: "calcolo-pensione-avs-stimata",
    kind: "ahv-pension-gap-ch",
    title: "Calcolatore Pensione AVS Stimata",
    shortTitle: "Pensione AVS stimata",
    category: "Finanza Svizzera",
    metaTitle: "Calcolo Pensione AVS Stimata e Lacune Contributive | Calcolich",
    metaDescription: "Stima l'effetto degli anni mancanti sulla pensione AVS: ogni anno di lacuna riduce indicativamente la rendita di 1/44.",
    intro: "Stima come gli anni di contribuzione mancanti possono ridurre una rendita AVS mensile di riferimento.",
    cta: "Ricevi strumenti gratuiti per AVS, previdenza e pianificazione finanziaria in Svizzera.",
    inputs: [
      { key: "fullPension", label: "Rendita mensile di riferimento CHF", defaultValue: "2520", min: "0" },
      { key: "contributionYears", label: "Anni di contribuzione", defaultValue: "44", min: "1", max: "44" },
      { key: "referenceYears", label: "Durata completa di riferimento", defaultValue: "44", min: "1", max: "44" },
    ],
    article: [
      "La rendita AVS dipende soprattutto dal reddito annuo medio determinante e dalla durata di contribuzione. Una durata completa porta alla scala di rendita 44, mentre le lacune contributive generano una rendita parziale.",
      "In linea indicativa ogni anno mancante comporta una riduzione di un quarantaquattresimo. Questo calcolatore applica tale proporzione a una rendita mensile di riferimento inserita dall'utente.",
      "La rendita di riferimento non viene calcolata automaticamente dal reddito, perche il conteggio ufficiale considera redditi registrati, accrediti per compiti educativi o assistenziali, ripartizione dei redditi e altri elementi personali. Usa quindi un importo ottenuto da ESCAL o da una stima della cassa.",
      "Il risultato aiuta a misurare l'effetto delle lacune e a pianificare previdenza e risparmio. Per il dato ufficiale richiedi gratuitamente l'estratto del conto individuale e una stima alla cassa di compensazione.",
    ],
    faqs: [
      { question: "Quanto riduce la pensione un anno mancante?", answer: "Indicativamente un anno mancante riduce la rendita di 1/44, circa il 2.27%." },
      { question: "Il calcolatore determina la rendita AVS ufficiale?", answer: "No. Applica soltanto la riduzione per lacune a una rendita di riferimento inserita dall'utente." },
      { question: "Come verifico gli anni contributivi?", answer: "Puoi richiedere gratuitamente un estratto del conto individuale alla cassa di compensazione." },
    ],
    relatedSlugs: ["calcolo-tredicesima-avs-2026", "calcolo-terzo-pilastro-risparmio-fiscale", "calcolo-interessi-composti"],
    guideLinks: [
      {
        href: "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Glossario/term/vollrente",
        label: "Fonte ufficiale: rendita intera AVS",
        description: "Durata contributiva completa, scala 44 e rendite parziali.",
      },
      {
        href: "/guide/terzo-pilastro-risparmio-fiscale",
        label: "Guida terzo pilastro",
        description: "Come integrare AVS, risparmio previdenziale e vantaggio fiscale.",
      },
    ],
  },
  {
    slug: "calcolo-indennita-altro-genitore-svizzera",
    kind: "maternity-allowance-ch",
    title: "Calcolatore Indennita Altro Genitore Svizzera",
    shortTitle: "Indennita altro genitore",
    category: "Lavoro Svizzera",
    metaTitle: "Calcolo Indennita Altro Genitore Svizzera | Calcolich",
    metaDescription: "Calcola l'indennita per l'altro genitore in Svizzera: 80% del reddito medio, massimo CHF 220 al giorno per 14 giorni.",
    intro: "Stima l'indennita per l'altro genitore durante le due settimane di congedo riconosciute.",
    cta: "Ricevi strumenti gratuiti per congedi, salario e lavoro in Svizzera.",
    inputs: [
      {
        key: "incomeType",
        label: "Tipo di reddito",
        type: "select",
        defaultValue: "monthly",
        options: [
          { label: "Salario mensile dipendente", value: "monthly" },
          { label: "Reddito annuo indipendente", value: "annual" },
        ],
      },
      { key: "income", label: "Reddito determinante CHF", defaultValue: "6500", min: "0" },
      { key: "days", label: "Indennita giornaliere", defaultValue: "14", min: "1", max: "14" },
    ],
    article: [
      "L'altro genitore riconosciuto ha diritto a due settimane di congedo, compensate attraverso un massimo di 14 indennita giornaliere da utilizzare entro il termine previsto dopo la nascita.",
      "L'indennita corrisponde all'80 per cento del reddito medio da lavoro percepito prima della nascita, fino a un massimo di 220 franchi al giorno. Il limite viene raggiunto con un salario mensile di 8'250 franchi o un reddito annuo indipendente soggetto all'AVS di 99'000 franchi.",
      "Seleziona salario mensile per un dipendente oppure reddito annuo per un indipendente. Il calcolatore converte il reddito in valore giornaliero, applica l'80 per cento e limita il risultato al massimale ufficiale.",
      "Il risultato e una stima. Condizioni di diritto, giorni effettivamente riconosciuti e pagamento definitivo devono essere verificati con il datore di lavoro o la cassa di compensazione.",
    ],
    faqs: [
      { question: "Quanti giorni sono riconosciuti?", answer: "Sono previste al massimo 14 indennita giornaliere, corrispondenti a due settimane di congedo." },
      { question: "Quanto viene pagato al giorno?", answer: "L'80% del reddito giornaliero medio, fino a un massimo di CHF 220." },
      { question: "Vale anche per gli indipendenti?", answer: "Si. Inserisci il reddito annuo soggetto all'AVS e seleziona la modalita indipendente." },
    ],
    relatedSlugs: ["calcolo-indennita-maternita-svizzera", "calcolo-salario-netto-svizzera", "calcolo-budget-mensile"],
    guideLinks: [
      {
        href: "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Glossario/term/entschaedigungdesandernelternteils",
        label: "Fonte ufficiale: indennita altro genitore",
        description: "Durata, importo e condizioni previste dall'AVS/IPG.",
      },
      {
        href: "/guide/stipendio-netto-svizzera",
        label: "Guida stipendio netto",
        description: "Come collegare reddito lordo, netto e indennita sostitutive.",
      },
    ],
  },
];

export function getCalculator(slug: string) {
  return calculators.find((calculator) => calculator.slug === slug);
}

export function getRelatedCalculators(calculator: Calculator) {
  return calculator.relatedSlugs
    .map((slug) => getCalculator(slug))
    .filter((item): item is Calculator => Boolean(item));
}

export const calculatorSlugs = calculators.map((calculator) => calculator.slug);
