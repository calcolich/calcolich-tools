import { NextResponse } from "next/server";
import { getJarvisStatus, seedApprovalRequest } from "@/lib/jarvis-engine.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  await seedApprovalRequest();
  return NextResponse.json({ ok: true, ...(await getJarvisStatus()) });
}
