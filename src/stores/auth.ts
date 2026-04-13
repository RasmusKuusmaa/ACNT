import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as any,
        role: null as string | null,
        loading: false
    }),

    actions: {
        async login(email: string, password: string) {
            this.loading = true

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            this.loading = false

            if (error) throw error

            this.user = data.user
            return data
        },

        async logout() {
            await supabase.auth.signOut()
            this.user = null
        },

        async fetchUser() {
            const { data: userData } = await supabase.auth.getUser()
            this.user = userData.user

            if (!this.user) return

            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', this.user.id)
                .single()

            this.role = profile?.role
        }
    }
})