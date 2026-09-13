<script setup>
import { computed, watchEffect } from 'vue'
import { useColorMode } from '../lib/useColorMode'
import { useGallery } from '../lib/useGallery'
import { useContactForm } from '../lib/useContactForm'
import ProjectGallery from '../components/ProjectGallery.vue'
import ThemeToggle from '../components/ThemeToggle.vue'

import avatar from '../assets/profile.png'

import financeLanding from '../assets/projects/finance/landing.png'
import financeDashboard from '../assets/projects/finance/dashboard.png'
import financeCompany from '../assets/projects/finance/company.png'
import financeAccountTitles from '../assets/projects/finance/account-titles.png'
import financeTransaction from '../assets/projects/finance/transaction.png'
import financeEntry from '../assets/projects/finance/entry.png'
import financeImport from '../assets/projects/finance/import.png'
import financeReports from '../assets/projects/finance/reports.png'

import talos0 from '../assets/projects/talos/0.png'
import talos1 from '../assets/projects/talos/1.png'
import talos2 from '../assets/projects/talos/2.png'
import talos3 from '../assets/projects/talos/3.png'
import talos4 from '../assets/projects/talos/4.png'

import nerdiCover from '../assets/projects/nerdi.png'
import promeeCover from '../assets/projects/promee.png'
import mitolohiyaCover from '../assets/projects/mitolohiya.png'

// ------------------------------------------------------------
// COLOR PALETTE — one light set, one dark set.
// ------------------------------------------------------------
//   bg        page background
//   band      the tinted sections, so the page reads as blocks not one sheet
//   surface   card and form fills
//   ink       body text, rules, outlined buttons
//   accent    the italic line in the headline, the eyebrow, underlines
//   accent2   the primary button, card labels, "View project" links
//   onAccent  text drawn on top of an accent fill — keep it readable
const PALETTE = {
  light: { bg: '#fafaf8', band: '#f2eee4', surface: '#ffffff', ink: '#1c1c1a', accent: '#f29e4c', accent2: '#048ba8', onAccent: '#ffffff' },
  dark:  { bg: '#14130f', band: '#0e0d0a', surface: '#1e1c17', ink: '#f3f0e7', accent: '#f2a65a', accent2: '#45bcd4', onAccent: '#14130f' },
}

// Form errors are the one color that never belonged in the palette — the same
// red either way, just pitched for the background behind it.
const DANGER = { light: '#b3261e', dark: '#ff9a91' }

const { mode } = useColorMode()

const themeVars = computed(() => {
  const p = PALETTE[mode.value] || PALETTE.light
  return {
    '--bg': p.bg,
    '--band': p.band,
    '--surface': p.surface,
    '--ink': p.ink,
    '--accent': p.accent,
    '--accent2': p.accent2,
    '--on-accent': p.onAccent,
    '--danger': DANGER[mode.value],
  }
})

// Set on <html> rather than on .page so <body> and the overscroll strip past
// the end of the document get the same background.
watchEffect(() => {
  const style = document.documentElement.style
  for (const [name, value] of Object.entries(themeVars.value)) style.setProperty(name, value)
})

// The lightbox takes a list, so the multi-shot galleries stay as arrays.
// Everything else about a project is written straight into the markup below.
const financeShots = [
  financeLanding,
  financeDashboard,
  financeCompany,
  financeAccountTitles,
  financeTransaction,
  financeEntry,
  financeImport,
  financeReports,
]
const talosShots = [talos0, talos1, talos2, talos3, talos4]

const { galleryOpen, galleryImages, galleryTitle, openGallery, closeGallery } = useGallery()
const { form, error, sending, sent, submit, again } = useContactForm('https://formspree.io/f/mblojogz')

const year = new Date().getFullYear()
</script>

