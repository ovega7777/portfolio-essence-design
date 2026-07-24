## Simplify Product Order HUD

Strip the HUD down to a single purpose: reorder product listings by swapping positions. Remove all extra controls and states.

### Changes to `src/components/no-comply/product-order-hud.tsx`
- Keep only the draggable list of product thumbnails (drag handle + name).
- Remove: up/down arrow buttons, Confirm button, Close button, Reset button, draft/dirty state, and any "unsaved changes" indication.
- Keep a single "Close HUD" (X) in the header to hide the panel.
- Every drag drop immediately commits the new order to `localStorage` — no draft/confirm step.

### Changes to `src/hooks/use-product-order.ts`
- Simplify to expose just `order`, `setOrder(nextIds)`, and the applied ordering. Remove draft/commit/reset APIs no longer used.

### Changes to `src/routes/projects.no-comply.tsx`
- Remove the "live preview of unsaved draft" branch — the grid always renders the committed order from the hook.
- Keep the HUD mount + toggle to show/hide it.

No visual/style changes to product cards, lightbox, or data. Behavior: drag a product in the HUD → grid updates and persists instantly.
