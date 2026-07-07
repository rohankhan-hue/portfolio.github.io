# Rohan Ullah Khan — Portfolio

Single-file portfolio site. Everything (styles, scripts, photo) is inside `index.html` — no build step, no dependencies.

## Host it on GitHub Pages (free)

1. Create a new repo on GitHub, e.g. `portfolio`
   (or name it `<your-username>.github.io` to get the cleaner URL).
2. Upload `index.html` (and this README) — either drag-and-drop on github.com, or:
   ```bash
   git init
   git add .
   git commit -m "portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
4. After ~1 minute your site is live at
   `https://<your-username>.github.io/portfolio/`
   (or `https://<your-username>.github.io/` if you used the username repo).

## Editing content

Open `index.html` — each section is marked with a comment (`HERO`, `ABOUT`, `NUMBERS`, `WORK`, `CONTACT`).

- **Add a client:** copy any `<article class="case">…</article>` block and change the text.
- **Change the big counters:** edit `data-count`, `data-suf`, etc. in the `NUMBERS` section.
- **Swap the photo:** replace the base64 string in the `<img>` tag inside `ABOUT`, or point `src` to a normal image file (e.g. `assets/me.jpg`) committed to the repo.
- **Colors/fonts:** all in the `:root { … }` block at the top of the CSS.
