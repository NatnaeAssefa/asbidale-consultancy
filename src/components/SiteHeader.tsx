"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  FlaskConical,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { BrandMark } from "./BrandMark";

const navLinks = [
  { href: "/#who-we-are", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#navigator", label: "Navigator" },
  { href: "/#ai", label: "AI Projects" },
  { href: "/#team", label: "Team" },
  { href: "/#partners", label: "Partners" },
];

const portals = [
  {
    href: "/dashboard",
    label: "Investigator",
    hint: "Site & milestone operations",
    Icon: LayoutDashboard,
  },
  {
    href: "/sponsor-dashboard",
    label: "Sponsor",
    hint: "Portfolio command center",
    Icon: FlaskConical,
  },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth > 1100) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <header
      id="site-header"
      className={scrolled || open ? "scrolled" : undefined}
    >
      <div className="headbar">
        <Link href="/#top" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-mark" aria-hidden="true">
              <BrandMark priority />
            </span>
          <span className="brand-text">
            <span className="brand-word">Asbidale Consultancy Services</span>
            <span className="brand-sub">Pvt. Ltd. Co.</span>
          </span>
        </Link>

        <nav className="mainnav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <span className="nav-divider" aria-hidden="true" />
          <div className="portal-links" aria-label="Portals">
            {portals.map(({ href, label, Icon }) => (
              <Link key={href} href={href}>
                <Icon size={15} /> {label}
              </Link>
            ))}
          </div>
          <a href="/#contact" className="btn solid">
            Start a conversation <ArrowUpRight size={14} />
          </a>
        </nav>

        <button
          type="button"
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <nav className="site-drawer" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <p className="site-drawer-label">Workspaces</p>
          {portals.map(({ href, label, hint, Icon }) => (
            <Link
              key={href}
              href={href}
              className="site-drawer-portal"
              onClick={() => setOpen(false)}
            >
              <Icon size={16} />
              <span>
                <b>{label} portal</b>
                <small>{hint}</small>
              </span>
            </Link>
          ))}
          <a
            href="/#contact"
            className="site-drawer-cta"
            onClick={() => setOpen(false)}
          >
            Start a conversation
          </a>
        </nav>
      ) : null}
    </header>
  );
}
