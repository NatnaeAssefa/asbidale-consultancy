import type { InquiryEmailData } from "./types";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildInquiryEmail(data: InquiryEmailData) {
  const organization = data.organization?.trim() || "Not provided";
  const subject = `[Website inquiry] ${data.interest} — ${data.name}`;

  const text = [
    "New inquiry from the Asbidale website",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Organization: ${organization}`,
    `Area of interest: ${data.interest}`,
    "",
    "Message:",
    data.message,
    "",
    "—",
    "Sent automatically from asbidale.com",
  ].join("\n");

  const html = `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f4f5fa;font-family:Arial,Helvetica,sans-serif;color:#0a0e1a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f5fa;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #d8dcea;">
            <tr>
              <td style="background:#080c18;padding:22px 28px;">
                <p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8b94f0;">Asbidale Consultancy Services</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;color:#ffffff;font-weight:600;">New website inquiry</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#2e3548;">
                  A visitor submitted the contact form on asbidale.com.
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #d8dcea;">
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #d8dcea;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5c6678;width:140px;">Name</td>
                    <td style="padding:12px 0;border-bottom:1px solid #d8dcea;font-size:15px;color:#080c18;font-weight:600;">${escapeHtml(data.name)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #d8dcea;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5c6678;">Email</td>
                    <td style="padding:12px 0;border-bottom:1px solid #d8dcea;font-size:15px;color:#080c18;">
                      <a href="mailto:${escapeHtml(data.email)}" style="color:#1018cc;text-decoration:none;">${escapeHtml(data.email)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #d8dcea;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5c6678;">Organization</td>
                    <td style="padding:12px 0;border-bottom:1px solid #d8dcea;font-size:15px;color:#080c18;">${escapeHtml(organization)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #d8dcea;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5c6678;">Interest</td>
                    <td style="padding:12px 0;border-bottom:1px solid #d8dcea;font-size:15px;color:#080c18;">${escapeHtml(data.interest)}</td>
                  </tr>
                </table>
                <p style="margin:24px 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5c6678;">Message</p>
                <div style="padding:16px;background:#f4f5fa;border:1px solid #d8dcea;font-size:15px;line-height:1.7;color:#2e3548;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px 24px;border-top:1px solid #d8dcea;font-size:12px;color:#5c6678;">
                Reply directly to this email to respond to the inquirer.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim();

  return { subject, text, html };
}
