"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserPlus } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { user, ready, provider } = useAuth();

  useEffect(() => {
    if (!ready || !user) return;
    router.replace(
      user.role === "sponsor" ? "/sponsor-dashboard" : "/dashboard",
    );
  }, [ready, user, router]);

  const isMailboxAuth = provider === "imap" || provider === "api";

  return (
    <AuthShell
      icon={UserPlus}
      title={isMailboxAuth ? "Accounts via email" : "Create account"}
      subtitle={
        isMailboxAuth
          ? "Portal access uses your hosted mailbox"
          : "Join the Asbidale workspace (demo)"
      }
      footer={
        <>
          Already registered? <Link href="/login">Sign in</Link>
        </>
      }
    >
      {isMailboxAuth ? (
        <div className="auth-hint">
          User accounts are your cPanel email mailboxes (for example{" "}
          <b>you@asbidale.com</b>). Ask an administrator to create the mailbox,
          then sign in on the login page with that email and password.
          <div style={{ marginTop: 16 }}>
            <Link href="/login" className="portal-btn" style={{ display: "inline-flex" }}>
              Go to sign in
            </Link>
          </div>
        </div>
      ) : (
        <div className="auth-hint">
          Demo mode does not create real mailboxes. Use{" "}
          <Link href="/login">sign in</Link> with any{" "}
          <b>@asbidale.com</b> address and a password of 4+ characters. For
          production, set <code>AUTH_PROVIDER=imap</code>.
        </div>
      )}
    </AuthShell>
  );
}
