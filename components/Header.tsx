"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={closeMenu}>
          <span>MARA CONTENT LAB</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="/#problem" className="nav-link">Problem</a>
          <a href="/#offer" className="nav-link">The Sprint ($149 first buy)</a>
          <a href="/#process" className="nav-link">Process</a>
          <a href="/#sample" className="nav-link">Sample</a>
          <a href="/#fit" className="nav-link">Fit</a>
          <a href="/#about" className="nav-link">About</a>
          <a href="/#faq" className="nav-link">FAQ</a>
          <a
            href="https://www.linkedin.com/in/parth-tiwari-988971386"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
          >
            LinkedIn ↗
          </a>
          <Link
            href="/request"
            className="btn btn-primary"
            style={{ padding: "0.45rem 1rem", fontSize: "0.875rem", minHeight: "38px" }}
          >
            Request a Project
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="mobile-nav-toggle"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <nav className="mobile-nav-links" aria-label="Mobile navigation">
            <a href="/#problem" className="mobile-nav-link" onClick={closeMenu}>Problem</a>
            <a href="/#offer" className="mobile-nav-link" onClick={closeMenu}>The Sprint ($149 first buy)</a>
            <a href="/#process" className="mobile-nav-link" onClick={closeMenu}>Process</a>
            <a href="/#sample" className="mobile-nav-link" onClick={closeMenu}>Sample</a>
            <a href="/#fit" className="mobile-nav-link" onClick={closeMenu}>Fit</a>
            <a href="/#about" className="mobile-nav-link" onClick={closeMenu}>About</a>
            <a href="/#faq" className="mobile-nav-link" onClick={closeMenu}>FAQ</a>
            <a
              href="https://www.linkedin.com/in/parth-tiwari-988971386"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              LinkedIn ↗
            </a>
            <Link
              href="/request"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "0.5rem" }}
              onClick={closeMenu}
            >
              Request a Project — $149 First Buy
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
