"use client";

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
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

        <h1 className="text-4xl font-bold mb-6">
          Scorporo IVA Svizzera
        </h1>

        <input
          type="number"
          placeholder="Totale CHF"
          value={totale}
          onChange={(e) => setTotale(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <select
          value={iva}
          onChange={(e) => setIva(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        >
          <option value="8.1">IVA 8.1%</option>
          <option value="2.6">IVA 2.6%</option>
          <option value="3.8">IVA 3.8%</option>
        </select>

        <button
          onClick={scorporaIVA}
          className="bg-black text-white px-6 py-4 rounded-xl w-full"
        >
          Scorpora IVA
        </button>

        {netto && ivaImporto && (
          <div className="bg-blue-100 p-4 rounded-xl space-y-2 mt-6">

            <p className="text-xl font-semibold">
              Netto: CHF {netto.toFixed(2)}
            </p>

            <p className="text-xl font-semibold">
              IVA inclusa: CHF {ivaImporto.toFixed(2)}
            </p>

          </div>
        )}
      </div>
    </main>
  );
}