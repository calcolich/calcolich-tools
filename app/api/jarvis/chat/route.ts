import { NextResponse } from "next/server";
import { chatWithJarvis } from "@/lib/jarvis-engine.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const message = typeof payload.message === "string" ? payload.message : "";
  return NextResponse.json({ ok: true, ...(await chatWithJarvis(message)) });
}
