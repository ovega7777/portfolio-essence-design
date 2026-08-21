import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

import editorialBanner01 from "../assets/no-comply/caught-on-film/editorial-banner/panel-01.jpg";
import editorialBanner02 from "../assets/no-comply/caught-on-film/editorial-banner/panel-02.jpg";
import editorialBanner03 from "../assets/no-comply/caught-on-film/editorial-banner/panel-03.jpg";
import closingEditorial01 from "../assets/no-comply/caught-on-film/closing-editorial/panel-01.jpg";
import closingEditorial02 from "../assets/no-comply/caught-on-film/closing-editorial/panel-02.jpg";
import closingEditorial03 from "../assets/no-comply/caught-on-film/closing-editorial/panel-03.jpg";
import { ProductCard } from "@/components/no-comply/product-card";
import { CollectionNavigationFooter } from "@/components/no-comply/collection-navigation-footer";
import {
  CollectionPageTopBar,
  CollectionTitleHeader,
} from "@/components/no-comply/collection-page-header";
import { collections } from "@/data/collections";
import { getCategories, products } from "@/data/products";

const COLLECTION = collections[1];
const collectionProducts = products
  .filter((product) => product.collectionId === COLLECTION.id)
  .sort((a, b) => a.displayOrder - b.displayOrder);
const CATEGORY_ORDER = ["Tops", "Outerwear", "Bottoms", "Accessories"];
const availableCategories = new Set(getCategories(COLLECTION.id));
const CATEGORIES = CATEGORY_ORDER.filter((category) => availableCategories.has(category));
const EDITORIAL_BANNER = [
  {
    src: editorialBanner01,
    alt: "Black The End studded tracksuit against a deep red backdrop",
    position: "50% 45%",
  },
  {
    src: editorialBanner02,
    alt: "White NC-17 T-shirt styled with an On Film scarf and red theater glasses",
    position: "50% 37%",
  },
  {
    src: editorialBanner03,
    alt: "Red On Film long-sleeve top styled with a black studded belt",
    position: "50% 45%",
  },
];
const CLOSING_EDITORIAL = [
  {
    src: closingEditorial01,
    alt: "Model wearing a white The End studded tank top against a deep red backdrop",
    position: "50% 43%",
  },
  {
    src: closingEditorial02,
    alt: "Model wearing a black film-print jacket and matching bottoms",
    position: "50% 44%",
  },
  {
    src: closingEditorial03,
    alt: "Model wearing an On Film scarf, red theater glasses, and a white NC-17 T-shirt",
    position: "50% 44%",
  },
];

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
      <CollectionPageTopBar collectionNumber={2} query={search.q} onQueryChange={setQuery} />

      <main>
        <CollectionTitleHeader
          collectionNumber={2}
          pieceCount={collectionProducts.length}
          theme="caught-on-film"
          title={
            <h1 className="nc-display text-[clamp(3.5rem,9vw,9rem)] leading-[0.78] tracking-[0.03em]">
              Caught on Film
            </h1>
          }
        />

        <section
          className="cof-editorial-banner mx-auto max-w-[1672px] px-0 sm:px-8"
          aria-label="Caught on Film campaign"
        >
          <div className="cof-editorial-banner__track">
            {EDITORIAL_BANNER.map((panel) => (
              <figure key={panel.src} className="cof-editorial-banner__panel">
                <img
                  src={panel.src}
                  alt={panel.alt}
                  className="cof-editorial-banner__image"
                  style={{ objectPosition: panel.position }}
                />
              </figure>
            ))}
          </div>
        </section>

        <section id="caught-on-film-products" className="bg-white text-black">
          <div className="nc-collection-header-to-title mx-auto max-w-[1600px] px-5 pb-12 sm:px-8 sm:pb-16 lg:pb-20">
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

        <section
          className="cof-closing-editorial bg-white px-5 pb-4 sm:px-8 sm:pb-6 lg:pb-8"
          aria-label="Caught on Film editorial campaign portraits"
        >
          <div className="cof-closing-editorial__viewport mx-auto max-w-[1536px]">
            <div className="cof-closing-editorial__track">
              {CLOSING_EDITORIAL.map((panel) => (
                <figure key={panel.src} className="cof-closing-editorial__panel">
                  <img
                    src={panel.src}
                    alt={panel.alt}
                    className="cof-closing-editorial__image"
                    style={{ objectPosition: panel.position }}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>

      <CollectionNavigationFooter nextCollection="command" />
    </div>
  );
}
