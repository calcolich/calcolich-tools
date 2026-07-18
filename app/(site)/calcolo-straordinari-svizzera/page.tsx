import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import OvertimeCalculator from "@/components/OvertimeCalculator";

export const metadata: Metadata = {
  title: "Calcolo Straordinari 2026 | Calcolich",
  description:
    "Calcola ore straordinarie e importo stimato partendo da ore previste, ore lavorate e tariffa oraria.",
  alternates: {
    canonical: "https://www.calcolich.ch/calcolo-straordinari-svizzera",
  },
};

export default function Page() {
  return (
    <ToolPage
      title="Calcolo Straordinari"
      intro="Inserisci ore previste, ore lavorate, tariffa oraria e supplemento per stimare il valore degli straordinari."
      relatedTools={[
        { href: "/calcolo-ore-lavoro", title: "Calcolo ore lavoro" },
        { href: "/calcolo-salario-netto-svizzera", title: "Calcolo salario netto" },
        { href: "/calcolo-giorni-lavorativi-svizzera", title: "Calcolo giorni lavorativi" },
        { href: "/calcolo-tredicesima-svizzera", title: "Calcolo tredicesima" },
        { href: "/categorie/stipendio-lavoro", title: "Hub lavoro e stipendio" },
      ]}
      explanation={
        <div className="space-y-5 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-950">Come viene stimato l&apos;importo</h2>
          <p>
            Il calcolatore confronta le ore lavorate con quelle previste. Le ore in piu vengono
            moltiplicate per la tariffa oraria aumentata del supplemento indicato.
          </p>
          <h2 className="text-2xl font-bold text-gray-950">Attenzione al contratto</h2>
          <p>
            La gestione degli straordinari puo dipendere da contratto, ruolo, accordi aziendali e
            compensazione tramite tempo libero. Usa il risultato come stima iniziale.
          </p>
        </div>
      }
    >
      <OvertimeCalculator />
    </ToolPage>
  );
}
