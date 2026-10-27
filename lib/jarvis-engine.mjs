import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const runtimeRoot = process.env.JARVIS_STATE_PATH
  ? null
  : process.env.VERCEL
    ? "/tmp/calcolich-jarvis"
    : join(process.cwd(), "jarvis/runtime");
const statePath = process.env.JARVIS_STATE_PATH ?? join(runtimeRoot, "state.json");

export const AGENTS = [
  { id: "tech", label: "Tech Agent", status: "active" },
  { id: "seo", label: "SEO Agent", status: "active" },
  { id: "content", label: "Content Agent", status: "ready" },
  { id: "data", label: "Data / Analytics Agent", status: "adapter-ready" },
  { id: "monetization", label: "Monetization Agent", status: "ready" },
  { id: "auditor", label: "Auditor Agent", status: "active" },
];

const initialState = {
  schemaVersion: 1,
  projectMemory: {
    stack: ["Next.js 16", "React 19", "TypeScript", "file-based Jarvis runtime"],
    site: "calcolich.ch",
    languages: ["it", "de", "en", "fr"],
    rules: ["no secrets in repo", "review before code/content changes", "fail closed on unclear approval"],
  },
  tasks: [],
  activity: [],
  approvals: [],
  decisions: [],
  learning: [],
};

export async function getJarvisState() {
  await ensureRuntime();
  if (!existsSync(statePath)) {
    await saveState(initialState);
    return structuredClone(initialState);
  }
  try {
    return JSON.parse(await readFile(statePath, "utf8"));
  } catch {
    const recovered = { ...initialState, activity: [event("SYSTEM_ALERT", "Jarvis state recovered.", "auditor")] };
    await saveState(recovered);
    return recovered;
  }
}

export async function getJarvisStatus() {
  const state = await getJarvisState();
  const stats = {
    running: state.tasks.filter((task) => task.status === "RUNNING").length,
    queued: state.tasks.filter((task) => task.status === "QUEUED").length,
    completedToday: state.tasks.filter((task) => task.status === "COMPLETED" && task.completedAt?.startsWith(today())).length,
    errors: state.tasks.filter((task) => ["FAILED", "BLOCKED"].includes(task.status)).length,
    approvals: state.approvals.filter((approval) => approval.status === "PENDING").length,
  };
  return {
    status: stats.errors > 0 ? "DEGRADED" : "HEALTHY",
    agents: AGENTS,
    stats,
    nextAction: getNextAction(state),
    activity: state.activity.slice(-30).reverse(),
    approvals: state.approvals.filter((approval) => approval.status === "PENDING"),
    tasks: state.tasks.slice().reverse(),
    memory: state.projectMemory,
    integrations: await getIntegrationStatus(),
  };
}

export async function getIntegrationStatus() {
  const checks = [
    integration("search-console", "Google Search Console", "manual-export-ready", [
      fileCheck("search-console/exports", "CSV/JSON export folder ready"),
      envCheck("GOOGLE_SEARCH_CONSOLE_SITE_URL", "Search Console site URL"),
      envCheck("GOOGLE_SERVICE_ACCOUNT_EMAIL", "Google service account email"),
    ]),
    integration("analytics", "Google Analytics", "manual-export-ready", [
      fileCheck("analytics/exports", "Analytics export folder ready"),
      envCheck("GA4_PROPERTY_ID", "GA4 property ID"),
      envCheck("GOOGLE_SERVICE_ACCOUNT_EMAIL", "Google service account email"),
    ]),
    integration("adsense", "Google AdSense", "env-ready", [
      envCheck("NEXT_PUBLIC_ADSENSE_CLIENT", "AdSense client"),
      envCheck("NEXT_PUBLIC_ADSENSE_CALCULATOR_SLOT", "Calculator ad slot"),
      envCheck("NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT", "Article ad slot"),
    ]),
    integration("github", "GitHub", "credentials-required", [
      envCheck("GITHUB_TOKEN", "GitHub token"),
      envCheck("GITHUB_REPOSITORY", "GitHub repository"),
    ]),
    integration("vercel", "Vercel", "credentials-required", [
      envCheck("VERCEL_TOKEN", "Vercel token"),
      envCheck("VERCEL_PROJECT_ID", "Vercel project ID"),
      envCheck("VERCEL_TEAM_ID", "Vercel team ID"),
    ]),
    integration("notifications", "Notifications", "webhook-ready", [
      envCheck("JARVIS_NOTIFICATION_WEBHOOK_URL", "Notification webhook"),
      envCheck("JARVIS_NOTIFICATION_SECRET", "Notification secret"),
    ]),
    integration("social-publishing", "Social Publishing", "approval-required", [
      envCheck("SOCIAL_PUBLISHING_WEBHOOK_URL", "Social publishing webhook"),
      envCheck("SOCIAL_PUBLISHING_SECRET", "Social publishing secret"),
      fileCheck("social-content", "Social content folder ready"),
    ]),
  ];

  return checks.map((item) => {
    const ready = item.checks.every((checkItem) => checkItem.ok);
    const partial = item.checks.some((checkItem) => checkItem.ok);
    return {
      ...item,
      status: ready ? "READY" : partial ? "PARTIAL" : "MISSING",
      requiresApproval: item.id === "social-publishing" || item.id === "vercel" || item.id === "github",
    };
  });
}

