"use client";

import TrackedInternalLink from "@/components/TrackedInternalLink";
import type { Calculator } from "@/lib/calculators";
import type { Locale } from "@/lib/i18n";

type ConsultationCopy = {
  eyebrow: string;
  title: string;
  description: string;
  button: string;
  partnerEyebrow: string;
  partnerTitle: string;
  partnerDescription: string;
};

const copy: Record<Locale, ConsultationCopy> = {
  de: {
    eyebrow: "Vergleich und Beratung",
    title: "Moechtest du die Zahlen fuer deinen Fall sauber einordnen?",
    description:
      "Nutze die Seite fuer eine erste Einschaetzung und sende uns danach eine konkrete Anfrage, wenn du die Situation mit einer sauberen Vergleichsrechnung oder einer Beratung pruefen willst.",
    button: "Vergleich anfragen",
    partnerEyebrow: "Partnerbereich reserviert",
    partnerTitle: "Platz fuer kuenftige Partner",
    partnerDescription:
      "Der Bereich bleibt fuer spaetere Kooperationen mit praxistauglichen Anbietern vorbereitet, ohne den Rechner mit Werbung zu ueberladen.",
  },
  it: {
    eyebrow: "Confronto e consulenza",
    title: "Vuoi inquadrare i numeri del tuo caso in modo piu preciso?",
    description:
      "Usa la pagina per una prima stima e poi inviaci una richiesta concreta se vuoi verificare la situazione con un confronto pulito o una consulenza mirata.",
    button: "Richiedi un confronto",
    partnerEyebrow: "Spazio partner riservato",
    partnerTitle: "Pronto per future collaborazioni",
    partnerDescription:
      "L'area resta predisposta per partner utili e coerenti, senza trasformare il calcolatore in una pagina piena di promozioni invasive.",
  },
  en: {
    eyebrow: "Comparison and advice",
    title: "Need to put the numbers for your case into context?",
    description:
      "Use the page for a first estimate, then send a concrete request if you want a clean comparison or a focused consultation.",
    button: "Request a comparison",
    partnerEyebrow: "Partner space reserved",
    partnerTitle: "Ready for future partners",
    partnerDescription:
      "The area stays prepared for useful future partnerships without turning the calculator into a promotional page.",
  },
  fr: {
    eyebrow: "Comparaison et conseil",
    title: "Besoin de mieux situer les chiffres de votre cas?",
    description:
      "Utilisez la page pour une premiere estimation, puis envoyez une demande concrete si vous souhaitez une comparaison claire ou un conseil cible.",
    button: "Demander une comparaison",
    partnerEyebrow: "Espace partenaire reserve",
    partnerTitle: "Pret pour de futurs partenaires",
    partnerDescription:
      "La zone reste preparee pour des partenaires utiles sans transformer le calculateur en vitrine publicitaire.",
  },
};

export default function ConsultationCta({
  calculator,
  locale,
}: {
  calculator: Calculator;
  locale: Locale;
}) {
  const ui = getIntentCopy(calculator.slug)?.[locale] ?? copy[locale];

  return (
    <section className="mt-6 grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_280px] md:p-6">
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-emerald-700">{ui.eyebrow}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950">{ui.title}</h2>
        <p className="mt-2 max-w-2xl leading-7 text-gray-700">{ui.description}</p>
        <TrackedInternalLink
          href={`/contatti?source=calculator-cta&tool=${encodeURIComponent(calculator.slug)}#lead`}
          event="tax_help_cta_clicked"
          source={calculator.slug}
          target="contatti"
          className="mt-4 inline-flex rounded-xl bg-gray-950 px-5 py-3 font-bold text-white transition hover:bg-emerald-800"
        >
          {ui.button}
        </TrackedInternalLink>
      </div>

      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-gray-500">{ui.partnerEyebrow}</p>
        <p className="mt-2 text-lg font-black text-gray-950">{ui.partnerTitle}</p>
        <p className="mt-2 text-sm leading-6 text-gray-700">{ui.partnerDescription}</p>
      </div>
    </section>
  );
}

