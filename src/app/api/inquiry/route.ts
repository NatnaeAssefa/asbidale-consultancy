import { NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/email";

export const runtime = "nodejs";

type InquiryBody = {
  name?: string;
  email?: string;
  organization?: string;
  interest?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: InquiryBody;
  try {
    body = (await request.json()) as InquiryBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = await sendInquiryEmail({
    name: body.name?.trim() || "",
    email: body.email?.trim() || "",
    organization: body.organization?.trim() || "",
    interest: body.interest?.trim() || "",
    message: body.message?.trim() || "",
  });

  if (!result.ok) {
    const status = result.error.includes("not configured") ? 503 : 400;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({
    ok: true,
    messageId: result.messageId,
  });
}
