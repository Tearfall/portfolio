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
const initials = computed(() => (props.profile?.name || '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join(''))
</script>

<template>
  <div class="d-page">
    <section class="d-hero">
      <div class="blob blob1"></div>
      <div class="blob blob2"></div>
      <span class="spark s1">✦</span>
      <span class="spark s2">✦</span>
      <img v-if="profile?.avatar_url" :src="profile.avatar_url" class="avatar" alt="" />
      <div v-else class="avatar avatar-fallback">{{ initials || '?' }}</div>
      <h1>Hi, I'm {{ profile?.name || 'Your Name' }}.<br />{{ profile?.title || 'I build things.' }}</h1>
      <p class="sub-d" v-if="profile?.bio">{{ profile.bio }}</p>
      <div class="pill-row">
        <span v-for="s in skills.slice(0, 6)" :key="s.id" class="pill">{{ s.name }}</span>
      </div>
      <div class="link-row">
        <a v-if="profile?.email" :href="`mailto:${profile.email}`">Email</a>
        <a v-if="profile?.github_url" :href="profile.github_url" target="_blank">GitHub</a>
        <a v-if="profile?.linkedin_url" :href="profile.linkedin_url" target="_blank">LinkedIn</a>
        <a v-if="profile?.resume_url" :href="profile.resume_url" target="_blank">Resume</a>
      </div>
    </section>

    <section v-if="projects.length" class="section">
      <h2>Things I've made</h2>
      <div class="cards">
        <article v-for="p in projects" :key="p.id" class="card">
          <button v-if="p.image_url" type="button" class="card-cover" @click="openGallery(p)">
            <img :src="p.image_url" class="card-img" alt="" />
            <span class="cover-hint">⤢ {{ galleryOf(p).length > 1 ? galleryOf(p).length + ' photos' : 'View image' }}</span>
          </button>
          <span class="kind" v-if="p.kind">{{ p.kind }}</span>
          <h3>{{ p.title }}</h3>
          <p v-if="p.description">{{ p.description }}</p>
          <p class="note" v-if="p.note">{{ p.note }}</p>
          <div class="chip-row" v-if="techList(p.tech_stack).length">
            <span v-for="t in techList(p.tech_stack)" :key="t" class="chip">{{ t }}</span>
          </div>
          <a v-if="projectLink(p)" class="card-link" :href="projectLink(p)" target="_blank" rel="noopener">View project ↗</a>
        </article>
      </div>
    </section>

    <section v-if="experience.length" class="section">
      <h2>Experience</h2>
      <div class="entries">
        <div v-for="e in experience" :key="e.id" class="entry">
          <strong>{{ e.role }}</strong> — {{ e.company }}
          <span class="dates">{{ e.start_date }} – {{ e.end_date || 'Present' }}</span>
          <p class="track" v-if="e.track">{{ e.track }}</p>
          <p v-if="e.description">{{ e.description }}</p>
        </div>
      </div>
    </section>

    <section v-if="education.length" class="section">
      <h2>Education</h2>
      <div class="entries">
        <div v-for="e in education" :key="e.id" class="entry">
          <strong>{{ e.degree }}</strong> — {{ e.school }}
          <span class="dates">{{ e.start_date }} – {{ e.end_date }}</span>
          <p v-if="e.description">{{ e.description }}</p>
        </div>
      </div>
    </section>
    <section v-if="recognition?.length" class="section">
      <h2>Recognition</h2>
      <div class="entries">
        <div v-for="r in recognition" :key="r.id" class="entry">
          <strong>{{ r.title }}</strong> — {{ r.issuer }}
          <span class="dates">{{ r.date }}</span>
        </div>
      </div>
    </section>

    <section v-if="profile?.about?.length" class="section">
      <h2>About</h2>
      <div class="entries">
        <div class="entry about-copy">
          <p v-for="(para, i) in profile.about" :key="i">{{ para }}</p>
        </div>
      </div>
    </section>
    <section id="contact" class="section contact-d" v-if="profile?.email">
      <h2>Say hi <span class="spark-inline">✦</span></h2>
      <div class="contact-d-wrap">
        <div class="blob blob3"></div>
        <div class="contact-d-card">
          <p class="contact-d-lead">Got a role, a project, or just a question? Drop me a line — I read everything.</p>
          <div class="chip-row contact-chips">
            <a class="chip chip-link" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
            <span class="chip" v-if="profile?.location">{{ profile.location }}</span>
          </div>

          <form v-if="profile?.formspree_url" @submit.prevent="submit">
            <template v-if="!sent">
              <div class="d-row">
                <input id="d-name" v-model="form.name" type="text" placeholder="Your name" required autocomplete="name" aria-label="Name" />
                <input id="d-email" v-model="form.email" type="email" placeholder="Your email" required autocomplete="email" aria-label="Email" />
              </div>
              <input id="d-subject" v-model="form.subject" type="text" placeholder="Subject" required aria-label="Subject" />
              <textarea id="d-message" v-model="form.message" rows="4" placeholder="What's on your mind?" required aria-label="Message"></textarea>
            <input class="gotcha" :id="'d-gotcha'" type="text" v-model="form._gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <button class="d-send" type="submit" :disabled="sending">{{ sending ? 'Sending…' : 'Send it ✦' }}</button>
              <p class="form-status error" v-if="error" role="status">{{ error }}</p>
            </template>
            <div class="form-done" v-else role="status">
              <p>Sent! ✦ I'll get back to you soon.</p>
              <button class="d-send" type="button" @click="again">Send another</button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <ProjectGallery :open="galleryOpen" :images="galleryImages" :title="galleryTitle" @close="closeGallery" />
  </div>
</template>

<style scoped>
.d-page { font-family: 'Bricolage Grotesque', sans-serif; color: var(--ink); background: var(--bg); }
.d-hero { position: relative; overflow: hidden; text-align: center; padding: 4.5rem 1.5rem 3.5rem; }
.blob { position: absolute; border-radius: 50%; opacity: 0.9; }
.blob1 { width: 220px; height: 220px; background: var(--accent); top: -50px; left: -50px; }
.blob2 { width: 160px; height: 160px; background: var(--accent2); bottom: -30px; right: 8%; }
.spark { position: absolute; font-size: 1.6rem; color: var(--accent2); }
.s1 { top: 12%; right: 14%; }
.s2 { bottom: 16%; left: 12%; font-size: 1.1rem; }
.avatar { position: relative; width: 92px; height: 92px; border-radius: 50%; object-fit: cover; border: 4px solid var(--ink); margin-bottom: 1.5rem; }
.avatar-fallback { display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 700; background: var(--accent); color: white; }
.d-hero h1 { position: relative; font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(2.2rem, 5vw, 3rem); line-height: 1.15; max-width: 16ch; margin: 0 auto; }
.sub-d { position: relative; max-width: 42ch; margin: 1.2rem auto 0; font-size: 1.02rem; line-height: 1.6; color: color-mix(in srgb, var(--ink) 65%, transparent); }
.pill-row { position: relative; display: flex; gap: 0.55rem; justify-content: center; margin-top: 1.75rem; flex-wrap: wrap; }
.pill-row .pill { background: var(--ink); color: var(--bg); font-family: 'Space Mono', monospace; font-size: 12px; padding: 0.5rem 1rem; border-radius: 999px; }
.link-row { position: relative; display: flex; gap: 1.1rem; justify-content: center; margin-top: 1.5rem; font-family: 'Space Mono', monospace; font-size: 0.82rem; }
.link-row a { color: var(--ink); text-decoration: none; border-bottom: 1px solid transparent; }
.link-row a:hover { border-color: var(--accent); }
.section { max-width: 820px; margin: 0 auto; padding: 3rem 1.5rem 0; }
.section h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 1.5rem; text-align: center; margin-bottom: 1.75rem; }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.1rem; }
.card { display: block; background: var(--surface); border-radius: 20px; padding: 1.2rem; text-decoration: none; color: inherit; border: 1px solid color-mix(in srgb, var(--ink) 8%, transparent); }
.card-img { width: 100%; height: 120px; object-fit: cover; border-radius: 12px; margin-bottom: 0.75rem; }
.card h3 { margin: 0 0 0.3rem; font-size: 1.05rem; font-weight: 700; }
.card p { margin: 0; font-size: 0.88rem; color: color-mix(in srgb, var(--ink) 60%, transparent); line-height: 1.5; }
.chip-row { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.6rem; }
.chip { font-family: 'Space Mono', monospace; font-size: 0.68rem; padding: 0.2rem 0.6rem; background: color-mix(in srgb, var(--accent) 18%, transparent); color: var(--ink); border-radius: 999px; }
.entries { display: flex; flex-direction: column; gap: 1.2rem; }
.entry { background: var(--surface); border-radius: 14px; padding: 1rem 1.2rem; border: 1px solid color-mix(in srgb, var(--ink) 8%, transparent); }
.dates { float: right; font-family: 'Space Mono', monospace; font-size: 0.78rem; color: color-mix(in srgb, var(--ink) 55%, transparent); }
.entry p { margin: 0.4rem 0 0; color: color-mix(in srgb, var(--ink) 60%, transparent); line-height: 1.5; clear: both; }
.card .kind { display: block; font-family: 'Space Mono', monospace; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent2); margin-bottom: 0.25rem; }
.card .note { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--accent2); margin-top: 0.5rem; line-height: 1.45; }
.entry .track { color: color-mix(in srgb, var(--ink) 55%, transparent); font-size: 0.9rem; }
.about-copy p { margin: 0 0 0.9rem; }
.about-copy p:last-child { margin-bottom: 0; }
.card-cover { display: block; position: relative; width: 100%; padding: 0; border: 0; background: none; cursor: pointer; border-radius: 12px; overflow: hidden; margin-bottom: 0.75rem; }
.card-cover .card-img { margin-bottom: 0; display: block; }
.cover-hint { position: absolute; right: 0.55rem; bottom: 0.55rem; font-family: 'Space Mono', monospace; font-size: 0.66rem; background: var(--ink); color: var(--bg); padding: 0.32rem 0.7rem; border-radius: 999px; opacity: 0.88; transition: opacity 0.18s ease, background 0.18s ease; }
.card-cover:hover .cover-hint, .card-cover:focus-visible .cover-hint { opacity: 1; background: var(--accent2); }
.card-link { display: inline-block; margin-top: 0.7rem; font-family: 'Space Mono', monospace; font-size: 0.72rem; color: var(--accent2); text-decoration: none; }
.card-link:hover { text-decoration: underline; }
.contact-d h2 .spark-inline { color: var(--accent2); }
.contact-d-wrap { position: relative; padding: 1rem 0 0; }
.blob3 { width: 200px; height: 200px; background: var(--accent); top: -40px; right: -30px; position: absolute; opacity: 0.55; filter: blur(2px); }
.contact-d-card { position: relative; background: var(--surface); border: 1px solid color-mix(in srgb, var(--ink) 8%, transparent); border-radius: 24px; padding: 1.75rem; max-width: 620px; margin: 0 auto; }
.contact-d-lead { margin: 0 0 1rem; font-size: 1rem; line-height: 1.6; color: color-mix(in srgb, var(--ink) 65%, transparent); }
.contact-chips { margin-bottom: 1.25rem; }
.chip-link { text-decoration: none; background: color-mix(in srgb, var(--accent2) 20%, transparent); }
.contact-d-card form { display: flex; flex-direction: column; gap: 0.8rem; }
.d-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; }
.contact-d-card input, .contact-d-card textarea { font-family: inherit; font-size: 0.95rem; color: var(--ink); background: var(--bg); border: 1px solid color-mix(in srgb, var(--ink) 10%, transparent); border-radius: 14px; padding: 0.7rem 1rem; resize: vertical; }
.contact-d-card input:focus, .contact-d-card textarea:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
.d-send { align-self: flex-start; background: var(--ink); color: var(--bg); border: 0; border-radius: 999px; font-family: 'Space Mono', monospace; font-size: 0.82rem; padding: 0.75rem 1.6rem; cursor: pointer; }
.d-send:hover { background: var(--accent2); }
.d-send:disabled { opacity: 0.55; cursor: default; }
.gotcha { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.form-status { font-family: 'Space Mono', monospace; font-size: 0.75rem; margin: 0; }
.form-status.error { color: #b3261e; }
.form-done p { margin: 0 0 1rem; }
@media (max-width: 560px) { .d-row { grid-template-columns: 1fr; } .blob3 { display: none; } }
</style>
