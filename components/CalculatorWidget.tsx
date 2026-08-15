"use client";

import { useMemo, useState } from "react";
import type { Calculator } from "@/lib/calculators";
import { sendAnalyticsEvent } from "@/lib/analytics-events";
import type { Locale } from "@/lib/i18n";

type Values = Record<string, string>;
type ResultRow = { label: string; value: string };
const completeLabels: Record<Locale, string> = {
  de: "Ergebnis geprüft",
  it: "Risultato verificato",
  en: "Result checked",
  fr: "Resultat verifie",
};

export default function CalculatorWidget({ calculator }: { calculator: Calculator }) {
  const locale = calculator.locale ?? "it";
  const defaults = Object.fromEntries(
    calculator.inputs.map((input) => [input.key, input.defaultValue]),
  );
  const [values, setValues] = useState<Values>(defaults);
  const [started, setStarted] = useState(false);

  const results = useMemo(
    () => calculate(calculator, values).map((row, index) => ({
      ...row,
      label: calculator.resultLabels?.[index] ?? row.label,
    })),
    [calculator, values],
  );

  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <div className="grid gap-4 md:grid-cols-2">
        {calculator.inputs.map((input) => (
          <label key={input.key} className="block">
            <span className="mb-2 block font-semibold text-gray-900">{input.label}</span>
            {input.type === "select" ? (
              <select
                value={values[input.key] ?? input.defaultValue}
                onChange={(event) => {
                  trackCalculatorStart();
                  setValues((current) => ({ ...current, [input.key]: event.target.value }));
                }}
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
                onChange={(event) => {
                  trackCalculatorStart();
                  setValues((current) => ({ ...current, [input.key]: event.target.value }));
                }}
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
      <button
        type="button"
        onClick={() => sendAnalyticsEvent("calculator_completed", {
          calculatorId: calculator.id ?? calculator.slug,
          source: calculator.slug,
        })}
        className="mt-5 rounded-xl bg-gray-950 px-5 py-3 font-bold text-white"
      >
        {completeLabels[locale]}
      </button>
    </section>
  );

  function trackCalculatorStart() {
    if (started) return;
    setStarted(true);
    sendAnalyticsEvent("calculator_started", {
      calculatorId: calculator.id ?? calculator.slug,
      source: calculator.slug,
    });
  }
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

function calculate(calculator: Calculator, values: Values): ResultRow[] {
  switch (calculator.kind) {
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
    case "working-time": {
      const [startH, startM] = (values.start || "00:00").split(":").map(Number);
      const [endH, endM] = (values.end || "00:00").split(":").map(Number);
      const start = startH * 60 + startM;
      let end = endH * 60 + endM;
      if (end < start) end += 24 * 60;
      const dailyHours = Math.max(end - start - number(values, "breakMinutes"), 0) / 60;
      const weeklyHours = dailyHours * number(values, "daysPerWeek");
      return [
        { label: "Pro Tag", value: `${dailyHours.toFixed(2)} h` },
        { label: "Pro Woche", value: `${weeklyHours.toFixed(2)} h` },
        { label: "Pro Monat", value: `${(weeklyHours * 52 / 12).toFixed(2)} h` },
      ];
    }
    case "overtime-ch": {
      const actualHours = number(values, "actualHours");
      const targetHours = number(values, "targetHours");
      const hourlyWage = number(values, "hourlyWage");
      const supplementRate = number(values, "supplementRate") / 100;
      const overtimeHours = Math.max(actualHours - targetHours, 0);
      const compensation = overtimeHours * hourlyWage * (1 + supplementRate);
      return [
        { label: "Ueberstunden", value: `${overtimeHours.toFixed(2)} h` },
        { label: "Zuschlag", value: `${(supplementRate * 100).toFixed(0)}%` },
        { label: "Auszahlung geschaetzt", value: money(compensation) },
      ];
    }
    case "working-days-ch": {
      const calendarDays = number(values, "calendarDays");
      const weekendDays = number(values, "weekendDays");
      const publicHolidays = number(values, "publicHolidays");
      const vacationDays = number(values, "vacationDays");
      const workdays = Math.max(calendarDays - weekendDays - publicHolidays - vacationDays, 0);
      return [
        { label: "Kalendertage", value: `${calendarDays.toFixed(0)}` },
        { label: "Abzuege", value: `${(weekendDays + publicHolidays + vacationDays).toFixed(0)}` },
        { label: "Arbeitstage", value: `${workdays.toFixed(0)}` },
      ];
    }
    case "work-percentage-ch": {
      const fullTimeHours = number(values, "fullTimeHours");
      const weeklyHours = number(values, "weeklyHours");
      const workDays = Math.max(number(values, "workDays"), 1);
      const employmentRate = fullTimeHours > 0 ? (weeklyHours / fullTimeHours) * 100 : 0;
      return [
        { label: "Ore settimanali", value: `${weeklyHours.toFixed(1)} h` },
        { label: "Media per giorno", value: `${(weeklyHours / workDays).toFixed(2)} h` },
        { label: "Grado d'occupazione", value: percent(employmentRate) },
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
      const dayUnit = calculator.locale === "de" ? "Tage" : "giorni";
      return [
        { label: "Ferie annue", value: `${annualDays.toFixed(1)} ${dayUnit}` },
        { label: "Mesi conteggiati", value: `${Math.min(number(values, "months"), 12)}` },
        { label: "Ferie maturate", value: `${prorated.toFixed(1)} ${dayUnit}` },
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
    case "mortgage-affordability-ch": {
      const grossIncome = number(values, "grossIncome");
      const propertyPrice = number(values, "propertyPrice");
      const equity = number(values, "equity");
      const mortgageDebt = Math.max(propertyPrice - equity, 0);
      const interestCost = (mortgageDebt * number(values, "imputedRate")) / 100;
      const ancillaryCost = (propertyPrice * number(values, "ancillaryRate")) / 100;
      const annualCost = interestCost + ancillaryCost;
      const affordability = grossIncome > 0 ? (annualCost / grossIncome) * 100 : 0;
      const limit = (grossIncome * number(values, "maxShare")) / 100;
      return [
        { label: "Ipoteca stimata", value: money(mortgageDebt) },
        { label: "Costi teorici annui", value: money(annualCost) },
        { label: "Quota reddito", value: `${affordability.toFixed(2)}% / ${money(limit)}` },
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
    case "withholding-tax-ch": {
      const gross = number(values, "gross");
      const social = (gross * number(values, "socialRate")) / 100;
      const tax = (gross * number(values, "taxRate")) / 100;
      return [
        { label: "Contributi stimati", value: money(social) },
        { label: "Imposta alla fonte", value: money(tax) },
        { label: "Netto stimato", value: money(Math.max(gross - social - tax, 0)) },
      ];
    }
    case "health-insurance-ch": {
      const annualPremium = number(values, "premium") * 12;
      const franchiseCost = Math.min(number(values, "medicalCosts"), number(values, "franchise"));
      const coPay = Math.max(number(values, "medicalCosts") - number(values, "franchise"), 0) * 0.1;
      const total = annualPremium + franchiseCost + coPay;
      return [
        { label: "Premi annui", value: money(annualPremium) },
        { label: "Costi sanitari stimati", value: money(franchiseCost + coPay) },
        { label: "Costo annuo stimato", value: money(total) },
      ];
    }
    case "premium-subsidy-ch": {
      const annualIncome = number(values, "annualIncome");
      const annualPremium = number(values, "annualPremium");
      const maxShare = number(values, "maxShare") / 100;
      const affordableShare = annualIncome * maxShare;
      const subsidy = Math.max(annualPremium - affordableShare, 0);
      return [
        { label: "Premi annui", value: money(annualPremium) },
        { label: "Quota sostenibile", value: money(affordableShare) },
        { label: "Riduzione stimata", value: money(subsidy) },
      ];
    }
    case "rent-affordability-ch": {
      const netIncome = number(values, "netIncome");
      const maxHousing = (netIncome * number(values, "rentRate")) / 100;
      const maxRent = Math.max(maxHousing - number(values, "otherHousingCosts"), 0);
      return [
        { label: "Budget casa totale", value: money(maxHousing) },
        { label: "Spese extra", value: money(number(values, "otherHousingCosts")) },
        { label: "Affitto sostenibile", value: money(maxRent) },
      ];
    }
    case "hourly-wage-ch": {
      const annualSalary = number(values, "monthlySalary") * 12;
      const annualHours = number(values, "hoursPerWeek") * number(values, "weeksPerYear");
      const hourly = annualHours > 0 ? annualSalary / annualHours : 0;
      return [
        { label: "Salario annuo", value: money(annualSalary) },
        { label: "Ore annue", value: `${annualHours.toFixed(0)} h` },
        { label: "Salario orario", value: money(hourly) },
      ];
    }
    case "part-time-salary-ch": {
      const gross = (number(values, "fullTimeSalary") * number(values, "workPercent")) / 100;
      const deductions = (gross * number(values, "deductionRate")) / 100;
      return [
        { label: "Lordo part-time", value: money(gross) },
        { label: "Deduzioni stimate", value: money(deductions) },
        { label: "Netto stimato", value: money(Math.max(gross - deductions, 0)) },
      ];
    }
    case "pillar3a-tax-ch": {
      const yearlySaving = (number(values, "contribution") * number(values, "marginalTaxRate")) / 100;
      const years = Math.max(number(values, "years"), 1);
      return [
        { label: "Risparmio fiscale annuo", value: money(yearlySaving) },
        { label: "Versamenti totali", value: money(number(values, "contribution") * years) },
        { label: "Risparmio fiscale totale", value: money(yearlySaving * years) },
      ];
    }
    case "monthly-budget-ch": {
      const expenses = number(values, "rent") + number(values, "healthInsurance") + number(values, "otherCosts");
      const remaining = number(values, "income") - expenses;
      const savingsRate = number(values, "income") > 0 ? (remaining / number(values, "income")) * 100 : 0;
      return [
        { label: "Spese totali", value: money(expenses) },
        { label: "Tasso risparmio", value: percent(savingsRate) },
        { label: "Saldo mensile", value: money(remaining) },
      ];
    }
    case "car-cost-ch": {
      const monthly = number(values, "leasing") + number(values, "insurance") + number(values, "fuel") + number(values, "maintenance");
      return [
        { label: "Costo mensile", value: money(monthly) },
        { label: "Costo annuo", value: money(monthly * 12) },
        { label: "Costo medio giorno", value: money((monthly * 12) / 365) },
      ];
    }
    case "freelance-rate-ch": {
      const requiredRevenue = number(values, "targetIncome") + number(values, "annualCosts");
      const billableHours = number(values, "billableDays") * number(values, "hoursPerDay");
      const hourlyRate = billableHours > 0 ? requiredRevenue / billableHours : 0;
      return [
        { label: "Ricavi necessari", value: money(requiredRevenue) },
        { label: "Tariffa giornaliera", value: money(hourlyRate * number(values, "hoursPerDay")) },
        { label: "Tariffa oraria", value: money(hourlyRate) },
      ];
    }
    case "selling-price": {
      const cost = number(values, "cost");
      const marginRate = Math.min(number(values, "marginRate"), 95) / 100;
      const netPrice = marginRate < 1 ? cost / Math.max(1 - marginRate, 0.01) : cost;
      const vat = (netPrice * number(values, "vatRate")) / 100;
      return [
        { label: "Prezzo netto", value: money(netPrice) },
        { label: "IVA", value: money(vat) },
        { label: "Prezzo finale", value: money(netPrice + vat) },
      ];
    }
    case "ahv-13th-pension-ch": {
      const monthlyPension = number(values, "monthlyPension");
      const eligibleMonths = Math.min(Math.max(number(values, "eligibleMonths"), 1), 12);
      const annualPension = monthlyPension * eligibleMonths;
      const thirteenthPension = Math.round(annualPension / 12);
      return [
        { label: "Rendita annua conteggiata", value: money(annualPension) },
        { label: "Mesi considerati", value: `${eligibleMonths}` },
        { label: "Tredicesima AVS stimata", value: money(thirteenthPension) },
      ];
    }
    case "self-employed-ahv-ch": {
      const income = number(values, "netIncome");
      const calculatedContribution = (income * number(values, "contributionRate")) / 100;
      const contribution = income > 0
        ? Math.max(calculatedContribution, number(values, "minimumContribution"))
        : 0;
      const adminCosts = (contribution * number(values, "adminRate")) / 100;
      return [
        { label: "AVS/AI/IPG stimati", value: money(contribution) },
        { label: "Spese amministrative", value: money(adminCosts) },
        { label: "Totale annuo stimato", value: money(contribution + adminCosts) },
      ];
    }
    case "family-allowances-ch": {
      const childAllowance = number(values, "childAllowance");
      const educationAllowance = number(values, "educationAllowance");
      const childCount = number(values, "childCount");
      const trainingCount = number(values, "trainingCount");
      const months = Math.min(Math.max(number(values, "months"), 1), 12);
      const monthlyTotal = (childAllowance * childCount) + (educationAllowance * trainingCount);
      return [
        { label: "Importo mensile", value: money(monthlyTotal) },
        { label: "Mesi di diritto", value: `${months}` },
        { label: "Importo annuo", value: money(monthlyTotal * months) },
      ];
    }
    case "maternity-allowance-ch": {
      const income = number(values, "income");
      const dailyIncome = values.incomeType === "annual" ? income / 360 : income / 30;
      const dailyAllowance = Math.min(dailyIncome * 0.8, 220);
      const days = Math.min(Math.max(number(values, "days"), 1), 154);
      return [
        { label: "Indennita giornaliera", value: money(dailyAllowance) },
        { label: "Giorni conteggiati", value: `${days}` },
        { label: "Indennita totale stimata", value: money(dailyAllowance * days) },
      ];
    }
    case "unemployment-benefit-ch": {
      const insuredIncome = Math.min(number(values, "insuredIncome"), 12350);
      const rate = number(values, "compensationRate") / 100;
      const payableDays = Math.min(Math.max(number(values, "payableDays"), 1), 23);
      const dailyAllowance = (insuredIncome / 21.7) * rate;
      return [
        { label: "Guadagno assicurato", value: money(insuredIncome) },
        { label: "Indennita giornaliera", value: money(dailyAllowance) },
        { label: "Indennita mensile lorda", value: money(dailyAllowance * payableDays) },
      ];
    }
    case "ahv-pension-gap-ch": {
      const referenceYears = Math.min(Math.max(number(values, "referenceYears"), 1), 44);
      const contributionYears = Math.min(Math.max(number(values, "contributionYears"), 1), referenceYears);
      const missingYears = Math.max(referenceYears - contributionYears, 0);
      const reductionRate = (missingYears / referenceYears) * 100;
      const estimatedPension = number(values, "fullPension") * (contributionYears / referenceYears);
      return [
        { label: "Anni mancanti", value: `${missingYears}` },
        { label: "Riduzione indicativa", value: percent(reductionRate) },
        { label: "Rendita mensile stimata", value: money(estimatedPension) },
      ];
    }
  }
}
