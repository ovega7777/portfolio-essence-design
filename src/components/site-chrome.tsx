import { ContactDetails } from "./contact-details";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
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
    "block py-2 font-serif text-4xl uppercase text-background/80 transition-colors hover:text-background sm:text-5xl";
  const activeLink = "text-background";

  return (
    <nav aria-label="Portfolio navigation" className="portfolio-nav fixed left-0 right-0 top-0 z-50 bg-foreground text-background">
      <div className="relative mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <button
          ref={toggle}
          type="button"
          className="portfolio-menu-toggle z-10 inline-flex h-11 w-11 items-center justify-start text-background transition-opacity hover:opacity-70"
          aria-expanded={open}
          aria-controls="portfolio-navigation-links"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="portfolio-nav-name absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-background transition-opacity hover:opacity-70"
        >
          Nicholas Curzon
        </Link>
        <div className="h-11 w-11" aria-hidden="true" />
      </div>

      {open && (
        <div id="portfolio-navigation-links" className="portfolio-nav-links fixed inset-x-0 bottom-0 top-16 z-40 bg-foreground text-background md:top-20">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-full w-[85%] max-w-sm flex-col border-r border-background/15 bg-foreground px-6 py-8">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-background/40">Portfolio</p>
            <div className="space-y-1">
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
            <p className="mt-auto border-t border-background/15 pt-6 text-[10px] uppercase leading-relaxed tracking-[0.2em] text-background/30">
              Creative Commerce
              <br />
              Design &amp; Direction
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}

export function SiteFooter({ showContact = true }: { showContact?: boolean }) {
  return (
    <footer className="portfolio-footer border-t border-border py-20">
      <div className={`portfolio-footer-inner mx-auto max-w-6xl px-6 ${showContact ? "" : "portfolio-footer-inner--copyright-only"}`}>
        {showContact && <ContactDetails />}
        <p className="portfolio-copyright text-muted-foreground">
          © {new Date().getFullYear()} Nicholas Curzon
        </p>
      </div>
    </footer>
  );
}

export function SiteFrame({
  children,
  className = "",
  showFooterContact = true,
}: {
  children: ReactNode;
  className?: string;
  showFooterContact?: boolean;
}) {
  return (
    <div className={`portfolio-site min-h-screen bg-background text-foreground ${className}`}>
      <SiteNav />
      <main className="pt-20">{children}</main>
      <SiteFooter showContact={showFooterContact} />
    </div>
  );
}
