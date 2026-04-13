import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashBoardview.vue'
import { supabase } from '@/services/supabase'
import AccountantView from '@/views/AccountantView.vue'

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
            component: RegisterView,
        },
        {
            path: '/accountant',
            component: AccountantView,
            meta: { requiresAuth: true, role: 'accountant' }

        }
    ]
})

router.beforeEach(async (to) => {
    const { data } = await supabase.auth.getSession()
    const user = data.session?.user

    if (to.meta.requiresAuth && !user) {
        return '/login'
    }

    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        const role = profile?.role

        if (to.meta.role === 'accountant' && role !== 'accountant') {
            return '/'
        }
    }
})

export default router