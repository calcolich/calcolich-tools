import { NextResponse } from "next/server";

const webhookUrl = process.env.LEADS_WEBHOOK_URL;
const webhookSecret = process.env.LEADS_WEBHOOK_SECRET;
const resendApiKey = cleanEnvValue(process.env.RESEND_API_KEY, "RESEND_API_KEY");
const leadsToEmail = cleanEnvValue(process.env.LEADS_TO_EMAIL, "LEADS_TO_EMAIL") ?? "calcolich@gmail.com";
const leadsFromEmail = cleanEnvValue(process.env.LEADS_FROM_EMAIL, "LEADS_FROM_EMAIL") ?? "onboarding@resend.dev";

type LeadPayload = {
  source?: string;
  name?: string;
  email?: string;
  phone?: string;
  packageName?: string;
  message?: string;
  page?: string;
  company?: string;
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
  const payload = (await request.json()) as LeadPayload & { website?: string };

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const cleanPayload = sanitizeLeadPayload(payload);

  if (!cleanPayload.email && !cleanPayload.phone) {
    return NextResponse.json(
      { ok: false, error: "Inserisci almeno email o telefono." },
      { status: 400 },
    );
  }

  const lead = {
    ...cleanPayload,
    createdAt: new Date().toISOString(),
    site: "calcolich.ch",
  };

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(webhookSecret ? { "x-calcolich-secret": webhookSecret } : {}),
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Invio non riuscito. Riprova tra poco." },
        { status: 502 },
      );
    }
  }

  if (!webhookUrl && resendApiKey) {
    const response = await fetch("https://api.resend.com/emails", {
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

    if (!response.ok) {
      const errorText = await response.text();
      const resendMessage = getResendErrorMessage(errorText);
      console.error("Resend email delivery failed", {
        status: response.status,
        message: resendMessage,
        error: errorText,
        from: leadsFromEmail,
        to: leadsToEmail,
      });

      return NextResponse.json(
        {
          ok: true,
          configured: false,
          emailFallback: true,
          error: "Email automatica non disponibile. Usa la bozza email per completare l'invio.",
        },
      );
    }
  }

  if (!webhookUrl && !resendApiKey) {
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

function sanitizeLeadPayload(payload: LeadPayload): LeadPayload {
  return {
    source: cleanField(payload.source),
    name: cleanField(payload.name),
    email: cleanField(payload.email)?.toLowerCase(),
    phone: cleanField(payload.phone),
    packageName: cleanField(payload.packageName),
    message: cleanField(payload.message, 2000),
    page: cleanField(payload.page, 500),
    company: cleanField(payload.company),
  };
}

function cleanField(value: unknown, maxLength = 300) {
  if (typeof value !== "string") {
    return undefined;
  }

  const clean = value.replace(/\s+/g, " ").trim().slice(0, maxLength);
  return clean || undefined;
}

function formatLeadSubject(lead: LeadPayload & { createdAt: string; site: string }) {
  const source = getLeadSourceLabel(lead.source);
  const contact = lead.name || lead.email || lead.phone || "contatto";
  return `[Calcolich] Nuovo lead ${source} - ${contact}`;
}

function formatLeadEmail(lead: LeadPayload & { createdAt: string; site: string }) {
  const source = getLeadSourceLabel(lead.source);
  const priority = getLeadPriority(lead.source);

  return [
    "NUOVO LEAD CALCOLICH",
    "",
    `Priorita: ${priority}`,
    `Fonte: ${source}`,
    `Data: ${formatDate(lead.createdAt)}`,
    "",
    "CONTATTO",
    `Nome: ${lead.name ?? "-"}`,
    `Email: ${lead.email ?? "-"}`,
    `Telefono: ${lead.phone ?? "-"}`,
    "",
    "RICHIESTA",
    `Pacchetto: ${lead.packageName ?? "-"}`,
    `Messaggio: ${lead.message ?? "-"}`,
    "",
    "CONTESTO",
    `Pagina: ${lead.page ?? "-"}`,
    `Sito: ${lead.site}`,
  ].join("\n");
}

function formatLeadEmailHtml(lead: LeadPayload & { createdAt: string; site: string }) {
  const source = getLeadSourceLabel(lead.source);
  const priority = getLeadPriority(lead.source);
  const rows = [
    ["Priorita", priority],
    ["Fonte", source],
    ["Data", formatDate(lead.createdAt)],
    ["Nome", lead.name ?? "-"],
    ["Email", lead.email ?? "-"],
    ["Telefono", lead.phone ?? "-"],
    ["Pacchetto", lead.packageName ?? "-"],
    ["Messaggio", lead.message ?? "-"],
    ["Pagina", lead.page ?? "-"],
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

  const labels: Record<string, string> = {
    "services-ai-seo": "Servizi AI SEO",
    "cashflow-plan": "Piano cashflow",
    "contact-page": "Pagina contatti",
  };

  return labels[source] ?? source;
}

function getLeadPriority(source?: string) {
  if (source === "services-ai-seo" || source === "cashflow-plan" || source === "contact-page") {
    return "Alta";
  }

  return "Normale";
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
