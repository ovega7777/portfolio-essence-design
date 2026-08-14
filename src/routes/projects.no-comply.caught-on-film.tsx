import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { Menu, Search, X } from "lucide-react";
import { z } from "zod";

import caughtOnFilmHeader from "../assets/no-comply/caught-on-film/caught-on-film-header.png";
import { ProductCard } from "@/components/no-comply/product-card";
import { collections } from "@/data/collections";
import { getCategories, products } from "@/data/products";

const COLLECTION = collections[1];
const collectionProducts = products
  .filter((product) => product.collectionId === COLLECTION.id)
  .sort((a, b) => a.displayOrder - b.displayOrder);
const CATEGORY_ORDER = ["Tops", "Outerwear", "Bottoms", "Accessories"];
const availableCategories = new Set(getCategories(COLLECTION.id));
const CATEGORIES = CATEGORY_ORDER.filter((category) => availableCategories.has(category));

const searchSchema = z.object({
  cat: fallback(z.string(), "all").default("all"),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/projects/no-comply/caught-on-film")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "CAUGHT ON FILM — Collection #2 · Nicholas Curzon" },
      {
        name: "description",
        content: "CAUGHT ON FILM, the second NO COMPLY USA collection by Nicholas Curzon.",
      },
      { property: "og:title", content: "CAUGHT ON FILM — Collection #2" },
      {
        property: "og:description",
        content: "A film-burn study in memory, motion, and after-hours glamour.",
      },
    ],
  }),
  component: CaughtOnFilmCollection,
});

