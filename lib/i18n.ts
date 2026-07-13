import { type Calculator, getCalculator } from "@/lib/calculators";
import { germanPriorityCalculators, getGermanPriorityCalculator } from "@/lib/german-calculators";
import { siteUrl } from "@/lib/site-metadata";

export type Locale = "de" | "it" | "en" | "fr";

type LocalizedCalculatorContent = Omit<Calculator, "kind">;

export const locales: Locale[] = ["de", "it", "en", "fr"];

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export const localeHome = {
  de: {
    label: "Deutsch",
    title: "Calcolich Schweiz | Rechner fuer Lohn, Steuern, Vorsorge und Budget",
    description:
      "Kostenlose Schweizer Rechner fuer Lohn, Quellensteuer, MWST, Saeule 3a, Hypothek, Krankenkasse, Familienzulagen, Arbeitslosenentschaedigung und Budget.",
    eyebrow: "Kostenlose Rechner fuer die Schweiz",
    heading: "Schweizer Rechner fuer Lohn, Steuern, Vorsorge, Familie und Wohnen",
    intro:
      "Berechne typische Schweizer Fragen mit CHF, kantonalen Steuern, Arbeitszeit, Sozialabgaben, MWST, Saeule 3a, Krankenkasse, Familienzulagen, Arbeitslosenentschaedigung und Wohnkosten. Die Ergebnisse sind transparent erklaert und bleiben indikative Rechenhilfen.",
    back: "Alle Rechner",
    newsletterTitle: "Calcolich Newsletter",
    newsletterButton: "Benachrichtigen",
    guideSuffix: "praktischer Leitfaden",
    guideLinksTitle: "Passende Ratgeber",
    recommendedAd: "Empfohlene Ressource",
    relatedTitle: "Verwandte Rechner",
  },
  it: {
    label: "Italiano",
    title: "Calcolich Svizzera | Calcolatori stipendio, tasse e budget",
    description:
      "Calcolatori gratuiti per stipendio, imposta alla fonte, cassa malati, affitto, budget e business in Svizzera.",
    eyebrow: "Calcolatori per la Svizzera",
    heading: "Calcolatori rapidi per stipendio, tasse e vita quotidiana in Svizzera",
    intro:
      "Strumenti pratici per lavoro, casa, finanze e attivita indipendente in Svizzera.",
    back: "Tutti i calcolatori",
    newsletterTitle: "Newsletter Calcolich",
    newsletterButton: "Avvisami",
    guideSuffix: "guida pratica",
    guideLinksTitle: "Guide collegate",
    recommendedAd: "Risorsa consigliata",
    relatedTitle: "Calcolatori collegati",
  },
  fr: {
    label: "Francais",
    title: "Calcolich Suisse | Calculateurs salaire, impots et budget",
    description:
      "Calculateurs gratuits pour salaire, impot a la source, assurance maladie, loyer, budget et business en Suisse.",
    eyebrow: "Calculateurs pour la Suisse",
    heading: "Des calculateurs rapides pour le salaire, les impots et le budget en Suisse",
    intro:
      "Des outils pratiques pour le travail, le logement, les finances et l'activite independante en Suisse.",
    back: "Tous les calculateurs",
    newsletterTitle: "Newsletter Calcolich",
    newsletterButton: "Me prevenir",
    guideSuffix: "guide pratique",
    guideLinksTitle: "Guides lies",
    recommendedAd: "Ressource recommandee",
    relatedTitle: "Calculateurs lies",
  },
  en: {
    label: "English",
    title: "Calcolich Switzerland | Salary, tax and budget calculators",
    description:
      "Free calculators for Swiss salary, withholding tax, health insurance, rent, budget and business planning.",
    eyebrow: "Calculators for Switzerland",
    heading: "Fast calculators for salary, tax and everyday decisions in Switzerland",
    intro:
      "Practical tools for work, housing, personal finance and freelance decisions in Switzerland.",
    back: "All calculators",
    newsletterTitle: "Calcolich Newsletter",
    newsletterButton: "Notify me",
    guideSuffix: "practical guide",
    guideLinksTitle: "Related guides",
    recommendedAd: "Recommended resource",
    relatedTitle: "Related calculators",
  },
} satisfies Record<Locale, Record<string, string>>;

