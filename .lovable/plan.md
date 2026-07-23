## Goal
On the collection card, hovering (or focusing) a color swatch previews the front image of that colorway; clicking selects it. Works for both same-product variants and cross-product swatches in the same `swatchGroup`.

## Current behavior
`src/components/no-comply/product-card.tsx` only reacts to clicks. Hover does nothing, and `getGroupedVariants` returns only `{ productSlug, variantId, color, swatch }` — no image reference — so cross-product previews aren't possible without extra data.

## Change

**1. `src/data/products.ts` — enrich grouped variant data**
Extend `GroupedVariant` with the variant's front image:
```ts
type GroupedVariant = {
  productSlug: string;
  variantId: string;
  color: string;
  swatch?: string;
  frontImage: { url: string; alt: string };
};
```
Populate `frontImage` from `v.images.frontProduct` inside `getGroupedVariants`.

**2. `src/components/no-comply/product-card.tsx` — hover preview**
- Add `previewId: string | null` state (keyed as `${productSlug}:${variantId}`).
- Compute `displayed` = the previewed grouped entry when `previewId` is set, otherwise the selected variant's own entry.
- Render the card image from `displayed.frontImage.url` (drops the model hover-swap while a swatch is previewed — hovering a swatch takes priority over hovering the card).
- Swatch buttons:
  - `onMouseEnter` / `onFocus` → set `previewId` to that swatch's key
  - `onMouseLeave` / `onBlur` → clear `previewId`
  - `onClick` behavior unchanged (setVariantId for own, navigate for foreign)
- `Link` `to`/`params`/`search` reflect `displayed` so clicking the card while previewing lands on the previewed variant/product.
- Model cross-fade only runs when no swatch preview is active (guard `group-hover` classes with a conditional or wrap image stack so preview img sits on top with `opacity-100`).

## Verification
- Hovering the navy swatch on the Oxblood card swaps the shown image to the navy front (same product, own variant).
- Hovering the Olive swatch on the Oxblood card swaps to the Olive front (foreign product in same `swatchGroup`).
- Mouse-off restores the currently selected color's front.
- Clicking a foreign swatch still routes to the standalone Olive product.
- Card hover-to-model swap still works when no swatch is being hovered.
- `tsgo --noEmit` passes.