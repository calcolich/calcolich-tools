export type CalculatorKind =
  | "work-hours"
  | "salary-net-ch"
  | "gross-net-ch"
  | "vacation-ch"
  | "vat-ch"
  | "compound-interest"
  | "mortgage-ch"
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
  | "annual-monthly";

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
    metaTitle: "Calcolo IVA Svizzera 2026 | Calcolich",
    metaDescription: "Calcola IVA svizzera al 8.1%, 3.8% o 2.6% e ottieni totale, imponibile e imposta.",
    intro: "Calcola importo IVA, totale con IVA e scorporo usando le aliquote svizzere principali.",
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
