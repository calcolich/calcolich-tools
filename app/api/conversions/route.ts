import { NextResponse } from "next/server";

const conversionWebhookUrl = process.env.CONVERSIONS_WEBHOOK_URL;
const conversionSecret = process.env.CONVERSIONS_WEBHOOK_SECRET;

type ConversionPayload = {
  source?: string;
  partner?: string;
  calculatorSlug?: string;
  segment?: string;
  conversionId?: string;
  amount?: string;
  currency?: string;
  status?: string;
  occurredAt?: string;
};

export async function POST(request: Request) {
  if (conversionSecret && request.headers.get("x-calcolich-secret") !== conversionSecret) {
    return NextResponse.json({ ok: false, error: "Non autorizzato." }, { status: 401 });
  }

  const payload = sanitizeConversionPayload((await request.json()) as ConversionPayload);

  if (!payload.partner && !payload.conversionId) {
    return NextResponse.json({ ok: false, error: "Conversione incompleta." }, { status: 400 });
  }

  const conversion = {
    ...payload,
    site: "calcolich.ch",
    receivedAt: new Date().toISOString(),
    jarvis: {
      owner: "jarvis",
      workflow: "affiliate-conversion",
      nextActions: [
        "attribuisci conversione a partner, pagina e segmento",
        "aggiorna revenue per 1000 visite",
        "rivedi priorita SEO e CTA se la conversione e confermata",
      ],
    },
  };

  if (!conversionWebhookUrl) {
    return NextResponse.json({ ok: true, configured: false });
  }

  const response = await fetch(conversionWebhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(conversionSecret ? { "x-calcolich-secret": conversionSecret } : {}),
    },
    body: JSON.stringify(conversion),
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, error: "Invio conversione non riuscito." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, configured: true });
}

function sanitizeConversionPayload(payload: ConversionPayload): ConversionPayload {
  return {
    source: cleanField(payload.source, 120),
    partner: cleanField(payload.partner, 80),
    calculatorSlug: cleanField(payload.calculatorSlug, 160),
    segment: cleanField(payload.segment, 120),
    conversionId: cleanField(payload.conversionId, 160),
    amount: cleanField(payload.amount, 40),
    currency: cleanField(payload.currency, 10),
    status: cleanField(payload.status, 80),
    occurredAt: cleanField(payload.occurredAt, 80),
  };
}

function cleanField(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return undefined;
  }

  const clean = value.replace(/\s+/g, " ").trim().slice(0, maxLength);
  return clean || undefined;
}
