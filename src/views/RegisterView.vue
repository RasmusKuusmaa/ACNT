<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/services/supabase'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const role = ref<'employee' | 'accountant'>('employee')
const loading = ref(false)

const router = useRouter()

const register = async () => {
    if (loading.value) return

    loading.value = true

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value
        })

        if (error) throw error

        const user = data.user
        if (!user) return

        await supabase.from('profiles').upsert({
            id: user.id,
            role: role.value
        })

        alert('Registered successfully')
        router.push('/login')

    } catch (err: any) {
        alert(err.message)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div>
        <h1>Register</h1>

        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />

        <select v-model="role">
            <option value="employee">Employee</option>
            <option value="accountant">Accountant</option>
        </select>

        <button @click="register" :disabled="loading">
            {{ loading ? 'Creating...' : 'Create account' }}
        </button>

        <button>

            <router-link to="/login">To Login</router-link>
        </button>
    </div>
</template>