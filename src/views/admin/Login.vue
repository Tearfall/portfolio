<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  if (data.session) router.push('/admin/dashboard')
})

async function login() {
  error.value = ''
  loading.value = true
  const { error: err } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  loading.value = false
  if (err) { error.value = err.message; return }
  router.push('/admin/dashboard')
}
</script>

<template>
  <div class="wrap">
    <form class="box" @submit.prevent="login">
      <p class="kicker">Admin</p>
      <h1>Sign in</h1>
      <input v-model="email" type="email" placeholder="Email" required autocomplete="username" />
      <input v-model="password" type="password" placeholder="Password" required autocomplete="current-password" />
      <button type="submit" :disabled="loading">{{ loading ? 'Signing in…' : 'Sign in' }}</button>
      <p v-if="error" class="error">{{ error }}</p>
      <router-link class="back" to="/">← Back to site</router-link>
    </form>
  </div>
</template>

<style scoped>
.wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg); }
.box { background: var(--panel); padding: 2.5rem; border-radius: 12px; border: 1px solid var(--line); width: 300px; display: flex; flex-direction: column; gap: 0.85rem; text-align: center; }
.kicker { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em; margin: 0; }
h1 { margin: 0.2rem 0 0.75rem; font-size: 1.35rem; font-weight: 700; }
input { padding: 0.6rem 0.75rem; border: 1px solid var(--line); border-radius: 8px; font-size: 0.95rem; font-family: 'Bricolage Grotesque', sans-serif; text-align: left; }
input:focus { outline: none; border-color: var(--accent); }
button { padding: 0.65rem; border: none; background: var(--ink); color: var(--bg); border-radius: 8px; font-weight: 700; cursor: pointer; }
button:disabled { opacity: 0.6; cursor: default; }
.error { color: #b3401f; font-size: 0.82rem; margin: 0; }
.back { text-align: center; font-size: 0.78rem; color: var(--muted); text-decoration: none; margin-top: 0.4rem; }
</style>
