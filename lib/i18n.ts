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
    formulaTitle: "Formel",
    exampleTitle: "Praktisches Beispiel",
    usageTitle: "Hinweis zur Nutzung",
    usageText:
      "Die Ergebnisse sind indikative Berechnungen auf Basis deiner Eingaben. Sie ersetzen keine verbindliche Lohnabrechnung, Rechtsberatung oder Auskunft einer offiziellen Stelle.",
    importantNotesTitle: "Wichtige Hinweise",
    sourcesTitle: "Quellen und Aktualisierung",
    updatedAtPrefix: "Zuletzt aktualisiert",
    partnerEyebrow: "Passende Angebote",
    partnerReservedText:
      "Vergleichsangebote und Partnerressourcen werden hier erst ergaenzt, wenn sie redaktionell geprueft und mit echten Links konfiguriert sind.",
    sidebarNewsletterTitle: "Neue passende Rechner erhalten",
    sidebarNewsletterButton: "Updates erhalten",
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
    formulaTitle: "Formula",
    exampleTitle: "Esempio pratico",
    usageTitle: "Nota d'uso",
    usageText:
      "I risultati sono calcoli indicativi basati sui valori inseriti. Non sostituiscono una busta paga vincolante, una consulenza legale o una risposta ufficiale.",
    importantNotesTitle: "Note importanti",
    sourcesTitle: "Fonti e aggiornamento",
    updatedAtPrefix: "Ultimo aggiornamento",
    partnerEyebrow: "Offerte pertinenti",
    partnerReservedText:
      "Confronti e risorse partner saranno aggiunti qui solo dopo verifica editoriale e configurazione di link reali.",
    sidebarNewsletterTitle: "Ricevi nuovi strumenti utili",
    sidebarNewsletterButton: "Ricevi aggiornamenti",
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
    formulaTitle: "Formule",
    exampleTitle: "Exemple pratique",
    usageTitle: "Note d'utilisation",
    usageText:
      "Les resultats sont des calculs indicatifs bases sur vos saisies. Ils ne remplacent pas une fiche de salaire contraignante, un conseil juridique ou une reponse officielle.",
    importantNotesTitle: "Notes importantes",
    sourcesTitle: "Sources et mise a jour",
    updatedAtPrefix: "Derniere mise a jour",
    partnerEyebrow: "Offres pertinentes",
    partnerReservedText:
      "Les comparaisons et ressources partenaires seront ajoutees ici uniquement apres verification editoriale et configuration de vrais liens.",
    sidebarNewsletterTitle: "Recevoir de nouveaux outils utiles",
    sidebarNewsletterButton: "Recevoir les mises a jour",
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
    formulaTitle: "Formula",
    exampleTitle: "Practical example",
    usageTitle: "Usage note",
    usageText:
      "Results are indicative calculations based on your inputs. They do not replace a binding payslip, legal advice or an official answer.",
    importantNotesTitle: "Important notes",
    sourcesTitle: "Sources and update",
    updatedAtPrefix: "Last updated",
    partnerEyebrow: "Relevant offers",
    partnerReservedText:
      "Comparison offers and partner resources will appear here only after editorial review and real link configuration.",
    sidebarNewsletterTitle: "Get useful new tools",
    sidebarNewsletterButton: "Get updates",
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

// Localized guide links for translated calculator pages. Base calculators are
// Italian, so DE/EN/FR pages must not inherit Italian guide labels. DE remaps
// to German Ratgeber where a real equivalent exists; links without a localized
// entry are omitted instead of showing mixed-language labels.
type LocalizedGuideLink = { href: string; label: string; description: string };

