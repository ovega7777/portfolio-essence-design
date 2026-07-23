import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  const v = product.variants[0];
  const front = v.images.frontProduct;
  const modelFront = v.images.modelFront;

  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block bg-white text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
        <img
          src={front.url}
          alt={front.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-4 transition-opacity duration-[250ms] ease-in-out group-hover:opacity-0 group-focus-within:opacity-0"
        />
        {modelFront && (
          <img
            src={modelFront.url}
            alt={modelFront.alt}
            loading="lazy"
            aria-hidden
            className="absolute inset-0 h-full w-full object-contain p-4 opacity-0 transition-opacity duration-[250ms] ease-in-out group-hover:opacity-100 group-focus-within:opacity-100"
          />
        )}
      </div>
      <div className="flex items-baseline justify-between gap-3 px-4 py-3">
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
    </Link>
  );
}
