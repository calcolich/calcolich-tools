import { NextResponse } from "next/server";

const webhookUrl = process.env.LEADS_WEBHOOK_URL;
const webhookSecret = process.env.LEADS_WEBHOOK_SECRET;

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

  return NextResponse.json({
    ok: true,
    configured: Boolean(webhookUrl),
  });
}
