## Plan

Add two new product listings that follow the existing ZIP KNIT HOODIE system and image behavior already used in the NO COMPLY collection.

### What I’ll build
1. Add **Product 1: black colorway** and **Product 2: navy colorway** as two separate listings in `src/data/products.ts`.
2. Map each listing to the 6-image sequence you defined:
   - Front
   - Back
   - Detailed
   - Model 1
   - Model 2
   - Model 3
3. Keep the existing rules already used by the hoodie product cards:
   - **Homepage card:** front image by default
   - **Homepage hover:** swap to **Model 1**
   - **Product page:** stacked editorial image order of front, back, detail, then model shots
   - **Lightbox:** same image set and order
4. Treat the black and navy entries as the same product family behavior as the hoodie setup, so they can share the same presentation pattern and colorway logic if needed.
5. Upload the new source images as project assets and wire them into the product data without changing the overall layout system.

### Image mapping I’ve identified from your uploads
- **Black listing**
  - Front: plain black shirt front
  - Back: plain black shirt back
  - Detail: patched black shirt front
  - Model 1: black shirt on female model
  - Model 2: black shirt on male model
  - Model 3: black shirt on red-hair female model
- **Navy listing**
  - Front: plain navy shirt front
  - Back: plain navy shirt back
  - Detail: patched navy shirt front
  - Model 1: navy shirt on blonde female model
  - Model 2: navy shirt on short-hair male model
  - Model 3: navy shirt on long-hair male model

### Technical details
- Reuse the current product schema in `src/data/products.ts`, which already supports:
  - product metadata
  - separate listings
  - variants / swatch grouping
  - `frontProduct`, `backProduct`, `details`, `modelFront`, `modelBack`, and extra shots
- Reuse the current UI behavior already implemented in:
  - `src/components/no-comply/product-card.tsx`
  - `src/routes/products.$slug.tsx`
- Keep the new products compatible with the existing hover swap, product detail page, and lightbox flow rather than introducing a new component pattern.

### Assumptions for implementation
- These are **two separate listings** of the same silhouette in different colorways, similar to how the current hoodie listings behave.
- **Model 1** is the homepage hover image for each listing.
- **Model 2** and **Model 3** will appear lower in the product-page and lightbox sequence after the detail shot.
- If product copy fields you haven’t named yet (name, price, description, sizes, SKU) are not already established elsewhere, they will need to be filled during implementation.