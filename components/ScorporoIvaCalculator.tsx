"use client";

import { useState } from "react";

export default function ScorporoIvaCalculator() {
  const [totale, setTotale] = useState("");
  const [iva, setIva] = useState("8.1");
  const [netto, setNetto] = useState<number | null>(null);
  const [ivaImporto, setIvaImporto] = useState<number | null>(null);

  const scorporaIVA = () => {
    const numero = parseFloat(totale);

    if (!numero) return;

    const nettoCalcolato = numero / (1 + parseFloat(iva) / 100);
    const ivaCalcolata = numero - nettoCalcolato;

    setNetto(nettoCalcolato);
    setIvaImporto(ivaCalcolata);
  };

  return (
    <>
      <label className="mb-4 block">
        <span className="mb-2 block font-semibold text-gray-900">Totale IVA inclusa CHF</span>
        <input
          type="number"
          placeholder="Totale"
          value={totale}
          onChange={(e) => setTotale(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] p-4 text-lg outline-none ring-emerald-200 transition focus:ring-4"
        />
      </label>

      <label className="mb-4 block">
        <span className="mb-2 block font-semibold text-gray-900">Aliquota IVA</span>
        <select
          value={iva}
          onChange={(e) => setIva(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] p-4 text-lg outline-none ring-emerald-200 transition focus:ring-4"
        >
          <option value="8.1">IVA 8.1%</option>
          <option value="2.6">IVA 2.6%</option>
          <option value="3.8">IVA 3.8%</option>
        </select>
      </label>

      <button
        onClick={scorporaIVA}
        className="w-full rounded-full bg-gray-950 px-6 py-4 text-base font-bold text-white transition hover:bg-emerald-600"
      >
        Scorpora IVA
      </button>

      {netto && ivaImporto ? (
        <div className="mt-6 grid gap-3 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Netto</p>
            <p className="mt-1 text-2xl font-black">CHF {netto.toFixed(2)}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">IVA inclusa</p>
            <p className="mt-1 text-2xl font-black">CHF {ivaImporto.toFixed(2)}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
