import { NextResponse } from "next/server";

const allowedEvents = new Set([
  "commercial_page_view",
  "commercial_cta_click",
  "calculator_start",
  "calculator_complete",
  "language_change",
  "related_calculator_click",
  "guide_click",
  "lead_submit",
]);

type EventPayload = {
  event?: string;
  source?: string;
  page?: string;
  target?: string;
  calculatorId?: string;
};

export async function POST(request: Request) {
  const startedAt = Date.now();
  const requestId = request.headers.get("x-vercel-id") ?? undefined;
  let payload: EventPayload;

  try {
    payload = (await request.json()) as EventPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const event = cleanField(payload.event, 60);
  if (!event || !allowedEvents.has(event)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  console.log(JSON.stringify({
    level: "info",
    message: "commercial_event",
    route: "/api/events",
    event,
    source: cleanField(payload.source, 120) ?? "unknown",
    page: getPath(payload.page),
    target: getPath(payload.target),
    calculatorId: cleanField(payload.calculatorId, 120),
    requestId,
    isBot: /bot|crawler|spider|slurp|headless/i.test(userAgent),
    durationMs: Date.now() - startedAt,
  }));

  return NextResponse.json({ ok: true });
}

function cleanField(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return undefined;
  }

  const clean = value.replace(/[^a-z0-9:/._-]/gi, "").slice(0, maxLength);
  return clean || undefined;
}

function getPath(value?: string) {
  if (!value) {
    return "unknown";
  }

  try {
    return new URL(value, "https://www.calcolich.ch").pathname;
  } catch {
    return value.split("?")[0].slice(0, 300);
  }
}
