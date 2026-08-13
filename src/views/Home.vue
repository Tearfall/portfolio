<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../lib/supabase'
import ThemeA from './themes/ThemeA.vue'
import ThemeB from './themes/ThemeB.vue'
import ThemeC from './themes/ThemeC.vue'
import ThemeD from './themes/ThemeD.vue'
import ThemeE from './themes/ThemeE.vue'
import ThemeF from './themes/ThemeF.vue'

const THEME_COMPONENTS = { a: ThemeA, b: ThemeB, c: ThemeC, d: ThemeD, e: ThemeE, f: ThemeF }

const profile = ref(null)
const projects = ref([])
const experience = ref([])
const education = ref([])
const skills = ref([])
const loading = ref(true)

const activeTheme = computed(() => THEME_COMPONENTS[profile.value?.theme] || ThemeE)

const themeVars = computed(() => ({
  '--bg': profile.value?.color_bg || '#fafaf8',
  '--surface': profile.value?.color_surface || '#ffffff',
  '--ink': profile.value?.color_ink || '#1c1c1a',
  '--accent': profile.value?.color_accent || '#f29e4c',
  '--accent2': profile.value?.color_accent2 || '#048ba8',
}))

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
  <div v-else class="theme-root" :style="themeVars">
    <component
      :is="activeTheme"
      :profile="profile"
      :projects="projects"
      :experience="experience"
      :education="education"
      :skills="skills"
    />
    <footer class="site-footer">
      <span>© {{ new Date().getFullYear() }} {{ profile?.name }}</span>
      <router-link to="/admin">Admin</router-link>
    </footer>
  </div>
</template>

<style scoped>
.loading { min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Space Mono', monospace; color: #888; }
.theme-root { background: var(--bg); min-height: 100vh; }
.site-footer {
  display: flex;
  justify-content: space-between;
  max-width: 640px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 3rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
}
.site-footer span { color: color-mix(in srgb, var(--ink) 50%, transparent); }
.site-footer a { color: color-mix(in srgb, var(--ink) 50%, transparent); text-decoration: none; }
.site-footer a:hover { color: var(--ink); }
</style>
