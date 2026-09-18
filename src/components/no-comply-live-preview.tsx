import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

import { AnimatedWordmark } from "@/components/no-comply/animated-wordmark";
import logoMain from "@/assets/no-comply-landing/logo.svg";

const SHOP_PATH = "/projects/no-comply";

const label = "text-[10px] tracking-[0.3em] uppercase font-medium";
const display = { fontFamily: '"Bebas Neue", "Oswald", sans-serif' } as const;
const body = { fontFamily: '"Inter", sans-serif' } as const;

type NavTarget = { label: string; to: string; search?: Record<string, string> };

const COLLECTION_LINKS: NavTarget[] = [
  { label: "No Comply Command", to: "/projects/no-comply/command", search: { cat: "all", sort: "order" } },
  { label: "Caught on Film", to: "/projects/no-comply/caught-on-film", search: { cat: "all" } },
];

const CATEGORY_LINKS: NavTarget[] = ["Tops", "Outerwear", "Bottoms", "Accessories"].map((cat) => ({
  label: cat,
  to: "/projects/no-comply/command",
  search: { cat, sort: "order" },
}));

const SITE_LINKS: NavTarget[] = [
  { label: "Media", to: "/projects/no-comply/media" },
  { label: "Designs", to: "/projects/no-comply/designs" },
  { label: "About", to: "/projects/no-comply/about" },
];

/** Interactive recreation of the NO COMPLY USA homepage. */
export function NoComplyLivePreview({ onNavigate }: { onNavigate?: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const MenuLink = ({ target, className }: { target: NavTarget; className: string }) => (
    <Link
      to={target.to}
      search={(target.search ?? {}) as never}
      className={className}
      onClick={() => {
        setMobileOpen(false);
        onNavigate?.();
      }}
    >
      {target.label}
    </Link>
  );

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 200);
    return () => window.clearTimeout(t);
  }, []);

  const reveal = (delay: number) =>
    ({
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }) as const;

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-black text-white"
      style={body}
    >
      <video
        className="absolute inset-0 h-full w-full scale-[2] object-cover object-center md:scale-[1.7]"
        style={{ minWidth: "100%", minHeight: "100%", objectPosition: "center 42%" }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/no-comply-landing-bg.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <nav aria-label="NO COMPLY USA landing header" className="absolute right-4 top-4 z-40 md:right-6 md:top-6">
        <button type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu"
          aria-expanded={mobileOpen} aria-controls="no-comply-landing-menu"
          className="flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="no-comply-landing-menu" className="absolute inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col overflow-y-auto border-r border-white/10 bg-[#141414]">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <img src={logoMain} alt="NO COMPLY USA" className="h-10 w-auto" />
              <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-1 px-6 py-8">
              {[...COLLECTION_LINKS, ...SITE_LINKS].map((item) => (
                <div key={item.label} style={display}>
                  <MenuLink
                    target={item}
                    className="block py-2 text-3xl uppercase tracking-wider text-white/90 hover:text-white"
                  />
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 px-6 py-6">
              <p className={`${label} mb-4 text-white/30`}>Categories</p>
              <div className="space-y-1">
                {CATEGORY_LINKS.map((c) => (
                  <MenuLink
                    key={c.label}
                    target={c}
                    className="block py-1.5 text-sm uppercase tracking-[0.15em] text-white/50 hover:text-white"
                  />
                ))}
              </div>
            </div>
            <div className="mt-auto border-t border-white/10 px-6 py-6">
              <p className="text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/20">
                Industrial Rebellion
                <br />
                American Workwear Reconstructed
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-5 w-[90vw] max-w-[960px] shrink-0 md:mb-7">
          <AnimatedWordmark hero />
        </div>
        <p
          style={{ ...display, ...reveal(1.2) }}
          className="text-2xl uppercase tracking-[0.1em] text-[hsl(0,85%,45%)] md:text-4xl lg:text-5xl"
        >
          No Comply or Die
        </p>
        <Link
          to={SHOP_PATH}
          onClick={() => onNavigate?.()}
          style={reveal(1.8)}
          className={`${label} mt-4 inline-block border border-white/30 px-8 py-3 text-white transition-all duration-300 hover:bg-white hover:text-black`}
        >
          Enter Shop
        </Link>
      </div>

      {/* Footer */}
      <div
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 2.6s" }}
        className="absolute bottom-0 left-0 right-0 z-30 flex justify-center px-4 pb-[max(20px,env(safe-area-inset-bottom))]"
      >
        <div className={`${label} flex gap-4 text-white/30`}>
          <span>Miami, FL</span>
          <span>·</span>
          <span>Drop 001</span>
          <span>·</span>
          <span>MMXXVI</span>
        </div>
      </div>
    </div>
  );
}

export function NoComplyPreviewActions() {
  const button =
    "flex min-h-12 w-full items-center justify-center border border-black px-7 py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors sm:w-auto";
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <Link to={SHOP_PATH} className={`${button} bg-black text-white hover:bg-white hover:text-black`}>
        Enter Shop
      </Link>
    </div>
  );
}

export function NoComplyPreviewDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="h-[100dvh] w-screen max-w-none gap-0 border-0 bg-black p-0 text-white sm:rounded-none">
        <DialogTitle className="sr-only">NO COMPLY USA</DialogTitle>
        <DialogDescription className="sr-only">
          An interactive recreation of the NO COMPLY USA homepage.
        </DialogDescription>
        {open && <NoComplyLivePreview onNavigate={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}
