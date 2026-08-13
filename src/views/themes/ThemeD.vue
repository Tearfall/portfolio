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
        <a v-for="p in projects" :key="p.id" class="card" :href="p.project_url || p.repo_url || '#'" target="_blank">
          <img v-if="p.image_url" :src="p.image_url" class="card-img" alt="" />
          <h3>{{ p.title }}</h3>
          <p v-if="p.description">{{ p.description }}</p>
          <div class="chip-row" v-if="techList(p.tech_stack).length">
            <span v-for="t in techList(p.tech_stack)" :key="t" class="chip">{{ t }}</span>
          </div>
        </a>
      </div>
    </section>

    <section v-if="experience.length" class="section">
      <h2>Experience</h2>
      <div class="entries">
        <div v-for="e in experience" :key="e.id" class="entry">
          <strong>{{ e.role }}</strong> — {{ e.company }}
          <span class="dates">{{ e.start_date }} – {{ e.end_date || 'Present' }}</span>
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
</style>
