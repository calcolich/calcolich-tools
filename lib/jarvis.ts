export type JarvisLeadContext = {
  owner: "jarvis";
  workflow: string;
  priority: "normal" | "high";
  segmentId: string;
  segmentLabel: string;
  nextActions: string[];
  followUpSequence: string[];
  partnerSlots: string[];
};

const thirdPillarSlug = "calcolo-terzo-pilastro-risparmio-fiscale";
const thirdPillarLocalizedSlugs = new Set([
  thirdPillarSlug,
  "calcolatore-terzo-pilastro-risparmio-fiscale",
  "pillar-3a-tax-savings-calculator",
  "saeule-3a-steuerersparnis-rechner",
  "calculateur-troisieme-pilier-economie-impot",
]);

const taxSalarySlug = "calcolo-imposta-alla-fonte-svizzera";
const taxSalaryLocalizedSlugs = new Set([
  taxSalarySlug,
  "calcolatore-imposta-alla-fonte-svizzera",
  "withholding-tax-calculator-switzerland",
  "quellensteuer-rechner-schweiz",
  "calculateur-impot-a-la-source-suisse",
]);

const mortgageSlug = "calcolo-sostenibilita-ipoteca-svizzera";
const mortgageLocalizedSlugs = new Set([
  mortgageSlug,
  "calcolatore-sostenibilita-ipoteca-svizzera",
  "mortgage-affordability-calculator-switzerland",
  "hypotheken-tragbarkeit-rechner-schweiz",
  "calculateur-viabilite-hypotheque-suisse",
]);

export function getJarvisLeadContext(
  source?: string,
  segment?: string,
  interest?: string,
  leadMagnet?: string,
): JarvisLeadContext | undefined {
  const slug = source?.includes(":") ? source.split(":").at(-1) : source;

  if (slug && taxSalaryLocalizedSlugs.has(slug)) {
    return {
      owner: "jarvis",
      workflow: `calculator-funnel:${taxSalarySlug}`,
      priority: "high",
      segmentId: "tax_salary_ch",
      segmentLabel: "Salario & imposta alla fonte",
      nextActions: [
        "salva lead nel CRM/newsletter con segmento e consenso",
        "invia checklist imposta alla fonte promessa",
        "classifica lingua e caso: offerta lavoro, busta paga, trasferimento o frontalieri",
        "misura ritorno su calcolatori lordo-netto, salario netto e budget",
      ],
      followUpSequence: [
        "Email 0: checklist dati da preparare per imposta alla fonte e avviso che il risultato e una stima.",
        "Email 3 giorni: guida su cantone, tariffa, stato civile, figli e busta paga.",
        "Email 10 giorni: invito a confrontare netto, budget e riduzione premi se pertinenti.",
      ],
      partnerSlots: [],
    };
  }

  if (slug && mortgageLocalizedSlugs.has(slug)) {
    return {
      owner: "jarvis",
      workflow: `calculator-funnel:${mortgageSlug}`,
      priority: "high",
      segmentId: "mortgage_ch",
      segmentLabel: "Ipoteca & casa",
      nextActions: [
        "salva lead nel CRM/newsletter con segmento e consenso",
        "invia checklist sostenibilita ipoteca promessa",
        "classifica stato: esplorazione, colloquio banca, offerta immobile o confronto affitto",
        "attribuisci eventuali click partner solo quando i link saranno configurati",
      ],
      followUpSequence: [
        "Email 0: checklist sostenibilita, capitale proprio e budget.",
        "Email 4 giorni: spiegazione su tasso teorico, costi accessori e soglia del reddito.",
        "Email 14 giorni: invito a ricalcolare con budget, affitto e reddito netto.",
      ],
      partnerSlots: ["mortgage"],
    };
  }

  if (slug && thirdPillarLocalizedSlugs.has(slug)) {
    return {
      owner: "jarvis",
      workflow: `calculator-funnel:${thirdPillarSlug}`,
      priority: "high",
      segmentId: "pension_tax_ch",
      segmentLabel: "Pensione & tasse",
      nextActions: [
        "salva lead nel CRM/newsletter con segmento e consenso",
        "invia riepilogo calcolo e checklist promessa",
        "avvia follow-up newsletter nella sequenza configurata",
        "attribuisci eventuali click partner al lead quando i link affiliate saranno configurati",
      ],
      followUpSequence: [
        "Email 0: riepilogo calcolo, checklist 3a e avviso che il risultato e una stima.",
        "Email 2 giorni: guida sui fattori che cambiano il risparmio fiscale: reddito, cantone, aliquota marginale e limite annuo.",
        "Email 7 giorni: confronto neutrale tra conti 3a, soluzioni investimento 3a e costi da controllare.",
        "Email 21 giorni: reminder pianificazione fiscale e invito a ricalcolare prima di versare.",
      ],
      partnerSlots: ["frankly", "yuh"],
    };
  }

  if (!source && !segment && !interest && !leadMagnet) {
    return undefined;
  }

  return {
    owner: "jarvis",
    workflow: `lead-capture:${source ?? "site"}`,
    priority: source?.startsWith("audit-sito-gratuito-ticino") || source?.startsWith("services-ai-seo") ? "high" : "normal",
    segmentId: segment ?? "general_ch",
    segmentLabel: interest ?? "Calcolich",
    nextActions: [
      "salva lead nel CRM/newsletter con consenso",
      "classifica interesse e sorgente prima del prossimo invio",
      "manda contenuti utili collegati al lead magnet richiesto",
      "misura conversione lead e ritorno visita",
    ],
    followUpSequence: [
      `Email 0: invia ${leadMagnet ?? "aggiornamento Calcolich"} e conferma iscrizione.`,
      "Email 5 giorni: manda una guida pratica collegata all'interesse dichiarato.",
      "Email 14 giorni: invita a usare un calcolatore collegato e misura il ritorno.",
    ],
    partnerSlots: [],
  };
}
