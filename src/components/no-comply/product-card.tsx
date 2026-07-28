import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
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
  const [showModel, setShowModel] = useState(false);

  const displayed =
    (previewKey &&
      grouped.find((g) => `${g.productSlug}:${g.variantId}` === previewKey)) ||
    grouped.find((g) => `${g.productSlug}:${g.variantId}` === selectedKey) ||
    grouped[0];

  const front = displayed.frontImage;
  const modelFront = displayed.modelImage ?? variant.images.modelFront;
  const imagePadding = product.category === "Trousers" ? "p-7" : "p-4";

  return (
    <div className="block bg-white text-black">
      <Link
        to="/products/$slug"
        params={{ slug: displayed.productSlug }}
        search={{ variant: displayed.variantId }}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        onFocus={() => setShowModel(true)}
        onBlur={() => setShowModel(false)}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
          <img
            key={`${displayed.productSlug}-${displayed.variantId}-front`}
            src={front.url}
            alt={front.alt}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-contain ${imagePadding} transition-opacity duration-[250ms] ease-in-out ${
              !showModel ? "opacity-100" : "opacity-0"
            }`}
          />
          {modelFront && (
            <img
              key={`${displayed.productSlug}-${displayed.variantId}-model`}
              src={modelFront.url}
              alt={modelFront.alt}
              loading="lazy"
              aria-hidden
              className={`absolute inset-0 h-full w-full object-contain ${imagePadding} transition-opacity duration-[250ms] ease-in-out ${
                showModel ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
          {modelFront && (
            <div
              className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onMouseEnter={() => setShowModel(true)}
              onMouseLeave={() => setShowModel(false)}
              aria-hidden
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
            const stickyHover = product.slug === "nc-tiger-tee";
            return (
              <button
                key={key}
                type="button"
                onMouseEnter={() => setPreviewKey(key)}
                onMouseLeave={() => {
                  if (!stickyHover) setPreviewKey(null);
                }}
                onFocus={() => setPreviewKey(key)}
                onBlur={() => {
                  if (!stickyHover) setPreviewKey(null);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isOwn) setVariantId(g.variantId);
                  setPreviewKey(null);
                  navigate({
                    to: "/products/$slug",
                    params: { slug: g.productSlug },
                    search: { variant: g.variantId },
                  });
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
