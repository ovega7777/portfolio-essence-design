import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { Menu, Search, X } from "lucide-react";
import { z } from "zod";

import noComplyUsaLogoBlack from "../assets/no-comply-usa-logo-black-cropped.png.asset.json";
import commandEditorialLook01 from "../assets/no-comply/editorial/command-look-01.png";
import commandEditorialLook02 from "../assets/no-comply/editorial/command-look-02.png";
import { products, getCategories, type Product } from "@/data/products";
import { collections } from "@/data/collections";
import { ProductCard } from "@/components/no-comply/product-card";

const COLLECTION = collections[0];
const collectionProducts = products
  .filter((p) => p.collectionId === COLLECTION.id)
  .sort((a, b) => a.displayOrder - b.displayOrder);

const CATEGORIES = getCategories(COLLECTION.id);

const SORTS = ["order", "featured", "az", "za", "price-asc", "price-desc"] as const;
type Sort = (typeof SORTS)[number];
const searchSchema = z.object({
  cat: fallback(z.string(), "all").default("all"),
  sort: fallback(z.enum(SORTS), "order").default("order"),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/projects/no-comply")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "NO COMPLY USA — Collection #1 · Nicholas Curzon" },
      {
        name: "description",
        content:
          "NO COMPLY USA Collection #1 — a monochrome study in refusal, uniform, and craft.",
      },
      { property: "og:title", content: "NO COMPLY USA — Collection #1" },
      {
        property: "og:description",
        content: "Collection #1. A monochrome study in refusal, uniform, and craft.",
      },
    ],
  }),
  component: NoComply,
});

function sortProducts(items: Product[], sort: Sort): Product[] {
  const arr = [...items];
  switch (sort) {
    case "az":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "za":
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "featured":
      return arr.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) || a.displayOrder - b.displayOrder
      );
    case "order":
    default:
      return arr.sort((a, b) => a.displayOrder - b.displayOrder);
  }
}

