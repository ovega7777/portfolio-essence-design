## Change

In `src/components/no-comply/product-card.tsx`:

1. Revert the hover-delay logic:
   - Remove `showModel` state, `modelTimerRef`, `MODEL_HOVER_DELAY_MS`, `handleCardEnter`, `handleCardLeave`.
   - Drop the `onMouseEnter/Leave/Focus/Blur` handlers from the outer `<div>` and remove the `group` class (no longer needed to trigger model swap from the outer wrapper).
   - Restore instant cross-fade driven by hover on the image area.

2. Shrink the hover hit-area so the model view only appears when the mouse is over the product image itself (not the text/swatches below):
   - Move the hover trigger onto the image container (`<div className="relative aspect-[3/4] ...">`), giving it its own `group/image` scope.
   - Front image uses `group-hover/image:opacity-0` when a model image exists and no swatch is being previewed.
   - Model image uses `group-hover/image:opacity-100`.
   - Keep the `previewing` check so hovering a swatch still forces the front image and suppresses the model swap.

No other files change. Behavior: hover anywhere over the product image → instant fade to model; leaving the image (including moving onto the name/price/swatches) → instant snap back to front.
