# Portfolio

Personal portfolio of Mavi Joar Crisostomo. Vue 3 + Vite, fully static — no database,
no API keys, no admin panel. Everything on the page comes from one file.

## Editing the site

All content lives in [`src/data/portfolio.js`](src/data/portfolio.js): profile, projects,
skills, and the color palette. Edit that file, commit, done.

The page deliberately stops at projects and skills — work history, education and
awards live in the linked resume (`profile.resume_url`) rather than being
repeated here. The `about` copy carries the short narrative version.

## The page

One layout, in [`src/views/Portfolio.vue`](src/views/Portfolio.vue): a centered
hero, then skills, projects, about and a contact form. Cream page, serif
headline, rounded cards. [`src/views/Home.vue`](src/views/Home.vue) wraps it with
the palette and the footer; it is what resolves the light/dark colors onto
`<html>`.

## Light and dark mode

`PALETTE` in `portfolio.js` holds a light set and a dark set — the comments above
it say what each color slot is used for. Visitors flip between them with the icon
button in the corner; the choice is saved to `localStorage`, and a first-time
visitor gets whichever their operating system is set to. A small script in
`index.html` settles the mode before the first paint, so a dark-mode visitor
never sees a flash of the light page.

The button is [`src/components/ThemeToggle.vue`](src/components/ThemeToggle.vue)
and the shared state lives in
[`src/lib/useColorMode.js`](src/lib/useColorMode.js).

## Images

Project covers and the avatar are imported from `src/assets/` at the top of
`portfolio.js`. Drop a new image in `src/assets/projects/`, import it, and point a
project's `image_url` at it.

## Project galleries

Each project has a `gallery` array (Finance Hub has 8 screenshots, Talos 5).
Clicking a project's cover opens a lightbox on that array — arrow keys, swipe,
thumbnail strip, Esc to close.

The lightbox itself is [`src/components/ProjectGallery.vue`](src/components/ProjectGallery.vue)
and it reads the same palette, so it restyles itself with the rest of the site.
Its scrim stays dark in both modes on purpose, so the screenshots are always the
brightest thing on screen.

## Contact form

The form posts to `profile.formspree_url` in
[`src/data/portfolio.js`](src/data/portfolio.js); clear that value and the
section falls back to showing contact details without a form.

The submit logic lives in
[`src/lib/useContactForm.js`](src/lib/useContactForm.js) — sending / sent / error
states, Formspree validation messages, and a `_gotcha` honeypot.

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
