import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import TredicesimaCalculator from "@/components/TredicesimaCalculator";

export const metadata: Metadata = {
  title: "Calcolo Tredicesima 2026 | Calcolich",
  description:
    "Calcola la tredicesima in pochi secondi partendo dal salario mensile lordo e dai mesi lavorati.",
  alternates: {
    canonical: "https://www.calcolich.ch/calcolo-tredicesima-svizzera",
  },
};

export default function Page() {
  return (
    <ToolPage
      title="Calcolo Tredicesima"
      intro="Inserisci salario mensile e mesi lavorati per stimare subito la tredicesima spettante."
      explanation={
        <div className="space-y-5 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-950">Come si calcola la tredicesima?</h2>
          <p>
            In molti contratti la tredicesima corrisponde a un dodicesimo del salario annuo.
            Se lavori tutto l&apos;anno, di solito equivale a una mensilita. Se inizi o lasci il lavoro
            durante l&apos;anno, viene calcolata in proporzione ai mesi lavorati.
          </p>
          <h2 className="text-2xl font-bold text-gray-950">Esempio pratico</h2>
          <p>
            Con un salario lordo mensile di CHF 5&apos;000 e 12 mesi lavorati, la tredicesima stimata e
            CHF 5&apos;000. Con 6 mesi lavorati, la stima diventa CHF 2&apos;500.
          </p>
          <p className="text-sm text-gray-500">
            Il risultato e indicativo: verifica sempre contratto, regolamento aziendale e conteggio
            salariale ufficiale.
          </p>
        </div>
      }
    >
      <TredicesimaCalculator />
    </ToolPage>
  );
}
