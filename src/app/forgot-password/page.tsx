"use client";

import Link from "next/link";
import { useState } from "react";
import { KeyRound } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AuthShell
      icon={KeyRound}
      title="Reset password"
      subtitle="We'll email a reset link once the backend is live"
      footer={
        <>
          Remembered it? <Link href="/login">Sign in</Link>
        </>
      }
    >
      {sent ? (
        <div className="auth-hint">
          If an account exists for {email}, a reset link will be sent when the
          auth service is connected. For now, return to{" "}
          <Link href="/login">sign in</Link> with any password.
        </div>
      ) : (
        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label>
            <span className="field-label">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit">Send reset link</button>
        </form>
      )}
    </AuthShell>
  );
}
