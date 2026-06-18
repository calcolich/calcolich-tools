import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import WorkingDaysCalculator from "@/components/WorkingDaysCalculator";

export const metadata: Metadata = {
  title: "Calcolo Giorni Lavorativi 2026 | Calcolich",
  description:
    "Calcola i giorni lavorativi tra due date sottraendo weekend e giorni festivi.",
  alternates: {
    canonical: "https://calcolich.ch/calcolo-giorni-lavorativi-svizzera",
  },
};

export default function Page() {
  return (
    <ToolPage
      title="Calcolo Giorni Lavorativi"
      intro="Calcola quanti giorni lavorativi ci sono tra due date, escludendo sabati, domeniche e un numero personalizzato di festivi."
      explanation={
        <div className="space-y-5 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-950">Come funziona</h2>
          <p>
            Lo strumento conta tutti i giorni del periodo, rimuove sabati e domeniche, poi sottrae
            i giorni festivi che inserisci manualmente. Questo lo rende utile anche per cantoni con
            festivita diverse.
          </p>
          <h2 className="text-2xl font-bold text-gray-950">Quando usarlo</h2>
          <p>
            Puoi usarlo per pianificare ferie, scadenze di lavoro, tempi di consegna, periodi di
            preavviso o stime amministrative.
          </p>
          <p className="text-sm text-gray-500">
            I festivi cantonali variano: inserisci il numero corretto per il tuo cantone o per la
            tua azienda.
          </p>
        </div>
      }
    >
      <WorkingDaysCalculator />
    </ToolPage>
  );
}
