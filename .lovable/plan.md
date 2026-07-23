## Goal
1. Show the same 4-swatch color selector on the Olive listing (card + lightbox); non-Olive swatches route to the multi-color ZIP KNIT HOODIE preselected on that color.
2. Add an on-page HUD to tune the lightbox product name and price text (content + font size), persisted in localStorage, similar to the existing `LogoBannerHUD`.

## Changes

### 1. Cross-product swatches on the Olive listing

**`src/data/products.ts`**
- Add an optional `linkedVariants?: { productSlug: string; variantId: string }[]` field on `Product` (or a simpler `swatchGroup?: string` shared across the two hoodie products). Use `swatchGroup: "zip-knit-hoodie"` on both products.

**`src/components/no-comply/product-card.tsx` and lightbox**
- When a product has a `swatchGroup`, collect all variants from every product sharing that group (deduped by color) and render the full swatch row.
- Clicking a swatch that belongs to the *current* product swaps images in place (existing behavior).
- Clicking a swatch that belongs to a *different* product navigates to `/products/{otherSlug}?variant={variantId}` (uses the existing `?variant=` handling).
- Result: Olive card shows Oxblood, Green, Navy, Black, Olive; clicking any non-Olive swatch jumps to the multi-color hoodie preselected on that color, and vice versa.

### 2. Lightbox text HUD

**New `src/components/no-comply/LightboxTextHUD.tsx`**
- Floating panel (bottom-right of the lightbox), matching the existing `LogoBannerHUD` visual style.
- Controls: Name text input, Name font-size slider (px), Price text input, Price font-size slider (px), Reset, Confirm (hides HUD until re-enabled).
- Overrides stored in `localStorage` under `nc-lightbox-text:{productSlug}` as `{ name?, price?, nameSize?, priceSize? }`.
- Toggle button (small "T" pill) in the lightbox chrome to re-open the HUD after confirming.

**`src/components/no-comply/lightbox.tsx`**
- Read the localStorage override for the current product on mount and on `storage` events.
- Render name/price using the override text and inline `fontSize`; fall back to product data when no override.
- Mount `LightboxTextHUD` inside the lightbox.

## Out of scope
- The HUD only tunes name and price (the two text elements the user pointed at). Other lightbox text (color label, close button) stays fixed.
- Overrides are local to the browser — this is a tuning tool, not a CMS. To make an override permanent, the values get copied into `src/data/products.ts` manually.