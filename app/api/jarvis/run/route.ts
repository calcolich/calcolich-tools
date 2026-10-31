import { NextResponse } from "next/server";
import { runJarvisWorkflow } from "@/lib/jarvis-engine.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const task = await runJarvisWorkflow(payload.kind);
  return NextResponse.json({ ok: true, task });
}
