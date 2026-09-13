# Portfolio

Personal portfolio of Mavi Joar Crisostomo. Vue 3 + Vite, fully static — no
database, no API keys, no admin panel, and no content layer: the page is written
directly in its template.

## Editing the site

Everything on the page lives in
[`src/views/Portfolio.vue`](src/views/Portfolio.vue) — the hero copy, the skills,
the projects, the about text and the contact details are all plain markup. Edit
it, commit, done.

It used to read from a `portfolio.js` data file, which existed so six alternate
layouts could share one set of content. With one layout left, the indirection
cost more than it saved.

The page deliberately stops at projects and skills — work history, education and
awards live in the linked resume rather than being repeated here. The About copy
carries the short narrative version.

## The page

One column: a centered hero, then skills, projects, about and a contact form.
Cream page, serif headline, rounded cards.

## Light and dark mode

The `PALETTE` const at the top of `Portfolio.vue` holds a light set and a dark
set; the comment above it says what each color slot does. Visitors flip between
them with the icon button in the corner; the choice is saved to `localStorage`,
and a first-time visitor gets whichever their operating system is set to. A small
script in `index.html` settles the mode before the first paint, so a dark-mode
visitor never sees a flash of the light page.

The button is [`src/components/ThemeToggle.vue`](src/components/ThemeToggle.vue)
and the shared state lives in
[`src/lib/useColorMode.js`](src/lib/useColorMode.js).

## Images

Project covers and the avatar are imported at the top of `Portfolio.vue`. Drop a
new image in `src/assets/projects/`, import it, and reference it in the markup.

## Project galleries

Clicking a project's cover opens a lightbox — arrow keys, swipe, thumbnail strip,
Esc to close. The multi-shot galleries are the two arrays near the top of
`Portfolio.vue`; `openGallery(images, title)` takes it from there.

The lightbox itself is
[`src/components/ProjectGallery.vue`](src/components/ProjectGallery.vue). Its
scrim stays dark in both modes on purpose, so the screenshots are always the
brightest thing on screen.

## Contact form

The form posts to the Formspree endpoint passed to `useContactForm` in
`Portfolio.vue`. The submit logic lives in
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
