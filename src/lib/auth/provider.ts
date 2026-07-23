import type { AuthBackend } from "./types";
import { getAuthProviderId } from "./config";
import { demoAuthBackend } from "./providers/demo";
import { imapAuthBackend } from "./providers/imap";
import { remoteAuthBackend } from "./providers/remote";

/**
 * Factory — swap AUTH_PROVIDER in env to migrate backends:
 *   demo  → local testing (default)
 *   imap  → cPanel / hosted mailboxes
 *   api   → your future auth service
 */
export function getAuthBackend(): AuthBackend {
  switch (getAuthProviderId()) {
    case "imap":
      return imapAuthBackend;
    case "api":
      return remoteAuthBackend;
    case "demo":
    default:
      return demoAuthBackend;
  }
}
