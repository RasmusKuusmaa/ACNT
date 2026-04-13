import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashBoardview.vue'
import { supabase } from '@/services/supabase'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/register',
      component: RegisterView
    }
  ]
})

router.beforeEach(async (to) => {
  const { data } = await supabase.auth.getSession()
  const user = data.session?.user

  if (to.meta.requiresAuth && !user) {
    return '/login'
  }

  if ((to.path === '/login' || to.path === '/register') && user) {
    return '/'
  }
})

export default router