export async function createJarvisTask(input) {
  const state = await getJarvisState();
  const now = new Date().toISOString();
  const task = {
    id: `task_${Date.now()}`,
    title: clean(input.title, "Jarvis task"),
    description: clean(input.description, input.title ?? "Jarvis task"),
    agent: input.agent ?? inferAgent(input.title ?? input.description ?? ""),
    priority: input.priority ?? "P2",
    status: "QUEUED",
    authorizationLevel: input.authorizationLevel ?? inferAuthorization(input.title ?? input.description ?? ""),
    createdAt: now,
    updatedAt: now,
    startedAt: null,
    completedAt: null,
    result: null,
    evidence: [],
    auditResult: null,
    parentTask: input.parentTask ?? null,
    dependencies: input.dependencies ?? [],
    error: null,
    retryCount: 0,
  };
  state.tasks.push(task);
  state.activity.push(event("TASK_CREATED", `${task.agent} queued: ${task.title}`, task.agent, task.id));
  await saveState(state);
  return task;
}

export async function runJarvisWorkflow(kind = "seo") {
  const agent = kind === "tech" ? "tech" : "seo";
  const task = await createJarvisTask({
    title: agent === "tech" ? "Tech health check" : "Repository SEO audit",
    description: agent === "tech" ? "Run real lint-aware technical checks." : "Audit metadata, sitemap, robots and calculator SEO fields.",
    agent,
    priority: "P1",
    authorizationLevel: "AUTO",
  });
  const completed = await runTask(task.id);
  await notifyJarvis("workflow_completed", {
    taskId: completed.id,
    title: completed.title,
    status: completed.status,
    agent: completed.agent,
    result: completed.result,
  });
  return completed;
}

export async function chatWithJarvis(message) {
  const text = clean(message, "");
  if (!text) {
    return { reply: "Scrivi un obiettivo o un comando per Jarvis.", action: null };
  }

  const lower = text.toLowerCase();
  if (/seo|sitemap|metadata|search console|ctr|impression/.test(lower)) {
    const task = await runJarvisWorkflow("seo");
    return { reply: `Ho eseguito SEO audit. Stato: ${task.status}. ${task.result}`, action: "seo", task };
  }

  if (/tech|build|lint|errore|error|check|health/.test(lower)) {
    const task = await runJarvisWorkflow("tech");
    return { reply: `Ho eseguito Tech check. Stato: ${task.status}. ${task.result}`, action: "tech", task };
  }

  if (/notific|alert|avvis/.test(lower)) {
    const notification = await notifyJarvis("manual_test", { message: text });
    return {
      reply: notification.sent
        ? "Ho inviato una notifica di test al webhook configurato."
        : "Le notifiche sono pronte, ma manca JARVIS_NOTIFICATION_WEBHOOK_URL.",
      action: "notification",
      notification,
    };
  }

  const task = await createJarvisTask({ title: text.slice(0, 80), description: text });
  return {
    reply: `Ho creato un task per ${task.agent}. Priorita ${task.priority}, autorizzazione ${task.authorizationLevel}.`,
    action: "task_created",
    task,
  };
}

