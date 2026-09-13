import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'portfolio:color-mode'

function readStored() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : ''
  } catch {
    return '' // storage can throw in private windows — fall through to the OS
  }
}

function systemMode() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// index.html resolves the mode before Vue boots so the first paint is already
// the right one; pick that up rather than deciding a second time.
const mode = ref(document.documentElement.dataset.mode || readStored() || systemMode())

// One shared ref for the whole app: the toggle inside a theme and the palette
// lookup in Home.vue are reading and writing the same value.
watch(
  mode,
  (next) => {
    const root = document.documentElement
    root.dataset.mode = next // themes hang mode-specific tweaks off this
    root.style.colorScheme = next // scrollbars, form controls, autofill
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* not being able to remember the choice shouldn't break the page */
    }
  },
  { immediate: true },
)

const isDark = computed(() => mode.value === 'dark')

export function useColorMode() {
  function toggle() {
    mode.value = isDark.value ? 'light' : 'dark'
  }

  return { mode, isDark, toggle }
}
