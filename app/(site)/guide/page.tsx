import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guide Calcolich | Stipendio, budget, freelance e trading",
  description:
    "Guide pratiche Calcolich per usare meglio i calcolatori online su stipendio, costo della vita, freelance e trading.",
  alternates: {
    canonical: "https://www.calcolich.ch/guide",
  },
};

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-8 inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:border-gray-400">
          Tutti i calcolatori
        </Link>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">Guide Calcolich</p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Guide pratiche per decidere con numeri piu chiari</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
            Approfondimenti semplici su stipendio, budget, freelance e trading. Ogni guida collega spiegazione pratica e calcolatori utili.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guide/${guide.slug}`}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50"
            >
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">{guide.categoryLabel}</p>
              <h2 className="text-2xl font-black tracking-tight">{guide.title}</h2>
              <p className="mt-3 leading-7 text-gray-600">{guide.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
