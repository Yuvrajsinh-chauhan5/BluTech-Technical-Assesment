
# TeddyPups Animation System

Original website behavior is the source of truth.

## Planned modules

- `motion.js` — shared motion utilities
- `smooth-scroll.js` — original smooth scrolling behavior
- `paw-trail.js` — original paw trail canvas
- `header-scroll.js` — scroll-aware header behavior
- `puppy-scenes.js` — puppy scene interactions
- `mobile-menu.js` — mobile navigation interactions

## Implementation rules

1. Reconstruct behavior from the original website's source.
2. Do not introduce arbitrary animation effects.
3. Respect prefers-reduced-motion.
4. Avoid unnecessary animation libraries.
5. Keep animations responsive and clean up event listeners.
6. Do not animate essential content into an invisible state.
