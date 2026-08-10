import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { Search, X } from "lucide-react";
import { z } from "zod";

import noComplyUsaLogoBlack from "../assets/no-comply-usa-logo-black-cropped.png.asset.json";
import commandEditorialLook01 from "../assets/no-comply/editorial/command-look-01.png";
import commandEditorialLook02 from "../assets/no-comply/editorial/command-look-02.png";
import upsideDownAmericanFlag from "../assets/no-comply/editorial/upside-down-american-flag.jpg";
import commandAssortmentLook01 from "../assets/no-comply/editorial/command-assortment-gallery/look-01.png";
import commandAssortmentLook02 from "../assets/no-comply/editorial/command-assortment-gallery/look-02.png";
import commandAssortmentLook03 from "../assets/no-comply/editorial/command-assortment-gallery/look-03.png";
import commandAssortmentLook04 from "../assets/no-comply/editorial/command-assortment-gallery/look-04.png";
import { products, getCategories, type Product } from "@/data/products";
import { collections } from "@/data/collections";
import { ProductCard } from "@/components/no-comply/product-card";
import { LogoBannerHUD } from "@/components/no-comply/logo-banner-hud";

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

export const Route = createFileRoute("/projects/no-comply/command")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "NO COMPLY COMMAND — Collection #1 · Nicholas Curzon" },
      {
        name: "description",
        content:
          "NO COMPLY COMMAND, Collection #1 — a monochrome study in refusal, uniform, and craft.",
      },
      { property: "og:title", content: "NO COMPLY COMMAND — Collection #1" },
      {
        property: "og:description",
        content: "Collection #1. A monochrome study in refusal, uniform, and craft.",
      },
    ],
  }),
  component: CommandCollection,
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
        (a, b) => Number(b.featured) - Number(a.featured) || a.displayOrder - b.displayOrder,
      );
    case "order":
    default:
      return arr.sort((a, b) => a.displayOrder - b.displayOrder);
  }
}

