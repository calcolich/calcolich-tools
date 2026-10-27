import { NextResponse } from "next/server";
import { getJarvisStatus } from "@/lib/jarvis-engine.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getJarvisStatus();
  return NextResponse.json({ ok: true, activity: status.activity });
}
