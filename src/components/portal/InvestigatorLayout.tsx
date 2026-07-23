"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  ArrowUpRight,
  Building2,
  FileText,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { useAuth } from "@/lib/auth-context";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "/dashboard/milestones",
    label: "Project Milestones",
    icon: Activity,
  },
  { href: "/dashboard/studies", label: "Study Status", icon: FlaskConical },
  { href: "/dashboard/sites", label: "Sites & Staffing", icon: Building2 },
  {
    href: "/dashboard/documents",
    label: "Documents & Compliance",
    icon: ShieldCheck,
  },
];

export function InvestigatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="portal-shell">
      <header className="portal-topbar">
        <Link href="/dashboard" className="portal-brand">
          <span className="portal-brand-mark" aria-hidden="true">
            <BrandMark />
          </span>
          <span className="portal-brand-text">
            <span className="portal-brand-word">
              Asbidale Consultancy Services
            </span>
            <span className="portal-brand-sub">Investigator Portal</span>
          </span>
        </Link>
        <div className="portal-top-actions">
          <Link href="/sponsor-dashboard" className="hide-sm">
            Sponsor workspace <ArrowUpRight size={14} />
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
              <LogOut size={16} /> Sign out
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
            <Link href="/" className="portal-nav-link">
              <FileText size={17} /> Back to site
            </Link>
          </nav>
        </aside>
        <main className="portal-main">
          <div className="portal-demo-banner">
            Demo workspace with local sample data. Authentication and live sync
            will connect to the upcoming backend.
          </div>
          {children}
        </main>
      </div>

      <nav className="portal-bottom-nav" aria-label="Investigator">
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
