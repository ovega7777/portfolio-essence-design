import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const link =
    "text-[11px] uppercase tracking-[0.25em] font-semibold text-muted-foreground hover:text-foreground transition-colors";
  const activeLink = "text-foreground";

  return (
    <nav aria-label="Portfolio navigation" className="portfolio-nav fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="portfolio-nav-name hover:opacity-70 transition-opacity"
        >
          Nicholas Curzon
        </Link>
        <button ref={toggle} type="button" className="portfolio-menu-toggle" aria-expanded={open}
          aria-controls="portfolio-navigation-links" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
        <div id="portfolio-navigation-links" className={`portfolio-nav-links flex gap-8 ${open ? "is-open" : ""}`}>
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={link}
            activeProps={{ className: `${link} ${activeLink}` }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className={link}
            activeProps={{ className: `${link} ${activeLink}` }}
          >
            About Me
          </Link>
          <Link
            to="/projects"
            onClick={() => setOpen(false)}
            className={link}
            activeProps={{ className: `${link} ${activeLink}` }}
          >
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="portfolio-footer border-t border-border py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow mb-3">Get in touch</p>
          <a
            href="mailto:nicholasc@curzonco.com"
            className="portfolio-contact-address font-serif text-3xl hover:text-muted-foreground transition-colors"
          >
            nicholasc@curzonco.com
          </a>
        </div>
        <div className="portfolio-footer-links flex flex-wrap gap-8 text-[10px] font-semibold uppercase tracking-[0.25em]">
          <a
            href="https://www.linkedin.com/in/nicholascurzon/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-muted-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:nicholasc@curzonco.com"
            className="hover:text-muted-foreground transition-colors"
          >
            Email
          </a>
          <span className="text-muted-foreground">
            © {new Date().getFullYear()} Nicholas Curzon
          </span>
        </div>
      </div>
    </footer>
  );
}

export function SiteFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`portfolio-site min-h-screen bg-background text-foreground ${className}`}>
      <SiteNav />
      <main className="pt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}
