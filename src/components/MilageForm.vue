<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Ride } from '../types/Ride'

const emit = defineEmits<{
  (e: 'add-ride', ride: Ride): void
}>()

const form = ref({
  date: '',
  car: '',
  startKm: 0,
  endKm: 0,
  purpose: ''
})

const calculatedKm = computed(() => {
  if (form.value.endKm < form.value.startKm) return 0
  return form.value.endKm - form.value.startKm
})

function submit() {
  emit('add-ride', {
    ...form.value,
    km: calculatedKm.value,
    id: Date.now()
  })

  form.value = {
    date: '',
    car: '',
    startKm: 0,
    endKm: 0,
    purpose: ''
  }
}
</script>

<template>
  <div class="card">
    <h2>Sõidu lisamine</h2>

    <div class="table">
      <div class="row header">
        <div>Sõidu kuupäev</div>
        <div>Auto number</div>
        <div>Läbisõidumõõdiku algnäit</div>
        <div>Läbisõidumõõdiku lõppnäit</div>
        <div>Kilomeetrid</div>
        <div>Sõidu eesmärk</div>
      </div>

      <div class="row">
        <input v-model="form.date" type="date" />
        <input v-model="form.car" />
        <input v-model.number="form.startKm" type="number" />
        <input v-model.number="form.endKm" type="number" />
        <input :value="calculatedKm" disabled />
        <input v-model="form.purpose" />
      </div>
    </div>

    <button @click="submit">Lisa sõit</button>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 100%;
}

.table {
  border: 1px solid #ddd;
  padding: 0.5rem;
  overflow-x: auto;
}

.row {
  display: grid;
  grid-template-columns: 140px 120px 180px 180px 120px 200px;
  gap: 0.5rem;
  align-items: center;
  padding: 0.3rem 0;
}

.header {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
}
</style>