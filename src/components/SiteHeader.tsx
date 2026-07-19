"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";

const navLinks = [
  { href: "#who-we-are", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#ai", label: "AI Projects" },
  { href: "#team", label: "Team" },
  { href: "#partners", label: "Partners" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header id="site-header" className={scrolled ? "scrolled" : undefined}>
        <div className="headbar">
          <a href="#top" className="brand">
            <span className="brand-mark" aria-hidden="true">
              <BrandMark />
            </span>
            <span className="brand-text">
              <span className="brand-word">Asbidale Consultancy Services</span>
              <span className="brand-sub">Pvt. Ltd. Co.</span>
            </span>
          </a>
          <nav className="mainnav" aria-label="Primary">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="head-actions">
            <a href="#contact" className="btn solid">
              Start a conversation
            </a>
            <button
              type="button"
              className="burger"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav${mobileOpen ? " open" : ""}`}>
        <div className="close-row">
          <button
            type="button"
            className="x"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            &times;
          </button>
        </div>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" onClick={() => setMobileOpen(false)}>
              Contact
            </a>
          </li>
        </ul>
        <div className="mobile-cta">
          <a
            href="#contact"
            className="btn solid"
            onClick={() => setMobileOpen(false)}
          >
            Start a conversation
          </a>
        </div>
      </div>
    </>
  );
}
