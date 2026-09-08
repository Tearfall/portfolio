<script setup>
import { ref, watch, computed, nextTick, onBeforeUnmount } from 'vue'

// A single lightbox shared by every theme. It's an overlay, so it doesn't need
// to copy each theme's layout — it just borrows the palette (--bg / --ink /
// --accent) and the same two typefaces, so it always looks native to the page.
const props = defineProps({
  open: { type: Boolean, default: false },
  images: { type: Array, default: () => [] },
  title: { type: String, default: '' },
})

const emit = defineEmits(['close'])

const index = ref(0)
const closeBtn = ref(null)
const count = computed(() => props.images.length)

function step(dir) {
  if (count.value < 2) return
  index.value = (index.value + dir + count.value) % count.value
}

function go(i) {
  index.value = i
}

function close() {
  emit('close')
}

function onKey(e) {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') step(-1)
  else if (e.key === 'ArrowRight') step(1)
}

// Basic swipe so the gallery is usable on a phone.
let touchX = null
function onTouchStart(e) {
  touchX = e.changedTouches[0].clientX
}
function onTouchEnd(e) {
  if (touchX === null) return
  const dx = e.changedTouches[0].clientX - touchX
  if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1)
  touchX = null
}

function release() {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      index.value = 0
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
      await nextTick()
      closeBtn.value?.focus()
    } else {
      release()
    }
  }
)

onBeforeUnmount(release)
</script>

<template>
  <div
    v-if="open"
    class="lb"
    role="dialog"
    aria-modal="true"
    :aria-label="title ? title + ' gallery' : 'Project gallery'"
    @click.self="close"
  >
    <div class="lb-bar">
      <span class="lb-title">{{ title }}</span>
      <span class="lb-count" v-if="count > 1">{{ index + 1 }} / {{ count }}</span>
      <button ref="closeBtn" type="button" class="lb-close" @click="close" aria-label="Close gallery">✕</button>
    </div>

    <div class="lb-stage" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
      <button
        v-if="count > 1"
        type="button"
        class="lb-nav prev"
        @click="step(-1)"
        aria-label="Previous image"
      >‹</button>

      <img :src="images[index]" :alt="`${title} — image ${index + 1} of ${count}`" />

      <button
        v-if="count > 1"
        type="button"
        class="lb-nav next"
        @click="step(1)"
        aria-label="Next image"
      >›</button>
    </div>

    <div class="lb-strip" v-if="count > 1">
      <button
        v-for="(src, i) in images"
        :key="i"
        type="button"
        class="lb-thumb"
        :class="{ active: i === index }"
        @click="go(i)"
        :aria-label="`Show image ${i + 1}`"
      >
        <img :src="src" alt="" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.lb {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: color-mix(in srgb, var(--ink) 90%, black);
  backdrop-filter: blur(6px);
  animation: lb-in 0.16s ease-out;
}

@keyframes lb-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lb-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  color: var(--bg);
}
.lb-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 700;
  font-size: 1rem;
}
.lb-count {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  opacity: 0.7;
}
.lb-close {
  margin-left: auto;
  background: none;
  border: 1px solid color-mix(in srgb, var(--bg) 35%, transparent);
  color: var(--bg);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  font-size: 0.9rem;
  cursor: pointer;
  line-height: 1;
}
.lb-close:hover { background: color-mix(in srgb, var(--bg) 15%, transparent); }

.lb-stage {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.lb-stage img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
  background: var(--bg);
}

.lb-nav {
  flex-shrink: 0;
  background: color-mix(in srgb, var(--bg) 12%, transparent);
  border: 0;
  color: var(--bg);
  font-size: 2rem;
  line-height: 1;
  width: 44px;
  height: 64px;
  border-radius: 6px;
  cursor: pointer;
}
.lb-nav:hover { background: var(--accent); color: var(--ink); }

.lb-strip {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  flex-shrink: 0;
  max-height: 22vh;
  overflow-y: auto;
}
.lb-thumb {
  width: 64px;
  height: 44px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: none;
  opacity: 0.55;
}
.lb-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.lb-thumb.active,
.lb-thumb:hover { opacity: 1; border-color: var(--accent); }

@media (max-width: 640px) {
  .lb-nav { width: 36px; height: 52px; font-size: 1.5rem; }
  .lb-thumb { width: 48px; height: 34px; }
}

@media (prefers-reduced-motion: reduce) {
  .lb { animation: none; }
}
</style>
