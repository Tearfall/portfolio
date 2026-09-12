<script setup>
import { useColorMode } from '../lib/useColorMode'

const { isDark, toggle } = useColorMode()
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    role="switch"
    :aria-checked="isDark"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <span class="tt-icons" :class="{ 'is-dark': isDark }" aria-hidden="true">
      <svg class="tt-icon tt-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg class="tt-icon tt-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </span>
  </button>
</template>

<style scoped>
/* Pill-shaped and ink-outlined, to match .btn.ghost up in the hero. */
.theme-toggle {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 900;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1.5px solid var(--ink);
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface) 90%, transparent);
  color: var(--ink);
  cursor: pointer;
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}
.theme-toggle:hover {
  background: var(--ink);
  color: var(--bg);
}
.theme-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Both icons live in the same box; the inactive one spins away rather than
   popping, so the swap reads as one motion. */
.tt-icons {
  position: relative;
  display: block;
  width: 17px;
  height: 17px;
}
.tt-icon {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.22s ease, transform 0.32s cubic-bezier(0.34, 1.3, 0.64, 1);
}
.tt-sun { opacity: 0; transform: rotate(-70deg) scale(0.5); }
.tt-moon { opacity: 1; transform: rotate(0deg) scale(1); }
.tt-icons.is-dark .tt-sun { opacity: 1; transform: rotate(0deg) scale(1); }
.tt-icons.is-dark .tt-moon { opacity: 0; transform: rotate(70deg) scale(0.5); }

@media (prefers-reduced-motion: reduce) {
  .tt-icon { transition: opacity 0.01s linear; transform: none; }
  .tt-icons.is-dark .tt-sun, .tt-icons.is-dark .tt-moon { transform: none; }
}
</style>
