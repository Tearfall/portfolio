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
  <div class="b-page">
    <div class="grid-b">
      <div>
        <div class="idx" v-if="profile?.location">{{ profile.location }}</div>
        <h1>{{ profile?.name || 'Your Name' }}</h1>
        <p class="role">{{ profile?.title }}</p>
      </div>
      <p class="sub-b" v-if="profile?.bio">{{ profile.bio }}</p>
    </div>

    <div class="stats" v-if="projects.length || experience.length || skills.length">
      <div class="stat" v-if="projects.length"><b>{{ projects.length }}</b><span>Projects</span></div>
      <div class="stat" v-if="experience.length"><b>{{ experience.length }}</b><span>Roles</span></div>
      <div class="stat" v-if="skills.length"><b>{{ skills.length }}</b><span>Skills</span></div>
      <div class="stat" v-if="education.length"><b>{{ education.length }}</b><span>Degrees</span></div>
    </div>

    <div v-if="projects.length" class="section">
      <h2>Work</h2>
      <div class="worklist">
        <div v-for="p in projects" :key="p.id" class="work-row">
          <span class="yr">{{ p.kind || techList(p.tech_stack)[0] || '' }}</span>
          <div><div class="title">{{ p.title }}</div><div class="meta">{{ techList(p.tech_stack).join(' · ') }}</div></div>
          <div class="row-actions">
            <button v-if="galleryOf(p).length" type="button" class="row-btn" @click="openGallery(p)">⤢ {{ galleryOf(p).length }}</button>
            <a v-if="projectLink(p)" class="row-btn" :href="projectLink(p)" target="_blank" rel="noopener">↗</a>
          </div>
        </div>
      </div>
    </div>

    <section v-if="experience.length" class="section">
      <h2>Experience</h2>
      <div class="worklist">
        <div v-for="e in experience" :key="e.id" class="work-row plain">
          <span class="yr">{{ e.start_date }}—{{ e.end_date || 'now' }}</span>
          <div><div class="title">{{ e.role }}</div><div class="meta">{{ e.company }}</div></div>
        </div>
      </div>
    </section>

    <section v-if="education.length" class="section">
      <h2>Education</h2>
      <div class="worklist">
        <div v-for="e in education" :key="e.id" class="work-row plain">
          <span class="yr">{{ e.start_date }}—{{ e.end_date }}</span>
          <div><div class="title">{{ e.degree }}</div><div class="meta">{{ e.school }}</div></div>
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
      <div class="worklist">
        <div v-for="r in recognition" :key="r.id" class="work-row plain">
          <span class="yr">{{ r.date }}</span>
          <div><div class="title">{{ r.title }}</div><div class="meta">{{ r.issuer }}</div></div>
        </div>
      </div>
    </section>

    <section v-if="profile?.about?.length" class="section">
      <h2>About</h2>
      <div class="about-copy">
        <p v-for="(para, i) in profile.about" :key="i">{{ para }}</p>
      </div>
    </section>
    <section id="contact" class="section contact-b" v-if="profile?.email">
      <h2>Contact</h2>
      <div class="contact-b-grid">
        <dl class="contact-sheet">
          <div class="sheet-row" v-if="profile?.email"><dt>Email</dt><dd><a :href="`mailto:${profile.email}`">{{ profile.email }}</a></dd></div>
          <div class="sheet-row" v-if="profile?.phone"><dt>Phone</dt><dd><a :href="telHref(profile.phone)">{{ profile.phone }}</a></dd></div>
          <div class="sheet-row" v-if="profile?.location"><dt>Location</dt><dd>{{ profile.location }}</dd></div>
          <div class="sheet-row" v-if="profile?.timezone"><dt>Timezone</dt><dd>{{ profile.timezone }}</dd></div>
          <div class="sheet-row" v-if="profile?.github_url || profile?.linkedin_url">
            <dt>Links</dt>
            <dd class="sheet-links">
              <a v-if="profile?.github_url" :href="profile.github_url" target="_blank" rel="noopener">GitHub ↗</a>
              <a v-if="profile?.linkedin_url" :href="profile.linkedin_url" target="_blank" rel="noopener">LinkedIn ↗</a>
            </dd>
          </div>
        </dl>

        <form class="contact-b-form" v-if="profile?.formspree_url" @submit.prevent="submit">
          <template v-if="!sent">
            <div class="field"><label for="b-name">Name</label><input id="b-name" v-model="form.name" type="text" required autocomplete="name" /></div>
            <div class="field"><label for="b-email">Email</label><input id="b-email" v-model="form.email" type="email" required autocomplete="email" /></div>
            <div class="field"><label for="b-subject">Subject</label><input id="b-subject" v-model="form.subject" type="text" required /></div>
            <div class="field"><label for="b-message">Message</label><textarea id="b-message" v-model="form.message" rows="4" required></textarea></div>
            <input class="gotcha" :id="'b-gotcha'" type="text" v-model="form._gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <button class="b-submit" type="submit" :disabled="sending">{{ sending ? 'SENDING…' : 'SEND →' }}</button>
            <p class="form-status error" v-if="error" role="status">{{ error }}</p>
          </template>
          <div class="form-done" v-else role="status">
            <p>MESSAGE SENT — I'll reply soon.</p>
            <button class="b-submit" type="button" @click="again">SEND ANOTHER</button>
          </div>
        </form>
      </div>
    </section>

    <ProjectGallery :open="galleryOpen" :images="galleryImages" :title="galleryTitle" @close="closeGallery" />
  </div>
</template>

