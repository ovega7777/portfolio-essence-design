# Add the complete CAUGHT ON FILM assortment

The required tee, denim jacket, and denim jeans imagery is now available. Add the full four-card Collection #2 assortment and connect it to the existing collection, product-detail, and homepage carousel systems.

## Collection assortment

Add these cards to Collection #2 in this exact order:

1. NC-17 RATING TEE — BLACK — $75 — TOPS
2. NC-17 RATING TEE — RED — $75 — TOPS
3. ON FILM DENIM JACKET — $215 — OUTERWEAR
4. ON FILM DENIM JEANS — $185 — BOTTOMS

The White tee is selectable from both tee pages but is not a separate collection card. The jacket is one card with Black as its default color and Blue as its second swatch. The jeans are one card with Blue as the default color and Black as its second swatch.

All four cards also appear, in the same order, in the homepage CAUGHT ON FILM Featured Pieces carousel. Do not invent a fifth product.

## Product behavior

Match Collection #1’s existing behavior without redesigning components:

- Flat-lay product image shown by default.
- First model image shown on card hover.
- Color swatches preview the selected color’s flat-lay and switch the complete product-detail gallery without reloading.
- Card click opens the existing product-detail route.
- Preserve supplied gallery order, natural image ratios, responsive grid, lightbox, and mobile behavior.
- Collection filters show ALL, TOPS, OUTERWEAR, and BOTTOMS and filter instantly.

## Gallery mapping

### NC-17 RATING TEE

- Black: uploaded black flat-lay (`exec-fcaaf1bd…`) → black model hover → second black model → NC-17 label detail.
- Red: red flat-lay → red model hover → second red model → NC-17 label detail.
- White: white flat-lay → male model hover → female model → white NC-17 label detail.
- Use the uploaded `exec-fcaaf1bd…` black flat-lay in place of the originally named but unavailable `91D3728F…PNG`.

### ON FILM DENIM JACKET

- Black: `35D97CCC…PNG` flat-lay → `exec-c0249a34…` hover → `exec-a07e6548…` → `exec-c60869f1…` → `exec-c5905231…`.
- Blue: `46E35EEB…PNG` flat-lay → `exec-ec92bf0d…` hover → `exec-374d9aa2…` → `exec-db084494…` → `exec-c1a7fedd…`.

### ON FILM DENIM JEANS

- Blue: newly uploaded `exec-7a0bec35…` flat-lay → `exec-ec92bf0d…` hover → `exec-374d9aa2…` → `exec-c1a7fedd…` → `exec-db084494…`.
- Black: newly uploaded `exec-ac6025a9…` flat-lay → `exec-c5905231…` hover → `exec-c60869f1…` → `exec-a07e6548…` → `exec-c0249a34…`.
- Reuse the same editorial model assets already used by the jacket variants; do not upload duplicate copies.

## Technical details

- Register each unique uploaded image once through Lovable Assets and commit only its `.asset.json` pointer.
- Add two tee product records sharing one `nc17-tee` swatch group, with Black / Red / White galleries and display orders 1–2.
- Add one jacket record with Black / Blue variants and display order 3.
- Add one jeans record with Blue / Black variants and display order 4.
- Use `collection-2`, the requested prices and categories, unique SKUs, sizes XS–XL, and the existing product data schema.
- Keep the homepage carousel data-driven from Collection #2 so all four records appear automatically with the existing dimensions, arrows, and mobile swipe behavior.
- Keep the collection page’s existing data-driven filtering and ensure its category order is ALL, TOPS, OUTERWEAR, BOTTOMS.
- Do not modify Collection #1, media galleries, or unrelated pages.

## Verification

Verify all four cards and only those four appear in the full assortment and Featured Pieces carousel; confirm order, prices, hover images, swatch previews, complete gallery replacement, product-detail links, category filters, no duplicate listings/assets, and desktop/mobile behavior.
