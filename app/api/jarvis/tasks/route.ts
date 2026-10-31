import { NextResponse } from "next/server";
import { createJarvisTask, getJarvisStatus } from "@/lib/jarvis-engine.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getJarvisStatus();
  return NextResponse.json({ ok: true, tasks: status.tasks });
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const task = await createJarvisTask(payload);
  return NextResponse.json({ ok: true, task }, { status: 201 });
}
