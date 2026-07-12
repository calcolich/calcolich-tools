import type { GermanLongTailArticle } from "./types";

export const ueberstundenSchweizBerechnen = {
  status: "published",
  locale: "de",
  slug: "ueberstunden-schweiz-berechnen",
  title: "Wie werden Überstunden in der Schweiz berechnet?",
  metaTitle: "Überstunden Schweiz berechnen: Formel, Zuschlag und Beispiel | Calcolich",
  metaDescription:
    "Überstunden in der Schweiz verständlich berechnen: Sollzeit, Istzeit, Stundenlohn, Zuschlag, Kompensation und Unterschied zur Überzeit.",
  updatedAt: "12. Juli 2026",
  targetKeywords: [
    "Überstunden Schweiz berechnen",
    "Überstunden auszahlen Schweiz",
    "Überstunden Zuschlag Schweiz",
  ],
  intro: [
    "Überstunden entstehen, wenn die tatsächlich geleistete Arbeitszeit über der vertraglich vereinbarten Sollzeit liegt. Für die Berechnung brauchst du deshalb zuerst eine saubere Zeiterfassung und die Sollzeit aus Vertrag, Reglement oder Einsatzplan.",
    "Wichtig ist die Trennung zwischen vertraglichen Überstunden und gesetzlicher Überzeit. Der Rechner und diese Anleitung liefern eine rechnerische Orientierung; für verbindliche Ansprüche zählen Vertrag, Gesamtarbeitsvertrag und die konkrete Dokumentation.",
  ],
  sections: [
    {
      heading: "Grundformel für Überstunden",
      body: [
        "Die einfachste Formel lautet: Überstunden = Ist-Stunden minus Soll-Stunden. Ist der Wert negativ, besteht kein positiver Überstundensaldo.",
        "Für eine geschätzte Auszahlung wird der positive Saldo mit dem Stundenlohn multipliziert. Falls ein Zuschlag gilt, wird dieser zusätzlich aufgeschlagen.",
      ],
      bullets: [
        "Überstunden = Ist-Stunden - Soll-Stunden",
        "Auszahlung = Überstunden x Stundenlohn x (1 + Zuschlag)",
        "Bei Zeitkompensation steht die Stundenanzahl im Vordergrund, nicht der Geldbetrag",
      ],
    },
    {
      heading: "Überstunden, Überzeit und Kompensation",
      body: [
        "Überstunden beziehen sich auf die vertragliche Arbeitszeit. Überzeit ist ein Begriff aus dem Arbeitsgesetz und betrifft Überschreitungen gesetzlicher Höchstarbeitszeiten.",
        "Ob Überstunden ausbezahlt oder durch Freizeit kompensiert werden, hängt von den anwendbaren Regeln ab. Häufig sind schriftliche Vereinbarungen, betriebliche Reglemente oder Gesamtarbeitsverträge entscheidend.",
      ],
    },
    {
      heading: "Schweizer Beispiel",
      body: [
        "Eine Person arbeitet in einer Woche 46 Stunden, obwohl 42 Stunden vereinbart sind. Der positive Saldo beträgt 4 Stunden.",
        "Bei einem Stundenlohn von CHF 35 und einem Zuschlag von 25 % ergibt die Modellrechnung 4 x CHF 35 x 1.25 = CHF 175. Ohne Zuschlag wären es CHF 140.",
      ],
    },
    {
      heading: "Welche Nachweise wichtig sind",
      body: [
        "Notiere Datum, Beginn, Ende, Pausen, Sollzeit und den Grund der Mehrarbeit. Zusätzlich ist relevant, ob die Mehrarbeit angeordnet, genehmigt oder betrieblich notwendig war.",
        "Eine einzelne Zahl aus einem Rechner ersetzt keine Zeiterfassung. Sie hilft aber, die eigene Dokumentation zu plausibilisieren und ein Gespräch mit Arbeitgeber oder Beratung vorzubereiten.",
      ],
    },
  ],
  faqs: [
    { question: "Sind Überstunden in der Schweiz immer bezahlt?", answer: "Nicht automatisch. Auszahlung, Zuschlag oder Kompensation hängen von Vertrag, Reglement, GAV und konkreter Situation ab." },
    { question: "Was ist der Unterschied zwischen Überstunden und Überzeit?", answer: "Überstunden überschreiten die vertragliche Sollzeit. Überzeit betrifft gesetzliche Höchstarbeitszeiten nach Arbeitsgesetz." },
    { question: "Welcher Zuschlag gilt für Überstunden?", answer: "Oft wird mit 25 % gerechnet, die tatsächliche Regel kann aber vertraglich oder kollektivrechtlich abweichen." },
    { question: "Welche Daten brauche ich für die Berechnung?", answer: "Du brauchst Ist-Stunden, Soll-Stunden, Stundenlohn und die anwendbare Regel für Zuschlag oder Kompensation." },
    { question: "Kann ich Überstunden mit Freizeit kompensieren?", answer: "Ja, wenn die Voraussetzungen und Vereinbarungen passen. Die Details sollten dokumentiert und mit dem Arbeitgeber abgestimmt sein." },
  ],
  internalLinks: [
    { href: "/de/ueberstundenrechner-schweiz", label: "Überstundenrechner Schweiz" },
    { href: "/de/arbeitszeitrechner", label: "Arbeitszeitrechner" },
    { href: "/de/stundenlohn-rechner-schweiz", label: "Stundenlohnrechner" },
  ],
  relatedArticleSlugs: [
    "pausenregelung-arbeitszeit-schweiz",
    "stundenlohn-berechnen-schweiz",
    "ferienanspruch-teilzeit-schweiz",
  ],
  sources: [
    { label: "Fedlex: OR Art. 321c Überstundenarbeit", href: "https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de#art_321_c" },
    { label: "SECO: Arbeits- und Ruhezeiten", href: "https://www.seco.admin.ch/seco/de/home/Arbeit/Arbeitsbedingungen/Arbeitnehmerschutz/Arbeits-und-Ruhezeiten.html" },
    { label: "Fedlex: Arbeitsgesetz", href: "https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/de" },
  ],
} satisfies GermanLongTailArticle;
