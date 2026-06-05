"use client";

import { useMemo, useState } from "react";

export default function OvertimeCalculator() {
  const [hourlyRate, setHourlyRate] = useState("35");
  const [plannedHours, setPlannedHours] = useState("42");
  const [workedHours, setWorkedHours] = useState("46");
  const [supplement, setSupplement] = useState("25");

  const result = useMemo(() => {
    const planned = Number(plannedHours) || 0;
    const worked = Number(workedHours) || 0;
    const rate = Number(hourlyRate) || 0;
    const bonus = Number(supplement) || 0;
    const overtimeHours = Math.max(worked - planned, 0);
    const hourlyWithSupplement = rate * (1 + bonus / 100);

    return {
      overtimeHours,
      hourlyWithSupplement,
      payout: overtimeHours * hourlyWithSupplement,
    };
  }, [hourlyRate, plannedHours, workedHours, supplement]);

  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Tariffa oraria CHF" value={hourlyRate} onChange={setHourlyRate} />
        <Input label="Supplemento %" value={supplement} onChange={setSupplement} />
        <Input label="Ore previste" value={plannedHours} onChange={setPlannedHours} />
        <Input label="Ore lavorate" value={workedHours} onChange={setWorkedHours} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Result label="Straordinari" value={`${result.overtimeHours.toFixed(2)} h`} />
        <Result label="Tariffa con supplemento" value={`CHF ${result.hourlyWithSupplement.toFixed(2)}`} />
        <Result label="Importo stimato" value={`CHF ${result.payout.toFixed(2)}`} strong />
      </div>
    </section>
  );
}

function Input({
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

function Result({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? "rounded-xl bg-purple-100 p-5" : "rounded-xl bg-gray-100 p-5"}>
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-950">{value}</p>
    </div>
  );
}
