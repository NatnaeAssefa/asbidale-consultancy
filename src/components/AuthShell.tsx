import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({
  icon: Icon,
  title,
  subtitle,
  footer,
  children,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card-head">
          <div className="auth-icon">
            <Icon size={24} />
          </div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <div className="auth-panel">{children}</div>
        {footer ? <p className="auth-footer">{footer}</p> : null}
        <Link href="/" className="auth-back">
          ← Back to public site
        </Link>
      </div>
    </div>
  );
}
