import { CollectionCategoryNav } from "@/components/no-comply/collection-category-nav";
import { mobileImagePairStyle } from "@/components/no-comply/editorial-image-layout";
import { CollectionProductGrid } from "@/components/no-comply/collection-product-grid";
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
import { products } from "@/data/products";

const COLLECTION = collections[1];
const collectionProducts = products
  .filter((product) => product.collectionId === COLLECTION.id)
  .sort((a, b) => a.displayOrder - b.displayOrder);
const EDITORIAL_BANNER = [
  {
    src: editorialBanner01,
    width: 758,
    height: 843,
    alt: "Black The End studded tracksuit against a deep red backdrop",
    position: "50% 45%",
  },
  {
    src: editorialBanner02,
    width: 928,
    height: 1184,
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
    width: 1031,
    height: 1280,
    alt: "Model wearing a white The End studded tank top against a deep red backdrop",
    position: "50% 43%",
  },
  {
    src: closingEditorial02,
    width: 928,
    height: 1098,
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
  type SearchState = z.infer<typeof searchSchema>;

  const setCategory = (cat: string) =>
    navigate({ to: ".", search: (previous: SearchState) => ({ ...previous, cat }) });
  const displayed = useMemo(() => {
    let list = collectionProducts;
    if (activeCategory !== "all") {
      list = list.filter((product) => product.category === activeCategory);
    }
    return list;
  }, [activeCategory]);

  return (
    <div className="no-comply min-h-screen bg-[#070707] text-white">
      <CollectionPageTopBar collectionNumber={2} />

      <main>
        <CollectionTitleHeader
          collectionNumber={2}
          pieceCount={41}
          title="CAUGHT ON FILM"
          images={EDITORIAL_BANNER}
        />

        <section id="caught-on-film-products" className="nc-collection-products-shell bg-white px-6 text-black md:px-12">
          <div className="nc-collection-header-to-filters mx-auto max-w-7xl pb-12 sm:pb-16 lg:pb-20">
            <CollectionCategoryNav
              activeCategory={activeCategory}
              onCategoryChange={setCategory}
            />

            {displayed.length > 0 ? (
              <CollectionProductGrid className="nc-collection-filters-to-grid grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
                {displayed.flatMap((product) =>
                  (product.listingVariantIds ?? [product.variants[0].id]).map((variantId) => (
                    <ProductCard
                      key={`${product.id}-${variantId}`}
                      product={product}
                      initialVariantId={variantId}
                      collectionGrid
                    />
                  )),
                )}
              </CollectionProductGrid>
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
            <p className="nc-collection-bottom-count nc-display">
              COLLECTION #2 / 41 PIECES
            </p>
          </div>
        </section>

        <section
          className="cof-closing-editorial bg-white px-5 sm:px-8"
          aria-label="Caught on Film editorial campaign portraits"
        >
          <div className="cof-closing-editorial__viewport mx-auto max-w-[1536px]">
            <div className="cof-closing-editorial__track" style={mobileImagePairStyle(CLOSING_EDITORIAL)}>
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

      <CollectionNavigationFooter nextPage="command" />
    </div>
  );
}
