"use client";

import { useState } from "react";

export default function CalculatorActions({ calculatorId }: { calculatorId: string }) {
  const [saved, setSaved] = useState(false);

  function saveResult() {
    localStorage.setItem(`calcolich:${calculatorId}:saved`, new Date().toISOString());
    setSaved(true);
  }

  return (
    <section className="mt-6 flex flex-wrap gap-3" aria-label="Ergebnisaktionen">
      <button type="button" onClick={saveResult} className="rounded-xl bg-gray-950 px-5 py-3 font-bold text-white hover:bg-gray-800">
        {saved ? "Ergebnis gespeichert" : "Ergebnis speichern"}
      </button>
      <button type="button" onClick={() => window.print()} className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-bold text-gray-900 hover:bg-gray-50">
        PDF herunterladen
      </button>
    </section>
  );
}
