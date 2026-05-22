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

**Custom domain (`hiankitahere.com`):** `canonical` / `og:url` in `index.html` use **`https://hiankitahere.com/`**. If GitHub shows **DNS check unsuccessful** or **InvalidDNSError**, DNS is missing or misconfigured.

1. **Confirm the domain is live** — `hiankitahere.com` must resolve globally (registration + delegated nameservers). If tools report *NXDOMAIN* / “non-existent domain”, finish registration **first**—GitHub cannot read records that do not exist.
2. **Apex (`@`):** add **four `A`** records to GitHub Pages IPs:  
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`  
   Optional **`AAAA`** on **`@`:** `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
3. **Recommended:** **`www`** **`CNAME`** → **`incogni23.github.io`** (no repo path). Helps HTTPS and apex/`www` handling.
4. Remove host parking / default **`@`** records that conflict with the GitHub IPs.
5. Wait for propagation, then **Settings → Pages → Check again**.

Docs: [Managing a custom domain for GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Sites published via **GitHub Actions** store the hostname in **Settings**, not necessarily via a `CNAME` file in the repo.

## Files

`index.html` · `styles.css` · `script.js` · **`spiral-journey.js`** (scroll-scrubbed spiral tunnel backdrop) · **`about-studio.js`** · **`edu-contact-studio.js`** (GSAP / ScrollTrigger from [jsDelivr](https://www.jsdelivr.com/)) · `profile.png` · `AnkitaCV.pdf`

**Motion:** append `?anim=1` or `localStorage.setItem("ankitaPortfolioAnim","1")` if the OS prefers reduced motion but you want hero/boot animations, **the scroll-scrubbed spiral overlay**, and About / Education / Contact scroll choreography. The spiral is drawn on a **fixed SVG layer** (not a 3D transform on `<main>`), so the layout stays rectangular.

Scroll drives **steady** rotations and drift on those SVG groups (ribbon corkscrew) without perspective skewing the page content.

## Social / link previews

`<head>` targets **`https://hiankitahere.com/`** for **`og:url`** and **canonical**. **`twitter:image`** / **`og:image`** still use **`raw.githubusercontent.com`** for reliability; bump the `/repo/` segment if your GitHub repo name changes.