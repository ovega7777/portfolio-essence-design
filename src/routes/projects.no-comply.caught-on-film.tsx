import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { Menu, Search } from "lucide-react";
import { z } from "zod";

import caughtOnFilmHeader from "../assets/no-comply/caught-on-film/caught-on-film-header.png";
import { ProductCard } from "@/components/no-comply/product-card";
import { CollectionNavigationFooter } from "@/components/no-comply/collection-navigation-footer";
import { StandardNoComplyMenu } from "@/components/no-comply/standard-menu";
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
  const openMenu = (focusSearch = false) => {
    setFocusMenuSearch(focusSearch);
    setMenuOpen(true);
  };

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

      <StandardNoComplyMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        query={search.q}
        onQueryChange={setQuery}
        focusSearch={focusMenuSearch}
        activeCollection="caught-on-film"
      />

      <main>
        <header className="nc-first-section mx-auto max-w-[1600px] px-5 pb-8 sm:px-8">
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
          <div className="nc-collection-header-to-title mx-auto max-w-[1600px] px-5 pb-16 sm:px-8 sm:pb-24">
            <div className="border-b border-black">
              <p className="nc-display text-2xl uppercase tracking-[0.08em] sm:text-3xl">
                Caught on Film
              </p>
              <div className="nc-collection-title-to-filters flex flex-wrap gap-x-7 gap-y-3 pb-5 text-sm uppercase tracking-[0.16em]">
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
              <div className="nc-collection-filters-to-grid grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
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
              <div className="nc-collection-filters-to-grid flex min-h-[360px] items-center justify-center py-20 text-center">
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

      <CollectionNavigationFooter nextCollection="command" />
    </div>
  );
}
