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
  <div class="e-page">
    <header class="hero">
      <img v-if="profile?.avatar_url" :src="profile.avatar_url" class="avatar" alt="" />
      <p class="kicker">{{ profile?.title || 'Software engineer' }}</p>
      <h1>{{ profile?.name || 'Your Name' }}</h1>
      <p class="sub" v-if="profile?.bio">{{ profile.bio }}</p>
      <div class="divider"></div>
      <div class="links">
        <a v-if="profile?.email" :href="`mailto:${profile.email}`">Email</a>
        <a v-if="profile?.github_url" :href="profile.github_url" target="_blank">GitHub</a>
        <a v-if="profile?.linkedin_url" :href="profile.linkedin_url" target="_blank">LinkedIn</a>
        <a v-if="profile?.twitter_url" :href="profile.twitter_url" target="_blank">Twitter</a>
        <a v-if="profile?.website_url" :href="profile.website_url" target="_blank">Site</a>
        <a v-if="profile?.resume_url" :href="profile.resume_url" target="_blank">Resume</a>
      </div>
      <div class="fact-row" v-if="profile?.location || experience.length || projects.length">
        <div v-if="profile?.location"><b>{{ profile.location }}</b><span>based</span></div>
        <div v-if="projects.length"><b>{{ projects.length }}</b><span>projects</span></div>
        <div v-if="experience.length"><b>{{ experience.length }}</b><span>roles</span></div>
      </div>
    </header>

    <section v-if="skills.length" class="section">
      <p class="section-kicker">Skills</p>
      <h2>What I work with</h2>
      <div class="divider small"></div>
      <div v-for="(list, cat) in skillsByCategory" :key="cat" class="skill-group">
        <h4>{{ cat }}</h4>
        <div class="pills">
          <span v-for="s in list" :key="s.id" class="pill">{{ s.name }}</span>
        </div>
      </div>
    </section>

    <section v-if="projects.length" class="section">
      <p class="section-kicker">Work</p>
      <h2>Selected projects</h2>
      <div class="divider small"></div>
      <div class="project-list">
        <article v-for="p in projects" :key="p.id" class="project">
          <button v-if="p.image_url" type="button" class="proj-thumb" @click="openGallery(p)" :aria-label="`Open ${p.title} gallery`">
            <img :src="p.image_url" alt="" />
            <span class="thumb-count" v-if="galleryOf(p).length > 1">{{ galleryOf(p).length }}</span>
          </button>
          <div class="proj-thumb placeholder" v-else></div>
          <div class="proj-text">
            <h3>{{ p.title }}<span class="kind" v-if="p.kind">{{ p.kind }}</span></h3>
            <p v-if="p.description">{{ p.description }}</p>
            <p class="note" v-if="p.note">{{ p.note }}</p>
            <p class="tech" v-if="p.tech_stack">{{ techList(p.tech_stack).join(' · ') }}</p>
            <div class="proj-links">
              <button v-if="galleryOf(p).length" type="button" class="linkish" @click="openGallery(p)">
                {{ galleryOf(p).length > 1 ? galleryOf(p).length + ' screenshots' : 'View screenshot' }}
              </button>
              <a v-if="projectLink(p)" class="linkish" :href="projectLink(p)" target="_blank" rel="noopener">View project ↗</a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section v-if="experience.length" class="section">
      <p class="section-kicker">Experience</p>
      <h2>Where I've worked</h2>
      <div class="divider small"></div>
      <div class="list-block">
        <div v-for="e in experience" :key="e.id" class="list-row">
          <span class="dates">{{ e.start_date }} – {{ e.end_date || 'Present' }}</span>
          <div class="row-main">
            <strong>{{ e.role }}</strong>
            <span class="org">{{ e.company }}</span>
            <p class="track" v-if="e.track">{{ e.track }}</p>
            <p v-if="e.description">{{ e.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="education.length" class="section">
      <p class="section-kicker">Education</p>
      <h2>Background</h2>
      <div class="divider small"></div>
      <div class="list-block">
        <div v-for="e in education" :key="e.id" class="list-row">
          <span class="dates">{{ e.start_date }} – {{ e.end_date }}</span>
          <div class="row-main">
            <strong>{{ e.degree }}</strong>
            <span class="org">{{ e.school }}</span>
            <p v-if="e.description">{{ e.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="recognition?.length" class="section">
      <p class="section-kicker">Recognition</p>
      <h2>Awards &amp; certificates</h2>
      <div class="divider small"></div>
      <div class="list-block">
        <div v-for="r in recognition" :key="r.id" class="list-row">
          <span class="dates">{{ r.date }}</span>
          <div class="row-main">
            <strong>{{ r.title }}</strong>
            <span class="org">{{ r.issuer }}</span>
          </div>
        </div>
      </div>
    </section>

    <section v-if="profile?.about?.length" class="section">
      <p class="section-kicker">About</p>
      <h2>A bit more about me</h2>
      <div class="divider small"></div>
      <div class="about-copy">
        <p v-for="(para, i) in profile.about" :key="i">{{ para }}</p>
      </div>
    </section>
    <section id="contact" class="section contact-e" v-if="profile?.email">
      <p class="section-kicker">Contact</p>
      <h2>Let's talk</h2>
      <div class="divider small"></div>
      <p class="contact-e-lead">Open to roles, freelance work, or just talking shop. Email is the fastest way to reach me.</p>
      <div class="contact-e-links">
        <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        <a v-if="profile?.phone" :href="telHref(profile.phone)">{{ profile.phone }}</a>
      </div>

      <form class="contact-e-form" v-if="profile?.formspree_url" @submit.prevent="submit">
        <template v-if="!sent">
          <label for="e-name">Name</label>
          <input id="e-name" v-model="form.name" type="text" required autocomplete="name" />
          <label for="e-email">Email</label>
          <input id="e-email" v-model="form.email" type="email" required autocomplete="email" />
          <label for="e-subject">Subject</label>
          <input id="e-subject" v-model="form.subject" type="text" required />
          <label for="e-message">Message</label>
          <textarea id="e-message" v-model="form.message" rows="4" required></textarea>
            <input class="gotcha" :id="'e-gotcha'" type="text" v-model="form._gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <button class="e-send" type="submit" :disabled="sending">{{ sending ? 'Sending…' : 'Send message →' }}</button>
          <p class="form-status error" v-if="error" role="status">{{ error }}</p>
        </template>
        <div class="form-done" v-else role="status">
          <p>Message sent — I'll get back to you soon.</p>
          <button class="e-send" type="button" @click="again">Send another</button>
        </div>
      </form>
    </section>

    <ProjectGallery :open="galleryOpen" :images="galleryImages" :title="galleryTitle" @close="closeGallery" />
  </div>
</template>

<style scoped>
.e-page { font-family: 'Bricolage Grotesque', sans-serif; color: var(--ink); max-width: 640px; margin: 0 auto; padding: 5rem 1.5rem 3rem; }
.hero { text-align: center; }
.avatar { width: 88px; height: 88px; border-radius: 50%; object-fit: cover; margin-bottom: 1.5rem; }
.kicker { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.75rem; }
.hero h1 { font-weight: 700; font-size: clamp(2rem, 5vw, 2.7rem); letter-spacing: -0.02em; margin: 0 auto; line-height: 1.2; max-width: 18ch; }
.sub { max-width: 44ch; margin: 1.1rem auto 0; color: color-mix(in srgb, var(--ink) 60%, transparent); line-height: 1.65; font-size: 1rem; }
.divider { width: 40px; height: 2px; background: var(--accent); margin: 2rem auto; }
.divider.small { margin: 1.25rem 0 2rem; }
.links { display: flex; gap: 1.25rem; justify-content: center; flex-wrap: wrap; font-family: 'Space Mono', monospace; font-size: 0.82rem; margin-top: -0.5rem; }
.links a { color: var(--ink); text-decoration: none; border-bottom: 1px solid transparent; }
.links a:hover { border-color: var(--accent); }
.fact-row { display: flex; justify-content: center; gap: 2.5rem; margin-top: 2.5rem; }
.fact-row div { text-align: center; }
.fact-row b { display: block; font-size: 1.5rem; font-weight: 700; }
.fact-row span { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: color-mix(in srgb, var(--ink) 55%, transparent); text-transform: uppercase; letter-spacing: 0.06em; }
.section { margin-top: 4rem; }
.section-kicker { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em; margin: 0; }
.section h2 { font-size: 1.4rem; font-weight: 700; margin: 0.4rem 0 0; letter-spacing: -0.01em; }
.project-list { display: flex; flex-direction: column; gap: 1.5rem; }
.project { display: flex; gap: 1.1rem; text-decoration: none; color: inherit; }
.proj-thumb { width: 88px; height: 88px; flex-shrink: 0; border-radius: 10px; overflow: hidden; background: var(--surface); border: 1px solid color-mix(in srgb, var(--ink) 12%, transparent); }
.proj-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.proj-thumb.placeholder { background: linear-gradient(135deg, color-mix(in srgb, var(--ink) 10%, transparent), var(--surface)); }
.proj-text h3 { margin: 0; font-size: 1.05rem; font-weight: 700; }
.proj-text p { margin: 0.3rem 0 0; color: color-mix(in srgb, var(--ink) 60%, transparent); font-size: 0.9rem; line-height: 1.5; }
.proj-text .tech { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--accent); margin-top: 0.4rem; }
.list-block { display: flex; flex-direction: column; }
.list-row { display: flex; gap: 1.5rem; padding: 1.1rem 0; border-top: 1px solid color-mix(in srgb, var(--ink) 12%, transparent); }
.list-row:last-child { padding-bottom: 0; }
.dates { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: color-mix(in srgb, var(--ink) 55%, transparent); width: 130px; flex-shrink: 0; padding-top: 0.15rem; }
.row-main strong { display: block; font-size: 1.02rem; }
.row-main .org { color: var(--accent); font-size: 0.85rem; font-weight: 600; }
.row-main p { margin: 0.4rem 0 0; color: color-mix(in srgb, var(--ink) 60%, transparent); font-size: 0.9rem; line-height: 1.55; }
.skill-group { margin-bottom: 1.25rem; }
.skill-group h4 { margin: 0 0 0.65rem; font-family: 'Space Mono', monospace; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: color-mix(in srgb, var(--ink) 55%, transparent); font-weight: 400; }
.pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pill { border: 1px solid color-mix(in srgb, var(--ink) 15%, transparent); padding: 0.4rem 0.85rem; border-radius: 999px; font-size: 0.82rem; }
@media (max-width: 480px) {
  .dates { width: auto; }
  .list-row { flex-direction: column; gap: 0.3rem; }
}
.proj-text h3 .kind { font-family: 'Space Mono', monospace; font-size: 0.66rem; font-weight: 400; text-transform: uppercase; letter-spacing: 0.07em; color: color-mix(in srgb, var(--ink) 45%, transparent); margin-left: 0.55rem; }
.proj-text .note { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: color-mix(in srgb, var(--ink) 50%, transparent); margin-top: 0.35rem; line-height: 1.5; }
.row-main .track { font-size: 0.85rem; font-style: italic; color: color-mix(in srgb, var(--ink) 50%, transparent); }
.about-copy p { margin: 0 0 1rem; line-height: 1.7; font-size: 0.95rem; color: color-mix(in srgb, var(--ink) 65%, transparent); }
.about-copy p:last-child { margin-bottom: 0; }
button.proj-thumb { padding: 0; cursor: pointer; position: relative; }
.proj-thumb .thumb-count { position: absolute; right: 4px; bottom: 4px; font-family: 'Space Mono', monospace; font-size: 0.6rem; background: color-mix(in srgb, var(--ink) 80%, transparent); color: var(--bg); border-radius: 999px; padding: 0.12rem 0.4rem; }
.proj-links { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0.5rem; }
.linkish { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: var(--accent); background: none; border: 0; padding: 0; cursor: pointer; text-decoration: none; border-bottom: 1px solid transparent; }
.linkish:hover { border-color: var(--accent); }
.contact-e-lead { margin: 0 0 1.25rem; font-size: 0.95rem; line-height: 1.7; color: color-mix(in srgb, var(--ink) 65%, transparent); }
.contact-e-links { display: flex; gap: 1.25rem; flex-wrap: wrap; font-family: 'Space Mono', monospace; font-size: 0.8rem; margin-bottom: 2rem; }
.contact-e-links a { color: var(--ink); text-decoration: none; border-bottom: 1px solid var(--accent); }
.contact-e-form { display: flex; flex-direction: column; }
.contact-e-form label { font-family: 'Space Mono', monospace; font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.08em; color: color-mix(in srgb, var(--ink) 50%, transparent); margin-bottom: 0.3rem; }
.contact-e-form input, .contact-e-form textarea { font-family: inherit; font-size: 0.95rem; color: var(--ink); background: none; border: 0; border-bottom: 1px solid color-mix(in srgb, var(--ink) 18%, transparent); padding: 0.45rem 0; margin-bottom: 1.4rem; resize: vertical; border-radius: 0; }
.contact-e-form input:focus, .contact-e-form textarea:focus { outline: 0; border-bottom-color: var(--accent); }
.e-send { align-self: flex-start; background: none; border: 0; padding: 0; cursor: pointer; font-family: 'Space Mono', monospace; font-size: 0.82rem; color: var(--accent); border-bottom: 1px solid transparent; }
.e-send:hover { border-bottom-color: var(--accent); }
.e-send:disabled { opacity: 0.5; cursor: default; }
.gotcha { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.form-status { font-family: 'Space Mono', monospace; font-size: 0.72rem; margin: 0.8rem 0 0; }
.form-status.error { color: #b3261e; }
.form-done p { margin: 0 0 1rem; font-size: 0.95rem; }
</style>
