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
const tileClasses = ['t1', 't2', 't3', 't4', 't5']
</script>

<template>
  <div class="f-page">
    <div class="grid-block hero-row">
      <div class="cell hero t5">
        <span class="label">Portfolio</span>
        <h1>{{ profile?.name || 'Your Name' }} — {{ profile?.title || 'Your Title' }}</h1>
      </div>
      <div class="cell photo-cell">
        <img v-if="profile?.avatar_url" :src="profile.avatar_url" alt="" />
        <div v-else class="photo-placeholder">Photo</div>
      </div>
    </div>

    <div class="grid-block fact-row">
      <div class="cell fact t1" v-if="profile?.location">
        <span class="k">Based in</span><span class="v">{{ profile.location }}</span>
      </div>
      <div class="cell fact t2" v-if="profile?.email">
        <span class="k">Contact</span><a class="v link" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
      </div>
      <div class="cell fact t3" v-if="skills.length">
        <span class="k">Stack</span><span class="v">{{ skills.slice(0, 3).map(s => s.name).join(' · ') }}</span>
      </div>
      <div class="cell fact t4">
        <span class="k">Links</span>
        <div class="v links">
          <a v-if="profile?.github_url" :href="profile.github_url" target="_blank">GitHub</a>
          <a v-if="profile?.linkedin_url" :href="profile.linkedin_url" target="_blank">LinkedIn</a>
          <a v-if="profile?.resume_url" :href="profile.resume_url" target="_blank">Resume</a>
          <a v-if="profile?.website_url" :href="profile.website_url" target="_blank">Site</a>
        </div>
      </div>
    </div>

    <div class="grid-block bio-row" v-if="profile?.bio">
      <div class="cell bio t5"><p>{{ profile.bio }}</p></div>
    </div>

    <section v-if="projects.length" class="section">
      <h2>Selected work</h2>
      <div class="grid-block projects-grid">
        <article v-for="(p, i) in projects" :key="p.id" class="cell project" :class="tileClasses[i % tileClasses.length]">
          <button v-if="p.image_url" type="button" class="proj-img-wrap" @click="openGallery(p)" :aria-label="`Open ${p.title} gallery`">
            <img :src="p.image_url" alt="" />
            <span class="img-hint">⤢ {{ galleryOf(p).length }}</span>
          </button>
          <div class="proj-body">
            <span class="kind" v-if="p.kind">{{ p.kind }}</span>
            <h3>{{ p.title }}</h3>
            <p v-if="p.description">{{ p.description }}</p>
            <p class="note" v-if="p.note">{{ p.note }}</p>
            <div class="chip-row" v-if="techList(p.tech_stack).length">
              <span v-for="t in techList(p.tech_stack)" :key="t" class="chip">{{ t }}</span>
            </div>
            <a v-if="projectLink(p)" class="proj-link" :href="projectLink(p)" target="_blank" rel="noopener">View project ↗</a>
          </div>
        </article>
      </div>
    </section>

    <section v-if="experience.length" class="section">
      <h2>Experience</h2>
      <div class="stack-block">
        <div v-for="e in experience" :key="e.id" class="stack-row">
          <span class="dates">{{ e.start_date }} – {{ e.end_date || 'Present' }}</span>
          <div class="stack-main"><strong>{{ e.role }}</strong><span class="org">{{ e.company }}</span></div>
          <p class="track" v-if="e.track">{{ e.track }}</p>
          <p>{{ e.description }}</p>
        </div>
      </div>
    </section>

    <section v-if="education.length" class="section">
      <h2>Education</h2>
      <div class="stack-block">
        <div v-for="e in education" :key="e.id" class="stack-row">
          <span class="dates">{{ e.start_date }} – {{ e.end_date }}</span>
          <div class="stack-main"><strong>{{ e.degree }}</strong><span class="org">{{ e.school }}</span></div>
          <p>{{ e.description }}</p>
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
      <div class="stack-block">
        <div v-for="r in recognition" :key="r.id" class="stack-row">
          <span class="dates">{{ r.date }}</span>
          <div class="stack-main"><strong>{{ r.title }}</strong><span class="org">{{ r.issuer }}</span></div>
        </div>
      </div>
    </section>

    <section v-if="profile?.about?.length" class="section">
      <h2>About</h2>
      <div class="grid-block bio-row">
        <div class="cell about t5">
          <p v-for="(para, i) in profile.about" :key="i">{{ para }}</p>
        </div>
      </div>
    </section>
    <section id="contact" class="section contact-f" v-if="profile?.email">
      <h2>Contact</h2>
      <div class="grid-block contact-f-row">
        <div class="cell contact-hero t5">
          <span class="label">Say hello</span>
          <p class="contact-f-lead">Open to roles, freelance work, or just talking shop about a project.</p>
        </div>
        <div class="cell fact t1" v-if="profile?.email">
          <span class="k">Email</span><a class="v link" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </div>
        <div class="cell fact t2" v-if="profile?.phone">
          <span class="k">Phone</span><a class="v link" :href="telHref(profile.phone)">{{ profile.phone }}</a>
        </div>
      </div>

      <div class="grid-block contact-f-form-row" v-if="profile?.formspree_url">
        <div class="cell contact-form-cell">
          <form @submit.prevent="submit">
            <template v-if="!sent">
              <div class="f-row">
                <div class="f-field"><label for="f-name">Name</label><input id="f-name" v-model="form.name" type="text" required autocomplete="name" /></div>
                <div class="f-field"><label for="f-email">Email</label><input id="f-email" v-model="form.email" type="email" required autocomplete="email" /></div>
              </div>
              <div class="f-field"><label for="f-subject">Subject</label><input id="f-subject" v-model="form.subject" type="text" required /></div>
              <div class="f-field"><label for="f-message">Message</label><textarea id="f-message" v-model="form.message" rows="4" required></textarea></div>
            <input class="gotcha" :id="'f-gotcha'" type="text" v-model="form._gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <button class="f-send" type="submit" :disabled="sending">{{ sending ? 'SENDING…' : 'SEND MESSAGE' }}</button>
              <p class="form-status error" v-if="error" role="status">{{ error }}</p>
            </template>
            <div class="form-done" v-else role="status">
              <p>MESSAGE SENT — I'll get back to you soon.</p>
              <button class="f-send" type="button" @click="again">SEND ANOTHER</button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <ProjectGallery :open="galleryOpen" :images="galleryImages" :title="galleryTitle" @close="closeGallery" />
  </div>
