import type { Calculator } from "@/lib/calculators";
import Link from "next/link";

export default function RevenueCta({ calculator }: { calculator: Calculator }) {
  const businessIntent = calculator.category.includes("Business");
  const href = `/servizi-ai-seo?source=calculator&tool=${encodeURIComponent(calculator.slug)}#richiedi`;

  return (
    <section className="mt-6 flex flex-col gap-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:flex-row md:items-center md:justify-between md:p-6">
      <div className="max-w-2xl">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Per aziende e professionisti</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950">
          {businessIntent
            ? "Vuoi trasformare questi numeri in piu clienti?"
            : "Vuoi un sito utile che genera richieste?"}
        </h2>
        <p className="mt-2 leading-7 text-gray-700">
          Creo siti, calcolatori SEO e automazioni semplici per attivita svizzere. Prima analisi gratuita, proposta chiara entro 24 ore.
        </p>
      </div>
      <Link href={href} className="shrink-0 rounded-xl bg-gray-950 px-5 py-3 text-center font-black text-white transition hover:bg-emerald-800">
        Richiedi analisi gratuita
      </Link>
    </section>
  );
}
