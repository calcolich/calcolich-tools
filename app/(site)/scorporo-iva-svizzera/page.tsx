import type { Metadata } from "next";
import ScorporoIvaCalculator from "@/components/ScorporoIvaCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scorporo IVA Svizzera | Calcolich",
  description:
    "Scorpora l'IVA svizzera da un importo lordo e calcola imponibile e imposta inclusa.",
  alternates: {
    canonical: "https://www.calcolich.ch/scorporo-iva-svizzera",
  },
};

export default function ScorporoIVA() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-8">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="mb-6 inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
          Tutti i calcolatori
        </Link>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">Business</p>
          <h1 className="mb-3 text-4xl font-black tracking-tight md:text-5xl">
            Scorporo IVA
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Parti da un totale IVA inclusa e ricava subito imponibile e imposta.
          </p>

          <ScorporoIvaCalculator />
        </section>
      </div>
    </main>
  );
}
