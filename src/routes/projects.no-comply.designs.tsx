import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useRef } from "react";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

import { ProductCard } from "@/components/no-comply/product-card";
import {
  DESIGN_CATEGORIES,
  matchesDesignCategory,
  type DesignCategory,
} from "@/components/no-comply/design-categories";
import { DesignsCatalogHeader } from "@/components/no-comply/designs-catalog-header";
import { NoComplySiteHeader } from "@/components/no-comply/site-header";
import { products } from "@/data/products";

const searchSchema = z.object({
  cat: fallback(z.enum(DESIGN_CATEGORIES), "all").default("all"),
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

function AllDesigns() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const catalogControlsRef = useRef<HTMLElement>(null);
  const locationHash = useRouterState({ select: (state) => state.location.hash });

  type SearchState = z.infer<typeof searchSchema>;
  const setCategory = (cat: DesignCategory) =>
    navigate({ to: ".", search: (previous: SearchState) => ({ ...previous, cat }) });
  const setQuery = (q: string) =>
    navigate({
      to: ".",
      search: (previous: SearchState) => ({ ...previous, q }),
      replace: true,
    });
  useEffect(() => {
    if (locationHash !== "catalog-controls") return;
    requestAnimationFrame(() => catalogControlsRef.current?.focus({ preventScroll: true }));
  }, [locationHash, search.cat]);

  const displayed = useMemo(() => {
    const query = search.q.trim().toLowerCase();
    let list = products;
    list = list.filter((product) => matchesDesignCategory(product.category, search.cat));
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
    return list;
  }, [search.cat, search.q]);

  const pageIndicator = search.q.trim() ? "SEARCH RESULTS" : "ALL DESIGNS";

  return (
    <div className="no-comply min-h-screen bg-white text-black">
      <NoComplySiteHeader pageName={pageIndicator} query={search.q} onQueryChange={setQuery} />

      <main
        id="all-designs-products"
        className="nc-first-section mx-auto max-w-[1600px] px-5 pb-16 sm:px-8 sm:pb-24"
      >
        <DesignsCatalogHeader
          ref={catalogControlsRef}
          selectedCategory={search.cat}
          onCategoryChange={setCategory}
        />

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
                onClick={() => navigate({ to: ".", search: { cat: "all", q: "" } })}
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
