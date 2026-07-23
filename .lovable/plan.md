## Plan

Update the brown variant of `NC PLEATED TROUSERS` in `src/data/products.ts` to include the same 4 model images already imported for the black variant, so they appear on the brown product page after the front/back product shots.

### Change

In `src/data/products.ts`, extend the brown variant's `images` block with:

- `modelFront` → `trousersBlackModel1Front`
- `modelBack` → `trousersBlackModel1Back`
- `extraShots` → `[trousersBlackModel2Front, trousersBlackModel2Back]`

No new asset uploads, no component changes. The existing product page renders `frontProduct → backProduct → modelFront → modelBack → extraShots`, so the 4 model shots will automatically appear after the brown product photos.
