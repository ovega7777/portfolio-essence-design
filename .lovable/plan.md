Goal: Decrease the hover-trigger area for the model-view swap so it only activates inside a centered inset rectangle on the product image, applied to all products via the shared card component.

Plan:

1. Update `src/components/no-comply/product-card.tsx`
   - Wrap the product image in a relative container.
   - Add an absolutely positioned, centered inset hover target (e.g., 60% × 60%) over the image.
   - Move the hover/focus listeners (`onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur`) from the swatch buttons to the new target element.
   - Keep the existing image opacity transitions, but tie the model-view reveal state to hover/focus of the centered target instead of the whole card.
   - Preserve the outer `<Link>` behavior so clicking anywhere on the image still navigates to the product page.

2. Ensure focus/accessibility is preserved
   - The centered target should be focusable with a visible focus ring.
   - Screen-reader text should indicate the target reveals the model view.

3. Verify across products
   - Confirm the change applies to every product card on the collection grid because all cards use the same component.
   - Check that the front image remains visible when hovering the edges/corners of the card.

No data or route changes are required.