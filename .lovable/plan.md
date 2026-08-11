# Add the available CAUGHT ON FILM products

The uploads now contain the complete NC-17 RATING TEE imagery and both color galleries for the ON FILM DENIM JACKET. Build those three collection listings now. The ON FILM DENIM JEANS remains deferred because its Blue and Black flat-lay product images have not arrived.

## Collection assortment

Add these cards to Collection #2 in this order:

1. NC-17 RATING TEE — BLACK — $75 — TOPS
2. NC-17 RATING TEE — RED — $75 — TOPS
3. ON FILM DENIM JACKET — $215 — OUTERWEAR

The White tee is selectable from both tee pages but is not a separate collection card. The jacket is one card with Black as its default color and Blue as its second swatch.

All three cards also appear in the homepage CAUGHT ON FILM Featured Pieces carousel. Do not invent a fourth or fifth card.

## Product behavior

Match Collection #1’s existing behavior without redesigning components:

- Flat-lay product image shown by default.
- First model image shown on card hover.
- Color swatches preview the selected color’s flat-lay and switch the complete product-detail gallery without reloading.
- Card click opens the existing product-detail route.
- Preserve the supplied gallery order, natural image ratios, responsive grid, lightbox, and mobile behavior.
- Collection filters expose ALL, TOPS, OUTERWEAR, and BOTTOMS in the requested order; BOTTOMS remains available for the forthcoming jeans listing.

## Gallery mapping

### NC-17 RATING TEE

- Black: black flat-lay (`exec-fcaaf1bd…`) → black model hover → second black model → NC-17 label detail.
- Red: red flat-lay → red model hover → second red model → NC-17 label detail.
- White: white flat-lay → male model hover → female model → white NC-17 label detail.
- Use the uploaded black flat-lay in place of the originally named but unavailable `91D3728F…PNG`.

### ON FILM DENIM JACKET

- Black: `35D97CCC…PNG` flat-lay → `exec-c0249a34…` hover → `exec-a07e6548…` → `exec-c60869f1…` → `exec-c5905231…`.
- Blue: `46E35EEB…PNG` flat-lay → `exec-ec92bf0d…` hover → `exec-374d9aa2…` → `exec-db084494…` → `exec-c1a7fedd…`.

## Technical details

- Register each unique uploaded image once through Lovable Assets and commit only its `.asset.json` pointer; reuse shared imagery rather than uploading duplicates.
- Add two tee product records sharing one `nc17-tee` swatch group, with Black / Red / White galleries and display orders 1–2.
- Add one jacket product record with Black / Blue variants and display order 3.
- Use Collection #2, the requested prices and categories, unique SKUs, and the existing product data schema.
- Keep the homepage carousel data-driven from Collection #2 so the three new records appear automatically.
- Make the Collection #2 category controls explicitly render ALL, TOPS, OUTERWEAR, BOTTOMS even before a bottoms product is available.
- Verify collection order, prices, hover images, swatch previews, full gallery replacement, filters, detail links, carousel contents, desktop layout, and mobile layout.

## Deferred until its product images arrive

ON FILM DENIM JEANS — $185 — BOTTOMS. The shared editorial model images are present, but the required Blue (`E59AE7BF…PNG`) and Black (`DC5DD5E3…PNG`) flat-lays are still missing. Once those arrive, add the jeans as card 4 without duplicating the shared jacket/jeans model assets.