const translatedSlugs = {
  "calcolo-imposta-alla-fonte-svizzera": {
    de: ["quellensteuer-rechner-schweiz", "Quellensteuer Rechner Schweiz", "Quellensteuer", "Steuern Schweiz"],
    it: ["calcolatore-imposta-alla-fonte-svizzera", "Calcolatore imposta alla fonte Svizzera", "Imposta alla fonte", "Tasse Svizzera"],
    fr: ["calculateur-impot-a-la-source-suisse", "Calculateur impot a la source Suisse", "Impot source", "Impots Suisse"],
    en: ["withholding-tax-calculator-switzerland", "Withholding Tax Calculator Switzerland", "Withholding tax", "Swiss taxes"],
  },
  "calcolo-cassa-malati-svizzera": {
    de: ["krankenkasse-praemien-rechner-schweiz", "Krankenkasse Praemien Rechner Schweiz", "Krankenkasse", "Versicherung Schweiz"],
    it: ["calcolatore-cassa-malati-svizzera", "Calcolatore cassa malati Svizzera", "Cassa malati", "Assicurazioni Svizzera"],
    fr: ["calculateur-assurance-maladie-suisse", "Calculateur assurance maladie Suisse", "Assurance maladie", "Assurance Suisse"],
    en: ["health-insurance-premium-calculator-switzerland", "Health Insurance Premium Calculator Switzerland", "Health insurance", "Swiss insurance"],
  },
  "calcolo-riduzione-premi-cassa-malati-svizzera": {
    de: ["praemienverbilligung-rechner-schweiz", "Prämienverbilligung Rechner Schweiz", "Prämienverbilligung", "Versicherung Schweiz"],
    it: ["calcolatore-riduzione-premi-cassa-malati-svizzera", "Calcolatore riduzione premi cassa malati Svizzera", "Riduzione premi", "Assicurazioni Svizzera"],
    fr: ["calculateur-reduction-primes-assurance-maladie-suisse", "Calculateur reduction primes assurance maladie Suisse", "Reduction primes", "Assurance Suisse"],
    en: ["health-insurance-premium-subsidy-calculator-switzerland", "Health Insurance Premium Subsidy Calculator Switzerland", "Premium subsidy", "Swiss insurance"],
  },
  "calcolo-assegni-familiari-svizzera": {
    de: ["familienzulagen-rechner-schweiz", "Familienzulagen Rechner Schweiz", "Familienzulagen", "Familie Schweiz"],
    it: ["calcolatore-assegni-familiari-svizzera", "Calcolatore assegni familiari Svizzera", "Assegni familiari", "Famiglia Svizzera"],
    fr: ["calculateur-allocations-familiales-suisse", "Calculateur allocations familiales Suisse", "Allocations familiales", "Famille Suisse"],
    en: ["family-allowances-calculator-switzerland", "Family Allowances Calculator Switzerland", "Family allowances", "Swiss family"],
  },
  "calcolo-affitto-sostenibile-svizzera": {
    de: ["mietbudget-rechner-schweiz", "Mietbudget Rechner Schweiz", "Mietbudget", "Wohnen Schweiz"],
    it: ["calcolatore-affitto-sostenibile-svizzera", "Calcolatore affitto sostenibile Svizzera", "Affitto sostenibile", "Casa Svizzera"],
    fr: ["calculateur-loyer-abordable-suisse", "Calculateur loyer abordable Suisse", "Loyer abordable", "Logement Suisse"],
    en: ["rent-affordability-calculator-switzerland", "Rent Affordability Calculator Switzerland", "Rent affordability", "Swiss housing"],
  },
  "calcolo-sostenibilita-ipoteca-svizzera": {
    de: ["hypotheken-tragbarkeit-rechner-schweiz", "Hypotheken Tragbarkeit Rechner Schweiz", "Hypothek Tragbarkeit", "Wohnen Schweiz"],
    it: ["calcolatore-sostenibilita-ipoteca-svizzera", "Calcolatore sostenibilita ipoteca Svizzera", "Sostenibilita ipoteca", "Casa Svizzera"],
    fr: ["calculateur-viabilite-hypotheque-suisse", "Calculateur viabilite hypotheque Suisse", "Viabilite hypotheque", "Logement Suisse"],
    en: ["mortgage-affordability-calculator-switzerland", "Mortgage Affordability Calculator Switzerland", "Mortgage affordability", "Swiss housing"],
  },
  "calcolo-salario-orario-svizzera": {
    de: ["stundenlohn-rechner-schweiz", "Stundenlohn Rechner Schweiz", "Stundenlohn", "Lohn Schweiz"],
    it: ["calcolatore-salario-orario-svizzera", "Calcolatore salario orario Svizzera", "Salario orario", "Stipendio Svizzera"],
    fr: ["calculateur-salaire-horaire-suisse", "Calculateur salaire horaire Suisse", "Salaire horaire", "Salaire Suisse"],
    en: ["hourly-wage-calculator-switzerland", "Hourly Wage Calculator Switzerland", "Hourly wage", "Swiss salary"],
  },
  "calcolo-contributi-avs-indipendenti": {
    de: ["ahv-beitraege-selbststaendige-rechner", "AHV Beitraege Selbststaendige Rechner", "AHV Selbstständige", "Business Schweiz"],
    it: ["calcolatore-contributi-avs-indipendenti", "Calcolatore contributi AVS indipendenti", "AVS indipendenti", "Business Svizzera"],
    fr: ["calculateur-cotisations-avs-independants-suisse", "Calculateur cotisations AVS independants Suisse", "AVS independants", "Business Suisse"],
    en: ["self-employed-ahv-contributions-calculator-switzerland", "Self-Employed AHV Contributions Calculator Switzerland", "Self-employed AHV", "Swiss business"],
  },
  "calcolo-salario-part-time-svizzera": {
    de: ["teilzeit-lohn-rechner-schweiz", "Teilzeit Lohn Rechner Schweiz", "Teilzeitlohn", "Lohn Schweiz"],
    it: ["calcolatore-salario-part-time-svizzera", "Calcolatore salario part-time Svizzera", "Salario part-time", "Stipendio Svizzera"],
    fr: ["calculateur-salaire-temps-partiel-suisse", "Calculateur salaire temps partiel Suisse", "Temps partiel", "Salaire Suisse"],
    en: ["part-time-salary-calculator-switzerland", "Part-Time Salary Calculator Switzerland", "Part-time salary", "Swiss salary"],
  },
  "calcolo-terzo-pilastro-risparmio-fiscale": {
    de: ["saeule-3a-steuerersparnis-rechner", "Saeule 3a Steuerersparnis Rechner", "Saeule 3a", "Vorsorge Schweiz"],
    it: ["calcolatore-terzo-pilastro-risparmio-fiscale", "Calcolatore risparmio fiscale terzo pilastro", "Terzo pilastro", "Previdenza Svizzera"],
    fr: ["calculateur-troisieme-pilier-economie-impot", "Calculateur troisieme pilier economie d'impot", "Troisieme pilier", "Prevoyance Suisse"],
    en: ["pillar-3a-tax-savings-calculator", "Pillar 3a Tax Savings Calculator", "Pillar 3a", "Swiss pension"],
  },
  "calcolo-budget-mensile": {
    de: ["budget-rechner-schweiz", "Budget Rechner Schweiz", "Budget", "Finanzen Schweiz"],
    it: ["calcolatore-budget-mensile-svizzera", "Calcolatore budget mensile Svizzera", "Budget mensile", "Finanze Svizzera"],
    fr: ["calculateur-budget-mensuel-suisse", "Calculateur budget mensuel Suisse", "Budget mensuel", "Finances Suisse"],
    en: ["monthly-budget-calculator-switzerland", "Monthly Budget Calculator Switzerland", "Monthly budget", "Swiss personal finance"],
  },
  "calcolo-indennita-disoccupazione-svizzera": {
    de: ["arbeitslosenentschaedigung-rechner-schweiz", "Arbeitslosenentschaedigung Rechner Schweiz", "Arbeitslosenentschädigung", "Arbeit Schweiz"],
    it: ["calcolatore-indennita-disoccupazione-svizzera", "Calcolatore indennita disoccupazione Svizzera", "Indennita disoccupazione", "Lavoro Svizzera"],
    fr: ["calculateur-indemnites-chomage-suisse", "Calculateur indemnites chomage Suisse", "Indemnites chomage", "Travail Suisse"],
    en: ["unemployment-benefit-calculator-switzerland", "Unemployment Benefit Calculator Switzerland", "Unemployment benefit", "Swiss work"],
  },
  "calcolo-spese-auto-svizzera": {
    de: ["autokosten-rechner-schweiz", "Autokosten Rechner Schweiz", "Autokosten", "Mobilitaet Schweiz"],
    it: ["calcolatore-spese-auto-svizzera", "Calcolatore spese auto Svizzera", "Spese auto", "Mobilita Svizzera"],
    fr: ["calculateur-cout-voiture-suisse", "Calculateur cout voiture Suisse", "Cout voiture", "Mobilite Suisse"],
    en: ["car-cost-calculator-switzerland", "Car Cost Calculator Switzerland", "Car cost", "Swiss mobility"],
  },
  "calcolo-fattura-freelance": {
    de: ["freelancer-stundensatz-rechner-schweiz", "Freelancer Stundensatz Rechner Schweiz", "Freelancer Rate", "Business Schweiz"],
    it: ["calcolatore-tariffa-freelance-svizzera", "Calcolatore tariffa freelance Svizzera", "Tariffa freelance", "Business Svizzera"],
    fr: ["calculateur-tarif-freelance-suisse", "Calculateur tarif freelance Suisse", "Tarif freelance", "Business Suisse"],
    en: ["freelance-rate-calculator-switzerland", "Freelance Rate Calculator Switzerland", "Freelance rate", "Swiss business"],
  },
  "calcolo-prezzo-vendita": {
    de: ["verkaufspreis-rechner", "Verkaufspreis Rechner", "Verkaufspreis", "Business"],
    it: ["calcolatore-prezzo-vendita", "Calcolatore prezzo di vendita", "Prezzo di vendita", "Business"],
    fr: ["calculateur-prix-de-vente", "Calculateur prix de vente", "Prix de vente", "Business"],
    en: ["selling-price-calculator", "Selling Price Calculator", "Selling price", "Business"],
  },
} satisfies Record<string, Record<Locale, [string, string, string, string]>>;

