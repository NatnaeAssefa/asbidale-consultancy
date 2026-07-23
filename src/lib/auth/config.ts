import type { AuthProviderId } from "./types";
import type { AuthUser } from "@/lib/portal-types";

function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

export function getAuthProviderId(): AuthProviderId {
  const raw = (process.env.AUTH_PROVIDER || "demo").toLowerCase();
  if (raw === "imap" || raw === "demo" || raw === "api") return raw;
  throw new Error(
    `Invalid AUTH_PROVIDER "${raw}". Use imap, demo, or api.`,
  );
}

export function getSessionSecret(): string {
  return (
    process.env.AUTH_SESSION_SECRET ||
    process.env.SESSION_SECRET ||
    "dev-only-change-me-asbidale-session-secret"
  );
}

export function getImapConfig() {
  return {
    host: required("IMAP_HOST", process.env.IMAP_HOST),
    port: Number(process.env.IMAP_PORT || 993),
    secure: process.env.IMAP_SECURE !== "false",
    // cPanel often serves a hostname-mismatched / self-signed cert.
    // Outlook may warn and still connect; Node rejects unless this is false.
    tlsRejectUnauthorized: process.env.IMAP_TLS_REJECT_UNAUTHORIZED !== "false",
  };
}

export function getRemoteAuthConfig() {
  return {
    baseUrl: required("AUTH_API_URL", process.env.AUTH_API_URL).replace(
      /\/$/,
      "",
    ),
    apiKey: process.env.AUTH_API_KEY || "",
  };
}

export function getAllowedEmailDomains(): string[] {
  const raw = process.env.AUTH_ALLOWED_DOMAINS || "asbidale.com";
  return raw
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
}

function parseEmailList(raw: string | undefined): Set<string> {
  return new Set(
    (raw || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

/**
 * Role comes from config (not IMAP). Change these lists when migrating
 * to a backend that returns roles itself.
 */
export function resolveRoleForEmail(email: string): AuthUser["role"] {
  const normalized = email.trim().toLowerCase();
  const both = parseEmailList(process.env.AUTH_BOTH_EMAILS);
  const sponsors = parseEmailList(process.env.AUTH_SPONSOR_EMAILS);
  const investigators = parseEmailList(process.env.AUTH_INVESTIGATOR_EMAILS);

  if (both.has(normalized)) return "both";
  if (sponsors.has(normalized)) return "sponsor";
  if (investigators.has(normalized)) return "investigator";

  const fallback = (process.env.AUTH_ROLE_DEFAULT || "both").toLowerCase();
  if (fallback === "sponsor" || fallback === "investigator" || fallback === "both") {
    return fallback;
  }
  return "both";
}

export function displayNameFromEmail(email: string): string {
  const local = email.split("@")[0] || "User";
  return local
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function isEmailDomainAllowed(email: string): boolean {
  const domains = getAllowedEmailDomains();
  if (!domains.length) return true;
  const domain = email.split("@")[1]?.toLowerCase();
  return Boolean(domain && domains.includes(domain));
}
