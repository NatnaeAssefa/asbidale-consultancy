"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { useAuth } from "@/lib/auth-context";
import type { AuthUser } from "@/lib/portal-types";

function resolveDestination(role: AuthUser["role"], next: string | null) {
  if (next?.startsWith("/sponsor-dashboard")) {
    if (role === "sponsor" || role === "both") return next;
  }
  if (next?.startsWith("/dashboard")) {
    if (role === "investigator" || role === "both") return next;
  }
  return role === "sponsor" ? "/sponsor-dashboard" : "/dashboard";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const { user, ready, provider, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ready || !user) return;
    router.replace(resolveDestination(user.role, next));
  }, [ready, user, next, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Enter email and password.");
      return;
    }
    setLoading(true);
    try {
      const account = await login(email, password);
      router.push(resolveDestination(account.role, next));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  const hint =
    provider === "imap"
      ? "Sign in with your Asbidale email mailbox (cPanel). Passwords are verified with the mail server and never stored."
      : provider === "api"
        ? "Sign in via the connected auth service."
        : "Demo mode — any password works for allowed email domains. Set AUTH_PROVIDER=imap for live mailbox login.";

  return (
    <AuthShell
      icon={LogIn}
      title="Welcome back"
      subtitle="Sign in to your Asbidale workspace"
      footer={
        provider === "demo" ? (
          <>
            Need a local account?{" "}
            <Link href="/register">Create a demo login</Link>
          </>
        ) : (
          <>
            Mailboxes are created in cPanel.{" "}
            <a href="mailto:info@asbidale.com">Contact support</a>
          </>
        )
      }
    >
      <div className="auth-hint">{hint}</div>
      {error ? <div className="auth-error">{error}</div> : null}
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          <span className="field-label">Email</span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@asbidale.com"
            required
          />
        </label>
        <label>
          <span className="field-label">
            Password
            {provider === "imap" ? (
              <span style={{ textTransform: "none", letterSpacing: 0 }}>
                Reset via webmail / cPanel
              </span>
            ) : (
              <Link href="/forgot-password">Forgot password?</Link>
            )}
          </span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="auth-shell">
          <p style={{ color: "var(--muted)", fontSize: 14 }}>Loading…</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
