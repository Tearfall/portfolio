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

const initials = computed(() => {
  const n = profile.value?.name || ''
  return n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('')
})

const navSections = computed(() => {
  const s = []
  if (projects.value.length) s.push({ id: 'projects', label: 'Projects' })
  if (experience.value.length) s.push({ id: 'experience', label: 'Experience' })
  if (education.value.length) s.push({ id: 'education', label: 'Education' })
  if (skills.value.length) s.push({ id: 'skills', label: 'Skills' })
  return s
})

function techList(str) {
  return (str || '').split(',').map((t) => t.trim()).filter(Boolean)
}

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
  <div v-if="loading" class="loading">
    <div class="spinner"></div>
  </div>
  <div v-else class="page">
    <div class="bg-glow"></div>

    <nav class="navbar">
      <span class="brand">{{ profile?.name || 'Portfolio' }}</span>
      <div class="nav-links">
        <a v-for="s in navSections" :key="s.id" :href="`#${s.id}`">{{ s.label }}</a>
      </div>
    </nav>

    <header class="hero">
      <div class="avatar-wrap">
        <img v-if="profile?.avatar_url" :src="profile.avatar_url" class="avatar" alt="" />
        <div v-else class="avatar avatar-fallback">{{ initials || '?' }}</div>
      </div>
      <p class="eyebrow" v-if="profile?.title">{{ profile.title }}</p>
      <h1>{{ profile?.name || 'Your Name' }}</h1>
      <p class="bio">{{ profile?.bio }}</p>
      <div class="links">
        <a v-if="profile?.email" class="btn primary" :href="`mailto:${profile.email}`">Get in touch</a>
        <a v-if="profile?.resume_url" class="btn" :href="profile.resume_url" target="_blank">Resume</a>
        <a v-if="profile?.github_url" class="icon-link" :href="profile.github_url" target="_blank" title="GitHub">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.99 3.24 9.22 7.74 10.72.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.15.68-3.82-1.5-3.82-1.5-.51-1.32-1.26-1.67-1.26-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.16.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.19-1.47 3.15-1.16 3.15-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55A11.53 11.53 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z"/></svg>
        </a>
        <a v-if="profile?.linkedin_url" class="icon-link" :href="profile.linkedin_url" target="_blank" title="LinkedIn">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>
        </a>
        <a v-if="profile?.twitter_url" class="icon-link" :href="profile.twitter_url" target="_blank" title="Twitter">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.29 3.9A12.14 12.14 0 0 1 3.15 4.9a4.28 4.28 0 0 0 1.32 5.71 4.25 4.25 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.98A8.59 8.59 0 0 1 2 19.54a12.1 12.1 0 0 0 6.56 1.92c7.88 0 12.19-6.53 12.19-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 22.46 6Z"/></svg>
        </a>
        <a v-if="profile?.website_url" class="icon-link" :href="profile.website_url" target="_blank" title="Website">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 8h-3.02a15.6 15.6 0 0 0-1.32-5.6A8.03 8.03 0 0 1 18.9 10ZM12 4.06c.9 1.1 1.94 3.09 2.14 5.94H9.86c.2-2.85 1.24-4.84 2.14-5.94ZM9.44 4.4A15.6 15.6 0 0 0 8.12 10H5.1a8.03 8.03 0 0 1 4.34-5.6ZM5.1 12h3.02c.13 2.15.62 4.06 1.32 5.6A8.03 8.03 0 0 1 5.1 12Zm4.76 0h4.28c-.2 2.85-1.24 4.84-2.14 5.94-.9-1.1-1.94-3.09-2.14-5.94Zm5.9 5.6c.7-1.54 1.19-3.45 1.32-5.6h3.02a8.03 8.03 0 0 1-4.34 5.6Z"/></svg>
        </a>
      </div>
    </header>

    <section v-if="projects.length" id="projects" class="section">
      <h2><span class="num">01</span>Projects</h2>
      <div class="grid">
        <a
          v-for="p in projects"
          :key="p.id"
          class="card"
          :href="p.project_url || p.repo_url || '#'"
          target="_blank"
        >
          <div class="card-img-wrap" v-if="p.image_url">
            <img :src="p.image_url" class="card-img" alt="" />
          </div>
          <div class="card-body">
            <h3>{{ p.title }}</h3>
            <p>{{ p.description }}</p>
            <div class="tech-row">
              <span v-for="t in techList(p.tech_stack)" :key="t" class="tech-chip">{{ t }}</span>
            </div>
          </div>
        </a>
      </div>
    </section>

    <section v-if="experience.length" id="experience" class="section">
      <h2><span class="num">02</span>Experience</h2>
      <div class="timeline">
        <div v-for="e in experience" :key="e.id" class="entry">
          <div class="dot"></div>
          <div class="entry-content">
            <div class="entry-head">
              <strong>{{ e.role }}</strong>
              <span class="dates">{{ e.start_date }} – {{ e.end_date || 'Present' }}</span>
            </div>
            <p class="company">{{ e.company }}</p>
            <p>{{ e.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="education.length" id="education" class="section">
      <h2><span class="num">03</span>Education</h2>
      <div class="timeline">
        <div v-for="e in education" :key="e.id" class="entry">
          <div class="dot"></div>
          <div class="entry-content">
            <div class="entry-head">
              <strong>{{ e.degree }}</strong>
              <span class="dates">{{ e.start_date }} – {{ e.end_date }}</span>
            </div>
            <p class="company">{{ e.school }}</p>
            <p>{{ e.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="skills.length" id="skills" class="section">
      <h2><span class="num">04</span>Skills</h2>
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
:global(body) { background: #0a0a0f; }

.loading { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0f; }
.spinner { width: 36px; height: 36px; border: 3px solid #26263a; border-top-color: #8b5cf6; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.page {
  position: relative;
  min-height: 100vh;
  background: #0a0a0f;
  color: #e4e4ec;
  overflow: hidden;
}

.bg-glow {
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 900px;
  background: radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(236,72,153,0.08) 40%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 2rem;
  backdrop-filter: blur(12px);
  background: rgba(10,10,15,0.7);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.brand { font-weight: 700; letter-spacing: 0.02em; }
.nav-links { display: flex; gap: 1.5rem; }
.nav-links a { color: #a1a1b3; text-decoration: none; font-size: 0.9rem; transition: color .15s; }
.nav-links a:hover { color: #fff; }

.hero {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 5rem 1.5rem 4rem;
  max-width: 720px;
  margin: 0 auto;
}
.avatar-wrap { display: flex; justify-content: center; margin-bottom: 1.5rem; }
.avatar { width: 108px; height: 108px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(139,92,246,0.4); box-shadow: 0 0 40px rgba(139,92,246,0.25); }
.avatar-fallback { display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; background: linear-gradient(135deg, #8b5cf6, #ec4899); color: #fff; }
.eyebrow { color: #a78bfa; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 0.5rem; }
.hero h1 { font-size: 3rem; margin: 0 0 1rem; font-weight: 800; letter-spacing: -0.02em; background: linear-gradient(135deg, #fff, #b8b8d1); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.bio { color: #a1a1b3; font-size: 1.05rem; line-height: 1.6; max-width: 560px; margin: 0 auto 2rem; }
.links { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; align-items: center; }
.btn { padding: 0.65rem 1.4rem; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 0.9rem; border: 1px solid rgba(255,255,255,0.12); color: #e4e4ec; transition: all .15s; }
.btn:hover { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.05); }
.btn.primary { background: linear-gradient(135deg, #8b5cf6, #ec4899); border: none; color: #fff; }
.btn.primary:hover { filter: brightness(1.1); }
.icon-link { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 50%; color: #a1a1b3; border: 1px solid rgba(255,255,255,0.1); transition: all .15s; }
.icon-link:hover { color: #fff; border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.05); }

.section { position: relative; z-index: 1; max-width: 820px; margin: 0 auto; padding: 3rem 1.5rem; }
.section h2 { display: flex; align-items: center; gap: 0.75rem; font-size: 1.4rem; font-weight: 700; margin-bottom: 2rem; }
.num { font-size: 0.85rem; font-weight: 700; color: #8b5cf6; font-family: monospace; }

.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; }
.card { display: block; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; text-decoration: none; color: inherit; background: rgba(255,255,255,0.02); overflow: hidden; transition: transform .2s, border-color .2s, box-shadow .2s; }
.card:hover { transform: translateY(-4px); border-color: rgba(139,92,246,0.4); box-shadow: 0 12px 32px rgba(139,92,246,0.15); }
.card-img-wrap { height: 140px; overflow: hidden; }
.card-img { width: 100%; height: 100%; object-fit: cover; transition: transform .3s; }
.card:hover .card-img { transform: scale(1.05); }
.card-body { padding: 1.1rem 1.2rem 1.3rem; }
.card h3 { margin: 0 0 0.4rem; font-size: 1.05rem; font-weight: 700; }
.card p { margin: 0.2rem 0; font-size: 0.9rem; color: #a1a1b3; line-height: 1.5; }
.tech-row { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.75rem; }
.tech-chip { font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 999px; background: rgba(139,92,246,0.12); color: #c4b5fd; font-weight: 600; }

.timeline { position: relative; padding-left: 1.5rem; border-left: 1px solid rgba(255,255,255,0.1); }
.entry { position: relative; margin-bottom: 2rem; }
.entry:last-child { margin-bottom: 0; }
.dot { position: absolute; left: -1.94rem; top: 0.3rem; width: 10px; height: 10px; border-radius: 50%; background: #8b5cf6; box-shadow: 0 0 0 4px rgba(139,92,246,0.15); }
.entry-head { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: baseline; }
.entry-head strong { font-size: 1.02rem; }
.dates { margin-left: auto; color: #7b7b91; font-size: 0.82rem; font-family: monospace; }
.company { color: #a78bfa; font-size: 0.88rem; font-weight: 600; margin: 0.2rem 0 0.5rem; }
.entry-content p:not(.company) { margin: 0; color: #a1a1b3; line-height: 1.55; font-size: 0.93rem; }

.skill-group { margin-bottom: 1.5rem; }
.skill-group h4 { margin: 0 0 0.75rem; color: #7b7b91; font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; }
.pills { display: flex; flex-wrap: wrap; gap: 0.55rem; }
.pill { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); padding: 0.4rem 0.9rem; border-radius: 999px; font-size: 0.85rem; font-weight: 500; }

footer { position: relative; z-index: 1; display: flex; justify-content: space-between; align-items: center; max-width: 820px; margin: 3rem auto 0; padding: 2rem 1.5rem 3rem; border-top: 1px solid rgba(255,255,255,0.06); }
footer span { color: #5c5c70; font-size: 0.8rem; }
footer a { color: #5c5c70; font-size: 0.8rem; text-decoration: none; }
footer a:hover { color: #a1a1b3; }

@media (max-width: 640px) {
  .hero h1 { font-size: 2.2rem; }
  .navbar { padding: 1rem; }
  .nav-links { gap: 1rem; }
}
</style>
