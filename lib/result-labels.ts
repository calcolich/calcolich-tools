import type { CalculatorKind } from "@/lib/calculators";
import type { Locale } from "@/lib/i18n";

// Localized result labels per calculator kind. Used as fallback when a
// calculator does not define its own `resultLabels`, so DE/EN/FR pages never
// show untranslated labels from the shared widget.
const resultLabelSets: Record<CalculatorKind, Record<Locale, string[]>> = {
  "work-hours": {
    de: ["Netto-Minuten", "Dezimalstunden", "Arbeitszeit"],
    it: ["Minuti netti", "Ore decimali", "Totale lavorato"],
    en: ["Net minutes", "Decimal hours", "Total worked"],
    fr: ["Minutes nettes", "Heures decimales", "Total travaille"],
  },
  "working-time": {
    de: ["Pro Tag", "Pro Woche", "Pro Monat"],
    it: ["Al giorno", "Alla settimana", "Al mese"],
    en: ["Per day", "Per week", "Per month"],
    fr: ["Par jour", "Par semaine", "Par mois"],
  },
  "overtime-ch": {
    de: ["Überstunden", "Zuschlag", "Auszahlung geschätzt"],
    it: ["Straordinari", "Maggiorazione", "Compenso stimato"],
    en: ["Overtime hours", "Supplement", "Estimated payout"],
    fr: ["Heures supplementaires", "Majoration", "Paiement estime"],
  },
  "working-days-ch": {
    de: ["Kalendertage", "Abzüge", "Arbeitstage"],
    it: ["Giorni calendario", "Esclusioni", "Giorni lavorati"],
    en: ["Calendar days", "Exclusions", "Working days"],
    fr: ["Jours calendaires", "Exclusions", "Jours ouvres"],
  },
  "work-percentage-ch": {
    de: ["Wochenstunden", "Durchschnitt pro Tag", "Beschäftigungsgrad"],
    it: ["Ore settimanali", "Media per giorno", "Grado d'occupazione"],
    en: ["Weekly hours", "Average per day", "Employment level"],
    fr: ["Heures hebdomadaires", "Moyenne par jour", "Taux d'activite"],
  },
  "salary-net-ch": {
    de: ["Sozialabgaben", "Abzüge", "Netto geschätzt"],
    it: ["Deduzioni", "Trattenute", "Netto stimato"],
    en: ["Deduction rate", "Deductions", "Estimated net"],
    fr: ["Cotisations", "Retenues", "Net estime"],
  },
  "gross-net-ch": {
    de: ["Geschätzte Abzüge", "Brutto", "Netto"],
    it: ["Deduzioni stimate", "Lordo", "Netto"],
    en: ["Estimated deductions", "Gross", "Net"],
    fr: ["Retenues estimees", "Brut", "Net"],
  },
  "vacation-ch": {
    de: ["Ferien pro Jahr", "Monate berücksichtigt", "Erworbene Ferien"],
    it: ["Ferie annue", "Mesi conteggiati", "Ferie maturate"],
    en: ["Annual vacation days", "Months counted", "Accrued vacation"],
    fr: ["Vacances annuelles", "Mois comptes", "Vacances acquises"],
  },
  "vat-ch": {
    de: ["Nettobasis", "MWST", "Total"],
    it: ["Imponibile", "IVA", "Totale"],
    en: ["Net amount", "VAT", "Total"],
    fr: ["Montant net", "TVA", "Total"],
  },
  "compound-interest": {
    de: ["Eingezahlt total", "Geschätzter Zuwachs", "Endkapital"],
    it: ["Totale versato", "Crescita stimata", "Capitale finale"],
    en: ["Total contributed", "Estimated growth", "Final balance"],
    fr: ["Total verse", "Croissance estimee", "Capital final"],
  },
  "mortgage-ch": {
    de: ["Monatsrate", "Total bezahlt", "Totalzinsen"],
    it: ["Rata mensile", "Totale pagato", "Interessi totali"],
    en: ["Monthly payment", "Total paid", "Total interest"],
    fr: ["Mensualite", "Total paye", "Interets totaux"],
  },
  "mortgage-affordability-ch": {
    de: ["Geschätzte Hypothek", "Theoretische Jahreskosten", "Tragbarkeit"],
    it: ["Ipoteca stimata", "Costi teorici annui", "Sostenibilita"],
    en: ["Estimated mortgage", "Estimated annual costs", "Affordability"],
    fr: ["Hypothèque estimee", "Couts annuels theoriques", "Viabilite"],
  },
  "trading-risk": {
    de: ["Maximales Risiko", "Stop", "Geschätzte Lot-Grösse"],
    it: ["Rischio massimo", "Stop", "Lot size stimata"],
    en: ["Max risk", "Stop loss", "Estimated lot size"],
    fr: ["Risque maximum", "Stop", "Taille de lot estimee"],
  },
  "forex-lot-size": {
    de: ["Maximales Risiko", "Stop", "Geschätzte Lot-Grösse"],
    it: ["Rischio massimo", "Stop", "Lot size stimata"],
    en: ["Max risk", "Stop loss", "Estimated lot size"],
    fr: ["Risque maximum", "Stop", "Taille de lot estimee"],
  },
  drawdown: {
    de: ["Verlust", "Drawdown", "Nötige Erholung"],
    it: ["Perdita", "Drawdown", "Recupero necessario"],
    en: ["Loss", "Drawdown", "Required recovery"],
    fr: ["Perte", "Drawdown", "Recuperation necessaire"],
  },
  percentage: {
    de: ["Basis", "Prozent", "Ergebnis"],
    it: ["Base", "Percentuale", "Risultato"],
    en: ["Base", "Percentage", "Result"],
    fr: ["Base", "Pourcentage", "Resultat"],
  },
  discount: {
    de: ["Rabatt", "Prozent", "Endpreis"],
    it: ["Sconto", "Percentuale", "Prezzo finale"],
    en: ["Discount", "Percentage", "Final price"],
    fr: ["Remise", "Pourcentage", "Prix final"],
  },
  "percentage-change": {
    de: ["Veränderung", "Startwert", "Prozentuale Veränderung"],
    it: ["Variazione", "Valore iniziale", "Cambio percentuale"],
    en: ["Change", "Initial value", "Percentage change"],
    fr: ["Variation", "Valeur initiale", "Changement en pourcentage"],
  },
  "margin-markup": {
    de: ["Gewinn", "Aufschlag", "Marge"],
    it: ["Profitto", "Markup", "Margine"],
    en: ["Profit", "Markup", "Margin"],
    fr: ["Benefice", "Markup", "Marge"],
  },
  roi: {
    de: ["Nettogewinn", "Investition", "ROI"],
    it: ["Profitto netto", "Investimento", "ROI"],
    en: ["Net profit", "Investment", "ROI"],
    fr: ["Benefice net", "Investissement", "ROI"],
  },
  "break-even": {
    de: ["Stückmarge", "Fixkosten", "Break-even"],
    it: ["Margine unitario", "Costi fissi", "Punto pareggio"],
    en: ["Unit margin", "Fixed costs", "Break-even point"],
    fr: ["Marge unitaire", "Couts fixes", "Point mort"],
  },
  "loan-payment": {
    de: ["Monatsrate", "Total bezahlt", "Zinsen"],
    it: ["Rata mensile", "Totale pagato", "Interessi"],
    en: ["Monthly payment", "Total paid", "Interest"],
    fr: ["Mensualite", "Total paye", "Interets"],
  },
  "profit-loss": {
    de: ["Positionsvolumen", "Rendite", "Gewinn/Verlust"],
    it: ["Esposizione", "Rendimento", "Profitto/perdita"],
    en: ["Exposure", "Return", "Profit/loss"],
    fr: ["Exposition", "Rendement", "Profit/perte"],
  },
  "risk-reward": {
    de: ["Risiko pro Einheit", "Potenzieller Gewinn", "Risk-Reward"],
    it: ["Rischio per unita", "Profitto potenziale", "Risk reward"],
    en: ["Risk per unit", "Potential reward", "Risk reward"],
    fr: ["Risque par unite", "Gain potentiel", "Risk reward"],
  },
  "savings-goal": {
    de: ["Fehlbetrag", "Monatliches Sparen", "Geschätzte Dauer"],
    it: ["Manca", "Risparmio mensile", "Tempo stimato"],
    en: ["Remaining", "Monthly savings", "Estimated time"],
    fr: ["Manquant", "Epargne mensuelle", "Duree estimee"],
  },
  "hourly-cost": {
    de: ["Monatskosten", "Stunden pro Monat", "Stundensatz"],
    it: ["Costo mensile", "Ore mensili", "Costo orario"],
    en: ["Monthly cost", "Hours per month", "Hourly cost"],
    fr: ["Cout mensuel", "Heures par mois", "Cout horaire"],
  },
  "annual-monthly": {
    de: ["Jahresbetrag", "Monate", "Monatsbetrag"],
    it: ["Importo annuale", "Mensilita", "Importo mensile"],
    en: ["Annual amount", "Months", "Monthly amount"],
    fr: ["Montant annuel", "Mois", "Montant mensuel"],
  },
  "withholding-tax-ch": {
    de: ["Sozialabgaben", "Quellensteuer", "Netto geschätzt"],
    it: ["Contributi sociali", "Imposta alla fonte", "Netto stimato"],
    en: ["Social deductions", "Withholding tax", "Estimated net"],
    fr: ["Cotisations sociales", "Impot a la source", "Net estime"],
  },
  "health-insurance-ch": {
    de: ["Jahresprämien", "Geschätzte Krankheitskosten", "Geschätzte Jahreskosten"],
    it: ["Premi annui", "Costi sanitari stimati", "Costo annuo stimato"],
    en: ["Annual premiums", "Estimated medical costs", "Estimated annual cost"],
    fr: ["Primes annuelles", "Frais medicaux estimes", "Cout annuel estime"],
  },
  "premium-subsidy-ch": {
    de: ["Jahresprämien", "Tragbarer Anteil", "Geschätzte Verbilligung"],
    it: ["Premi annui", "Quota sostenibile", "Riduzione stimata"],
    en: ["Annual premiums", "Affordable share", "Estimated subsidy"],
    fr: ["Primes annuelles", "Part supportable", "Reduction estimee"],
  },
  "rent-affordability-ch": {
    de: ["Wohnbudget total", "Zusatzkosten", "Tragbare Miete"],
    it: ["Budget casa totale", "Spese extra", "Affitto sostenibile"],
    en: ["Total housing budget", "Extra costs", "Affordable rent"],
    fr: ["Budget logement total", "Frais supplementaires", "Loyer abordable"],
  },
  "hourly-wage-ch": {
    de: ["Jahreslohn", "Jahresarbeitsstunden", "Stundenlohn"],
    it: ["Salario annuo", "Ore annue", "Salario orario"],
    en: ["Annual salary", "Annual hours", "Hourly wage"],
    fr: ["Salaire annuel", "Heures par an", "Salaire horaire"],
  },
  "part-time-salary-ch": {
    de: ["Pensum-Bruttolohn", "Geschätzte Abzüge", "Netto geschätzt"],
    it: ["Lordo part-time", "Deduzioni stimate", "Netto stimato"],
    en: ["Part-time gross", "Estimated deductions", "Estimated net"],
    fr: ["Brut temps partiel", "Retenues estimees", "Net estime"],
  },
  "pillar3a-tax-ch": {
    de: ["Steuerminderung pro Jahr", "Einlagen total", "Steuerminderung total"],
    it: ["Risparmio fiscale annuo", "Versamenti totali", "Risparmio fiscale totale"],
    en: ["Annual tax savings", "Total contributions", "Total tax savings"],
    fr: ["Economie d'impot annuelle", "Versements totaux", "Economie d'impot totale"],
  },
  "monthly-budget-ch": {
    de: ["Ausgaben total", "Sparquote", "Monatssaldo"],
    it: ["Spese totali", "Tasso risparmio", "Saldo mensile"],
    en: ["Total expenses", "Savings rate", "Monthly balance"],
    fr: ["Depenses totales", "Taux d'epargne", "Solde mensuel"],
  },
  "car-cost-ch": {
    de: ["Kosten pro Monat", "Jahreskosten", "Kosten pro Tag"],
    it: ["Costo mensile", "Costo annuo", "Costo medio giorno"],
    en: ["Monthly cost", "Annual cost", "Average daily cost"],
    fr: ["Cout mensuel", "Cout annuel", "Cout moyen par jour"],
  },
  "freelance-rate-ch": {
    de: ["Nötiger Umsatz", "Tagessatz", "Stundensatz"],
    it: ["Ricavi necessari", "Tariffa giornaliera", "Tariffa oraria"],
    en: ["Required revenue", "Daily rate", "Hourly rate"],
    fr: ["Chiffre d'affaires requis", "Tarif journalier", "Tarif horaire"],
  },
  "selling-price": {
    de: ["Nettopreis", "MWST", "Verkaufspreis"],
    it: ["Prezzo netto", "IVA", "Prezzo finale"],
    en: ["Net price", "VAT", "Final price"],
    fr: ["Prix net", "TVA", "Prix final"],
  },
  "ahv-13th-pension-ch": {
    de: ["Jahresrente berücksichtigt", "Monate angerechnet", "Geschätzte 13. AHV-Rente"],
    it: ["Rendita annua conteggiata", "Mesi considerati", "Tredicesima AVS stimata"],
    en: ["Counted annual pension", "Months counted", "Estimated 13th AHV pension"],
    fr: ["Rente annuelle comptee", "Mois comptes", "13e rente AVS estimee"],
  },
  "self-employed-ahv-ch": {
    de: ["AHV/IV/IPG geschätzt", "Verwaltungskosten", "Geschätzter Jahresbetrag"],
    it: ["AVS/AI/IPG stimati", "Spese amministrative", "Totale annuo stimato"],
    en: ["Estimated AHV/IV/IPG", "Admin costs", "Estimated annual total"],
    fr: ["AVS/AI/IPG estimes", "Frais administratifs", "Total annuel estime"],
  },
  "family-allowances-ch": {
    de: ["Monatsbetrag", "Anspruchsberechtigte Monate", "Jahresbetrag"],
    it: ["Importo mensile", "Mesi di diritto", "Importo annuo"],
    en: ["Monthly amount", "Entitled months", "Annual amount"],
    fr: ["Montant mensuel", "Mois de droit", "Montant annuel"],
  },
  "maternity-allowance-ch": {
    de: ["Tagesgeld", "Angerechnete Tage", "Geschätzter Totalbetrag"],
    it: ["Indennita giornaliera", "Giorni conteggiati", "Indennita totale stimata"],
    en: ["Daily allowance", "Days counted", "Estimated total allowance"],
    fr: ["Indemnite journaliere", "Jours comptes", "Indemnite totale estimee"],
  },
  "unemployment-benefit-ch": {
    de: ["Versicherter Lohn", "Tagesgeld", "Monatliches Taggeld brutto"],
    it: ["Guadagno assicurato", "Indennita giornaliera", "Indennita mensile lorda"],
    en: ["Insured income", "Daily allowance", "Gross monthly allowance"],
    fr: ["Gain assure", "Indemnite journaliere", "Indemnite mensuelle brute"],
  },
  "ahv-pension-gap-ch": {
    de: ["Fehlende Jahre", "Indikative Kürzung", "Geschätzte Monatsrente"],
    it: ["Anni mancanti", "Riduzione indicativa", "Rendita mensile stimata"],
    en: ["Missing years", "Indicative reduction", "Estimated monthly pension"],
    fr: ["Annees manquantes", "Reduction indicative", "Rente mensuelle estimee"],
  },
};

export function getResultLabels(kind: CalculatorKind, locale: Locale): string[] {
  return resultLabelSets[kind]?.[locale] ?? resultLabelSets[kind].it;
}