<template>
  <div class="page">
    <ThemeToggle />

    <header class="band hero-band">
      <div class="wrap hero">
        <p class="eyebrow">General Trias, Cavite, Philippines</p>
        <h1>Joar Crisostomo<br /><em>Full Stack Web Developer</em></h1>
        <p class="sub">I build features end to end database, API, and the interface someone actually clicks. Developing with modern web technologies to create efficient and user-friendly applications.</p>
        <div class="row">
          <a class="btn primary" href="mailto:crisostomo.mavijoar2003@gmail.com">Get in touch</a>
          <a class="btn ghost" href="https://drive.google.com/file/d/1plWkpb2rT4L09BubiSVy3pWSHB-nb1Or/view?usp=sharing" target="_blank" rel="noopener">Resume</a>
          <a class="btn ghost" href="https://github.com/tearfall" target="_blank" rel="noopener">GitHub</a>
          <a class="btn ghost" href="https://www.linkedin.com/in/mavi-joar-crisostomo/" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
    </header>

    <section class="band tint">
      <div class="wrap">
        <h2>Skills</h2>
        <div class="skill-group">
          <h4>Frontend</h4>
          <div class="pills">
            <span class="pill">Vue.js</span>
            <span class="pill">HTML &amp; CSS</span>
            <span class="pill">JavaScript</span>
            <span class="pill">Tailwind</span>
            <span class="pill">Bootstrap</span>
          </div>
        </div>
        <div class="skill-group">
          <h4>Backend</h4>
          <div class="pills">
            <span class="pill">PHP &amp; Laravel</span>
            <span class="pill">Java</span>
            <span class="pill">C#</span>
            <span class="pill">MySQL</span>
            <span class="pill">Firebase</span>
          </div>
        </div>
        <div class="skill-group">
          <h4>Tools</h4>
          <div class="pills">
            <span class="pill">Android Studio</span>
            <span class="pill">Unity</span>
            <span class="pill">Figma</span>
            <span class="pill">Git &amp; GitHub</span>
          </div>
        </div>
      </div>
    </section>

    <section class="band">
      <div class="wrap">
        <h2>Selected work</h2>
        <div class="cards">
          <article class="card">
            <button type="button" class="card-cover" @click="openGallery(financeShots, 'Finance Hub')">
              <img :src="financeLanding" class="card-img" alt="" />
              <span class="cover-hint">⤢ 8 photos</span>
            </button>
            <div class="card-body">
              <span class="tag">Web App</span>
              <h3>Finance Hub</h3>
              <p>An accounting module for administrators to manage invoicing, billing, general ledger entries, and financial reporting in one place. It replaces manual spreadsheet workflows with a centralized system for tracking transactions, generating reports, and keeping financial data synchronized across the platform.</p>
              <p class="note">Independent project · In progress</p>
              <a class="card-link" href="https://finance-hub-joar.fly.dev/" target="_blank" rel="noopener">View project ↗</a>
            </div>
          </article>

          <article class="card">
            <button type="button" class="card-cover" @click="openGallery(talosShots, 'Talos')">
              <img :src="talos0" class="card-img" alt="" />
              <span class="cover-hint">⤢ 5 photos</span>
            </button>
            <div class="card-body">
              <span class="tag">Thesis</span>
              <h3>Talos</h3>
              <p>A data visualization and analysis tool — my capstone project. Designed the interface in Figma, then built it with Vue.js on top of an HTML/CSS/JS foundation.</p>
              <p class="note">Recognized: Outstanding Thesis/Capstone Defense, Dec 2024 · Best Software Development Project, Jul 2025</p>
              <a class="card-link" href="https://www.figma.com/design/L2IDrSvZnucxpGm6iszkm1/Talos?node-id=1161-508&amp;p=f&amp;t=fTl9He3SvYYraBZp-0" target="_blank" rel="noopener">View project ↗</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="band flush">
      <div class="wrap">
        <h2>Also built</h2>
        <div class="mini-list">
          <div class="mini">
            <div class="mini-main">
              <h3>Nerdi</h3>
              <span class="mini-note">Group project</span>
            </div>
            <span class="mini-tech">Android Studio · Java · Figma</span>
            <div class="mini-actions">
              <button type="button" class="mini-btn" aria-label="View the Nerdi gallery" @click="openGallery([nerdiCover], 'Nerdi')">⤢ 1</button>
              <a class="mini-btn" href="https://github.com/Tearfall/Nerdi" target="_blank" rel="noopener" aria-label="Open Nerdi">↗</a>
            </div>
          </div>

          <div class="mini">
            <div class="mini-main">
              <h3>Promee</h3>
              <span class="mini-note">Group project</span>
            </div>
            <span class="mini-tech">Android Studio · Java · Figma</span>
            <div class="mini-actions">
              <button type="button" class="mini-btn" aria-label="View the Promee gallery" @click="openGallery([promeeCover], 'Promee')">⤢ 1</button>
              <a class="mini-btn" href="https://github.com/Tearfall/Promee_Application" target="_blank" rel="noopener" aria-label="Open Promee">↗</a>
            </div>
          </div>

          <div class="mini">
            <div class="mini-main">
              <h3>Mitolohiya</h3>
              <span class="mini-note">Group project</span>
            </div>
            <span class="mini-tech">Unity · C# · Figma</span>
            <div class="mini-actions">
              <button type="button" class="mini-btn" aria-label="View the Mitolohiya gallery" @click="openGallery([mitolohiyaCover], 'Mitolohiya')">⤢ 1</button>
              <a class="mini-btn" href="https://github.com/Tearfall/mito_dev" target="_blank" rel="noopener" aria-label="Open Mitolohiya">↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="band tint">
      <div class="wrap">
        <h2>About</h2>
        <div class="about-grid">
          <img
            class="about-photo"
            :src="avatar"
            alt="Joar Crisostomo"
            width="1080"
            height="1080"
            loading="lazy"
            decoding="async"
          />
          <div class="about-copy">
            <p>The old me would've been worried about centering a div. He had no idea the hard part was everything behind it.</p>
            <p>I started out designing prototypes and building interfaces for web and mobile applications. Real-world problems taught me that a button has to work, not just look right. So I learned what sits behind it.</p>
            <p>The query that has to be correct, the screen that has to be clear — those are the parts I like, and they're usually the parts people skip.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="band">
      <div class="wrap">
        <h2>Get in touch</h2>
        <div class="contact-grid">
          <div class="contact-side">
            <p class="contact-lead">Open to web development roles, freelance work, or just talking shop about a project.</p>
            <ul class="contact-facts">
              <li><span>Email</span><a href="mailto:crisostomo.mavijoar2003@gmail.com">crisostomo.mavijoar2003@gmail.com</a></li>
              <li><span>Phone</span><a href="tel:+639944185812">+63 994 418 5812</a></li>
              <li><span>Based in</span>General Trias, Cavite, Philippines</li>
            </ul>
            <div class="contact-socials">
              <a href="https://github.com/tearfall" target="_blank" rel="noopener">GitHub</a>
              <a href="https://www.linkedin.com/in/mavi-joar-crisostomo/" target="_blank" rel="noopener">LinkedIn</a>
              <a href="https://www.instagram.com/i.am.joar/" target="_blank" rel="noopener">Instagram</a>
            </div>
          </div>

          <form class="contact-card" @submit.prevent="submit">
            <template v-if="!sent">
              <label for="contact-name">Name</label>
              <input id="contact-name" v-model="form.name" type="text" required autocomplete="name" />
              <label for="contact-email">Email</label>
              <input id="contact-email" v-model="form.email" type="email" required autocomplete="email" />
              <label for="contact-subject">Subject</label>
              <input id="contact-subject" v-model="form.subject" type="text" required />
              <label for="contact-message">Message</label>
              <textarea id="contact-message" v-model="form.message" rows="5" required></textarea>
              <input class="gotcha" type="text" v-model="form._gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <button class="btn primary" type="submit" :disabled="sending">{{ sending ? 'Sending…' : 'Send message' }}</button>
              <p class="form-status error" v-if="error" role="status">{{ error }}</p>
            </template>
            <div class="form-done" v-else role="status">
              <p>Message sent — I'll get back to you soon.</p>
              <button class="btn ghost" type="button" @click="again">Send another</button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <footer class="band tint site-footer">
      <div class="wrap footer-inner">
        <span>© {{ year }} Mavi Joar C. Crisostomo</span>
        <span>General Trias, Cavite, Philippines</span>
      </div>
    </footer>

    <ProjectGallery :open="galleryOpen" :images="galleryImages" :title="galleryTitle" @close="closeGallery" />
  </div>
