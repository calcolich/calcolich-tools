import Link from "next/link";
import type { Metadata } from "next";
import JarvisChatPanel from "@/components/JarvisChatPanel";
import JarvisControlPanel from "@/components/JarvisControlPanel";
import { getJarvisStatus, seedApprovalRequest } from "@/lib/jarvis-engine.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jarvis | Calcolich Command Center",
  description: "Dashboard operativa Jarvis per task, agenti, audit, memoria e approval.",
};

type JarvisDashboard = {
  status: string;
  stats: {
    running: number;
    queued: number;
    completedToday: number;
    errors: number;
    approvals: number;
  };
  nextAction: string;
  agents: Array<{ id: string; label: string; status: string }>;
  activity: Array<{ id: string; type: string; message: string; createdAt: string }>;
  approvals: Array<{ id: string; action: string; reason: string; risk: string; auditorResult: string }>;
  integrations: Array<{
    id: string;
    label: string;
    mode: string;
    status: string;
    requiresApproval: boolean;
    checks: Array<{ type: string; name: string; label: string; ok: boolean }>;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    status: string;
    agent: string;
    priority: string;
    authorizationLevel: string;
    result?: string | null;
  }>;
};

export default async function JarvisPage() {
  await seedApprovalRequest();
  const jarvis = await getJarvisStatus() as JarvisDashboard;

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-gray-950">
      <section className="border-b border-gray-200 bg-white px-5 py-6 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="text-xl font-black tracking-tight">Calcolich</Link>
          <nav className="flex flex-wrap items-center justify-end gap-2 text-sm font-semibold text-gray-600">
            <Link href="/jarvis/report" className="rounded-full px-3 py-2 hover:bg-gray-100">Rapporto</Link>
            <Link href="/social" className="rounded-full px-3 py-2 hover:bg-gray-100">Social</Link>
            <Link href="/api/jarvis/status" className="rounded-full px-3 py-2 hover:bg-gray-100">API</Link>
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-10">
        <section className="mb-8">
          <p className="mb-3 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
            JARVIS {jarvis.status}
          </p>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">Jarvis Command Center</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-700">
            Motore operativo file-based: crea task, assegna agenti, esegue audit reali, registra eventi e mantiene memoria locale.
          </p>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-5">
          <Stat label="Running" value={jarvis.stats.running} />
          <Stat label="Queued" value={jarvis.stats.queued} />
          <Stat label="Completati oggi" value={jarvis.stats.completedToday} />
          <Stat label="Errori" value={jarvis.stats.errors} />
          <Stat label="Approval" value={jarvis.stats.approvals} />
        </section>

        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Jarvis Next Action</p>
          <h2 className="mt-2 text-2xl font-black">{jarvis.nextAction}</h2>
        </section>

        <JarvisControlPanel />

        <JarvisChatPanel />

        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Notifiche</p>
          <h2 className="mt-1 text-2xl font-black">Webhook Jarvis</h2>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-gray-700">
            Jarvis puo inviare notifiche quando termina un workflow, quando un task fallisce o quando serve approval.
            Per attivarle imposta <code>JARVIS_NOTIFICATION_WEBHOOK_URL</code>. Se vuoi proteggere il webhook,
            aggiungi anche <code>JARVIS_NOTIFICATION_SECRET</code>.
          </p>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jarvis.agents.map((agent) => (
            <article key={agent.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-gray-500">{agent.id}</p>
              <h2 className="mt-2 text-xl font-black">{agent.label}</h2>
              <p className="mt-3 text-sm font-bold text-emerald-700">{agent.status}</p>
            </article>
          ))}
        </section>

        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Integrazioni</p>
              <h2 className="mt-1 text-2xl font-black">Cosa e collegato</h2>
            </div>
            <Link href="/api/jarvis/integrations" className="rounded-full border border-gray-300 px-4 py-2 text-sm font-black hover:border-emerald-300 hover:bg-emerald-50">
              API integrazioni
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {jarvis.integrations.map((integration) => (
              <article key={integration.id} className="rounded-xl border border-gray-100 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-black">{integration.label}</h3>
                  <p className={`text-sm font-black ${integration.status === "READY" ? "text-emerald-700" : integration.status === "PARTIAL" ? "text-amber-700" : "text-gray-500"}`}>
                    {integration.status}
                  </p>
                </div>
                <p className="mt-1 text-sm font-semibold text-gray-600">{integration.mode}</p>
                <div className="mt-3 grid gap-2">
                  {integration.checks.map((checkItem) => (
                    <p key={`${integration.id}-${checkItem.name}`} className="text-sm font-semibold text-gray-700">
                      {checkItem.ok ? "OK" : "Manca"}: {checkItem.label}
                    </p>
                  ))}
                </div>
                {integration.requiresApproval ? <p className="mt-3 text-sm font-black text-gray-700">Richiede approval prima di azioni esterne.</p> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Dati reali</p>
          <h2 className="mt-1 text-2xl font-black">Import manuale consigliato</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <article className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-black">Search Console</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-gray-700">
                Metti export CSV o JSON in <code>search-console/exports</code>. Jarvis usera query,
                click, impression, CTR e posizione come dati reali.
              </p>
            </article>
            <article className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-black">Analytics</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-gray-700">
                Metti export CSV o JSON in <code>analytics/exports</code>. Jarvis usera sessioni,
                utenti, eventi e conversioni senza inventare metriche.
              </p>
            </article>
          </div>
        </section>

        <section className="mb-8 grid gap-5 lg:grid-cols-[1fr_380px]">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-black">Activity Feed</h2>
            <div className="mt-4 divide-y divide-gray-100">
              {jarvis.activity.map((item) => (
                <article key={item.id} className="py-3">
                  <p className="text-sm font-black text-emerald-700">{item.type}</p>
                  <p className="mt-1 font-semibold">{item.message}</p>
                  <p className="mt-1 text-xs text-gray-500">{item.createdAt}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-black">Requires Approval</h2>
            <div className="mt-4 space-y-4">
              {jarvis.approvals.length === 0 ? <p className="text-sm font-semibold text-gray-600">Nessuna approval pendente.</p> : null}
              {jarvis.approvals.map((approval) => (
                <article key={approval.id} className="border-t border-gray-100 pt-4 first:border-t-0 first:pt-0">
                  <h3 className="font-black">{approval.action}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{approval.reason}</p>
                  <p className="mt-2 text-sm font-bold text-gray-700">Rischio: {approval.risk}</p>
                  <p className="mt-1 text-sm font-bold text-emerald-700">{approval.auditorResult}</p>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black">Task</h2>
          <div className="mt-4 grid gap-3">
            {jarvis.tasks.map((task) => (
              <article key={task.id} className="rounded-xl border border-gray-100 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-black">{task.title}</h3>
                  <p className="text-sm font-black text-emerald-700">{task.status}</p>
                </div>
                <p className="mt-2 text-sm text-gray-600">{task.agent} · {task.priority} · {task.authorizationLevel}</p>
                {task.result ? <p className="mt-2 text-sm leading-6 text-gray-700">{task.result}</p> : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 text-4xl font-black">{value}</p>
    </article>
  );
}
