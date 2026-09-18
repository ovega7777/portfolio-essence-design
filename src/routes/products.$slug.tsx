import { ProductGallery } from "@/components/no-comply/product-gallery";
import { CollectionNavigationFooter } from "@/components/no-comply/collection-navigation-footer";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { ProductVariant } from "@/data/products";
import { getGroupedVariants, getProductBySlug, getProductGalleryImages } from "@/data/products";
import { getCollection } from "@/data/collections";
import { NoComplySiteHeader } from "@/components/no-comply/site-header";

type ProductSearch = { variant?: string; returnTo?: string };

// Only portfolio listing paths are accepted; never redirect to an external URL.
const listingReturnPath = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value, "https://portfolio.invalid");
    if (url.origin !== "https://portfolio.invalid" ||
        !/^\/projects\/no-comply(?:\/(?:command|caught-on-film|designs))?$/.test(url.pathname)) return undefined;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch { return undefined; }
};

export const Route = createFileRoute("/products/$slug")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    variant: typeof search.variant === "string" ? search.variant : undefined,
    returnTo: listingReturnPath(search.returnTo),
  }),
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.product.name} — NO COMPLY USA` : "Product";
    const description = loaderData?.product.description ?? "NO COMPLY USA product detail.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(!loaderData ? [{ name: "robots", content: "noindex" }] : []),
      ],
    };
  },
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

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { variant } = Route.useSearch();
  return <ProductDetail key={`${product.slug}:${variant ?? "default"}`} />;
}

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { variant: variantSearch, returnTo } = Route.useSearch();
  const navigate = useNavigate();
  const collection = getCollection(product.collectionId);
  const initialVariant =
    (variantSearch && product.variants.find((v: ProductVariant) => v.id === variantSearch)?.id) ??
    product.variants[0].id;
  const variantId = initialVariant;
  const [size, setSize] = useState<string | null>(null);

  const variant: ProductVariant =
    product.variants.find((v: ProductVariant) => v.id === variantId) ?? product.variants[0];

  const grouped = getGroupedVariants(product);

  const ordered = getProductGalleryImages(product, variant);

  return (
    <div className="no-comply min-h-screen bg-white text-black">
      <NoComplySiteHeader
        pageName={product.name}
        activeCollection={collection?.slug === "command" ? "command" : "caught-on-film"}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6 md:px-12">
        <a href={returnTo ?? `/projects/no-comply/${collection?.slug ?? "designs"}`}
          className="nc-display inline-flex min-h-11 items-center text-sm tracking-widest underline underline-offset-4">
          ← Back to {returnTo?.includes("/designs") ? "Designs" : returnTo?.split("?")[0] === "/projects/no-comply" ? "NO COMPLY USA" : "collection"}
        </a>
      </div>
      <main className="nc-product-layout nc-first-section !pt-6 mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:px-12">
        <ProductGallery key={`${product.slug}:${variant.id}`} images={ordered} />

        <aside className="min-w-0 md:sticky md:top-24 md:h-fit">
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

          {grouped.length > 0 && (
            <div className="mt-8">
              <p className="nc-display mb-3 text-[10px] tracking-[0.3em] text-black">
                Color — {variant.color}
              </p>
              <div className="flex flex-wrap gap-2">
                {grouped.map((g) => {
                  const isOwn = g.productSlug === product.slug;
                  const active = isOwn && g.variantId === variant.id;
                  return (
                    <button
                      key={`${g.productSlug}-${g.variantId}`}
                      type="button"
                      onClick={() => {
                        setSize(null);
                        navigate({
                          to: "/products/$slug",
                          params: { slug: g.productSlug },
                          search: { variant: g.variantId, returnTo },
                          replace: isOwn,
                          resetScroll: false,
                        });
                      }}
                      aria-pressed={active}
                      className={`nc-display min-h-11 border border-black px-3 py-2 text-sm tracking-[0.1em] transition-colors duration-200 ${
                        active
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-black hover:text-white"
                      }`}
                    >
                      <span aria-hidden="true" className="mr-2 inline-block h-4 w-4 border border-current align-middle" style={{ backgroundColor: g.swatch ?? "#000" }} />
                      {g.color}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {variant.sizes.length > 0 && (
            <div className="mt-6">
              <p className="nc-display mb-3 text-[10px] tracking-[0.3em] text-black">Size</p>
              <div className="flex flex-wrap gap-2">
                {variant.sizes.map((s: string) =>
                  s === "ONE SIZE FITS ALL" ? (
                    <span
                      key={s}
                      className="nc-display border-2 border-black bg-white px-4 py-2 text-[10px] tracking-[0.3em] text-black"
                    >
                      {s}
                    </span>
                  ) : (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      aria-pressed={s === size}
                      className={`nc-display min-h-11 min-w-11 border border-black px-4 py-2 text-sm tracking-[0.1em] transition-colors duration-200 ${
                        s === size
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-black hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}

          <button type="button" disabled aria-describedby="purchase-status"
            className="nc-display mt-8 min-h-14 w-full border border-black bg-black px-6 py-4 text-lg tracking-widest text-white disabled:cursor-not-allowed">
            Add to Cart
          </button>
          <p id="purchase-status" className="mt-3 font-punk-body text-sm tracking-wide text-black/60">
            Portfolio showcase — online purchasing is not available.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px border border-black bg-black text-black">
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
      </main>

      <CollectionNavigationFooter nextPage={collection?.slug === "command" ? "command" : "caught-on-film"} />

    </div>
  );
}
