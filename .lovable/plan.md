## Goal
Remove the duplicate Olive colorway so the ZIP KNIT HOODIE swatch group shows exactly 4 colors (Oxblood, Navy, Black, Olive) on both the home card selector and the lightbox selector. The standalone Olive listing keeps its full layout and the same 4-swatch selector.

## Current state
`src/data/products.ts`:
- Main product `command-zip-knit-hoodie` has 4 variants: **Oxblood, Olive (using `green/*` images), Navy, Black**
- Standalone product `command-zip-knit-hoodie-olive` has 1 Olive variant (using `olive/*` images)
- Both share `swatchGroup: "zip-knit-hoodie"` → `getGroupedVariants` currently returns **5** swatches (Olive appears twice).

## Change
In `src/data/products.ts`:
1. Delete the `"green"` / Olive variant block (~lines 106–121) from the main `command-zip-knit-hoodie` product.
2. Remove the now-unused imports: `greenFront`, `greenBack`, `greenFrontPatched`, `greenModel1`, `greenModel2`.
3. Leave the standalone `command-zip-knit-hoodie-olive` product exactly as-is (same `swatchGroup`, same images, same layout).

No component changes needed — `product-card.tsx`, `lightbox.tsx`, and `products.$slug.tsx` already resolve swatches through `swatchGroup`, so:
- Oxblood / Navy / Black cards show 4 swatches; clicking Olive routes to `/products/command-zip-knit-hoodie-olive`.
- Olive standalone card shows the same 4 swatches; clicking Oxblood / Navy / Black routes back to the main product.
- Lightbox on either product shows the same 4 swatches.

## Verification
- Home grid: both hoodie cards show 4 swatches, no duplicate Olive.
- Lightbox on Oxblood and on standalone Olive: 4 swatches, cross-product navigation works.
- `tsgo --noEmit` passes.