export const localizedBaseSlugs = Object.keys(translatedSlugs);

export function hasLocalizedCalculator(slug: string) {
  return localizedBaseSlugs.includes(slug);
}

export function hasTranslatedLocaleSlug(locale: Locale, slug: string) {
  return Boolean(getBaseSlug(locale, slug));
}

const localeCopy = {
  de: {
    meta: (title: string) => `${title} | Calcolich`,
    description: (title: string) => `${title}: kostenloser Online-Rechner fuer die Schweiz mit Ergebnis, FAQ und praktischer Erklaerung.`,
    intro: (title: string) => `${title} fuer schnelle Schaetzungen und klare Entscheidungen in der Schweiz.`,
    cta: "Erhalte neue Rechner fuer Lohn, Steuern, Budget und Business in der Schweiz.",
    article: (title: string) => [
      `${title} hilft dir, wichtige Zahlen schnell zu pruefen, ohne Formeln manuell nachzubauen. Der Rechner ist fuer typische Entscheidungen in der Schweiz gedacht: Jobangebot, Umzug, Budget, Versicherungen, Steuern oder selbststaendige Arbeit.`,
      "Das Ergebnis ist eine praktische Schaetzung. Fuer offizielle Entscheidungen solltest du kantonale Tabellen, Vertragsunterlagen, Versicherungsdaten oder eine qualifizierte Beratung verwenden.",
      "Nutze die verwandten Rechner, um mehrere Aspekte zusammenzubringen. So entsteht aus einem einzelnen Wert ein brauchbarer Blick auf dein monatliches Budget und deine naechsten Entscheidungen.",
    ],
    faqs: (title: string) => [
      { question: `Wofuer ist ${title}?`, answer: "Der Rechner liefert eine schnelle Schaetzung auf Basis deiner Eingaben." },
      { question: "Ist das Ergebnis offiziell?", answer: "Nein. Es ist eine Orientierung und ersetzt keine offiziellen Quellen." },
      { question: "Kann ich den Rechner kostenlos nutzen?", answer: "Ja, der Rechner ist kostenlos online nutzbar." },
    ],
  },
  it: {
    meta: (title: string) => `${title} | Calcolich`,
    description: (title: string) => `${title}: strumento gratuito con risultato immediato, FAQ e spiegazione pratica.`,
    intro: (title: string) => `${title} per ottenere rapidamente una stima utile in Svizzera.`,
    cta: "Ricevi nuovi calcolatori per stipendio, tasse, budget e business in Svizzera.",
    article: (title: string) => [
      `${title} aiuta a verificare rapidamente i numeri principali senza rifare manualmente le formule.`,
      "Il risultato e una stima pratica. Per decisioni ufficiali verifica sempre fonti, contratti e documenti aggiornati.",
      "Usa i calcolatori collegati per confrontare piu aspetti della stessa decisione.",
    ],
    faqs: (title: string) => [
      { question: `A cosa serve ${title}?`, answer: "Fornisce una stima rapida sulla base dei valori inseriti." },
      { question: "Il risultato e ufficiale?", answer: "No, e uno strumento informativo e non sostituisce fonti ufficiali." },
      { question: "Il calcolatore e gratuito?", answer: "Si, e gratuito e utilizzabile online." },
    ],
  },
  fr: {
    meta: (title: string) => `${title} | Calcolich`,
    description: (title: string) => `${title}: calculateur gratuit pour la Suisse avec resultat, FAQ et explication pratique.`,
    intro: (title: string) => `${title} pour obtenir rapidement une estimation utile en Suisse.`,
    cta: "Recevez de nouveaux calculateurs pour salaire, impots, budget et business en Suisse.",
    article: (title: string) => [
      `${title} aide a verifier rapidement des chiffres importants sans refaire les formules a la main. L'outil est concu pour les decisions courantes en Suisse: emploi, logement, budget, assurances, impots ou activite independante.`,
      "Le resultat est une estimation pratique. Pour une decision officielle, verifiez toujours les sources cantonales, contrats, donnees d'assurance ou un conseil qualifie.",
      "Utilisez les calculateurs lies pour combiner plusieurs aspects et obtenir une meilleure vision de votre budget mensuel.",
    ],
    faqs: (title: string) => [
      { question: `A quoi sert ${title}?`, answer: "Il donne une estimation rapide a partir des valeurs saisies." },
      { question: "Le resultat est-il officiel?", answer: "Non. C'est une orientation pratique, pas une source officielle." },
      { question: "Le calculateur est-il gratuit?", answer: "Oui, il est gratuit et fonctionne en ligne." },
    ],
  },
  en: {
    meta: (title: string) => `${title} | Calcolich`,
    description: (title: string) => `${title}: free Switzerland calculator with result, FAQ and practical explanation.`,
    intro: (title: string) => `${title} for quick estimates and clearer decisions in Switzerland.`,
    cta: "Get new calculators for Swiss salary, tax, budget and business decisions.",
    article: (title: string) => [
      `${title} helps you check important numbers quickly without rebuilding formulas manually. It is built for common decisions in Switzerland: salary, housing, budget, insurance, taxes or freelance work.`,
      "The result is a practical estimate. For official decisions, verify the numbers with cantonal sources, contracts, insurance documents or a qualified professional.",
      "Use the related calculators to connect several parts of the same decision and build a clearer view of your monthly budget.",
    ],
    faqs: (title: string) => [
      { question: `What is ${title} for?`, answer: "It gives a quick estimate based on the values you enter." },
      { question: "Is the result official?", answer: "No. It is a practical estimate and does not replace official sources." },
      { question: "Is the calculator free?", answer: "Yes, it is free and works online." },
    ],
  },
} satisfies Record<Locale, {
  meta: (title: string) => string;
  description: (title: string) => string;
  intro: (title: string) => string;
  cta: string;
  article: (title: string) => string[];
  faqs: (title: string) => { question: string; answer: string }[];
}>;

