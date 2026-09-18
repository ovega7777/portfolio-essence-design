import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

import heroLogo from "@/assets/no-comply-landing/hero-logo.svg";
import logoMain from "@/assets/no-comply-landing/logo.svg";
import logoGothic from "@/assets/no-comply-landing/logo-gothic.svg";
import logoPunk from "@/assets/no-comply-landing/logo-punk.svg";
import logoGraffiti from "@/assets/no-comply-landing/logo-graffiti.svg";

const SHOP_PATH = "/projects/no-comply";

/** logoMain (index 0) is the strikethrough logo the slot machine always lands on. */
const LOGOS = [logoMain, logoGothic, logoPunk, logoGraffiti];
const TOTAL_STEPS = LOGOS.length * 3 + 1;

const navLink =
  "text-sm tracking-[0.25em] uppercase font-medium text-white/80 hover:text-white transition-colors duration-300 cursor-pointer";
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

function useSlotMachine() {
  const [logoIndex, setLogoIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const spinningRef = useRef(false);

  const run = useCallback(() => {
    if (spinningRef.current) return;
    spinningRef.current = true;
    setSpinning(true);
    let step = 0;
    const tick = () => {
      step++;
      setLogoIndex(step % LOGOS.length);
      if (step >= TOTAL_STEPS) {
        setLogoIndex(0);
        spinningRef.current = false;
        setSpinning(false);
        return;
      }
      const progress = step / TOTAL_STEPS;
      window.setTimeout(tick, 60 + Math.pow(progress, 3) * 500);
    };
    window.setTimeout(tick, 60);
  }, []);

  useEffect(() => {
    const start = window.setTimeout(run, 800);
    return () => window.clearTimeout(start);
  }, [run]);

  useEffect(() => {
    if (spinning) return;
    const repeat = window.setTimeout(run, 8000);
    return () => window.clearTimeout(repeat);
  }, [spinning, run]);

  return { logoIndex, spinning };
}

/** Interactive recreation of the NO COMPLY USA homepage. */
export function NoComplyLivePreview({ onNavigate }: { onNavigate?: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { logoIndex, spinning } = useSlotMachine();

  const MenuLink = ({ target, className }: { target: NavTarget; className: string }) => (
    <Link
      to={target.to}
      search={(target.search ?? {}) as never}
      className={className}
      onClick={() => {
        setMegaOpen(false);
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

      {/* Header */}
      <nav className="absolute left-0 right-0 top-0 z-40">
        <div className="relative flex items-center justify-between px-5 py-5 md:px-14 md:py-8">
          <button className={navLink} onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>

          <div className="absolute left-1/2 top-1/2 h-[92px] w-[160px] -translate-x-1/2 translate-y-[-40%] overflow-hidden sm:h-[120px] sm:w-[200px] lg:h-[170px] lg:w-[290px]">
            {LOGOS.map((src, i) => (
              <img
                key={src}
                src={src}
                alt="NO COMPLY USA"
                className={`absolute inset-0 m-auto h-full w-auto transition-opacity ${
                  spinning ? "duration-75" : "duration-300"
                } ${i === logoIndex ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>

          <div className="w-5" aria-hidden="true" />
        </div>
      </nav>

      {/* Shop dropdown */}
      {megaOpen && (
        <div className="absolute inset-0 z-40 flex items-start justify-center pt-24">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMegaOpen(false)} />
          <div
            className="relative max-h-[70%] w-[90%] max-w-4xl overflow-y-auto border border-white/5 bg-[#141414]/95 p-7 backdrop-blur-md md:p-12"
            onMouseLeave={() => setMegaOpen(false)}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
              <div>
                <h3 className={`${label} mb-4 border-b border-white/10 pb-2 text-white`}>Categories</h3>
                <div className="space-y-1">
                  {CATEGORY_LINKS.map((c) => (
                    <MenuLink
                      key={c.label}
                      target={c}
                      className="block py-1.5 text-sm uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className={`${label} mb-4 border-b border-white/10 pb-2 text-white`}>Collections</h3>
                <div className="space-y-1">
                  {COLLECTION_LINKS.map((c) => (
                    <MenuLink
                      key={c.label}
                      target={c}
                      className="block py-1.5 text-sm uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className={`${label} mb-4 border-b border-white/10 pb-2 text-white`}>Explore</h3>
                <div className="space-y-1">
                  {SITE_LINKS.map((c) => (
                    <MenuLink
                      key={c.label}
                      target={c}
                      className="block py-1.5 text-sm uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
                    />
                  ))}
                </div>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/30">
                    Industrial Rebellion
                    <br />
                    American Workwear Reconstructed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute inset-0 z-50">
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
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center">
        <img
          src={heroLogo}
          alt="NO COMPLY USA"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
          className="mb-5 h-auto w-[86vw] max-w-[560px] md:mb-8 md:max-w-[820px]"
        />
        <p
          style={{ ...display, ...reveal(1.2) }}
          className="text-2xl uppercase tracking-[0.1em] text-[hsl(0,85%,45%)] md:text-4xl lg:text-5xl"
        >
          No Comply or Die
        </p>
        <p style={reveal(1.8)} className={`${label} mt-5 text-white/40`}>
          Drop 001 — Available Now
        </p>
        <div style={reveal(2.2)} className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to={SHOP_PATH}
            onClick={() => onNavigate?.()}
            className={`${label} inline-block border border-white/30 px-8 py-3 text-white transition-all duration-300 hover:bg-white hover:text-black`}
          >
            Enter Shop
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 2.6s" }}
        className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center gap-4 pb-5"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubscribed(true);
          }}
          className="hidden w-full max-w-xs items-center px-4 sm:flex"
        >
          <input
            name="email"
            type="email"
            required
            placeholder={subscribed ? "You're in. Stay tuned." : "Enter email for news & updates"}
            className={`${label} flex-1 border border-white/30 bg-transparent px-4 py-2.5 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none`}
          />
          <button
            type="submit"
            className={`${label} border border-l-0 border-white/30 px-5 py-2.5 text-white transition-all duration-300 hover:bg-white hover:text-black`}
          >
            Submit
          </button>
        </form>
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
      <DialogContent className="h-[100dvh] w-screen max-w-none gap-0 border-0 bg-black p-0 text-white sm:rounded-none">
        <DialogTitle className="sr-only">NO COMPLY USA</DialogTitle>
        <DialogDescription className="sr-only">
          An interactive recreation of the NO COMPLY USA homepage.
        </DialogDescription>
        {open && <NoComplyLivePreview onNavigate={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}
