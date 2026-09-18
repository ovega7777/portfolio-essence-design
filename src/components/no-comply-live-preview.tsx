import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

import { StandardNoComplyMenu } from "@/components/no-comply/standard-menu";
import { FontChangingLogo } from "@/components/no-comply/font-changing-logo";

const SHOP_PATH = "/projects/no-comply";

const label = "text-[10px] tracking-[0.3em] uppercase font-medium";
const display = { fontFamily: '"Bebas Neue", "Oswald", sans-serif' } as const;
const body = { fontFamily: '"Inter", sans-serif' } as const;

/** Interactive recreation of the NO COMPLY USA homepage. */
export function NoComplyLivePreview({ onNavigate }: { onNavigate?: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      className="relative h-full w-full overflow-clip bg-black text-white"
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

      <nav aria-label="NO COMPLY USA landing header" className="absolute right-2 top-4 z-40 sm:right-4 md:top-6">
        <button type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu"
          aria-expanded={mobileOpen} aria-controls="no-comply-standard-menu"
          className="flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <StandardNoComplyMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
        dark
      />

      {/* Hero */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-5 w-[81vw] max-w-[864px] shrink-0 md:mb-7">
          <FontChangingLogo />
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
      <DialogContent onEscapeKeyDown={(event) => {
        if (document.getElementById("no-comply-standard-menu")) event.preventDefault();
      }} showCloseButton={false} className="h-[100dvh] w-screen max-w-none gap-0 border-0 bg-black p-0 text-white sm:rounded-none">
        <DialogTitle className="sr-only">NO COMPLY USA</DialogTitle>
        <DialogDescription className="sr-only">
          An interactive recreation of the NO COMPLY USA homepage.
        </DialogDescription>
        {open && <NoComplyLivePreview onNavigate={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}
