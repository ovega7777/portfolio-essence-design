## Goal
On the **NC TIGER TEE** card only, make the swatch hover "sticky": after hovering a color swatch, the card's front image stays on that color instead of reverting to the currently selected variant on mouse-out. All other products keep the current revert-on-leave behavior.

## Changes

**`src/components/no-comply/product-card.tsx`**
- Add a way to opt a product into sticky-hover behavior. Simplest: detect by `product.slug === "nc-tiger-tee"` (single-item rule as requested).
- In the swatch `onMouseLeave` / `onBlur` handlers, skip the `setPreviewKey(null)` reset when the sticky rule applies. `onMouseEnter` / `onFocus` still update `previewKey` so each new hover overrides the last.
- Clicking a swatch continues to navigate to that variant's page as today.

## Out of scope
- No changes to data, other products, product page, or lightbox.
- No change to the center model-hover behavior.
