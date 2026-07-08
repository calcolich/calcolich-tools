import type { GermanLongTailArticle } from "./types";

export const ferienanspruchTeilzeitSchweiz = {
  status: "published",
  locale: "de",
  slug: "ferienanspruch-teilzeit-schweiz",
  title: "Ferienanspruch bei Teilzeit in der Schweiz berechnen",
  metaTitle: "Ferienanspruch Teilzeit Schweiz berechnen | Calcolich",
  metaDescription: "Ferienanspruch bei Teilzeit in der Schweiz: gesetzliches Minimum, Berechnung nach Arbeitstagen, Eintritt, Krankheit und Verjährung.",
  targetKeywords: ["ferienanspruch teilzeit schweiz", "ferien berechnen teilzeit"],
  intro: [
    "Teilzeitbeschäftigte haben in der Schweiz denselben Ferienanspruch in Wochen wie Vollzeitbeschäftigte. Die Anzahl Ferientage hängt jedoch davon ab, an wie vielen Tagen pro Woche gearbeitet wird. Deshalb führt eine Rechnung nur mit dem Beschäftigungsgrad häufig zu einem falschen Ergebnis.",
    "Diese Anleitung erklärt das gesetzliche Minimum, die Umrechnung in Tage, anteilige Ansprüche bei Eintritt oder Austritt sowie Krankheit und Verjährung. Mit dem Ferienrechner Schweiz kannst du die Grundrechnung direkt durchführen.",
  ],
  sections: [
    {
      heading: "Gesetzlicher Mindestanspruch",
      body: [
        "Nach Artikel 329a des Obligationenrechts haben Arbeitnehmende bis zum vollendeten 20. Altersjahr Anspruch auf mindestens fünf Ferienwochen pro Dienstjahr. Für alle anderen beträgt das gesetzliche Minimum vier Wochen. Einzelarbeitsvertrag, Normalarbeitsvertrag oder Gesamtarbeitsvertrag können einen höheren Anspruch vorsehen.",
        "Teilzeit reduziert die Zahl der Ferienwochen nicht. Wer drei Tage pro Woche arbeitet und vier Wochen Ferien erhält, kann vier vollständige Arbeitswochen frei nehmen. Dafür werden zwölf persönliche Arbeitstage benötigt. Eine Vollzeitkraft mit fünf Arbeitstagen benötigt für dieselben vier Wochen zwanzig Tage.",
      ],
    },
    {
      heading: "Ferientage bei Teilzeit berechnen",
      body: [
        "Die Grundformel lautet Arbeitstage pro Woche × Ferienwochen. Ein 60-%-Pensum kann auf drei volle Tage, fünf kürzere Tage oder einen wechselnden Plan verteilt sein. Bei drei Arbeitstagen und fünf Ferienwochen entstehen 3 × 5 = 15 Ferientage. Bei fünf Arbeitstagen bleiben es 25 Tage, auch wenn die täglichen Stunden kürzer sind.",
        "Entscheidend ist, wie viele geplante Arbeitstage durch den Ferienbezug ausfallen. Bei unregelmässigen Einsätzen sollte der Anspruch in Stunden oder anhand eines repräsentativen Durchschnitts geführt werden. Vertrag und betriebliche Methode müssen sicherstellen, dass Teilzeitbeschäftigte tatsächlich gleich viele Ferienwochen erhalten.",
      ],
      bullets: [
        "3 Arbeitstage × 4 Wochen = 12 Ferientage",
        "3 Arbeitstage × 5 Wochen = 15 Ferientage",
        "5 Arbeitstage × 5 Wochen = 25 Ferientage",
      ],
    },
    {
      heading: "Beispiel: 60-Prozent-Pensum",
      body: [
        "Eine Person arbeitet montags, mittwochs und freitags, insgesamt 60 %, und hat fünf Ferienwochen. Der Jahresanspruch beträgt 15 Tage. Für eine freie Kalenderwoche werden drei Ferientage abgebucht, weil nur diese drei Tage Arbeitspflicht bestanden hätte.",
        "Nach sechs Monaten beträgt der rechnerische zeitanteilige Anspruch 15 × 6 ÷ 12 = 7,5 Tage. Ob halbe Tage geführt oder gerundet werden, richtet sich nach dem betrieblichen System. Die Rundung darf den gesetzlichen Gesamtanspruch nicht systematisch verkürzen.",
      ],
    },
    {
      heading: "Eintritt, Austritt und wechselndes Pensum",
      body: [
        "Beginnt oder endet das Arbeitsverhältnis während des Dienstjahres, wird der Jahresanspruch zeitanteilig berechnet. Eine einfache Monatsrechnung lautet Jahresanspruch × Beschäftigungsmonate ÷ 12. Für genaue Ein- und Austrittsdaten kann eine Berechnung nach Kalendertagen oder betrieblicher Abrechnungsperiode verwendet werden.",
        "Ändert sich das Wochenpensum, sollten die Zeiträume getrennt berechnet werden. Beispiel: Sechs Monate mit fünf und sechs Monate mit drei Arbeitstagen ergeben bei vier Ferienwochen anteilig zehn plus sechs, also sechzehn Tage. Bereits bezogene Ferien müssen dem passenden Zeitraum gegenübergestellt werden.",
      ],
    },
    {
      heading: "Mindestens zwei Wochen müssen zusammenhängen",
      body: [
        "Artikel 329c OR verlangt, dass wenigstens zwei Ferienwochen pro Dienstjahr zusammenhängen. Der Arbeitgeber bestimmt den Zeitpunkt, muss aber die Wünsche der beschäftigten Person berücksichtigen, soweit sie mit den betrieblichen Interessen vereinbar sind. Ferien sollten früh genug festgelegt werden, damit eine sinnvolle Planung möglich ist.",
        "Zwei zusammenhängende Wochen bedeuten bei Teilzeit zwei vollständige persönliche Arbeitswochen. Wer montags bis mittwochs arbeitet, benötigt dafür normalerweise sechs Ferientage, obwohl der Kalenderzeitraum vierzehn Tage umfasst.",
      ],
    },
    {
      heading: "Krankheit während der Ferien",
      body: [
        "Wird der Erholungszweck durch Krankheit oder Unfall vereitelt, können die betroffenen Tage nachgewährt werden. Nicht jede leichte Beeinträchtigung führt automatisch zu Ferienunfähigkeit. Dauer, Intensität und ein ärztlicher Nachweis spielen in der Praxis eine wichtige Rolle.",
        "Ist schon vor Ferienbeginn klar, dass Erholung nicht möglich ist, kann eine Verschiebung verlangt werden. Krankheitstage sollten unverzüglich gemeldet und nach den betrieblichen Vorgaben dokumentiert werden. Der Ferienrechner kann den neuen Saldo berechnen, entscheidet aber nicht über die rechtliche Anerkennung.",
      ],
    },
    {
      heading: "Auszahlung und Verjährung",
      body: [
        "Ferien dienen der Erholung und sollen grundsätzlich tatsächlich bezogen werden. Während eines laufenden Arbeitsverhältnisses dürfen sie deshalb nicht einfach durch Geld ersetzt werden. Für unregelmässige Teilzeit lässt die Rechtsprechung begrenzte Ausnahmen zu, wenn die Entschädigung im Vertrag und auf jeder Abrechnung separat ausgewiesen ist.",
        "Nach den SECO-Informationen verjährt der Ferienanspruch grundsätzlich nach fünf Jahren. Die Frist beginnt nach Ablauf des Jahres, für das die Ferien bestimmt waren. Bei Beendigung des Arbeitsverhältnisses sollen Restferien soweit möglich bezogen werden; eine Auszahlung kommt nur in bestimmten Konstellationen in Betracht.",
      ],
    },
  ],
  faqs: [
    { question: "Haben Teilzeitbeschäftigte weniger Ferien?", answer: "Nicht in Wochen. Die Zahl der Ferientage wird an die persönlichen Arbeitstage pro Woche angepasst, damit gleich viele freie Arbeitswochen entstehen." },
    { question: "Wie viele Ferientage sind vier Wochen bei drei Arbeitstagen?", answer: "Drei Arbeitstage mal vier Ferienwochen ergeben zwölf Ferientage pro vollem Dienstjahr." },
    { question: "Müssen zwei Ferienwochen am Stück bezogen werden?", answer: "Mindestens zwei Ferienwochen pro Dienstjahr müssen grundsätzlich zusammenhängen." },
    { question: "Verfallen Ferien am Jahresende?", answer: "Nicht automatisch. Ferienansprüche verjähren grundsätzlich nach fünf Jahren; betriebliche Übertragsregeln ändern die gesetzliche Verjährung nicht beliebig." },
    { question: "Werden Krankheitstage während der Ferien zurückgegeben?", answer: "Wenn Krankheit oder Unfall den Erholungszweck tatsächlich verhindert und dies nachgewiesen wird, können die betroffenen Tage nachgewährt werden." },
  ],
  internalLinks: [
    { href: "/de/ferienrechner-schweiz", label: "Ferienrechner Schweiz" },
    { href: "/de/arbeitszeitrechner", label: "Arbeitszeitrechner" },
    { href: "/de/lohnrechner-schweiz", label: "Lohnrechner Schweiz" },
  ],
  relatedArticleSlugs: ["pausenregelung-arbeitszeit-schweiz", "stundenlohn-berechnen-schweiz"],
  sources: [
    { label: "SECO: FAQ zu Ferien", href: "https://www.seco.admin.ch/de/faq-ferien" },
    { label: "SECO: Arbeitszeitregelung und Mindestferien", href: "https://www.seco.admin.ch/de/entsendung-arbeitszeitregelung" },
  ],
} satisfies GermanLongTailArticle;
