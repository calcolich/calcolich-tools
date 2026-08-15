"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

const copy = {
  de: {
    aria: "Ergebnisaktionen",
    saved: "Ergebnis gespeichert",
    save: "Ergebnis speichern",
    pdf: "PDF herunterladen",
  },
  it: {
    aria: "Azioni risultato",
    saved: "Risultato salvato",
    save: "Salva risultato",
    pdf: "Scarica PDF",
  },
  en: {
    aria: "Result actions",
    saved: "Result saved",
    save: "Save result",
    pdf: "Download PDF",
  },
  fr: {
    aria: "Actions du resultat",
    saved: "Resultat enregistre",
    save: "Enregistrer le resultat",
    pdf: "Telecharger le PDF",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function CalculatorActions({
  calculatorId,
  locale = "it",
}: {
  calculatorId: string;
  locale?: Locale;
}) {
  const [saved, setSaved] = useState(false);
  const labels = copy[locale];

  function saveResult() {
    localStorage.setItem(`calcolich:${calculatorId}:saved`, new Date().toISOString());
    setSaved(true);
  }

  return (
    <section className="mt-6 flex flex-wrap gap-3" aria-label={labels.aria}>
      <button type="button" onClick={saveResult} className="rounded-xl bg-gray-950 px-5 py-3 font-bold text-white hover:bg-gray-800">
        {saved ? labels.saved : labels.save}
      </button>
      <button type="button" onClick={() => window.print()} className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-bold text-gray-900 hover:bg-gray-50">
        {labels.pdf}
      </button>
    </section>
  );
}
