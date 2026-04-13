<script setup lang="ts">
import { ref } from 'vue'

import CompanyForm from '../components/CompanyForm.vue'
import DataOverViewtable from '../components/DataOverViewtable.vue'
import MilageFrom from '../components/MilageForm.vue'
import MonthSelector from '../components/MonthSelector.vue'

import { useStats } from '../composables/useStats'
import type { Ride } from '../types/Ride'
import { generateDummyRides } from '../composables/useDummyData'
import { useExport } from '../composables/useExport'
import { useRouter } from 'vue-router'
import { supabase } from '@/services/supabase'

const router = useRouter()

const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
}

const rides = ref<Ride[]>([])

const selectedMonth = ref(new Date().getMonth())
const selectedYear = ref(new Date().getFullYear())
const kmPrice = ref(0.5)

const { stats, monthlyBreakdown } = useStats(rides, selectedMonth, selectedYear, kmPrice)

function addRide(ride: Ride) {
  rides.value.push({
    ...ride,
    id: Date.now()
  })
}

const { exportCSV, exportExcel, exportPDF } = useExport(
  rides,
  selectedMonth,
  selectedYear,
  kmPrice
)

//remove from PROD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function generateTestData() {
  const dummy = generateDummyRides(200)
  rides.value.push(...dummy)
}



</script>

<template>
  <div class="container">
    <h1>Soidupaeviku rakendus</h1>

    <CompanyForm v-model:kmPrice="kmPrice" />

    <MilageFrom @add-ride="addRide" />

    <MonthSelector v-model:selectedMonth="selectedMonth" v-model:selectedYear="selectedYear" :rides="rides"
      :monthly-breakdown="monthlyBreakdown" />
    <DataOverViewtable :stats="stats" />

    <div class="export-buttons">
      <button @click="exportCSV">Export CSV</button>
      <button @click="exportExcel">Export Excel</button>
      <button @click="exportPDF">Export PDF</button>


      <!-- Remove FROM PROD!!!!!-->
      <button @click="generateTestData">
        Generate Dummy Data
      </button>


      <button @click="logout">
        Logout
      </button>

    </div>
  </div>


</template>

<style scoped>
.container {
  margin: auto;
  
}

h1 {
  margin-bottom: 1.5rem;
}

.export-buttons {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.export-buttons button {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #2d6cdf;
  color: white;
}

.export-buttons button:hover {
  background: #1f56b3;
}
</style>