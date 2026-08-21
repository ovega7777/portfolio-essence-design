import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

import commandEditorialLook01 from "../assets/no-comply/editorial/command-look-01.png";
import commandEditorialLook02 from "../assets/no-comply/editorial/command-look-02.png";
import commandAssortmentLook01 from "../assets/no-comply/editorial/command-assortment-gallery/look-01.png";
import commandAssortmentLook02 from "../assets/no-comply/editorial/command-assortment-gallery/look-02.png";
import commandAssortmentLook03 from "../assets/no-comply/editorial/command-assortment-gallery/look-03.png";
import commandAssortmentLook04 from "../assets/no-comply/editorial/command-assortment-gallery/look-04.png";
import { products, getCategories, type Product } from "@/data/products";
import { collections } from "@/data/collections";
import { ProductCard } from "@/components/no-comply/product-card";
import { NoComplyCommandTitle } from "@/components/no-comply/no-comply-command-title";
import { CollectionNavigationFooter } from "@/components/no-comply/collection-navigation-footer";
import {
  CollectionPageTopBar,
  CollectionTitleHeader,
} from "@/components/no-comply/collection-page-header";

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

  const activeCategory = search.cat;
  const sort = search.sort;
  const query = search.q.trim().toLowerCase();

  type SearchState = z.infer<typeof searchSchema>;
  const setCategory = (cat: string) =>
    navigate({ to: ".", search: (p: SearchState) => ({ ...p, cat }) });
  const setQuery = (q: string) =>
    navigate({ to: ".", search: (p: SearchState) => ({ ...p, q }), replace: true });

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
      <CollectionPageTopBar collectionNumber={1} query={search.q} onQueryChange={setQuery} />

      <CollectionTitleHeader
        collectionNumber={1}
        pieceCount={50}
        theme="command"
        title={<NoComplyCommandTitle />}
      />

      <section
        id="products"
        className="border-b-2 border-black bg-white px-6 pb-24 md:px-12 md:pb-32"
      >
        <div className="mx-auto max-w-7xl">
          <div
            aria-label="No Comply Command editorial"
            className="grid grid-cols-2 gap-1 bg-black lg:grid-cols-4"
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

          <div className="nc-collection-header-to-title">
            <h3 className="font-punk-body text-base font-bold uppercase tracking-[0.06em] text-black">
              No Comply Command
            </h3>
            <nav
              aria-label="Filter products by category"
              className="nc-collection-title-to-filters flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-black/20 py-4 sm:gap-x-9"
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
                      selected
                        ? "font-bold underline decoration-1 underline-offset-4"
                        : "font-normal"
                    }`}
                  >
                    {category === "all" ? "All" : category}
                  </button>
                );
              })}
            </nav>
          </div>

          {displayed.length === 0 ? (
            <div className="nc-collection-filters-to-grid border-2 border-dashed border-black/40 p-16 text-center">
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
            <div className="nc-collection-filters-to-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          <div
            aria-label="No Comply Command assortment editorial gallery"
            className="mt-20 grid items-start gap-1 bg-black md:mt-28 md:grid-cols-[5fr_7fr]"
          >
            <img
              src={commandEditorialLook01}
              alt="No Comply Command editorial look with Captain's Jacket and Cargo Messenger Bag"
              className="aspect-[1086/1448] h-auto w-full bg-white object-cover"
              loading="lazy"
            />
            <img
              src={commandEditorialLook02}
              alt="No Comply Command editorial look with black and navy Sergeant Shirts"
              className="aspect-square h-auto w-full bg-white object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <CollectionNavigationFooter nextCollection="caught-on-film" />
    </div>
  );
}
