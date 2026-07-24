## Product Order HUD

Add an on-canvas tool (matching the existing `LogoBannerHUD` / `LightboxTextHUD` pattern) that lets you reorder the product grid visually and persist the new order in the browser.

### Behavior
- Small toggle button pinned to the corner of `/projects/no-comply` (same style as other HUDs). Click to open the panel.
- Panel lists every product in current order, each row with:
  - Small front-image thumbnail + name + colorway
  - Drag handle for reordering
  - Up/Down arrow buttons as a touch/precision fallback
- Live preview: as you drag, the actual product grid on the page reflows to match.
- Panel buttons:
  - **Confirm** — saves the current order to `localStorage` and closes the HUD panel.
  - **Close HUD** — hides the entire HUD (toggle + panel) for the session; discards unsaved changes and reverts the grid to the last saved order.
  - **Reset to default** — clears the saved order (falls back to file `displayOrder`).
- Persistence: order stored under `nc:product-order:v1` as an array of product IDs. Unknown/new products fall back to file `displayOrder` and append at the end. Hidden-HUD state stored under `nc:product-order-hud:hidden` so "Close HUD" survives reloads until re-enabled (a tiny "Show order tool" affordance re-opens it, consistent with other HUDs).

### Scope
- Only affects the NO COMPLY listing grid. Product detail pages, swatch groups, categories, and data files are untouched.
- No edits to `src/data/products.ts`; saved order is an override layer on top of it.

### Technical notes
- New component `src/components/no-comply/product-order-hud.tsx` using `@dnd-kit/core` + `@dnd-kit/sortable` (install via `bun add`).
- New hook `src/hooks/use-product-order.ts` exposing `orderedProducts(products)`, `setOrder`, `resetOrder`. Hydrates via `useEffect` to avoid SSR mismatch.
- Update `src/routes/projects.no-comply.tsx` to apply the override in the sort pipeline (both "featured" and "order" sorts) and mount `<ProductOrderHUD />` next to the other HUDs.

### Out of scope
- Server-side persistence / multi-user sync (local-only, matching existing HUDs).
- Reordering within a category filter (order is global; filters just hide items).
