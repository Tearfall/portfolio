# Portfolio

Personal portfolio of Mavi Joar Crisostomo. Vue 3 + Vite, fully static — no database,
no API keys, no admin panel. Everything on the page comes from one file.

## Editing the site

All content lives in [`src/data/portfolio.js`](src/data/portfolio.js): profile, projects,
experience, education, recognition, skills, colors, and the active theme. Edit that
file, commit, done.

## Switching themes

Six layouts are available. Pick one by changing a single number at the top of
`src/data/portfolio.js`:

```js
export const ACTIVE_THEME = 5
```

| # | Theme | Look |
|---|-------|------|
| 1 | Warm editorial | Cream page, serif headline, rounded cards |
| 2 | Structural grid | Bold uppercase, monospace labels, ruled rows |
| 3 | Dark split | Dark sidebar next to a deep panel |
| 4 | Playful organic | Bright page, floating color blobs, pill tags |
| 5 | Minimal centered | Quiet centered layout, single accent line |
| 6 | Bauhaus blocks | Full-bleed grid of solid color tiles |

Every theme reads the same data and the same `PALETTE` (also in `portfolio.js`), so
switching is safe — nothing else needs to change. The comments next to `PALETTE`
explain how each theme uses each color.

## Images

Project covers and the avatar are imported from `src/assets/` at the top of
`portfolio.js`. Drop a new image in `src/assets/projects/`, import it, and point a
project's `image_url` at it.

## Project galleries

Each project has a `gallery` array (Finance Hub has 8 screenshots, Talos 5).
Clicking a project's cover opens a lightbox on that array — arrow keys, swipe,
thumbnail strip, Esc to close. All six themes have it; only the trigger differs
(a hover pill on the card themes, a `⤢ 8` button on the list themes).

The lightbox itself is [`src/components/ProjectGallery.vue`](src/components/ProjectGallery.vue)
and it reads the same `PALETTE`, so it restyles itself with the rest of the site.

## Contact form

Each theme has its own contact section — different layout, different copy,
different field styling. They all post to `profile.formspree_url` in
[`src/data/portfolio.js`](src/data/portfolio.js); clear that value and each
theme falls back to showing contact details without a form.

The submit logic is shared in
[`src/lib/useContactForm.js`](src/lib/useContactForm.js) (sending / sent / error
states, Formspree validation messages, a `_gotcha` honeypot), so a fix there
applies to all six.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes to GitHub Pages. The site is served under `/portfolio/`
(`base` in `vite.config.js`); change that if the repo name changes.