const inputLabels: Record<Locale, Record<string, string>> = {
  de: {
    gross: "Bruttolohn pro Monat CHF",
    socialRate: "Sozialabgaben %",
    taxRate: "Quellensteuer %",
    premium: "Monatspraemie CHF",
    franchise: "Franchise CHF",
    medicalCosts: "Erwartete Gesundheitskosten pro Jahr CHF",
    netIncome: "Nettoeinkommen pro Monat CHF",
    rentRate: "Maximaler Wohnanteil %",
    otherHousingCosts: "Weitere Wohnkosten CHF",
    grossIncome: "Bruttoeinkommen pro Jahr CHF",
    propertyPrice: "Kaufpreis Immobilie CHF",
    equity: "Eigenmittel CHF",
    imputedRate: "Kalkulatorischer Zinssatz %",
    ancillaryRate: "Unterhalt und Nebenkosten %",
    maxShare: "Maximaler Einkommensanteil %",
    monthlySalary: "Monatslohn CHF",
    hoursPerWeek: "Wochenstunden",
    weeksPerYear: "Bezahlte Wochen pro Jahr",
    fullTimeSalary: "Vollzeitlohn CHF",
    workPercent: "Arbeitspensum %",
    deductionRate: "Geschaetzte Abzuege %",
    contribution: "3a Einzahlung CHF",
    marginalTaxRate: "Grenzsteuersatz %",
    years: "Jahre",
    income: "Nettoeinnahmen pro Monat CHF",
    rent: "Miete und Wohnen CHF",
    healthInsurance: "Krankenkasse CHF",
    otherCosts: "Weitere Kosten CHF",
    leasing: "Leasing/Rate pro Monat CHF",
    insurance: "Versicherung pro Monat CHF",
    fuel: "Treibstoff/Laden pro Monat CHF",
    maintenance: "Unterhalt und Steuern pro Monat CHF",
    targetIncome: "Gewuenschtes Jahreseinkommen CHF",
    annualCosts: "Jaehrliche Kosten CHF",
    billableDays: "Verrechenbare Tage pro Jahr",
    hoursPerDay: "Verrechenbare Stunden pro Tag",
    cost: "Kosten CHF",
    marginRate: "Zielmarge %",
    vatRate: "MWST %",
    annualIncome: "Jahreseinkommen CHF",
    annualPremium: "Jahrespraemie CHF",
    childAllowance: "Kinderzulage pro Monat CHF",
    educationAllowance: "Ausbildungszulage pro Monat CHF",
    childCount: "Anzahl Kinder",
    trainingCount: "Anzahl Kinder in Ausbildung",
    months: "Monate",
  },
  it: {},
  fr: {
    gross: "Salaire brut mensuel CHF",
    socialRate: "Cotisations sociales %",
    taxRate: "Impot a la source %",
    premium: "Prime mensuelle CHF",
    franchise: "Franchise CHF",
    medicalCosts: "Frais medicaux annuels prevus CHF",
    netIncome: "Revenu net mensuel CHF",
    rentRate: "Part maximale pour le logement %",
    otherHousingCosts: "Autres frais logement CHF",
    grossIncome: "Revenu brut annuel CHF",
    propertyPrice: "Prix du bien CHF",
    equity: "Fonds propres CHF",
    imputedRate: "Taux theorique %",
    ancillaryRate: "Entretien et frais annexes %",
    maxShare: "Part maximale du revenu %",
    monthlySalary: "Salaire mensuel CHF",
    hoursPerWeek: "Heures par semaine",
    weeksPerYear: "Semaines payees par an",
    fullTimeSalary: "Salaire plein temps CHF",
    workPercent: "Taux d'activite %",
    deductionRate: "Deduction estimee %",
    contribution: "Versement 3a CHF",
    marginalTaxRate: "Taux marginal estime %",
    years: "Annees",
    income: "Revenus nets mensuels CHF",
    rent: "Loyer et logement CHF",
    healthInsurance: "Assurance maladie CHF",
    otherCosts: "Autres depenses CHF",
    leasing: "Leasing/mensualite CHF",
    insurance: "Assurance mensuelle CHF",
    fuel: "Carburant/recharge mensuel CHF",
    maintenance: "Entretien et taxes mensuels CHF",
    targetIncome: "Revenu annuel souhaite CHF",
    annualCosts: "Couts annuels CHF",
    billableDays: "Jours facturables par an",
    hoursPerDay: "Heures facturables par jour",
    cost: "Cout CHF",
    marginRate: "Marge souhaitee %",
    vatRate: "TVA %",
    annualIncome: "Revenu annuel CHF",
    annualPremium: "Prime annuelle CHF",
    childAllowance: "Allocation pour enfant par mois CHF",
    educationAllowance: "Allocation de formation par mois CHF",
    childCount: "Nombre d'enfants",
    trainingCount: "Nombre d'enfants en formation",
    months: "Mois",
  },
  en: {
    gross: "Monthly gross salary CHF",
    socialRate: "Social deductions %",
    taxRate: "Withholding tax %",
    premium: "Monthly premium CHF",
    franchise: "Deductible CHF",
    medicalCosts: "Expected annual medical costs CHF",
    netIncome: "Monthly net income CHF",
    rentRate: "Maximum housing share %",
    otherHousingCosts: "Other housing costs CHF",
    grossIncome: "Annual gross income CHF",
    propertyPrice: "Property price CHF",
    equity: "Equity CHF",
    imputedRate: "Imputed interest rate %",
    ancillaryRate: "Maintenance and ancillary costs %",
    maxShare: "Maximum income share %",
    monthlySalary: "Monthly salary CHF",
    hoursPerWeek: "Hours per week",
    weeksPerYear: "Paid weeks per year",
    fullTimeSalary: "Full-time salary CHF",
    workPercent: "Work percentage %",
    deductionRate: "Estimated deductions %",
    contribution: "Pillar 3a contribution CHF",
    marginalTaxRate: "Estimated marginal tax rate %",
    years: "Years",
    income: "Monthly net income CHF",
    rent: "Rent and housing CHF",
    healthInsurance: "Health insurance CHF",
    otherCosts: "Other costs CHF",
    leasing: "Lease/payment per month CHF",
    insurance: "Monthly insurance CHF",
    fuel: "Monthly fuel/charging CHF",
    maintenance: "Monthly maintenance and taxes CHF",
    targetIncome: "Target annual income CHF",
    annualCosts: "Annual costs CHF",
    billableDays: "Billable days per year",
    hoursPerDay: "Billable hours per day",
    cost: "Cost CHF",
    marginRate: "Target margin %",
    vatRate: "VAT %",
    annualIncome: "Annual income CHF",
    annualPremium: "Annual premium CHF",
    childAllowance: "Child allowance per month CHF",
    educationAllowance: "Education allowance per month CHF",
    childCount: "Number of children",
    trainingCount: "Number of children in education",
    months: "Months",
  },
};