function NoComply() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusMenuSearch, setFocusMenuSearch] = useState(false);

  const activeCategory = search.cat;
  const sort = search.sort;
  const query = search.q.trim().toLowerCase();

  type SearchState = z.infer<typeof searchSchema>;
  const setCategory = (cat: string) =>
    navigate({ to: ".", search: (p: SearchState) => ({ ...p, cat }) });
  const setQuery = (q: string) =>
    navigate({ to: ".", search: (p: SearchState) => ({ ...p, q }), replace: true });
  const showProducts = () =>
    requestAnimationFrame(() =>
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }),
    );
  const chooseCategory = (cat: string) => {
    setCategory(cat);
    setMenuOpen(false);
    showProducts();
  };
  const chooseCollection = () => {
    setCategory("all");
    setMenuOpen(false);
    showProducts();
  };
  const openProductSearch = () => {
    setFocusMenuSearch(true);
    setMenuOpen(true);
  };
  const openProductMenu = () => {
    setFocusMenuSearch(false);
    setMenuOpen(true);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const displayed = useMemo(() => {
    let list = collectionProducts;
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (query)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.variants.some((v) => v.sku.toLowerCase().includes(query))
      );
    return sortProducts(list, sort);
  }, [activeCategory, query, sort]);

  return (
    <div className="no-comply min-h-screen">
      <nav className="sticky top-0 z-50 border-b-2 border-black bg-black text-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link
            to="/"
            className="nc-display shrink-0 text-lg tracking-widest text-white transition-colors duration-200 hover:text-white/60 sm:text-xl"
          >
            <span className="sm:hidden">← NC</span>
            <span className="hidden sm:inline">← Nicholas Curzon</span>
          </Link>
          <span className="nc-display ml-auto hidden text-base tracking-[0.3em] text-white lg:block lg:text-lg">
            NO COMPLY USA / CASE STUDY
          </span>
        </div>
        <div className="h-0.5 w-full bg-white" />
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[120]">
          <button
            type="button"
            aria-label="Close product menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 cursor-default bg-black/45"
          />
          <aside
            aria-label="Product navigation"
            className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col overflow-y-auto border-l border-black/10 bg-white px-6 py-6 text-black shadow-2xl sm:px-9 sm:py-8"
          >
            <div className="flex items-start justify-between gap-6 border-b border-black/15 pb-6">
              <div>
                <p className="nc-display text-4xl leading-none tracking-[0.04em] sm:text-5xl">
                  NO COMPLY
                </p>
                <p className="nc-display mt-2 text-[10px] tracking-[0.28em] text-black/45">
                  Product Index
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-45"
              >
                Close
                <X aria-hidden className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <label className="mt-6 flex h-14 items-center gap-4 border border-black/25 bg-white px-4 transition-colors focus-within:border-black">
              <input
                type="search"
                value={search.q}
                onChange={(event) => setQuery(event.target.value)}
                autoFocus={focusMenuSearch}
                placeholder="Search products"
                aria-label="Search products in menu"
                className="min-w-0 flex-1 bg-transparent font-punk-body text-lg tracking-[0.06em] text-black placeholder:text-black/40 focus:outline-none"
              />
              <Search aria-hidden className="h-5 w-5 shrink-0" strokeWidth={1.5} />
            </label>

            <div className="mt-7 border-t border-black/10 pt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-black/55">
                Designs
              </p>
              <div className="mt-5 flex flex-col items-start gap-3.5">
                <button
                  type="button"
                  onClick={() => chooseCategory("all")}
                  className="font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45"
                >
                  All Designs
                </button>
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => chooseCategory(category)}
                    className="font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 border-t border-black/10 pt-6">
              <div className="flex flex-col items-start gap-3">
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    type="button"
                    onClick={chooseCollection}
                    className="whitespace-nowrap text-left font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45"
                  >
                    #{collection.number} No Comply {collection.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      <LogoBannerHUD
        src={noComplyUsaLogoBlack.url}
        menuOpen={menuOpen}
        onSearch={openProductSearch}
        onMenu={openProductMenu}
      />

      {/* prettier-ignore */}
      <div className="flex flex-col">
      <section className="order-2 border-b-2 border-black bg-white px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-end justify-between gap-6 border-b-2 border-black pb-6">
            <h2 className="nc-display text-5xl leading-none tracking-[0.02em] text-black md:text-7xl">
              Moodboard
            </h2>
            <span className="nc-display text-xs tracking-[0.3em] text-black sm:text-sm">
              06 Fragments / Reference
            </span>
          </div>

          <div className="grid grid-cols-2 gap-px bg-black md:grid-cols-3">
            {["Cut", "Paste", "Xerox", "Tape", "Riot", "Repeat"].map(
              (label, i) => (
                <div
                  key={label}
                  className="relative flex aspect-square flex-col justify-between bg-black p-6 text-white"
                >
                  <span className="nc-display text-xs tracking-[0.3em] text-white/60">
                    Fragment {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="nc-display text-3xl tracking-[0.05em] text-white md:text-5xl">
                    {label}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="order-3 border-b-2 border-black bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="nc-display mb-8 text-xs tracking-[0.4em] text-white">
            Manifesto
          </p>
          <p className="nc-display text-4xl leading-[1.05] tracking-[0.02em] md:text-6xl">
            Compliance is optional.
            <br />
            Craft is not.
          </p>
          <div className="mt-10 h-px w-24 bg-white" />
          <p className="mt-10 font-punk-body text-base uppercase leading-relaxed tracking-[0.15em] text-white/80 md:text-lg">
            Every garment starts as a pattern. Every pattern starts as a
            refusal — to smooth the edges, to trend-chase, to make it easy.
            No Comply is what happens when a designer&apos;s hand meets an
            operator&apos;s stubbornness.
          </p>
        </div>
      </section>

      <section
        id="products"
        className="order-1 border-b-2 border-black bg-white px-6 py-24 md:px-12 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end md:mb-16">
            <div className="min-w-0">
              <h2 className="nc-display text-5xl leading-[0.9] text-black md:text-8xl">
                No Comply {COLLECTION.title}
              </h2>
            </div>
            <span className="nc-display shrink-0 text-xs tracking-[0.3em] text-black sm:text-sm">
              Collection #{COLLECTION.number} / 50 Pieces
            </span>
          </div>

          <div
            aria-label="No Comply Command editorial"
            className="mb-20 grid items-start gap-1 bg-black md:grid-cols-[5fr_7fr]"
          >
            <img
              src={commandEditorialLook01}
              alt="No Comply Command editorial look with Captain's Jacket and Cargo Messenger Bag"
              className="aspect-[1086/1448] h-auto w-full bg-white object-cover"
            />
            <img
              src={commandEditorialLook02}
              alt="No Comply Command editorial look with black and navy Sergeant Shirts"
              className="aspect-square h-auto w-full bg-white object-cover"
            />
          </div>

          <nav
            aria-label="Filter products by category"
            className="mb-12 flex flex-wrap items-center border-y border-black md:mb-16"
          >
            <span className="nc-display mr-2 py-3 pr-3 text-[10px] tracking-[0.25em] text-black/60 sm:mr-4 sm:pr-4 sm:text-xs">
              Filter by
            </span>
            {["all", ...CATEGORIES].map((category) => {
              const selected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setCategory(category)}
                  aria-pressed={selected}
                  className={`nc-display border-l border-black px-3 py-3 text-[10px] tracking-[0.2em] transition-colors sm:px-5 sm:text-xs ${
                    selected
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {category === "all" ? "All" : category}
                </button>
              );
            })}
          </nav>

          {displayed.length === 0 ? (
            <div className="border-2 border-dashed border-black/40 p-16 text-center">
              <p className="nc-display text-2xl text-black">
                {collectionProducts.length === 0
                  ? "Collection loading."
                  : "No matches."}
              </p>
              <p className="nc-display mt-3 text-xs tracking-[0.3em] text-black/70">
                {collectionProducts.length === 0
                  ? "Products land here as they're added."
                  : "Try a different search or category."}
              </p>
              {(search.q || activeCategory !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                  }}
                  className="nc-display mt-6 border-2 border-black bg-white px-3 py-1.5 text-xs tracking-[0.25em] text-black hover:bg-black hover:text-white"
                >
                  Reset filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
      </div>

      <section className="border-b-2 border-black px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[
            { k: "Role", v: "Creative Direction, Systems" },
            { k: "Year", v: "2025" },
            { k: "Format", v: "Collection / Lookbook" },
          ].map((f) => (
            <div key={f.k} className="border-2 border-black bg-white p-8">
              <p className="nc-display text-sm tracking-[0.3em] text-black">
                {f.k}
              </p>
              <p className="nc-display mt-2 text-2xl text-black">{f.v}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
          <div>
            <p className="nc-display text-sm tracking-[0.3em] text-black">
              Next Up
            </p>
            <Link
              to="/projects/lucky-day-co"
              className="nc-display text-4xl text-black hover:text-black/60"
            >
              Lucky Day Co →
            </Link>
          </div>
          <Link
            to="/projects"
            className="nc-display border-b-2 border-black pb-1 text-sm tracking-[0.3em] text-black hover:text-black/60 hover:border-black/60"
          >
            ← All Projects
          </Link>
        </div>
      </footer>
    </div>
  );
}

type BannerSettings = {
  height: number;
  scale: number;
  offsetX: number;
  offsetY: number;
};
const DEFAULT_BANNER: BannerSettings = {
  height: 112,
  scale: 100,
  offsetX: 0,
  offsetY: 0,
};
const BANNER_STORAGE_KEY = "no-comply-banner-settings-v1";
const BANNER_CONFIRMED_KEY = "no-comply-banner-confirmed-v1";

function LogoBannerHUD({
  src,
  menuOpen,
  onSearch,
  onMenu,
}: {
  src: string;
  menuOpen: boolean;
  onSearch: () => void;
  onMenu: () => void;
}) {
  const [settings, setSettings] = useState<BannerSettings>(DEFAULT_BANNER);
  const [hudVisible, setHudVisible] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(BANNER_STORAGE_KEY);
      if (saved) setSettings({ ...DEFAULT_BANNER, ...JSON.parse(saved) });
      if (localStorage.getItem(BANNER_CONFIRMED_KEY) === "1") setHudVisible(false);
    } catch {}
  }, []);

  const update = (patch: Partial<BannerSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const confirm = () => {
    try {
      localStorage.setItem(BANNER_CONFIRMED_KEY, "1");
    } catch {}
    setHudVisible(false);
  };

  const reopen = () => {
    try {
      localStorage.removeItem(BANNER_CONFIRMED_KEY);
    } catch {}
    setHudVisible(true);
  };

  const reset = () => {
    setSettings(DEFAULT_BANNER);
    try {
      localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(DEFAULT_BANNER));
    } catch {}
  };

  return (
    <>
      <header
        className="relative overflow-hidden border-b-2 border-black bg-black"
        style={{ height: `${settings.height}px` }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={src}
            alt="NO COMPLY USA"
            className="h-full w-full object-contain object-center"
            style={{
              transform: `translate(${settings.offsetX}px, ${settings.offsetY}px) scale(${settings.scale / 100})`,
              transformOrigin: "center center",
            }}
          />
        </div>
        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1 sm:right-6 sm:gap-2">
          <button
            type="button"
            onClick={onSearch}
            aria-label="Search products"
            className="flex h-11 w-11 items-center justify-center text-white transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Search aria-hidden className="h-6 w-6" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={onMenu}
            aria-label="Open product menu"
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center text-white transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Menu aria-hidden className="h-6 w-6" strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {hudVisible ? (
        <div className="fixed bottom-4 right-4 z-[100] w-72 rounded-lg border border-white/20 bg-black/90 p-4 text-white shadow-2xl backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest">
              Logo HUD
            </span>
            <button
              type="button"
              onClick={reset}
              className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white"
            >
              Reset
            </button>
          </div>
          <HudSlider label="Height" value={settings.height} min={40} max={400} unit="px" onChange={(v) => update({ height: v })} />
          <HudSlider label="Scale" value={settings.scale} min={20} max={300} unit="%" onChange={(v) => update({ scale: v })} />
          <HudSlider label="Offset X" value={settings.offsetX} min={-400} max={400} unit="px" onChange={(v) => update({ offsetX: v })} />
          <HudSlider label="Offset Y" value={settings.offsetY} min={-200} max={200} unit="px" onChange={(v) => update({ offsetY: v })} />
          <button
            type="button"
            onClick={confirm}
            className="mt-3 w-full rounded bg-white py-2 text-xs font-bold uppercase tracking-widest text-black hover:bg-white/90"
          >
            Confirm & Hide HUD
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={reopen}
          className="fixed bottom-4 right-4 z-[100] rounded-full border border-white/20 bg-black/80 px-3 py-1 text-[10px] uppercase tracking-widest text-white/70 hover:text-white"
        >
          Edit Logo
        </button>
      )}
    </>
  );
}

function HudSlider({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-2">
      <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/70">
        <span>{label}</span>
        <span className="font-mono text-white">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-white"
      />
    </div>
  );
}
