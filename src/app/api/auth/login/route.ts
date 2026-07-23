import { NextResponse } from "next/server";
import { getAuthBackend } from "@/lib/auth/provider";
import { setSessionCookie } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim() || "";
  const password = body.password || "";

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  try {
    const backend = getAuthBackend();
    const result = await backend.authenticate(email, password);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    await setSessionCookie(result.user);
    return NextResponse.json({
      user: result.user,
      provider: backend.id,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Authentication failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
