<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../lib/supabase'

const profile = ref(null)
const projects = ref([])
const experience = ref([])
const education = ref([])
const skills = ref([])
const loading = ref(true)

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
  <div v-if="loading" class="loading">Loading…</div>
  <div v-else class="page">
    <header class="hero">
      <img v-if="profile?.avatar_url" :src="profile.avatar_url" class="avatar" alt="" />
      <h1>{{ profile?.name || 'Your Name' }}</h1>
      <p class="title">{{ profile?.title }}</p>
      <p class="bio">{{ profile?.bio }}</p>
      <div class="links">
        <a v-if="profile?.email" :href="`mailto:${profile.email}`">Email</a>
        <a v-if="profile?.github_url" :href="profile.github_url" target="_blank">GitHub</a>
        <a v-if="profile?.linkedin_url" :href="profile.linkedin_url" target="_blank">LinkedIn</a>
        <a v-if="profile?.twitter_url" :href="profile.twitter_url" target="_blank">Twitter</a>
        <a v-if="profile?.website_url" :href="profile.website_url" target="_blank">Website</a>
        <a v-if="profile?.resume_url" :href="profile.resume_url" target="_blank">Resume</a>
      </div>
    </header>

    <section v-if="projects.length" class="section">
      <h2>Projects</h2>
      <div class="grid">
        <a
          v-for="p in projects"
          :key="p.id"
          class="card"
          :href="p.project_url || p.repo_url || '#'"
          target="_blank"
        >
          <img v-if="p.image_url" :src="p.image_url" class="card-img" alt="" />
          <h3>{{ p.title }}</h3>
          <p>{{ p.description }}</p>
          <p class="tech">{{ p.tech_stack }}</p>
        </a>
      </div>
    </section>

    <section v-if="experience.length" class="section">
      <h2>Experience</h2>
      <div v-for="e in experience" :key="e.id" class="entry">
        <div class="entry-head">
          <strong>{{ e.role }}</strong> — {{ e.company }}
          <span class="dates">{{ e.start_date }} – {{ e.end_date || 'Present' }}</span>
        </div>
        <p>{{ e.description }}</p>
      </div>
    </section>

    <section v-if="education.length" class="section">
      <h2>Education</h2>
      <div v-for="e in education" :key="e.id" class="entry">
        <div class="entry-head">
          <strong>{{ e.degree }}</strong> — {{ e.school }}
          <span class="dates">{{ e.start_date }} – {{ e.end_date }}</span>
        </div>
        <p>{{ e.description }}</p>
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

    <footer>
      <router-link to="/admin">Admin</router-link>
    </footer>
  </div>
</template>

<style scoped>
.page { max-width: 860px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
.loading { text-align: center; padding: 4rem; color: #888; }
.hero { text-align: center; margin-bottom: 3rem; }
.avatar { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem; }
.hero h1 { font-size: 2.2rem; margin: 0.2rem 0; }
.title { color: #666; font-size: 1.1rem; margin: 0.3rem 0; }
.bio { max-width: 560px; margin: 1rem auto; line-height: 1.5; color: #333; }
.links { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem; }
.links a { color: #2563eb; text-decoration: none; font-weight: 500; }
.links a:hover { text-decoration: underline; }
.section { margin-top: 3rem; }
.section h2 { border-bottom: 2px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.25rem; }
.card { display: block; border: 1px solid #e5e5e5; border-radius: 10px; padding: 1rem; text-decoration: none; color: inherit; transition: box-shadow .15s; }
.card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
.card-img { width: 100%; height: 130px; object-fit: cover; border-radius: 6px; margin-bottom: 0.75rem; }
.card h3 { margin: 0 0 0.4rem; font-size: 1.05rem; }
.card p { margin: 0.2rem 0; font-size: 0.9rem; color: #555; }
.card .tech { font-size: 0.8rem; color: #888; }
.entry { margin-bottom: 1.25rem; }
.entry-head { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: baseline; }
.dates { margin-left: auto; color: #888; font-size: 0.85rem; }
.entry p { margin: 0.3rem 0 0; color: #444; line-height: 1.4; }
.skill-group { margin-bottom: 1rem; }
.skill-group h4 { margin: 0 0 0.5rem; color: #666; font-weight: 600; }
.pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pill { background: #f1f5f9; padding: 0.3rem 0.75rem; border-radius: 999px; font-size: 0.85rem; }
footer { text-align: center; margin-top: 4rem; }
footer a { color: #bbb; font-size: 0.8rem; text-decoration: none; }
</style>
