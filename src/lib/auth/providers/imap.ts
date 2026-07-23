import { ImapFlow } from "imapflow";
import type { AuthBackend, CredentialCheckResult } from "../types";
import {
  displayNameFromEmail,
  getImapConfig,
  isEmailDomainAllowed,
  resolveRoleForEmail,
} from "../config";

function isTlsError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  const code =
    err && typeof err === "object" && "code" in err
      ? String((err as { code?: string }).code)
      : "";
  return (
    /certificate|SSL|TLS|UNABLE_TO_VERIFY|CERT_/i.test(message) ||
    /UNABLE_TO_VERIFY|CERT_|ERR_TLS/i.test(code)
  );
}

/**
 * Authenticates by logging into the cPanel IMAP mailbox.
 * Password is used only for the IMAP handshake and never stored.
 */
export const imapAuthBackend: AuthBackend = {
  id: "imap",

  async authenticate(
    email: string,
    password: string,
  ): Promise<CredentialCheckResult> {
    const normalized = email.trim().toLowerCase();

    if (!normalized || !password) {
      return { ok: false, error: "Email and password are required." };
    }

    if (!isEmailDomainAllowed(normalized)) {
      return {
        ok: false,
        error: "This email domain is not allowed for portal access.",
      };
    }

    const { host, port, secure, tlsRejectUnauthorized } = getImapConfig();
    const client = new ImapFlow({
      host,
      port,
      secure,
      auth: { user: normalized, pass: password },
      logger: false,
      connectionTimeout: 20_000,
      greetingTimeout: 20_000,
      socketTimeout: 20_000,
      tls: {
        rejectUnauthorized: tlsRejectUnauthorized,
        servername: host,
      },
    });

    try {
      await client.connect();
      try {
        await client.logout();
      } catch {
        try {
          client.close();
        } catch {
          /* ignore */
        }
      }

      return {
        ok: true,
        user: {
          email: normalized,
          name: displayNameFromEmail(normalized),
          role: resolveRoleForEmail(normalized),
        },
      };
    } catch (err) {
      try {
        client.close();
      } catch {
        /* ignore */
      }

      if (process.env.NODE_ENV !== "production") {
        console.error("[imap-auth]", err);
      }

      if (isTlsError(err) && tlsRejectUnauthorized) {
        return {
          ok: false,
          error:
            "Mail server TLS certificate could not be verified. Set IMAP_TLS_REJECT_UNAUTHORIZED=false in .env (common on cPanel), then restart the server.",
        };
      }

      return {
        ok: false,
        error: "Invalid email or password.",
      };
    }
  },
};