const localizedContent = buildLocalizedContent();

export function getLocalizedCalculators(locale: Locale) {
  const translated = Object.keys(localizedContent[locale])
    .map((baseSlug) => getLocalizedCalculatorByBaseSlug(locale, baseSlug))
    .filter((calculator): calculator is Calculator => Boolean(calculator));

  if (locale !== "de") return translated;

  const merged = new Map(translated.map((calculator) => [calculator.slug, calculator]));
  germanPriorityCalculators.forEach((calculator) => merged.set(calculator.slug, calculator));
  return Array.from(merged.values());
}

export function getLocalizedCalculator(locale: Locale, slug: string) {
  if (locale === "de") {
    const priorityCalculator = getGermanPriorityCalculator(slug);
    if (priorityCalculator) return priorityCalculator;
  }
  const baseSlug = getBaseSlug(locale, slug);
  return baseSlug ? getLocalizedCalculatorByBaseSlug(locale, baseSlug) : undefined;
}

export function getLocalizedStaticParams(locale: Locale) {
  return getLocalizedCalculators(locale).map((calculator) => ({ slug: calculator.slug }));
}

export function getLocalizedRelatedCalculators(locale: Locale, calculator: Calculator) {
  if (locale === "de" && calculator.isPriority) {
    return calculator.relatedSlugs
      .map((slug) => getGermanPriorityCalculator(slug) ?? getLocalizedCalculator("de", slug))
      .filter((item): item is Calculator => Boolean(item));
  }

  const baseSlug = getBaseSlug(locale, calculator.slug);
  const content = baseSlug ? localizedContent[locale][baseSlug] : undefined;

  return (content?.relatedSlugs ?? [])
    .map((relatedBaseSlug) => getLocalizedCalculatorByBaseSlug(locale, relatedBaseSlug) ?? getCalculator(relatedBaseSlug))
    .filter((item): item is Calculator => Boolean(item));
}

