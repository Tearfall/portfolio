<script setup>
import { computed } from 'vue'
import { techList, groupSkillsByCategory } from '../../lib/portfolioHelpers'

const props = defineProps({
  profile: Object,
  projects: Array,
  experience: Array,
  education: Array,
  skills: Array,
})

const skillsByCategory = computed(() => groupSkillsByCategory(props.skills))
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
        <a v-for="p in projects" :key="p.id" class="card" :href="p.project_url || p.repo_url || '#'" target="_blank">
          <img v-if="p.image_url" :src="p.image_url" class="card-img" alt="" />
          <span class="tag" v-if="techList(p.tech_stack)[0]">{{ techList(p.tech_stack)[0] }}</span>
          <h3>{{ p.title }}</h3>
          <p v-if="p.description">{{ p.description }}</p>
        </a>
      </div>
    </section>

    <section v-if="experience.length" class="section">
      <h2>Experience</h2>
      <div class="entries">
        <div v-for="e in experience" :key="e.id" class="entry">
          <div class="entry-head"><strong>{{ e.role }}</strong> — {{ e.company }}<span class="dates">{{ e.start_date }} – {{ e.end_date || 'Present' }}</span></div>
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
</style>
