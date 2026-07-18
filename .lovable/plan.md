# Product System Rebuild

Rebuild the No Comply product system around a clean data model, dedicated image roles, variants, and manual ordering — keeping the current monochrome design.

## Scope

- Wipe all current Militia products (data only). Keep the collection page, product routes, and layout intact.
- Introduce Collections as first-class entities (Collection #1, Collection #2, …).
- New product shape with dedicated image fields, sizes, color(s), variants, featured flag, and manual `displayOrder`.
- New collection grid behavior: Front → Model Front on hover, 250ms fade, no carousel/zoom/rotation.
- New product detail page: vertical editorial stack in fixed image order.
- New lightbox: white bg, black close, arrow keys, ESC, click-outside; ordered Front → Back → Model Front → Model Back → Details.
- Variants live inside one product (e.g. COMMAND Hoodie: Black / White / Olive).

## Data model

Storage: local TypeScript data modules (no backend). This keeps "adding a product = edit one file, no code changes to components" true.

```ts
// src/data/collections.ts
export type Collection = {
  id: string;          // "collection-1"
  number: number;      // 1
  title: string;       // "COMMAND"
  slug: string;        // "command"
  description?: string;
};

// src/data/products.ts
export type ProductImage = { url: string; alt: string };
export type Variant = {
  id: string;
  color: string;              // "Black"
  swatch?: string;            // hex, optional
  images: {
    frontProduct: ProductImage;    // required
    backProduct?: ProductImage;
    modelFront?: ProductImage;
    modelBack?: ProductImage;
    details?: ProductImage[];
  };
  sku: string;
  sizes: string[];            // ["S","M","L","XL"]
};
export type Product = {
  id: string;
  name: string;
  collectionId: string;
  category: string;           // "Outerwear" | "Tops" | ...
  price: number;              // USD cents or dollars — dollars for simplicity
  description: string;
  featured: boolean;
  displayOrder: number;       // manual sort key, ascending
  variants: Variant[];        // at least 1
};
```

Rules:
- Sort products by `displayOrder` ascending. Never by date.
- Featured products can be surfaced separately but still respect `displayOrder`.
- Default variant = `variants[0]`.

## Files touched

- `src/data/collections.ts` — new
- `src/data/products.ts` — new, exports `products: Product[]` (empty array to start; ready for future entries)
- `src/data/militia.ts` (or equivalent existing data) — delete/replace usage
- `src/routes/projects.no-comply.tsx` — rewrite grid + moodboard sections to read from new data
  - Card: default `frontProduct`, hover `modelFront` with 250ms cross-fade (CSS opacity only)
  - Category filter reads unique categories from products
  - Empty state shown when no products exist (current situation after wipe)
- `src/routes/projects.$productSlug.tsx` (new) OR reuse existing product route — vertical stack layout:
  1. Front Product
  2. Back Product
  3. Model Front
  4. Model Back
  5. Details (in order)
  - Variant selector (color chips) swaps the image set
  - Size selector, price, description, SKU
- `src/components/no-comply/product-card.tsx` — extracted card with fade-only hover
- `src/components/no-comply/lightbox.tsx` — new white lightbox
  - Props: `images: ProductImage[]`, `startIndex`, `onClose`
  - White bg, black close (top-right), black arrow buttons L/R, keyboard: ← → ESC, click backdrop to close, focus trap

## Collection grid interaction

```text
[ Front Product ] --hover/focus--> [ Model Front ]
   opacity 1                          opacity 1
   (250ms ease)                       (crossfade)
```

- Both images stacked absolutely; toggle opacity via `group-hover` + `group-focus-within`.
- No transform, no scale, no auto-cycle, no multi-image carousel.
- Touch: tap toggles hover state (single tap swaps, second tap opens product page) — simple `useState` on card.

## Lightbox behavior

- Portal to `document.body`, `role="dialog"`, `aria-modal`.
- Locks body scroll while open.
- Image order = product page order.
- Prev/next wrap around.
- ESC closes; click on backdrop (not image) closes.
- Black 1px border on buttons, no rounding, hover invert (already the site style).

## Admin ordering (drag-and-drop)

Two options; pick one:

- **A. In-file ordering only.** `displayOrder` is a number in `products.ts`. Reordering = renumbering in the file. Simplest, no UI.
- **B. Local drag-and-drop admin panel** at `/projects/no-comply/admin` (dev-only route) using `@dnd-kit/core` + `@dnd-kit/sortable`. Persists new order to `localStorage`, exports a JSON snippet the developer pastes back into `products.ts`.

Recommend **B** so ordering is visual but source of truth stays in the file (matches "no code changes required to add a product" — reordering emits the values to paste). Confirm before I build the admin panel; without confirmation I'll ship **A** and we can add the panel later.

## What gets removed

- Current Militia product array + all references.
- Existing `CategoryGrid` internals that assume `lookbook[]` (front/back paired via naming). Replaced by per-product image roles.
- Hover carousel / cycle / "Look N" badge logic.
- Auto-generated back-view merging code.

## What stays

- Page chrome: sticky nav, black NO COMPLY USA banner, moodboard, manifesto, collection header, filters, search, sort UI (sort becomes "Featured / Name A–Z / Price" — no date).
- Monochrome design tokens and 2px borders.
- Lookbook route/product detail route file paths (rewritten inside).

## Open questions

1. Drag-and-drop admin panel now (option B) or file-based ordering only (option A)?
2. Keep the moodboard section as-is (empty visuals) or hide it until content exists?
3. Any products you want seeded now, or ship with an empty collection and add later?
