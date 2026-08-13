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
        <a v-for="p in projects" :key="p.id" class="work-row" :href="p.project_url || p.repo_url || '#'" target="_blank">
          <span class="yr">{{ techList(p.tech_stack)[0] || '' }}</span>
          <div><div class="title">{{ p.title }}</div><div class="meta">{{ techList(p.tech_stack).join(' · ') }}</div></div>
          <span class="arrow">↗</span>
        </a>
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
</style>
