import Link from "next/link";
import type { Metadata } from "next";
import { getJarvisStatus } from "@/lib/jarvis-engine.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rapporto Jarvis | Calcolich",
  description: "Rapporto finale operativo di Jarvis Engine v1 per Calcolich.",
};

type JarvisReport = {
  status: string;
  stats: {
    running: number;
    queued: number;
    completedToday: number;
    errors: number;
    approvals: number;
  };
  nextAction: string;
  integrations: Array<{
    id: string;
    label: string;
    mode: string;
    status: string;
    requiresApproval: boolean;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    status: string;
    agent: string;
    result?: string | null;
    auditResult?: { status: string; reason: string; risk: string } | null;
  }>;
};

const implemented = [
  "Jarvis Core file-based",
  "Task engine con stati e priorita",
  "Agenti Tech, SEO, Content, Data, Monetization e Auditor",
  "SEO audit reale sul repository",
  "Tech health check reale",
  "Memoria persistente locale",
  "Activity feed reale",
  "Approval inbox",
  "Dashboard /jarvis",
  "Dashboard social /social",
  "API interne /api/jarvis/*",
  "Smoke test Jarvis",
  "Documentazione operativa",
];

const verified = [
  "npm run jarvis:test",
  "npm run lint",
  "npm run build",
];

const blocked = [
  "Google Search Console: mancano credenziali",
  "Google Analytics: mancano credenziali",
  "AdSense: mancano ID/account",
  "GitHub/Vercel API: mancano token o collegamento",
  "Pubblicazione automatica social: richiede approvazione account",
];

export default async function JarvisReportPage() {
  const jarvis = await getJarvisStatus() as JarvisReport;
  const latestTasks = jarvis.tasks.slice(0, 8);

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-10 text-gray-950 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-emerald-700">Rapporto finale</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">Jarvis Engine v1</h1>
          </div>
          <Link href="/jarvis" className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-black hover:border-emerald-300 hover:bg-emerald-50">
            Torna a Jarvis
          </Link>
        </div>

        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-gray-500">Stato</p>
          <p className="mt-2 text-3xl font-black text-emerald-700">{jarvis.status}</p>
          <p className="mt-3 text-lg font-semibold text-gray-700">{jarvis.nextAction}</p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-5">
          <Metric label="Running" value={jarvis.stats.running} />
          <Metric label="Queued" value={jarvis.stats.queued} />
          <Metric label="Completati oggi" value={jarvis.stats.completedToday} />
          <Metric label="Errori" value={jarvis.stats.errors} />
          <Metric label="Approval" value={jarvis.stats.approvals} />
        </section>

        <Section title="Fatto" items={implemented} />
        <Section title="Test passati" items={verified} />
        <Section title="Bloccato" items={blocked} />

        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">Integrazioni</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {jarvis.integrations.map((integration) => (
              <article key={integration.id} className="rounded-xl border border-gray-100 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-black">{integration.label}</h3>
                  <p className="text-sm font-black text-emerald-700">{integration.status}</p>
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-600">{integration.mode}</p>
                {integration.requiresApproval ? <p className="mt-2 text-sm font-bold text-gray-700">Approval richiesta per azioni esterne.</p> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">Ultimi task Jarvis</h2>
          <div className="mt-4 grid gap-3">
            {latestTasks.map((task) => (
              <article key={task.id} className="rounded-xl border border-gray-100 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-black">{task.title}</h3>
                  <p className="text-sm font-black text-emerald-700">{task.status}</p>
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-600">{task.agent}</p>
                {task.result ? <p className="mt-2 text-sm leading-6 text-gray-700">{task.result}</p> : null}
                {task.auditResult ? <p className="mt-2 text-sm font-bold text-gray-700">Auditor: {task.auditResult.status}</p> : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </article>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {items.map((item) => (
          <p key={item} className="rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
