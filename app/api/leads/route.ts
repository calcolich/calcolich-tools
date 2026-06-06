import { NextResponse } from "next/server";

const webhookUrl = process.env.LEADS_WEBHOOK_URL;
const webhookSecret = process.env.LEADS_WEBHOOK_SECRET;
const resendApiKey = process.env.RESEND_API_KEY;
const leadsToEmail = process.env.LEADS_TO_EMAIL ?? "calcolich@gmail.com";
const leadsFromEmail = process.env.LEADS_FROM_EMAIL ?? "Calcolich <onboarding@resend.dev>";

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

export async function POST(request: Request) {
  const payload = (await request.json()) as LeadPayload & { website?: string };

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  if (!payload.email && !payload.phone) {
    return NextResponse.json(
      { ok: false, error: "Inserisci almeno email o telefono." },
      { status: 400 },
    );
  }

  const lead = {
    ...payload,
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
        to: leadsToEmail,
        subject: `Nuovo lead Calcolich - ${lead.source ?? "sito"}`,
        text: formatLeadEmail(lead),
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Lead ricevuto, ma invio email non riuscito." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({
    ok: true,
    configured: Boolean(webhookUrl || resendApiKey),
  });
}

function formatLeadEmail(lead: LeadPayload & { createdAt: string; site: string }) {
  return [
    "Nuovo lead da Calcolich",
    "",
    `Data: ${lead.createdAt}`,
    `Fonte: ${lead.source ?? "-"}`,
    `Nome: ${lead.name ?? "-"}`,
    `Email: ${lead.email ?? "-"}`,
    `Telefono: ${lead.phone ?? "-"}`,
    `Pacchetto: ${lead.packageName ?? "-"}`,
    `Messaggio: ${lead.message ?? "-"}`,
    `Pagina: ${lead.page ?? "-"}`,
    `Sito: ${lead.site}`,
  ].join("\n");
}
