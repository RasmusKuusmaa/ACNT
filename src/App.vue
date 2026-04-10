<script setup lang="ts">
import { ref } from 'vue'

import CompanyForm from './components/CompanyForm.vue'
import DataOverViewtable from './components/DataOverViewtable.vue'
import MilageFrom from './components/MilageForm.vue'
import MonthSelector from './components/MonthSelector.vue'

import { useStats } from './composables/useStats'
import type { Ride } from './types/Ride'

const rides = ref<Ride[]>([])

const selectedMonth = ref(new Date().getMonth())
const selectedYear = ref(new Date().getFullYear())
const kmPrice = ref(0)

const { stats } = useStats(rides, selectedMonth, selectedYear, kmPrice)

function addRide(ride: Ride) {
  rides.value.push({
    ...ride,
    id: Date.now()
  })
}
</script>

<template>
  <div class="container">
    <h1>Soidupaeviku rakendus</h1>

    <CompanyForm v-model:kmPrice="kmPrice" />

    <MilageFrom @add-ride="addRide" />

    <MonthSelector :rides="rides" v-model:selectedMonth="selectedMonth" v-model:selectedYear="selectedYear" />

    <DataOverViewtable :stats="stats" />
  </div>
</template>

<style scoped>
.container {
  margin: auto;
  padding: 1.5rem;
}

h1 {
  margin-bottom: 1.5rem;
}
</style>