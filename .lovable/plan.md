## Goal
Show the Olive colorway as its own product card on the collection page, not as a swatch inside the existing ZIP KNIT HOODIE.

## Changes

**`src/data/products.ts`**
1. Remove the `olive` variant from the `command-zip-knit-hoodie-oxblood` product's `variants` array (Oxblood, Green, Navy, Black remain as swatches on that card).
2. Add a new standalone product entry using the existing Olive image imports (`oliveFront`, `oliveBack`, `oliveFrontPatched`, `oliveModel1`, `oliveModel2` — keep the imports):
   - `id` / `slug`: `command-zip-knit-hoodie-olive`
   - `name`: `ZIP KNIT HOODIE` (same name; the swatch/color distinguishes it, matching how a separate listing typically reads)
   - `collectionId`: `collection-1`, `category`: `Knitwear`, `price`: `275`
   - `displayOrder`: `2` (renders directly after the multi-color hoodie)
   - Single variant: `Olive` / swatch `#5a5a2b` / SKU `NC-CMD-KNIT-OLV` with the full 5-image stack (front, back, patched detail, model 1, model 2).

## Result
- Collection page shows two cards: the original ZIP KNIT HOODIE (4 swatches) and a separate Olive ZIP KNIT HOODIE (single swatch).
- Product page for the Olive listing behaves like the Oxblood one — hover-swap, full image stack, lightbox.

## Open question
Should the standalone Olive card use a different display name (e.g. "ZIP KNIT HOODIE — OLIVE") so it's visually distinct in the grid, or keep it identical to the multi-color card? Default: keep identical unless you say otherwise.