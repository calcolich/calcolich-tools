import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import TredicesimaCalculator from "@/components/TredicesimaCalculator";

export const metadata: Metadata = {
  title: "Calcolo Tredicesima Svizzera 2026 | Calcolich",
  description:
    "Calcola la tredicesima lorda in Svizzera in CHF, anche se hai lavorato solo parte dell’anno. Inserisci il salario mensile lordo e i mesi lavorati.",
  alternates: {
    canonical: "https://www.calcolich.ch/calcolo-tredicesima-svizzera",
  },
};

export default function Page() {
  return (
    <ToolPage
      title="Calcolo tredicesima in Svizzera"
      intro="Stima la tredicesima lorda in CHF a partire dal salario mensile lordo e dai mesi lavorati nell’anno."
      relatedTools={[
        { href: "/calcolo-stipendio-annuale-mensile", title: "Stipendio annuo e mensile" },
        { href: "/calcolo-salario-netto-svizzera", title: "Calcolo stipendio netto" },
        { href: "/calcolo-percentuale-lavoro-svizzera", title: "Calcolo percentuale di lavoro" },
        { href: "/calcolo-salario-part-time-svizzera", title: "Calcolo salario part-time" },
      ]}
      explanation={
        <div className="space-y-5 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-950">Come si calcola la tredicesima?</h2>
          <p>
            Se il tuo contratto prevede una tredicesima pari a una mensilità e lo stipendio è rimasto
            costante, moltiplica il salario mensile lordo per i mesi lavorati e dividi per 12.
            Se lavori part-time, inserisci il lordo mensile corrispondente al tuo grado
            d&apos;occupazione.
          </p>
          <h2 className="text-2xl font-bold text-gray-950">Esempio con un’assunzione ad aprile</h2>
          <p>
            Se inizi il 1º aprile e lavori fino al 31 dicembre con un salario mensile lordo di
            CHF 5&apos;200, inserisci 9 mesi. La tredicesima lorda stimata è di <strong>CHF 3&apos;900</strong>
            {" "}(CHF 5&apos;200 × 9 ÷ 12). Con lo stesso salario per 12 mesi, la tredicesima sarebbe di
            CHF 5&apos;200.
          </p>
          <p className="text-sm text-gray-500">
            Per mesi parziali o cambi di salario, verifica il criterio di calcolo previsto dal
            contratto e il conteggio del datore di lavoro.
          </p>
        </div>
      }
    >
      <TredicesimaCalculator />
    </ToolPage>
  );
}
