/*
 * DESIGN PHILOSOPHY: Quiet Modernism
 * Navbar: Minimal top bar, left-anchored name, right-anchored nav links.
 * Sage green accent on active/hover states. Subtle bottom border on scroll.
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo / Name */}
        <Link href="/">
          <span
            className="font-display text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors duration-200"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Portfolio
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-8">
          <Link href="/">
            <span
              className={`font-body text-sm font-medium transition-colors duration-200 link-underline ${
                location === "/"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </span>
          </Link>
          <a
            href="/#projects"
            className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 link-underline"
          >
            Projects
          </a>
          <a
            href="/#contact"
            className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 link-underline"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
