import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { Menu, Search, X } from "lucide-react";
import { z } from "zod";

import { ProductCard } from "@/components/no-comply/product-card";
import { collections } from "@/data/collections";
import { getCategories, products, type Product } from "@/data/products";

const CATEGORIES = getCategories();
const MENU_CATEGORIES = ["Outerwear", "Tops", "Bottoms", "Accessories"];
const COLLECTION_ORDER = new Map(collections.map((collection, index) => [collection.id, index]));
const SORTS = ["order", "featured", "az", "za", "price-asc", "price-desc"] as const;
type Sort = (typeof SORTS)[number];

const searchSchema = z.object({
  cat: fallback(z.string(), "all").default("all"),
  sort: fallback(z.enum(SORTS), "order").default("order"),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/projects/no-comply/designs")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "ALL DESIGNS — NO COMPLY USA · Nicholas Curzon" },
      {
        name: "description",
        content: "Browse every NO COMPLY USA design across all collections.",
      },
      { property: "og:title", content: "ALL DESIGNS — NO COMPLY USA" },
      {
        property: "og:description",
        content: "The complete NO COMPLY USA product catalog across all collections.",
      },
    ],
  }),
  component: AllDesigns,
});

function sortProducts(items: Product[], sort: Sort): Product[] {
  const list = [...items];
  switch (sort) {
    case "az":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "za":
      return list.sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "featured":
      return list.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || compareCatalogOrder(a, b),
      );
    case "order":
    default:
      return list.sort(compareCatalogOrder);
  }
}

function compareCatalogOrder(a: Product, b: Product) {
  return (
    (COLLECTION_ORDER.get(a.collectionId) ?? Number.MAX_SAFE_INTEGER) -
      (COLLECTION_ORDER.get(b.collectionId) ?? Number.MAX_SAFE_INTEGER) ||
    a.displayOrder - b.displayOrder ||
    a.id.localeCompare(b.id)
  );
}

