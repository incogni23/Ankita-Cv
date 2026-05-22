# Portfolio: Ankita Dewari

Single-page portfolio with **one visual system**: deep midnight background, teal accent, flax gold warmth, serif headlines (**Newsreader**) + **Inter** body + **IBM Plex Mono** labels. The **three-column hero** (photo centre, “Hello,” left, name/actions right, wiring SVG, subtle motion) uses the same palette as the header, strips, cards, and footer so the page stays one cohesive look.

## View locally

```bash
npx serve .
```

Then open the URL shown in the terminal.

## Files

`index.html` · `styles.css` · `script.js` · **`spiral-journey.js`** (scroll-scrubbed spiral tunnel backdrop) · **`about-studio.js`** · **`edu-contact-studio.js`** (GSAP / ScrollTrigger from [jsDelivr](https://www.jsdelivr.com/)) · `profile.png` · `AnkitaCV.pdf`

**Motion:** append `?anim=1` or `localStorage.setItem("ankitaPortfolioAnim","1")` if the OS prefers reduced motion but you want hero/boot animations, **the spiral “descent”,** About / Education / Contact scroll choreography, and the **“scroll into the tunnel”** depth rig (`spiral-depth-rig-live` on `<html>` when motion is enabled).

The page **still scrolls vertically** under the hood (so anchors, keyboards, and screen readers behave normally): the inward feeling comes from cancelling part of vertical motion with transforms + perspective on `.spiral-surface`.
