function required(name: string, value: string | undefined): string {
  if (!value?.trim()) throw new Error(`Missing required env: ${name}`);
  return value.trim();
}

export function getSmtpConfig() {
  return {
    host: required("SMTP_HOST", process.env.SMTP_HOST),
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== "false",
    user: required("SMTP_USER", process.env.SMTP_USER),
    pass: required("SMTP_PASS", process.env.SMTP_PASS),
    from:
      process.env.SMTP_FROM?.trim() ||
      process.env.SMTP_USER?.trim() ||
      "noreply@asbidale.com",
    fromName: process.env.SMTP_FROM_NAME?.trim() || "Asbidale Website",
    inquiryTo:
      process.env.INQUIRY_TO?.trim() || "director@asbidale.com",
    tlsRejectUnauthorized:
      process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
  };
}

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS,
  );
}
