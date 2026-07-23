## Changes

**Product data (`src/data/products.ts`)**
- Rename "COMMAND ZIP KNIT HOODIE" → "ZIP KNIT HOODIE".
- Update price from `480` → `275`.

**Remove image frames (borders)**
- `src/components/no-comply/product-card.tsx`: remove the outer `border-2 border-black` on the card link and the `border-t-2` divider above the name/price row (keep layout, drop the outlined frame around image + meta).
- `src/routes/products.$slug.tsx`: remove `border-2 border-black` from each image button in the vertical stack (Front, Back, Detail, Model shots) so images render frameless on white.
- Lightbox (`src/components/no-comply/lightbox.tsx`): image itself has no border today; confirm no frame is added. No change needed to the image, but verify the close/arrow buttons stay (user asked to remove product/model frames, not controls).

**Larger name & price**
- Grid card (`product-card.tsx`): bump product name from `text-sm` → `text-lg md:text-xl`, price from `text-sm` → `text-lg md:text-xl`, keep tracking. Category label stays small.
- Product page (`products.$slug.tsx`): headline is already large; bump price from `text-sm` → `text-xl md:text-2xl`.

**Lightbox consistency**
- The lightbox shows one image at a time with a `1/5` counter — no product name/price is rendered there today. To "apply these changes to the lightbox view," add the product name + price above (or below) the counter caption in the same monochrome style, sourced from the product passed in. Requires passing `name` and `price` props into `<Lightbox>` from `products.$slug.tsx`.

## Out of scope
- No changes to collection ordering, variants, sizes, description, SKU, or routing.
- No changes to sticky nav frame or meta tiles (SKU/Category box) unless you also want those unframed — confirm if yes.
