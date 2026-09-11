import { CollectionProductGrid } from "@/components/no-comply/collection-product-grid";
import { CollectionNavigationFooter } from "@/components/no-comply/collection-navigation-footer";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useRef } from "react";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

import { ProductCard } from "@/components/no-comply/product-card";
import {
  DESIGN_CATEGORIES,
  matchesDesignCategory,
  normalizeDesignCategory,
  type DesignCategory,
} from "@/components/no-comply/design-categories";
import { DesignsCatalogHeader } from "@/components/no-comply/designs-catalog-header";
import { NoComplySiteHeader } from "@/components/no-comply/site-header";
import { products } from "@/data/products";

const searchSchema = z.object({
  cat: z.preprocess(normalizeDesignCategory, z.enum(DESIGN_CATEGORIES)),
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

function AllDesigns() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const catalogControlsRef = useRef<HTMLElement>(null);
  const locationHash = useRouterState({ select: (state) => state.location.hash });

  type SearchState = z.infer<typeof searchSchema>;
  const setCategory = (cat: DesignCategory) =>
    navigate({ to: "/projects/no-comply/designs", search: (previous: SearchState) => ({ ...previous, cat }) });
  useEffect(() => {
    if (locationHash !== "catalog-controls") return;
    requestAnimationFrame(() => catalogControlsRef.current?.focus({ preventScroll: true }));
  }, [locationHash, search.cat]);

  const displayed = useMemo(
    () => products.filter((product) => matchesDesignCategory(product.category, search.cat)),
    [search.cat],
  );

  return (
    <div className="no-comply min-h-screen bg-white text-black">
      <NoComplySiteHeader pageName="ALL DESIGNS" />

      <main
        id="all-designs-products"
        className="nc-designs-catalog nc-first-section mx-auto max-w-[1600px] px-5 sm:px-8"
      >
        <DesignsCatalogHeader
          ref={catalogControlsRef}
          selectedCategory={search.cat}
          onCategoryChange={setCategory}
        />

        {displayed.length > 0 ? (
          <CollectionProductGrid className="nc-designs-grid grid">
            {displayed.flatMap((product) =>
              (product.listingVariantIds ?? [product.variants[0].id]).map((variantId) => (
                <ProductCard
                  key={`${product.id}-${variantId}`}
                  product={product}
                  initialVariantId={variantId}
                  collectionGrid
                  catalog
                />
              )),
            )}
          </CollectionProductGrid>
        ) : (
          <div className="flex min-h-[360px] items-center justify-center border-2 border-dashed border-black/30 py-20 text-center">
            <div>
              <p className="nc-display text-4xl uppercase tracking-[0.08em]">No matches</p>
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-black/50">
                Try a different category.
              </p>
              <button
                type="button"
                onClick={() => navigate({ to: "/projects/no-comply/designs", search: { cat: "all" } })}
                className="mt-6 border border-black px-5 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-black hover:text-white"
              >
                Reset filters
              </button>
            </div>
          </div>
        )}
      </main>

      <CollectionNavigationFooter nextPage="projects" />
    </div>
  );
}
