import type { GermanLongTailArticle } from "./types";

export const mehrwertsteuerSchweiz2026 = {
  status: "published",
  locale: "de",
  slug: "mehrwertsteuer-schweiz-2026",
  title: "Mehrwertsteuer Schweiz 2026: Sätze, Formeln und Beispiele",
  metaTitle: "Mehrwertsteuer Schweiz 2026: Sätze und Beispiele | Calcolich",
  metaDescription: "Schweizer Mehrwertsteuer 2026: Normalsatz 8,1 %, Beherbergung 3,8 %, reduziert 2,6 % sowie Netto-Brutto-Formeln und Beispiele.",
  targetKeywords: ["mehrwertsteuer schweiz 2026", "mwst berechnen"],
  intro: [
    "Die Schweizer Mehrwertsteuer kennt drei aktuelle Sätze: 8,1 % als Normalsatz, 2,6 % als reduzierten Satz und 3,8 % als Sondersatz für Beherbergungsleistungen. Für eine korrekte Rechnung reicht es nicht, irgendeinen Prozentsatz auf den Preis anzuwenden. Zuerst muss geklärt werden, welcher Satz zur konkreten Leistung gehört und ob der eingegebene Betrag netto oder bereits brutto ist.",
    "Diese Anleitung erklärt die wichtigsten Kategorien, zeigt die Formeln für Aufschlagen und Herausrechnen und behandelt Einfuhrsteuer sowie Vorsteuer in Grundzügen. Für eine schnelle Rechnung kannst du den Mehrwertsteuer-Rechner Schweiz verwenden.",
  ],
  sections: [
    {
      heading: "Die drei MWST-Sätze im Überblick",
      body: [
        "Der Normalsatz von 8,1 % gilt für alle steuerbaren Leistungen, die nicht ausdrücklich dem reduzierten Satz oder dem Beherbergungssatz zugeordnet sind. Typische Beispiele sind Beratungsleistungen, Elektronik, Kleidung, Fahrzeuge, Reparaturen und viele digitale Dienstleistungen. Im Zweifelsfall ist der Normalsatz der Ausgangspunkt, bis eine gesetzliche Ausnahme bestätigt ist.",
        "Der reduzierte Satz von 2,6 % gilt unter anderem für viele Lebensmittel, Medikamente, Bücher, Zeitungen und bestimmte landwirtschaftliche Produkte. Alkoholische Getränke und Restaurantleistungen werden nicht einfach wie Lebensmittel im Detailhandel behandelt. Der Sondersatz von 3,8 % betrifft das Gewähren von Unterkunft einschliesslich eines allfällig separat verrechneten Frühstücks.",
      ],
      bullets: [
        "Normalsatz: 8,1 %",
        "Reduzierter Satz: 2,6 %",
        "Sondersatz Beherbergung: 3,8 %",
      ],
    },
    {
      heading: "MWST auf einen Nettopreis aufschlagen",
      body: [
        "Wenn ein Nettopreis gegeben ist, wird die Steuer mit Netto × Steuersatz berechnet. Der Bruttopreis lautet Netto × (1 + Steuersatz). Bei CHF 250 netto und 8,1 % entstehen CHF 20.25 Steuer; der Bruttobetrag beträgt CHF 270.25.",
        "Für den reduzierten Satz wird statt 1,081 mit 1,026 multipliziert, für Beherbergung mit 1,038. Bei Rechnungen mit mehreren Positionen können unterschiedliche Sätze vorkommen. Dann sollte jede Position mit dem zutreffenden Satz berechnet und transparent ausgewiesen werden.",
      ],
    },
    {
      heading: "MWST aus einem Bruttopreis herausrechnen",
      body: [
        "Enthält ein Preis die Steuer bereits, darf er nicht einfach mit 8,1 % multipliziert werden. Der Nettopreis ergibt sich aus Brutto ÷ 1,081. Die Steuer ist danach Brutto minus Netto. Bei einem Bruttopreis von CHF 108.10 entstehen somit CHF 100.00 netto und CHF 8.10 Steuer.",
        "Der Steueranteil am Bruttopreis ist kleiner als der nominelle Steuersatz, weil die Basis bereits die Steuer enthält. Beim Normalsatz entspricht er 8,1 ÷ 108,1 des Bruttopreises. Diese Unterscheidung verhindert einen häufigen Fehler bei Kassenabrechnungen, Rückerstattungen und Preisvergleichen.",
      ],
    },
    {
      heading: "Drei praktische Beispiele",
      body: [
        "Beispiel Normalsatz: Eine Agentur verrechnet CHF 1'500 netto für eine Dienstleistung. Die MWST beträgt CHF 121.50 und die Rechnung CHF 1'621.50 brutto. Beispiel reduzierter Satz: Ein steuerbares Produkt kostet CHF 80 netto. Bei 2,6 % entstehen CHF 2.08 Steuer und CHF 82.08 brutto.",
        "Beispiel Beherbergung: Eine steuerbare Übernachtung kostet CHF 200 netto. Bei 3,8 % betragen Steuer CHF 7.60 und Gesamtpreis CHF 207.60. Werden zusätzliche Leistungen angeboten, muss geprüft werden, ob sie Teil der Beherbergung sind oder einem anderen Satz unterliegen.",
      ],
    },
    {
      heading: "Vorsteuer verständlich erklärt",
      body: [
        "MWST-pflichtige Unternehmen stellen ihren Kundinnen Ausgangssteuer in Rechnung und bezahlen selbst MWST auf geschäftlichen Einkäufen. Soweit die gesetzlichen Voraussetzungen erfüllt sind, kann diese Vorsteuer von der geschuldeten Steuer abgezogen werden. Entscheidend sind unternehmerische Verwendung, korrekter Beleg und fehlende Ausschlussgründe.",
        "Ein ausgewiesener Betrag führt nicht automatisch in jedem Fall zum Abzug. Privatanteile, von der Steuer ausgenommene Tätigkeiten oder fehlerhafte Belege können den Anspruch beeinflussen. Die Saldosteuersatzmethode funktioniert zudem anders als die effektive Abrechnung, weil Vorsteuern nicht einzeln ermittelt werden.",
      ],
    },
    {
      heading: "Importe und Auslandsgeschäfte",
      body: [
        "Bei Warenimporten kann Einfuhrsteuer erhoben werden. Die Bemessungsgrundlage umfasst je nach Fall Warenwert und weitere Kosten bis zum Bestimmungsort. Für Dienstleistungen aus dem Ausland kann Bezugssteuer relevant werden. Das sind andere Verfahren als eine gewöhnliche Inlandrechnung, auch wenn dieselben Steuersätze eine Rolle spielen können.",
        "Bei grenzüberschreitenden Leistungen muss zuerst der Leistungsort bestimmt werden. Auch Plattformverkäufe und Versandhandel können besondere Pflichten auslösen. Der Online-Rechner berechnet Beträge, entscheidet aber nicht über Steuerpflicht, Leistungsort oder Abrechnungsmethode.",
      ],
    },
    {
      heading: "Rundung und Rechnungsprüfung",
      body: [
        "Je nachdem, ob pro Position oder auf dem Gesamttotal gerechnet wird, können kleine Rundungsdifferenzen entstehen. Verwende eine konsistente Methode und runde Geldbeträge auf Rappen. Rechnung, Leistungsdatum, Nettobetrag, Satz und Steuerbetrag sollten nachvollziehbar bleiben.",
        "Prüfe vor dem Versand einer Rechnung den aktuellen Satz auf der Website der Eidgenössischen Steuerverwaltung. Bei gemischten Leistungen, Auslandssachverhalten oder unklarer Vorsteuer ist eine fachliche Abklärung sinnvoller als eine nachträgliche Korrektur.",
      ],
    },
  ],
  faqs: [
    { question: "Welche Mehrwertsteuersätze gelten 2026 in der Schweiz?", answer: "Aktuell gelten 8,1 % Normalsatz, 2,6 % reduzierter Satz und 3,8 % Sondersatz für Beherbergungsleistungen." },
    { question: "Wie rechne ich 8,1 % aus einem Bruttopreis heraus?", answer: "Teile den Bruttopreis durch 1,081. Die Differenz zwischen Brutto und Netto ist die enthaltene MWST." },
    { question: "Gelten Lebensmittel immer mit 2,6 %?", answer: "Viele Lebensmittel unterliegen dem reduzierten Satz, aber beispielsweise alkoholische Getränke und Restaurantleistungen folgen anderen Regeln." },
    { question: "Kann jedes Unternehmen Vorsteuer abziehen?", answer: "Nein. Steuerpflicht, unternehmerische Verwendung, Abrechnungsmethode und ein korrekter Beleg beeinflussen den Anspruch." },
    { question: "Berechnet der MWST-Rechner auch Einfuhrsteuer?", answer: "Er kann den Steuerbetrag mit einem Satz berechnen, beurteilt aber nicht die besondere Bemessungsgrundlage oder das Einfuhrverfahren." },
  ],
  internalLinks: [
    { href: "/de/mehrwertsteuer-rechner-schweiz", label: "Mehrwertsteuer-Rechner Schweiz" },
    { href: "/de/prozentrechner", label: "Prozentrechner" },
    { href: "/de/budget-rechner-schweiz", label: "Budget-Rechner Schweiz" },
  ],
  relatedArticleSlugs: ["stundenlohn-berechnen-schweiz"],
  sources: [
    { label: "ESTV: Schweizer Mehrwertsteuersätze", href: "https://www.estv.admin.ch/estv/de/home/mehrwertsteuer/mwst-steuersaetze.html" },
    { label: "ESTV: Mehrwertsteuer", href: "https://www.estv.admin.ch/de/mehrwertsteuer" },
  ],
} satisfies GermanLongTailArticle;
