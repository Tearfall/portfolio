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
        <a v-for="(p, i) in projects" :key="p.id" class="cell project" :class="tileClasses[i % tileClasses.length]" :href="p.project_url || p.repo_url || '#'" target="_blank">
          <div class="proj-img-wrap" v-if="p.image_url"><img :src="p.image_url" alt="" /></div>
          <div class="proj-body">
            <h3>{{ p.title }}</h3>
            <p v-if="p.description">{{ p.description }}</p>
            <div class="chip-row" v-if="techList(p.tech_stack).length">
              <span v-for="t in techList(p.tech_stack)" :key="t" class="chip">{{ t }}</span>
            </div>
          </div>
        </a>
      </div>
    </section>

    <section v-if="experience.length" class="section">
      <h2>Experience</h2>
      <div class="stack-block">
        <div v-for="e in experience" :key="e.id" class="stack-row">
          <span class="dates">{{ e.start_date }} – {{ e.end_date || 'Present' }}</span>
          <div class="stack-main"><strong>{{ e.role }}</strong><span class="org">{{ e.company }}</span></div>
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
</style>
