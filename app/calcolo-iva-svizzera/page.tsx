"use client";

import { useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("8.1");

  const value = parseFloat(amount) || 0;
  const iva = parseFloat(rate);

  const conIva = value + (value * iva) / 100;
  const netto = value / (1 + iva / 100);
  const ivaInclusa = value - netto;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-3">Calcolich</h1>
        <p className="text-gray-600 mb-10">
          Calcolatori gratuiti per la Svizzera.
        </p>

        <div className="grid gap-6 md:grid-cols-2">

          <section className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-4">Calcolo IVA Svizzera</h2>
            <input
              type="number"
              placeholder="Importo senza IVA"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border p-4 rounded-xl mb-4"
            />
            <select
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full border p-4 rounded-xl mb-4"
            >
              <option value="8.1">8.1%</option>
              <option value="3.8">3.8%</option>
              <option value="2.6">2.6%</option>
            </select>
            <div className="bg-green-100 p-4 rounded-xl font-bold">
              Totale con IVA: CHF {conIva.toFixed(2)}
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-4">Scorporo IVA Svizzera</h2>
            <input
              type="number"
              placeholder="Importo con IVA"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border p-4 rounded-xl mb-4"
            />
            <select
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full border p-4 rounded-xl mb-4"
            >
              <option value="8.1">8.1%</option>
              <option value="3.8">3.8%</option>
              <option value="2.6">2.6%</option>
            </select>
            <div className="bg-blue-100 p-4 rounded-xl font-bold space-y-2">
              <p>Netto: CHF {netto.toFixed(2)}</p>
              <p>IVA inclusa: CHF {ivaInclusa.toFixed(2)}</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-4">Calcolo Percentuale</h2>
            <p className="text-gray-600 mb-4">
              Usa il valore inserito sopra.
            </p>
            <div className="bg-gray-100 p-4 rounded-xl font-bold">
              10% di CHF {value.toFixed(2)} = CHF {(value * 0.1).toFixed(2)}
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-4">Sconto 20%</h2>
            <p className="text-gray-600 mb-4">
              Calcola rapidamente uno sconto.
            </p>
            <div className="bg-gray-100 p-4 rounded-xl font-bold">
              Prezzo scontato: CHF {(value * 0.8).toFixed(2)}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}