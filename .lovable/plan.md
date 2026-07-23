## Change

Make swatches on the collection page open the product's lightbox for the clicked color.

1. `src/routes/products.$slug.tsx`
   - Extend `ProductSearch` with `lightbox?: "1"` and validate it in `validateSearch`.
   - In `ProductPage`, if `search.lightbox === "1"`, initialize `lightboxIndex` to `0` so the lightbox opens on mount for the selected variant.

2. `src/components/no-comply/product-card.tsx`
   - Change the swatch `onClick` handler: instead of setting local `variantId` (own product) or navigating to the plain product page (foreign product), always navigate to `/products/$slug` with `params: { slug: g.productSlug }` and `search: { variant: g.variantId, lightbox: "1" }`.
   - Keep hover preview behavior unchanged.

No other files change.