function CommandCollection() {
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
  const chooseCollection = (collectionId: string) => {
    setMenuOpen(false);
    if (collectionId === COLLECTION.id) {
      setCategory("all");
      showProducts();
      return;
    }
    navigate({ to: "/projects/no-comply/caught-on-film" });
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
          p.variants.some((v) => v.sku.toLowerCase().includes(query)),
      );
    return sortProducts(list, sort);
  }, [activeCategory, query, sort]);

  return (
    <div className="no-comply min-h-screen">
      <nav className="sticky top-0 z-50 border-b-2 border-black bg-black text-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link
            to="/projects/no-comply"
            className="nc-display shrink-0 text-lg tracking-widest text-white transition-colors duration-200 hover:text-white/60 sm:text-xl"
          >
            <span className="sm:hidden">← NO COMPLY</span>
            <span className="hidden sm:inline">← No Comply USA</span>
          </Link>
          <span className="nc-display ml-auto hidden text-base tracking-[0.3em] text-white lg:block lg:text-lg">
            NO COMPLY USA / COLLECTION #1
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
              <p className="nc-display text-4xl leading-none tracking-[0.04em] sm:text-5xl">
                NO COMPLY
              </p>
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
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-black/55">
                Collections
              </p>
              <div className="mt-5 flex flex-col items-start gap-3">
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    type="button"
                    onClick={() => chooseCollection(collection.id)}
                    className="whitespace-nowrap text-left font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45"
                  >
                    #{collection.number}{" "}
                    {collection.title === "COMMAND" ? "No Comply Command" : collection.title}
                  </button>
                ))}
              </div>
            </div>

            <nav
              aria-label="No Comply editorial pages"
              className="mt-7 flex flex-col items-start border-t border-black/10"
            >
              <Link
                to="/projects/no-comply/about"
                onClick={() => setMenuOpen(false)}
                className="w-full border-b border-black/10 py-6 font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45"
              >
                About
              </Link>
              <Link
                to="/projects/no-comply/media"
                onClick={() => setMenuOpen(false)}
                className="w-full border-b border-black/10 py-6 font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45"
              >
                Media
              </Link>
            </nav>
          </aside>
        </div>
      )}

      <LogoBannerHUD
        src={noComplyUsaLogoBlack.url}
        menuOpen={menuOpen}
        onSearch={openProductSearch}
        onMenu={openProductMenu}
      />

      <section
        id="products"
        className="border-b-2 border-black bg-white px-6 py-24 md:px-12 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end md:mb-16">
            <div className="flex min-w-0 flex-wrap items-center gap-4 md:gap-6">
              <h1 className="nc-display text-5xl leading-[0.9] text-black md:text-8xl">
                No Comply {COLLECTION.title}
              </h1>
              <img
                src={upsideDownAmericanFlag}
                alt="Upside-down black-and-white American flag"
                className="h-auto w-14 shrink-0 sm:w-16 md:w-20"
              />
            </div>
            <span className="nc-display shrink-0 text-xs tracking-[0.3em] text-black sm:text-sm">
              Collection #{COLLECTION.number} / 50 Pieces
            </span>
          </div>

          <div
            aria-label="No Comply Command editorial"
            className="mb-20 grid grid-cols-2 gap-1 bg-black lg:grid-cols-4"
          >
            {[
              {
                src: commandAssortmentLook01,
                alt: "No Comply Command look featuring the Eisenhower Distress Jacket and Cargo Messenger Bag",
              },
              {
                src: commandAssortmentLook02,
                alt: "No Comply Command look featuring the NC Tiger Tee and Cargo Messenger Bag",
              },
              {
                src: commandAssortmentLook03,
                alt: "No Comply Command look featuring the American Distress Hoodie",
              },
              {
                src: commandAssortmentLook04,
                alt: "No Comply Command look featuring the Sergeant Shirt",
              },
            ].map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className="aspect-[3/4] h-auto w-full bg-white object-cover"
              />
            ))}
          </div>


          <div className="mb-12 md:mb-16">
            <h3 className="font-punk-body text-base font-bold uppercase tracking-[0.06em] text-black">
              No Comply Command
            </h3>
            <nav
              aria-label="Filter products by category"
              className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-black/20 py-4 sm:gap-x-9"
            >
              {["all", ...CATEGORIES].map((category) => {
                const selected = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setCategory(category)}
                    aria-pressed={selected}
                    className={`font-punk-body text-sm uppercase tracking-[0.06em] text-black transition-opacity hover:opacity-45 sm:text-base ${
                      selected ? "font-bold underline decoration-1 underline-offset-4" : "font-normal"
                    }`}
                  >
                    {category === "all" ? "All" : category}
                  </button>
                );
              })}
            </nav>
          </div>

          {displayed.length === 0 ? (
            <div className="border-2 border-dashed border-black/40 p-16 text-center">
              <p className="nc-display text-2xl text-black">
                {collectionProducts.length === 0 ? "Collection loading." : "No matches."}
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

          <div
            aria-label="No Comply Command assortment editorial gallery"
            className="mt-20 grid grid-cols-1 gap-1 bg-black sm:grid-cols-2 md:mt-28 lg:grid-cols-4"
          >
            {[
              {
                src: commandAssortmentLook01,
                alt: "No Comply Command editorial look featuring the Eisenhower Distress Jacket and Cargo Messenger Bag",
              },
              {
                src: commandAssortmentLook02,
                alt: "No Comply Command editorial look featuring the NC Tiger Tee and Cargo Messenger Bag",
              },
              {
                src: commandAssortmentLook03,
                alt: "No Comply Command editorial look featuring the American Distress Hoodie",
              },
              {
                src: commandAssortmentLook04,
                alt: "No Comply Command editorial look featuring the Sergeant Shirt",
              },
            ].map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className="aspect-[3/4] h-auto w-full bg-white object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

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
            {["Cut", "Paste", "Xerox", "Tape", "Riot", "Repeat"].map((label, i) => (
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
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="nc-display mb-8 text-xs tracking-[0.4em] text-white">Manifesto</p>
          <p className="nc-display text-4xl leading-[1.05] tracking-[0.02em] md:text-6xl">
            Compliance is optional.
            <br />
            Craft is not.
          </p>
          <div className="mt-10 h-px w-24 bg-white" />
          <p className="mt-10 font-punk-body text-base uppercase leading-relaxed tracking-[0.15em] text-white/80 md:text-lg">
            Every garment starts as a pattern. Every pattern starts as a refusal — to smooth the
            edges, to trend-chase, to make it easy. No Comply is what happens when a designer&apos;s
            hand meets an operator&apos;s stubbornness.
          </p>
        </div>
      </section>

      <footer className="px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
          <div>
            <p className="nc-display text-sm tracking-[0.3em] text-black">Next Up</p>
            <Link
              to="/projects/no-comply/caught-on-film"
              className="nc-display text-4xl text-black hover:text-black/60"
            >
              Caught on Film →
            </Link>
          </div>
          <Link
            to="/projects/no-comply"
            className="nc-display border-b-2 border-black pb-1 text-sm tracking-[0.3em] text-black hover:border-black/60 hover:text-black/60"
          >
            ← No Comply USA
          </Link>
        </div>
      </footer>
    </div>
  );
}
