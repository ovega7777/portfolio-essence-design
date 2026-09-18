# Add a live NO COMPLY website preview

## Goal
Change only the two portfolio entry points for NO COMPLY USA so they open a dedicated live-preview page before visitors enter the existing collections site.

## Implementation
- Add a new portfolio route for the NO COMPLY live preview, leaving `/projects/no-comply` and all of its existing pages unchanged.
- Update the NO COMPLY card on the homepage and Projects page to link to the new preview route. Keep every other project card and portfolio section unchanged.
- Build the preview page inside the existing Nicholas Curzon portfolio frame and visual system.
- Embed `https://riot-reveal-commerce.lovable.app` in a browser-style window with restrained rounded corners, subtle shadow, and three small desktop-style window dots.
- Keep the embedded site live and interactive so its video, buttons, and logo animation run inside the frame.
- Add two clear actions directly beneath the preview:
  - **Enter Shop** → `/projects/no-comply`
  - **View Full Website** → opens the live site in a new tab with safe external-link handling
- Make the preview preserve a desktop website canvas on larger screens and scale/reframe cleanly on phones while remaining tappable.
- Add route-specific title, description, Open Graph metadata, and Twitter card metadata.

## Verification
- Confirm both NO COMPLY cards open the preview page.
- Confirm the iframe loads the live website and remains interactive.
- Confirm Enter Shop reaches the unchanged collections homepage and View Full Website opens the external site.
- Check desktop and mobile layouts for clipping, overlap, and tap accessibility.
