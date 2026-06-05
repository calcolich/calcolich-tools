"use client";

import { useMemo, useState } from "react";
import type { Calculator } from "@/lib/calculators";

type Values = Record<string, string>;
type ResultRow = { label: string; value: string };

export default function CalculatorWidget({ calculator }: { calculator: Calculator }) {
  const defaults = Object.fromEntries(
    calculator.inputs.map((input) => [input.key, input.defaultValue]),
  );
  const [values, setValues] = useState<Values>(defaults);

  const results = useMemo(() => calculate(calculator.kind, values), [calculator.kind, values]);

  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <div className="grid gap-4 md:grid-cols-2">
        {calculator.inputs.map((input) => (
          <label key={input.key} className="block">
            <span className="mb-2 block font-semibold text-gray-900">{input.label}</span>
            {input.type === "select" ? (
              <select
                value={values[input.key] ?? input.defaultValue}
                onChange={(event) => setValues((current) => ({ ...current, [input.key]: event.target.value }))}
                className="w-full rounded-xl border border-gray-300 bg-white p-4"
              >
                {input.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={input.type ?? "number"}
                min={input.min}
                max={input.max}
                step={input.step}
                placeholder={input.placeholder}
                value={values[input.key] ?? input.defaultValue}
                onChange={(event) => setValues((current) => ({ ...current, [input.key]: event.target.value }))}
                className="w-full rounded-xl border border-gray-300 p-4"
              />
            )}
          </label>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {results.map((row, index) => (
          <div
            key={row.label}
            className={index === results.length - 1 ? "rounded-xl bg-green-100 p-5" : "rounded-xl bg-gray-100 p-5"}
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">{row.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-950">{row.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function number(values: Values, key: string) {
  return Number(values[key]) || 0;
}

function money(value: number) {
  return `CHF ${value.toFixed(2)}`;
}

function percent(value: number) {
  return `${value.toFixed(2)}%`;
}

function calculate(kind: Calculator["kind"], values: Values): ResultRow[] {
  switch (kind) {
    case "work-hours": {
      const [startH, startM] = (values.start || "00:00").split(":").map(Number);
      const [endH, endM] = (values.end || "00:00").split(":").map(Number);
      const start = startH * 60 + startM;
      let end = endH * 60 + endM;
      if (end < start) end += 24 * 60;
      const netMinutes = Math.max(end - start - number(values, "breakMinutes"), 0);
      const hours = Math.floor(netMinutes / 60);
      const minutes = netMinutes % 60;
      return [
        { label: "Minuti netti", value: `${netMinutes}` },
        { label: "Ore decimali", value: `${(netMinutes / 60).toFixed(2)} h` },
        { label: "Totale lavorato", value: `${hours} h ${minutes} min` },
      ];
    }
    case "salary-net-ch": {
      const gross = number(values, "gross");
      const rate = number(values, "avs") + number(values, "alv") + number(values, "accident") + number(values, "pension") + number(values, "other");
      const deductions = (gross * rate) / 100;
      return [
        { label: "Deduzioni", value: `${rate.toFixed(2)}%` },
        { label: "Trattenute", value: money(deductions) },
        { label: "Netto stimato", value: money(Math.max(gross - deductions, 0)) },
      ];
    }
    case "gross-net-ch": {
      const amount = number(values, "amount");
      const rate = number(values, "deductionRate") / 100;
      const mode = values.mode;
      const net = mode === "net-to-gross" ? amount : amount * (1 - rate);
      const gross = mode === "net-to-gross" ? amount / Math.max(1 - rate, 0.01) : amount;
      return [
        { label: "Deduzioni stimate", value: money(Math.max(gross - net, 0)) },
        { label: "Lordo", value: money(gross) },
        { label: "Netto", value: money(net) },
      ];
    }
    case "vacation-ch": {
      const annualDays = number(values, "daysPerWeek") * number(values, "weeks");
      const prorated = (annualDays * Math.min(number(values, "months"), 12)) / 12;
      return [
        { label: "Ferie annue", value: `${annualDays.toFixed(1)} giorni` },
        { label: "Mesi conteggiati", value: `${Math.min(number(values, "months"), 12)}` },
        { label: "Ferie maturate", value: `${prorated.toFixed(1)} giorni` },
      ];
    }
    case "vat-ch": {
      const amount = number(values, "amount");
      const rate = number(values, "rate") / 100;
      const net = values.mode === "remove" ? amount / (1 + rate) : amount;
      const vat = values.mode === "remove" ? amount - net : amount * rate;
      const total = values.mode === "remove" ? amount : amount + vat;
      return [
        { label: "Imponibile", value: money(net) },
        { label: "IVA", value: money(vat) },
        { label: "Totale", value: money(total) },
      ];
    }
    case "compound-interest": {
      const monthlyRate = number(values, "rate") / 100 / 12;
      const months = number(values, "years") * 12;
      let balance = number(values, "initial");
      for (let i = 0; i < months; i += 1) {
        balance = balance * (1 + monthlyRate) + number(values, "monthly");
      }
      const invested = number(values, "initial") + number(values, "monthly") * months;
      return [
        { label: "Totale versato", value: money(invested) },
        { label: "Crescita stimata", value: money(balance - invested) },
        { label: "Capitale finale", value: money(balance) },
      ];
    }
    case "mortgage-ch": {
      const principal = number(values, "principal");
      const months = number(values, "years") * 12;
      const monthlyRate = number(values, "rate") / 100 / 12;
      const payment = monthlyRate === 0 ? principal / months : principal * (monthlyRate / (1 - (1 + monthlyRate) ** -months));
      return [
        { label: "Rata mensile", value: money(payment) },
        { label: "Totale pagato", value: money(payment * months) },
        { label: "Interessi totali", value: money(payment * months - principal) },
      ];
    }
    case "trading-risk":
    case "forex-lot-size": {
      const riskMoney = (number(values, "account") * number(values, "riskPercent")) / 100;
      const lotSize = riskMoney / Math.max(number(values, "stopPips") * number(values, "pipValue"), 0.0001);
      return [
        { label: "Rischio massimo", value: money(riskMoney) },
        { label: "Stop", value: `${number(values, "stopPips").toFixed(1)} pips` },
        { label: "Lot size stimata", value: `${lotSize.toFixed(2)} lotti` },
      ];
    }
    case "drawdown": {
      const start = number(values, "startEquity");
      const current = number(values, "currentEquity");
      const loss = Math.max(start - current, 0);
      const drawdown = start > 0 ? (loss / start) * 100 : 0;
      const recovery = current > 0 ? (loss / current) * 100 : 0;
      return [
        { label: "Perdita", value: money(loss) },
        { label: "Drawdown", value: `${drawdown.toFixed(2)}%` },
        { label: "Recupero necessario", value: `${recovery.toFixed(2)}%` },
      ];
    }
    case "percentage": {
      const base = number(values, "base");
      const rate = number(values, "rate");
      const amount = (base * rate) / 100;
      return [
        { label: "Base", value: money(base) },
        { label: "Percentuale", value: percent(rate) },
        { label: "Risultato", value: money(amount) },
      ];
    }
    case "discount": {
      const price = number(values, "price");
      const discountRate = number(values, "discountRate");
      const discount = (price * discountRate) / 100;
      return [
        { label: "Sconto", value: money(discount) },
        { label: "Percentuale", value: percent(discountRate) },
        { label: "Prezzo finale", value: money(Math.max(price - discount, 0)) },
      ];
    }
    case "percentage-change": {
      const startValue = number(values, "startValue");
      const endValue = number(values, "endValue");
      const change = endValue - startValue;
      const rate = startValue !== 0 ? (change / startValue) * 100 : 0;
      return [
        { label: "Variazione", value: money(change) },
        { label: "Valore iniziale", value: money(startValue) },
        { label: "Cambio percentuale", value: percent(rate) },
      ];
    }
    case "margin-markup": {
      const cost = number(values, "cost");
      const price = number(values, "price");
      const profit = price - cost;
      const margin = price > 0 ? (profit / price) * 100 : 0;
      const markup = cost > 0 ? (profit / cost) * 100 : 0;
      return [
        { label: "Profitto", value: money(profit) },
        { label: "Markup", value: percent(markup) },
        { label: "Margine", value: percent(margin) },
      ];
    }
    case "roi": {
      const cost = number(values, "cost");
      const gain = number(values, "gain");
      const profit = gain - cost;
      const roi = cost > 0 ? (profit / cost) * 100 : 0;
      return [
        { label: "Profitto netto", value: money(profit) },
        { label: "Investimento", value: money(cost) },
        { label: "ROI", value: percent(roi) },
      ];
    }
    case "break-even": {
      const fixedCosts = number(values, "fixedCosts");
      const price = number(values, "price");
      const variableCost = number(values, "variableCost");
      const contribution = Math.max(price - variableCost, 0);
      const units = contribution > 0 ? fixedCosts / contribution : 0;
      return [
        { label: "Margine unitario", value: money(contribution) },
        { label: "Costi fissi", value: money(fixedCosts) },
        { label: "Punto pareggio", value: `${Math.ceil(units)} vendite` },
      ];
    }
    case "loan-payment": {
      const principal = number(values, "principal");
      const months = Math.max(number(values, "months"), 1);
      const monthlyRate = number(values, "rate") / 100 / 12;
      const payment = monthlyRate === 0 ? principal / months : principal * (monthlyRate / (1 - (1 + monthlyRate) ** -months));
      return [
        { label: "Rata mensile", value: money(payment) },
        { label: "Totale pagato", value: money(payment * months) },
        { label: "Interessi", value: money(payment * months - principal) },
      ];
    }
    case "profit-loss": {
      const entry = number(values, "entry");
      const exit = number(values, "exit");
      const quantity = number(values, "quantity");
      const direction = values.direction === "short" ? -1 : 1;
      const profit = (exit - entry) * quantity * direction;
      const exposure = entry * quantity;
      const roi = exposure > 0 ? (profit / exposure) * 100 : 0;
      return [
        { label: "Esposizione", value: money(exposure) },
        { label: "Rendimento", value: percent(roi) },
        { label: "Profitto/perdita", value: money(profit) },
      ];
    }
    case "risk-reward": {
      const entry = number(values, "entry");
      const stop = number(values, "stop");
      const target = number(values, "target");
      const risk = Math.abs(entry - stop);
      const reward = Math.abs(target - entry);
      const ratio = risk > 0 ? reward / risk : 0;
      return [
        { label: "Rischio per unita", value: money(risk) },
        { label: "Profitto potenziale", value: money(reward) },
        { label: "Risk reward", value: `1:${ratio.toFixed(2)}` },
      ];
    }
    case "savings-goal": {
      const goal = number(values, "goal");
      const current = number(values, "current");
      const monthly = number(values, "monthly");
      const remaining = Math.max(goal - current, 0);
      const months = monthly > 0 ? remaining / monthly : 0;
      return [
        { label: "Manca", value: money(remaining) },
        { label: "Risparmio mensile", value: money(monthly) },
        { label: "Tempo stimato", value: `${Math.ceil(months)} mesi` },
      ];
    }
    case "hourly-cost": {
      const monthlyCost = number(values, "monthlyCost");
      const hours = number(values, "hours");
      const hourly = hours > 0 ? monthlyCost / hours : 0;
      return [
        { label: "Costo mensile", value: money(monthlyCost) },
        { label: "Ore mensili", value: `${hours.toFixed(1)} h` },
        { label: "Costo orario", value: money(hourly) },
      ];
    }
    case "annual-monthly": {
      const annual = number(values, "annual");
      const months = Math.max(number(values, "months"), 1);
      return [
        { label: "Importo annuale", value: money(annual) },
        { label: "Mensilita", value: `${months}` },
        { label: "Importo mensile", value: money(annual / months) },
      ];
    }
  }
}
