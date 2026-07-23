import type { AuthUser } from "@/lib/portal-types";

export type AuthProviderId = "imap" | "demo" | "api";

export type CredentialCheckResult =
  | { ok: true; user: AuthUser }
  | { ok: false; error: string };

/**
 * Swappable authentication backend.
 * Switch with AUTH_PROVIDER=imap | demo | api in env.
 */
export interface AuthBackend {
  readonly id: AuthProviderId;
  /**
   * Verify email/password and return a normalized user profile.
   * Must never return or persist the password.
   */
  authenticate(
    email: string,
    password: string,
  ): Promise<CredentialCheckResult>;
}
