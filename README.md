# Rohan Ullah Khan — Portfolio (v2, colourful redesign)

Static site for GitHub Pages. No build step, no dependencies.

## Files

```
index.html          ← the page
style.css           ← all styling
script.js           ← menu, scroll spy, count-up stats, lightbox
assets/images/      ← 21 images extracted from the portfolio PDF (WebP)
```

All four items must sit at the ROOT of the repository, exactly like this.

## Upload to GitHub (replaces the old site)

1. Unzip the folder on your computer.
2. Open https://github.com/rohankhan-hue/portfolio.github.io
3. Click **Add file → Upload files**.
4. Open the unzipped folder and drag its **contents** into the upload area:
   `index.html`, `style.css`, `script.js` and the `assets` folder.
   ⚠️ Drag the files INSIDE the folder — not the folder itself. If you drag
   the parent folder, everything lands in a subfolder and the site breaks.
5. Click **Commit changes**.
6. Wait ~1 minute, then open
   https://rohankhan-hue.github.io/portfolio.github.io/
   and hard-refresh (Cmd+Shift+R / Ctrl+Shift+R).

Uploading `index.html` again automatically overwrites the old one — no need
to delete anything first.

## Editing later

- **Text, metrics, projects** → `index.html`. Each section is marked with a
  comment (HERO, ABOUT, IMPACT, WORK, CREATIVES, PROCESS, CONTACT).
  To add a project, copy a whole `<section class="case …">` block.
- **Colours & fonts** → the `:root { … }` block at the top of `style.css`.
- **Swap an image** → replace the file in `assets/images/` keeping the same
  filename, or change the `src` in `index.html`.
- **Big numbers** → in the IMPACT section, edit `data-count`, `data-suf`, etc.

## If you rename the repo

Renaming the repo to `rohankhan-hue.github.io` gives you the cleaner URL
`https://rohankhan-hue.github.io/`. If you do that, also update the two URLs
in `index.html` (`canonical` and `og:` tags) to the new address.
