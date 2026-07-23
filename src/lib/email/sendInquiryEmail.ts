import nodemailer from "nodemailer";
import { getSmtpConfig, isSmtpConfigured } from "./config";
import { buildInquiryEmail } from "./templates";
import type { InquiryEmailData, SendEmailResult } from "./types";

/**
 * Sends a professional inquiry notification to the director mailbox.
 * From: noreply@asbidale.com (SMTP_USER / SMTP_FROM)
 * To:   director@asbidale.com (INQUIRY_TO)
 *
 * Credentials live in env — swap SMTP_* when migrating mail providers.
 */
export async function sendInquiryEmail(
  data: InquiryEmailData,
): Promise<SendEmailResult> {
  const name = data.name?.trim();
  const email = data.email?.trim();
  const interest = data.interest?.trim();
  const message = data.message?.trim();

  if (!name || !email || !interest || !message) {
    return {
      ok: false,
      error: "Name, email, interest, and message are required.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "A valid email address is required." };
  }

  if (!isSmtpConfigured()) {
    return {
      ok: false,
      error:
        "Email is not configured. Add SMTP_HOST, SMTP_USER, and SMTP_PASS to .env.",
    };
  }

  try {
    const smtp = getSmtpConfig();
    const { subject, text, html } = buildInquiryEmail({
      name,
      email,
      organization: data.organization,
      interest,
      message,
    });

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
      tls: {
        rejectUnauthorized: smtp.tlsRejectUnauthorized,
        servername: smtp.host,
      },
    });

    const info = await transporter.sendMail({
      from: `"${smtp.fromName}" <${smtp.from}>`,
      to: smtp.inquiryTo,
      replyTo: `"${name}" <${email}>`,
      subject,
      text,
      html,
    });

    return { ok: true, messageId: info.messageId };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[sendInquiryEmail]", err);
    }
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Failed to send inquiry email.",
    };
  }
}
