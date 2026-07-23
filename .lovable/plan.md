## Add Green + Navy + Black variants to ZIP KNIT HOODIE

### Assets to upload (via `lovable-assets create` from `/mnt/user-uploads/`)

Green (full set, 5 images) → `src/assets/products/zip-knit-hoodie/green/`
- `front.png` — plain front-view render (exec-dc66e897)
- `front-patched.png` used as **detail** — patched front (exec-4f1d87ed)
- `back.png` — back with elbow patches (exec-59bcff7b)
- `model-1.png` — male model (exec-5184b03f)
- `model-2.png` — female model (exec-bfaf8f78)

Navy (front + back only) → `src/assets/products/zip-knit-hoodie/navy/`
- `front.png` (call_vsUb4yzXnsg8S7lPwmbuix1J)
- `back.png` (call_xsNMPrM3jxUoL8cYdicRjm6b)

Black (front + back only) → `src/assets/products/zip-knit-hoodie/black/`
- `front.png` (call_Ooh3g3VfvShldBZRdx0QbErt)
- `back.png` (call_k3NgM301FfeuOPrAEvNOtBfP)

Existing Oxblood assets stay untouched.

### Data changes (`src/data/products.ts`)

Add three new `ProductVariant` entries to the ZIP KNIT HOODIE product's `variants` array so there are 4 total:

1. `oxblood` — existing (unchanged; stays default = first entry).
2. `green` — swatch `#4b5320`, SKU `NC-CMD-KNIT-GRN`, sizes `["XS","S","M","L","XL"]`, images: front, back, details:[front-patched], modelFront (model-1), modelBack (model-2).
3. `navy` — swatch `#0f1a3a`, SKU `NC-CMD-KNIT-NVY`, sizes `["XS","S","M","L","XL"]`, images: front, back only.
4. `black` — swatch `#0a0a0a`, SKU `NC-CMD-KNIT-BLK`, sizes `["XS","S","M","L","XL"]`, images: front, back only.

The existing product-detail page already renders a color-chip selector when `variants.length > 1` and rebuilds the image stack per variant — no code change needed there.

### Grid card — color selector (`src/components/no-comply/product-card.tsx`)

Currently the card always shows `variants[0]`. Add a local `useState` for the active variant. Render a horizontal row of small square swatches (2px black border, filled with `variant.swatch`, active = ring) under the name/price. Selecting a swatch:
- Swaps `front` and `modelFront` shown on the card.
- Updates the `Link` `to`/`params` (single product, so slug is stable — but we pass `?variant=<id>` via `search` so the product page can preselect).
- Stops propagation so clicking a swatch doesn't navigate.

Product route reads `Route.useSearch()` and, if `variant` matches an id, uses it as the initial `variantId`.

### Lightbox — color selector (`src/components/no-comply/lightbox.tsx` + `src/routes/products.$slug.tsx`)

Extend `Lightbox` props:
- `variants?: { id; color; swatch?; }[]`
- `activeVariantId?: string`
- `onVariantChange?: (id: string) => void`

When provided and length > 1, render the same swatch row centered under the name/price. Clicking a swatch calls `onVariantChange`, which in the product route swaps `variantId`, rebuilds the `ordered` image list, and resets `lightboxIndex` to `0` so the viewer opens on the new color's front image.

All monochrome styling preserved: 2px black border on chips, filled with swatch color, `aria-pressed` for active.

### Out of scope
- No changes to sizes, price, description, category, or routing structure.
- No changes to other products or the collection page layout.