function getIntentCopy(slug: string): Partial<Record<Locale, ConsultationCopy>> | null {
  if (slug.includes("quellensteuer") || slug.includes("imposta-alla-fonte") || slug.includes("withholding-tax")) {
    return {
      de: {
        eyebrow: "Steuerfall prüfen",
        title: "Möchtest du deine Quellensteuer sauber einordnen?",
        description:
          "Nutze die Schätzung für den ersten Vergleich und sende danach eine konkrete Anfrage, wenn du den Fall mit einer sauberen Prüfung oder einer Beratung einordnen willst.",
        button: "Steuerfall prüfen lassen",
        partnerEyebrow: "Partnerbereich reserviert",
        partnerTitle: "Platz fuer kuenftige Partner",
        partnerDescription:
          "Der Bereich bleibt fuer spaetere Kooperationen mit praxistauglichen Anbietern vorbereitet, ohne den Rechner mit Werbung zu ueberladen.",
      },
      it: {
        eyebrow: "Verifica fiscale",
        title: "Vuoi inquadrare meglio la tua imposta alla fonte?",
        description:
          "Usa la stima per un primo confronto e poi invia una richiesta concreta se vuoi verificare il caso con un controllo ordinato o una consulenza mirata.",
        button: "Verifica il caso fiscale",
        partnerEyebrow: "Spazio partner riservato",
        partnerTitle: "Pronto per future collaborazioni",
        partnerDescription:
          "L'area resta predisposta per partner utili e coerenti, senza trasformare il calcolatore in una pagina piena di promozioni invasive.",
      },
      en: {
        eyebrow: "Review your tax case",
        title: "Want to put your withholding tax into context?",
        description:
          "Use the estimate for a first comparison, then send a concrete request if you want the case reviewed with a clean check or a focused consultation.",
        button: "Have the tax case reviewed",
        partnerEyebrow: "Partner space reserved",
        partnerTitle: "Ready for future partners",
        partnerDescription:
          "This area is prepared for useful, relevant partners without turning the calculator into a wall of promotions.",
      },
      fr: {
        eyebrow: "Verifier votre cas fiscal",
        title: "Vous voulez mieux situer votre impot a la source?",
        description:
          "Utilisez l'estimation pour un premier comparatif, puis envoyez une demande concrete si vous souhaitez un controle clair ou un conseil cible.",
        button: "Faire verifier le cas fiscal",
        partnerEyebrow: "Espace partenaire reserve",
        partnerTitle: "Pret pour de futurs partenaires",
        partnerDescription:
          "L'espace reste prepare pour des partenaires utiles et pertinents, sans transformer le calculateur en page promotionnelle.",
      },
    };
  }

  if (slug.includes("hypotheken") || slug.includes("ipoteca") || slug.includes("hypotheque") || slug.includes("mortgage")) {
    return {
      de: {
        eyebrow: "Finanzierung vorbereiten",
        title: "Möchtest du die Tragbarkeit vor dem Bankgespräch prüfen?",
        description:
          "Nutze die Schätzung als Vorab-Check und sende danach eine Anfrage, wenn du Budget, Eigenmittel und nächste Schritte sauber sortieren willst.",
        button: "Finanzierung vorbereiten",
        partnerEyebrow: "Partnerbereich reserviert",
        partnerTitle: "Bereit fuer passende Hypothekenpartner",
        partnerDescription:
          "Externe Angebote werden erst angezeigt, wenn echte Partnerlinks redaktionell geprueft und technisch konfiguriert sind.",
      },
      it: {
        eyebrow: "Preparazione finanziamento",
        title: "Vuoi verificare la sostenibilita prima del colloquio in banca?",
        description:
          "Usa la stima come controllo iniziale e invia una richiesta se vuoi ordinare budget, capitale proprio e prossimi passi.",
        button: "Prepara il finanziamento",
        partnerEyebrow: "Spazio partner riservato",
        partnerTitle: "Pronto per partner ipotecari pertinenti",
        partnerDescription:
          "Le offerte esterne compariranno solo dopo verifica editoriale e configurazione di link reali.",
      },
      en: {
        eyebrow: "Prepare your financing",
        title: "Want to check affordability before the bank conversation?",
        description:
          "Use the estimate as a first check, then send a request if you want to sort out budget, equity and next steps cleanly.",
        button: "Prepare the financing",
        partnerEyebrow: "Partner space reserved",
        partnerTitle: "Ready for relevant mortgage partners",
        partnerDescription:
          "External offers appear only after editorial review and real partner links are configured.",
      },
      fr: {
        eyebrow: "Preparer le financement",
        title: "Vous voulez verifier la viabilite avant l'entretien bancaire?",
        description:
          "Utilisez l'estimation comme premier controle, puis envoyez une demande si vous souhaitez organiser budget, fonds propres et prochaines etapes.",
        button: "Preparer le financement",
        partnerEyebrow: "Espace partenaire reserve",
        partnerTitle: "Pret pour des partenaires hypothecaires pertinents",
        partnerDescription:
          "Les offres externes n'apparaissent qu'apres verification editoriale et configuration de vrais liens.",
      },
    };
  }

  if (slug.includes("terzo-pilastro") || slug.includes("pillar-3a") || slug.includes("saeule-3a") || slug.includes("troisieme-pilier")) {
    return {
      de: {
        eyebrow: "Vorsorge und Steuern",
        title: "Möchtest du die 3a-Entscheidung sauber vorbereiten?",
        description:
          "Nutze die Schätzung als Ausgangspunkt und prüfe danach Grenzsteuersatz, Budget, Gebühren und Anlagehorizont ohne falsche Präzision.",
        button: "3a-Check vorbereiten",
        partnerEyebrow: "Partnerbereich reserviert",
        partnerTitle: "Bereit fuer echte 3a-Partnerlinks",
        partnerDescription:
          "3a-Partner erscheinen nur, wenn die Affiliate-URLs wirklich konfiguriert sind.",
      },
      it: {
        eyebrow: "Previdenza e tasse",
        title: "Vuoi preparare meglio la decisione sul pilastro 3a?",
        description:
          "Usa la stima come punto di partenza e confronta aliquota marginale, budget, costi e orizzonte senza falsa precisione.",
        button: "Prepara il check 3a",
        partnerEyebrow: "Spazio partner riservato",
        partnerTitle: "Pronto per link 3a reali",
        partnerDescription:
          "I partner 3a compariranno solo quando le URL affiliate saranno davvero configurate.",
      },
      en: {
        eyebrow: "Pension and taxes",
        title: "Want to prepare your pillar 3a decision properly?",
        description:
          "Use the estimate as a starting point, then compare marginal tax rate, budget, fees and horizon without false precision.",
        button: "Prepare the 3a check",
        partnerEyebrow: "Partner space reserved",
        partnerTitle: "Ready for real 3a partner links",
        partnerDescription:
          "3a partners appear only once the affiliate URLs are actually configured.",
      },
      fr: {
        eyebrow: "Prevoyance et impots",
        title: "Vous voulez preparer votre decision 3e pilier?",
        description:
          "Utilisez l'estimation comme point de depart, puis comparez taux marginal, budget, frais et horizon sans fausse precision.",
        button: "Preparer le check 3a",
        partnerEyebrow: "Espace partenaire reserve",
        partnerTitle: "Pret pour de vrais liens 3a",
        partnerDescription:
          "Les partenaires 3a n'apparaissent que lorsque les URLs affiliates sont reellement configurees.",
      },
    };
  }

  return null;
}
