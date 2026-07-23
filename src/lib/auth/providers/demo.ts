import type { AuthBackend, CredentialCheckResult } from "../types";
import {
  displayNameFromEmail,
  isEmailDomainAllowed,
  resolveRoleForEmail,
} from "../config";

/**
 * Local development fallback. Any password works for allowed domains.
 * Never use in production — set AUTH_PROVIDER=imap or api.
 */
export const demoAuthBackend: AuthBackend = {
  id: "demo",

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

    if (password.length < 4) {
      return { ok: false, error: "Invalid email or password." };
    }

    return {
      ok: true,
      user: {
        email: normalized,
        name: displayNameFromEmail(normalized),
        role: resolveRoleForEmail(normalized),
      },
    };
  },
};
