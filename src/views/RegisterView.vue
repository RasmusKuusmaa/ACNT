<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/services/supabase'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const register = async () => {
    const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
    })

    if (error) {
        alert(error.message)
        return
    }

    alert('Check your email for confirmation')
    router.push('/login')
}
</script>

<template>
    <div>
        <h1>Register</h1>

        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />

        <button @click="register">Register</button>
        <button>
            <router-link to="/login">To Login</router-link>
        </button>
    </div>
</template>