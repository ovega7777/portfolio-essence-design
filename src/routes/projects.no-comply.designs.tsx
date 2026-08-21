import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

import { ProductCard } from "@/components/no-comply/product-card";
import { NoComplyBackButton } from "@/components/no-comply/back-button";
import { LogoBanner } from "@/components/no-comply/logo-banner";
import { NoComplyUtilityBar } from "@/components/no-comply/page-indicator";
import { StandardNoComplyMenu } from "@/components/no-comply/standard-menu";
import noComplyUsaLogoBlack from "@/assets/no-comply-usa-logo-black-cropped.png.asset.json";
import { collections } from "@/data/collections";
import { getCategories, products, type Product } from "@/data/products";

const CATEGORIES = getCategories();
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
  const pageIndicator = search.q.trim()
    ? "SEARCH RESULTS"
    : search.cat === "all"
      ? "ALL DESIGNS"
      : search.cat.toUpperCase();

  return (
    <div className="no-comply min-h-screen bg-white text-black">
      <div className="sticky top-0 z-50">
        <NoComplyUtilityBar
          pageName={pageIndicator}
          backControl={
            <NoComplyBackButton className="nc-display block whitespace-nowrap text-lg tracking-widest transition-opacity hover:opacity-60 sm:text-xl" />
          }
        />
        <LogoBanner
          src={noComplyUsaLogoBlack.url}
          menuOpen={menuOpen}
          onSearch={() => openMenu(true)}
          onMenu={() => openMenu(false)}
          leading={
            <Link
              to="/projects/no-comply/designs"
              search={{ cat: "all", sort: "order", q: "" }}
              className="nc-display hidden text-lg tracking-[0.24em] text-white transition-opacity hover:opacity-60 md:block"
            >
              ALL DESIGNS
            </Link>
          }
        />
      </div>

      <StandardNoComplyMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        query={search.q}
        onQueryChange={setQuery}
        focusSearch={focusSearch}
      />

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