</template>

<style scoped>
.page { background: var(--bg); color: var(--ink); font-family: 'Bricolage Grotesque', sans-serif; min-height: 100vh; }

/* Full-bleed color bands divide the page; .wrap keeps the content measured. */
.band { padding: 3.5rem 0; }
.band.tint { background: var(--band); }
/* "Also built" continues the block above it, so it skips its own top padding. */
.band.flush { padding-top: 0; }
.wrap { max-width: 880px; margin: 0 auto; padding: 0 1.5rem; }

.hero-band { padding: 4.5rem 0 4rem; }
.hero { text-align: center; }
.eyebrow { font-family: 'Space Mono', monospace; font-size: 13px; color: var(--accent); letter-spacing: 0.06em; margin: 0 0 1rem; text-transform: uppercase; }
.hero h1 { font-family: 'Fraunces', serif; font-size: clamp(2.4rem, 5.4vw, 3.6rem); font-weight: 500; line-height: 1.1; letter-spacing: -0.02em; margin: 0; }
.hero h1 em { font-style: italic; color: var(--accent); }
.sub { font-size: 1.1rem; max-width: 50ch; margin: 1.4rem auto 0; line-height: 1.6; color: color-mix(in srgb, var(--ink) 65%, transparent); }
.row { display: flex; gap: 0.85rem; margin-top: 2rem; justify-content: center; flex-wrap: wrap; }
.btn { font-family: 'Space Mono', monospace; font-size: 13px; padding: 0.75rem 1.4rem; border-radius: 999px; text-decoration: none; font-weight: 700; }
.btn.primary { background: var(--accent2); color: var(--on-accent); }
.btn.ghost { border: 1.5px solid var(--ink); color: var(--ink); }

