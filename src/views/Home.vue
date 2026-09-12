<script setup>
import { PALETTE, profile, projects, skills } from '../data/portfolio'
import Portfolio from './Portfolio.vue'

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
    <Portfolio
      :profile="profile"
      :projects="projects"
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
