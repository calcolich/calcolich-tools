"use client";

import { useMemo, useState } from "react";

export default function TredicesimaCalculator() {
  const [monthlySalary, setMonthlySalary] = useState("5000");
  const [monthsWorked, setMonthsWorked] = useState("12");

  const result = useMemo(() => {
    const salary = Number(monthlySalary) || 0;
    const months = Math.min(Math.max(Number(monthsWorked) || 0, 0), 12);
    return (salary * months) / 12;
  }, [monthlySalary, monthsWorked]);

  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-semibold">Salario mensile lordo</span>
          <input
            type="number"
            min="0"
            value={monthlySalary}
            onChange={(event) => setMonthlySalary(event.target.value)}
            className="w-full rounded-xl border p-4"
            placeholder="Es. 5000"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-semibold">Mesi lavorati nell&apos;anno</span>
          <input
            type="number"
            min="0"
            max="12"
            value={monthsWorked}
            onChange={(event) => setMonthsWorked(event.target.value)}
            className="w-full rounded-xl border p-4"
            placeholder="Es. 12"
          />
        </label>
      </div>

      <div className="mt-6 rounded-xl bg-green-100 p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-900">
          Tredicesima stimata
        </p>
        <p className="mt-1 text-3xl font-bold text-green-950">
          CHF {result.toFixed(2)}
        </p>
      </div>
    </section>
  );
}