.wrap > h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 1.5rem; border-bottom: 1px solid color-mix(in srgb, var(--ink) 15%, transparent); padding-bottom: 0.6rem; margin: 0 0 1.5rem; }
.band.flush .wrap > h2 { font-size: 1.2rem; color: color-mix(in srgb, var(--ink) 72%, transparent); }

/* One project per row: cover on the left, copy on the right. */
.cards { display: flex; flex-direction: column; gap: 1.1rem; }
.card { display: flex; gap: 1.4rem; align-items: flex-start; background: var(--surface); border-radius: 16px; padding: 1.2rem; color: inherit; border: 1px solid color-mix(in srgb, var(--ink) 8%, transparent); }
.card-body { flex: 1; min-width: 0; }
/* Covers run 1.6-1.95 wide; a fixed ratio keeps every row the same. */
.card-img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 10px; display: block; }
.card .tag { font-family: 'Space Mono', monospace; font-size: 10.5px; color: var(--accent2); text-transform: uppercase; letter-spacing: 0.06em; }
.card h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 1.15rem; margin: 0.25rem 0 0.35rem; }
.card p { font-size: 0.88rem; color: color-mix(in srgb, var(--ink) 60%, transparent); margin: 0; line-height: 1.5; }
.card .note { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: var(--accent2); margin-top: 0.5rem; line-height: 1.45; }
.card-cover { flex: 0 0 280px; display: block; position: relative; padding: 0; border: 0; background: none; cursor: pointer; border-radius: 10px; overflow: hidden; }
.cover-hint { position: absolute; right: 0.5rem; bottom: 0.5rem; font-family: 'Space Mono', monospace; font-size: 0.66rem; background: color-mix(in srgb, var(--ink) 78%, transparent); color: var(--bg); padding: 0.3rem 0.65rem; border-radius: 999px; opacity: 0.85; transition: opacity 0.18s ease; }
.card-cover:hover .cover-hint, .card-cover:focus-visible .cover-hint { opacity: 1; }
.card-link { display: inline-block; margin-top: 0.7rem; font-family: 'Space Mono', monospace; font-size: 0.74rem; color: var(--accent2); text-decoration: none; }
.card-link:hover { text-decoration: underline; }

/* Everything not selected: one ruled line each, no cover art. */
.mini-list { display: flex; flex-direction: column; }
.mini { display: grid; grid-template-columns: 1fr auto auto; gap: 1rem; align-items: center; padding: 0.85rem 0; border-top: 1px solid color-mix(in srgb, var(--ink) 10%, transparent); }
.mini:first-child { border-top: 0; }
.mini-main { display: flex; align-items: baseline; gap: 0.6rem; flex-wrap: wrap; min-width: 0; }
.mini-main h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 1.05rem; margin: 0; }
.mini-note { font-family: 'Space Mono', monospace; font-size: 0.66rem; color: color-mix(in srgb, var(--ink) 45%, transparent); }
.mini-tech { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: color-mix(in srgb, var(--ink) 50%, transparent); }
.mini-actions { display: flex; gap: 0.4rem; }
.mini-btn { font-family: 'Space Mono', monospace; font-size: 0.72rem; line-height: 1; padding: 0.4rem 0.65rem; border: 1px solid color-mix(in srgb, var(--ink) 15%, transparent); border-radius: 999px; background: none; color: var(--accent2); text-decoration: none; cursor: pointer; }
.mini-btn:hover { border-color: var(--accent2); }