const localizedGuideLinks: Record<Exclude<Locale, "it">, Record<string, LocalizedGuideLink>> = {
  de: {
    "/guide/imposta-alla-fonte-svizzera": {
      href: "/de/ratgeber/quellensteuer-schweiz-2026",
      label: "Ratgeber Quellensteuer Schweiz 2026",
      description: "Tarif, kantonale Unterschiede und offizielle Verifikation der Quellensteuer.",
    },
    "/guide/stipendio-netto-svizzera": {
      href: "/de/ratgeber/stundenlohn-berechnen-schweiz",
      label: "Ratgeber Stundenlohn berechnen",
      description: "Formeln, 13. Monatslohn und Ferienzuschlag fuer den Nettovergleich.",
    },
    "/guide/cassa-malati-svizzera": {
      href: "/de/ratgeber/praemienverbilligung-schweiz",
      label: "Ratgeber Praemienverbilligung",
      description: "Praemien, Franchise und Jahreskosten zusammen lesen.",
    },
    "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Assicurazione-vecchiaia-e-superstiti-AVS/Ausilio-per-il-calcolo/Calcolo-dei-contributi-degli-indipendenti": {
      href: "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Assicurazione-vecchiaia-e-superstiti-AVS/Ausilio-per-il-calcolo/Calcolo-dei-contributi-degli-indipendenti",
      label: "Offizielle AHV/IV-Berechnung",
      description: "Kanton, Satz und definitive Beitraege auf dem offiziellen Portal pruefen.",
    },
    "https://www.arbeit.swiss/secoalv/it/home/menue/stellensuchende/arbeitslos-was-tun-/finanzielles.html": {
      href: "https://www.arbeit.swiss/secoalv/it/home/menue/stellensuchende/arbeitslos-was-tun-/finanzielles.html",
      label: "Offizielle Stelle: Arbeitslosenversicherung",
      description: "Regeln zum versicherten Lohn, zu Saetzen und zur Auszahlung der Taggelder.",
    },
  },
  en: {
    "/guide/imposta-alla-fonte-svizzera": {
      href: "/guide/imposta-alla-fonte-svizzera",
      label: "Withholding tax guide for Switzerland",
      description: "Data to prepare, limits of the estimate and how it connects to net salary.",
    },
    "/guide/stipendio-netto-svizzera": {
      href: "/guide/stipendio-netto-svizzera",
      label: "Net salary guide",
      description: "How to read deductions and disposable net income before a salary decision.",
    },
    "/guide/cassa-malati-svizzera": {
      href: "/guide/cassa-malati-svizzera",
      label: "Health insurance guide for Switzerland",
      description: "Premium, deductible and annual cost read together to avoid partial comparisons.",
    },
    "/guide/costo-vita-svizzera": {
      href: "/guide/costo-vita-svizzera",
      label: "Cost of living guide",
      description: "How to read income, rent, recurring costs and margin before a housing commitment.",
    },
    "/guide/affitto-sostenibile-svizzera": {
      href: "/guide/affitto-sostenibile-svizzera",
      label: "Affordable rent guide",
      description: "How to start from net income and keep margin for expenses, surprises and savings.",
    },
    "/guide/terzo-pilastro-risparmio-fiscale": {
      href: "/guide/terzo-pilastro-risparmio-fiscale",
      label: "Pillar 3a guide",
      description: "How to read tax savings, the annual limit and planning before contributing.",
    },
    "/guide/freelance-svizzera": {
      href: "/guide/freelance-svizzera",
      label: "Freelance guide for Switzerland",
      description: "Rate, costs, margin and sustainability of an independent activity.",
    },
    "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Assicurazione-vecchiaia-e-superstiti-AVS/Ausilio-per-il-calcolo/Calcolo-dei-contributi-degli-indipendenti": {
      href: "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Assicurazione-vecchiaia-e-superstiti-AVS/Ausilio-per-il-calcolo/Calcolo-dei-contributi-degli-indipendenti",
      label: "Official AHV/IV calculation",
      description: "Verify canton, rate and definitive contributions on the official portal.",
    },
    "https://www.arbeit.swiss/secoalv/it/home/menue/stellensuchende/arbeitslos-was-tun-/finanzielles.html": {
      href: "https://www.arbeit.swiss/secoalv/it/home/menue/stellensuchende/arbeitslos-was-tun-/finanzielles.html",
      label: "Official source: unemployment insurance",
      description: "Rules on insured income, rates and payment of benefits.",
    },
  },
  fr: {
    "/guide/imposta-alla-fonte-svizzera": {
      href: "/guide/imposta-alla-fonte-svizzera",
      label: "Guide impot a la source en Suisse",
      description: "Donnees a preparer, limites de l'estimation et lien avec le salaire net.",
    },
    "/guide/stipendio-netto-svizzera": {
      href: "/guide/stipendio-netto-svizzera",
      label: "Guide salaire net",
      description: "Comment lire deductions et net disponible avant une decision salariale.",
    },
    "/guide/cassa-malati-svizzera": {
      href: "/guide/cassa-malati-svizzera",
      label: "Guide assurance maladie en Suisse",
      description: "Prime, franchise et cout annuel lus ensemble pour eviter des comparaisons partielles.",
    },
    "/guide/costo-vita-svizzera": {
      href: "/guide/costo-vita-svizzera",
      label: "Guide cout de la vie",
      description: "Comment lire revenu, loyer, couts recurrents et marge avant un engagement immobilier.",
    },
    "/guide/affitto-sostenibile-svizzera": {
      href: "/guide/affitto-sostenibile-svizzera",
      label: "Guide loyer abordable",
      description: "Comment partir du net et garder une marge pour frais, imprevus et epargne.",
    },
    "/guide/terzo-pilastro-risparmio-fiscale": {
      href: "/guide/terzo-pilastro-risparmio-fiscale",
      label: "Guide troisieme pilier",
      description: "Comment lire economie d'impot, limite annuelle et planification avant le versement.",
    },
    "/guide/freelance-svizzera": {
      href: "/guide/freelance-svizzera",
      label: "Guide freelance en Suisse",
      description: "Tarif, couts, marge et viabilite d'une activite independante.",
    },
    "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Assicurazione-vecchiaia-e-superstiti-AVS/Ausilio-per-il-calcolo/Calcolo-dei-contributi-degli-indipendenti": {
      href: "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Assicurazione-vecchiaia-e-superstiti-AVS/Ausilio-per-il-calcolo/Calcolo-dei-contributi-degli-indipendenti",
      label: "Calcul officiel AVS/AI",
      description: "Verifiez canton, taux et cotisations definitives sur le portail officiel.",
    },
    "https://www.arbeit.swiss/secoalv/it/home/menue/stellensuchende/arbeitslos-was-tun-/finanzielles.html": {
      href: "https://www.arbeit.swiss/secoalv/it/home/menue/stellensuchende/arbeitslos-was-tun-/finanzielles.html",
      label: "Source officielle: assurance chomage",
      description: "Regles sur le gain assure, les taux et le paiement des indemnites.",
    },
  },
};

