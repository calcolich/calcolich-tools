"use client";

import Link from "next/link";
import { useState } from "react";

export default function ScorporoIVA() {
  const [totale, setTotale] = useState("");
  const [iva, setIva] = useState("8.1");

  const [netto, setNetto] = useState<number | null>(null);
  const [ivaImporto, setIvaImporto] = useState<number | null>(null);

  const scorporaIVA = () => {
    const numero = parseFloat(totale);

    if (!numero) return;

    const nettoCalcolato =
      numero / (1 + parseFloat(iva) / 100);

    const ivaCalcolata =
      numero - nettoCalcolato;

    setNetto(nettoCalcolato);
    setIvaImporto(ivaCalcolata);
  };

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

        <input
          type="number"
          placeholder="Totale"
          value={totale}
          onChange={(e) => setTotale(e.target.value)}
          className="mb-4 w-full rounded-2xl border border-gray-200 bg-[#f9fafb] p-4 text-lg outline-none ring-emerald-200 transition focus:ring-4"
        />

        <select
          value={iva}
          onChange={(e) => setIva(e.target.value)}
          className="mb-4 w-full rounded-2xl border border-gray-200 bg-[#f9fafb] p-4 text-lg outline-none ring-emerald-200 transition focus:ring-4"
        >
          <option value="8.1">IVA 8.1%</option>
          <option value="2.6">IVA 2.6%</option>
          <option value="3.8">IVA 3.8%</option>
        </select>

        <button
          onClick={scorporaIVA}
          className="w-full rounded-full bg-gray-950 px-6 py-4 text-base font-bold text-white transition hover:bg-emerald-600"
        >
          Scorpora IVA
        </button>

        {netto && ivaImporto && (
          <div className="mt-6 grid gap-3 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 sm:grid-cols-2">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Netto</p>
              <p className="mt-1 text-2xl font-black">{netto.toFixed(2)}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">IVA inclusa</p>
              <p className="mt-1 text-2xl font-black">{ivaImporto.toFixed(2)}</p>
            </div>

          </div>
        )}
        </section>
      </div>
    </main>
  );
}
