<script setup>
import { computed } from 'vue'
import { ACTIVE_THEME, PALETTE, profile, projects, experience, education, recognition, skills } from '../data/portfolio'
import ThemeA from './themes/ThemeA.vue'
import ThemeB from './themes/ThemeB.vue'
import ThemeC from './themes/ThemeC.vue'
import ThemeD from './themes/ThemeD.vue'
import ThemeE from './themes/ThemeE.vue'
import ThemeF from './themes/ThemeF.vue'

// ACTIVE_THEME in src/data/portfolio.js picks which of these renders.
const THEME_COMPONENTS = { 1: ThemeA, 2: ThemeB, 3: ThemeC, 4: ThemeD, 5: ThemeE, 6: ThemeF }

const activeTheme = computed(() => THEME_COMPONENTS[ACTIVE_THEME] || ThemeE)

const themeVars = {
  '--bg': PALETTE.bg,
  '--surface': PALETTE.surface,
  '--ink': PALETTE.ink,
  '--accent': PALETTE.accent,
  '--accent2': PALETTE.accent2,
}
</script>

<template>
  <div class="theme-root" :style="themeVars">
    <component
      :is="activeTheme"
      :profile="profile"
      :projects="projects"
      :experience="experience"
      :education="education"
      :recognition="recognition"
      :skills="skills"
    />
    <footer class="site-footer">
      <span>© {{ new Date().getFullYear() }} {{ profile.full_name || profile.name }}</span>
      <span v-if="profile.location">{{ profile.location }}</span>
    </footer>
  </div>
</template>

<style scoped>
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
</style>
