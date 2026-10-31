import { NextResponse } from "next/server";
import { getSocialContentStatus } from "@/lib/social-content";

export async function GET() {
  const status = await getSocialContentStatus();

  return NextResponse.json({
    ok: true,
    ...status,
  });
}
