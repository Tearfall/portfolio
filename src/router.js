import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/admin/Login.vue'
import Dashboard from './views/admin/Dashboard.vue'
import { supabase } from './lib/supabase'

const routes = [
  { path: '/', component: Home },
  { path: '/admin', component: Login },
  { path: '/admin/dashboard', component: Dashboard, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const { data } = await supabase.auth.getSession()
    if (!data.session) return '/admin'
  }
})

export default router
