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
const navItems = computed(() => {
  const n = []
  if (props.projects.length) n.push({ id: 'work', label: 'Work' })
  if (props.experience.length) n.push({ id: 'experience', label: 'Experience' })
  if (props.skills.length) n.push({ id: 'skills', label: 'Skills' })
  return n
})
</script>

<template>
  <div class="c-page">
    <div class="c-inner">
      <div class="c-side">
        <div>
          <img v-if="profile?.avatar_url" :src="profile.avatar_url" class="c-avatar" alt="" />
          <nav>
            <a v-for="n in navItems" :key="n.id" :href="`#${n.id}`">{{ n.label }}</a>
          </nav>
        </div>
        <div class="name">{{ profile?.name || 'Your Name' }}<br /><span>{{ profile?.title || 'Your Title' }}</span></div>
      </div>
      <div class="c-main">
        <p class="sub-c" v-if="profile?.bio">{{ profile.bio }}</p>
        <div class="c-links">
          <a v-if="profile?.email" :href="`mailto:${profile.email}`">Email</a>
          <a v-if="profile?.github_url" :href="profile.github_url" target="_blank">GitHub</a>
          <a v-if="profile?.linkedin_url" :href="profile.linkedin_url" target="_blank">LinkedIn</a>
          <a v-if="profile?.resume_url" :href="profile.resume_url" target="_blank">Resume</a>
        </div>

        <div id="work" class="c-projects" v-if="projects.length">
          <div v-for="p in projects" :key="p.id" class="c-proj">
            <span class="pname">{{ p.title }}</span>
            <span class="ptag" v-if="techList(p.tech_stack)[0]">{{ techList(p.tech_stack)[0] }}</span>
            <a class="pyr" :href="p.project_url || p.repo_url || '#'" target="_blank">View ↗</a>
          </div>
        </div>

        <div id="experience" class="c-block" v-if="experience.length">
          <h4>Experience</h4>
          <div v-for="e in experience" :key="e.id" class="c-row">
            <strong>{{ e.role }}</strong> — {{ e.company }}
            <span class="c-dates">{{ e.start_date }} – {{ e.end_date || 'Present' }}</span>
          </div>
        </div>

        <div id="skills" class="c-block" v-if="skills.length">
          <h4>Skills</h4>
          <div v-for="(list, cat) in skillsByCategory" :key="cat" class="c-skillgroup">
            <span class="c-cat">{{ cat }}</span>
            <div class="pills">
              <span v-for="s in list" :key="s.id" class="pill">{{ s.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-page { font-family: 'Bricolage Grotesque', sans-serif; }
.c-inner { display: grid; grid-template-columns: 34% 66%; min-height: 100vh; }
.c-side { background: var(--ink); color: var(--bg); padding: 3rem 2.2rem; display: flex; flex-direction: column; justify-content: space-between; }
.c-avatar { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-bottom: 2rem; }
.c-side nav { display: flex; flex-direction: column; gap: 0.9rem; font-family: 'Space Mono', monospace; font-size: 13px; }
.c-side nav a { color: color-mix(in srgb, var(--bg) 60%, transparent); text-decoration: none; }
.c-side nav a:hover { color: var(--accent); }
.c-side .name { font-family: 'Fraunces', serif; font-size: 2rem; font-weight: 500; line-height: 1.1; margin-top: auto; }
.c-side .name span { color: var(--accent); font-size: 1.1rem; display: block; margin-top: 0.5rem; }
.c-main { background: color-mix(in srgb, var(--ink) 92%, black 8%); color: var(--bg); padding: 3rem 3rem; display: flex; flex-direction: column; }
.sub-c { font-family: 'Fraunces', serif; font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 500; line-height: 1.3; max-width: 26ch; margin: 0; }
.c-links { display: flex; gap: 1.2rem; margin-top: 1.5rem; font-family: 'Space Mono', monospace; font-size: 0.8rem; }
.c-links a { color: var(--accent2); text-decoration: none; }
.c-projects { margin-top: 2.5rem; display: flex; flex-direction: column; border-top: 1px solid color-mix(in srgb, var(--bg) 20%, transparent); }
.c-proj { display: grid; grid-template-columns: 1fr auto auto; gap: 1.5rem; align-items: center; padding: 1rem 0; border-bottom: 1px solid color-mix(in srgb, var(--bg) 20%, transparent); }
.c-proj .pname { font-weight: 700; font-size: 1.02rem; }
.c-proj .ptag { font-family: 'Space Mono', monospace; font-size: 10.5px; padding: 0.3rem 0.7rem; border-radius: 999px; background: color-mix(in srgb, var(--accent) 20%, transparent); color: var(--accent); }
.c-proj .pyr { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--accent2); text-decoration: none; }
.c-block { margin-top: 2.5rem; }
.c-block h4 { font-family: 'Space Mono', monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin: 0 0 1rem; }
.c-row { padding: 0.7rem 0; border-bottom: 1px solid color-mix(in srgb, var(--bg) 15%, transparent); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; font-size: 0.92rem; }
.c-dates { font-family: 'Space Mono', monospace; font-size: 0.78rem; color: color-mix(in srgb, var(--bg) 55%, transparent); }
.c-skillgroup { margin-bottom: 1rem; }
.c-cat { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: color-mix(in srgb, var(--bg) 55%, transparent); text-transform: uppercase; }
.pills { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
.pill { background: color-mix(in srgb, var(--bg) 10%, transparent); padding: 0.35rem 0.85rem; border-radius: 999px; font-size: 0.82rem; }
@media (max-width: 760px) { .c-inner { grid-template-columns: 1fr; } }
</style>
