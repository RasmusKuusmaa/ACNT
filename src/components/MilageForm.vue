<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Ride } from '../types/Ride'

const emit = defineEmits<{
  (e: 'add-ride', ride: Ride): void
}>()

const form = ref({
  date: '',
  car: '',
  start_km: 0,
  end_km: 0,
  purpose: '',
  route: ''
})

const calculatedKm = computed(() => {
  if (form.value.end_km < form.value.start_km) return 0
  return form.value.end_km - form.value.start_km
})

function submit() {
  emit('add-ride', {
    ...form.value,
    km: calculatedKm.value,
  })

  form.value = {
    date: '',
    car: '',
    start_km: 0,
    end_km: 0,
    purpose: '',
    route: ''
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
        <div>Alg</div>
        <div>Lõpp</div>
        <div>KM</div>
        <div>Eesmärk</div>
        <div>Marsuut</div>
      </div>

      <div class="row">
        <input v-model="form.date" type="date" />
        <input v-model="form.car" />
        <input v-model.number="form.start_km" type="number" />
        <input v-model.number="form.end_km" type="number" />
        <input :value="calculatedKm" disabled />
        <input v-model="form.purpose" />
        <input v-model="form.route" />
      </div>
    </div>

    <button @click="submit">Lisa sõit</button>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 100%;
}

.table {
  overflow-x: auto;
}

.row {
  display: grid;
  grid-template-columns: 120px 100px 100px 100px 80px 140px 140px;
  gap: 0.4rem;
  padding: 0.4rem 0;
  font-size: 0.85rem;
}

.header {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

input {
  width: 100%;
  padding: 0.35rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  margin-top: 0.75rem;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  background: #2d6cdf;
  color: white;
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: repeat(2, 1fr);
  }

  .header {
    display: none;
  }
}
</style>