import { NextResponse } from "next/server";
import { getAuthProviderId } from "@/lib/auth/config";
import { getSessionUser } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ user: null, provider: getAuthProviderId() });
  }
  return NextResponse.json({ user, provider: getAuthProviderId() });
}
