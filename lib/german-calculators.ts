import {
  type CentralizedCalculator,
  type LocalizedCalculatorCategory,
  toCalculator,
} from "@/lib/calculator-model";

export const germanCalculatorCategories: LocalizedCalculatorCategory[] = [
  { id: "de-work-salary", locale: "de", slug: "arbeit-lohn", title: "Arbeit & Lohn", description: "Arbeitszeit, Stunden und Schweizer Lohn verständlich berechnen." },
  { id: "de-tax-vat", locale: "de", slug: "steuern-mehrwertsteuer", title: "Steuern & Mehrwertsteuer", description: "Steuer- und MWST-Beträge schnell nachvollziehen." },
  { id: "de-finance", locale: "de", slug: "finanzen", title: "Finanzen", description: "Kapital, Rendite und persönliche Finanzziele planen." },
  { id: "de-credit-interest", locale: "de", slug: "kredit-zinsen", title: "Kredit & Zinsen", description: "Raten, Zinskosten und Laufzeiten vergleichen." },
  { id: "de-household-budget", locale: "de", slug: "haushalt-budget", title: "Haushalt & Budget", description: "Einnahmen und laufende Ausgaben übersichtlich planen." },
  { id: "de-car-mobility", locale: "de", slug: "auto-mobilitaet", title: "Auto & Mobilität", description: "Kosten rund um Auto und Mobilität einschätzen." },
  { id: "de-health", locale: "de", slug: "gesundheit", title: "Gesundheit", description: "Gesundheits- und Versicherungskosten vergleichen." },
  { id: "de-time-date", locale: "de", slug: "zeit-datum", title: "Zeit & Datum", description: "Arbeitsstunden, Ferien und Zeiträume berechnen." },
];

const swissWorkSources = [
  { label: "SECO: Arbeit und Gesundheit - Arbeits- und Ruhezeiten", href: "https://www.seco.admin.ch/seco/de/home/Arbeit/Arbeitsbedingungen/Arbeitnehmerschutz/Arbeits-und-Ruhezeiten.html" },
  { label: "Fedlex: Arbeitsgesetz, Art. 15 Pausen", href: "https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/de#art_15" },
  { label: "Fedlex: Obligationenrecht, Art. 321c Überstundenarbeit", href: "https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de#art_321_c" },
];

const swissVacationSources = [
  { label: "Fedlex: Obligationenrecht, Art. 329a Ferien", href: "https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de#art_329_a" },
  { label: "SECO: Ferien und Feiertage", href: "https://www.seco.admin.ch/seco/de/home/Arbeit/Personenfreizugigkeit_Arbeitsbeziehungen/Arbeitsrecht/FAQ_zum_privaten_Arbeitsrecht/ferien_und_feiertage.html" },
];

const swissTaxSources = [
  { label: "ESTV: Quellensteuer", href: "https://www.estv.admin.ch/estv/de/home/direkte-bundessteuer/quellensteuer.html" },
  { label: "ch.ch: Steuern bezahlen", href: "https://www.ch.ch/de/steuern-und-finanzen/steuern-bezahlen/" },
];

const swissPensionSources = [
  { label: "Bundesamt fuer Sozialversicherungen: Saeule 3a", href: "https://www.bsv.admin.ch/bsv/de/home/sozialversicherungen/bv/grundlagen-und-gesetze/saeule-3a.html" },
  { label: "ESTV: Direkte Bundessteuer", href: "https://www.estv.admin.ch/estv/de/home/direkte-bundessteuer.html" },
];

const swissMortgageSources = [
  { label: "FINMA: Hypotheken", href: "https://www.finma.ch/de/dokumentation/dossier/dossier-hypotheken/" },
  { label: "ch.ch: Wohneigentum finanzieren", href: "https://www.ch.ch/de/wohnen/wohneigentum/" },
];

const swissHealthSubsidySources = [
  { label: "BAG: Prämienverbilligung", href: "https://www.bag.admin.ch/bag/de/home/versicherungen/krankenversicherung/krankenversicherung-versicherte-mit-wohnsitz-in-der-schweiz/praemienverbilligung.html" },
];

const swissFamilySources = [
  { label: "BSV: Familienzulagen", href: "https://www.bsv.admin.ch/de/familienzulagen-gesetze-und-verordnungen" },
];

const swissAhvSources = [
  { label: "ahv-iv.ch: Beiträge der Selbstständigen", href: "https://www.ahv-iv.ch/it/Assicurazioni-sociali/Assicurazione-vecchiaia-e-superstiti-AVS/Ausilio-per-il-calcolo/Calcolo-dei-contributi-degli-indipendenti" },
];

const swissUnemploymentSources = [
  { label: "arbeit.swiss: Leistungen der Arbeitslosenversicherung", href: "https://www.arbeit.swiss/it/persone-in-cerca-dimpiego/prestazioni-dellassicurazione" },
  { label: "SECO: Arbeitslosenversicherung", href: "https://www.seco.admin.ch/seco/de/home/Arbeit/Arbeitslosenversicherung.html" },
];

