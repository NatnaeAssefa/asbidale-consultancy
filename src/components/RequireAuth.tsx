"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import type { AuthUser } from "@/lib/portal-types";

type PortalKind = "investigator" | "sponsor";

function canAccess(user: AuthUser, portal: PortalKind) {
  if (user.role === "both") return true;
  return user.role === portal;
}

export function RequireAuth({
  portal,
  children,
}: {
  portal: PortalKind;
  children: React.ReactNode;
}) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      const next = encodeURIComponent(pathname || "/dashboard");
      router.replace(`/login?next=${next}`);
      return;
    }
    if (!canAccess(user, portal)) {
      router.replace(
        user.role === "sponsor" ? "/sponsor-dashboard" : "/dashboard",
      );
    }
  }, [ready, user, portal, pathname, router]);

  if (!ready) {
    return (
      <div className="auth-shell">
        <p style={{ color: "var(--muted)", fontSize: 14 }}>
          Checking session…
        </p>
      </div>
    );
  }

  if (!user || !canAccess(user, portal)) {
    return (
      <div className="auth-shell">
        <p style={{ color: "var(--muted)", fontSize: 14 }}>
          Redirecting to sign in…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
