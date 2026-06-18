import { calculators, type Calculator } from "@/lib/calculators";

export type CalculatorCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  match: string[];
  intro: string[];
};

export const calculatorCategories: CalculatorCategory[] = [
  {
    slug: "stipendio-lavoro",
    title: "Calcolatori stipendio e lavoro",
    shortTitle: "Stipendio e lavoro",
    description: "Strumenti per stimare salario netto, disoccupazione, congedi, ferie, ore lavorate, part-time, imposte e altri numeri utili per chi lavora in Svizzera.",
    metaTitle: "Calcolatori stipendio e lavoro Svizzera | Calcolich",
    metaDescription: "Calcolatori gratuiti per stipendio netto, disoccupazione, maternita, congedi, ferie, ore lavorate, part-time e tasse in Svizzera.",
    match: ["Stipendio", "Lavoro", "Tasse"],
    intro: [
      "Qui trovi i calcolatori piu utili per leggere meglio salario, tempo lavorato e trattenute. Sono strumenti pratici per controllare una busta paga, valutare un'offerta o pianificare un cambio di lavoro.",
      "I risultati sono stime informative: per decisioni ufficiali contano contratto, conteggio salariale, cantone e documenti del datore di lavoro.",
    ],
  },
  {
    slug: "casa-budget",
    title: "Calcolatori casa e budget",
    shortTitle: "Casa e budget",
    description: "Calcoli per affitto sostenibile, budget mensile, cassa malati, auto, risparmio e decisioni quotidiane di finanza personale.",
    metaTitle: "Calcolatori casa e budget Svizzera | Calcolich",
    metaDescription: "Calcolatori gratuiti per affitto, budget mensile, cassa malati, spese auto, risparmio e finanza personale in Svizzera.",
    match: ["Casa", "Assicurazioni", "Mobilita", "Finanza personale"],
    intro: [
      "Casa, assicurazioni e spese fisse pesano molto sul budget mensile. Questa sezione raccoglie strumenti semplici per trasformare entrate e uscite in numeri piu chiari.",
      "Usali per confrontare scenari prima di firmare un contratto, cambiare appartamento, comprare un'auto o fissare un obiettivo di risparmio.",
    ],
  },
  {
    slug: "business-freelance",
    title: "Calcolatori business e freelance",
    shortTitle: "Business",
    description: "Strumenti per IVA, contributi AVS, margine, break even, prezzo vendita, tariffa freelance, ROI e gestione dei numeri di un'attivita.",
    metaTitle: "Calcolatori business e freelance | Calcolich",
    metaDescription: "Calcolatori gratuiti per IVA, contributi AVS indipendenti, margine, break even, prezzo vendita, ROI e tariffa freelance.",
    match: ["Business"],
    intro: [
      "Per lavorare bene online o da freelance servono calcoli rapidi su prezzi, margini, imposte e sostenibilita. Questa sezione raccoglie gli strumenti piu operativi.",
      "Sono utili per preventivi, fatture, pricing, controllo margini e prime simulazioni prima di prendere decisioni commerciali.",
    ],
  },
  {
    slug: "trading",
    title: "Calcolatori trading e risk management",
    shortTitle: "Trading",
    description: "Calcolatori per rischio per trade, lot size forex, drawdown, profitto e rapporto rischio rendimento.",
    metaTitle: "Calcolatori trading e risk management | Calcolich",
    metaDescription: "Calcolatori gratuiti per rischio trading, lot size forex, drawdown, profitto e risk reward.",
    match: ["Trading"],
    intro: [
      "Nel trading il calcolo viene prima dell'entrata. Questa sezione aiuta a definire rischio, size, potenziale profitto e drawdown prima di esporre capitale.",
      "Gli strumenti non sono segnali finanziari: servono a rendere piu disciplinata la gestione del rischio e la lettura degli scenari.",
    ],
  },
  {
    slug: "finanza",
    title: "Calcolatori finanza e investimenti",
    shortTitle: "Finanza",
    description: "Strumenti per pensione e tredicesima AVS, interessi composti, prestiti, mutuo, ROI, risparmio e pianificazione finanziaria.",
    metaTitle: "Calcolatori finanza online | Calcolich",
    metaDescription: "Calcolatori gratuiti per pensione e tredicesima AVS 2026, interessi composti, mutuo, rata prestito, ROI e risparmio.",
    match: ["Finanza", "Casa e finanza"],
    intro: [
      "Questa sezione raccoglie i calcolatori per ragionare su capitale, rate, rendimento, risparmio e investimenti con numeri immediati.",
      "Le simulazioni non garantiscono risultati futuri, ma aiutano a confrontare scenari e a capire meglio l'impatto di tempo, tassi e versamenti.",
    ],
  },
];

export function getCategory(slug: string) {
  return calculatorCategories.find((category) => category.slug === slug);
}

export function getCategoryCalculators(category: CalculatorCategory): Calculator[] {
  return calculators.filter((calculator) =>
    category.match.some((item) => calculator.category.includes(item)),
  );
}