export const germanPriorityCalculatorData: CentralizedCalculator[] = [
  {
    id: "de-hours",
    locale: "de",
    slug: "stundenrechner",
    kind: "work-hours",
    category: "Zeit & Datum",
    title: "Stundenrechner: Arbeitsstunden und Pausen berechnen | Calcolich",
    metaDescription: "Arbeitsstunden kostenlos berechnen: Start, Ende und Pause eingeben und Nettozeit sofort als Stunden und Minuten erhalten.",
    h1: "Stundenrechner",
    shortTitle: "Stundenrechner",
    intro: "Berechne die Zeit zwischen Arbeitsbeginn und Feierabend. Pausen werden automatisch von der Anwesenheitszeit abgezogen.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Stundenrechner eignet sich für Angestellte, Schichtarbeitende, Lernende und Selbstständige, die eine einzelne Arbeitsschicht kontrollieren möchten. Er trennt die gesamte Anwesenheitszeit von der effektiven Arbeitszeit und verhindert typische Fehler beim Umrechnen von Minuten in Dezimalstunden.",
          "Besonders praktisch ist er für Stundenzettel, Einsatzrapporte, Projektabrechnungen oder den Vergleich mit einer Lohnabrechnung. Auch Schichten über Mitternacht lassen sich berechnen, weil eine frühere Endzeit automatisch dem folgenden Kalendertag zugeordnet wird.",
        ],
        bullets: [
          "Arbeitsbeginn, Arbeitsende und unbezahlte Pausen kontrollieren",
          "Nettozeit als Stunden und Minuten sowie als Dezimalwert erhalten",
          "Nacht- oder Spätschichten ohne manuelle Tageswechsel berechnen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Die Anwesenheitszeit ist die Zeitspanne zwischen Beginn und Ende. Davon wird die eingegebene Pause abgezogen; erst das Ergebnis ist die Nettoarbeitszeit. Eine Pause zählt nur dann als Arbeitszeit, wenn die beschäftigte Person den Arbeitsplatz nicht verlassen darf. Vertrag, Personalreglement oder Gesamtarbeitsvertrag können zusätzliche Regeln enthalten.",
          "Nach Artikel 15 des Schweizer Arbeitsgesetzes gelten Mindestpausen: 15 Minuten bei mehr als 5,5 Stunden täglicher Arbeitszeit, 30 Minuten bei mehr als 7 Stunden und 60 Minuten bei mehr als 9 Stunden. Die Pause soll ungefähr in der Mitte der Arbeitszeit liegen. Der Rechner prüft die Dauer mathematisch, ersetzt aber keine arbeitsrechtliche Beurteilung.",
        ],
      },
    ],
    formula: "Die Nettoarbeitszeit ergibt sich aus Endzeit minus Startzeit minus Pause. Endet eine Schicht nach Mitternacht, wird der Tageswechsel automatisch berücksichtigt.",
    example: "Beispiel: Ein Turnus von 08:00 bis 17:00 umfasst 9 Stunden Anwesenheit. Nach Abzug einer einstündigen Mittagspause bleiben 8 Stunden effektive Arbeitszeit beziehungsweise 8,00 Dezimalstunden.",
    supportingContent: [
      "Rundungen auf fünf, zehn oder fünfzehn Minuten sind betriebliche Regeln und werden nicht automatisch angewendet. Vergleiche das Ergebnis deshalb mit Arbeitsvertrag, Zeiterfassung und Personalreglement.",
      "Kontrolliere bei Abweichungen zuerst, ob bezahlte Kurzpausen, Umkleidezeit, Bereitschaft oder Wegzeiten im Betrieb als Arbeitszeit gelten. Solche Zeiten lassen sich nicht allgemein aus Start und Ende ableiten. Notiere ausserdem, ob eine Pause tatsächlich bezogen werden konnte. Wenn der Arbeitsplatz während der Pause nicht verlassen werden darf, kann sie nach Arbeitsgesetz als Arbeitszeit gelten. Für Lohnforderungen oder Streitfälle sind vollständige Aufzeichnungen mit Datum und Schicht wichtiger als eine einzelne Schätzung.",
    ],
    faqs: [
      { question: "Kann der Stundenrechner Pausen abziehen?", answer: "Ja. Trage die gesamte unbezahlte Pause in Minuten ein; sie wird von der Zeitspanne abgezogen." },
      { question: "Funktioniert der Rechner über Mitternacht?", answer: "Ja. Liegt die Endzeit vor der Startzeit, behandelt der Rechner das Ende als Zeitpunkt am Folgetag." },
      { question: "Sind Dezimalstunden und Stunden:Minuten gleich?", answer: "Sie beschreiben dieselbe Dauer. 8 Stunden 30 Minuten entsprechen 8,5 Dezimalstunden." },
      { question: "Was ist der Unterschied zwischen Anwesenheitszeit und Arbeitszeit?", answer: "Die Anwesenheitszeit umfasst den gesamten Zeitraum im Betrieb. Die Arbeitszeit entsteht nach Abzug nicht bezahlter Pausen." },
    ],
    relatedCalculators: ["arbeitszeitrechner", "lohnrechner-schweiz", "ferienrechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/pausenregelung-arbeitszeit-schweiz",
        label: "Pausenregelung und Arbeitszeit",
        description: "Gesetzliche Mindestpausen, Arbeitszeit und Anwesenheitszeit in der Schweiz erklaert.",
      },
      {
        href: "/de/ratgeber/stundenlohn-berechnen-schweiz",
        label: "Stundenlohn berechnen",
        description: "Formeln, 13. Monatslohn und Ferienzuschlag fuer den Vergleich von Lohnmodellen.",
      },
    ],
    monetizationType: "mixed",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Arbeitsstunden zwischen zwei Uhrzeiten inklusive Pause berechnen",
    inputs: [
      { key: "start", label: "Arbeitsbeginn", type: "time", defaultValue: "08:00" },
      { key: "end", label: "Arbeitsende", type: "time", defaultValue: "17:30" },
      { key: "breakMinutes", label: "Pause in Minuten", defaultValue: "60", min: "0", max: "1440" },
    ],
    resultLabels: ["Netto-Minuten", "Dezimalstunden", "Arbeitszeit"],
    cta: "Neue Rechner für Arbeitszeit, Lohn und Ferien direkt per E-Mail erhalten.",
  },
  {
    id: "de-working-time",
    locale: "de",
    slug: "arbeitszeitrechner",
    kind: "working-time",
    category: "Arbeit & Lohn",
    title: "Arbeitszeitrechner: tägliche und wöchentliche Arbeitszeit | Calcolich",
    metaDescription: "Tägliche, wöchentliche und monatliche Arbeitszeit berechnen. Beginn, Ende, Pause und Arbeitstage einfach eingeben.",
    h1: "Arbeitszeitrechner",
    shortTitle: "Arbeitszeit",
    intro: "Ermittle deine Nettoarbeitszeit pro Tag und rechne sie auf Woche und durchschnittlichen Monat hoch.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Dieser Arbeitszeitrechner hilft bei regelmässigen Wochenplänen, Teilzeitmodellen und flexiblen Arbeitszeiten. Aus einer typischen Tagesdauer und der Anzahl Arbeitstage entstehen vergleichbare Werte für Woche und durchschnittlichen Monat.",
          "Er ist nützlich, wenn du dein vertragliches Pensum mit tatsächlich geplanten Stunden vergleichen, ein Gleitzeitmodell vorbereiten oder den ungefähren monatlichen Zeitaufwand einschätzen möchtest. Für wechselnde Tagespläne solltest du zunächst jeden Tag separat berechnen und danach die Tageswerte addieren.",
        ],
        bullets: [
          "Wochenstunden aus täglicher Nettozeit und Arbeitstagen ermitteln",
          "Teilzeit- und Gleitzeitmodelle miteinander vergleichen",
          "Monatsstunden als neutralen Durchschnitt für Planung und Budget nutzen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Zuerst wird für einen Arbeitstag die Zeit zwischen Beginn und Ende berechnet. Die unbezahlte Pause wird abgezogen. Anschliessend wird die Nettozeit mit den Arbeitstagen pro Woche multipliziert. Für den Monatsdurchschnitt verwendet der Rechner 52 Wochen geteilt durch 12 Monate; deshalb ist dieser Wert nicht identisch mit jedem einzelnen Kalendermonat.",
          "Auch bei Gleitzeit gelten die gesetzlichen Mindestpausen: 15 Minuten ab mehr als 5,5 Stunden, 30 Minuten ab mehr als 7 Stunden und 60 Minuten ab mehr als 9 Stunden. Überstunden entstehen erst, wenn die vertraglich oder betrieblich festgelegte Sollzeit überschritten wird. Ein positiver Gleitzeitsaldo ist daher nicht automatisch rechtliche Überzeit.",
        ],
      },
    ],
    formula: "Zuerst wird die tägliche Nettozeit aus Arbeitsende minus Arbeitsbeginn minus Pause berechnet. Die Wochenzeit entspricht der Tageszeit mal Arbeitstage; für den Monatswert wird mit 52/12 Wochen gerechnet.",
    example: "Beispiel: Wer an fünf Tagen jeweils 8 Stunden netto arbeitet, erreicht 40 Wochenstunden. Der rechnerische Monatsdurchschnitt beträgt 40 × 52 ÷ 12 = 173,33 Stunden.",
    supportingContent: [
      "Feiertage, Ferien, Krankheit, unbezahlter Urlaub und wechselnde Schichten verändern die tatsächlich geleistete Monatszeit. Für einen verbindlichen Saldo ist die betriebliche Zeiterfassung massgebend.",
      "Ein Monatsdurchschnitt eignet sich vor allem für Planung und Vergleiche, nicht für die Kontrolle eines bestimmten Monats. Wer flexible Anfangs- und Endzeiten hat, sollte jede Tageszeit erfassen und Soll-, Ist- sowie Pausenzeit getrennt führen. Erst danach lässt sich ein Gleitzeit- oder Überstundensaldo zuverlässig bilden. Beachte auch, dass vertragliche Überstunden und gesetzliche Überzeit unterschiedliche Begriffe sind. Für Zuschläge, Kompensation und Höchstgrenzen gelten Vertrag, Gesamtarbeitsvertrag und Arbeitsgesetz.",
    ],
    faqs: [
      { question: "Wie werden Monatsstunden berechnet?", answer: "Die Wochenstunden werden mit 52 multipliziert und durch 12 geteilt. Dadurch entsteht ein durchschnittlicher Monatswert." },
      { question: "Zählt die Pause zur Arbeitszeit?", answer: "Nur bezahlte Pausen zählen üblicherweise als Arbeitszeit. Hier wird die eingegebene Pause vollständig abgezogen." },
      { question: "Kann ich Teilzeit berechnen?", answer: "Ja. Wähle einfach die tatsächliche Anzahl Arbeitstage und deine täglichen Zeiten." },
      { question: "Wie werden Überstunden behandelt?", answer: "Der Rechner zeigt Zeitmengen, kennt aber deine vertragliche Sollzeit nicht. Überstunden musst du durch Vergleich mit Vertrag oder Zeitsaldo bestimmen." },
      { question: "Ist der Monatswert für die Lohnabrechnung verbindlich?", answer: "Nein. Der Monatswert ist ein Durchschnitt über 52 Wochen und ersetzt nicht die betriebliche Zeiterfassung oder eine konkrete Monatsabrechnung." },
    ],
    relatedCalculators: ["stundenrechner", "lohnrechner-schweiz", "ferienrechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/pausenregelung-arbeitszeit-schweiz",
        label: "Pausenregelung und Arbeitszeit",
        description: "Wann Pausen vorgeschrieben sind und wie Nettoarbeitszeit richtig dokumentiert wird.",
      },
      {
        href: "/de/ratgeber/ferienanspruch-teilzeit-schweiz",
        label: "Ferienanspruch bei Teilzeit",
        description: "Wie Ferienwochen bei Teilzeit in persoenliche Arbeitstage umgerechnet werden.",
      },
    ],
    monetizationType: "lead",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Arbeitszeit pro Tag, Woche und Monat ausrechnen",
    updatedAt: "12. Juli 2026",
    sources: swissWorkSources,
    inputs: [
      { key: "start", label: "Arbeitsbeginn", type: "time", defaultValue: "08:00" },
      { key: "end", label: "Arbeitsende", type: "time", defaultValue: "17:24" },
      { key: "breakMinutes", label: "Pause pro Tag in Minuten", defaultValue: "60", min: "0" },
      { key: "daysPerWeek", label: "Arbeitstage pro Woche", defaultValue: "5", step: "0.5", min: "1", max: "7" },
    ],
    resultLabels: ["Pro Tag", "Pro Woche", "Pro Monat"],
    cta: "Praktische Vorlagen und neue Arbeitsrechner per E-Mail erhalten.",
  },
  {
    id: "de-overtime-ch",
    locale: "de",
    slug: "ueberstundenrechner-schweiz",
    kind: "overtime-ch",
    category: "Arbeit & Lohn",
    title: "Überstundenrechner Schweiz: Stunden und Zuschlag berechnen | Calcolich",
    metaDescription: "Überstunden in der Schweiz berechnen: Ist-Zeit, Soll-Zeit, Stundenlohn und Zuschlag eingeben und Auszahlung schätzen.",
    h1: "Überstundenrechner Schweiz",
    shortTitle: "Überstundenrechner",
    intro: "Berechne, wie viele Überstunden über deiner Sollzeit liegen und welche Auszahlung sich bei einem gewählten Zuschlag ergibt.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Rechner hilft, Wochen- oder Monatsstunden mit der vereinbarten Sollzeit zu vergleichen. So erkennst du, ob aus deiner Zeiterfassung ein positiver Überstundensaldo entsteht.",
          "Die Auszahlung ist bewusst als Schätzung aufgebaut. Ob Überstunden kompensiert, mit Normallohn oder mit Zuschlag bezahlt werden, hängt von Arbeitsvertrag, Reglement, Gesamtarbeitsvertrag und der konkreten Anordnung ab.",
        ],
        bullets: [
          "Ist-Stunden und Soll-Stunden neutral vergleichen",
          "Auszahlung mit 0 %, 25 % oder eigenem Zuschlag simulieren",
          "Zeitkompensation und Auszahlung besser vorbereiten",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Überstunden sind die Stunden über der vertraglich vereinbarten Arbeitszeit. Gesetzliche Überzeit ist ein eigener Begriff und betrifft Überschreitungen der Höchstarbeitszeit nach Arbeitsgesetz.",
          "Der Rechner zieht die Sollzeit von der tatsächlichen Arbeitszeit ab. Der positive Saldo wird mit dem Stundenlohn und dem gewählten Zuschlag multipliziert. Ein negativer Saldo wird als null Überstunden angezeigt.",
        ],
      },
    ],
    formula: "Überstunden = Ist-Stunden minus Soll-Stunden. Geschätzte Auszahlung = Überstunden × Stundenlohn × (1 + Zuschlag in Prozent).",
    example: "Beispiel: 46 Ist-Stunden bei 42 Soll-Stunden ergeben 4 Überstunden. Bei CHF 35 Stundenlohn und 25 % Zuschlag ergibt sich CHF 175 geschätzte Auszahlung.",
    supportingContent: [
      "Der Rechner unterscheidet nicht automatisch zwischen vertraglichen Überstunden und gesetzlicher Überzeit. Prüfe deshalb Vertrag, Personalreglement und allfälligen Gesamtarbeitsvertrag.",
      "Für eine belastbare Forderung brauchst du Datum, Beginn, Ende, Pause, Anordnung oder Genehmigung und den Bezug von Kompensation. Die Berechnung ist eine Orientierung und keine Rechtsberatung.",
    ],
    faqs: [
      { question: "Sind Überstunden immer mit 25 % Zuschlag zu bezahlen?", answer: "Nein. Nach OR kann ein Zuschlag relevant sein, vertragliche Regelungen können die Kompensation oder Vergütung aber genauer festlegen." },
      { question: "Was ist der Unterschied zwischen Überstunden und Überzeit?", answer: "Überstunden überschreiten die vertragliche Sollzeit. Überzeit betrifft die gesetzliche Höchstarbeitszeit nach Arbeitsgesetz." },
      { question: "Kann ich den Zuschlag auf 0 % setzen?", answer: "Ja. Nutze 0 %, wenn du nur den Grundlohn oder eine reine Zeitkompensation vergleichen möchtest." },
      { question: "Zählen Pausen zu Überstunden?", answer: "Unbezahlte Pausen werden normalerweise nicht als Arbeitszeit gezählt. Erfasst werden sollte die Nettoarbeitszeit." },
      { question: "Ist das Ergebnis rechtlich verbindlich?", answer: "Nein. Es ist eine rechnerische Schätzung und muss mit Vertrag, Reglement und Zeiterfassung abgeglichen werden." },
    ],
    relatedCalculators: ["arbeitszeitrechner", "stundenrechner", "stundenlohn-rechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/ueberstunden-schweiz-berechnen",
        label: "Überstunden in der Schweiz berechnen",
        description: "Unterschied zwischen Überstunden, Überzeit, Kompensation und Auszahlung.",
      },
      {
        href: "/de/ratgeber/pausenregelung-arbeitszeit-schweiz",
        label: "Arbeitszeit und Pausenregelung",
        description: "Warum Nettoarbeitszeit und Pausen fuer den Überstundensaldo wichtig sind.",
      },
    ],
    monetizationType: "mixed",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Überstunden in der Schweiz berechnen und Auszahlung schaetzen",
    updatedAt: "12. Juli 2026",
    sources: swissWorkSources,
    inputs: [
      { key: "actualHours", label: "Ist-Stunden", defaultValue: "46", step: "0.25", min: "0" },
      { key: "targetHours", label: "Soll-Stunden", defaultValue: "42", step: "0.25", min: "0" },
      { key: "hourlyWage", label: "Stundenlohn (CHF)", defaultValue: "35", step: "0.05", min: "0" },
      { key: "supplementRate", label: "Zuschlag (%)", defaultValue: "25", step: "1", min: "0" },
    ],
    resultLabels: ["Überstunden", "Zuschlag", "Auszahlung geschätzt"],
    cta: "Neue Arbeitszeit- und Lohnrechner für die Schweiz per E-Mail erhalten.",
  },
  {
    id: "de-salary-ch",
    locale: "de",
    slug: "lohnrechner-schweiz",
    kind: "salary-net-ch",
    category: "Arbeit & Lohn",
    title: "Lohnrechner Schweiz 2026: Nettolohn schätzen | Calcolich",
    metaDescription: "Schweizer Nettolohn aus dem Bruttolohn schätzen. AHV, ALV, Unfallversicherung, Pensionskasse und weitere Abzüge anpassen.",
    h1: "Lohnrechner Schweiz",
    shortTitle: "Lohnrechner Schweiz",
    intro: "Schätze deinen monatlichen Nettolohn aus dem Bruttolohn und individuell einstellbaren Abzügen.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Lohnrechner unterstützt dich beim Vergleich von Stellenangeboten, Teilzeitvarianten und Lohnabrechnungen in der Schweiz. Du kannst die wichtigsten Abzüge einzeln anpassen und siehst sofort, wie stark sie den verfügbaren Monatslohn beeinflussen.",
          "Zusätzlich lässt sich ein Monatslohn in einen rechnerischen Stundenlohn umwandeln. Das ist hilfreich, wenn eine Festanstellung mit einem Stundenlohnangebot verglichen wird oder wenn eine 13. Monatszahlung im Gesamtjahreslohn enthalten ist.",
        ],
        bullets: [
          "Brutto- und Nettolohn eines Angebots plausibilisieren",
          "Zwölf Monatslöhne mit einem Modell inklusive 13. Monatslohn vergleichen",
          "Ferienentschädigung bei unregelmässigem Stundenlohn nachvollziehen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Für den Nettolohn addiert der Rechner AHV/IV/EO, ALV, Nichtberufsunfall, Pensionskasse und weitere eingegebene Abzüge. Der Gesamtprozentsatz wird mit dem Bruttolohn multipliziert und vom Brutto abgezogen. Individuelle Pensionskassen- und Versicherungsbeiträge können deutlich abweichen.",
          "Der rechnerische Stundenlohn ohne 13. Monatslohn lautet Monatslohn × 12 ÷ Jahresarbeitsstunden. Mit 13. Monatslohn wird stattdessen mit 13 multipliziert. Bei unregelmässiger Teilzeitarbeit werden häufig Ferienzuschläge separat ausgewiesen: 8,33 % für vier, 10,64 % für fünf und 13,04 % für sechs Ferienwochen. Sie dürfen nicht bloss pauschal als im Lohn enthalten bezeichnet werden.",
        ],
      },
    ],
    formula: "Alle eingegebenen Abzugssätze werden addiert und auf den Bruttolohn angewendet. Nettolohn = Bruttolohn minus geschätzte Abzüge.",
    example: "Beispiel Stundenlohn: CHF 7'000 Monatslohn bei 42 Wochenstunden entsprechen ohne 13. Monatslohn rund CHF 38.46 pro Stunde. Mit 13 Monatslöhnen beträgt der rechnerische Stundenlohn CHF 7'000 × 13 ÷ (42 × 52) = CHF 41.67.",
    supportingContent: [
      "Der tatsächliche Nettolohn hängt unter anderem von Alter, Pensionskasse, Unfallversicherung, Kanton und Quellensteuer ab. Nutze Werte aus deiner Lohnabrechnung für eine bessere Schätzung.",
      "Vergleiche Stellenangebote möglichst auf Jahresbasis. Kläre, ob der angegebene Lohn zwölf oder dreizehn Mal bezahlt wird, ob Bonus und Zulagen garantiert sind und wie hoch der Arbeitgeberbeitrag an die Pensionskasse ausfällt. Ein höherer Bruttolohn kann durch andere Vorsorge- oder Versicherungsbedingungen relativiert werden. Für den persönlichen Haushaltsplan gehören zudem Krankenkassenprämien und die ordentliche Steuerrechnung dazu, auch wenn diese Positionen nicht direkt vom Monatslohn abgezogen werden. Halte dafür Jahreslohn, Arbeitszeit und Ferienanspruch in derselben Vergleichstabelle fest.",
    ],
    faqs: [
      { question: "Ist die Quellensteuer enthalten?", answer: "Du kannst sie zusammen mit weiteren individuellen Abzügen im letzten Feld eintragen." },
      { question: "Warum ist der Nettolohn nur eine Schätzung?", answer: "Pensionskasse, Versicherungen und Steuern unterscheiden sich nach Person, Arbeitgeber und Kanton." },
      { question: "Kann ich einen Jahreslohn eingeben?", answer: "Dieser Rechner arbeitet mit Monatslohn. Teile den Jahreslohn je nach Vertrag durch zwölf oder dreizehn Monatslöhne." },
      { question: "Ist die Ferienentschädigung immer zusätzlich geschuldet?", answer: "Bei Monatslohn werden Ferien normalerweise bezahlt bezogen. Bei unregelmässigem Stundenlohn kann ein separat ausgewiesener Zuschlag zulässig sein." },
    ],
    relatedCalculators: ["brutto-netto-rechner-schweiz", "arbeitszeitrechner", "budget-rechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/stundenlohn-berechnen-schweiz",
        label: "Stundenlohn berechnen",
        description: "Monatslohn, 13. Monatslohn und Jahresarbeitszeit sauber vergleichen.",
      },
      {
        href: "/de/ratgeber/pausenregelung-arbeitszeit-schweiz",
        label: "Pausenregelung und Arbeitszeit",
        description: "Arbeitszeit und Pausen als Grundlage fuer realistische Lohnvergleiche.",
      },
    ],
    monetizationType: "mixed",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Nettolohn in der Schweiz aus Bruttolohn berechnen",
    inputs: [
      { key: "gross", label: "Bruttolohn pro Monat (CHF)", defaultValue: "6500", min: "0" },
      { key: "avs", label: "AHV/IV/EO (%)", defaultValue: "5.3", step: "0.1", min: "0" },
      { key: "alv", label: "ALV (%)", defaultValue: "1.1", step: "0.1", min: "0" },
      { key: "accident", label: "Nichtberufsunfall (%)", defaultValue: "1.2", step: "0.1", min: "0" },
      { key: "pension", label: "Pensionskasse (%)", defaultValue: "7", step: "0.1", min: "0" },
      { key: "other", label: "Weitere Abzüge / Quellensteuer (%)", defaultValue: "0", step: "0.1", min: "0" },
    ],
    resultLabels: ["Abzugssatz", "Abzüge", "Nettolohn geschätzt"],
    cta: "Neue Schweizer Lohn- und Steuerrechner per E-Mail erhalten.",
  },
  {
    id: "de-gross-net-ch",
    locale: "de",
    slug: "brutto-netto-rechner-schweiz",
    kind: "gross-net-ch",
    category: "Arbeit & Lohn",
    title: "Brutto-Netto-Rechner Schweiz: Lohn umrechnen | Calcolich",
    metaDescription: "Brutto in Netto oder gewünschten Nettolohn in erforderlichen Bruttolohn umrechnen. Kostenloser Rechner für die Schweiz.",
    h1: "Brutto-Netto-Rechner Schweiz",
    shortTitle: "Brutto-Netto",
    intro: "Rechne einen Schweizer Bruttolohn in einen geschätzten Nettolohn um oder ermittle den nötigen Bruttolohn für dein Nettoziel.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Brutto-Netto-Rechner ist für eine schnelle Lohnschätzung gedacht, wenn du den ungefähren Gesamtanteil deiner Abzüge kennst. Er eignet sich für Budgetplanung, Lohnverhandlungen und den Vergleich eines gewünschten Nettolohns mit dem dafür nötigen Bruttolohn.",
          "Für eine erste Simulation genügt ein pauschaler Abzugssatz. Sobald eine konkrete Lohnabrechnung vorliegt, solltest du den dort ausgewiesenen Anteil verwenden oder im detaillierten Lohnrechner einzelne Positionen erfassen.",
        ],
        bullets: [
          "Bruttolohn in einen geschätzten Nettolohn umrechnen",
          "Erforderliches Brutto für ein persönliches Nettoziel bestimmen",
          "Auswirkungen eines höheren Pensionskassen- oder Steuerabzugs vergleichen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Arbeitnehmende tragen derzeit 5,3 % für AHV/IV/EO. Für die Arbeitslosenversicherung werden 1,1 % bis zum versicherten Jahreslohn von CHF 148'200 abgezogen. Hinzu kommen je nach Arbeitsverhältnis Nichtberufsunfallversicherung, berufliche Vorsorge und weitere betriebliche Abzüge.",
          "Krankenkassenprämien werden in der Schweiz normalerweise nicht vom Lohn abgezogen. Einkommenssteuern hängen von Kanton, Gemeinde, Zivilstand, Kindern, Konfession und Einkommen ab; bei quellensteuerpflichtigen Personen erscheinen sie dagegen direkt auf der Abrechnung. Deshalb bleibt eine pauschale Nettozahl immer eine Annäherung.",
        ],
      },
    ],
    formula: "Bei Brutto zu Netto wird der Abzugssatz vom Bruttolohn abgezogen. Bei Netto zu Brutto wird der Nettobetrag durch 1 minus Abzugssatz geteilt.",
    example: "Beispiel: Bei CHF 6'000 Bruttolohn und angenommenen Gesamtabzügen von 14,6 % entstehen CHF 876 Abzüge. Der geschätzte Nettolohn beträgt CHF 5'124. Persönliche Steuern und Krankenkasse müssen separat budgetiert werden, sofern sie nicht bereits im Abzugssatz enthalten sind.",
    supportingContent: [
      "Der pauschale Abzugssatz vereinfacht die Rechnung. Für eine detailliertere Schätzung kannst du den Schweizer Lohnrechner mit einzelnen Abzugspositionen verwenden.",
      "Für einen realistischen Vergleich sollten wiederkehrende und einmalige Zahlungen getrennt betrachtet werden. Spesenersatz ist nicht dasselbe wie Lohn, ein Bonus kann freiwillig sein und ein 13. Monatslohn wird häufig anteilig ausbezahlt. Prüfe ausserdem, ob der Nettobetrag vor oder nach Quellensteuer gemeint ist. Bei ordentlicher Besteuerung bleibt die Steuerrechnung ausserhalb der Lohnabrechnung und muss im Budget zusätzlich reserviert werden. Der Rechner liefert deshalb keine verbindliche Auszahlungsabrechnung.",
    ],
    faqs: [
      { question: "Welchen Abzugssatz soll ich verwenden?", answer: "Am besten übernimmst du den Gesamtanteil aus einer aktuellen Lohnabrechnung. Ohne Referenz ist der Wert nur eine Annahme." },
      { question: "Sind Steuern im Ergebnis enthalten?", answer: "Nur wenn du sie in den pauschalen Abzugssatz einrechnest. Ordentlich veranlagte Einkommenssteuern stehen meist nicht auf der Lohnabrechnung." },
      { question: "Funktioniert die Rückrechnung von Netto zu Brutto?", answer: "Ja. Wähle den entsprechenden Modus und gib Nettobetrag sowie geschätzten Abzugssatz ein." },
      { question: "Wie beeinflussen Kinder und Zivilstand das Netto?", answer: "Sie verändern vor allem die Steuerbelastung. Bei Quellensteuer wirken sie direkt im Tarif, bei ordentlicher Veranlagung später in der Steuerrechnung." },
    ],
    relatedCalculators: ["lohnrechner-schweiz", "stundenrechner", "budget-rechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/stundenlohn-berechnen-schweiz",
        label: "Stundenlohn berechnen",
        description: "Brutto, Netto und Stundenlohn mit und ohne 13. Monatslohn einordnen.",
      },
    ],
    monetizationType: "mixed",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Schweizer Lohn zwischen brutto und netto umrechnen",
    inputs: [
      { key: "mode", label: "Berechnung", type: "select", defaultValue: "gross-to-net", options: [{ label: "Brutto zu Netto", value: "gross-to-net" }, { label: "Netto zu Brutto", value: "net-to-gross" }] },
      { key: "amount", label: "Betrag (CHF)", defaultValue: "7000", min: "0" },
      { key: "deductionRate", label: "Geschätzte Gesamtabzüge (%)", defaultValue: "15", step: "0.1", min: "0", max: "80" },
    ],
    resultLabels: ["Geschätzte Abzüge", "Bruttolohn", "Nettolohn"],
    cta: "Lohnrechner und Checklisten für die Schweiz per E-Mail erhalten.",
  },
  {
    id: "de-withholding-tax-ch",
    locale: "de",
    slug: "quellensteuer-rechner-schweiz",
    kind: "withholding-tax-ch",
    category: "Steuern & Mehrwertsteuer",
    title: "Quellensteuer-Rechner Schweiz: Abzug und Nettolohn schätzen | Calcolich",
    metaDescription: "Schweizer Quellensteuer aus Monatslohn, Sozialabgaben und kantonalem Steuersatz schätzen. Mit Formel, Beispiel, FAQ und Quellen.",
    h1: "Quellensteuer-Rechner Schweiz",
    shortTitle: "Quellensteuer-Rechner",
    intro: "Schätze, wie sich Quellensteuer und Sozialabgaben auf deinen monatlichen Nettolohn in der Schweiz auswirken.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Quellensteuer-Rechner ist für Personen gedacht, bei denen die Steuer direkt vom Lohn abgezogen wird. Das betrifft häufig Grenzgänger, ausländische Arbeitnehmende ohne Niederlassungsbewilligung C und Personen mit kantonalem Quellensteuertarif.",
          "Die genaue Quellensteuer hängt von Kanton, Zivilstand, Kindern, Konfession, Pensum und Tarifcode ab. Deshalb arbeitet dieser Rechner bewusst mit einem manuell eingegebenen Steuersatz und zeigt transparent, wie sich der Satz auf den Nettolohn auswirkt.",
        ],
        bullets: [
          "Monatslohn mit Sozialabgaben und Quellensteuer plausibilisieren",
          "Kantonale Tarifwerte als Prozentsatz einsetzen",
          "Lohnangebot oder erste Abrechnung vorbereiten",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Der Rechner zieht zuerst einen geschätzten Anteil für Sozialabgaben ab und berechnet zusätzlich die Quellensteuer auf dem Bruttolohn. Beide Werte werden vom Bruttolohn abgezogen.",
          "In der Realität können Abzüge anders gruppiert sein und Quellensteuertarife werden kantonal festgelegt. Verwende daher Werte aus der Lohnabrechnung oder aus der kantonalen Tabelle, wenn du eine genaue Plausibilisierung brauchst.",
        ],
      },
    ],
    formula: "Nettolohn geschätzt = Bruttolohn - Sozialabgaben - Quellensteuer. Sozialabgaben und Quellensteuer werden als Prozent des Bruttolohns gerechnet.",
    example: "Beispiel: Bei CHF 6'500 Bruttolohn, 6,4 % Sozialabgaben und 8,5 % Quellensteuer entstehen CHF 416 Sozialabgaben und CHF 552.50 Quellensteuer. Der geschätzte Nettolohn beträgt CHF 5'531.50.",
    supportingContent: [
      "Der Rechner ist keine kantonale Tarifabfrage. Er hilft, eine bekannte oder angenommene Quellensteuerquote auf den Lohn anzuwenden.",
      "Prüfe bei Abweichungen zuerst Tarifcode, Kanton, Gemeinde, Beschäftigungsgrad, Kinderabzüge und ob eine nachträgliche ordentliche Veranlagung relevant sein kann.",
    ],
    faqs: [
      { question: "Welchen Quellensteuersatz soll ich eingeben?", answer: "Nutze den Satz aus der Lohnabrechnung oder der kantonalen Quellensteuertabelle für deinen Tarifcode." },
      { question: "Gilt der Rechner für alle Kantone?", answer: "Ja als Rechenmodell. Die kantonalen Steuersätze musst du selbst korrekt einsetzen." },
      { question: "Sind AHV und ALV enthalten?", answer: "Sie werden über das Feld Sozialabgaben pauschal berücksichtigt. Für Details nutze zusätzlich den Lohnrechner." },
      { question: "Ist das Ergebnis verbindlich?", answer: "Nein. Verbindlich sind Lohnabrechnung, kantonale Regeln und Steuerbehörden." },
      { question: "Warum wird die Steuer vom Bruttolohn gerechnet?", answer: "Der Rechner verwendet ein einfaches Modell. Effektive kantonale Tarife können anders strukturiert sein." },
    ],
    relatedCalculators: ["lohnrechner-schweiz", "brutto-netto-rechner-schweiz", "budget-rechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/stundenlohn-berechnen-schweiz",
        label: "Lohnmodelle vergleichen",
        description: "Stundenlohn, Monatslohn und Jahreslohn als Grundlage fuer Steuer- und Budgetvergleiche.",
      },
    ],
    monetizationType: "mixed",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Quellensteuer und Nettolohn in der Schweiz schaetzen",
    updatedAt: "12. Juli 2026",
    sources: swissTaxSources,
    inputs: [
      { key: "gross", label: "Bruttolohn pro Monat (CHF)", defaultValue: "6500", min: "0" },
      { key: "socialRate", label: "Sozialabgaben (%)", defaultValue: "6.4", step: "0.1", min: "0" },
      { key: "taxRate", label: "Quellensteuer (%)", defaultValue: "8.5", step: "0.1", min: "0" },
    ],
    resultLabels: ["Sozialabgaben", "Quellensteuer", "Nettolohn geschätzt"],
    cta: "Neue Schweizer Steuer- und Lohnrechner per E-Mail erhalten.",
  },
  {
    id: "de-vat-ch",
    locale: "de",
    slug: "mehrwertsteuer-rechner-schweiz",
    kind: "vat-ch",
    category: "Steuern & Mehrwertsteuer",
    title: "Mehrwertsteuer-Rechner Schweiz 2026: MWST berechnen | Calcolich",
    metaDescription: "Schweizer MWST aufschlagen oder aus einem Bruttobetrag herausrechnen. Mit frei wählbarem Mehrwertsteuersatz.",
    h1: "Mehrwertsteuer-Rechner Schweiz",
    shortTitle: "MWST-Rechner",
    intro: "Berechne Nettobetrag, Mehrwertsteuer und Bruttobetrag für Schweizer Rechnungen und Preise.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Mehrwertsteuer-Rechner hilft Selbstständigen, Unternehmen und Kundinnen, Netto-, Steuer- und Bruttopreise auseinanderzuhalten. Er eignet sich für Offerten, Rechnungen, Preislisten, Buchhaltungskontrollen und die Prüfung eines bereits inklusive MWST angegebenen Betrags.",
          "Vor jeder Berechnung muss der richtige Satz gewählt werden. Entscheidend ist die Art der Leistung, nicht die Branche allein. Bei gemischten Leistungen oder grenzüberschreitenden Sachverhalten kann eine fachliche Abklärung nötig sein.",
        ],
        bullets: [
          "MWST auf einen Nettopreis aufschlagen",
          "Steuer und Nettowert aus einem Bruttopreis herausrechnen",
          "Normalsatz, reduzierten Satz und Beherbergungssatz vergleichen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "In der Schweiz gelten aktuell 8,1 % als Normalsatz für steuerbare Leistungen ohne Sonderregel, 2,6 % als reduzierter Satz unter anderem für viele Lebensmittel, Medikamente und Bücher sowie 3,8 % als Sondersatz für Beherbergungsleistungen. Restaurantleistungen fallen grundsätzlich nicht einfach unter den reduzierten Lebensmittelsatz.",
          "Beim Aufschlagen wird der Nettobetrag mit dem Satz multipliziert und die Steuer addiert. Beim Herausrechnen darf der Bruttopreis nicht bloss mit 8,1 % multipliziert werden: Der Nettobetrag entsteht durch Division durch 1,081. Vorsteuerabzug ist nur möglich, wenn die gesetzlichen Voraussetzungen erfüllt sind und ein korrektes Belegdokument vorliegt.",
        ],
      },
    ],
    formula: "Beim Aufschlagen gilt: MWST = Nettobetrag × Steuersatz. Beim Herausrechnen gilt: Nettobetrag = Bruttobetrag ÷ (1 + Steuersatz).",
    example: "Beispiel: Ein Bruttopreis von CHF 108.10 zum Normalsatz von 8,1 % wird durch 1,081 geteilt. Das ergibt CHF 100.00 netto und CHF 8.10 Mehrwertsteuer.",
    supportingContent: [
      "Prüfe vor der Rechnung, welcher Steuersatz für deine Leistung gilt. Der Rechner erstellt keine steuerliche Beurteilung und ersetzt keine Buchhaltungssoftware.",
      "Rundungsdifferenzen von wenigen Rappen können entstehen, je nachdem ob die Steuer pro Position oder auf dem Rechnungstotal berechnet wird. Bewahre bei geschäftlichen Vorgängen Rechnung, Leistungsdatum und angewendeten Satz nachvollziehbar auf. Für Auslandsgeschäfte, Plattformverkäufe, Bezugssteuer oder Einfuhrsteuer gelten zusätzliche Regeln. Auch die Berechtigung zum Vorsteuerabzug hängt von der unternehmerischen Verwendung und einem ordnungsgemässen Beleg ab; der ausgewiesene Steuerbetrag allein genügt nicht immer. Bei Unsicherheit helfen die aktuellen MWST-Infos der Eidgenössischen Steuerverwaltung oder eine Fachperson, bevor eine Rechnung definitiv versendet wird. So vermeidest du spätere Korrekturen.",
    ],
    faqs: [
      { question: "Kann ich die MWST aus einem Bruttobetrag herausrechnen?", answer: "Ja. Wähle den Modus 'MWST herausrechnen' und gib den Gesamtbetrag ein." },
      { question: "Kann ich einen reduzierten Satz verwenden?", answer: "Ja. Der Prozentsatz ist frei editierbar, damit du den für deine Leistung geltenden Satz eintragen kannst." },
      { question: "Warum ist Herausrechnen nicht einfach Betrag mal Prozentsatz?", answer: "Weil der Bruttobetrag die Steuer bereits enthält. Deshalb wird durch 1 plus Steuersatz geteilt." },
      { question: "Gelten bei Importen dieselben Regeln?", answer: "Bei Einfuhren kann Einfuhrsteuer anfallen; Bemessungsgrundlage und Verfahren unterscheiden sich von einer normalen Inlandrechnung." },
    ],
    relatedCalculators: ["prozentrechner", "zinsrechner", "budget-rechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/mehrwertsteuer-schweiz-2026",
        label: "Mehrwertsteuer Schweiz 2026",
        description: "MWST-Saetze, Netto-Brutto-Formeln, Vorsteuer und Beispiele fuer Schweizer Rechnungen.",
      },
    ],
    monetizationType: "affiliate",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Schweizer Mehrwertsteuer aufschlagen oder herausrechnen",
    inputs: [
      { key: "mode", label: "Berechnung", type: "select", defaultValue: "add", options: [{ label: "MWST aufschlagen", value: "add" }, { label: "MWST herausrechnen", value: "remove" }] },
      { key: "amount", label: "Betrag (CHF)", defaultValue: "1000", min: "0" },
      { key: "rate", label: "MWST-Satz (%)", defaultValue: "8.1", step: "0.1", min: "0", max: "100" },
    ],
    resultLabels: ["Nettobetrag", "Mehrwertsteuer", "Bruttobetrag"],
    cta: "Neue Rechner für MWST, Preise und Selbstständige per E-Mail erhalten.",
  },
  {
    id: "de-premium-subsidy-ch",
    locale: "de",
    slug: "praemienverbilligung-rechner-schweiz",
    kind: "premium-subsidy-ch",
    category: "Gesundheit",
    title: "Prämienverbilligung-Rechner Schweiz | Calcolich",
    metaDescription: "Prämienverbilligung in der Schweiz als grobe Orientierung berechnen. Jahresprämie, Einkommen und tragbaren Anteil vergleichen.",
    h1: "Prämienverbilligung-Rechner Schweiz",
    shortTitle: "Prämienverbilligung",
    intro: "Prüfe, ob deine Krankenkassenprämien im Verhältnis zum Einkommen hoch wirken und wie gross eine mögliche Entlastung ungefähr ausfallen könnte.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Die Prämienverbilligung ist in der Schweiz kantonal geregelt. Der Rechner hilft dir, vor einer formellen Abklärung zu verstehen, wie gross die Lücke zwischen Jahresprämie und tragbarem Anteil sein kann.",
          "Besonders nützlich ist er für Haushalte mit knappem Budget, Familien mit mehreren Prämienpositionen und Personen, die nach einem Umzug oder Jobwechsel ihre Fixkosten neu prüfen.",
        ],
        bullets: [
          "Jahresprämie und tragbaren Einkommensanteil gegenüberstellen",
          "Mögliche Entlastung vor einer kantonalen Abklärung abschätzen",
          "Krankenkasse, Budget und Wohnen gemeinsam betrachten",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Der Rechner multipliziert das Jahreseinkommen mit einem tragbaren Prozentsatz und vergleicht das Resultat mit der Jahresprämie. Liegt die Prämie darüber, erscheint die Differenz als mögliche Verbilligung.",
          "Das ist keine kantonale Anspruchsprüfung. Jede Kantonslösung verwendet eigene Schwellen, Haushaltsdefinitionen und Formulare. Deshalb ist das Ergebnis eine Orientierung und kein Ersatz für die offizielle Prüfung.",
        ],
      },
    ],
    formula: "Mögliche Prämienverbilligung = Jahresprämie minus tragbarer Einkommensanteil. Ist der Anteil höher als die Prämie, ergibt sich kein Anspruch in diesem Modell.",
    example: "Beispiel: Bei CHF 45'000 Einkommen, CHF 5'400 Jahresprämie und 8 % tragbarem Anteil ergibt sich ein tragbarer Betrag von CHF 3'600. Die modellierte Entlastung beträgt CHF 1'800.",
    supportingContent: [
      "Der tatsächliche Anspruch kann höher, tiefer oder null sein, je nach Kanton, Einkommen, Vermögen, Haushalt und Antragspflicht.",
      "Nutze das Ergebnis zusammen mit Budget-Rechner und Affordability-Checks, damit die Krankenkasse nicht isoliert betrachtet wird.",
    ],
    faqs: [
      { question: "Ist die Prämienverbilligung in allen Kantonen gleich?", answer: "Nein. Zuständigkeit, Schwellen und Abläufe sind kantonal unterschiedlich." },
      { question: "Ist das Ergebnis verbindlich?", answer: "Nein. Es ist nur eine Orientierung vor der offiziellen Abklärung." },
      { question: "Was ist die wichtigste Eingabe?", answer: "Die Jahresprämie und ein realistisch geschätzter tragbarer Einkommensanteil." },
      { question: "Kann ich Kinder oder mehrere Personen berücksichtigen?", answer: "Ja, indem du die gesamte Haushaltsprämie und das Haushaltseinkommen als Gesamtwert einsetzt." },
      { question: "Brauche ich einen Antrag?", answer: "In vielen Kantonen ja. Das Ergebnis zeigt dir nur den möglichen Spielraum." },
    ],
    relatedCalculators: ["krankenkasse-praemien-rechner-schweiz", "budget-rechner-schweiz", "mietbudget-rechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/praemienverbilligung-schweiz",
        label: "Prämienverbilligung in der Schweiz verstehen",
        description: "Kantonale Unterschiede, Unterlagen und die richtige Einordnung der Entlastung.",
      },
    ],
    monetizationType: "lead",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Praemienverbilligung in der Schweiz grob abschaetzen",
    updatedAt: "13. Juli 2026",
    sources: swissHealthSubsidySources,
    inputs: [
      { key: "annualIncome", label: "Jahreseinkommen (CHF)", defaultValue: "45000", min: "0" },
      { key: "annualPremium", label: "Jahresprämie (CHF)", defaultValue: "5400", min: "0" },
      { key: "maxShare", label: "Tragbarer Einkommensanteil (%)", defaultValue: "8", step: "0.1", min: "0", max: "100" },
    ],
    resultLabels: ["Jahresprämien", "Tragbarer Anteil", "Prämienverbilligung"],
    cta: "Neue Gesundheits-, Budget- und Schweizer Rechner per E-Mail erhalten.",
  },
  {
    id: "de-family-allowances-ch",
    locale: "de",
    slug: "familienzulagen-rechner-schweiz",
    kind: "family-allowances-ch",
    category: "Familie",
    title: "Familienzulagen-Rechner Schweiz | Calcolich",
    metaDescription: "Familienzulagen in der Schweiz aus Kinderzulage, Ausbildungszulage und Anzahl der Anspruchsmonate berechnen.",
    h1: "Familienzulagen-Rechner Schweiz",
    shortTitle: "Familienzulagen",
    intro: "Berechne den Jahresbetrag von Kinder- und Ausbildungszulagen mit den kantonalen Monatswerten, die in deinem Fall gelten.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Familienzulagen sind kantonal geprägt. Der Rechner hilft dir, die monatlichen Beträge auf ein Jahr hochzurechnen und damit den realen Beitrag zum Haushaltsbudget besser zu verstehen.",
          "Besonders praktisch ist er bei mehreren Kindern, bei Ausbildungssituationen, bei Teilzeit und wenn zwei Erwerbssituationen miteinander verglichen werden sollen.",
        ],
        bullets: [
          "Kinderzulage und Ausbildungszulage getrennt betrachten",
          "Monatswerte auf den Anspruchszeitraum hochrechnen",
          "Familienbudget mit realistischen Jahreswerten planen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Der Rechner multipliziert die monatliche Zulage pro Kind mit der Anzahl Kinder und die Ausbildungszulage mit der Anzahl Kinder in Ausbildung. Danach wird das Ergebnis mit den Monaten des Anspruchs multipliziert.",
          "Die offiziellen Ansätze sind nicht in jedem Kanton gleich. Für eine verbindliche Beurteilung musst du die Zuständigkeit des Erwerbskantons und die dortigen Regelsätze prüfen.",
        ],
      },
    ],
    formula: "Jahresanspruch = (Kinderzulage × Anzahl Kinder + Ausbildungszulage × Anzahl Kinder in Ausbildung) × Anspruchsmonate.",
    example: "Beispiel: 2 Kinder mit CHF 250 Kinderzulage und 1 Kind in Ausbildung mit CHF 300 Ausbildungszulage ergeben monatlich CHF 800. Über 12 Monate sind das CHF 9'600.",
    supportingContent: [
      "Anspruch, Höhe und Finanzierung unterscheiden sich nach Kanton und Beschäftigungssituation. Der Rechner ist eine Budgethilfe, keine Anspruchsprüfung.",
      "Prüfe zusätzlich, ob du als Arbeitnehmender, Selbstständiger oder Nichterwerbstätiger unterschiedliche Regeln beachten musst.",
    ],
    faqs: [
      { question: "Sind Familienzulagen überall gleich hoch?", answer: "Nein. Die kantonalen Ansätze und Regeln unterscheiden sich." },
      { question: "Was ist der Unterschied zwischen Kinder- und Ausbildungszulage?", answer: "Die Ausbildungszulage gilt für ältere Kinder in Ausbildung und ist normalerweise höher." },
      { question: "Kann ich Teilzeit abbilden?", answer: "Ja, indem du die korrekten Monatswerte und Anspruchsmonate eingibst." },
      { question: "Ist das eine Anspruchsprüfung?", answer: "Nein. Der Rechner rechnet nur die Beträge hoch." },
      { question: "Brauche ich mehrere Eingaben pro Kind?", answer: "Nur wenn Kinder und Ausbildungszulagen unterschiedlich behandelt werden sollen." },
    ],
    relatedCalculators: ["budget-rechner-schweiz", "brutto-netto-rechner-schweiz", "praemienverbilligung-rechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/stundenlohn-berechnen-schweiz",
        label: "Lohn als Basis verstehen",
        description: "Warum Lohn, Teilzeit und Familienzulagen im gleichen Haushaltsbild landen sollten.",
      },
    ],
    monetizationType: "lead",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Familienzulagen in der Schweiz berechnen",
    updatedAt: "13. Juli 2026",
    sources: swissFamilySources,
    inputs: [
      { key: "childAllowance", label: "Kinderzulage pro Monat (CHF)", defaultValue: "250", min: "0" },
      { key: "educationAllowance", label: "Ausbildungszulage pro Monat (CHF)", defaultValue: "300", min: "0" },
      { key: "childCount", label: "Kinder mit Kinderzulage", defaultValue: "2", min: "0" },
      { key: "trainingCount", label: "Kinder in Ausbildung", defaultValue: "1", min: "0" },
      { key: "months", label: "Anspruchsmonate", defaultValue: "12", min: "1", max: "12" },
    ],
    resultLabels: ["Monatsbetrag", "Anspruchsmonate", "Jahresbetrag"],
    cta: "Neue Familien-, Lohn- und Budgetrechner per E-Mail erhalten.",
  },
  {
    id: "de-self-employed-ahv",
    locale: "de",
    slug: "ahv-beitraege-selbststaendige-rechner",
    kind: "self-employed-ahv-ch",
    category: "Arbeit & Lohn",
    title: "AHV-Beiträge Selbstständige Rechner | Calcolich",
    metaDescription: "AHV-, IV- und EO-Beiträge für Selbstständige in der Schweiz anhand von Einkommen, Satz und Verwaltungskosten schätzen.",
    h1: "AHV-Beiträge Selbstständige Rechner",
    shortTitle: "AHV Selbstständige",
    intro: "Schätze die jährlichen Sozialbeiträge als Selbstständige oder Selbstständiger und setze sie direkt in deine Kalkulation ein.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Selbstständige tragen die AHV-, IV- und EO-Beiträge grundsätzlich selbst. Der Rechner hilft dir, diese Fixkosten bereits vor der Preisgestaltung in die Kalkulation einzubauen.",
          "Besonders relevant ist er für Freelancer, Berater, Agenturen und kleine Betriebe, die ihr Jahreseinkommen, ihre Kosten und ihre Tarife sauber planen wollen.",
        ],
        bullets: [
          "Beitragsschätzung vor der Tarifkalkulation",
          "Mindestbeitrag und Verwaltungskosten berücksichtigen",
          "Tarif, Kosten und Nettogewinn gemeinsam beurteilen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Der Rechner multipliziert das Einkommen mit dem Beitragssatz und vergleicht das Resultat mit einem Mindestbeitrag. Anschliessend werden die Verwaltungskosten ergänzt.",
          "Bei tieferen Einkommen gilt eine offizielle Skala. Die exakte Beitragshöhe legt die zuständige Ausgleichskasse fest; der Rechner ist deshalb eine wirtschaftliche Vorstufe, keine verbindliche Veranlagung.",
        ],
      },
    ],
    formula: "AHV/IV/EO = Einkommen × Beitragssatz. Wenn das Resultat unter dem Mindestbeitrag liegt, wird mindestens der Mindestbeitrag verwendet.",
    example: "Beispiel: CHF 90'000 Einkommen bei 9,8 % Beitragssatz ergeben CHF 8'820 AHV/IV/EO. Mit 4 % Verwaltungskosten liegen die Gesamtkosten bei CHF 9'172.80.",
    supportingContent: [
      "Für tiefe Einkommen gilt eine offizielle Beitragsskala. Der Rechner nutzt den eingegebenen Satz, damit du schnell eine belastbare Budgetschätzung erhältst.",
      "Vergiss bei selbstständiger Tätigkeit nicht, auch Krankenkasse, Steuern und Rücklagen einzuplanen. Der Sozialbeitrag ist nur eine von mehreren Pflichtgrössen.",
    ],
    faqs: [
      { question: "Ist der Satz bei allen Selbstständigen gleich?", answer: "Nein. Es gibt eine offizielle Skala und Beiträge hängen vom Einkommen ab." },
      { question: "Sind Verwaltungskosten enthalten?", answer: "Ja, sie werden als eigener Aufschlag geschätzt." },
      { question: "Ist das Ergebnis verbindlich?", answer: "Nein. Massgebend bleibt die Ausgleichskasse." },
      { question: "Kann ich den Mindestbeitrag sehen?", answer: "Ja, du kannst ihn als eigene Untergrenze im Rechner eintragen." },
      { question: "Hilft das bei der Preisgestaltung?", answer: "Ja, weil du den Pflichtbeitrag direkt in deine Tarife einrechnen kannst." },
    ],
    relatedCalculators: ["freelancer-stundensatz-rechner-schweiz", "budget-rechner-schweiz", "quellensteuer-rechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/stundenlohn-berechnen-schweiz",
        label: "Stundenlohn berechnen",
        description: "Wie du aus Stunden, Tarif und Kosten ein tragfähiges Einkommen planst.",
      },
    ],
    monetizationType: "mixed",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "AHV-Beiträge fuer Selbststaendige in der Schweiz schaetzen",
    updatedAt: "13. Juli 2026",
    sources: swissAhvSources,
    inputs: [
      { key: "netIncome", label: "Nettoeinkommen pro Jahr (CHF)", defaultValue: "90000", min: "0" },
      { key: "contributionRate", label: "AHV/IV/EO Beitragssatz (%)", defaultValue: "9.8", step: "0.001", min: "0", max: "10" },
      { key: "adminRate", label: "Verwaltungskosten (%)", defaultValue: "4", step: "0.1", min: "0", max: "5" },
      { key: "minimumContribution", label: "Mindestbeitrag (CHF)", defaultValue: "529.20", step: "0.05", min: "0" },
    ],
    resultLabels: ["AHV/IV/EO", "Verwaltungskosten", "Gesamtkosten"],
    cta: "Neue Rechner für Selbstständige, Tarife und Budget per E-Mail erhalten.",
  },
  {
    id: "de-unemployment-benefit-ch",
    locale: "de",
    slug: "arbeitslosenentschaedigung-rechner-schweiz",
    kind: "unemployment-benefit-ch",
    category: "Arbeit & Lohn",
    title: "Arbeitslosenentschädigung-Rechner Schweiz | Calcolich",
    metaDescription: "Arbeitslosenentschädigung in der Schweiz anhand von versichertem Verdienst, Anspruchssatz und Taggeldern schätzen.",
    h1: "Arbeitslosenentschädigung-Rechner Schweiz",
    shortTitle: "Arbeitslosenentschädigung",
    intro: "Schätze die monatliche Arbeitslosenentschädigung aus dem versicherten Verdienst und dem anwendbaren Anspruchssatz.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Die Arbeitslosenentschädigung wird in Taggeldern ausbezahlt. Der Rechner hilft dir, vor einer Anmeldung beim RAV oder einer Kasse zu verstehen, welche Grössenordnung deine Leistungen haben könnten.",
          "Wichtig ist der Unterschied zwischen versichertem Verdienst, Anspruchssatz und den Tagen, die im Monat tatsächlich entschädigt werden.",
        ],
        bullets: [
          "Taggeldhöhe grob abschätzen",
          "70 % und 80 % Anspruchssatz vergleichen",
          "Budget an ein tieferes Monatseinkommen anpassen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Der Rechner begrenzt den versicherten Verdienst auf den gesetzlichen Höchstwert und multipliziert ihn mit dem Anspruchssatz. Daraus entsteht ein Taggeld, das mit den entschädigten Tagen des Monats hochgerechnet wird.",
          "Abzüge für Sozialversicherungen, Unfall, Vorsorge und Steuern werden hier nicht automatisch berücksichtigt. Das Ergebnis ist deshalb eine Bruttoschätzung.",
        ],
      },
    ],
    formula: "Taggeld = versicherter Verdienst ÷ 21,7 × Anspruchssatz. Monatsleistung = Taggeld × entschädigte Tage.",
    example: "Beispiel: CHF 6'500 versicherter Verdienst bei 70 % Anspruch ergeben rund CHF 209.91 pro Tag. Bei 21,7 Tagen im Monat liegt die Bruttoschätzung bei rund CHF 4'556.",
    supportingContent: [
      "Der tatsächliche Anspruch hängt von Beitragszeit, Vermittlungsfähigkeit, Alter und weiteren Bedingungen ab.",
      "Plane dein Budget nicht nur mit dem Taggeld, sondern auch mit Ausgaben wie Krankenkasse, Miete und laufenden Fixkosten.",
    ],
    faqs: [
      { question: "Ist der Anspruch immer 70 %?", answer: "Nein. In gewissen Fällen gelten 80 %." },
      { question: "Ist das Ergebnis netto?", answer: "Nein. Es ist eine Bruttoschätzung vor weiteren Abzügen." },
      { question: "Wird der Höchstlohn berücksichtigt?", answer: "Ja, der versicherte Verdienst wird im Modell gedeckelt." },
      { question: "Kann ich damit mein Monatsbudget planen?", answer: "Ja, genau dafür ist die Schätzung nützlich." },
      { question: "Ersetzt der Rechner die Kasse?", answer: "Nein. Massgebend ist die Verfügung der zuständigen Stelle." },
    ],
    relatedCalculators: ["lohnrechner-schweiz", "budget-rechner-schweiz", "mietbudget-rechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/stundenlohn-berechnen-schweiz",
        label: "Lohn als Basis verstehen",
        description: "Warum Monatslohn, Stundenlohn und Jahreslohn im Vergleich wichtig sind.",
      },
    ],
    monetizationType: "lead",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Arbeitslosenentschaedigung in der Schweiz schaetzen",
    updatedAt: "13. Juli 2026",
    sources: swissUnemploymentSources,
    inputs: [
      { key: "insuredIncome", label: "Versicherter Verdienst pro Monat (CHF)", defaultValue: "6500", min: "0" },
      {
        key: "compensationRate",
        label: "Anspruchssatz",
        type: "select",
        defaultValue: "70",
        options: [
          { label: "70 % - ordentlicher Satz", value: "70" },
          { label: "80 % - Kinder / tiefes Einkommen / IV", value: "80" },
        ],
      },
      { key: "payableDays", label: "Entschädigte Tage im Monat", defaultValue: "21.7", step: "0.1", min: "1", max: "23" },
    ],
    resultLabels: ["Versicherter Verdienst", "Taggeld", "Monatsleistung"],
    cta: "Neue Lohn-, Budget- und Arbeitslosigkeitsrechner per E-Mail erhalten.",
  },
  {
    id: "de-percentage",
    locale: "de",
    slug: "prozentrechner",
    kind: "percentage",
    category: "Finanzen",
    title: "Prozentrechner: Prozentwert einfach online berechnen | Calcolich",
    metaDescription: "Berechne schnell, wie viel ein Prozentsatz von einem Grundwert ist. Kostenloser Prozentrechner mit Formel und Beispiel.",
    h1: "Prozentrechner",
    shortTitle: "Prozentrechner",
    intro: "Finde heraus, wie viel ein bestimmter Prozentsatz von einem Wert ausmacht.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Prozentrechner beantwortet alltägliche Fragen zu Rabatten, Preisaufschlägen, Gebühren, Provisionen, Budgetanteilen und Veränderungen. Er eignet sich für private Einkäufe ebenso wie für Offerten, Kalkulationen oder die Kontrolle einer Rechnung.",
          "Du kannst damit einen Prozentwert bestimmen und das Ergebnis anschliessend für einen neuen Preis verwenden. Für komplexere Veränderungen ist wichtig, zwischen Prozentpunkten und Prozent sowie zwischen einer einmaligen und einer mehrfachen Veränderung zu unterscheiden.",
        ],
        bullets: [
          "Rabatt oder Mehrwertsteuer eines Betrags berechnen",
          "Anteil einer Ausgabe am gesamten Budget bestimmen",
          "Erhöhung und Senkung eines Ausgangswerts nachvollziehen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Der Prozentwert entsteht aus Grundwert × Prozentsatz ÷ 100. Wenn der Prozentsatz aus Teil und Ganzem gesucht ist, lautet die Formel Teil ÷ Ganzes × 100. Ein neuer Wert nach einer Erhöhung wird mit 1 + Prozentsatz/100 multipliziert; bei einer Senkung wird der Prozentsatz abgezogen.",
          "Aufeinanderfolgende Prozentänderungen werden nicht einfach addiert. Steigt ein Wert zuerst um 10 % und sinkt danach um 10 %, liegt er unter dem Ausgangswert, weil die zweite Änderung auf einer anderen Basis berechnet wird. Ebenso erfordert die Rückkehr nach einem Verlust von 20 % eine Erhöhung um 25 %.",
        ],
      },
    ],
    formula: "Prozentwert = Grundwert × Prozentsatz ÷ 100. Der Grundwert entspricht dabei immer 100 Prozent.",
    example: "Beispiel: Bei einem Preis von CHF 120 und 15 % Rabatt beträgt der Nachlass CHF 18. Der neue Preis ist CHF 120 × (1 - 0,15) = CHF 102.",
    supportingContent: [
      "Achte bei Vergleichen darauf, dass beide Prozentangaben dieselbe Bezugsgrösse verwenden. Prozentpunkte beschreiben die Differenz zweier Prozentsätze, nicht die relative Veränderung.",
      "Bei Preisvergleichen lohnt es sich, zuerst den absoluten Betrag und danach die Prozentangabe zu prüfen. Ein Rabatt von 20 % auf einen bereits reduzierten Preis ist nicht dasselbe wie 40 % auf den ursprünglichen Preis. Auch bei Statistiken kann die Wahl des Ausgangswerts das Ergebnis stark verändern. Dokumentiere deshalb Grundwert, Teilwert und Rechenschritt. So bleibt nachvollziehbar, ob du einen Anteil, eine Veränderungsrate oder den neuen Endwert berechnet hast. Runde Geldbeträge erst am Ende der Rechnung auf Rappen. Das reduziert unnötige Rundungsfehler.",
    ],
    faqs: [
      { question: "Wie berechnet man einen Prozentsatz von einem Betrag?", answer: "Multipliziere den Betrag mit dem Prozentsatz und teile das Ergebnis durch 100." },
      { question: "Was ist der Grundwert?", answer: "Der Grundwert ist der vollständige Ausgangswert und entspricht 100 Prozent." },
      { question: "Kann ich Dezimalwerte eingeben?", answer: "Ja. Sowohl Grundwert als auch Prozentsatz dürfen Dezimalstellen enthalten." },
      { question: "Warum heben sich plus 10 % und minus 10 % nicht auf?", answer: "Die zweite Änderung wird auf dem bereits veränderten Wert berechnet. Dadurch bleibt am Ende ein Minus von 1 %." },
    ],
    relatedCalculators: ["mehrwertsteuer-rechner-schweiz", "zinsrechner", "kreditrechner"],
    guideLinks: [
      {
        href: "/de/ratgeber/mehrwertsteuer-schweiz-2026",
        label: "Mehrwertsteuer Schweiz 2026",
        description: "Wie Prozentrechnung bei MWST, Brutto- und Nettobetraegen korrekt angewendet wird.",
      },
    ],
    monetizationType: "adsense",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Prozentwert eines Grundwerts berechnen",
    inputs: [
      { key: "base", label: "Grundwert", defaultValue: "2500", step: "0.01" },
      { key: "rate", label: "Prozentsatz (%)", defaultValue: "18", step: "0.01" },
    ],
    resultLabels: ["Grundwert", "Prozentsatz", "Prozentwert"],
    cta: "Neue Alltags- und Finanzrechner kostenlos per E-Mail erhalten.",
  },
  {
    id: "de-interest",
    locale: "de",
    slug: "zinsrechner",
    kind: "compound-interest",
    category: "Kredit & Zinsen",
    title: "Zinsrechner: Zinseszins und Sparplan berechnen | Calcolich",
    metaDescription: "Zinseszins mit Startkapital, monatlicher Einzahlung, Zinssatz und Laufzeit berechnen. Kostenloser Online-Zinsrechner.",
    h1: "Zinsrechner",
    shortTitle: "Zinsrechner",
    intro: "Berechne, wie sich Startkapital und monatliche Einzahlungen bei einem konstanten Jahreszins entwickeln können.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Zinsrechner dient zur Planung von Sparkapital, Rücklagen und langfristigen Sparplänen. Er zeigt, welchen Anteil eigene Einzahlungen und welchen Anteil rechnerische Zinsen am Endkapital haben können.",
          "Das Werkzeug ist besonders nützlich, um Laufzeiten, Monatsraten und angenommene Zinssätze zu vergleichen. Es ist keine Anlageprognose: Renditen können schwanken, und ein höherer erwarteter Ertrag ist häufig mit einem höheren Risiko verbunden.",
        ],
        bullets: [
          "Einmalanlage und monatlichen Sparplan gemeinsam simulieren",
          "Wirkung einer längeren Laufzeit auf den Zinseszins vergleichen",
          "Unterschied zwischen Einzahlungen und rechnerischem Ertrag sehen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Beim einfachen Zins wird der Ertrag nur auf das Anfangskapital berechnet. Beim Zinseszins werden bereits gutgeschriebene Zinsen erneut verzinst. Für eine jährliche Verzinsung ohne weitere Einzahlungen gilt Kₙ = K₀ × (1 + p/100)ⁿ, wobei K₀ das Startkapital, p der Jahreszins und n die Anzahl Jahre ist.",
          "Dieser Rechner verwendet monatliche Perioden und fügt die Sparrate nach jeder Verzinsung hinzu. Eine jährliche statt monatliche Gutschrift führt bei gleichem Nominalzins zu einem leicht anderen Ergebnis. Bankgebühren, Wertschwankungen, Inflation und Schweizer Steuern auf Zinserträge sind in der Simulation nicht enthalten.",
        ],
      },
    ],
    formula: "Der Rechner verzinst das vorhandene Kapital monatlich und addiert danach die Monatsrate. Der jährliche Zinssatz wird dafür durch zwölf geteilt.",
    example: "Beispiel ohne Sparrate: CHF 10'000 zu 2 % pro Jahr wachsen bei jährlicher Verzinsung während fünf Jahren auf CHF 10'000 × 1,02⁵ = rund CHF 11'040.81. Davon sind etwa CHF 1'040.81 Zinseszins-Ertrag.",
    supportingContent: [
      "Die Rechnung ist eine Modellannahme mit konstantem Zinssatz. Gebühren, Steuern, Kursschwankungen und wechselnde Renditen sind nicht enthalten.",
      "Nutze für vorsichtige Planung mehrere Szenarien, zum Beispiel einen tiefen, mittleren und höheren Zinssatz. Vergleiche nicht nur den Endbetrag, sondern auch die Kaufkraft nach Inflation und die Verfügbarkeit des Geldes. Bei Wertschriften ist ein gleichmässiger Jahreszins eine Vereinfachung, weil positive und negative Jahre auftreten können. Zinserträge und Vermögen können steuerlich relevant sein. Für Anlageentscheidungen sind Risikotoleranz, Zeithorizont, Diversifikation und Kosten ebenso wichtig wie die mathematische Rendite. Prüfe zusätzlich, ob Einzahlungen am Monatsanfang oder Monatsende erfolgen, denn auch dieser Zeitpunkt verändert das Ergebnis leicht. Wiederhole den Vergleich regelmässig.",
    ],
    faqs: [
      { question: "Was bedeutet Zinseszins?", answer: "Erträge werden dem Kapital zugerechnet und in den folgenden Perioden ebenfalls verzinst." },
      { question: "Sind Gebühren und Steuern enthalten?", answer: "Nein. Der Rechner zeigt eine vereinfachte Bruttoentwicklung ohne Kosten und Steuern." },
      { question: "Ist der angezeigte Endwert garantiert?", answer: "Nein. Er ist eine mathematische Simulation mit konstantem Zinssatz, keine Renditegarantie." },
      { question: "Müssen Zinserträge versteuert werden?", answer: "Zinserträge gehören in der Schweiz grundsätzlich zum steuerbaren Einkommen. Die konkrete Belastung hängt von der persönlichen Situation ab." },
    ],
    relatedCalculators: ["kreditrechner", "prozentrechner", "budget-rechner-schweiz"],
    monetizationType: "affiliate",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Zinseszins und Sparplan mit monatlicher Einzahlung berechnen",
    inputs: [
      { key: "initial", label: "Startkapital (CHF)", defaultValue: "10000", min: "0" },
      { key: "monthly", label: "Monatliche Einzahlung (CHF)", defaultValue: "300", min: "0" },
      { key: "rate", label: "Jahreszins (%)", defaultValue: "3", step: "0.1" },
      { key: "years", label: "Laufzeit in Jahren", defaultValue: "10", min: "1", max: "80" },
    ],
    resultLabels: ["Einzahlungen", "Zinsertrag geschätzt", "Endkapital"],
    cta: "Neue Spar- und Finanzrechner sowie Vorlagen per E-Mail erhalten.",
  },
  {
    id: "de-pillar3a-tax",
    locale: "de",
    slug: "saeule-3a-steuerersparnis-rechner",
    kind: "pillar3a-tax-ch",
    category: "Finanzen",
    title: "Säule-3a-Steuerersparnis-Rechner Schweiz | Calcolich",
    metaDescription: "Steuerersparnis durch Säule-3a-Einzahlung in der Schweiz schätzen. Mit Grenzsteuersatz, Beispiel, FAQ und Quellen.",
    h1: "Säule-3a-Steuerersparnis-Rechner",
    shortTitle: "Säule 3a",
    intro: "Schätze, wie viel Steuern du durch eine Einzahlung in die Säule 3a sparen kannst.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Rechner hilft bei der Entscheidung, ob und in welcher Höhe eine Einzahlung in die gebundene Vorsorge 3a steuerlich interessant ist. Besonders nützlich ist er gegen Jahresende, bei Lohnänderungen oder beim Vergleich von Spar- und Investitionsvarianten.",
          "Die tatsächliche Entlastung hängt vom Grenzsteuersatz ab. Dieser wird durch Einkommen, Kanton, Gemeinde, Zivilstand, Kirchensteuer und weitere Abzüge beeinflusst.",
        ],
        bullets: [
          "Jährliche Steuerersparnis grob einschätzen",
          "Mehrere Jahre Einzahlung simulieren",
          "3a-Entscheidung mit Budget und Zinseszins vergleichen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Der Rechner multipliziert die geplante Einzahlung mit dem geschätzten Grenzsteuersatz. Das Ergebnis zeigt die mögliche Steuerersparnis für ein Jahr und hochgerechnet über die gewählte Anzahl Jahre.",
          "Nicht berücksichtigt sind Rendite, Gebühren, spätere Besteuerung beim Bezug, Sperrfristen und individuelle Limiten. Für verbindliche Planung müssen die aktuellen Höchstbeträge und die persönliche Steuerrechnung geprüft werden.",
        ],
      },
    ],
    formula: "Steuerersparnis pro Jahr = Einzahlung in die Säule 3a × geschätzter Grenzsteuersatz.",
    example: "Beispiel: Eine Einzahlung von CHF 7'056 bei einem Grenzsteuersatz von 24 % ergibt eine geschätzte Steuerersparnis von CHF 1'693.44 im Jahr.",
    supportingContent: [
      "Der Grenzsteuersatz ist nicht der Durchschnittssteuersatz. Er beschreibt, wie stark ein zusätzlicher abzugsfähiger Franken die Steuerrechnung ungefähr senkt.",
      "Prüfe die aktuellen 3a-Maximalbeträge, deine Vorsorgesituation und den Kanton. Ein 3a-Konto oder 3a-Depot sollte nicht nur wegen der Steuerersparnis gewählt werden.",
    ],
    faqs: [
      { question: "Ist die Steuerersparnis garantiert?", answer: "Nein. Sie hängt von deiner persönlichen Steuerrechnung und dem anwendbaren Grenzsteuersatz ab." },
      { question: "Welchen Grenzsteuersatz soll ich eingeben?", answer: "Nutze eine Schätzung aus einem kantonalen Steuerrechner oder aus einer Steuerberatung." },
      { question: "Berücksichtigt der Rechner Rendite?", answer: "Nein. Für Kapitalwachstum nutze zusätzlich den Zinsrechner." },
      { question: "Gilt der Rechner für Selbstständige?", answer: "Ja als Schätzung, aber die zulässigen Maximalbeträge unterscheiden sich je nach Anschluss an eine Pensionskasse." },
      { question: "Wird die Auszahlung besteuert?", answer: "Ja, der Bezug wird separat besteuert. Das ist in dieser einfachen Steuerersparnis nicht enthalten." },
    ],
    relatedCalculators: ["zinsrechner", "budget-rechner-schweiz", "quellensteuer-rechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/stundenlohn-berechnen-schweiz",
        label: "Lohn als Grundlage",
        description: "Warum Jahreslohn und Arbeitszeit fuer Steuer- und Vorsorgeplanung zusammengehoeren.",
      },
    ],
    monetizationType: "affiliate",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Steuerersparnis durch Saeule 3a in der Schweiz berechnen",
    updatedAt: "12. Juli 2026",
    sources: swissPensionSources,
    inputs: [
      { key: "contribution", label: "3a-Einzahlung (CHF)", defaultValue: "7056", min: "0" },
      { key: "marginalTaxRate", label: "Geschätzter Grenzsteuersatz (%)", defaultValue: "24", step: "0.1", min: "0", max: "60" },
      { key: "years", label: "Anzahl Jahre", defaultValue: "10", min: "1" },
    ],
    resultLabels: ["Steuerersparnis pro Jahr", "Einzahlungen total", "Steuerersparnis total"],
    cta: "Neue Schweizer Finanz- und Vorsorgerechner per E-Mail erhalten.",
  },
  {
    id: "de-loan",
    locale: "de",
    slug: "kreditrechner",
    kind: "loan-payment",
    category: "Kredit & Zinsen",
    title: "Kreditrechner: Rate und Zinskosten online berechnen | Calcolich",
    metaDescription: "Monatliche Kreditrate, Gesamtzahlung und Zinskosten aus Kreditsumme, Laufzeit und Jahreszins berechnen.",
    h1: "Kreditrechner",
    shortTitle: "Kreditrechner",
    intro: "Berechne die konstante Monatsrate eines Kredits und vergleiche Gesamtzahlung und Zinskosten.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Kreditrechner hilft vor einer Finanzierung zu prüfen, ob eine Monatsrate ins Budget passt. Er zeigt nicht nur die Rate, sondern auch die Summe aller Zahlungen und damit die rechnerischen Zinskosten über die gesamte Laufzeit.",
          "Nutze ihn, um verschiedene Laufzeiten oder Zinssätze zu vergleichen. Eine tiefere Rate wirkt bequem, kann aber durch eine längere Laufzeit zu höheren Gesamtkosten führen. Für einen Angebotsvergleich ist der effektive Jahreszins wichtiger als ein isolierter Werbezins.",
        ],
        bullets: [
          "Monatsrate für Konsumkredit oder andere Ratenfinanzierung schätzen",
          "Kurze und lange Laufzeiten gegenüberstellen",
          "Gesamtkosten vor Vertragsabschluss sichtbar machen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Für eine konstante Annuität gilt R = S₀ × ((1+i)ⁿ × i) ÷ ((1+i)ⁿ - 1). R ist die Monatsrate, S₀ die anfängliche Kreditsumme, i der monatliche Zinssatz und n die Zahl der Monatsraten. Der monatliche Satz entsteht aus dem Jahreszins geteilt durch zwölf.",
          "Jede Rate enthält Zins und Tilgung. Zu Beginn ist der Zinsanteil höher, später nimmt der Tilgungsanteil zu. Bearbeitungsgebühren, Restschuldversicherungen, Verzugszinsen oder Kosten für eine vorzeitige Ablösung sind nicht automatisch enthalten und müssen anhand des konkreten Vertrags geprüft werden.",
        ],
      },
    ],
    formula: "Bei einem Annuitätendarlehen wird die Monatsrate aus Kreditsumme, monatlichem Zinssatz und Anzahl Raten berechnet. Bei null Prozent wird die Summe gleichmässig aufgeteilt.",
    example: "Beispiel: Ein Kredit von CHF 30'000 zu 4 % Jahreszins über 60 Monate ergibt mit der Annuitätenformel eine Rate von rund CHF 552.50. Insgesamt werden ungefähr CHF 33'150 bezahlt; rund CHF 3'150 davon sind Zinsen.",
    supportingContent: [
      "Anbieter können zusätzlich Gebühren, Versicherungen oder abweichende Berechnungsmethoden verwenden. Vergleiche deshalb immer den effektiven Jahreszins und das verbindliche Angebot.",
      "Prüfe vor Vertragsabschluss, ob die Rate auch bei unerwarteten Ausgaben tragbar bleibt. Eine Reserve verhindert, dass kleine Störungen sofort zu Zahlungsverzug führen. Vergleiche Angebote mit identischer Kreditsumme und Laufzeit und lies die Bedingungen für Sondertilgung oder vorzeitige Rückzahlung. Ein tiefer Monatsbetrag ist kein ausreichendes Qualitätsmerkmal. Entscheidend sind Gesamtzahlung, effektiver Jahreszins, Gebühren und Flexibilität. Der Rechner ersetzt weder die Kreditfähigkeitsprüfung noch das verbindliche Angebot eines Finanzinstituts. Plane die Rate stets zusammen mit deinen übrigen Fixkosten.",
    ],
    faqs: [
      { question: "Was zeigt die Monatsrate?", answer: "Sie zeigt die rechnerisch konstante Rate aus Tilgung und Zins für die gewählte Laufzeit." },
      { question: "Was passiert bei längerer Laufzeit?", answer: "Die Monatsrate sinkt meist, während die gesamten Zinskosten in der Regel steigen." },
      { question: "Sind Kreditgebühren enthalten?", answer: "Nein. Der Rechner berücksichtigt nur Kreditsumme, Laufzeit und eingegebenen Zinssatz." },
      { question: "Was ist der Unterschied zwischen festem und variablem Zins?", answer: "Ein fester Satz bleibt für die vereinbarte Periode konstant. Ein variabler Satz kann sich ändern und damit auch Rate oder Laufzeit beeinflussen." },
    ],
    relatedCalculators: ["zinsrechner", "prozentrechner", "budget-rechner-schweiz"],
    monetizationType: "affiliate",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Kreditrate und gesamte Zinskosten berechnen",
    inputs: [
      { key: "principal", label: "Kreditsumme (CHF)", defaultValue: "25000", min: "0" },
      { key: "months", label: "Laufzeit in Monaten", defaultValue: "48", min: "1", max: "360" },
      { key: "rate", label: "Jahreszins (%)", defaultValue: "5.9", step: "0.1", min: "0" },
    ],
    resultLabels: ["Monatsrate", "Gesamtzahlung", "Zinskosten"],
    cta: "Checklisten für Budget und Finanzentscheidungen per E-Mail erhalten.",
  },
  {
    id: "de-mortgage-affordability",
    locale: "de",
    slug: "hypotheken-tragbarkeit-rechner-schweiz",
    kind: "mortgage-affordability-ch",
    category: "Finanzen",
    title: "Hypotheken-Tragbarkeit-Rechner Schweiz | Calcolich",
    metaDescription: "Tragbarkeit einer Hypothek in der Schweiz mit Einkommen, Kaufpreis, Eigenmitteln, kalkulatorischem Zinssatz und Nebenkosten schätzen.",
    h1: "Hypotheken-Tragbarkeit-Rechner Schweiz",
    shortTitle: "Hypotheken-Tragbarkeit",
    intro: "Prüfe, ob die theoretischen Kosten einer Hypothek im Verhältnis zu deinem Bruttoeinkommen tragbar wirken.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Tragbarkeit-Rechner hilft vor Besichtigung, Kaufangebot oder Bankgespräch. Er zeigt, wie stark ein Immobilienkauf das Bruttoeinkommen belasten würde.",
          "Schweizer Banken rechnen oft nicht nur mit dem aktuellen Marktzins, sondern mit einem kalkulatorischen Zinssatz und zusätzlichen Kosten für Unterhalt und Nebenkosten. Dadurch soll die Finanzierung auch bei höheren Zinsen tragbar bleiben.",
        ],
        bullets: [
          "Kaufpreis und Eigenmittel grob prüfen",
          "Kalkulatorische Jahreskosten simulieren",
          "Belastung mit einem Grenzwert wie 33 % vergleichen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Der Rechner zieht die Eigenmittel vom Kaufpreis ab und erhält so eine geschätzte Hypothek. Darauf werden kalkulatorische Zinsen berechnet. Zusätzlich werden Unterhalt und Nebenkosten als Prozent des Kaufpreises addiert.",
          "Die Summe dieser Jahreskosten wird dem Bruttoeinkommen gegenübergestellt. Eine Quote über dem gewählten Grenzwert ist ein Hinweis, dass mehr Eigenmittel, ein tieferer Kaufpreis oder eine genauere Bankprüfung nötig sein können.",
        ],
      },
    ],
    formula: "Tragbarkeit = (Hypothek × kalkulatorischer Zinssatz + Kaufpreis × Nebenkostenquote) ÷ Bruttoeinkommen × 100.",
    example: "Beispiel: CHF 850'000 Kaufpreis, CHF 180'000 Eigenmittel und 5 % kalkulatorischer Zins ergeben CHF 670'000 Hypothek. Mit 1 % Nebenkosten entstehen CHF 42'000 theoretische Jahreskosten.",
    supportingContent: [
      "Der Rechner berücksichtigt keine Amortisation, keine Objektbewertung und keine bankinternen Ausnahmen. Er ist ein Vorab-Check, keine Finanzierungszusage.",
      "Für eine verbindliche Beurteilung prüfen Banken Einkommen, Eigenmittel, Objekt, Alter, Pensionskasse, bestehende Schulden und langfristige Tragbarkeit.",
    ],
    faqs: [
      { question: "Warum wird ein kalkulatorischer Zinssatz verwendet?", answer: "Damit die Finanzierung auch bei höheren Zinsen tragbar bleibt. Der Satz ist eine konservative Simulation." },
      { question: "Ist 33 % eine fixe Grenze?", answer: "Nein. Ein Drittel des Bruttoeinkommens ist eine verbreitete Orientierung, Banken können eigene Regeln anwenden." },
      { question: "Sind Amortisationen enthalten?", answer: "Nein. Der Rechner zeigt Zinsen und Nebenkosten. Amortisation muss separat berücksichtigt werden." },
      { question: "Wie viel Eigenkapital brauche ich?", answer: "Häufig werden mindestens 20 % erwartet, aber Herkunft und Zusammensetzung der Eigenmittel sind wichtig." },
      { question: "Ersetzt das eine Bankofferte?", answer: "Nein. Es ist eine erste Plausibilisierung vor einer professionellen Finanzierungsprüfung." },
    ],
    relatedCalculators: ["budget-rechner-schweiz", "zinsrechner", "mietbudget-rechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/pausenregelung-arbeitszeit-schweiz",
        label: "Einkommen und Arbeitszeit verstehen",
        description: "Arbeitszeit und Lohn sauber einordnen, bevor langfristige Wohnkosten geplant werden.",
      },
    ],
    monetizationType: "lead",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Tragbarkeit einer Schweizer Hypothek vor dem Bankgespraech pruefen",
    updatedAt: "12. Juli 2026",
    sources: swissMortgageSources,
    inputs: [
      { key: "grossIncome", label: "Bruttoeinkommen pro Jahr (CHF)", defaultValue: "150000", min: "0" },
      { key: "propertyPrice", label: "Kaufpreis Immobilie (CHF)", defaultValue: "850000", min: "0" },
      { key: "equity", label: "Eigenmittel (CHF)", defaultValue: "180000", min: "0" },
      { key: "imputedRate", label: "Kalkulatorischer Zinssatz (%)", defaultValue: "5", step: "0.1", min: "0" },
      { key: "ancillaryRate", label: "Unterhalt und Nebenkosten (%)", defaultValue: "1", step: "0.1", min: "0" },
      { key: "maxShare", label: "Maximaler Einkommensanteil (%)", defaultValue: "33", step: "1", min: "1", max: "80" },
    ],
    resultLabels: ["Hypothek geschätzt", "Theoretische Jahreskosten", "Tragbarkeit"],
    cta: "Neue Rechner fuer Wohnen, Hypothek und Schweizer Budget per E-Mail erhalten.",
  },
  {
    id: "de-budget-ch",
    locale: "de",
    slug: "budget-rechner-schweiz",
    kind: "monthly-budget-ch",
    category: "Haushalt & Budget",
    title: "Budget-Rechner Schweiz: Monatsbudget einfach planen | Calcolich",
    metaDescription: "Monatliches Haushaltsbudget für die Schweiz berechnen. Einkommen, Wohnen, Krankenkasse und weitere Ausgaben übersichtlich vergleichen.",
    h1: "Budget-Rechner Schweiz",
    shortTitle: "Budget-Rechner",
    intro: "Stelle dein monatliches Einkommen den wichtigsten Fixkosten gegenüber und ermittle freien Betrag und Sparquote.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Budget-Rechner schafft einen schnellen Überblick über Einkommen, Fixkosten und frei verfügbaren Betrag. Er eignet sich für den ersten eigenen Haushalt, einen Umzug, eine Lohnveränderung oder die Vorbereitung eines Spar- und Schuldenplans.",
          "Ein Budget ist besonders aussagekräftig, wenn auch unregelmässige Ausgaben berücksichtigt werden. Jahresprämien, Steuern, Reparaturen und Ferien sollten auf einen Monatswert umgerechnet werden, damit der scheinbar freie Betrag nicht zu hoch ausfällt.",
        ],
        bullets: [
          "Miete, Nebenkosten, Strom und Telekommunikation erfassen",
          "Lebensmittel, Versicherungen, Auto oder öffentlichen Verkehr einplanen",
          "Freizeit, Rücklagen, Steuern und Schuldenraten berücksichtigen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Der Rechner addiert Wohnen, Krankenkasse und weitere Ausgaben und zieht sie vom Nettoeinkommen ab. Der verbleibende Betrag wird als rechnerische Sparquote ins Verhältnis zum Einkommen gesetzt. Ein negativer Saldo zeigt, dass die eingegebenen Ausgaben das verfügbare Einkommen übersteigen.",
          "Als Orientierung teilt die 50-30-20-Regel das Netto in 50 % notwendige Ausgaben, 30 % Wünsche und 20 % Sparen oder Schuldentilgung. Häufig wird zudem empfohlen, die Wohnkosten ungefähr unter einem Drittel des Nettoeinkommens zu halten. Beides sind Richtwerte: In Regionen mit hohen Mieten, bei Familien oder tiefem Einkommen muss die Aufteilung realistisch angepasst werden.",
        ],
      },
    ],
    formula: "Gesamtausgaben = Wohnen + Krankenkasse + weitere Ausgaben. Der Saldo ist Einkommen minus Gesamtausgaben; die Sparquote entspricht Saldo geteilt durch Einkommen mal 100.",
    example: "Beispiel nach 50-30-20: Bei CHF 5'000 netto entfallen als Orientierung CHF 2'500 auf notwendige Ausgaben, CHF 1'500 auf Wünsche und CHF 1'000 auf Sparen oder zusätzliche Schuldentilgung.",
    supportingContent: [
      "Nutze bei den weiteren Ausgaben möglichst einen realistischen Monatsdurchschnitt für Lebensmittel, Mobilität, Versicherungen, Freizeit und unregelmässige Jahresrechnungen.",
      "Ein brauchbares Budget wird regelmässig mit den tatsächlichen Kontobewegungen verglichen. Plane neben Fixkosten auch Rückstellungen für Franchise und Selbstbehalt, Fahrzeugservice, Zahnarzt, Geschenke oder Ersatzanschaffungen ein. Eine Notfallreserve sollte getrennt vom Ferien- oder Konsumbudget geführt werden. Wenn der Saldo negativ bleibt, priorisiere zuerst Wohnen, Gesundheit, Lebensmittel und vertragliche Verpflichtungen. Danach können variable Wünsche reduziert oder Zahlungspläne frühzeitig mit Gläubigern besprochen werden. Aktualisiere die Zahlen mindestens bei jeder grösseren Vertrags- oder Lohnänderung.",
    ],
    faqs: [
      { question: "Welche Ausgaben gehören ins Monatsbudget?", answer: "Neben Wohnen und Krankenkasse gehören auch Lebensmittel, Mobilität, Versicherungen, Steuern, Freizeit und Rückstellungen dazu." },
      { question: "Was bedeutet eine negative Sparquote?", answer: "Dann liegen die eingegebenen Ausgaben über dem Einkommen. Das Budget weist ein monatliches Defizit aus." },
      { question: "Wie berücksichtige ich Jahresrechnungen?", answer: "Teile erwartete Jahreskosten durch zwölf und addiere den Betrag zu den weiteren monatlichen Ausgaben." },
      { question: "Wie passe ich 50-30-20 bei Schulden an?", answer: "Reduziere zuerst den Anteil für Wünsche und verwende einen grösseren Teil für Mindestzahlungen, Tilgung und eine kleine Notfallreserve." },
    ],
    relatedCalculators: ["lohnrechner-schweiz", "kreditrechner", "zinsrechner"],
    guideLinks: [
      {
        href: "/de/ratgeber/mehrwertsteuer-schweiz-2026",
        label: "Mehrwertsteuer Schweiz 2026",
        description: "MWST-Betraege im Budget und in Schweizer Rechnungen besser einordnen.",
      },
      {
        href: "/de/ratgeber/stundenlohn-berechnen-schweiz",
        label: "Stundenlohn berechnen",
        description: "Lohnmodelle als Grundlage fuer ein realistisches Monatsbudget vergleichen.",
      },
    ],
    monetizationType: "lead",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Monatliches Haushaltsbudget in der Schweiz berechnen",
    inputs: [
      { key: "income", label: "Nettoeinkommen pro Monat (CHF)", defaultValue: "5500", min: "0" },
      { key: "rent", label: "Miete und Wohnen (CHF)", defaultValue: "1800", min: "0" },
      { key: "healthInsurance", label: "Krankenkasse (CHF)", defaultValue: "450", min: "0" },
      { key: "otherCosts", label: "Weitere Ausgaben (CHF)", defaultValue: "1950", min: "0" },
    ],
    resultLabels: ["Gesamtausgaben", "Sparquote", "Monatlicher Saldo"],
    cta: "Die kommende Budgetvorlage und neue Schweizer Rechner per E-Mail erhalten.",
  },
  {
    id: "de-working-days-ch",
    locale: "de",
    slug: "arbeitstage-rechner-schweiz",
    kind: "working-days-ch",
    category: "Zeit & Datum",
    title: "Arbeitstage-Rechner Schweiz: Arbeitstage einfach berechnen | Calcolich",
    metaDescription: "Arbeitstage in der Schweiz schätzen: Kalendertage, Wochenenden, Feiertage und Ferien abziehen und Netto-Arbeitstage erhalten.",
    h1: "Arbeitstage-Rechner Schweiz",
    shortTitle: "Arbeitstage-Rechner",
    intro: "Schätze Arbeitstage für einen Zeitraum, indem du Wochenenden, Feiertage und geplante Ferientage von den Kalendertagen abziehst.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Arbeitstage-Rechner eignet sich für Einsatzplanung, Projektbudget, Ferienplanung und grobe Monatsvergleiche. Er ist bewusst transparent: Du gibst die Kalendertage und die Abzüge selbst ein.",
          "In der Schweiz unterscheiden sich Feiertage je nach Kanton und teilweise Gemeinde. Deshalb ist ein fixer nationaler Arbeitstagewert oft zu ungenau, wenn du Lohn, Fristen oder Ressourcen planst.",
        ],
        bullets: [
          "Projekt- und Einsatzzeiträume grob planen",
          "Kantonale Feiertage manuell berücksichtigen",
          "Ferien oder unbezahlte Abwesenheiten abziehen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Ausgangspunkt sind alle Kalendertage des betrachteten Zeitraums. Davon ziehst du Wochenendtage, kantonale Feiertage und geplante Ferientage ab.",
          "Das Ergebnis ist eine rechnerische Nettozahl. Für verbindliche Fristen, Lohnabrechnungen und Schichtpläne können Vertragsregeln, kantonale Feiertage und betriebliche Arbeitstage abweichen.",
        ],
      },
    ],
    formula: "Arbeitstage = Kalendertage minus Wochenendtage minus Feiertage minus Ferientage.",
    example: "Beispiel: Ein Monat mit 31 Kalendertagen, 8 Wochenendtagen, 1 kantonalem Feiertag und 2 Ferientagen ergibt 20 Arbeitstage.",
    supportingContent: [
      "Nutze für Feiertage die Regelung deines Arbeitskantons oder deines Betriebs. Einige Feiertage gelten nicht in allen Kantonen gleich.",
      "Der Rechner ist für Planung gedacht. Für arbeitsrechtliche oder behördliche Fristen solltest du die zuständige Stelle oder die konkreten Fristenregeln prüfen.",
    ],
    faqs: [
      { question: "Sind Schweizer Feiertage automatisch enthalten?", answer: "Nein. Feiertage sind kantonal unterschiedlich und werden deshalb als eigenes Eingabefeld geführt." },
      { question: "Kann ich Ferien abziehen?", answer: "Ja. Trage geplante Ferientage separat ein, damit sie vom Arbeitstagewert abgezogen werden." },
      { question: "Funktioniert der Rechner für Teilzeit?", answer: "Ja, wenn du die Abzüge passend zu deinen effektiven Arbeitstagen eingibst. Bei Teilzeit sind Arbeitstage nicht identisch mit Beschäftigungsgrad." },
      { question: "Kann ich damit Projektaufwand planen?", answer: "Ja, für eine grobe Ressourcenplanung. Für verbindliche Termine solltest du interne Kalender und Feiertage prüfen." },
      { question: "Ist das Ergebnis offiziell?", answer: "Nein. Es ist eine transparente Schätzung auf Basis deiner Eingaben." },
    ],
    relatedCalculators: ["arbeitszeitrechner", "ferienrechner-schweiz", "stundenrechner"],
    guideLinks: [
      {
        href: "/de/ratgeber/ferienanspruch-teilzeit-schweiz",
        label: "Ferienanspruch bei Teilzeit",
        description: "Warum Arbeitstage und Ferienwochen bei Teilzeit sauber umgerechnet werden muessen.",
      },
      {
        href: "/de/ratgeber/pausenregelung-arbeitszeit-schweiz",
        label: "Arbeitszeit und Pausenregelung",
        description: "Arbeitszeit, Pausen und Arbeitstage gemeinsam planen.",
      },
    ],
    monetizationType: "adsense",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Arbeitstage in der Schweiz mit Feiertagen und Ferien berechnen",
    updatedAt: "12. Juli 2026",
    sources: [
      { label: "ch.ch: Feiertage in der Schweiz", href: "https://www.ch.ch/de/arbeit/arbeitszeit/feiertage/" },
      ...swissVacationSources,
    ],
    inputs: [
      { key: "calendarDays", label: "Kalendertage", defaultValue: "31", min: "0" },
      { key: "weekendDays", label: "Wochenendtage", defaultValue: "8", min: "0" },
      { key: "publicHolidays", label: "Feiertage", defaultValue: "1", min: "0" },
      { key: "vacationDays", label: "Ferientage", defaultValue: "0", min: "0" },
    ],
    resultLabels: ["Kalendertage", "Abzüge", "Arbeitstage"],
    cta: "Neue Kalender-, Arbeitszeit- und Ferienrechner per E-Mail erhalten.",
  },
  {
    id: "de-hourly-wage-ch",
    locale: "de",
    slug: "stundenlohn-rechner-schweiz",
    kind: "hourly-wage-ch",
    category: "Arbeit & Lohn",
    title: "Stundenlohnrechner Schweiz: Monatslohn in Stundenlohn umrechnen | Calcolich",
    metaDescription: "Stundenlohn in der Schweiz aus Monatslohn, Wochenstunden und bezahlten Wochen berechnen. Mit Beispiel und Formel.",
    h1: "Stundenlohnrechner Schweiz",
    shortTitle: "Stundenlohnrechner",
    intro: "Rechne einen Monatslohn in einen geschätzten Stundenlohn um und vergleiche Lohnmodelle auf derselben Basis.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Stundenlohnrechner hilft beim Vergleich von Monatslohn, Teilzeit, Stundenlohnangeboten und Nebenjobs. Ein Stundenwert macht sichtbar, wie stark Wochenarbeitszeit und bezahlte Wochen den Vergleich verändern.",
          "In der Schweiz werden Löhne oft als Monatslohn angegeben. Für Jobs mit Stundenlohn, unregelmässigen Einsätzen oder 13. Monatslohn ist der Jahresvergleich meist klarer als der Blick auf eine einzelne Monatszahl.",
        ],
        bullets: [
          "Monatslohn in Stundenlohn umrechnen",
          "Stellenangebote mit unterschiedlicher Wochenarbeitszeit vergleichen",
          "Grundlage für Überstunden- oder Ferienzuschläge vorbereiten",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Der Rechner multipliziert den Monatslohn mit zwölf und teilt den Jahreslohn durch die jährlichen Arbeitsstunden. Die jährlichen Arbeitsstunden entstehen aus Wochenstunden mal bezahlten Wochen pro Jahr.",
          "Wenn ein 13. Monatslohn bezahlt wird, solltest du entweder den durchschnittlichen Monatslohn erhöhen oder den Jahreslohn separat prüfen. Ferienzuschläge bei unregelmässigem Stundenlohn müssen transparent ausgewiesen werden.",
        ],
      },
    ],
    formula: "Stundenlohn = Monatslohn × 12 ÷ (Wochenstunden × bezahlte Wochen pro Jahr).",
    example: "Beispiel: CHF 6'300 Monatslohn bei 42 Wochenstunden und 52 bezahlten Wochen ergibt CHF 6'300 × 12 ÷ (42 × 52) = CHF 34.62 pro Stunde.",
    supportingContent: [
      "Der berechnete Wert ist brutto oder netto je nachdem, welchen Monatslohn du eingibst. Für einen fairen Vergleich sollten alle Angebote auf derselben Basis stehen.",
      "Berücksichtige zusätzlich 13. Monatslohn, Ferienentschädigung, Zulagen, Pensionskasse und Versicherungsabzüge. Der Rechner ersetzt keine Lohnabrechnung.",
    ],
    faqs: [
      { question: "Ist der berechnete Stundenlohn brutto oder netto?", answer: "Er entspricht der Art des eingegebenen Monatslohns. Bruttolohn ergibt Bruttostundenlohn, Nettolohn ergibt Nettostundenlohn." },
      { question: "Wie berücksichtige ich den 13. Monatslohn?", answer: "Rechne den 13. Monatslohn in den Jahreslohn ein oder erhöhe den durchschnittlichen Monatslohn entsprechend." },
      { question: "Welche Wochenzahl soll ich verwenden?", answer: "Für eine einfache Jahresbetrachtung sind 52 bezahlte Wochen üblich. Bei unbezahlten Wochen kannst du den Wert reduzieren." },
      { question: "Kann ich Teilzeit vergleichen?", answer: "Ja. Trage die effektiven Wochenstunden deines Teilzeitpensums ein." },
      { question: "Sind Ferienzuschläge enthalten?", answer: "Nein. Ferienzuschläge müssen separat geprüft und bei Stundenlohn transparent ausgewiesen werden." },
    ],
    relatedCalculators: ["lohnrechner-schweiz", "arbeitszeitrechner", "ueberstundenrechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/stundenlohn-berechnen-schweiz",
        label: "Stundenlohn berechnen",
        description: "Monatslohn, Jahreslohn, 13. Monatslohn und Ferienzuschlag richtig einordnen.",
      },
      {
        href: "/de/ratgeber/ueberstunden-schweiz-berechnen",
        label: "Überstunden berechnen",
        description: "Wie der Stundenlohn in die Auszahlung von Überstunden einfliesst.",
      },
    ],
    monetizationType: "mixed",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Stundenlohn in der Schweiz aus Monatslohn berechnen",
    updatedAt: "12. Juli 2026",
    sources: swissVacationSources,
    inputs: [
      { key: "monthlySalary", label: "Monatslohn (CHF)", defaultValue: "6300", min: "0" },
      { key: "hoursPerWeek", label: "Wochenstunden", defaultValue: "42", step: "0.1", min: "1" },
      { key: "weeksPerYear", label: "Bezahlte Wochen pro Jahr", defaultValue: "52", step: "0.1", min: "1" },
    ],
    resultLabels: ["Jahreslohn", "Jahresstunden", "Stundenlohn"],
    cta: "Neue Lohn- und Arbeitszeitrechner für die Schweiz per E-Mail erhalten.",
  },
  {
    id: "de-vacation-ch",
    locale: "de",
    slug: "ferienrechner-schweiz",
    kind: "vacation-ch",
    category: "Zeit & Datum",
    title: "Ferienrechner Schweiz: Ferienanspruch berechnen | Calcolich",
    metaDescription: "Ferientage für die Schweiz aus Arbeitstagen, Ferienwochen und Beschäftigungsmonaten berechnen. Schnell und kostenlos.",
    h1: "Ferienrechner Schweiz",
    shortTitle: "Ferienrechner",
    intro: "Berechne deinen jährlichen Ferienanspruch und den anteiligen Anspruch für eine bestimmte Anzahl Beschäftigungsmonate.",
    contentSections: [
      {
        heading: "Wann ist dieser Rechner nützlich?",
        paragraphs: [
          "Der Ferienrechner hilft beim Eintritt oder Austritt während des Jahres, bei Teilzeit und beim Vergleich des eigenen Saldos mit der Personalabrechnung. Er wandelt Ferienwochen in Arbeitstage um und berechnet einen zeitanteiligen Anspruch für die eingegebenen Beschäftigungsmonate.",
          "Entscheidend sind die vertraglichen Arbeitstage, nicht einfach der Beschäftigungsgrad in Prozent. Wer 60 % an drei vollen Tagen arbeitet, erhält bei fünf Ferienwochen 15 Ferientage; damit können ebenfalls fünf vollständige Arbeitswochen frei genommen werden.",
        ],
        bullets: [
          "Jahresanspruch aus Arbeitstagen und Ferienwochen bestimmen",
          "Anteiliges Guthaben bei Eintritt oder Austritt berechnen",
          "Teilzeitmodelle mit unterschiedlich verteilten Arbeitstagen vergleichen",
        ],
      },
      {
        heading: "So funktioniert die Berechnung",
        paragraphs: [
          "Nach Artikel 329a OR beträgt der Mindestanspruch bis zum vollendeten 20. Altersjahr fünf Wochen, danach vier Wochen pro Dienstjahr. Mindestens zwei Ferienwochen müssen zusammenhängen. Verträge und Gesamtarbeitsverträge dürfen einen höheren Anspruch vorsehen.",
          "Der Rechner multipliziert Arbeitstage pro Woche mit Ferienwochen. Für einen Teil des Jahres wird dieser Wert mit den Beschäftigungsmonaten geteilt durch zwölf multipliziert. Ferien sollen grundsätzlich tatsächlich bezogen und während des laufenden Arbeitsverhältnisses nicht durch Geld ersetzt werden; bei unregelmässiger Teilzeit und am Ende eines Arbeitsverhältnisses bestehen begrenzte Ausnahmen.",
        ],
      },
    ],
    formula: "Ferientage pro Jahr = Arbeitstage pro Woche × Ferienwochen. Der anteilige Anspruch entspricht den Jahrestagen × Beschäftigungsmonate ÷ 12.",
    example: "Beispiel: Ein 60-%-Pensum verteilt auf drei Arbeitstage pro Woche mit fünf Ferienwochen ergibt 3 × 5 = 15 Ferientage pro Jahr. Nach sechs Beschäftigungsmonaten beträgt der rechnerische Anspruch 7,5 Tage.",
    supportingContent: [
      "Der Rechner zeigt einen mathematischen Anspruch. Arbeitsvertrag, Eintritts- und Austrittsdatum, unbezahlter Urlaub sowie Rundungsregeln können den offiziellen Saldo beeinflussen.",
      "Vom berechneten Anspruch müssen bereits bezogene Tage und genehmigte Überträge abgezogen werden. Bei Krankheit während geplanter Ferien ist entscheidend, ob der Erholungszweck tatsächlich verhindert war; ein ärztlicher Nachweis kann erforderlich sein. Längere Abwesenheiten können unter bestimmten Voraussetzungen zu einer Kürzung führen. Ferienzeitpunkt und Übertrag werden mit dem Arbeitgeber abgestimmt. Bei Beendigung des Arbeitsverhältnisses sollen Restferien grundsätzlich bezogen werden, soweit dies während der Kündigungsfrist möglich und zumutbar ist.",
    ],
    faqs: [
      { question: "Wie viele Ferientage ergeben vier Ferienwochen?", answer: "Bei fünf Arbeitstagen pro Woche sind es 20 Tage; bei vier Arbeitstagen sind es 16 Tage." },
      { question: "Werden angebrochene Monate berücksichtigt?", answer: "Der Rechner arbeitet mit der eingegebenen Anzahl Monate. Für genaue Tagesabrechnungen gelten die Regeln des Arbeitgebers." },
      { question: "Gilt das Ergebnis als offizieller Feriensaldo?", answer: "Nein. Bereits bezogene Ferien, Überträge und vertragliche Regeln müssen zusätzlich berücksichtigt werden." },
      { question: "Verfallen nicht bezogene Ferien?", answer: "Ferienansprüche verjähren grundsätzlich nach fünf Jahren. Die Frist beginnt nach Ablauf des Jahres, für das die Ferien bestimmt waren." },
      { question: "Was passiert bei Krankheit während der Ferien?", answer: "Wenn Krankheit oder Unfall den Erholungszweck verhindert, können die betroffenen Tage mit entsprechendem Nachweis nachgewährt werden." },
    ],
    relatedCalculators: ["stundenrechner", "arbeitszeitrechner", "lohnrechner-schweiz"],
    guideLinks: [
      {
        href: "/de/ratgeber/ferienanspruch-teilzeit-schweiz",
        label: "Ferienanspruch bei Teilzeit",
        description: "Gesetzliches Minimum, Teilzeitberechnung, zwei zusammenhaengende Wochen und Krankheit.",
      },
      {
        href: "/de/ratgeber/pausenregelung-arbeitszeit-schweiz",
        label: "Pausenregelung und Arbeitszeit",
        description: "Arbeitszeit, Pausen und Ferienplanung gemeinsam nachvollziehen.",
      },
    ],
    monetizationType: "lead",
    schemaType: "WebApplication",
    isPriority: true,
    searchIntent: "Ferienanspruch in der Schweiz anteilig berechnen",
    updatedAt: "12. Juli 2026",
    sources: swissVacationSources,
    inputs: [
      { key: "daysPerWeek", label: "Arbeitstage pro Woche", defaultValue: "5", step: "0.5", min: "1", max: "7" },
      { key: "weeks", label: "Ferienwochen pro Jahr", defaultValue: "4", step: "0.5", min: "1", max: "10" },
      { key: "months", label: "Beschäftigungsmonate", defaultValue: "12", min: "1", max: "12" },
    ],
    resultLabels: ["Ferientage pro Jahr", "Berücksichtigte Monate", "Anteiliger Anspruch"],
    cta: "Neue Rechner und Vorlagen für Arbeit und Ferien per E-Mail erhalten.",
  },
];

export const germanPriorityCalculators = germanPriorityCalculatorData.map(toCalculator);

export function getGermanPriorityCalculator(slug: string) {
  return germanPriorityCalculators.find((calculator) => calculator.slug === slug);
}
