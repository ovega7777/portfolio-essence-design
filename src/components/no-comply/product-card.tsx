import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getGroupedVariants, type Product } from "@/data/products";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const front = variant.images.frontProduct;
  const modelFront = variant.images.modelFront;

  const grouped = getGroupedVariants(product);

  return (
    <div className="group block bg-white text-black">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        search={{ variant: variant.id }}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
          <img
            key={`${variant.id}-front`}
            src={front.url}
            alt={front.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain p-4 transition-opacity duration-[250ms] ease-in-out group-hover:opacity-0 group-focus-within:opacity-0"
          />
          {modelFront && (
            <img
              key={`${variant.id}-model`}
              src={modelFront.url}
              alt={modelFront.alt}
              loading="lazy"
              aria-hidden
              className="absolute inset-0 h-full w-full object-contain p-4 opacity-0 transition-opacity duration-[250ms] ease-in-out group-hover:opacity-100 group-focus-within:opacity-100"
            />
          )}
        </div>
      </Link>
      <div className="flex items-baseline justify-between gap-3 px-4 pt-3">
        <div className="min-w-0">
          <p className="nc-display truncate text-lg tracking-[0.15em] text-black md:text-xl">
            {product.name}
          </p>
          <p className="nc-display text-[10px] tracking-[0.3em] text-black/60">
            {product.category}
          </p>
        </div>
        <p className="nc-display shrink-0 text-lg tracking-[0.15em] text-black md:text-xl">
          ${product.price}
        </p>
      </div>
      {grouped.length > 1 && (
        <div className="flex items-center gap-2 px-4 pb-3 pt-2">
          {grouped.map((g) => {
            const isOwn = g.productSlug === product.slug;
            const active = isOwn && g.variantId === variant.id;
            return (
              <button
                key={`${g.productSlug}-${g.variantId}`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isOwn) {
                    setVariantId(g.variantId);
                  } else {
                    navigate({
                      to: "/products/$slug",
                      params: { slug: g.productSlug },
                      search: { variant: g.variantId },
                    });
                  }
                }}
                aria-label={`Show ${g.color}`}
                aria-pressed={active}
                title={g.color}
                className={`h-4 w-4 border-2 transition-transform duration-150 ${
                  active ? "border-black scale-110" : "border-black/40 hover:border-black"
                }`}
                style={{ backgroundColor: g.swatch ?? "#000" }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
