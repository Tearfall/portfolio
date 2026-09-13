<script setup>
import { computed, watchEffect } from 'vue'
import { useColorMode } from '../lib/useColorMode'
import { useGallery } from '../lib/useGallery'
import { useContactForm } from '../lib/useContactForm'
import ProjectGallery from '../components/ProjectGallery.vue'
import ThemeToggle from '../components/ThemeToggle.vue'

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
//   surface   card and form fills
//   ink       body text, rules, outlined buttons
//   accent    the italic line in the headline, the eyebrow, underlines
//   accent2   the primary button, card labels, "View project" links
//   onAccent  text drawn on top of an accent fill — keep it readable
const PALETTE = {
  light: { bg: '#fafaf8', surface: '#ffffff', ink: '#1c1c1a', accent: '#f29e4c', accent2: '#048ba8', onAccent: '#ffffff' },
  dark:  { bg: '#14130f', surface: '#1e1c17', ink: '#f3f0e7', accent: '#f2a65a', accent2: '#45bcd4', onAccent: '#14130f' },
}

// Form errors are the one color that never belonged in the palette — the same
// red either way, just pitched for the background behind it.
const DANGER = { light: '#b3261e', dark: '#ff9a91' }

const { mode } = useColorMode()

const themeVars = computed(() => {
  const p = PALETTE[mode.value] || PALETTE.light
  return {
    '--bg': p.bg,
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
    <header class="hero">
      <p class="eyebrow">General Trias, Cavite, Philippines</p>
      <h1>Joar Crisostomo<br /><em>Full Stack Web Developer</em></h1>
      <p class="sub">I build features end to end database, API, and the interface someone actually clicks. Developing with modern web technologies to create efficient and user-friendly applications.</p>
      <div class="row">
        <a class="btn primary" href="mailto:crisostomo.mavijoar2003@gmail.com">Get in touch</a>
        <a class="btn ghost" href="https://drive.google.com/file/d/1plWkpb2rT4L09BubiSVy3pWSHB-nb1Or/view?usp=sharing" target="_blank" rel="noopener">Resume</a>
        <a class="btn ghost" href="https://github.com/tearfall" target="_blank" rel="noopener">GitHub</a>
        <a class="btn ghost" href="https://www.linkedin.com/in/mavi-joar-crisostomo/" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </header>

    <section class="section">
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
    </section>

    <section class="section">
      <h2>Projects</h2>
      <div class="cards">
        <article class="card">
          <button type="button" class="card-cover" @click="openGallery(financeShots, 'Finance Hub')">
            <img :src="financeLanding" class="card-img" alt="" />
            <span class="cover-hint">⤢ 8 photos</span>
          </button>
          <span class="tag">Web App</span>
          <h3>Finance Hub</h3>
          <p>An accounting module for administrators to manage invoicing, billing, general ledger entries, and financial reporting in one place. It replaces manual spreadsheet workflows with a centralized system for tracking transactions, generating reports, and keeping financial data synchronized across the platform.</p>
          <p class="note">Independent project · In progress</p>
          <a class="card-link" href="https://finance-hub-joar.fly.dev/" target="_blank" rel="noopener">View project ↗</a>
        </article>

        <article class="card">
          <button type="button" class="card-cover" @click="openGallery(talosShots, 'Talos')">
            <img :src="talos0" class="card-img" alt="" />
            <span class="cover-hint">⤢ 5 photos</span>
          </button>
          <span class="tag">Thesis</span>
          <h3>Talos</h3>
          <p>A data visualization and analysis tool — my capstone project. Designed the interface in Figma, then built it with Vue.js on top of an HTML/CSS/JS foundation.</p>
          <p class="note">Recognized: Outstanding Thesis/Capstone Defense, Dec 2024 · Best Software Development Project, Jul 2025</p>
          <a class="card-link" href="https://www.figma.com/design/L2IDrSvZnucxpGm6iszkm1/Talos?node-id=1161-508&amp;p=f&amp;t=fTl9He3SvYYraBZp-0" target="_blank" rel="noopener">View project ↗</a>
        </article>

        <article class="card">
          <button type="button" class="card-cover" @click="openGallery([nerdiCover], 'Nerdi')">
            <img :src="nerdiCover" class="card-img" alt="" />
            <span class="cover-hint">⤢ View image</span>
          </button>
          <span class="tag">Android</span>
          <h3>Nerdi</h3>
          <p>A study companion app with interactive flashcards and quiz-style review, built to make exam prep faster to set up and easier to stick with.</p>
          <p class="note">Group project</p>
          <a class="card-link" href="https://github.com/Tearfall/Nerdi" target="_blank" rel="noopener">View project ↗</a>
        </article>

        <article class="card">
          <button type="button" class="card-cover" @click="openGallery([promeeCover], 'Promee')">
            <img :src="promeeCover" class="card-img" alt="" />
            <span class="cover-hint">⤢ View image</span>
          </button>
          <span class="tag">Android</span>
          <h3>Promee</h3>
          <p>A personal productivity app pairing a Kanban board with the 3-2-1 rule, so tasks get prioritized instead of just listed.</p>
          <p class="note">Group project</p>
          <a class="card-link" href="https://github.com/Tearfall/Promee_Application" target="_blank" rel="noopener">View project ↗</a>
        </article>

        <article class="card">
          <button type="button" class="card-cover" @click="openGallery([mitolohiyaCover], 'Mitolohiya')">
            <img :src="mitolohiyaCover" class="card-img" alt="" />
            <span class="cover-hint">⤢ View image</span>
          </button>
          <span class="tag">Unity</span>
          <h3>Mitolohiya</h3>
          <p>A 2D pixel-art RPG with a world and story built around Philippine mythology — my first full game, end to end.</p>
          <p class="note">Group project</p>
          <a class="card-link" href="https://github.com/Tearfall/mito_dev" target="_blank" rel="noopener">View project ↗</a>
        </article>
      </div>
    </section>

    <section class="section">
      <h2>About</h2>
      <div class="about-copy">
        <p>The old me would've been worried about centering a div. He had no idea the hard part was everything behind it.</p>
        <p>I started out designing prototypes and building interfaces for web and mobile applications. Real-world problems taught me that a button has to work, not just look right. So I learned what sits behind it.</p>
        <p>The query that has to be correct, the screen that has to be clear — those are the parts I like, and they're usually the parts people skip.</p>
      </div>
    </section>

    <section id="contact" class="section">
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
    </section>

    <footer class="site-footer">
      <span>© {{ year }} Mavi Joar C. Crisostomo</span>
      <span>General Trias, Cavite, Philippines</span>
    </footer>

    <ProjectGallery :open="galleryOpen" :images="galleryImages" :title="galleryTitle" @close="closeGallery" />
  </div>
</template>

<style scoped>
.page { background: var(--bg); color: var(--ink); font-family: 'Bricolage Grotesque', sans-serif; min-height: 100vh; max-width: 880px; margin: 0 auto; padding: 4.5rem 1.5rem 0; }
.hero { text-align: center; margin-bottom: 3.5rem; }
.eyebrow { font-family: 'Space Mono', monospace; font-size: 13px; color: var(--accent); letter-spacing: 0.06em; margin-bottom: 1rem; text-transform: uppercase; }
.hero h1 { font-family: 'Fraunces', serif; font-size: clamp(2.4rem, 5.4vw, 3.6rem); font-weight: 500; line-height: 1.1; letter-spacing: -0.02em; margin: 0; }
.hero h1 em { font-style: italic; color: var(--accent); }
.sub { font-size: 1.1rem; max-width: 50ch; margin: 1.4rem auto 0; line-height: 1.6; color: color-mix(in srgb, var(--ink) 65%, transparent); }
.row { display: flex; gap: 0.85rem; margin-top: 2rem; justify-content: center; flex-wrap: wrap; }
.btn { font-family: 'Space Mono', monospace; font-size: 13px; padding: 0.75rem 1.4rem; border-radius: 999px; text-decoration: none; font-weight: 700; }
.btn.primary { background: var(--accent2); color: var(--on-accent); }
.btn.ghost { border: 1.5px solid var(--ink); color: var(--ink); }
.section { margin-top: 3.5rem; }
.section h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 1.5rem; border-bottom: 1px solid color-mix(in srgb, var(--ink) 15%, transparent); padding-bottom: 0.6rem; margin-bottom: 1.5rem; }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 1.1rem; }
.card { display: block; background: var(--surface); border-radius: 16px; padding: 1.2rem; text-decoration: none; color: inherit; border: 1px solid color-mix(in srgb, var(--ink) 8%, transparent); }
.card-img { width: 100%; height: 120px; object-fit: cover; border-radius: 10px; margin-bottom: 0.75rem; }
.card .tag { font-family: 'Space Mono', monospace; font-size: 10.5px; color: var(--accent2); text-transform: uppercase; letter-spacing: 0.06em; }
.card h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 1.15rem; margin: 0.4rem 0 0.3rem; }
.card p { font-size: 0.88rem; color: color-mix(in srgb, var(--ink) 60%, transparent); margin: 0; line-height: 1.5; }
.skill-group { margin-bottom: 1rem; }
.skill-group h4 { margin: 0 0 0.5rem; color: color-mix(in srgb, var(--ink) 55%, transparent); font-weight: 600; }
.pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pill { background: var(--surface); border: 1px solid color-mix(in srgb, var(--ink) 10%, transparent); padding: 0.35rem 0.85rem; border-radius: 999px; font-size: 0.85rem; }
.card .note { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: var(--accent2); margin-top: 0.5rem; line-height: 1.45; }
.about-copy p { margin: 0 0 1rem; line-height: 1.7; color: color-mix(in srgb, var(--ink) 70%, transparent); max-width: 68ch; }
.about-copy p:last-child { margin-bottom: 0; }
.card-cover { display: block; position: relative; width: 100%; padding: 0; border: 0; background: none; cursor: pointer; border-radius: 10px; overflow: hidden; margin-bottom: 0.75rem; }
.card-cover .card-img { margin-bottom: 0; display: block; }
.cover-hint { position: absolute; right: 0.5rem; bottom: 0.5rem; font-family: 'Space Mono', monospace; font-size: 0.66rem; background: color-mix(in srgb, var(--ink) 78%, transparent); color: var(--bg); padding: 0.3rem 0.65rem; border-radius: 999px; opacity: 0.85; transition: opacity 0.18s ease; }
.card-cover:hover .cover-hint, .card-cover:focus-visible .cover-hint { opacity: 1; }
.card-link { display: inline-block; margin-top: 0.7rem; font-family: 'Space Mono', monospace; font-size: 0.74rem; color: var(--accent2); text-decoration: none; }
.card-link:hover { text-decoration: underline; }
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
.site-footer { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; max-width: 640px; margin: 4rem auto 0; padding: 1.5rem 0 3rem; font-family: 'Space Mono', monospace; font-size: 0.75rem; color: color-mix(in srgb, var(--ink) 50%, transparent); }
@media (max-width: 720px) { .contact-grid { grid-template-columns: 1fr; } }
</style>
