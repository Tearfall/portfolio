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
      <h1>Admin Login</h1>
      <input v-model="email" type="email" placeholder="Email" required autocomplete="username" />
      <input v-model="password" type="password" placeholder="Password" required autocomplete="current-password" />
      <button type="submit" :disabled="loading">{{ loading ? 'Signing in…' : 'Sign in' }}</button>
      <p v-if="error" class="error">{{ error }}</p>
      <router-link class="back" to="/">← Back to site</router-link>
    </form>
  </div>
</template>

<style scoped>
.wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f8fafc; }
.box { background: #fff; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); width: 320px; display: flex; flex-direction: column; gap: 0.75rem; }
h1 { margin: 0 0 0.5rem; font-size: 1.3rem; text-align: center; }
input { padding: 0.6rem 0.75rem; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; }
button { padding: 0.6rem; border: none; background: #2563eb; color: #fff; border-radius: 6px; font-weight: 600; cursor: pointer; }
button:disabled { opacity: 0.6; cursor: default; }
.error { color: #dc2626; font-size: 0.85rem; margin: 0; }
.back { text-align: center; font-size: 0.8rem; color: #888; text-decoration: none; margin-top: 0.5rem; }
</style>
