"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser } from "./portal-types";

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  provider: string | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = (await res.json()) as {
        user: AuthUser | null;
        provider?: string;
      };
      setUser(data.user);
      setProvider(data.provider ?? null);
    } catch {
      setUser(null);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = (await res.json()) as {
      user?: AuthUser;
      error?: string;
      provider?: string;
    };
    if (!res.ok || !data.user) {
      throw new Error(data.error || "Sign in failed.");
    }
    setUser(data.user);
    setProvider(data.provider ?? null);
    try {
      window.localStorage.removeItem("asbidale.auth");
    } catch {
      /* ignore */
    }
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      try {
        window.localStorage.removeItem("asbidale.auth");
      } catch {
        /* ignore */
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, ready, provider, login, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
