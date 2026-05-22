# Portfolio: Ankita Dewari

Single-page portfolio with **one visual system**: deep midnight background, teal accent, flax gold warmth, serif headlines (**Newsreader**) + **Inter** body + **IBM Plex Mono** labels. The **three-column hero** (photo centre, “Hello,” left, name/actions right, wiring SVG, subtle motion) uses the same palette as the header, strips, cards, and footer so the page stays one cohesive look.

## View locally

```bash
npx serve .
```

Then open the URL shown in the terminal.

## Files

`index.html` · `styles.css` · `script.js` · **`spiral-journey.js`** (scroll-scrubbed spiral tunnel backdrop) · **`about-studio.js`** · **`edu-contact-studio.js`** (GSAP / ScrollTrigger from [jsDelivr](https://www.jsdelivr.com/)) · `profile.png` · `AnkitaCV.pdf`

**Motion:** append `?anim=1` or `localStorage.setItem("ankitaPortfolioAnim","1")` if the OS prefers reduced motion but you want hero/boot animations, **the scroll-scrubbed spiral overlay**, and About / Education / Contact scroll choreography. The spiral is drawn on a **fixed SVG layer** (not a 3D transform on `<main>`), so the layout stays rectangular.

Scroll drives **steady** rotations and drift on those SVG groups (ribbon corkscrew) without perspective skewing the page content.

## Social / link previews

`<head>` includes Open Graph / Twitter meta. After you publish a real URL (e.g. GitHub Pages or a domain), add or update **`og:url`** / **`canonical`** in `index.html` so shares point at the live site.