export function localizedHref(locale: Locale, calculator: Calculator) {
  if (locale === "de" && calculator.isPriority) return `/de/${calculator.slug}`;

  const baseSlug = getBaseSlug(locale, calculator.slug)
    ?? (localizedContent[locale][calculator.slug] ? calculator.slug : undefined);

  return baseSlug
    ? `/${locale}/${localizedContent[locale][baseSlug].slug}`
    : `/${calculator.slug}`;
}

export function localizedAlternates(locale: Locale, slug?: string) {
  if (locale === "de" && slug && getGermanPriorityCalculator(slug) && !hasTranslatedLocaleSlug(locale, slug)) {
    const url = `${siteUrl}/de/${slug}`;
    return {
      canonical: url,
      languages: {
        de: url,
        "x-default": url,
      },
    };
  }

  const currentBaseSlug = slug ? getBaseSlug(locale, slug) : undefined;
  const localizedPath = (targetLocale: Locale) =>
    `/${targetLocale}${currentBaseSlug ? `/${localizedContent[targetLocale][currentBaseSlug].slug}` : ""}`;

  return {
    canonical: `${siteUrl}/${locale}${slug ? `/${slug}` : ""}`,
    languages: {
      de: `${siteUrl}${localizedPath("de")}`,
      it: `${siteUrl}${localizedPath("it")}`,
      en: `${siteUrl}${localizedPath("en")}`,
      fr: `${siteUrl}${localizedPath("fr")}`,
      "x-default": `${siteUrl}${localizedPath("de")}`,
    },
  };
}

