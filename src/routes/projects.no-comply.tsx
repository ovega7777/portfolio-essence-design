import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { Menu, Search, X } from "lucide-react";
import { z } from "zod";

import noComplyUsaLogoBlack from "../assets/no-comply-usa-logo-black-cropped.png.asset.json";
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
const SORT_LABELS: Record<Sort, string> = {
  order: "Curated",
  featured: "Featured",
  az: "Name A–Z",
  za: "Name Z–A",
  "price-asc": "Price ↑",
  "price-desc": "Price ↓",
};

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

  const activeCategory = search.cat;
  const sort = search.sort;
  const query = search.q.trim().toLowerCase();

  type SearchState = z.infer<typeof searchSchema>;
  const setCategory = (cat: string) =>
    navigate({ to: ".", search: (p: SearchState) => ({ ...p, cat }) });
  const setSort = (s: Sort) =>
    navigate({ to: ".", search: (p: SearchState) => ({ ...p, sort: s }) });
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
          <label className="ml-auto flex h-9 min-w-0 max-w-52 flex-1 items-center gap-2 border-b border-white/70 px-1 lg:ml-6 lg:w-52 lg:flex-none">
            <Search aria-hidden className="h-4 w-4 shrink-0" strokeWidth={1.8} />
            <input
              type="search"
              value={search.q}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="PRODUCT SEARCH"
              aria-label="Search products"
              className="nc-display min-w-0 flex-1 bg-transparent text-xs tracking-[0.2em] text-white placeholder:text-white/60 focus:outline-none"
            />
          </label>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open product menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/60 text-white transition-colors hover:bg-white hover:text-black"
          >
            <Menu aria-hidden className="h-5 w-5" strokeWidth={1.8} />
          </button>
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
            className="absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col overflow-y-auto border-l-2 border-black bg-[#d2d2d2] px-6 py-6 text-black shadow-2xl sm:px-8"
          >
            <div className="flex items-start justify-between gap-6 border-b border-black/20 pb-5">
              <div>
                <p className="nc-display text-5xl leading-none tracking-[0.04em] sm:text-6xl">
                  NO COMPLY
                </p>
                <p className="nc-display mt-1 text-xs tracking-[0.3em] text-black/60">
                  Product Index
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] hover:opacity-50"
              >
                Close
                <X aria-hidden className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>

            <label className="mt-5 flex h-16 items-center gap-4 border border-black/60 bg-transparent px-5">
              <input
                type="search"
                value={search.q}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products"
                aria-label="Search products in menu"
                className="min-w-0 flex-1 bg-transparent font-punk-body text-xl tracking-[0.08em] text-black placeholder:text-black/60 focus:outline-none"
              />
              <Search aria-hidden className="h-7 w-7 shrink-0" strokeWidth={1.5} />
            </label>

            <div className="mt-5 border-t border-black/15 pt-5">
              <p className="text-sm font-bold uppercase tracking-[0.12em]">Product Types</p>
              <div className="mt-4 flex flex-col items-start gap-3">
                <button
                  type="button"
                  onClick={() => chooseCategory("all")}
                  className="font-punk-body text-2xl uppercase tracking-[0.04em] hover:opacity-50"
                >
                  Shop All
                </button>
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => chooseCategory(category)}
                    className="font-punk-body text-2xl uppercase tracking-[0.04em] hover:opacity-50"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 border-t border-black/15 pt-5">
              <p className="text-sm font-bold uppercase tracking-[0.12em]">Collections</p>
              <div className="mt-4 flex flex-col items-start gap-3">
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    type="button"
                    onClick={chooseCollection}
                    className="text-left font-punk-body text-2xl uppercase tracking-[0.04em] hover:opacity-50"
                  >
                    Collection #{collection.number} — {collection.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      <LogoBannerHUD src={noComplyUsaLogoBlack.url} />

      <section className="border-b-2 border-black bg-white px-6 py-24 md:px-12 md:py-32">
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

      <section className="border-b-2 border-black bg-black px-6 py-24 text-white md:py-32">
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
        className="border-b-2 border-black bg-white px-6 py-24 md:px-12 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="min-w-0">
              <p className="nc-display mb-6 inline-block bg-black px-3 py-1 text-xs tracking-[0.3em] text-white">
                Collection #{COLLECTION.number}
              </p>
              <h2 className="nc-display text-5xl leading-[0.9] text-black md:text-8xl">
                No Comply{" "}
                <span className="relative inline-block">
                  {COLLECTION.title}
                  <span
                    aria-hidden
                    className="absolute -bottom-2 left-0 right-0 h-[3px] bg-black"
                  />
                </span>
              </h2>
            </div>
            <span className="nc-display shrink-0 text-xs tracking-[0.3em] text-black sm:text-sm">
              // {collectionProducts.length} Pieces / Collection{" "}
              {String(COLLECTION.number).padStart(2, "0")}
            </span>
          </div>

          <div className="mb-10 border-y-2 border-black">
            <div className="-mx-6 overflow-x-auto px-6 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mx-12 md:px-12">
              <div className="flex min-w-max items-center gap-3 sm:flex-wrap sm:gap-3">
                <span className="nc-display shrink-0 text-[10px] tracking-[0.3em] text-black sm:text-xs">
                  Shop by
                </span>
                {(["all", ...CATEGORIES] as const).map((cat) => {
                  const count =
                    cat === "all"
                      ? collectionProducts.length
                      : collectionProducts.filter((p) => p.category === cat).length;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`nc-display shrink-0 whitespace-nowrap border-2 border-black px-[22px] py-[14px] text-[11px] tracking-[0.25em] transition-colors duration-200 ${
                        isActive
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-black hover:text-white"
                      }`}
                      aria-pressed={isActive}
                    >
                      {cat === "all" ? "All" : cat}{" "}
                      <span className="opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3 border-t-2 border-black px-0 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6">
              <label className="flex min-w-0 items-center gap-3 border-2 border-black bg-white px-4 py-3">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4 shrink-0 text-black"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="square" />
                </svg>
                <input
                  type="search"
                  value={search.q}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="SEARCH THIS COLLECTION..."
                  aria-label="Search collection"
                  className="nc-display w-full min-w-0 bg-transparent text-sm tracking-[0.2em] text-black placeholder:text-black/60 focus:outline-none"
                />
                {search.q && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="nc-display shrink-0 border-2 border-black bg-white px-2 py-1 text-[10px] tracking-[0.25em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </label>

              <div className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:overflow-visible sm:px-0">
                <div className="flex min-w-max items-center gap-3 sm:min-w-0 sm:flex-wrap">
                  <span className="nc-display shrink-0 text-[10px] tracking-[0.3em] text-black sm:text-xs">
                    Sort
                  </span>
                  {SORTS.map((s) => {
                    const isActive = sort === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSort(s)}
                        className={`nc-display shrink-0 whitespace-nowrap border-2 border-black px-[22px] py-[14px] text-[11px] tracking-[0.25em] transition-colors duration-200 ${
                          isActive
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-black hover:text-white"
                        }`}
                        aria-pressed={isActive}
                      >
                        {SORT_LABELS[s]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

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

function LogoBannerHUD({ src }: { src: string }) {
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
