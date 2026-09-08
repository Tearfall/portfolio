<script setup>
import { computed } from 'vue'
import { techList, groupSkillsByCategory, galleryOf, projectLink, telHref } from '../../lib/portfolioHelpers'
import { useGallery } from '../../lib/useGallery'
import { useContactForm } from '../../lib/useContactForm'
import ProjectGallery from '../../components/ProjectGallery.vue'

const props = defineProps({
  profile: Object,
  projects: Array,
  experience: Array,
  education: Array,
  recognition: Array,
  skills: Array,
})

const skillsByCategory = computed(() => groupSkillsByCategory(props.skills))
const { galleryOpen, galleryImages, galleryTitle, openGallery, closeGallery } = useGallery()
const { form, error, sending, sent, submit, again } = useContactForm(() => props.profile?.formspree_url)
</script>

<template>
  <div class="a-page">
    <header class="hero">
      <p class="eyebrow" v-if="profile?.location">{{ profile.location }}</p>
      <h1>{{ profile?.name || 'Your Name' }}<br /><em>{{ profile?.title || 'Your Title' }}</em></h1>
      <p class="sub" v-if="profile?.bio">{{ profile.bio }}</p>
      <div class="row">
        <a v-if="profile?.email" class="btn primary" :href="`mailto:${profile.email}`">Get in touch</a>
        <a v-if="profile?.resume_url" class="btn ghost" :href="profile.resume_url" target="_blank">Resume</a>
        <a v-if="profile?.github_url" class="btn ghost" :href="profile.github_url" target="_blank">GitHub</a>
        <a v-if="profile?.linkedin_url" class="btn ghost" :href="profile.linkedin_url" target="_blank">LinkedIn</a>
      </div>
    </header>

    <section v-if="projects.length" class="section">
      <h2>Projects</h2>
      <div class="cards">
        <article v-for="p in projects" :key="p.id" class="card">
          <button v-if="p.image_url" type="button" class="card-cover" @click="openGallery(p)">
            <img :src="p.image_url" class="card-img" alt="" />
            <span class="cover-hint">⤢ {{ galleryOf(p).length > 1 ? galleryOf(p).length + ' photos' : 'View image' }}</span>
          </button>
          <span class="tag" v-if="p.kind || techList(p.tech_stack)[0]">{{ p.kind || techList(p.tech_stack)[0] }}</span>
          <h3>{{ p.title }}</h3>
          <p v-if="p.description">{{ p.description }}</p>
          <p class="note" v-if="p.note">{{ p.note }}</p>
          <a v-if="projectLink(p)" class="card-link" :href="projectLink(p)" target="_blank" rel="noopener">View project ↗</a>
        </article>
      </div>
    </section>

    <section v-if="experience.length" class="section">
      <h2>Experience</h2>
      <div class="entries">
        <div v-for="e in experience" :key="e.id" class="entry">
          <div class="entry-head"><strong>{{ e.role }}</strong> — {{ e.company }}<span class="dates">{{ e.start_date }} – {{ e.end_date || 'Present' }}</span></div>
          <p class="track" v-if="e.track">{{ e.track }}</p>
          <p v-if="e.description">{{ e.description }}</p>
        </div>
      </div>
    </section>

    <section v-if="education.length" class="section">
      <h2>Education</h2>
      <div class="entries">
        <div v-for="e in education" :key="e.id" class="entry">
          <div class="entry-head"><strong>{{ e.degree }}</strong> — {{ e.school }}<span class="dates">{{ e.start_date }} – {{ e.end_date }}</span></div>
          <p v-if="e.description">{{ e.description }}</p>
        </div>
      </div>
    </section>

    <section v-if="skills.length" class="section">
      <h2>Skills</h2>
      <div v-for="(list, cat) in skillsByCategory" :key="cat" class="skill-group">
        <h4>{{ cat }}</h4>
        <div class="pills">
          <span v-for="s in list" :key="s.id" class="pill">{{ s.name }}</span>
        </div>
      </div>
    </section>

    <section v-if="recognition?.length" class="section">
      <h2>Recognition</h2>
      <div class="entries">
        <div v-for="r in recognition" :key="r.id" class="entry">
          <div class="entry-head"><strong>{{ r.title }}</strong> — {{ r.issuer }}<span class="dates">{{ r.date }}</span></div>
        </div>
      </div>
    </section>

    <section v-if="profile?.about?.length" class="section">
      <h2>About</h2>
      <div class="about-copy">
        <p v-for="(para, i) in profile.about" :key="i">{{ para }}</p>
      </div>
    </section>
    <section id="contact" class="section contact-a" v-if="profile?.email">
      <h2>Get in touch</h2>
      <div class="contact-grid">
        <div class="contact-side">
          <p class="contact-lead">Open to web development roles, freelance work, or just talking shop about a project.</p>
          <ul class="contact-facts">
            <li v-if="profile?.email"><span>Email</span><a :href="`mailto:${profile.email}`">{{ profile.email }}</a></li>
            <li v-if="profile?.phone"><span>Phone</span><a :href="telHref(profile.phone)">{{ profile.phone }}</a></li>
            <li v-if="profile?.location"><span>Based in</span>{{ profile.location }}</li>
          </ul>
          <div class="contact-socials">
            <a v-if="profile?.github_url" :href="profile.github_url" target="_blank" rel="noopener">GitHub</a>
            <a v-if="profile?.linkedin_url" :href="profile.linkedin_url" target="_blank" rel="noopener">LinkedIn</a>
            <a v-if="profile?.instagram_url" :href="profile.instagram_url" target="_blank" rel="noopener">Instagram</a>
          </div>
        </div>

        <form class="contact-card" v-if="profile?.formspree_url" @submit.prevent="submit">
          <template v-if="!sent">
            <label for="a-name">Name</label>
            <input id="a-name" v-model="form.name" type="text" required autocomplete="name" />
            <label for="a-email">Email</label>
            <input id="a-email" v-model="form.email" type="email" required autocomplete="email" />
            <label for="a-subject">Subject</label>
            <input id="a-subject" v-model="form.subject" type="text" required />
            <label for="a-message">Message</label>
            <textarea id="a-message" v-model="form.message" rows="5" required></textarea>
            <input class="gotcha" :id="'a-gotcha'" type="text" v-model="form._gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" />
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

    <ProjectGallery :open="galleryOpen" :images="galleryImages" :title="galleryTitle" @close="closeGallery" />
  </div>
