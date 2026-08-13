<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'
import { uploadImage } from '../../lib/upload'
import CollectionEditor from '../../components/CollectionEditor.vue'
import { THEMES, themeById } from '../../lib/themes'

const router = useRouter()
const tab = ref('profile')
const profile = ref(null)
const saving = ref(false)
const saved = ref(false)
const uploading = ref(false)

onMounted(async () => {
  const { data } = await supabase.from('profile').select('*').limit(1).maybeSingle()
  profile.value = data
})

async function saveProfile() {
  saving.value = true
  saved.value = false
  const { id, ...payload } = profile.value
  const { error } = await supabase.from('profile').update(payload).eq('id', id)
  saving.value = false
  if (error) { alert(error.message); return }
  saved.value = true
  setTimeout(() => (saved.value = false), 2000)
}

async function onAvatarChange(event) {
  const file = event.target.files[0]
  if (!file) return
  uploading.value = true
  try {
    profile.value.avatar_url = await uploadImage(file, 'profile')
  } catch (e) {
    alert(e.message)
  } finally {
    uploading.value = false
    event.target.value = ''
  }
}

async function logout() {
  await supabase.auth.signOut()
  router.push('/admin')
}

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'theme', label: 'Theme' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
]

const currentThemeMeta = computed(() => themeById(profile.value?.theme))

const colorFields = [
  { key: 'color_bg', label: 'Background' },
  { key: 'color_surface', label: 'Surface' },
  { key: 'color_ink', label: 'Ink (text)' },
  { key: 'color_accent', label: 'Accent' },
  { key: 'color_accent2', label: 'Accent 2' },
]

function pickTheme(id) {
  profile.value.theme = id
}

const projectFields = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'tech_stack', label: 'Tech stack (comma separated)', type: 'text' },
  { key: 'image_url', label: 'Image', type: 'image' },
  { key: 'project_url', label: 'Project URL', type: 'text' },
  { key: 'repo_url', label: 'Repo URL', type: 'text' },
  { key: 'featured', label: 'Featured', type: 'boolean' },
  { key: 'sort_order', label: 'Order', type: 'number' },
]

const experienceFields = [
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'company', label: 'Company', type: 'text' },
  { key: 'start_date', label: 'Start date', type: 'text' },
  { key: 'end_date', label: 'End date', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'sort_order', label: 'Order', type: 'number' },
]

const educationFields = [
  { key: 'school', label: 'School', type: 'text' },
  { key: 'degree', label: 'Degree', type: 'text' },
  { key: 'start_date', label: 'Start date', type: 'text' },
  { key: 'end_date', label: 'End date', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'sort_order', label: 'Order', type: 'number' },
]

const skillFields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'sort_order', label: 'Order', type: 'number' },
]
</script>

<template>
  <div class="dash">
    <header class="top">
      <div>
        <p class="kicker">Admin</p>
        <h1>Portfolio content</h1>
      </div>
      <div class="top-actions">
        <router-link class="view-link" to="/" target="_blank">View site ↗</router-link>
        <button class="logout" @click="logout">Log out</button>
      </div>
    </header>

    <nav class="tabs">
      <button v-for="t in tabs" :key="t.id" :class="{ active: tab === t.id }" @click="tab = t.id">{{ t.label }}</button>
    </nav>

    <main>
      <section v-if="tab === 'profile' && profile" class="profile-form">
        <div class="avatar-row">
          <img v-if="profile.avatar_url" :src="profile.avatar_url" class="avatar-preview" alt="" />
          <div v-else class="avatar-preview placeholder">No photo</div>
          <div class="avatar-controls">
            <input v-model="profile.avatar_url" placeholder="Image URL" />
            <label class="upload-btn">
              {{ uploading ? 'Uploading…' : 'Upload photo' }}
              <input type="file" accept="image/*" hidden @change="onAvatarChange" />
            </label>
          </div>
        </div>
        <label>Name <input v-model="profile.name" /></label>
        <label>Title <input v-model="profile.title" /></label>
        <label>Bio <textarea v-model="profile.bio" rows="4" /></label>
        <label>Email <input v-model="profile.email" /></label>
        <label>Phone <input v-model="profile.phone" /></label>
        <label>Location <input v-model="profile.location" /></label>
        <label>Resume URL <input v-model="profile.resume_url" /></label>
        <label>GitHub URL <input v-model="profile.github_url" /></label>
        <label>LinkedIn URL <input v-model="profile.linkedin_url" /></label>
        <label>Twitter URL <input v-model="profile.twitter_url" /></label>
        <label>Website URL <input v-model="profile.website_url" /></label>
        <button class="save" :disabled="saving" @click="saveProfile">{{ saving ? 'Saving…' : 'Save profile' }}</button>
        <span v-if="saved" class="saved">Saved</span>
      </section>

      <section v-if="tab === 'theme' && profile" class="theme-tab">
        <div class="theme-grid">
          <button
            v-for="t in THEMES"
            :key="t.id"
            class="theme-card"
            :class="{ active: profile.theme === t.id }"
            @click="pickTheme(t.id)"
          >
            <div class="swatch">
              <span :style="{ background: profile.color_ink }"></span>
              <span :style="{ background: profile.color_accent }"></span>
              <span :style="{ background: profile.color_accent2 }"></span>
            </div>
            <strong>{{ t.label }}</strong>
            <p>{{ t.description }}</p>
          </button>
        </div>

        <h3>Color palette</h3>
        <p class="guide">{{ currentThemeMeta.guide }}</p>
        <div class="color-grid">
          <label v-for="f in colorFields" :key="f.key">
            <span>{{ f.label }}</span>
            <div class="color-input">
              <input type="color" v-model="profile[f.key]" />
              <input type="text" v-model="profile[f.key]" />
            </div>
          </label>
        </div>
        <button class="save" :disabled="saving" @click="saveProfile">{{ saving ? 'Saving…' : 'Save theme' }}</button>
        <span v-if="saved" class="saved">Saved</span>
      </section>

      <CollectionEditor v-if="tab === 'projects'" table="projects" :fields="projectFields" />
      <CollectionEditor v-if="tab === 'experience'" table="experience" :fields="experienceFields" />
      <CollectionEditor v-if="tab === 'education'" table="education" :fields="educationFields" />
      <CollectionEditor v-if="tab === 'skills'" table="skills" :fields="skillFields" />
    </main>
  </div>
