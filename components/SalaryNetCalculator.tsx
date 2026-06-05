"use client";

import { useMemo, useState } from "react";

export default function SalaryNetCalculator() {
  const [grossSalary, setGrossSalary] = useState("6500");
  const [avsRate, setAvsRate] = useState("5.3");
  const [alvRate, setAlvRate] = useState("1.1");
  const [accidentRate, setAccidentRate] = useState("1.2");
  const [pensionRate, setPensionRate] = useState("7");
  const [otherRate, setOtherRate] = useState("0");

  const result = useMemo(() => {
    const gross = Number(grossSalary) || 0;
    const totalRate =
      (Number(avsRate) || 0) +
      (Number(alvRate) || 0) +
      (Number(accidentRate) || 0) +
      (Number(pensionRate) || 0) +
      (Number(otherRate) || 0);
    const deductions = (gross * totalRate) / 100;

    return {
      deductions,
      net: Math.max(gross - deductions, 0),
      totalRate,
    };
  }, [grossSalary, avsRate, alvRate, accidentRate, pensionRate, otherRate]);

  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-2 block font-semibold">Salario lordo mensile CHF</span>
          <input
            type="number"
            min="0"
            value={grossSalary}
            onChange={(event) => setGrossSalary(event.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </label>

        <RateInput label="AVS/AI/IPG %" value={avsRate} onChange={setAvsRate} />
        <RateInput label="AD/ALV %" value={alvRate} onChange={setAlvRate} />
        <RateInput label="Infortunio non professionale %" value={accidentRate} onChange={setAccidentRate} />
        <RateInput label="Cassa pensione %" value={pensionRate} onChange={setPensionRate} />
        <RateInput label="Altre deduzioni o imposta alla fonte %" value={otherRate} onChange={setOtherRate} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <ResultCard label="Totale deduzioni" value={`${result.totalRate.toFixed(2)}%`} />
        <ResultCard label="Importo deduzioni" value={`CHF ${result.deductions.toFixed(2)}`} />
        <ResultCard label="Netto stimato" value={`CHF ${result.net.toFixed(2)}`} strong />
      </div>
    </section>
  );
}

function RateInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-semibold">{label}</span>
      <input
        type="number"
        min="0"
        step="0.1"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border p-4"
      />
    </label>
  );
}

function ResultCard({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className={strong ? "rounded-xl bg-green-100 p-5" : "rounded-xl bg-gray-100 p-5"}>
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-950">{value}</p>
    </div>
  );
}