</template>

<style scoped>
.a-page { background: var(--bg); color: var(--ink); font-family: 'Bricolage Grotesque', sans-serif; max-width: 880px; margin: 0 auto; padding: 4.5rem 1.5rem 4rem; }
.hero { text-align: center; margin-bottom: 3.5rem; }
.eyebrow { font-family: 'Space Mono', monospace; font-size: 13px; color: var(--accent); letter-spacing: 0.06em; margin-bottom: 1rem; text-transform: uppercase; }
.hero h1 { font-family: 'Fraunces', serif; font-size: clamp(2.4rem, 5.4vw, 3.6rem); font-weight: 500; line-height: 1.1; letter-spacing: -0.02em; margin: 0; }
.hero h1 em { font-style: italic; color: var(--accent); }
.sub { font-size: 1.1rem; max-width: 50ch; margin: 1.4rem auto 0; line-height: 1.6; color: color-mix(in srgb, var(--ink) 65%, transparent); }
.row { display: flex; gap: 0.85rem; margin-top: 2rem; justify-content: center; flex-wrap: wrap; }
.btn { font-family: 'Space Mono', monospace; font-size: 13px; padding: 0.75rem 1.4rem; border-radius: 999px; text-decoration: none; font-weight: 700; }
.btn.primary { background: var(--accent2); color: white; }
.btn.ghost { border: 1.5px solid var(--ink); color: var(--ink); }
.section { margin-top: 3.5rem; }
.section h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 1.5rem; border-bottom: 1px solid color-mix(in srgb, var(--ink) 15%, transparent); padding-bottom: 0.6rem; margin-bottom: 1.5rem; }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 1.1rem; }
.card { display: block; background: var(--surface); border-radius: 16px; padding: 1.2rem; text-decoration: none; color: inherit; border: 1px solid color-mix(in srgb, var(--ink) 8%, transparent); }
.card-img { width: 100%; height: 120px; object-fit: cover; border-radius: 10px; margin-bottom: 0.75rem; }
.card .tag { font-family: 'Space Mono', monospace; font-size: 10.5px; color: var(--accent2); text-transform: uppercase; letter-spacing: 0.06em; }
.card h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 1.15rem; margin: 0.4rem 0 0.3rem; }
.card p { font-size: 0.88rem; color: color-mix(in srgb, var(--ink) 60%, transparent); margin: 0; line-height: 1.5; }
.entries { display: flex; flex-direction: column; gap: 1.2rem; }
.entry-head { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: baseline; }
.dates { margin-left: auto; font-family: 'Space Mono', monospace; font-size: 0.78rem; color: color-mix(in srgb, var(--ink) 55%, transparent); }
.entry p { margin: 0.3rem 0 0; color: color-mix(in srgb, var(--ink) 60%, transparent); line-height: 1.5; }
.skill-group { margin-bottom: 1rem; }
.skill-group h4 { margin: 0 0 0.5rem; color: color-mix(in srgb, var(--ink) 55%, transparent); font-weight: 600; }
.pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pill { background: var(--surface); border: 1px solid color-mix(in srgb, var(--ink) 10%, transparent); padding: 0.35rem 0.85rem; border-radius: 999px; font-size: 0.85rem; }
.card .note { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: var(--accent2); margin-top: 0.5rem; line-height: 1.45; }
.entry .track { margin: 0.3rem 0 0; font-size: 0.9rem; color: color-mix(in srgb, var(--ink) 55%, transparent); }
.about-copy p { margin: 0 0 1rem; line-height: 1.7; color: color-mix(in srgb, var(--ink) 70%, transparent); max-width: 68ch; }
.about-copy p:last-child { margin-bottom: 0; }
.card-cover { display: block; position: relative; width: 100%; padding: 0; border: 0; background: none; cursor: pointer; border-radius: 10px; overflow: hidden; margin-bottom: 0.75rem; }
.card-cover .card-img { margin-bottom: 0; display: block; }
.cover-hint { position: absolute; right: 0.5rem; bottom: 0.5rem; font-family: 'Space Mono', monospace; font-size: 0.66rem; background: color-mix(in srgb, var(--ink) 78%, transparent); color: var(--bg); padding: 0.3rem 0.65rem; border-radius: 999px; opacity: 0.85; transition: opacity 0.18s ease; }
.card-cover:hover .cover-hint, .card-cover:focus-visible .cover-hint { opacity: 1; }
.card-link { display: inline-block; margin-top: 0.7rem; font-family: 'Space Mono', monospace; font-size: 0.74rem; color: var(--accent2); text-decoration: none; }
.card-link:hover { text-decoration: underline; }
.contact-a .contact-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 2.5rem; align-items: start; }
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
.form-status.error { color: #b3261e; }
.form-done p { margin: 0 0 1rem; }
@media (max-width: 720px) { .contact-a .contact-grid { grid-template-columns: 1fr; } }
</style>
