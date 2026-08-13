<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../lib/supabase'

const profile = ref(null)
const projects = ref([])
const experience = ref([])
const education = ref([])
const skills = ref([])
const loading = ref(true)

function techList(str) {
  return (str || '').split(',').map((t) => t.trim()).filter(Boolean)
}

const skillsByCategory = computed(() => {
  const groups = {}
  for (const s of skills.value) {
    const cat = s.category || 'General'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(s)
  }
  return groups
})

onMounted(async () => {
  const [p, pr, ex, ed, sk] = await Promise.all([
    supabase.from('profile').select('*').limit(1).maybeSingle(),
    supabase.from('projects').select('*').order('sort_order'),
    supabase.from('experience').select('*').order('sort_order'),
    supabase.from('education').select('*').order('sort_order'),
    supabase.from('skills').select('*').order('sort_order'),
  ])
  profile.value = p.data
  projects.value = pr.data || []
  experience.value = ex.data || []
  education.value = ed.data || []
  skills.value = sk.data || []
  loading.value = false
})
</script>

<template>
  <div v-if="loading" class="loading"><span>Loading</span></div>
  <div v-else class="page">
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

    <section v-if="projects.length" class="section">
      <p class="section-kicker">Work</p>
      <h2>Selected projects</h2>
      <div class="divider small"></div>
      <div class="project-list">
        <a
          v-for="p in projects"
          :key="p.id"
          class="project"
          :href="p.project_url || p.repo_url || '#'"
          target="_blank"
        >
          <div class="proj-thumb" v-if="p.image_url">
            <img :src="p.image_url" alt="" />
          </div>
          <div class="proj-thumb placeholder" v-else></div>
          <div class="proj-text">
            <h3>{{ p.title }}</h3>
            <p v-if="p.description">{{ p.description }}</p>
            <p class="tech" v-if="p.tech_stack">{{ techList(p.tech_stack).join(' · ') }}</p>
          </div>
        </a>
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

    <footer>
      <span>© {{ new Date().getFullYear() }} {{ profile?.name }}</span>
      <router-link to="/admin">Admin</router-link>
    </footer>
  </div>
</template>

<style scoped>
.loading { min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Space Mono', monospace; color: var(--muted); }
.page { max-width: 640px; margin: 0 auto; padding: 5rem 1.5rem 4rem; }

.hero { text-align: center; }
.avatar { width: 88px; height: 88px; border-radius: 50%; object-fit: cover; margin-bottom: 1.5rem; }
.kicker { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.75rem; }
.hero h1 { font-weight: 700; font-size: clamp(2rem, 5vw, 2.7rem); letter-spacing: -0.02em; margin: 0 auto; line-height: 1.2; max-width: 18ch; }
.sub { max-width: 44ch; margin: 1.1rem auto 0; color: var(--muted); line-height: 1.65; font-size: 1rem; }
.divider { width: 40px; height: 2px; background: var(--accent); margin: 2rem auto; }
.divider.small { margin: 1.25rem 0 2rem; }
.links { display: flex; gap: 1.25rem; justify-content: center; flex-wrap: wrap; font-family: 'Space Mono', monospace; font-size: 0.82rem; margin-top: -0.5rem; }
.links a { color: var(--ink); text-decoration: none; border-bottom: 1px solid transparent; }
.links a:hover { border-color: var(--accent); }

.fact-row { display: flex; justify-content: center; gap: 2.5rem; margin-top: 2.5rem; }
.fact-row div { text-align: center; }
.fact-row b { display: block; font-size: 1.5rem; font-weight: 700; }
.fact-row span { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }

.section { margin-top: 4rem; }
.section-kicker { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em; margin: 0; }
.section h2 { font-size: 1.4rem; font-weight: 700; margin: 0.4rem 0 0; letter-spacing: -0.01em; }

.project-list { display: flex; flex-direction: column; gap: 1.5rem; }
.project { display: flex; gap: 1.1rem; text-decoration: none; color: inherit; }
.proj-thumb { width: 88px; height: 88px; flex-shrink: 0; border-radius: 10px; overflow: hidden; background: var(--panel); border: 1px solid var(--line); }
.proj-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.proj-thumb.placeholder { background: linear-gradient(135deg, var(--line), var(--panel)); }
.proj-text h3 { margin: 0; font-size: 1.05rem; font-weight: 700; }
.proj-text p { margin: 0.3rem 0 0; color: var(--muted); font-size: 0.9rem; line-height: 1.5; }
.proj-text .tech { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--accent); margin-top: 0.4rem; }

.list-block { display: flex; flex-direction: column; }
.list-row { display: flex; gap: 1.5rem; padding: 1.1rem 0; border-top: 1px solid var(--line); }
.list-row:last-child { padding-bottom: 0; }
.dates { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--muted); width: 130px; flex-shrink: 0; padding-top: 0.15rem; }
.row-main strong { display: block; font-size: 1.02rem; }
.row-main .org { color: var(--accent); font-size: 0.85rem; font-weight: 600; }
.row-main p { margin: 0.4rem 0 0; color: var(--muted); font-size: 0.9rem; line-height: 1.55; }

.skill-group { margin-bottom: 1.25rem; }
.skill-group h4 { margin: 0 0 0.65rem; font-family: 'Space Mono', monospace; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); font-weight: 400; }
.pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pill { border: 1px solid var(--line); padding: 0.4rem 0.85rem; border-radius: 999px; font-size: 0.82rem; }

footer { display: flex; justify-content: space-between; align-items: center; margin-top: 4rem; padding-top: 1.5rem; border-top: 1px solid var(--line); }
footer span { color: var(--muted); font-size: 0.78rem; }
footer a { color: var(--muted); font-size: 0.78rem; text-decoration: none; }
footer a:hover { color: var(--ink); }

@media (max-width: 480px) {
  .dates { width: auto; }
  .list-row { flex-direction: column; gap: 0.3rem; }
}
</style>
