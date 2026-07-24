"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  FlaskConical,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Users,
} from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { useAuth } from "@/lib/auth-context";

const nav = [
  {
    href: "/sponsor-dashboard",
    label: "Portfolio Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/sponsor-dashboard/studies",
    label: "Study Portfolio",
    icon: FlaskConical,
  },
  {
    href: "/sponsor-dashboard/communications",
    label: "Communications",
    icon: MessageSquare,
  },
  {
    href: "/sponsor-dashboard/enrollment",
    label: "Enrollment & Sites",
    icon: Users,
  },
  {
    href: "/sponsor-dashboard/documents",
    label: "Reports & Documents",
    icon: FolderOpen,
  },
];

export function SponsorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const isActive = (href: string) =>
    href === "/sponsor-dashboard"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <div className="portal-shell">
      <header className="portal-topbar">
        <Link href="/sponsor-dashboard" className="portal-brand">
          <span className="portal-brand-mark" aria-hidden="true">
            <BrandMark />
          </span>
          <span className="portal-brand-text">
            <span className="portal-brand-word">
              Asbidale Consultancy Services
            </span>
            <span className="portal-brand-sub">Sponsor Workspace</span>
          </span>
        </Link>
        <div className="portal-top-actions">
          <Link href="/dashboard" className="hide-sm">
            Investigator portal <ArrowUpRight size={14} />
          </Link>
          <Link href="/" className="hide-sm">
            Public site
          </Link>
          {user ? (
            <button
              type="button"
              onClick={() => {
                void logout().then(() => router.push("/login"));
              }}
            >
              <LogOut size={15} /> Sign out
            </button>
          ) : (
            <Link href="/login">Sign in</Link>
          )}
        </div>
      </header>

      <div className="portal-body">
        <aside className="portal-aside">
          <nav>
            {nav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`portal-nav-link${isActive(href) ? " active" : ""}`}
              >
                <Icon size={17} /> {label}
              </Link>
            ))}
          </nav>
          <div className="portal-aside-card">
            <p>Support</p>
            <p>director@asbidale.com</p>
            <p>+251 911 248 265</p>
          </div>
        </aside>
        <main className="portal-main">
          <div className="portal-demo-banner">
            Demo sponsor workspace with local sample data. Live portfolio sync
            arrives with the upcoming backend.
          </div>
          {children}
        </main>
      </div>

      <nav className="portal-bottom-nav" aria-label="Sponsor">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={isActive(href) ? "active" : undefined}
          >
            <Icon size={18} />
            {label.split(" ")[0]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