export async function runTask(taskId) {
  const state = await getJarvisState();
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task) throw new Error("Task not found");

  task.status = "RUNNING";
  task.startedAt = new Date().toISOString();
  task.updatedAt = task.startedAt;
  state.activity.push(event("TASK_STARTED", `${task.agent} started: ${task.title}`, task.agent, task.id));

  try {
    const result = task.agent === "tech" ? runTechCheck() : await runSeoCheck();
    task.result = result.summary;
    task.evidence = result.evidence;
    task.auditResult = auditTask(task, result);
    task.status = task.auditResult.status === "APPROVED" ? "COMPLETED" : task.auditResult.status;
    task.completedAt = new Date().toISOString();
    task.updatedAt = task.completedAt;
    state.activity.push(event("AUDIT_STARTED", `Auditor checked ${task.title}`, "auditor", task.id));
    state.activity.push(event("AUDIT_APPROVED", `Auditor result: ${task.auditResult.status}`, "auditor", task.id));
    state.activity.push(event("MEMORY_UPDATED", `Saved result for ${task.title}`, "memory", task.id));
    state.decisions.push({
      id: `decision_${Date.now()}`,
      taskId: task.id,
      agent: task.agent,
      decision: task.auditResult.status,
      reason: task.auditResult.reason,
      evidence: task.evidence,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    task.retryCount += 1;
    task.status = task.retryCount >= 2 ? "BLOCKED" : "FAILED";
    task.error = error instanceof Error ? error.message : String(error);
    task.updatedAt = new Date().toISOString();
    state.activity.push(event("AGENT_ERROR", `${task.agent} failed: ${task.error}`, task.agent, task.id));
    state.activity.push(event("SYSTEM_ALERT", `${task.title} is ${task.status}`, "auditor", task.id));
  }

  await saveState(state);
  return task;
}

export async function updateApproval(id, status) {
  const state = await getJarvisState();
  const approval = state.approvals.find((item) => item.id === id);
  if (!approval) throw new Error("Approval not found");
  approval.status = status;
  approval.updatedAt = new Date().toISOString();
  state.activity.push(event(status === "APPROVED" ? "APPROVAL_APPROVED" : "APPROVAL_REJECTED", `${approval.action}: ${status}`, "auditor"));
  await saveState(state);
  return approval;
}

export async function notifyJarvis(type, payload = {}) {
  const webhookUrl = process.env.JARVIS_NOTIFICATION_WEBHOOK_URL;
  const webhookSecret = process.env.JARVIS_NOTIFICATION_SECRET;
  const body = {
    type,
    site: "calcolich.ch",
    createdAt: new Date().toISOString(),
    payload,
  };

  if (!webhookUrl) {
    return { sent: false, configured: false, reason: "missing_webhook", body };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(webhookSecret ? { "x-calcolich-secret": webhookSecret } : {}),
      },
      body: JSON.stringify(body),
    });
    return { sent: response.ok, configured: true, status: response.status, body };
  } catch (error) {
    return {
      sent: false,
      configured: true,
      reason: error instanceof Error ? error.message : "notification_failed",
      body,
    };
  }
}