</template>

<style scoped>
.dash { max-width: 720px; margin: 0 auto; padding: 3rem 1.5rem 5rem; min-height: 100vh; }
.top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
.kicker { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 0.3rem; }
.top h1 { font-size: 1.5rem; font-weight: 700; margin: 0; }
.top-actions { display: flex; align-items: center; gap: 1rem; padding-top: 0.3rem; }
.view-link { color: var(--accent); text-decoration: none; font-size: 0.82rem; }
.logout { background: transparent; border: 1px solid var(--line); border-radius: 8px; padding: 0.4rem 0.85rem; cursor: pointer; font-size: 0.78rem; color: var(--ink); }

.tabs { display: flex; gap: 1.5rem; margin-bottom: 2rem; border-bottom: 1px solid var(--line); }
.tabs button { padding: 0 0 0.75rem; border: none; border-bottom: 2px solid transparent; background: transparent; cursor: pointer; font-size: 0.9rem; color: var(--muted); }
.tabs button.active { color: var(--ink); border-color: var(--accent); font-weight: 700; }

.profile-form { display: flex; flex-direction: column; gap: 1rem; max-width: 460px; }
.avatar-row { display: flex; gap: 1rem; align-items: center; margin-bottom: 0.5rem; }
.avatar-preview { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.avatar-preview.placeholder { display: flex; align-items: center; justify-content: center; font-size: 0.65rem; color: var(--muted); text-align: center; background: var(--panel); border: 1px solid var(--line); }
.avatar-controls { display: flex; flex-direction: column; gap: 0.4rem; flex: 1; }
.avatar-controls input { padding: 0.5rem 0.6rem; border: 1px solid var(--line); border-radius: 8px; font-size: 0.85rem; }
.upload-btn { text-align: center; background: var(--ink); color: var(--bg); padding: 0.45rem; border-radius: 8px; cursor: pointer; font-size: 0.78rem; }

.profile-form label { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.78rem; color: var(--muted); }
.profile-form input, .profile-form textarea { padding: 0.55rem 0.7rem; border: 1px solid var(--line); border-radius: 8px; font-size: 0.95rem; font-family: 'Bricolage Grotesque', sans-serif; background: var(--panel); color: var(--ink); }
.profile-form input:focus, .profile-form textarea:focus { outline: none; border-color: var(--accent); }
.save { background: var(--ink); color: var(--bg); border: none; padding: 0.65rem 1.2rem; border-radius: 8px; font-weight: 700; cursor: pointer; width: fit-content; }
.saved { color: #3b6d11; font-size: 0.85rem; margin-left: 0.5rem; }

.theme-tab { max-width: 640px; }
.theme-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.85rem; margin-bottom: 2rem; }
.theme-card { text-align: left; background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 0.9rem; cursor: pointer; display: flex; flex-direction: column; gap: 0.4rem; }
.theme-card.active { border-color: var(--accent); border-width: 2px; padding: calc(0.9rem - 1px); }
.swatch { display: flex; gap: 0.3rem; }
.swatch span { width: 18px; height: 18px; border-radius: 50%; display: inline-block; }
.theme-card strong { font-size: 0.9rem; }
.theme-card p { margin: 0; font-size: 0.76rem; color: var(--muted); line-height: 1.4; }
.theme-tab h3 { font-size: 1rem; margin: 0 0 0.4rem; }
.guide { font-size: 0.82rem; color: var(--muted); line-height: 1.5; margin: 0 0 1.25rem; max-width: 52ch; }
.color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
.color-grid label { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.78rem; color: var(--muted); }
.color-input { display: flex; gap: 0.5rem; align-items: center; }
.color-input input[type=color] { width: 36px; height: 36px; padding: 0; border: 1px solid var(--line); border-radius: 8px; cursor: pointer; }
.color-input input[type=text] { flex: 1; padding: 0.5rem 0.6rem; border: 1px solid var(--line); border-radius: 8px; font-size: 0.85rem; font-family: 'Space Mono', monospace; }
</style>
