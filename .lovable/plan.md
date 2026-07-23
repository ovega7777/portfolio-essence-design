## Plan

Add **Olive** and **White** as two new variants under the existing SERGEANT SHIRT — same pattern as the Navy/Black variants under the Oxblood ZIP KNIT HOODIE. They appear as swatches on the home grid AND on the product detail (specification) page + lightbox, with no new listings on the collection grid.

### Steps

1. **Upload 4 assets** via `lovable-assets`:
   - `src/assets/products/sergeant-shirt/olive/front.png.asset.json`
   - `src/assets/products/sergeant-shirt/olive/back.png.asset.json`
   - `src/assets/products/sergeant-shirt/white/front.png.asset.json`
   - `src/assets/products/sergeant-shirt/white/back.png.asset.json`

2. **Edit `src/data/products.ts`** — append two entries to the `variants` array of `command-sergeant-shirt-black`:
   - `olive` — color "Olive", swatch `#5a5a2b`, SKU `NC-CMD-SHIRT-OLV`, front + back images, sizes `XS–XL`
   - `white` — color "White", swatch `#f2ece0`, SKU `NC-CMD-SHIRT-WHT`, front + back images, sizes `XS–XL`
   - No detail/model shots (none provided yet).

3. **Automatic results** (no component changes needed):
   - **Home grid** — the SERGEANT SHIRT cards show 4 swatches: Black, Navy, Olive, White. Hover previews the front image of the hovered swatch; click navigates to that colorway's product page.
   - **Product detail / specification page** — same 4-swatch selector under the product info; selecting Olive/White swaps to that variant's front + back stack and updates the URL to `?variant=olive` / `?variant=white`.
   - **Lightbox** — same 4-swatch row; selecting a color switches the lightbox image set to that variant.

### Note
White swatch (`#f2ece0`) sits on a white card background. Existing black outline keeps it visible; say the word if you want a stronger border for light swatches.
