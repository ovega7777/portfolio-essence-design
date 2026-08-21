import { forwardRef } from "react";

import {
  DESIGN_CATEGORIES,
  DESIGN_CATEGORY_LABELS,
  type DesignCategory,
} from "@/components/no-comply/design-categories";

interface DesignsCatalogHeaderProps {
  selectedCategory: DesignCategory;
  onCategoryChange: (category: DesignCategory) => void;
}

export const DesignsCatalogHeader = forwardRef<HTMLElement, DesignsCatalogHeaderProps>(
  function DesignsCatalogHeader({ selectedCategory, onCategoryChange }, ref) {
    return (
      <>
        <header className="border-b border-black pb-5 sm:pb-6">
          <p className="mb-2 text-xs uppercase tracking-[0.32em] text-black/50">Complete Catalog</p>
          <h1 className="nc-display text-[clamp(3.5rem,9vw,9rem)] leading-[0.78] tracking-[0.03em]">
            All Designs
          </h1>
        </header>

        <section
          ref={ref}
          id="catalog-controls"
          tabIndex={-1}
          className="scroll-mt-28 pb-7 pt-5 outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 sm:pb-9 sm:pt-6"
          aria-label="Filter the complete catalog by category"
        >
          <nav
            aria-label="Filter all products by category"
            className="grid w-full grid-cols-2 border-y border-black/20 text-xs uppercase tracking-[0.14em] min-[480px]:grid-cols-5 sm:text-sm sm:tracking-[0.16em]"
          >
            {DESIGN_CATEGORIES.map((category) => {
              const selected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  aria-pressed={selected}
                  className={`flex min-h-11 items-center py-3 text-left transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black min-[480px]:justify-center min-[480px]:text-center ${
                    selected ? "font-bold underline underline-offset-4" : "text-black/55"
                  }`}
                >
                  {DESIGN_CATEGORY_LABELS[category]}
                </button>
              );
            })}
          </nav>
        </section>
      </>
    );
  },
);