<style scoped>
.b-page { background: var(--bg); color: var(--ink); font-family: 'Bricolage Grotesque', sans-serif; max-width: 900px; margin: 0 auto; padding: 4rem 1.5rem 4rem; }
.grid-b { display: grid; grid-template-columns: 1.3fr 1fr; gap: 3rem; align-items: end; border-bottom: 1.5px solid var(--ink); padding-bottom: 2.2rem; }
.idx { font-family: 'Space Mono', monospace; font-size: 12px; color: var(--accent); margin-bottom: 1rem; text-transform: uppercase; }
.b-page h1 { font-weight: 800; font-size: clamp(2.2rem, 5vw, 3.6rem); line-height: 0.98; letter-spacing: -0.03em; text-transform: uppercase; margin: 0; }
.role { font-family: 'Space Mono', monospace; font-size: 14px; color: var(--accent); margin-top: 0.75rem; }
.sub-b { font-size: 0.96rem; line-height: 1.65; color: color-mix(in srgb, var(--ink) 65%, transparent); margin: 0; }
.stats { display: grid; grid-template-columns: repeat(4,1fr); border-bottom: 1.5px solid var(--ink); }
.stat { padding: 1.4rem 0.5rem 1.4rem 1.2rem; border-left: 1.5px solid var(--ink); }
.stat:first-child { border-left: none; padding-left: 0; }
.stat b { font-size: 2rem; font-weight: 800; display: block; }
.stat span { font-family: 'Space Mono', monospace; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: color-mix(in srgb, var(--ink) 55%, transparent); }
.section { margin-top: 3rem; }
.section h2 { font-family: 'Space Mono', monospace; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 1rem; }
.worklist { margin-top: 0; }
.work-row { display: grid; grid-template-columns: 90px 1fr auto; align-items: center; gap: 1.5rem; padding: 1.1rem 0; border-bottom: 1px solid color-mix(in srgb, var(--ink) 15%, transparent); text-decoration: none; color: inherit; }
.work-row.plain { grid-template-columns: 130px 1fr; cursor: default; }
.work-row .yr { font-family: 'Space Mono', monospace; font-size: 12px; color: color-mix(in srgb, var(--ink) 55%, transparent); }
.work-row .title { font-weight: 700; font-size: 1.05rem; }
.work-row .meta { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--accent); }
.skill-group { margin-bottom: 1rem; }
.skill-group h4 { margin: 0 0 0.5rem; color: color-mix(in srgb, var(--ink) 55%, transparent); font-weight: 600; font-size: 0.8rem; text-transform: uppercase; }
.pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pill { border: 1px solid var(--ink); padding: 0.35rem 0.85rem; font-size: 0.85rem; font-family: 'Space Mono', monospace; }
@media (max-width: 640px) { .grid-b, .stats { grid-template-columns: 1fr; } }
.about-copy p { margin: 0 0 1rem; line-height: 1.7; font-size: 0.96rem; color: color-mix(in srgb, var(--ink) 70%, transparent); max-width: 68ch; }
.about-copy p:last-child { margin-bottom: 0; }
.row-actions { display: flex; gap: 0.5rem; align-items: center; }
.row-btn { font-family: 'Space Mono', monospace; font-size: 12px; border: 1px solid var(--ink); background: none; color: var(--ink); padding: 0.35rem 0.6rem; cursor: pointer; text-decoration: none; line-height: 1; }
.row-btn:hover { background: var(--ink); color: var(--bg); }
.contact-b-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; border-top: 1.5px solid var(--ink); padding-top: 1.5rem; }
.contact-sheet { margin: 0; }
.sheet-row { display: grid; grid-template-columns: 110px 1fr; gap: 1rem; padding: 0.8rem 0; border-bottom: 1px solid color-mix(in srgb, var(--ink) 15%, transparent); }
.sheet-row dt { font-family: 'Space Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: color-mix(in srgb, var(--ink) 55%, transparent); }
.sheet-row dd { margin: 0; font-size: 0.92rem; word-break: break-word; }
.sheet-row dd a { color: var(--accent); text-decoration: none; }
.sheet-row dd a:hover { text-decoration: underline; }
.sheet-links { display: flex; gap: 1rem; flex-wrap: wrap; font-family: 'Space Mono', monospace; font-size: 12px; }
.contact-b-form .field { display: flex; flex-direction: column; margin-bottom: 1.1rem; }
.contact-b-form label { font-family: 'Space Mono', monospace; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; color: color-mix(in srgb, var(--ink) 55%, transparent); margin-bottom: 0.35rem; }
.contact-b-form input, .contact-b-form textarea { font-family: inherit; font-size: 0.95rem; color: var(--ink); background: none; border: 0; border-bottom: 1.5px solid var(--ink); padding: 0.4rem 0; resize: vertical; border-radius: 0; }
.contact-b-form input:focus, .contact-b-form textarea:focus { outline: 0; border-bottom-color: var(--accent); }
.b-submit { font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: 0.08em; border: 1.5px solid var(--ink); background: none; color: var(--ink); padding: 0.7rem 1.6rem; cursor: pointer; }
.b-submit:hover { background: var(--ink); color: var(--bg); }
.b-submit:disabled { opacity: 0.5; cursor: default; }
.gotcha { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.form-status { font-family: 'Space Mono', monospace; font-size: 11px; margin: 0.7rem 0 0; }
.form-status.error { color: #b3261e; }
.form-done p { font-family: 'Space Mono', monospace; font-size: 12px; margin: 0 0 1rem; }
@media (max-width: 640px) { .contact-b-grid { grid-template-columns: 1fr; gap: 2rem; } }
</style>
