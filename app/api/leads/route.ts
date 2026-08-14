import { NextResponse } from "next/server";
import { getJarvisLeadContext, type JarvisLeadContext } from "@/lib/jarvis";

const webhookUrl = process.env.LEADS_WEBHOOK_URL;
const webhookSecret = process.env.LEADS_WEBHOOK_SECRET;
const resendApiKey = cleanEnvValue(process.env.RESEND_API_KEY, "RESEND_API_KEY");
const leadsToEmail = cleanEnvValue(process.env.LEADS_TO_EMAIL, "LEADS_TO_EMAIL") ?? "calcolich@gmail.com";
const leadsFromEmail = cleanEnvValue(process.env.LEADS_FROM_EMAIL, "LEADS_FROM_EMAIL") ?? "onboarding@resend.dev";

type LeadPayload = {
  source?: string;
  segment?: string;
  interest?: string;
  leadMagnet?: string;
  marketingConsent?: string;
  name?: string;
  email?: string;
  phone?: string;
  packageName?: string;
  message?: string;
  page?: string;
  path?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  company?: string;
  siteUrl?: string;
};

type LeadRecord = LeadPayload & {
  leadId: string;
  jarvis?: JarvisLeadContext;
  createdAt: string;
  site: string;
};

function cleanEnvValue(value: string | undefined, key: string) {
  if (!value) {
    return undefined;
  }

  return value
    .replace(new RegExp(`^\\s*${key}\\s*=\\s*`, "i"), "")
    .trim()
    .replace(/^["']|["']$/g, "");
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const requestId = request.headers.get("x-vercel-id") ?? undefined;
  let payload: LeadPayload & { website?: string };

  try {
    payload = (await request.json()) as LeadPayload & { website?: string };
  } catch {
    logLeadEvent("warn", "lead_invalid_json", {
      requestId,
      durationMs: Date.now() - startedAt,
    });
    return NextResponse.json({ ok: false, error: "Richiesta non valida." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const cleanPayload = sanitizeLeadPayload(payload);

  if (!cleanPayload.email && !cleanPayload.phone) {
    logLeadEvent("warn", "lead_rejected", {
      requestId,
      reason: "missing_contact",
      source: cleanPayload.source ?? "unknown",
      page: getPagePath(cleanPayload.page),
      durationMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      { ok: false, error: "Inserisci almeno email o telefono." },
      { status: 400 },
    );
  }

  if (cleanPayload.source?.startsWith("audit-sito-gratuito-ticino") && !cleanPayload.siteUrl) {
    logLeadEvent("warn", "lead_rejected", {
      requestId,
      reason: "missing_audit_url",
      source: cleanPayload.source,
      page: getPagePath(cleanPayload.page),
      durationMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      { ok: false, error: "Inserisci un indirizzo web valido da analizzare." },
      { status: 400 },
    );
  }

  const lead = {
    ...cleanPayload,
    leadId: crypto.randomUUID(),
    jarvis: getJarvisLeadContext(
      cleanPayload.source,
      cleanPayload.segment,
      cleanPayload.interest,
      cleanPayload.leadMagnet,
    ),
    createdAt: new Date().toISOString(),
    site: "calcolich.ch",
  } satisfies LeadRecord;

  const logContext = {
    leadId: lead.leadId,
    requestId,
    source: lead.source ?? "unknown",
    page: getPagePath(lead.page),
    packageName: getPackageMetric(lead.packageName),
    hasEmail: Boolean(lead.email),
    hasPhone: Boolean(lead.phone),
    hasCompany: Boolean(lead.company),
    hasSiteUrl: Boolean(lead.siteUrl),
  };

  logLeadEvent("info", "lead_received", logContext);

  if (webhookUrl) {
    let response: Response;

    try {
      response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(webhookSecret ? { "x-calcolich-secret": webhookSecret } : {}),
        },
        body: JSON.stringify(lead),
      });
    } catch (error) {
      logLeadEvent("error", "lead_delivery_failed", {
        ...logContext,
        channel: "webhook",
        error: getErrorMessage(error),
        durationMs: Date.now() - startedAt,
      });
      return NextResponse.json(
        { ok: false, error: "Invio non riuscito. Riprova tra poco." },
        { status: 502 },
      );
    }

    if (!response.ok) {
      logLeadEvent("error", "lead_delivery_failed", {
        ...logContext,
        channel: "webhook",
        status: response.status,
        durationMs: Date.now() - startedAt,
      });
      return NextResponse.json(
        { ok: false, error: "Invio non riuscito. Riprova tra poco." },
        { status: 502 },
      );
    }

    logLeadEvent("info", "lead_delivered", {
      ...logContext,
      channel: "webhook",
      durationMs: Date.now() - startedAt,
    });
  }

  if (!webhookUrl && resendApiKey) {
    let response: Response;

    try {
      response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${resendApiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: leadsFromEmail,
          to: [leadsToEmail],
          reply_to: lead.email ? [lead.email] : undefined,
          subject: formatLeadSubject(lead),
          text: formatLeadEmail(lead),
          html: formatLeadEmailHtml(lead),
        }),
      });
    } catch (error) {
      logLeadEvent("error", "lead_delivery_failed", {
        ...logContext,
        channel: "resend",
        error: getErrorMessage(error),
        durationMs: Date.now() - startedAt,
      });
      return getEmailFallbackResponse();
    }

    if (!response.ok) {
      const errorText = await response.text();
      const resendMessage = getResendErrorMessage(errorText);
      logLeadEvent("error", "lead_delivery_failed", {
        ...logContext,
        channel: "resend",
        status: response.status,
        error: resendMessage,
        durationMs: Date.now() - startedAt,
      });
      return getEmailFallbackResponse();
    }

    logLeadEvent("info", "lead_delivered", {
      ...logContext,
      channel: "resend",
      durationMs: Date.now() - startedAt,
    });
  }

  if (!webhookUrl && !resendApiKey) {
    logLeadEvent("warn", "lead_delivery_fallback", {
      ...logContext,
      reason: "delivery_not_configured",
      durationMs: Date.now() - startedAt,
    });
    return NextResponse.json({
      ok: true,
      configured: false,
      emailFallback: true,
      error: "Email automatica non configurata. Usa la bozza email per completare l'invio.",
    });
  }

  return NextResponse.json({
    ok: true,
    configured: true,
  });
}

function getEmailFallbackResponse() {
  return NextResponse.json({
    ok: true,
    configured: false,
    emailFallback: true,
    error: "Email automatica non disponibile. Usa la bozza email per completare l'invio.",
  });
}

function logLeadEvent(
  level: "info" | "warn" | "error",
  message: string,
  context: Record<string, unknown>,
) {
  const entry = JSON.stringify({ level, message, route: "/api/leads", ...context });

  if (level === "error") {
    console.error(entry);
    return;
  }

  if (level === "warn") {
    console.warn(entry);
    return;
  }

  console.log(entry);
}

function getPagePath(page?: string) {
  if (!page) {
    return "unknown";
  }

  try {
    return new URL(page, "https://www.calcolich.ch").pathname;
  } catch {
    return page.split("?")[0];
  }
}

function getPackageMetric(packageName?: string) {
  if (!packageName) {
    return "not_selected";
  }

  const allowedPackages = [
    "Starter",
    "Business",
    "Premium",
    "Lead Engine",
    "Presenza Locale",
    "Crescita",
    "Acquisizione",
    "Non so ancora",
  ];

  return allowedPackages.find((name) => packageName.startsWith(name)) ?? "other";
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function sanitizeLeadPayload(payload: LeadPayload): LeadPayload {
  return {
    source: cleanField(payload.source),
    segment: cleanField(payload.segment),
    interest: cleanField(payload.interest),
    leadMagnet: cleanField(payload.leadMagnet),
    marketingConsent: payload.marketingConsent ? "yes" : undefined,
    name: cleanField(payload.name),
    email: cleanField(payload.email)?.toLowerCase(),
    phone: cleanField(payload.phone),
    packageName: cleanField(payload.packageName),
    message: cleanField(payload.message, 2000),
    page: cleanField(payload.page, 500),
    path: cleanField(payload.path, 300),
    referrer: cleanField(payload.referrer, 500),
    utmSource: cleanField(payload.utmSource, 120),
    utmMedium: cleanField(payload.utmMedium, 120),
    utmCampaign: cleanField(payload.utmCampaign, 160),
    utmContent: cleanField(payload.utmContent, 160),
    utmTerm: cleanField(payload.utmTerm, 160),
    company: cleanField(payload.company),
    siteUrl: cleanUrl(payload.siteUrl),
  };
}

function cleanField(value: unknown, maxLength = 300) {
  if (typeof value !== "string") {
    return undefined;
  }

  const clean = value.replace(/\s+/g, " ").trim().slice(0, maxLength);
  return clean || undefined;
}

function formatLeadSubject(lead: LeadRecord) {
  const source = getLeadSourceLabel(lead.source);
  const contact = lead.name || lead.email || lead.phone || "contatto";
  return `[Calcolich] Nuovo lead ${source} - ${contact}`;
}

function formatLeadEmail(lead: LeadRecord) {
  const source = getLeadSourceLabel(lead.source);
  const priority = getLeadPriority(lead.source);

  return [
    "NUOVO LEAD CALCOLICH",
    "",
    `ID: ${lead.leadId}`,
    `Priorita: ${priority}`,
    `Fonte: ${source}`,
    `Segmento: ${lead.segment ?? "-"}`,
    `Interesse: ${lead.interest ?? "-"}`,
    `Lead magnet: ${lead.leadMagnet ?? "-"}`,
    `Consenso marketing: ${lead.marketingConsent ?? "no"}`,
    `Data: ${formatDate(lead.createdAt)}`,
    "",
    "CONTATTO",
    `Nome: ${lead.name ?? "-"}`,
    `Email: ${lead.email ?? "-"}`,
    `Telefono: ${lead.phone ?? "-"}`,
    `Azienda: ${lead.company ?? "-"}`,
    `Sito da analizzare: ${lead.siteUrl ?? "-"}`,
    "",
    "RICHIESTA",
    `Pacchetto: ${lead.packageName ?? "-"}`,
    `Messaggio: ${lead.message ?? "-"}`,
    "",
    "CONTESTO",
    `Pagina: ${lead.page ?? "-"}`,
    `Path: ${lead.path ?? "-"}`,
    `Referrer: ${lead.referrer ?? "-"}`,
    `UTM source: ${lead.utmSource ?? "-"}`,
    `UTM medium: ${lead.utmMedium ?? "-"}`,
    `UTM campaign: ${lead.utmCampaign ?? "-"}`,
    `Sito: ${lead.site}`,
    "",
    "JARVIS",
    `Workflow: ${lead.jarvis?.workflow ?? "-"}`,
    `Priorita Jarvis: ${lead.jarvis?.priority ?? "-"}`,
    `Prossime azioni: ${lead.jarvis?.nextActions.join(" | ") ?? "-"}`,
  ].join("\n");
}

function formatLeadEmailHtml(lead: LeadRecord) {
  const source = getLeadSourceLabel(lead.source);
  const priority = getLeadPriority(lead.source);
  const rows = [
    ["ID", lead.leadId],
    ["Priorita", priority],
    ["Fonte", source],
    ["Segmento", lead.segment ?? "-"],
    ["Interesse", lead.interest ?? "-"],
    ["Lead magnet", lead.leadMagnet ?? "-"],
    ["Consenso marketing", lead.marketingConsent ?? "no"],
    ["Data", formatDate(lead.createdAt)],
    ["Nome", lead.name ?? "-"],
    ["Email", lead.email ?? "-"],
    ["Telefono", lead.phone ?? "-"],
    ["Azienda", lead.company ?? "-"],
    ["Sito da analizzare", lead.siteUrl ?? "-"],
    ["Pacchetto", lead.packageName ?? "-"],
    ["Messaggio", lead.message ?? "-"],
    ["Pagina", lead.page ?? "-"],
    ["Path", lead.path ?? "-"],
    ["Referrer", lead.referrer ?? "-"],
    ["UTM source", lead.utmSource ?? "-"],
    ["UTM medium", lead.utmMedium ?? "-"],
    ["UTM campaign", lead.utmCampaign ?? "-"],
    ["Jarvis workflow", lead.jarvis?.workflow ?? "-"],
    ["Jarvis priorita", lead.jarvis?.priority ?? "-"],
    ["Jarvis prossime azioni", lead.jarvis?.nextActions.join("\n") ?? "-"],
    ["Sito", lead.site],
  ];

  return `<!doctype html>
<html lang="it">
  <body style="margin:0;background:#f6f8fb;font-family:Arial,sans-serif;color:#111827;">
    <div style="max-width:680px;margin:0 auto;padding:24px;">
      <div style="border-radius:18px;background:#111827;color:#ffffff;padding:22px 24px;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#86efac;">Calcolich</p>
        <h1 style="margin:0;font-size:26px;line-height:1.2;">Nuovo lead ricevuto</h1>
        <p style="margin:12px 0 0;color:#d1d5db;">${escapeHtml(source)} - ${escapeHtml(priority)}</p>
      </div>
      <table style="width:100%;margin-top:18px;border-collapse:collapse;border-radius:18px;overflow:hidden;background:#ffffff;border:1px solid #e5e7eb;">
        <tbody>
          ${rows.map(([label, value]) => `
            <tr>
              <th style="width:160px;padding:14px 16px;text-align:left;vertical-align:top;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-size:13px;color:#374151;">${escapeHtml(label)}</th>
              <td style="padding:14px 16px;vertical-align:top;border-bottom:1px solid #e5e7eb;font-size:15px;line-height:1.5;color:#111827;">${formatHtmlValue(value)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <p style="margin:18px 0 0;font-size:13px;color:#6b7280;">Rispondi entro 24 ore. Se l'email del lead e presente, puoi rispondere direttamente a questo messaggio.</p>
    </div>
  </body>
</html>`;
}

function getLeadSourceLabel(source?: string) {
  if (!source) {
    return "Sito";
  }

  if (source.startsWith("newsletter:")) {
    return `Newsletter - ${source.replace("newsletter:", "")}`;
  }

  if (source.startsWith("leadmagnet:")) {
    return `Lead magnet - ${source.replace("leadmagnet:", "")}`;
  }

  if (source.startsWith("sidebar:")) {
    return `Sidebar - ${source.replace("sidebar:", "")}`;
  }

  if (source.startsWith("audit-sito-gratuito-ticino")) {
    return formatAttributedSource("Audit sito gratuito Ticino", source, "audit-sito-gratuito-ticino");
  }

  if (source.startsWith("services-ai-seo")) {
    return formatAttributedSource("Servizi AI SEO", source, "services-ai-seo");
  }

  if (source.startsWith("service-landing:")) {
    return `Landing servizio - ${source.replace("service-landing:", "")}`;
  }

  const labels: Record<string, string> = {
    "services-ai-seo": "Servizi AI SEO",
    "audit-sito-gratuito-ticino": "Audit sito gratuito Ticino",
    "cashflow-plan": "Piano cashflow",
    "contact-page": "Pagina contatti",
  };

  return labels[source] ?? source;
}

function getLeadPriority(source?: string) {
  const highPrioritySources = [
    "services-ai-seo",
    "audit-sito-gratuito-ticino",
    "service-landing:",
    "cashflow-plan",
    "contact-page",
  ];

  if (source && highPrioritySources.some((item) => source.startsWith(item))) {
    return "Alta";
  }

  return "Normale";
}

function formatAttributedSource(label: string, source: string, baseSource: string) {
  const attribution = source.slice(baseSource.length).replace(/^:/, "");
  return attribution ? `${label} - ${attribution}` : label;
}

function cleanUrl(value: unknown) {
  const clean = cleanField(value, 500);
  if (!clean) {
    return undefined;
  }

  try {
    const normalized = /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;
    const url = new URL(normalized);
    const validProtocol = url.protocol === "http:" || url.protocol === "https:";
    return validProtocol && url.hostname.includes(".") ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("it-CH", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Zurich",
  }).format(new Date(value));
}

function formatHtmlValue(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getResendErrorMessage(errorText: string) {
  try {
    const parsed = JSON.parse(errorText) as { message?: string; name?: string };
    return parsed.message ?? parsed.name ?? "errore Resend non specificato.";
  } catch {
    return errorText || "errore Resend non specificato.";
  }
}
