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

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-4xl font-bold mb-6">
          Scorporo IVA Svizzera
        </h1>

        <div className="space-y-4">

          <input
            type="number"
            placeholder="Totale CHF"
            value={totale}
            onChange={(e) => setTotale(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <select
            value={iva}
            onChange={(e) => setIva(e.target.value)}
            className="w-full border p-4 rounded-xl"
          >
            <option value="8.1">8.1%</option>
            <option value="2.6">2.6%</option>
            <option value="3.8">3.8%</option>
          </select>

          <button
            onClick={scorporaIVA}
            className="w-full bg-black text-white p-4 rounded-xl"
          >
            Scorpora IVA
          </button>

          {netto && ivaImporto && (
            <div className="bg-blue-100 p-4 rounded-xl space-y-2">

              <p className="text-xl font-semibold">
                Netto: CHF {netto.toFixed(2)}
              </p>

              <p className="text-xl font-semibold">
                IVA inclusa: CHF {ivaImporto.toFixed(2)}
              </p>

            </div>
          )}

        </div>

      </div>

    </main>
  );
}{
  title: "Scorporo IVA",
  description: "Rimuovi l'IVA da un totale.",
  link: "/scorporo-iva-svizzera",
},
