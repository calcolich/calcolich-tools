"use client";

import { useState } from "react";

type RunResult = {
  ok?: boolean;
  task?: {
    title?: string;
    status?: string;
    result?: string;
    auditResult?: {
      status?: string;
      reason?: string;
    };
  };
  error?: string;
};

const actions = [
  { kind: "seo", label: "Esegui SEO audit", description: "Controlla sitemap, robots, metadata e SEO dei calcolatori." },
  { kind: "tech", label: "Esegui Tech check", description: "Esegue controlli tecnici reali, incluso lint." },
];

export default function JarvisControlPanel() {
  const [running, setRunning] = useState<string | null>(null);
  const [result, setResult] = useState<RunResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(kind: string) {
    setRunning(kind);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/jarvis/run", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind }),
      });
      const payload = await response.json() as RunResult;
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Jarvis run failed");
      }
      setResult(payload);
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : "Errore sconosciuto");
    } finally {
      setRunning(null);
    }
  }

  return (
    <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Comandi</p>
        <h2 className="mt-1 text-2xl font-black">Azioni operative</h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {actions.map((action) => (
          <button
            key={action.kind}
            type="button"
            onClick={() => run(action.kind)}
            disabled={running !== null}
            className="rounded-xl border border-gray-200 p-4 text-left transition hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-wait disabled:opacity-60"
          >
            <span className="block font-black text-gray-950">
              {running === action.kind ? "In esecuzione..." : action.label}
            </span>
            <span className="mt-2 block text-sm font-semibold leading-6 text-gray-600">
              {action.description}
            </span>
          </button>
        ))}
      </div>

      {result?.task ? (
        <article className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-black text-emerald-800">{result.task.title}</p>
          <p className="mt-1 text-sm font-semibold text-emerald-900">
            {result.task.status} · Auditor {result.task.auditResult?.status ?? "n/a"}
          </p>
          {result.task.result ? <p className="mt-2 text-sm leading-6 text-emerald-950">{result.task.result}</p> : null}
        </article>
      ) : null}

      {error ? (
        <article className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-800">
          {error}
        </article>
      ) : null}
    </section>
  );
}
