<script setup lang="ts">
import { ref } from 'vue'

const users = ref([
  { id: 1, name: 'John Doe', role: 'employee' },
  { id: 2, name: 'Jane Smith', role: 'employee' },
  { id: 3, name: 'Mark Accountant', role: 'accountant' }
])
</script>

<template>
  <div>
    <h1>Accountant Dashboard</h1>

    <p>Hardcoded user list:</p>

    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.role }}
      </li>
    </ul>
  </div>
</template>