<script setup lang="ts">
import { computed } from 'vue'
import MonthTable from './MonthTable.vue'
import type { Ride } from '../types/Ride'

type MonthlyStats = {
  km: number
  sum: number
  count: number
}

const props = defineProps<{
  rides: Ride[]
  selectedMonth: number
  selectedYear: number
  monthlyBreakdown: Map<number, MonthlyStats>
}>()

const emit = defineEmits<{
  (e: 'update:selectedMonth', value: number): void
  (e: 'update:selectedYear', value: number): void
}>()

function selectMonth(i: number) {
  emit('update:selectedMonth', i)
}

const availableYears = computed(() => {
  const currentYear = new Date().getFullYear()

  const years = props.rides
    .map(r => new Date(r.date).getFullYear())
    .filter(y => !isNaN(y))

  const minYear = years.length ? Math.min(...years) : currentYear

  const result: number[] = []
  for (let y = currentYear; y >= minYear; y--) {
    result.push(y)
  }

  return result
})


const monthStats = computed(() => {
  return Array.from({ length: 12 }, (_, i) => {
    return props.monthlyBreakdown.get(i) ?? {
      km: 0,
      sum: 0,
      count: 0
    }
  })
})

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function getColor(sum: number) {
  if (sum >= 550) return 'danger'
  if (sum >= 450) return 'warning'
  return 'ok'
}


const filteredRides = computed(() => {
  return props.rides.filter(r => {
    if (!r.date) return false
    const d = new Date(r.date)

    return (
      d.getMonth() === props.selectedMonth &&
      d.getFullYear() === props.selectedYear
    )
  })
})
</script>

<template>
  <div class="wrapper">

    <select :value="selectedYear"
      @change="emit('update:selectedYear', Number(($event.target as HTMLSelectElement).value))">
      <option v-for="y in availableYears" :key="y" :value="y">
        {{ y }}
      </option>
    </select>

    <div class="months">
      <button v-for="(m, i) in months" :key="i" @click="selectMonth(i)" class="month-btn" :class="[
        getColor(monthStats[i]?.sum ?? 0),
        { active: selectedMonth === i }
      ]">
        <div class="title">{{ m }}</div>

        <div class="meta">
          <span>{{ monthStats[i]?.count ?? 0 }} rides</span>
          <span>{{ monthStats[i]?.km ?? 0 }} km</span>
          <span>{{ (monthStats[i]?.sum ?? 0).toFixed(0) }} €</span>
        </div>
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

select {
  padding: 0.25rem;
  margin-bottom: 0.75rem;
}

.months {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.month-btn {
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  min-width: 100px;
  text-align: left;
  cursor: pointer;
  transition: 0.15s;
}

.month-btn:hover {
  transform: scale(1.02);
}

.month-btn .meta {
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  opacity: 0.85;
}

.month-btn.active {
  outline: 2px solid #222;
}

.month-btn.ok {
  background: #f3f3f3;
}

.month-btn.warning {
  background: #fff4cc;
}

.month-btn.danger {
  background: #ffd6d6;
}
</style>