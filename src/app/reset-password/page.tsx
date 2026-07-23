"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  return (
    <AuthShell
      icon={LockKeyhole}
      title="Choose a new password"
      subtitle="Demo screen — password changes will use the backend later"
      footer={
        <>
          Back to <Link href="/login">sign in</Link>
        </>
      }
    >
      {error ? <div className="auth-error">{error}</div> : null}
      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
          }
          if (password !== confirm) {
            setError("Passwords do not match.");
            return;
          }
          router.push("/login");
        }}
      >
        <label>
          <span className="field-label">New password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <span className="field-label">Confirm password</span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update password</button>
      </form>
    </AuthShell>
  );
}
