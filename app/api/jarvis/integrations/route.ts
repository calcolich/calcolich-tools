import { NextResponse } from "next/server";
import { getIntegrationStatus } from "@/lib/jarvis-engine.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true, integrations: await getIntegrationStatus() });
}
