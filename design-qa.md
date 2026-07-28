# Design QA — No Comply Assortment Order

## Evidence

- Source visual:
  - `/var/folders/7l/wj0qlkhs0ngg4_ypccb5b30h0000gn/T/TemporaryItems/NSIRD_screencaptureui_WsvM0I/Screenshot 2026-07-28 at 12.11.08 AM.png`
- Implementation: local in-app Browser capture at `1280 × 720`.
- Comparison state: curated collection order, scrolled to the Captain's Jacket row.

## Requested Change

Move `NC PLEATED TROUSERS` directly to the right of `CAPTAIN'S JACKET`. Preserve the existing grid, product cards, images, swatches, hover behavior, typography, spacing, and all other product data.

## Verification

- The collection still contains 14 products.
- `CAPTAIN'S JACKET` is curated position 9.
- `NC PLEATED TROUSERS` is curated position 10 and immediately follows Captain's Jacket.
- The following sequence shifts right without any other content changes:
  - `EISENHOWER DISTRESS JACKET`
  - `AMERICAN DISTRESS HOODIE JACKET`
  - `NC CHUTE JACKET`
  - `NC CHUTE PANTS`
- Product-card styling and image behavior are unchanged.
- Production build passes.
- TypeScript check passes.

## Findings

No actionable P0, P1, or P2 differences remain. The requested assortment relationship is exact.

## Final Result

final result: passed