.skill-group { margin-bottom: 1rem; }
.skill-group:last-child { margin-bottom: 0; }
.skill-group h4 { margin: 0 0 0.5rem; color: color-mix(in srgb, var(--ink) 55%, transparent); font-weight: 600; }
.pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pill { background: var(--surface); border: 1px solid color-mix(in srgb, var(--ink) 10%, transparent); padding: 0.35rem 0.85rem; border-radius: 999px; font-size: 0.85rem; }

.about-grid { display: grid; grid-template-columns: 220px 1fr; gap: 2rem; align-items: start; }
/* height:auto is load-bearing — the width/height attributes on the img are
   presentational hints, and a fixed height would make aspect-ratio inert. */
.about-photo { width: 100%; height: auto; aspect-ratio: 1; object-fit: cover; border-radius: 16px; display: block; border: 1px solid color-mix(in srgb, var(--ink) 8%, transparent); }
.about-copy p { margin: 0 0 1rem; line-height: 1.7; color: color-mix(in srgb, var(--ink) 70%, transparent); max-width: 68ch; }
.about-copy p:last-child { margin-bottom: 0; }

.contact-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 2.5rem; align-items: start; }
.contact-lead { font-size: 1.02rem; line-height: 1.65; color: color-mix(in srgb, var(--ink) 65%, transparent); margin: 0 0 1.5rem; }
.contact-facts { list-style: none; padding: 0; margin: 0 0 1.5rem; display: flex; flex-direction: column; gap: 0.85rem; }
.contact-facts li { display: flex; flex-direction: column; gap: 0.15rem; font-size: 0.95rem; }
.contact-facts span { font-family: 'Space Mono', monospace; font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.08em; color: color-mix(in srgb, var(--ink) 50%, transparent); }
.contact-facts a { color: var(--ink); text-decoration: none; align-self: flex-start; border-bottom: 1px solid color-mix(in srgb, var(--accent) 65%, transparent); }
.contact-socials { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.contact-socials a { font-family: 'Space Mono', monospace; font-size: 0.72rem; border: 1.5px solid var(--ink); border-radius: 999px; padding: 0.4rem 0.95rem; text-decoration: none; color: var(--ink); }
.contact-socials a:hover { background: var(--ink); color: var(--bg); }
.contact-card { background: var(--surface); border: 1px solid color-mix(in srgb, var(--ink) 8%, transparent); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; }
.contact-card label { font-family: 'Space Mono', monospace; font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.06em; color: color-mix(in srgb, var(--ink) 55%, transparent); margin-bottom: 0.3rem; }
.contact-card input, .contact-card textarea { font-family: inherit; font-size: 0.95rem; color: var(--ink); background: var(--bg); border: 1px solid color-mix(in srgb, var(--ink) 12%, transparent); border-radius: 10px; padding: 0.6rem 0.8rem; margin-bottom: 1rem; resize: vertical; }
.contact-card input:focus, .contact-card textarea:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
.contact-card .btn { cursor: pointer; align-self: flex-start; }
.contact-card .btn.primary { border: 0; }
.contact-card .btn:disabled { opacity: 0.6; cursor: default; }
.gotcha { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.form-status { font-family: 'Space Mono', monospace; font-size: 0.75rem; margin: 0.6rem 0 0; }
.form-status.error { color: var(--danger); }
.form-done p { margin: 0 0 1rem; }

.site-footer { padding: 1.75rem 0 2.5rem; }
.footer-inner { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; font-family: 'Space Mono', monospace; font-size: 0.75rem; color: color-mix(in srgb, var(--ink) 50%, transparent); }

@media (max-width: 720px) {
  .contact-grid { grid-template-columns: 1fr; }
  .about-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .about-photo { max-width: 200px; }
}
@media (max-width: 620px) {
  .card { flex-direction: column; gap: 0.85rem; }
  .card-cover { flex: 0 0 auto; width: 100%; }
  /* Explicit placement: the tech line drops to its own row under the title. */
  .mini { grid-template-columns: 1fr auto; gap: 0.35rem 0.8rem; }
  .mini-main { grid-column: 1; grid-row: 1; }
  .mini-actions { grid-column: 2; grid-row: 1; }
  .mini-tech { grid-column: 1 / -1; grid-row: 2; }
}
</style>
