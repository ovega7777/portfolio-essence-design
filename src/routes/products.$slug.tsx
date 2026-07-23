import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { ProductVariant } from "@/data/products";
import { getGroupedVariants, getProductBySlug, type ProductImage } from "@/data/products";
import { getCollection } from "@/data/collections";
import { Lightbox } from "@/components/no-comply/lightbox";

type ProductSearch = { variant?: string };

export const Route = createFileRoute("/products/$slug")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    variant: typeof search.variant === "string" ? search.variant : undefined,
  }),
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.name} — NO COMPLY USA` : "Product" },
      loaderData
        ? { name: "description", content: loaderData.product.description }
        : { name: "robots", content: "noindex" },
    ],
  }),
  notFoundComponent: () => (
    <div className="no-comply flex min-h-screen items-center justify-center bg-white p-10 text-center">
      <div>
        <p className="nc-display text-4xl text-black">Product not found</p>
        <Link
          to="/projects/no-comply"
          className="nc-display mt-6 inline-block border-2 border-black px-4 py-2 text-xs tracking-[0.3em] text-black hover:bg-black hover:text-white"
        >
          ← Back to collection
        </Link>
      </div>
    </div>
  ),
  component: ProductPage,
});

function orderedImages(images: ProductImage[]): ProductImage[] {
  return images;
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { variant: variantSearch } = Route.useSearch();
  const collection = getCollection(product.collectionId);
  const initialVariant =
    (variantSearch && product.variants.find((v: ProductVariant) => v.id === variantSearch)?.id) ??
    product.variants[0].id;
  const [variantId, setVariantId] = useState(initialVariant);
  const [size, setSize] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const variant: ProductVariant =
    product.variants.find((v: ProductVariant) => v.id === variantId) ?? product.variants[0];

  const stack: ProductImage[] = [];
  stack.push(variant.images.frontProduct);
  if (variant.images.backProduct) stack.push(variant.images.backProduct);
  if (variant.images.details) stack.push(...variant.images.details);
  if (variant.images.modelFront) stack.push(variant.images.modelFront);
  if (variant.images.modelBack) stack.push(variant.images.modelBack);
  if (variant.images.extraShots) stack.push(...variant.images.extraShots);

  const ordered = orderedImages(stack);

  return (
    <div className="no-comply min-h-screen bg-white text-black">
      <nav className="sticky top-0 z-40 border-b-2 border-black bg-black text-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link
            to="/projects/no-comply"
            className="nc-display text-base tracking-widest text-white transition-colors duration-200 hover:text-white/60 md:text-lg"
          >
            ← {collection?.title ?? "Collection"}
          </Link>
          <span className="nc-display text-xs tracking-[0.3em] text-white md:text-sm">
            {variant.sku}
          </span>
        </div>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:px-12 md:py-16">
        <div className="flex flex-col gap-6">
          {ordered.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group block w-full bg-white"
              aria-label={`Open ${img.alt}`}
            >
              <img
                src={img.url}
                alt={img.alt}
                loading={i === 0 ? "eager" : "lazy"}
                className="block h-auto w-full object-contain"
              />
            </button>
          ))}
        </div>

        <aside className="md:sticky md:top-24 md:h-fit">
          {collection && (
            <p className="nc-display mb-4 inline-block bg-black px-3 py-1 text-[10px] tracking-[0.3em] text-white">
              Collection #{collection.number} — {collection.title}
            </p>
          )}
          <h1 className="nc-display text-4xl leading-none text-black md:text-6xl">
            {product.name}
          </h1>
          <p className="nc-display mt-3 text-xl tracking-[0.2em] text-black md:text-2xl">
            ${product.price}
          </p>

          <p className="mt-8 font-punk-body text-base uppercase leading-relaxed tracking-[0.1em] text-black/80">
            {product.description}
          </p>

          {product.variants.length > 1 && (
            <div className="mt-8">
              <p className="nc-display mb-3 text-[10px] tracking-[0.3em] text-black">
                Color — {variant.color}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v: ProductVariant) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    aria-pressed={v.id === variant.id}
                    className={`nc-display border-2 border-black px-3 py-2 text-[10px] tracking-[0.3em] transition-colors duration-200 ${
                      v.id === variant.id
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {v.color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {variant.sizes.length > 0 && (
            <div className="mt-6">
              <p className="nc-display mb-3 text-[10px] tracking-[0.3em] text-black">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {variant.sizes.map((s: string) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={s === size}
                    className={`nc-display border-2 border-black px-4 py-2 text-[10px] tracking-[0.3em] transition-colors duration-200 ${
                      s === size
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <dl className="mt-10 grid grid-cols-2 gap-px border-2 border-black bg-black text-black">
            <div className="bg-white p-4">
              <dt className="nc-display text-[10px] tracking-[0.3em]">SKU</dt>
              <dd className="nc-display mt-1 text-sm">{variant.sku}</dd>
            </div>
            <div className="bg-white p-4">
              <dt className="nc-display text-[10px] tracking-[0.3em]">Category</dt>
              <dd className="nc-display mt-1 text-sm">{product.category}</dd>
            </div>
          </dl>
        </aside>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={ordered}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          name={product.name}
          price={product.price}
          variants={product.variants.map((v: ProductVariant) => ({
            id: v.id,
            color: v.color,
            swatch: v.swatch,
          }))}
          activeVariantId={variant.id}
          onVariantChange={(id) => {
            setVariantId(id);
            setLightboxIndex(0);
          }}
        />
      )}
    </div>
  );
}
