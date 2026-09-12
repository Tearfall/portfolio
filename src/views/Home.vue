<script setup>
import { computed, watchEffect } from 'vue'
import { PALETTE, profile, projects, skills } from '../data/portfolio'
import { useColorMode } from '../lib/useColorMode'
import Portfolio from './Portfolio.vue'

// The toggle in the corner writes to this; the palette follows.
const { mode } = useColorMode()

// Form errors are the one color that never belonged in the palette — the same
// red either way, just pitched for the background behind it.
const DANGER = { light: '#b3261e', dark: '#ff9a91' }

const themeVars = computed(() => {
  const p = PALETTE[mode.value] || PALETTE.light
  return {
    '--bg': p.bg,
    '--surface': p.surface,
    '--ink': p.ink,
    '--accent': p.accent,
    '--accent2': p.accent2,
    '--on-accent': p.onAccent,
    '--danger': DANGER[mode.value],
  }
})

// Set on <html> rather than on .theme-root so <body> and the overscroll strip
// past the end of the page get the same background.
watchEffect(() => {
  const style = document.documentElement.style
  for (const [name, value] of Object.entries(themeVars.value)) style.setProperty(name, value)
})
</script>

<template>
  <div class="theme-root">
    <Portfolio :profile="profile" :projects="projects" :skills="skills" />
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
