import type { Calculator } from "@/lib/calculators";
import { TrackedLink } from "@/components/CommercialTracking";

export default function RevenueCta({ calculator }: { calculator: Calculator }) {
  const offer = getRevenueOffer(calculator);
  const href = `${offer.href}?source=calculator&tool=${encodeURIComponent(calculator.slug)}#analisi`;

  return (
    <section className="mt-6 flex flex-col gap-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:flex-row md:items-center md:justify-between md:p-6">
      <div className="max-w-2xl">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-700">{offer.eyebrow}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950">
          {offer.title}
        </h2>
        <p className="mt-2 leading-7 text-gray-700">
          {offer.description}
        </p>
      </div>
      <TrackedLink
        href={href}
        source={`calculator:${calculator.slug}`}
        className="shrink-0 rounded-xl bg-gray-950 px-5 py-3 text-center font-black text-white transition hover:bg-emerald-800"
      >
        {offer.buttonLabel}
      </TrackedLink>
    </section>
  );
}

function getRevenueOffer(calculator: Calculator) {
  const fiduciaryTools = new Set([
    "calcolo-iva-svizzera",
    "calcolo-fattura-freelance",
    "calcolo-contributi-avs-indipendenti",
    "calcolo-imposta-alla-fonte-svizzera",
  ]);
  const realEstateTools = new Set([
    "calcolo-affitto-sostenibile-svizzera",
    "calcolo-mutuo-svizzera",
    "calcolo-rata-prestito",
    "calcolo-roi",
  ]);
  const artisanTools = new Set([
    "calcolo-costo-orario",
    "calcolo-margine-profitto",
    "calcolo-prezzo-vendita",
    "calcolo-break-even",
  ]);

  if (fiduciaryTools.has(calculator.slug)) {
    return {
      href: "/servizi/siti-web-fiduciarie-ticino",
      eyebrow: "Per fiduciarie e studi professionali",
      title: "Vuoi offrire calcoli utili e ricevere contatti qualificati?",
      description: "Creo siti e strumenti chiari per spiegare servizi fiscali, contabili e amministrativi e trasformare le ricerche in richieste attribuite.",
      buttonLabel: "Vedi la soluzione per fiduciarie",
    };
  }

  if (realEstateTools.has(calculator.slug)) {
    return {
      href: "/servizi/siti-web-agenzie-immobiliari-ticino",
      eyebrow: "Per agenzie immobiliari",
      title: "Vuoi trasformare simulazioni e immobili in nuovi incarichi?",
      description: "Costruisco percorsi per valutazioni, vendita, locazione e gestione con moduli collegati alla pagina e alla campagna corretta.",
      buttonLabel: "Vedi la soluzione immobiliare",
    };
  }

  if (artisanTools.has(calculator.slug)) {
    return {
      href: "/servizi/siti-web-artigiani-ticino",
      eyebrow: "Per artigiani e imprese locali",
      title: "Vuoi trasformare prezzi e margini in piu preventivi?",
      description: "Creo siti veloci con servizi, zone coperte e richieste di preventivo misurabili per attivita locali in Ticino.",
      buttonLabel: "Vedi la soluzione per artigiani",
    };
  }

  return {
    href: "/servizi/calcolatori-lead-generation",
    eyebrow: "Per aziende e professionisti",
    title: "Vuoi un calcolatore che genera richieste per la tua attivita?",
    description: "Progetto strumenti personalizzati con risultato immediato, pagina SEO, modulo attribuito ed email automatica.",
    buttonLabel: "Scopri i calcolatori lead",
  };
}