</template>

<style scoped>
.f-page { font-family: 'Bricolage Grotesque', sans-serif; color: var(--ink); background: var(--bg); max-width: 1040px; margin: 0 auto; }
.grid-block { display: grid; }
.hero-row { grid-template-columns: 2fr 1fr; }
.fact-row { grid-template-columns: repeat(4, 1fr); }
.bio-row { grid-template-columns: 1fr; }
.projects-grid { grid-template-columns: repeat(3, 1fr); }
.cell { padding: 2rem 1.75rem; display: flex; flex-direction: column; justify-content: center; border: 1px solid var(--ink); margin: -1px 0 0 -1px; }

.t1 { background: var(--accent); color: white; }
.t2 { background: var(--accent2); color: white; }
.t3 { background: color-mix(in srgb, var(--accent) 55%, var(--accent2)); color: white; }
.t4 { background: color-mix(in srgb, var(--accent2) 40%, white 45%); color: var(--ink); }
.t5 { background: var(--ink); color: var(--bg); }

.hero.t5 { min-height: 240px; }
.hero .label { font-family: 'Space Mono', monospace; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.85; margin-bottom: 0.75rem; }
.hero h1 { font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(1.8rem, 3.4vw, 2.6rem); line-height: 1.15; margin: 0; }

.photo-cell { padding: 0; overflow: hidden; background: var(--ink); align-items: stretch; }
.photo-cell img { width: 100%; height: 100%; object-fit: cover; display: block; min-height: 240px; }
.photo-placeholder { color: var(--bg); font-family: 'Space Mono', monospace; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; width: 100%; min-height: 240px; opacity: 0.5; }

.fact { min-height: 130px; }
.fact .k { font-family: 'Space Mono', monospace; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.8; margin-bottom: 0.5rem; }
.fact .v { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 1.05rem; word-break: break-word; }
.fact .v.link { text-decoration: none; color: inherit; }
.fact .links { display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.85rem; }
.fact .links a { color: inherit; text-decoration: none; }
.fact .links a:hover { text-decoration: underline; }

.bio.t5 { min-height: 140px; }
.bio p { font-size: 1.15rem; line-height: 1.6; max-width: 68ch; margin: 0; font-family: 'Fraunces', serif; font-weight: 400; }

.section { max-width: 1040px; margin: 0 auto; padding: 3.5rem 0 0; }
.section h2 { font-family: 'Space Mono', monospace; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: color-mix(in srgb, var(--ink) 60%, transparent); margin: 0 0 1.25rem; padding: 0 0.25rem; }

