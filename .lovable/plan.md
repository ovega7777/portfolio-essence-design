# Add CPT. CARGO PANT ($185)

Two listings share a `swatchGroup: "cpt-cargo-pant"` so the 4 swatches (Black, Plaid, Olive, Brown) appear beneath both cards and inside both lightboxes — exactly like the ZIP KNIT HOODIE pattern.

## Uploads (Lovable Assets)

Create pointers under `src/assets/products/cpt-cargo-pant/`:
- `black/front.png`, `black/back.png`, `black/model-1.png`, `black/model-2.png`
- `plaid/front.png`, `plaid/back.png`, `plaid/model-1.png`, `plaid/model-2.png`
- `olive/front.png`, `olive/back.png`
- `brown/front.png`, `brown/back.png`

## Product data (`src/data/products.ts`)

Two entries appended (displayOrder 8 and 9), both with:
- name `CPT. CARGO PANT`, price `185`, category `Trousers`
- `swatchGroup: "cpt-cargo-pant"`
- sizes `XS–XL`

**Listing 1 — Black** (displayOrder 8): variant `black` (swatch `#0a0a0a`) with front, back, model-1 (woman) as `modelFront`, model-2 (man) as `modelBack`.

**Listing 2 — Plaid** (displayOrder 9): variant `plaid` (swatch `#2a2a2a`) with front, back, model-1 (man) as `modelFront`, model-2 (woman) as `modelBack`.

Olive and Brown are added as extra variants inside the Black listing (front/back only, no model shots) so they surface as swatches in the shared row and each open a focused product page. Since Olive/Brown live under the Black listing, clicking either swatch from the Plaid card will navigate to the Black-listing URL with `?variant=olive` or `?variant=brown` — matching how Oxblood/Olive already cross-navigate.

Swatch hex: Olive `#5a5a2b`, Brown `#3a2a1a`.

Description: "Wide-leg cargo pant with pressed center creases, flap side pockets, welt back pockets, and buttoned hem tabs. Cut in a heavyweight garment-washed twill."

## Out of scope
No component changes — the existing `swatchGroup`, hover, lightbox, and cross-product navigation already handle everything.
