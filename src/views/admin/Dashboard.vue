<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'
import CollectionEditor from '../../components/CollectionEditor.vue'

const router = useRouter()
const tab = ref('profile')
const profile = ref(null)
const saving = ref(false)
const saved = ref(false)

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

async function logout() {
  await supabase.auth.signOut()
  router.push('/admin')
}

const projectFields = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'tech_stack', label: 'Tech stack', type: 'text' },
  { key: 'image_url', label: 'Image URL', type: 'text' },
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
      <h1>Portfolio Admin</h1>
      <div>
        <router-link to="/" target="_blank">View site</router-link>
        <button class="logout" @click="logout">Log out</button>
      </div>
    </header>

    <nav class="tabs">
      <button :class="{ active: tab === 'profile' }" @click="tab = 'profile'">Profile</button>
      <button :class="{ active: tab === 'projects' }" @click="tab = 'projects'">Projects</button>
      <button :class="{ active: tab === 'experience' }" @click="tab = 'experience'">Experience</button>
      <button :class="{ active: tab === 'education' }" @click="tab = 'education'">Education</button>
      <button :class="{ active: tab === 'skills' }" @click="tab = 'skills'">Skills</button>
    </nav>

    <main>
      <section v-if="tab === 'profile' && profile" class="profile-form">
        <label>Name <input v-model="profile.name" /></label>
        <label>Title <input v-model="profile.title" /></label>
        <label>Bio <textarea v-model="profile.bio" rows="4" /></label>
        <label>Email <input v-model="profile.email" /></label>
        <label>Phone <input v-model="profile.phone" /></label>
        <label>Location <input v-model="profile.location" /></label>
        <label>Avatar URL <input v-model="profile.avatar_url" /></label>
        <label>Resume URL <input v-model="profile.resume_url" /></label>
        <label>GitHub URL <input v-model="profile.github_url" /></label>
        <label>LinkedIn URL <input v-model="profile.linkedin_url" /></label>
        <label>Twitter URL <input v-model="profile.twitter_url" /></label>
        <label>Website URL <input v-model="profile.website_url" /></label>
        <button class="save" :disabled="saving" @click="saveProfile">{{ saving ? 'Saving…' : 'Save profile' }}</button>
        <span v-if="saved" class="saved">Saved!</span>
      </section>

      <CollectionEditor v-if="tab === 'projects'" table="projects" :fields="projectFields" />
      <CollectionEditor v-if="tab === 'experience'" table="experience" :fields="experienceFields" />
      <CollectionEditor v-if="tab === 'education'" table="education" :fields="educationFields" />
      <CollectionEditor v-if="tab === 'skills'" table="skills" :fields="skillFields" />
    </main>
  </div>
</template>

<style scoped>
.dash { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }
.top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.top a { margin-right: 1rem; color: #2563eb; text-decoration: none; font-size: 0.9rem; }
.logout { background: none; border: 1px solid #ddd; padding: 0.35rem 0.8rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
.tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.tabs button { padding: 0.5rem 1rem; border: 1px solid #ddd; background: #fff; border-radius: 999px; cursor: pointer; font-size: 0.9rem; }
.tabs button.active { background: #2563eb; color: #fff; border-color: #2563eb; }
.profile-form { display: flex; flex-direction: column; gap: 0.9rem; max-width: 480px; }
.profile-form label { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.85rem; color: #555; }
.profile-form input, .profile-form textarea { padding: 0.5rem 0.7rem; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; font-family: inherit; }
.save { background: #2563eb; color: #fff; border: none; padding: 0.6rem; border-radius: 6px; font-weight: 600; cursor: pointer; width: fit-content; }
.saved { color: #16a34a; font-size: 0.85rem; margin-left: 0.5rem; }
</style>
