<script setup lang="ts">
import { ref, computed } from 'vue'
import MonthTable from './MonthTable.vue'
import type { Ride } from '../types/Ride'

const props = defineProps<{
  rides: Ride[]
}>()

const selectedMonth = ref<number>(3)
const selectedYear = ref<number>(2026)

function selectMonth(i: number) {
  selectedMonth.value = i
}

const filteredRides = computed<Ride[]>(() => {
  return props.rides.filter((r) => {
    if (!r.date) return false
    const d = new Date(r.date)

    return (
      d.getMonth() === selectedMonth.value &&
      d.getFullYear() === selectedYear.value
    )
  })
})
</script>

<template>
  <div class="wrapper">

    <select v-model="selectedYear">
      <option :value="2026">2026</option>
      <option :value="2025">2025</option>
    </select>

    <div class="months">
      <button
        v-for="(_, i) in 12"
        :key="i"
        @click="selectMonth(i)"
        :class="{ active: selectedMonth === i }"
      >
        {{ ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i] }}
      </button>
    </div>

    <MonthTable :rides="filteredRides" />

  </div>
</template>


<style scoped>
.wrapper {
    border: 1px solid #ddd;
    padding: 1rem;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.year {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.4rem;
}

select {
    padding: 0.1rem;
}

.months {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.months .active {
    background-color: lightgreen;
}
</style>
