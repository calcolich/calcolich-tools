import { NextResponse } from "next/server";
import { AGENTS } from "@/lib/jarvis-engine.mjs";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ ok: true, agents: AGENTS });
}
