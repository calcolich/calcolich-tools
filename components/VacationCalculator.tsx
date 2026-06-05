"use client";

import { useMemo, useState } from "react";

export default function VacationCalculator() {
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState("5");
  const [vacationWeeks, setVacationWeeks] = useState("4");
  const [monthsWorked, setMonthsWorked] = useState("12");

  const result = useMemo(() => {
    const days = Number(workDaysPerWeek) || 0;
    const weeks = Number(vacationWeeks) || 0;
    const months = Math.min(Math.max(Number(monthsWorked) || 0, 0), 12);
    const annualDays = days * weeks;
    const proratedDays = (annualDays * months) / 12;
    const holidayPercent = weeks / (52 - weeks) * 100;

    return { annualDays, proratedDays, holidayPercent };
  }, [workDaysPerWeek, vacationWeeks, monthsWorked]);

  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="mb-2 block font-semibold">Giorni lavorati a settimana</span>
          <input
            type="number"
            min="1"
            max="7"
            value={workDaysPerWeek}
            onChange={(event) => setWorkDaysPerWeek(event.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-semibold">Settimane di ferie annue</span>
          <input
            type="number"
            min="0"
            step="0.5"
            value={vacationWeeks}
            onChange={(event) => setVacationWeeks(event.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-semibold">Mesi lavorati</span>
          <input
            type="number"
            min="0"
            max="12"
            value={monthsWorked}
            onChange={(event) => setMonthsWorked(event.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Result label="Ferie annue" value={`${result.annualDays.toFixed(1)} giorni`} />
        <Result label="Ferie maturate" value={`${result.proratedDays.toFixed(1)} giorni`} strong />
        <Result label="Percentuale indicativa" value={`${result.holidayPercent.toFixed(2)}%`} />
      </div>
    </section>
  );
}

function Result({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? "rounded-xl bg-green-100 p-5" : "rounded-xl bg-gray-100 p-5"}>
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-950">{value}</p>
    </div>
  );
}
