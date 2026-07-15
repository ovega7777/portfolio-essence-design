import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SiteNav() {
  const link =
    "text-[11px] uppercase tracking-[0.25em] font-semibold text-muted-foreground hover:text-foreground transition-colors";
  const activeLink = "text-foreground";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="font-serif text-2xl font-semibold tracking-tight hover:opacity-70 transition-opacity"
        >
          N. Curzon
        </Link>
        <div className="flex gap-8">
          <Link
            to="/"
            className={link}
            activeProps={{ className: `${link} ${activeLink}` }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={link}
            activeProps={{ className: `${link} ${activeLink}` }}
          >
            About Me
          </Link>
          <Link
            to="/projects"
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
    <footer className="border-t border-border py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow mb-3">Get in touch</p>
          <a
            href="mailto:nicholasc@curzonco.com"
            className="font-serif text-3xl hover:text-muted-foreground transition-colors"
          >
            nicholasc@curzonco.com
          </a>
        </div>
        <div className="flex flex-wrap gap-8 text-[10px] font-semibold uppercase tracking-[0.25em]">
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

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="pt-28">{children}</main>
      <SiteFooter />
    </div>
  );
}
