"use client";

import { useMemo, useState } from "react";

const dayMs = 24 * 60 * 60 * 1000;

export default function WorkingDaysCalculator() {
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState("2026-12-31");
  const [holidays, setHolidays] = useState("10");

  const result = useMemo(() => {
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      return { totalDays: 0, weekendDays: 0, workingDays: 0 };
    }

    let totalDays = 0;
    let weekendDays = 0;

    for (let time = start.getTime(); time <= end.getTime(); time += dayMs) {
      totalDays += 1;
      const day = new Date(time).getDay();
      if (day === 0 || day === 6) {
        weekendDays += 1;
      }
    }

    const holidayCount = Math.max(Number(holidays) || 0, 0);
    const workingDays = Math.max(totalDays - weekendDays - holidayCount, 0);

    return { totalDays, weekendDays, workingDays };
  }, [startDate, endDate, holidays]);

  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="mb-2 block font-semibold">Data inizio</span>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-semibold">Data fine</span>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-semibold">Festivi da sottrarre</span>
          <input
            type="number"
            min="0"
            value={holidays}
            onChange={(event) => setHolidays(event.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Result label="Giorni totali" value={result.totalDays} />
        <Result label="Weekend" value={result.weekendDays} />
        <Result label="Giorni lavorativi" value={result.workingDays} strong />
      </div>
    </section>
  );
}

function Result({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className={strong ? "rounded-xl bg-blue-100 p-5" : "rounded-xl bg-gray-100 p-5"}>
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">{label}</p>
      <p className="mt-1 text-3xl font-bold text-gray-950">{value}</p>
    </div>
  );
}