.project { text-decoration: none; align-items: stretch; padding: 0; min-height: 230px; }
.proj-img-wrap { height: 130px; overflow: hidden; }
.proj-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
.proj-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
.project h3 { margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.15rem; }
.project p { margin: 0; font-size: 0.88rem; line-height: 1.5; opacity: 0.9; }
.chip-row { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: auto; padding-top: 0.5rem; }
.chip { font-family: 'Space Mono', monospace; font-size: 0.68rem; padding: 0.2rem 0.55rem; background: rgba(0,0,0,0.15); border-radius: 999px; }

.stack-block { border: 1px solid var(--ink); }
.stack-row { display: grid; grid-template-columns: 140px 1fr; gap: 0.5rem 1.5rem; padding: 1.2rem 1.5rem; border-bottom: 1px solid var(--ink); background: var(--surface, #fff); }
.stack-row:last-child { border-bottom: none; }
.stack-row .dates { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: color-mix(in srgb, var(--ink) 55%, transparent); }
.stack-main { display: flex; flex-direction: column; }
.stack-main strong { font-size: 1.05rem; }
.stack-main .org { color: var(--accent); font-weight: 700; font-size: 0.85rem; }
.stack-row p { grid-column: 2; margin: 0.3rem 0 0; color: color-mix(in srgb, var(--ink) 55%, transparent); line-height: 1.55; font-size: 0.92rem; }

.skill-group { margin-bottom: 1.25rem; }
.skill-group h4 { margin: 0 0 0.6rem; font-family: 'Space Mono', monospace; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: color-mix(in srgb, var(--ink) 55%, transparent); padding: 0 0.25rem; }
.pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pill { background: var(--ink); color: var(--bg); padding: 0.4rem 0.9rem; font-size: 0.82rem; font-weight: 600; font-family: 'Space Mono', monospace; }

@media (max-width: 760px) {
  .hero-row, .fact-row, .projects-grid { grid-template-columns: 1fr; }
  .stack-row { grid-template-columns: 1fr; }
  .stack-row p { grid-column: 1; }
}
.project .kind { font-family: 'Space Mono', monospace; font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.75; }
.project .note { font-size: 0.75rem; opacity: 0.85; line-height: 1.5; }
.stack-row .track { margin: 0.2rem 0 0; font-size: 0.88rem; font-style: italic; }
.about.t5 { min-height: 140px; gap: 1rem; }
.about p { font-size: 1rem; line-height: 1.7; max-width: 72ch; margin: 0; }
button.proj-img-wrap { display: block; width: 100%; padding: 0; border: 0; background: none; cursor: pointer; position: relative; }
.img-hint { position: absolute; right: 8px; bottom: 8px; font-family: 'Space Mono', monospace; font-size: 0.65rem; background: var(--ink); color: var(--bg); padding: 0.2rem 0.5rem; }
button.proj-img-wrap:hover .img-hint { background: var(--accent); color: var(--ink); }
.proj-link { margin-top: 0.6rem; font-family: 'Space Mono', monospace; font-size: 0.7rem; color: inherit; text-decoration: underline; }
.contact-f-row { grid-template-columns: 2fr 1fr 1fr; }
.contact-hero { min-height: 150px; }
.contact-f-lead { margin: 0; font-family: 'Fraunces', serif; font-size: 1.15rem; line-height: 1.5; max-width: 40ch; }
.contact-f-form-row { grid-template-columns: 1fr; }
.contact-form-cell { background: var(--surface, #fff); padding: 1.75rem; }
.contact-form-cell form { display: flex; flex-direction: column; }
.f-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.f-field { display: flex; flex-direction: column; margin-bottom: 1rem; }
.f-field label { font-family: 'Space Mono', monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.09em; color: color-mix(in srgb, var(--ink) 55%, transparent); margin-bottom: 0.35rem; }
.f-field input, .f-field textarea { font-family: inherit; font-size: 0.95rem; color: var(--ink); background: var(--bg); border: 1px solid var(--ink); border-radius: 0; padding: 0.6rem 0.75rem; resize: vertical; }
.f-field input:focus, .f-field textarea:focus { outline: 3px solid var(--accent); outline-offset: -3px; }
.f-send { align-self: flex-start; font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.09em; background: var(--ink); color: var(--bg); border: 0; border-radius: 0; padding: 0.8rem 1.8rem; cursor: pointer; }
.f-send:hover { background: var(--accent); color: var(--ink); }
.f-send:disabled { opacity: 0.55; cursor: default; }
.gotcha { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.form-status { font-family: 'Space Mono', monospace; font-size: 0.72rem; margin: 0.8rem 0 0; }
.form-status.error { color: #b3261e; }
.form-done p { font-family: 'Space Mono', monospace; font-size: 0.8rem; margin: 0 0 1rem; }
@media (max-width: 760px) { .contact-f-row { grid-template-columns: 1fr; } .f-row { grid-template-columns: 1fr; } }
</style>