function getBaseSlug(locale: Locale, slug: string) {
  return Object.keys(localizedContent[locale]).find(
    (baseSlug) => localizedContent[locale][baseSlug].slug === slug,
  );
}

function getLocalizedCalculatorByBaseSlug(locale: Locale, baseSlug: string) {
  const base = getCalculator(baseSlug);
  const content = localizedContent[locale][baseSlug];
  if (!base || !content) return undefined;

  return {
    ...base,
    ...content,
  };
}

function buildLocalizedContent() {
  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      Object.fromEntries(
        Object.entries(translatedSlugs).map(([baseSlug, translations]) => {
          const base = getCalculator(baseSlug);
          const [slug, title, shortTitle, category] = translations[locale];
          const copy = localeCopy[locale];

          if (locale === "it" && base) {
            const baseContent = Object.fromEntries(
              Object.entries(base).filter(([key]) => key !== "kind"),
            ) as LocalizedCalculatorContent;
            return [baseSlug, { ...baseContent, slug }];
          }

          return [
            baseSlug,
            {
              slug,
              title,
              shortTitle,
              category,
              metaTitle: copy.meta(title),
              metaDescription: copy.description(title),
              intro: copy.intro(title),
              cta: copy.cta,
              inputs: localizeInputs(locale, base),
              article: copy.article(title),
              faqs: copy.faqs(title),
              relatedSlugs: base?.relatedSlugs ?? [],
            },
          ];
        }),
      ),
    ]),
  ) as Record<Locale, Record<string, LocalizedCalculatorContent>>;
}

function localizeInputs(locale: Locale, calculator?: Calculator) {
  return (calculator?.inputs ?? []).map((input) => ({
    ...input,
    label: inputLabels[locale][input.key] ?? input.label,
  }));
}
