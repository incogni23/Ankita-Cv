# Portfolio: Ankita Dewari

Single-page portfolio with **one visual system**: deep midnight background, teal accent, flax gold warmth, serif headlines (**Newsreader**) + **Inter** body + **IBM Plex Mono** labels. The **three-column hero** (photo centre, “Hello,” left, name/actions right, wiring SVG, subtle motion) uses the same palette as the header, strips, cards, and footer so the page stays one cohesive look.

## View locally

```bash
npx serve .
```

Then open the URL shown in the terminal.

## Live site (GitHub Pages)

This repo is set up to deploy with **GitHub Actions** (see [`.github/workflows/pages.yml`](.github/workflows/pages.yml)).

1. Push `main` to GitHub (e.g. `git push origin main`).
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
4. Open the workflow run under the **Actions** tab; when it finishes, the published URL uses your **repository name** in the path, e.g.  
   **`https://incogni23.github.io/ankitadewari-cv/`**

**Use the slug `ankitadewari-cv`:** on GitHub go to **Settings → General → Repository name**, rename **`Ankita-Cv`** → **`ankitadewari-cv`**. Pages will move to `…/ankitadewari-cv/` automatically.  
Locally, update your remote if needed:

```bash
git remote set-url origin git@github.com:incogni23/ankitadewari-cv.git
```

This repo already points **`og:url`** and **canonical** at that default Pages URL (`index.html`). After you rename, push again so previews match.

**Real custom domain (optional):** the **Custom domain** field needs a **full hostname** you control (examples: **`ankitadewari-cv.com`**, **`www.ankitadewari-cv.com`**, **`cv.yourdomain.com`**). Hyphen slug names alone (`ankitadewari-cv`) are invalid there. Steps:

1. Buy/configure DNS at your registrar.
2. **Settings → Pages → Custom domain**: enter your hostname; use **DNS check** guidance from GitHub (A/CNAME/CNAME apex per [their docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains)).
3. Set **Enforce HTTPS** after DNS verifies.
4. Update **`og:url`** and **`<link rel="canonical">`** in `index.html` to **`https://<your-domain>/`** (absolute URL with your real domain).

If you rename this repository or add a custom domain, keep **`twitter:image`** / **`og:image`** in sync (`raw.githubusercontent.com/incogni23/<repo>/main/profile.png`).

## Files

`index.html` · `styles.css` · `script.js` · **`spiral-journey.js`** (scroll-scrubbed spiral tunnel backdrop) · **`about-studio.js`** · **`edu-contact-studio.js`** (GSAP / ScrollTrigger from [jsDelivr](https://www.jsdelivr.com/)) · `profile.png` · `AnkitaCV.pdf`

**Motion:** append `?anim=1` or `localStorage.setItem("ankitaPortfolioAnim","1")` if the OS prefers reduced motion but you want hero/boot animations, **the scroll-scrubbed spiral overlay**, and About / Education / Contact scroll choreography. The spiral is drawn on a **fixed SVG layer** (not a 3D transform on `<main>`), so the layout stays rectangular.

Scroll drives **steady** rotations and drift on those SVG groups (ribbon corkscrew) without perspective skewing the page content.

## Social / link previews

`<head>` includes Open Graph / Twitter meta, **`og:url`**, and a **canonical** link (default: `https://incogni23.github.io/ankitadewari-cv/` once the repo name matches). Adjust if you rename the repo or use a purchased domain only.
