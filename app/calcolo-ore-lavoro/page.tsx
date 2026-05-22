"use client";

import { useState } from "react";

export default function CalcoloOreLavoro() {
  const [inizio, setInizio] = useState("");
  const [fine, setFine] = useState("");
  const [pausa, setPausa] = useState(0);

  const calcolaOre = () => {
    if (!inizio || !fine) return { ore: 0, minuti: 0 };

    const [h1, m1] = inizio.split(":").map(Number);
    const [h2, m2] = fine.split(":").map(Number);

    let minuti =
      h2 * 60 +
      m2 -
      (h1 * 60 + m1) -
      pausa;

    const ore = Math.floor(minuti / 60);
    const minutiRestanti = minuti % 60;

    return { ore, minuti: minutiRestanti };
  };

  const risultato = calcolaOre();

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-4xl font-bold mb-6">
          Calcolo Ore Lavoro
        </h1>

        <div className="space-y-4">
          <input
            type="time"
            value={inizio}
            onChange={(e) => setInizio(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="time"
            value={fine}
            onChange={(e) => setFine(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="number"
            placeholder="Pausa in minuti"
            value={pausa}
            onChange={(e) => setPausa(Number(e.target.value))}
            className="w-full border p-4 rounded-xl"
          />

          <div className="bg-purple-100 p-4 rounded-xl text-xl font-semibold">
            Totale lavorato: {risultato.ore} ore e{" "}
            {risultato.minuti} minuti
          </div>
        </div>
      </div>
    </main>
  );
}