import type { GermanLongTailArticle } from "./types";

export const stundenlohnBerechnenSchweiz = {
  status: "published",
  locale: "de",
  slug: "stundenlohn-berechnen-schweiz",
  title: "Stundenlohn berechnen: Formeln und Beispiele für die Schweiz",
  metaTitle: "Stundenlohn berechnen Schweiz: Formeln und Beispiele | Calcolich",
  metaDescription: "Monatslohn in Stundenlohn umrechnen: Formeln mit 12 oder 13 Monatslöhnen, Jahresstunden und Ferienzuschlag für die Schweiz.",
  targetKeywords: ["stundenlohn berechnen schweiz", "monatslohn in stundenlohn"],
  intro: [
    "Ein Monatslohn lässt sich nur dann sinnvoll mit einem Stundenlohn vergleichen, wenn Jahreslohn und Jahresarbeitszeit auf derselben Basis berechnet werden. Besonders wichtig sind die Anzahl Monatslöhne, die vertragliche Wochenarbeitszeit und die Frage, ob Ferien im Monatslohn bereits bezahlt sind oder bei unregelmässiger Stundenarbeit separat ausgewiesen werden.",
    "Diese Anleitung zeigt die wichtigsten Formeln für die Schweiz und rechnet drei typische Fälle durch. Der Lohnrechner Schweiz hilft anschliessend bei der Nettolohnschätzung; für Arbeitsstunden und Monatsdurchschnitt steht der Arbeitszeitrechner bereit.",
  ],
  sections: [
    {
      heading: "Die Grundformel für den Stundenlohn",
      body: [
        "Der rechnerische Bruttostundenlohn entsteht aus Jahreslohn geteilt durch Jahresarbeitsstunden. Bei zwölf gleichen Monatszahlungen lautet die Formel: Monatslohn × 12 ÷ (Wochenstunden × 52). Bei einem vertraglich geschuldeten 13. Monatslohn wird der Monatslohn stattdessen mit 13 multipliziert.",
        "Die Rechnung verwendet 52 Wochen als Jahresdurchschnitt. Sie dient dem Vergleich von Lohnmodellen und ist nicht identisch mit der produktiven Arbeitszeit eines bestimmten Jahres. Feiertage, bezahlte Ferien, Krankheit oder andere Abwesenheiten reduzieren die tatsächlich geleisteten Stunden, ohne dass der Monatslohn im selben Verhältnis sinkt.",
      ],
    },
    {
      heading: "Mit oder ohne 13. Monatslohn rechnen",
      body: [
        "Ein Angebot von CHF 6'500 pro Monat kann CHF 78'000 oder CHF 84'500 Jahreslohn bedeuten. Entscheidend ist, ob zwölf oder dreizehn Zahlungen garantiert sind. Ein freiwilliger Bonus darf nicht automatisch wie ein fester 13. Monatslohn behandelt werden. Für Vergleiche sollten garantierter Lohn, variable Vergütung und Spesen getrennt notiert werden.",
        "Wird der 13. Monatslohn anteilig monatlich ausbezahlt, bleibt der Jahreswert gleich. Die Zahlungsweise verändert den Cashflow, nicht den rechnerischen Stundenlohn. Bei Eintritt oder Austritt während des Jahres ist zu prüfen, wie der Anspruch laut Vertrag anteilig entsteht.",
      ],
    },
    {
      heading: "Ferienentschädigung bei Stundenlohn",
      body: [
        "Bei einem normalen Monatslohn wird der Lohn während der Ferien weiterbezahlt; ein zusätzlicher Ferienzuschlag ist deshalb nicht nötig. Bei unregelmässigen Teilzeitpensen lässt die Gerichtspraxis unter bestimmten Voraussetzungen eine separate Ferienentschädigung zu. Sie muss im Vertrag und auf jeder Lohnabrechnung klar als Prozent oder Betrag ausgewiesen sein. Der Hinweis Ferien im Stundenlohn inbegriffen genügt nicht.",
        "Gängige rechnerische Zuschläge sind 8,33 % bei vier Ferienwochen, 10,64 % bei fünf Wochen und 13,04 % bei sechs Wochen. Die Prozente entstehen aus dem Verhältnis von Ferienwochen zu den verbleibenden Arbeitswochen: vier Ferienwochen entsprechen beispielsweise 4 ÷ 48 = 8,33 %. Ein Gesamtarbeitsvertrag kann besondere Regeln enthalten.",
      ],
      bullets: [
        "4 Ferienwochen: 8,33 % Zuschlag",
        "5 Ferienwochen: 10,64 % Zuschlag",
        "6 Ferienwochen: 13,04 % Zuschlag",
      ],
    },
    {
      heading: "Beispiel 1: Monatslohn ohne 13. Monatslohn",
      body: [
        "Eine Vollzeitstelle bezahlt CHF 7'000 pro Monat bei 42 Wochenstunden und zwölf Monatslöhnen. Der Jahreslohn beträgt CHF 84'000. Die rechnerischen Jahresstunden sind 42 × 52 = 2'184. Daraus folgt CHF 84'000 ÷ 2'184 = rund CHF 38.46 pro Stunde.",
        "Dieser Wert eignet sich zum Vergleich mit einem Stundenlohnangebot. Er enthält aber noch keine separate Betrachtung von Arbeitgeberleistungen, Pensionskasse, Bonus, Spesen oder unterschiedlichen Ferienansprüchen.",
      ],
    },
    {
      heading: "Beispiel 2: Derselbe Monatslohn mit 13. Monatslohn",
      body: [
        "Bei CHF 7'000 und dreizehn Zahlungen beträgt der garantierte Jahreslohn CHF 91'000. Geteilt durch 2'184 Jahresstunden ergibt das rund CHF 41.67 pro Stunde. Der 13. Monatslohn erhöht den rechnerischen Wert damit um etwa CHF 3.21 pro Stunde gegenüber dem Modell mit zwölf Zahlungen.",
        "Für einen fairen Stellenvergleich muss deshalb immer der garantierte Jahreslohn verwendet werden. Nur die Monatszahl auf dem Inserat zu vergleichen kann zu einer falschen Schlussfolgerung führen.",
      ],
    },
    {
      heading: "Beispiel 3: Stundenbasis plus Ferienzuschlag",
      body: [
        "Angenommen, ein zulässiger und separat ausgewiesener Basisstundenlohn beträgt CHF 35.00 und der Anspruch umfasst fünf Ferienwochen. Der Ferienzuschlag beträgt CHF 35.00 × 10,64 % = CHF 3.72. Zusammen ergeben sich CHF 38.72 vor weiteren separat geschuldeten Zuschlägen.",
        "Die Rechnung bedeutet nicht, dass Ferien durchgehend ausbezahlt statt bezogen werden dürfen. Der gesetzliche Erholungszweck bleibt bestehen. Bei regelmässigen Pensen kann eine pauschale Auszahlung rechtlich problematisch sein; im Zweifel sollte die konkrete Vertragsgestaltung geprüft werden.",
      ],
    },
    {
      heading: "Was beim Vergleich zusätzlich zählt",
      body: [
        "Neben dem Bruttostundenwert beeinflussen Pensionskassenlösung, Unfallversicherung, bezahlte Feiertage, Lohnfortzahlung, Überstundenzuschläge und Planbarkeit die Qualität eines Angebots. Ein nominell höherer Stundenlohn kann weniger attraktiv sein, wenn unproduktive Zeiten, Ausfälle oder Versicherungen vollständig selbst getragen werden müssen.",
        "Berechne zuerst Arbeitszeit und garantierten Jahreslohn. Schätze danach mit dem Brutto-Netto-Rechner die Auswirkung der Abzüge. Für eine Entscheidung sollten alle Annahmen schriftlich festgehalten und mit Vertrag oder Lohnabrechnung abgeglichen werden.",
      ],
    },
  ],
  faqs: [
    { question: "Wie rechne ich Monatslohn in Stundenlohn um?", answer: "Multipliziere den Monatslohn mit der Zahl garantierter Monatszahlungen und teile durch Wochenstunden mal 52." },
    { question: "Zählt ein Bonus als 13. Monatslohn?", answer: "Nur wenn er vertraglich garantiert und entsprechend ausgestaltet ist. Ein freiwilliger oder leistungsabhängiger Bonus sollte separat verglichen werden." },
    { question: "Ist der Ferienzuschlag immer zusätzlich geschuldet?", answer: "Bei Monatslohn normalerweise nicht. Bei unregelmässigem Stundenlohn kann ein klar ausgewiesener Zuschlag unter bestimmten Voraussetzungen zulässig sein." },
    { question: "Soll ich mit Brutto oder Netto rechnen?", answer: "Für den Vergleich der Vertragslöhne wird zuerst brutto gerechnet. Die persönlichen Abzüge können danach separat geschätzt werden." },
  ],
  internalLinks: [
    { href: "/de/lohnrechner-schweiz", label: "Lohnrechner Schweiz" },
    { href: "/de/brutto-netto-rechner-schweiz", label: "Brutto-Netto-Rechner Schweiz" },
    { href: "/de/arbeitszeitrechner", label: "Arbeitszeitrechner" },
  ],
  relatedArticleSlugs: ["pausenregelung-arbeitszeit-schweiz", "ferienanspruch-teilzeit-schweiz"],
  sources: [
    { label: "SECO: FAQ zu Ferien", href: "https://www.seco.admin.ch/de/faq-ferien" },
    { label: "SECO: Arbeitszeitregelung", href: "https://www.seco.admin.ch/de/entsendung-arbeitszeitregelung" },
  ],
} satisfies GermanLongTailArticle;
