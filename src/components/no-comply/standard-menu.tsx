import { Link, useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import { MenuWordmark } from "./menu-wordmark";
import { useEffect, useRef } from "react";

import { DESIGN_CATEGORIES, DESIGN_CATEGORY_LABELS, normalizeDesignCategory } from "@/components/no-comply/design-categories";

interface StandardNoComplyMenuProps {
  open: boolean;
  onClose: () => void;
  activeCollection?: "command" | "caught-on-film";
}

export function StandardNoComplyMenu({
  open,
  onClose,
  activeCollection,
}: StandardNoComplyMenuProps) {
  const catalogCategory = useRouterState({
    select: (state) => state.location.pathname.replace(/\/$/, "") === "/projects/no-comply/designs"
      ? normalizeDesignCategory(state.location.search.cat) : null,
  });
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => closeRef.current?.focus());
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  const linkClass =
    "flex min-h-11 w-full items-center whitespace-nowrap text-left font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

  return (
    <div className="fixed inset-0 z-[120]">
      <button
        type="button"
        aria-label="Close product menu"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/45"
      />
      <aside
        ref={panelRef}
        id="no-comply-standard-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Product navigation"
        className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col overflow-y-auto border-l border-black/10 bg-white px-6 py-5 text-black shadow-2xl sm:px-9 sm:py-6"
      >
        <div className="flex items-center justify-between gap-4 border-b border-black/15 pb-4">
          <MenuWordmark />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close product menu"
            className="flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Close
            <X aria-hidden className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <nav
          aria-label="No Comply editorial pages"
          className="mt-2 flex flex-col items-start"
        >
          <Link
            to="/projects/no-comply/about"
            onClick={onClose}
            className="w-full border-b border-black/10 py-3.5 font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            About
          </Link>
          <Link
            to="/projects/no-comply/media"
            onClick={onClose}
            className="w-full border-b border-black/10 py-3.5 font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Media
          </Link>
        </nav>

        <section className="mt-5 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-black/55">
            Collections
          </p>
          <div className="mt-2 flex flex-col items-start">
            <Link
              to="/projects/no-comply/command"
              search={{ cat: "all", sort: "order" }}
              onClick={onClose}
              aria-current={activeCollection === "command" ? "page" : undefined}
              className={`${linkClass} ${activeCollection === "command" ? "text-black" : ""}`}
            >
              #1 No Comply Command
            </Link>
            <Link
              to="/projects/no-comply/caught-on-film"
              search={{ cat: "all" }}
              onClick={onClose}
              aria-current={activeCollection === "caught-on-film" ? "page" : undefined}
              className={`${linkClass} ${activeCollection === "caught-on-film" ? "text-[#d9571b]" : ""}`}
            >
              #2 Caught on Film
            </Link>
          </div>
        </section>

        <section className="mt-5 border-t border-black/10 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-black/55">Designs</p>
          <div className="mt-2 flex flex-col items-start">
            {DESIGN_CATEGORIES.map((category) => (
              <Link
                key={category}
                to="/projects/no-comply/designs"
                search={{ cat: category }}
                hash="catalog-controls"
                onClick={onClose}
                aria-current={catalogCategory === category ? "page" : undefined}
                className={`${linkClass} ${catalogCategory === category ? "font-bold underline underline-offset-4" : ""}`}
              >
                {category === "all" ? "All Designs" : DESIGN_CATEGORY_LABELS[category]}
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