export async function seedApprovalRequest() {
  const state = await getJarvisState();
  if (!state.approvals.some((approval) => approval.status === "PENDING")) {
    state.approvals.push({
      id: `approval_${Date.now()}`,
      action: "Connect external social publishing account",
      agent: "content",
      reason: "Account operations require human approval.",
      risk: "External account access and possible publication.",
      resources: ["Facebook", "LinkedIn", "Instagram", "TikTok", "YouTube Shorts"],
      expectedResult: "Enable future adapter setup after credentials are provided.",
      auditorResult: "HUMAN_APPROVAL_REQUIRED",
      status: "PENDING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    state.activity.push(event("APPROVAL_REQUESTED", "External social publishing setup requires approval.", "auditor"));
    await saveState(state);
  }
}

async function runSeoCheck() {
  const files = await Promise.all([
    readSafe("app/sitemap.ts"),
    readSafe("app/robots.ts"),
    readSafe("lib/site-metadata.ts"),
    readSafe("lib/calculators.ts"),
    readSafe("lib/german-calculators.ts"),
  ]);
  const evidence = [
    check("sitemap present", files[0].ok, "app/sitemap.ts"),
    check("robots present", files[1].ok, "app/robots.ts"),
    check("site metadata has canonical/social fields", files[2].ok && /metadataBase|alternates|openGraph/.test(files[2].text), "lib/site-metadata.ts"),
    check("Italian calculators include SEO fields", /metaTitle|metaDescription|faqs|sources/.test(files[3].text), "lib/calculators.ts"),
    check("German calculators include SEO fields", /metaTitle|metaDescription|faqs|sources/.test(files[4].text), "lib/german-calculators.ts"),
  ];
  const failed = evidence.filter((item) => !item.ok);
  return {
    summary: failed.length === 0 ? "SEO audit completed with repository evidence and no blocking issue." : `SEO audit found ${failed.length} issue(s).`,
    evidence,
    ok: failed.length === 0,
  };
}

function runTechCheck() {
  const lint = spawnSync("npm", ["run", "lint"], { cwd: process.cwd(), encoding: "utf8", maxBuffer: 1024 * 1024 * 10 });
  const evidence = [
    check("lint passed", lint.status === 0, "npm run lint"),
    check("Next config present", existsSync(join(process.cwd(), "next.config.ts")), "next.config.ts"),
    check("package lock present", existsSync(join(process.cwd(), "package-lock.json")), "package-lock.json"),
  ];
  const failed = evidence.filter((item) => !item.ok);
  return {
    summary: failed.length === 0 ? "Tech health check completed successfully." : `Tech health check found ${failed.length} issue(s).`,
    evidence,
    ok: failed.length === 0,
  };
}

function auditTask(task, result) {
  if (task.authorizationLevel === "APPROVAL") {
    return { status: "HUMAN_APPROVAL_REQUIRED", reason: "Task requires human approval by policy.", risk: "high" };
  }
  if (!result.ok) {
    return { status: "NEEDS_CHANGES", reason: "One or more evidence checks failed.", risk: "medium" };
  }
  return { status: "APPROVED", reason: "Evidence checks passed and no destructive action was requested.", risk: "low" };
}

function getNextAction(state) {
  const approval = state.approvals.find((item) => item.status === "PENDING");
  if (approval) return `Review approval: ${approval.action}`;
  const queued = state.tasks.find((task) => task.status === "QUEUED");
  if (queued) return `Run ${queued.priority}: ${queued.title}`;
  const failed = state.tasks.find((task) => ["FAILED", "BLOCKED"].includes(task.status));
  if (failed) return `Fix blocked task: ${failed.title}`;
  return "Run SEO audit, then Tech health check.";
}

async function readSafe(path) {
  try {
    return { ok: true, text: await readFile(join(process.cwd(), path), "utf8") };
  } catch {
    return { ok: false, text: "" };
  }
}

function check(title, ok, source) {
  return { title, ok, source, checkedAt: new Date().toISOString() };
}

function integration(id, label, mode, checks) {
  return { id, label, mode, checks };
}

function envCheck(name, label) {
  return {
    type: "env",
    name,
    label,
    ok: Boolean(process.env[name]),
  };
}

function fileCheck(path, label) {
  return {
    type: "file",
    name: path,
    label,
    ok: existsSync(join(process.cwd(), path)),
  };
}

function inferAgent(text) {
  const value = text.toLowerCase();
  if (/seo|sitemap|metadata|canonical|search/.test(value)) return "seo";
  if (/content|social|copy|faq/.test(value)) return "content";
  if (/analytics|data|metric|traffic/.test(value)) return "data";
  if (/monet|adsense|affiliate|revenue/.test(value)) return "monetization";
  return "tech";
}

function inferAuthorization(text) {
  const value = text.toLowerCase();
  if (/deploy|delete|remove|payment|paid|credential|secret|account/.test(value)) return "APPROVAL";
  if (/edit|change|modify|create|update|add/.test(value)) return "REVIEW";
  return "AUTO";
}

function event(type, message, agent = "jarvis", taskId = null) {
  return {
    id: `event_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    type,
    message,
    agent,
    taskId,
    createdAt: new Date().toISOString(),
  };
}

async function ensureRuntime() {
  await mkdir(runtimeRoot ?? statePath.split("/").slice(0, -1).join("/"), { recursive: true });
}

async function saveState(state) {
  await ensureRuntime();
  await writeFile(statePath, JSON.stringify(state, null, 2), "utf8");
}

function clean(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, 300) : fallback;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}
