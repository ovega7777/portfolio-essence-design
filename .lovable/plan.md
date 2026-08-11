# Add NC-17 RATING TEE to CAUGHT ON FILM (Collection #2)

The white colorway photos just arrived, so the full NC-17 RATING TEE (Black, Red, White) can be built now. The ON FILM DENIM JACKET and DENIM JEANS photos are still not in the uploads — those two listings are deferred until you send them.

## What gets built

Two collection cards, both sharing one swatch group so Black / Red / White appear under each card and on each product page:

1. NC-17 RATING TEE — BLACK, $75, TOPS
2. NC-17 RATING TEE — RED, $75, TOPS

White is selectable from both pages but gets no card of its own.

Behavior matches Collection #1 exactly: card shows the flat-lay by default, fades to the first model shot on hover, swatch hover/click swaps the front image, clicking a card opens the product page, gallery order preserved, lightbox on white with black controls.

## Galleries

Black (card 1): flat-lay black tee → model in black tee (hover) → second model shot → NC-17 label detail.

Red (card 2): flat-lay red tee → model in red tee (hover) → second model shot → NC-17 label detail.

White (no card): flat-lay white tee → male model in white tee (hover) → female model in white tee → NC-17 label detail.

Note: the black flat-lay you listed as `91D3728F…PNG` isn't in the uploads; the black flat-lay that is present (`exec-fcaaf1bd…`) will be used as the card image.

## Technical details

- Register the tee photos as CDN asset pointers under `src/assets/products/nc17-tee/{black,red,white}/`. Reuse the already-uploaded NC-17 label screenshot for all three galleries — no duplicate assets.
- Append two entries to `src/data/products.ts` with `collectionId: "collection-2"`, `category: "Tops"`, `price: 75`, `swatchGroup: "nc17-tee"`, sizes XS–XL, `displayOrder` 1 and 2 within the collection. White lives as a third variant on the Black listing.
- No component changes: the CAUGHT ON FILM collection page already filters on `collection-2` and derives its category chips (ALL / TOPS / …) from the products present, and the homepage Featured Pieces carousel picks up collection-2 products automatically.

## Out of scope until the images land

ON FILM DENIM JACKET ($215, Outerwear, Black/Blue) and ON FILM DENIM JEANS ($185, Bottoms, Blue/Black). Once you re-upload those ten photos I'll add both as single cards in positions 3 and 4, and the carousel will then show all four.
