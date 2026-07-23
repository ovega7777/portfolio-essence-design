import { Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";

import { getGroupedVariants, type Product } from "@/data/products";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  const grouped = getGroupedVariants(product);
  const selectedKey = `${product.slug}:${variant.id}`;
  const [previewKey, setPreviewKey] = useState<string | null>(null);

  const displayed =
    (previewKey &&
      grouped.find((g) => `${g.productSlug}:${g.variantId}` === previewKey)) ||
    grouped.find((g) => `${g.productSlug}:${g.variantId}` === selectedKey) ||
    grouped[0];

  const previewing = previewKey !== null;
  const front = displayed.frontImage;
  const modelFront = variant.images.modelFront;

  const [showModel, setShowModel] = useState(false);
  const modelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const MODEL_HOVER_DELAY_MS = 900;

  const handleCardEnter = () => {
    if (previewing || !modelFront) return;
    if (modelTimerRef.current) clearTimeout(modelTimerRef.current);
    modelTimerRef.current = setTimeout(() => setShowModel(true), MODEL_HOVER_DELAY_MS);
  };
  const handleCardLeave = () => {
    if (modelTimerRef.current) {
      clearTimeout(modelTimerRef.current);
      modelTimerRef.current = null;
    }
    setShowModel(false);
  };

  return (
    <div
      className="group block bg-white text-black"
      onMouseEnter={handleCardEnter}
      onMouseLeave={handleCardLeave}
      onFocus={handleCardEnter}
      onBlur={handleCardLeave}
    >
      <Link
        to="/products/$slug"
        params={{ slug: displayed.productSlug }}
        search={{ variant: displayed.variantId }}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
          <img
            key={`${displayed.productSlug}-${displayed.variantId}-front`}
            src={front.url}
            alt={front.alt}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-contain p-4 transition-opacity duration-[250ms] ease-in-out ${
              !previewing && showModel ? "opacity-0" : "opacity-100"
            }`}
          />
          {modelFront && !previewing && (
            <img
              key={`${variant.id}-model`}
              src={modelFront.url}
              alt={modelFront.alt}
              loading="lazy"
              aria-hidden
              className={`absolute inset-0 h-full w-full object-contain p-4 transition-opacity duration-[250ms] ease-in-out ${
                showModel ? "opacity-100" : "opacity-0"
              }`}
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
            const key = `${g.productSlug}:${g.variantId}`;
            const isOwn = g.productSlug === product.slug;
            const active = key === selectedKey;
            return (
              <button
                key={key}
                type="button"
                onMouseEnter={() => setPreviewKey(key)}
                onMouseLeave={() => setPreviewKey(null)}
                onFocus={() => setPreviewKey(key)}
                onBlur={() => setPreviewKey(null)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isOwn) {
                    setVariantId(g.variantId);
                    setPreviewKey(null);
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
