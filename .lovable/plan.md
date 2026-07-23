## Plan

Add a new product **NC TIGER TEE** ($99) as a single listing with 3 color variants — **Black**, **Forest**, **Navy** — following the same pattern as the ZIP KNIT HOODIE and SERGEANT SHIRT variants.

### Steps

1. **Upload 6 assets** via `lovable-assets` under `src/assets/products/tiger-tee/{black,forest,navy}/`:
   - `black/front.png` — flat black tiger camo tee
   - `black/model.png` — male model in black tee + wide black trousers
   - `forest/front.png` — flat forest/olive tiger camo tee
   - `forest/model.png` — red-haired female model in forest tee + black wide pants
   - `navy/front.png` — flat navy tiger camo tee
   - `navy/model.png` — dark-haired female model in navy tee + black wide pants

2. **Edit `src/data/products.ts`** — append one product entry `command-tiger-tee`:
   - Name: `NC TIGER TEE`, price `$99`, category `Tees`, `displayOrder: 5`
   - `collectionId: "collection-1"`, no `swatchGroup` (single listing, all 3 variants live inside it)
   - Variants (in order Black → Forest → Navy):
     - `black` — swatch `#0a0a0a`, SKU `NC-CMD-TEE-BLK`, sizes `XS–XL`, `frontProduct` + `modelFront`
     - `forest` — swatch `#3a4a2a`, SKU `NC-CMD-TEE-FOR`, sizes `XS–XL`, `frontProduct` + `modelFront`
     - `navy` — swatch `#16234a`, SKU `NC-CMD-TEE-NVY`, sizes `XS–XL`, `frontProduct` + `modelFront`
   - Description: short editorial line about the tonal tiger camo tee with arched "NO COMPLY USA" chest print.

### Automatic results (no component changes)

- **Home grid** — one card labeled NC TIGER TEE with a 3-swatch selector (Black/Forest/Navy). Hovering a swatch previews that color's front; center-hover swaps to that color's model shot; clicking any swatch opens the focused product page for that variant.
- **Product detail page** — same 3-swatch selector under the info; selecting a color swaps the image stack (front + model) and updates `?variant=...`.
- **Lightbox** — same 3-swatch row; switching colors swaps the image set.

### Notes

- No back / detail images were provided, so the stack per variant is just `front → model`. Send back/detail shots later and I'll slot them in.
- Model→colorway mapping is inferred from the shirts in each photo (red-hair = forest, brunette woman = navy, male = black). Confirm if any should be swapped.
