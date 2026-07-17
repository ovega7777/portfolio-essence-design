## Goal

Redesign the entire `/projects/no-comply` page in a premium monochrome (pure black + white) editorial aesthetic — inspired by Acne Studios, Represent, Fear of God, Aime Leon Dore. Remove every red/cream punk-zine element. Keep the sticky nav + logo banner + collection filter section (already partially redesigned) and extend the same visual language to every other section on the page.

## Sections to redesign

**1. Sticky top nav**
- Keep black background, white text, white hairline stripe (already good).
- Ensure hover states go to `text-white/60` instead of red.

**2. Logo banner** — no change (already black + white).

**3. Moodboard section** (currently zine-style with tilted tiles, tape, red shadows)
- Replace with a clean editorial grid: 3-column asymmetric grid of numbered black-and-white tiles.
- Remove all `nc-tilt-*`, `nc-tape`, red shadow effects.
- White background, thin 2px black dividers between rows.
- Heading "MOODBOARD" as bold condensed uppercase (Bebas Neue) with black underline, not the red slanted `nc-title` chip.
- Numbered captions in small tracked uppercase black text.

**4. Manifesto section** (currently black bg with red eyebrow)
- Keep black background / white text (high contrast is on-brand).
- Replace red `// Manifesto` eyebrow with white tracked uppercase eyebrow.
- Body copy in condensed uppercase; no red anywhere.

**5. Collection header + filters + search + sort** — already monochrome; no changes.

**6. Empty state + category group headers**
- Swap `nc-ink` / `nc-cream` tokens for pure `black` / `white`.
- Group headings: bold condensed uppercase, 2px black bottom border, black count text (not 70% opacity red-ish).

**7. Product card overlays (`CategoryGrid` internals, lines ~700–810)**
- "Look N" badge: black border, white bg, black text; hover invert to black bg / white text (no red).
- Focus ring: black instead of `nc-red`.
- Mobile cycle button: black border, white bg, hover invert.
- Skeleton loader: `bg-black/5` instead of `bg-nc-ink/5`.
- SKU / name / price text: pure black, no opacity tints below 60%.

**8. Meta info tiles** (Role / Year / Format)
- White background with 2px black border (not 4px `nc-cream` filled boxes).
- Label in small tracked uppercase black (not red).
- Value in bold condensed uppercase black.

**9. Footer (Next Up / All Projects)**
- Remove all red text; use black.
- Underline hover: black → black bg / white text pill style, or simple black underline stays.
- "Next Up" eyebrow: black tracked uppercase.

**10. Lightbox modal**
- Background: `bg-black/95` (already close, swap `nc-ink` → `black`).
- Close / prev / next buttons: white border, black bg, hover invert to white bg / black text (drop red hover).
- Footer caption: white text, price in white (not red).
- Thumbnail active state: white border (not red); inactive: `border-white/40`.

## Global rules applied everywhere

- Replace every `nc-red`, `nc-cream`, `nc-ink` utility on this page with `black` / `white`.
- No shadows, no gradients, no rounded corners (all `rounded-*` removed if any), no rotation/tilt.
- All headings use `nc-display` (Bebas Neue) uppercase with generous letter-spacing.
- Hover on every interactive element: 200ms transition to black bg / white text (or inverse in dark sections).
- Dividers: 2px solid black.
- Brand strings confirmed: "COLLECTION #1", "NO COMPLY COMMAND", "NO COMPLY USA".

## Out of scope

- No changes to `src/styles.css` `.no-comply` tokens (leave defined; simply stop referencing red/cream on this page). Other routes are untouched.
- No data / SKU / lookbook logic changes.
- No changes to other routes or shared components.

## Technical notes

- Single file edit: `src/routes/projects.no-comply.tsx`.
- `CategoryGrid` + card render helpers (~lines 700–810) get color-token swaps only; structure unchanged.
- Moodboard tile array simplified (drop `tilt` / tape flags).
- Verify build after edits.