function CaughtOnFilmCollection() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const menuSearchRef = useRef<HTMLInputElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusMenuSearch, setFocusMenuSearch] = useState(false);

  const activeCategory = search.cat;
  const query = search.q.trim().toLowerCase();
  type SearchState = z.infer<typeof searchSchema>;

  const setCategory = (cat: string) =>
    navigate({ to: ".", search: (previous: SearchState) => ({ ...previous, cat }) });
  const setQuery = (q: string) =>
    navigate({
      to: ".",
      search: (previous: SearchState) => ({ ...previous, q }),
      replace: true,
    });
  const showProducts = () =>
    requestAnimationFrame(() =>
      document.getElementById("caught-on-film-products")?.scrollIntoView({ behavior: "smooth" }),
    );
  const chooseCategory = (cat: string) => {
    setCategory(cat);
    setMenuOpen(false);
    showProducts();
  };
  const openMenu = (focusSearch = false) => {
    setFocusMenuSearch(focusSearch);
    setMenuOpen(true);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    if (focusMenuSearch) requestAnimationFrame(() => menuSearchRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [focusMenuSearch, menuOpen]);

  const displayed = useMemo(() => {
    let list = collectionProducts;
    if (activeCategory !== "all") {
      list = list.filter((product) => product.category === activeCategory);
    }
    if (query) {
      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.variants.some((variant) => variant.sku.toLowerCase().includes(query)),
      );
    }
    return list;
  }, [activeCategory, query]);

  return (
    <div className="no-comply min-h-screen bg-[#070707] text-white">
      <nav className="sticky top-0 z-50 border-b border-white/25 bg-black text-white">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-4 px-5 sm:px-8">
          <Link
            to="/"
            className="nc-display shrink-0 text-base tracking-widest transition-opacity hover:opacity-60 sm:text-lg"
          >
            ← Nicholas Curzon
          </Link>
          <span className="nc-display ml-auto hidden text-sm tracking-[0.22em] md:block">
            NO COMPLY USA / COLLECTION #2
          </span>
        </div>
        <div className="flex h-16 items-center border-t border-white/15 px-5 sm:px-8">
          <Link
            to="/projects/no-comply/caught-on-film"
            className="nc-display text-lg tracking-[0.24em] text-[#f36b21] sm:text-xl"
          >
            CAUGHT ON FILM
          </Link>
          <div className="ml-auto flex items-center gap-5">
            <button
              type="button"
              aria-label="Search Caught on Film products"
              onClick={() => openMenu(true)}
              className="transition-colors hover:text-[#f36b21]"
            >
              <Search size={24} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => openMenu(false)}
              className="transition-colors hover:text-[#f36b21]"
            >
              <Menu size={24} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[120]">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 cursor-default bg-black/65"
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-7 text-black sm:p-10">
            <div className="flex items-start justify-between gap-8 border-b border-black/15 pb-7">
              <div>
                <p className="nc-display text-4xl leading-none tracking-[0.04em]">NO COMPLY</p>
                <p className="mt-3 text-xs uppercase tracking-[0.28em] text-black/50">
                  Collection Index
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation"
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]"
              >
                Close <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <label className="mt-7 flex items-center border border-black/30 px-4 py-3">
              <span className="sr-only">Search products</span>
              <input
                ref={menuSearchRef}
                value={search.q}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products"
                className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-black/40"
              />
              <Search size={22} strokeWidth={1.5} />
            </label>

            <section className="mt-8 border-t border-black/15 pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">
                Designs
              </p>
              <div className="mt-5 flex flex-col items-start gap-4 text-2xl uppercase tracking-[0.05em]">
                <button type="button" onClick={() => chooseCategory("all")}>
                  All designs
                </button>
                {CATEGORIES.map((category) => (
                  <button key={category} type="button" onClick={() => chooseCategory(category)}>
                    {category}
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-8 border-t border-black/15 pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">
                Collections
              </p>
              <div className="mt-5 flex flex-col gap-4 text-xl uppercase tracking-[0.05em]">
                <Link
                  to="/projects/no-comply"
                  search={{ cat: "all", sort: "order", q: "" }}
                  onClick={() => setMenuOpen(false)}
                >
                  #1 No Comply Command
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-left text-[#d9571b]"
                >
                  #2 Caught on Film
                </button>
              </div>
            </section>

            <div className="mt-8 flex gap-8 border-t border-black/15 pt-7 text-sm uppercase tracking-[0.18em]">
              <Link to="/projects/no-comply/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link to="/projects/no-comply/media" onClick={() => setMenuOpen(false)}>
                Media
              </Link>
            </div>
          </aside>
        </div>
      )}

      <main>
        <header className="mx-auto max-w-[1600px] px-5 pb-8 pt-16 sm:px-8 sm:pt-24">
          <div className="flex flex-col gap-6 border-b border-[#f36b21]/60 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-[#f36b21]">
                Collection #2
              </p>
              <h1 className="nc-display text-[clamp(3.5rem,9vw,9rem)] leading-[0.78] tracking-[0.03em]">
                Caught on Film
              </h1>
            </div>
            <p className="nc-display shrink-0 text-sm uppercase tracking-[0.2em] text-[#f36b21]">
              Collection #2 / {String(collectionProducts.length).padStart(2, "0")} Pieces
            </p>
          </div>
        </header>

        <section
          className="mx-auto max-w-[1672px] px-0 sm:px-8"
          aria-label="Caught on Film campaign"
        >
          <img
            src={caughtOnFilmHeader}
            alt="Caught on Film campaign contact sheet"
            className="block h-auto w-full"
          />
        </section>

        <section id="caught-on-film-products" className="bg-white text-black">
          <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24">
            <div className="border-b border-black pb-5">
              <p className="nc-display text-2xl uppercase tracking-[0.08em] sm:text-3xl">
                Caught on Film
              </p>
              <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm uppercase tracking-[0.16em]">
                <button
                  type="button"
                  onClick={() => setCategory("all")}
                  className={activeCategory === "all" ? "font-bold" : "text-black/55"}
                >
                  All
                </button>
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setCategory(category)}
                    className={activeCategory === category ? "font-bold" : "text-black/55"}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {displayed.length > 0 ? (
              <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
                {displayed.flatMap((product) =>
                  (product.listingVariantIds ?? [product.variants[0].id]).map((variantId) => (
                    <ProductCard
                      key={`${product.id}-${variantId}`}
                      product={product}
                      initialVariantId={variantId}
                    />
                  )),
                )}
              </div>
            ) : (
              <div className="flex min-h-[360px] items-center justify-center py-20 text-center">
                <div>
                  <p className="nc-display text-4xl uppercase tracking-[0.08em] sm:text-5xl">
                    Assortment arriving soon
                  </p>
                  <p className="mt-4 text-sm uppercase tracking-[0.2em] text-black/50">
                    Products will land here as they are added.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/20 bg-black px-5 py-8 text-white sm:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-5 text-sm uppercase tracking-[0.18em]">
          <Link
            to="/projects/no-comply"
            search={{ cat: "all", sort: "order", q: "" }}
            className="hover:text-[#f36b21]"
          >
            ← Collection #1
          </Link>
          <Link to="/" className="hover:text-[#f36b21]">
            All Projects →
          </Link>
        </div>
      </footer>
    </div>
  );
}
