## Change

In `src/components/no-comply/product-card.tsx`, make every swatch click on a homepage card open the focused product page for that swatch's variant — matching how the Olive listing already behaves.

## Why the Olive card already works

Olive is a standalone product with only one variant of its own; the other 3 swatches point to the Oxblood product, so clicking them triggers the cross-product `navigate(...)` branch and opens the focused view.

Oxblood contains all 4 variants under one product, so `isOwn` is true and the click only swaps the in-card image via `setVariantId` — never navigating.

## Fix

Remove the `isOwn` branch in the swatch `onClick`. Always call `navigate({ to: "/products/$slug", params: { slug: g.productSlug }, search: { variant: g.variantId } })`. This applies uniformly to every product listing.

Hover-preview behavior (swapping the front image while hovering a swatch) stays unchanged.
