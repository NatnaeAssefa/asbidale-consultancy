import type { AuthUser } from "@/lib/portal-types";
import type { AuthBackend, CredentialCheckResult } from "../types";
import {
  displayNameFromEmail,
  getRemoteAuthConfig,
  resolveRoleForEmail,
} from "../config";

type RemoteLoginResponse = {
  user?: Partial<AuthUser> & { email?: string };
  email?: string;
  name?: string;
  role?: AuthUser["role"];
  error?: string;
  message?: string;
};

/**
 * Future backend adapter. Point AUTH_API_URL at your API and set
 * AUTH_PROVIDER=api — no app code changes required beyond env.
 *
 * Expected POST {AUTH_API_URL}/auth/login
 * Body: { email, password }
 * Success JSON: { user: { email, name?, role? } }
 *   or { email, name?, role? }
 * Failure: non-2xx or { error / message }
 */
export const remoteAuthBackend: AuthBackend = {
  id: "api",

  async authenticate(
    email: string,
    password: string,
  ): Promise<CredentialCheckResult> {
    const normalized = email.trim().toLowerCase();
    if (!normalized || !password) {
      return { ok: false, error: "Email and password are required." };
    }

    const { baseUrl, apiKey } = getRemoteAuthConfig();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

    let res: Response;
    try {
      res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email: normalized, password }),
        cache: "no-store",
      });
    } catch {
      return {
        ok: false,
        error: "Auth service unreachable. Try again later.",
      };
    }

    let data: RemoteLoginResponse = {};
    try {
      data = (await res.json()) as RemoteLoginResponse;
    } catch {
      /* ignore */
    }

    if (!res.ok) {
      return {
        ok: false,
        error: data.error || data.message || "Invalid email or password.",
      };
    }

    const userEmail = (
      data.user?.email ||
      data.email ||
      normalized
    ).toLowerCase();
    const role =
      data.user?.role ||
      data.role ||
      resolveRoleForEmail(userEmail);
    const name =
      data.user?.name || data.name || displayNameFromEmail(userEmail);

    return {
      ok: true,
      user: { email: userEmail, name, role },
    };
  },
};
