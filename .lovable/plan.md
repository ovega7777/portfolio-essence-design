## NC PLEATED TROUSERS — new product

Add one product listing, `displayOrder: 6`, category **Trousers**, price **$195**, with two color variants sharing a single card and lightbox (same pattern as NC TIGER TEE).

### Assets to upload (`src/assets/products/pleated-trousers/`)
- `black/front.png`, `black/back.png`, `black/model-front.png`, `black/model-back.png`
- `brown/front.png`, `brown/back.png`

Note: the uploads include 4 model shots but all show the **black** colorway (2 looks × front + back). Brown will have product-only shots (front/back) — no model images provided. Homepage hover for Brown will stay on its front (no model swap for that variant), matching how variants without `modelFront` already behave in `ProductCard`.

### Data entry (`src/data/products.ts`)
Single product, two variants:

- **id / slug:** `command-pleated-trousers`
- **name:** `NC PLEATED TROUSERS`
- **collectionId:** `collection-1`
- **category:** `Trousers`
- **price:** `195`
- **description:** "Wide-leg pleated trousers with an asymmetric four-button fly, deep front pleats, belt loops, and turned-up cuffed hem. Cut in a heavyweight suiting fabric with a manifesto script patch pocket at the back."
- **featured:** `false`
- **displayOrder:** `6`
- **swatchGroup:** none (single listing, variants live under one product)
- **variants:**
  - `black` — swatch `#0a0a0a`, SKU `NC-CMD-TROUS-BLK`, sizes XS–XL. Images: front, back, modelFront (red-hair look), modelBack (red-hair back). Second male look goes in `extraShots` (front + back) so it appears on the product page.
  - `brown` — swatch `#3a2a1a`, SKU `NC-CMD-TROUS-BRN`, sizes XS–XL. Images: front, back only.

### Behavior (all already implemented, no code changes)
- Grid card shows the selected variant's front; hovering the center swaps to `modelFront` (Black only, since Brown has none).
- Swatches below the card navigate to the product page with `?variant=` so Brown opens on the Brown front.
- Product page stacks: front → back → modelFront → modelBack → extraShots (Black gets 6 images, Brown gets 2).
- Lightbox reuses the same variant row and cross-switches images.

### Files touched
- New: 6 `.asset.json` pointers under `src/assets/products/pleated-trousers/{black,brown}/`
- Edit: `src/data/products.ts` — add imports + one new product entry at the end of the array.

Confirm and I'll implement. If you have Brown model shots to add later, drop them and I'll wire them in the same way.