function localizeGuideLinks(locale: Locale, links: Calculator["guideLinks"]) {
  if (locale === "it") return links;

  const map = localizedGuideLinks[locale];
  const localized = (links ?? [])
    .map((link) => map[link.href])
    .filter((link): link is LocalizedGuideLink => Boolean(link));

  return localized.length > 0 ? localized : undefined;
}

// Localized formula, example, sources and date for translated calculators whose
// base content carries Italian text. Base `resultLabels` are intentionally not
// inherited on non-IT pages: the widget map in lib/result-labels.ts supplies
// localized labels. Only real, verified URLs are used (German URLs come from
// the German priority calculators; otherwise the existing href is kept).
type LocalizedCalculatorExtras = {
  formula?: string;
  example?: string;
  updatedAt?: string;
  sources?: { label: string; href: string }[];
};

const localizedCalculatorExtras: Record<string, Partial<Record<Locale, LocalizedCalculatorExtras>>> = {
  "calcolo-sostenibilita-ipoteca-svizzera": {
    de: {
      formula: "Tragbarkeit = (Hypothek x kalkulatorischer Zinssatz + Kaufpreis x Anteil Nebenkosten) / Bruttoeinkommen pro Jahr x 100.",
      example: "Beispiel: bei CHF 850'000 Kaufpreis, CHF 180'000 Eigenmitteln und 5% kalkulatorischem Zinssatz betraegt die geschaetzte Hypothek CHF 670'000, und die theoretischen Jahreskosten starten bei CHF 33'500 vor Nebenkosten.",
      updatedAt: "12. Juli 2026",
      sources: [
        { label: "FINMA: Hypotheken", href: "https://www.finma.ch/de/dokumentation/dossier/dossier-hypotheken/" },
        { label: "ch.ch: Wohneigentum finanzieren", href: "https://www.ch.ch/de/wohnen/wohneigentum/" },
      ],
    },
    en: {
      formula: "Affordability = (mortgage x imputed rate + property price x ancillary cost share) / annual gross income x 100.",
      example: "Example: with a CHF 850'000 price, CHF 180'000 equity and a 5% imputed rate, the estimated mortgage is CHF 670'000 and theoretical annual costs start at CHF 33'500 before ancillary costs.",
      updatedAt: "July 12, 2026",
      sources: [
        { label: "FINMA: Mortgages", href: "https://www.finma.ch/de/dokumentation/dossier/dossier-hypotheken/" },
        { label: "ch.ch: Financing residential property", href: "https://www.ch.ch/it/abitazione/proprieta-abitativa/" },
      ],
    },
    fr: {
      formula: "Viabilite = (hypotheque x taux theorique + prix du bien x part des frais annexes) / revenu brut annuel x 100.",
      example: "Exemple: avec un prix de CHF 850'000, CHF 180'000 de fonds propres et un taux theorique de 5%, l'hypothèque estimee est de CHF 670'000 et les couts annuels theoriques partent de CHF 33'500 avant frais annexes.",
      updatedAt: "12 juillet 2026",
      sources: [
        { label: "FINMA: Hypotheques", href: "https://www.finma.ch/de/dokumentation/dossier/dossier-hypotheken/" },
        { label: "ch.ch: Financer une propriete", href: "https://www.ch.ch/it/abitazione/proprieta-abitativa/" },
      ],
    },
  },
  "calcolo-imposta-alla-fonte-svizzera": {
    de: {
      formula: "Netto geschaetzt = Bruttolohn - Sozialabgaben - Quellensteuer. Abzuege und Steuer werden als Prozentsatz des Bruttolohns berechnet.",
      example: "Beispiel: mit CHF 6'500 brutto, 12% Sozialabgaben und 8% Quellensteuer betraegt das geschaetzte Netto CHF 5'200.",
      updatedAt: "25. Juli 2026",
      sources: [
        { label: "ESTV: Schweizerische Quellensteuer QST", href: "https://www.estv.admin.ch/de/quellensteuer" },
        { label: "ESTV: Quellensteuertarife für übrige Einkünfte", href: "https://www.estv.admin.ch/de/quellensteuertarife-fuer-uebrige-einkuenfte" },
        { label: "ch.ch: Steuern bezahlen", href: "https://www.ch.ch/de/steuern-und-finanzen/steuern-bezahlen/" },
      ],
    },
    en: {
      formula: "Estimated net = gross salary - social deductions - withholding tax. Deductions and tax are calculated as a percentage of gross.",
      example: "Example: with CHF 6'500 gross, 12% social deductions and 8% withholding tax, the estimated net is CHF 5'200.",
      updatedAt: "July 25, 2026",
      sources: [
        { label: "FTA: Swiss withholding tax QST", href: "https://www.estv.admin.ch/de/quellensteuer" },
        { label: "FTA: Withholding tax rates for other income", href: "https://www.estv.admin.ch/de/quellensteuertarife-fuer-uebrige-einkuenfte" },
        { label: "ch.ch: Paying taxes", href: "https://www.ch.ch/de/steuern-und-finanzen/steuern-bezahlen/" },
      ],
    },
    fr: {
      formula: "Net estime = salaire brut - cotisations sociales - impot a la source. Les retenues et l'impot sont calcules en pourcentage du brut.",
      example: "Exemple: avec CHF 6'500 brut, 12% de cotisations sociales et 8% d'impot a la source, le net estime est de CHF 5'200.",
      updatedAt: "25 juillet 2026",
      sources: [
        { label: "AFC: Impot a la source suisse", href: "https://www.estv.admin.ch/de/quellensteuer" },
        { label: "AFC: Tarifs d'impot a la source pour autres revenus", href: "https://www.estv.admin.ch/de/quellensteuertarife-fuer-uebrige-einkuenfte" },
        { label: "ch.ch: Payer des impots", href: "https://www.ch.ch/de/steuern-und-finanzen/steuern-bezahlen/" },
      ],
    },
  },
  "calcolo-riduzione-premi-cassa-malati-svizzera": {
    de: {
      formula: "Moegliche Verbilligung = Jahrespraemie Krankenkasse - (Jahreseinkommen x tragbarer Anteil). Das Ergebnis ersetzt die kantonale Pruefung nicht.",
      example: "Beispiel: bei CHF 45'000 Einkommen, CHF 5'400 Jahrespraemie und 8% tragbarem Anteil zeigt das Modell eine moegliche Verbilligung von CHF 1'800.",
      updatedAt: "13. Juli 2026",
      sources: [
        { label: "BAG: Praemienverbilligung", href: "https://www.bag.admin.ch/bag/de/home/versicherungen/krankenversicherung/krankenversicherung-versicherte-mit-wohnsitz-in-der-schweiz/praemienverbilligung.html" },
      ],
    },
    en: {
      formula: "Potential subsidy = annual health insurance premium - (annual income x affordable share). The result does not replace the cantonal review.",
      example: "Example: with CHF 45'000 income, CHF 5'400 annual premium and an 8% affordable share, the model shows a potential subsidy of CHF 1'800.",
      updatedAt: "July 13, 2026",
      sources: [
        { label: "FOPH: Premium subsidies", href: "https://www.bag.admin.ch/bag/de/home/versicherungen/krankenversicherung/krankenversicherung-versicherte-mit-wohnsitz-in-der-schweiz/praemienverbilligung.html" },
      ],
    },
    fr: {
      formula: "Reduction potentielle = prime annuelle assurance maladie - (revenu annuel x part supportable). Le resultat ne remplace pas la verification cantonale.",
      example: "Exemple: avec CHF 45'000 de revenu, CHF 5'400 de prime annuelle et une part supportable de 8%, le modele montre une reduction potentielle de CHF 1'800.",
      updatedAt: "13 juillet 2026",
      sources: [
        { label: "OFSP: Reduction des primes", href: "https://www.bag.admin.ch/bag/de/home/versicherungen/krankenversicherung/krankenversicherung-versicherte-mit-wohnsitz-in-der-schweiz/praemienverbilligung.html" },
      ],
    },
  },
  "calcolo-assegni-familiari-svizzera": {
    de: {
      formula: "Jahresbetrag = (Kinderzulage x Anzahl Kinder + Ausbildungszulage x Anzahl Kinder in Ausbildung) x anspruchsberechtigte Monate.",
      example: "Beispiel: 2 Kinder mit CHF 250 Kinderzulage und 1 Kind in Ausbildung mit CHF 300 ergeben CHF 800 pro Monat und CHF 9'600 in 12 Monaten.",
      updatedAt: "13. Juli 2026",
      sources: [
        { label: "BSV: Familienzulagen", href: "https://www.bsv.admin.ch/de/familienzulagen-gesetze-und-verordnungen" },
      ],
    },
    en: {
      formula: "Annual amount = (child allowance x number of children + education allowance x children in education) x entitled months.",
      example: "Example: 2 children with CHF 250 child allowance and 1 child in education with CHF 300 produce CHF 800 per month and CHF 9'600 in 12 months.",
      updatedAt: "July 13, 2026",
      sources: [
        { label: "BSV: Family allowances", href: "https://www.bsv.admin.ch/de/familienzulagen-gesetze-und-verordnungen" },
      ],
    },
    fr: {
      formula: "Montant annuel = (allocation pour enfant x nombre d'enfants + allocation de formation x enfants en formation) x mois de droit.",
      example: "Exemple: 2 enfants avec CHF 250 d'allocation et 1 enfant en formation avec CHF 300 donnent CHF 800 par mois et CHF 9'600 en 12 mois.",
      updatedAt: "13 juillet 2026",
      sources: [
        { label: "BSV: Allocations familiales", href: "https://www.bsv.admin.ch/de/familienzulagen-gesetze-und-verordnungen" },
      ],
    },
  },
  "calcolo-terzo-pilastro-risparmio-fiscale": {
    de: {
      formula: "Steuerminderung pro Jahr = 3a-Einzahlung x geschaetzter Grenzsteuersatz. Die Steuerminderung total multipliziert die jaehrliche Schaetzung mit den eingegebenen Jahren.",
      example: "Beispiel: mit CHF 7'056 Einzahlung in die Saeule 3a und 22% Grenzsteuersatz betraegt die geschaetzte Steuerminderung rund CHF 1'552.32 pro Jahr.",
      updatedAt: "12. Juli 2026",
      sources: [
        { label: "BSV: Saeule 3a", href: "https://www.bsv.admin.ch/bsv/de/home/sozialversicherungen/bv/grundlagen-und-gesetze/saeule-3a.html" },
        { label: "ESTV: Direkte Bundessteuer", href: "https://www.estv.admin.ch/estv/de/home/direkte-bundessteuer.html" },
      ],
    },
    en: {
      formula: "Annual tax savings = pillar 3a contribution x estimated marginal tax rate. Total tax savings multiplies the annual estimate by the years entered.",
      example: "Example: with CHF 7'056 contributed to pillar 3a and a 22% marginal rate, the estimated tax saving is about CHF 1'552.32 per year.",
      updatedAt: "July 12, 2026",
      sources: [
        { label: "BSV: Pillar 3a", href: "https://www.bsv.admin.ch/bsv/it/home/assicurazioni-sociali/bv/basi-e-leggi/pilastro-3a.html" },
        { label: "ch.ch: Private pension provision", href: "https://www.ch.ch/it/pensionamento/previdenza-privata/" },
      ],
    },
    fr: {
      formula: "Economie d'impot annuelle = versement 3a x taux marginal estime. L'economie totale multiplie l'estimation annuelle par les annees saisies.",
      example: "Exemple: avec CHF 7'056 verses dans le 3e pilier et un taux marginal de 22%, l'economie d'impot estimee est d'environ CHF 1'552.32 par an.",
      updatedAt: "12 juillet 2026",
      sources: [
        { label: "BSV: Troisieme pilier", href: "https://www.bsv.admin.ch/bsv/it/home/assicurazioni-sociali/bv/basi-e-leggi/pilastro-3a.html" },
        { label: "ch.ch: Prevoyance privee", href: "https://www.ch.ch/it/pensionamento/previdenza-privata/" },
      ],
    },
  },
  "calcolo-contributi-avs-indipendenti": {
    de: {
      formula: "Geschaetzte Beitraege = Nettoeinkommen pro Jahr x AHV/IV/IPG-Satz. Liegt das Ergebnis unter dem Minimum, gilt der Mindestbeitrag, danach kommen die Verwaltungskosten dazu.",
      example: "Beispiel: CHF 90'000 Nettoeinkommen mit 9,8% Satz ergeben CHF 8'820 Beitraege; mit 4% Verwaltungskosten steigt der Totalbetrag auf CHF 9'172.80.",
      updatedAt: "13. Juli 2026",
      sources: [
        { label: "ahv-iv.ch: Beitraege der Selbststaendigen", href: "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Assicurazione-vecchiaia-e-superstiti-AVS/Ausilio-per-il-calcolo/Calcolo-dei-contributi-degli-indipendenti" },
      ],
    },
    en: {
      formula: "Estimated contributions = annual net income x AHV/IV/IPG rate. If the result is below the minimum, the minimum contribution applies, then admin costs are added.",
      example: "Example: CHF 90'000 net income at a 9.8% rate generates CHF 8'820 in contributions; with 4% admin costs the total reaches CHF 9'172.80.",
      updatedAt: "July 13, 2026",
      sources: [
        { label: "ahv-iv.ch: Contributions of the self-employed", href: "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Assicurazione-vecchiaia-e-superstiti-AVS/Ausilio-per-il-calcolo/Calcolo-dei-contributi-degli-indipendenti" },
      ],
    },
    fr: {
      formula: "Cotisations estimees = revenu net annuel x taux AVS/AI/IPG. Si le resultat est sous le minimum, la cotisation minimale s'applique, puis s'ajoutent les frais administratifs.",
      example: "Exemple: CHF 90'000 de revenu net a 9,8% donnent CHF 8'820 de cotisations; avec 4% de frais administratifs le total monte a CHF 9'172.80.",
      updatedAt: "13 juillet 2026",
      sources: [
        { label: "ahv-iv.ch: Cotisations des independants", href: "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Assicurazione-vecchiaia-e-superstiti-AVS/Ausilio-per-il-calcolo/Calcolo-dei-contributi-degli-indipendenti" },
      ],
    },
  },
  "calcolo-indennita-disoccupazione-svizzera": {
    de: {
      formula: "Taggeld = versicherter Lohn / 21,7 x Entschaedigungssatz. Das monatliche Taggeld brutto = Taggeld x entschaedigungsberechtigte Tage.",
      example: "Beispiel: CHF 6'500 versicherter Lohn mit 70% Satz ergeben ein Taggeld von rund CHF 209.91. Auf 21,7 Tage sind das rund CHF 4'556 brutto im Monat.",
      updatedAt: "13. Juli 2026",
      sources: [
        { label: "SECO: Arbeitslosenversicherung", href: "https://www.seco.admin.ch/seco/de/home/Arbeit/Arbeitslosenversicherung.html" },
      ],
    },
    en: {
      formula: "Daily allowance = insured income / 21.7 x compensation rate. Gross monthly allowance = daily allowance x payable days.",
      example: "Example: CHF 6'500 insured income at a 70% rate gives a daily allowance of about CHF 209.91. Over 21.7 days the month is worth about CHF 4'556 gross.",
      updatedAt: "July 13, 2026",
      sources: [
        { label: "arbeit.swiss: Unemployment insurance benefits", href: "https://www.arbeit.swiss/it/persone-in-cerca-dimpiego/prestazioni-dellassicurazione" },
      ],
    },
    fr: {
      formula: "Indemnite journaliere = gain assure / 21,7 x taux d'indemnite. L'indemnite mensuelle brute = indemnite journaliere x jours indemnisables.",
      example: "Exemple: CHF 6'500 de gain assure a 70% donnent une indemnite journaliere d'environ CHF 209.91. Sur 21,7 jours, le mois vaut environ CHF 4'556 brut.",
      updatedAt: "13 juillet 2026",
      sources: [
        { label: "arbeit.swiss: Prestations de l'assurance chomage", href: "https://www.arbeit.swiss/it/persone-in-cerca-dimpiego/prestazioni-dellassicurazione" },
      ],
    },
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
              guideLinks: localizeGuideLinks(locale, base?.guideLinks),
              resultLabels: undefined,
              ...(localizedCalculatorExtras[baseSlug]?.[locale] ?? {}),
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