function AllDesigns() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusSearch, setFocusSearch] = useState(false);

  type SearchState = z.infer<typeof searchSchema>;
  const setCategory = (cat: string) =>
    navigate({ to: ".", search: (previous: SearchState) => ({ ...previous, cat }) });
  const setQuery = (q: string) =>
    navigate({
      to: ".",
      search: (previous: SearchState) => ({ ...previous, q }),
      replace: true,
    });
  const setSort = (sort: Sort) =>
    navigate({ to: ".", search: (previous: SearchState) => ({ ...previous, sort }) });
  const openMenu = (shouldFocusSearch = false) => {
    setFocusSearch(shouldFocusSearch);
    setMenuOpen(true);
  };
  const chooseCategory = (cat: string) => {
    setCategory(cat);
    setMenuOpen(false);
    requestAnimationFrame(() =>
      document.getElementById("all-designs-products")?.scrollIntoView({ behavior: "smooth" }),
    );
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    if (focusSearch) requestAnimationFrame(() => searchRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [focusSearch, menuOpen]);

  const displayed = useMemo(() => {
    const query = search.q.trim().toLowerCase();
    let list = products;
    if (search.cat !== "all") {
      list = list.filter((product) => product.category === search.cat);
    }
    if (query) {
      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.variants.some(
            (variant) =>
              variant.sku.toLowerCase().includes(query) ||
              variant.color.toLowerCase().includes(query),
          ),
      );
    }
    return sortProducts(list, search.sort);
  }, [search.cat, search.q, search.sort]);

  const listingCount = products.reduce(
    (count, product) => count + (product.listingVariantIds?.length ?? 1),
    0,
  );

  return (
    <div className="no-comply min-h-screen bg-white text-black">
      <nav className="sticky top-0 z-50 border-b-2 border-black bg-black text-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link
            to="/projects/no-comply"
            className="nc-display shrink-0 text-lg tracking-widest transition-opacity hover:opacity-60 sm:text-xl"
          >
            <span className="sm:hidden">← NO COMPLY</span>
            <span className="hidden sm:inline">← No Comply USA</span>
          </Link>
          <span className="nc-display ml-auto hidden text-base tracking-[0.3em] lg:block lg:text-lg">
            NO COMPLY USA / ALL DESIGNS
          </span>
        </div>
        <div className="flex h-16 items-center border-t border-white/15 px-4 sm:px-6">
          <Link
            to="/projects/no-comply/designs"
            search={{ cat: "all", sort: "order", q: "" }}
            className="nc-display text-lg tracking-[0.24em] sm:text-xl"
          >
            ALL DESIGNS
          </Link>
          <div className="ml-auto flex items-center gap-5">
            <button
              type="button"
              aria-label="Search all products"
              onClick={() => openMenu(true)}
              className="transition-opacity hover:opacity-60"
            >
              <Search size={24} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => openMenu(false)}
              className="transition-opacity hover:opacity-60"
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
            className="absolute inset-0 cursor-default bg-black/55"
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-7 text-black sm:p-10">
            <div className="flex items-start justify-between gap-8 border-b border-black/15 pb-7">
              <div>
                <p className="nc-display text-4xl leading-none tracking-[0.04em]">NO COMPLY</p>
                <p className="mt-3 text-xs uppercase tracking-[0.28em] text-black/50">
                  Product Index
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
              <span className="sr-only">Search all products</span>
              <input
                ref={searchRef}
                type="search"
                value={search.q}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products"
                className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-black/40"
              />
              <Search size={22} strokeWidth={1.5} />
            </label>

            <div className="mt-8 flex gap-8 border-t border-black/15 pt-7 text-sm uppercase tracking-[0.18em]">
              <Link to="/projects/no-comply/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link to="/projects/no-comply/media" onClick={() => setMenuOpen(false)}>
                Media
              </Link>
            </div>

            <section className="mt-8 border-t border-black/15 pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">
                Collections
              </p>
              <div className="mt-5 flex flex-col gap-4 text-xl uppercase tracking-[0.05em]">
                <Link
                  to="/projects/no-comply/command"
                  search={{ cat: "all", sort: "order", q: "" }}
                  onClick={() => setMenuOpen(false)}
                >
                  #1 No Comply Command
                </Link>
                <Link
                  to="/projects/no-comply/caught-on-film"
                  search={{ cat: "all", q: "" }}
                  onClick={() => setMenuOpen(false)}
                >
                  #2 Caught on Film
                </Link>
              </div>
            </section>

            <section className="mt-8 border-t border-black/15 pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">
                Designs
              </p>
              <div className="mt-5 flex flex-col items-start gap-4 text-2xl uppercase tracking-[0.05em]">
                <button type="button" onClick={() => chooseCategory("all")}>
                  All Designs
                </button>
                {MENU_CATEGORIES.map((category) => (
                  <button key={category} type="button" onClick={() => chooseCategory(category)}>
                    {category}
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      )}

      <main
        id="all-designs-products"
        className="nc-first-section mx-auto max-w-[1600px] px-5 pb-16 sm:px-8 sm:pb-24"
      >
        <header className="border-b border-black pb-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-black/50">
                Complete Catalog
              </p>
              <h1 className="nc-display text-[clamp(3.5rem,9vw,9rem)] leading-[0.78] tracking-[0.03em]">
                All Designs
              </h1>
            </div>
            <p className="nc-display shrink-0 text-sm uppercase tracking-[0.2em] text-black/55">
              {String(listingCount).padStart(2, "0")} Listings
            </p>
          </div>
        </header>

        <section className="py-10" aria-label="Catalog controls">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <nav
              aria-label="Filter all products by category"
              className="flex flex-wrap gap-x-7 gap-y-3 border-y border-black/20 py-4 text-sm uppercase tracking-[0.16em]"
            >
              {["all", ...CATEGORIES].map((category) => {
                const selected = search.cat === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setCategory(category)}
                    aria-pressed={selected}
                    className={
                      selected ? "font-bold underline underline-offset-4" : "text-black/55"
                    }
                  >
                    {category === "all" ? "All" : category}
                  </button>
                );
              })}
            </nav>

            <label className="flex items-center justify-between gap-4 border-b border-black/30 pb-3 text-xs uppercase tracking-[0.18em]">
              <span className="text-black/50">Sort</span>
              <select
                value={search.sort}
                onChange={(event) => setSort(event.target.value as Sort)}
                className="bg-white text-right uppercase outline-none"
              >
                <option value="order">Collection order</option>
                <option value="featured">Featured</option>
                <option value="az">Name A–Z</option>
                <option value="za">Name Z–A</option>
                <option value="price-asc">Price low–high</option>
                <option value="price-desc">Price high–low</option>
              </select>
            </label>
          </div>
        </section>

        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="flex min-h-[360px] items-center justify-center border-2 border-dashed border-black/30 py-20 text-center">
            <div>
              <p className="nc-display text-4xl uppercase tracking-[0.08em]">No matches</p>
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-black/50">
                Try a different search or category.
              </p>
              <button
                type="button"
                onClick={() => navigate({ to: ".", search: { cat: "all", sort: "order", q: "" } })}
                className="mt-6 border border-black px-5 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-black hover:text-white"
              >
                Reset filters
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-black/20 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-5 text-sm uppercase tracking-[0.18em]">
          <Link to="/projects/no-comply">← No Comply USA</Link>
          <Link to="/projects">All Projects →</Link>
        </div>
      </footer>
    </div>
  );
}
