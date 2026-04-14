<script setup lang="ts">
import { onMounted, ref } from 'vue'

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
import { getRides, addRide as addRideApi, addRidesBulk } from '@/services/api'

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

async function addRide(ride: Ride) {
    const newRide = await addRideApi(ride)

    rides.value.push(newRide)
}

const { exportCSV, exportExcel, exportPDF } = useExport(
    rides,
    selectedMonth,
    selectedYear,
    kmPrice
)

//remove from PROD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
async function generateTestData() {
    const dummy = generateDummyRides(200)

    await addRidesBulk(dummy)

    rides.value = await getRides()
}

onMounted(async () => {
    rides.value = await getRides()
})

</script>

<template>
    <div class="container">
        <h1>Sõidupäevik</h1>

        <CompanyForm v-model:kmPrice="kmPrice" />

        <MilageFrom @add-ride="addRide" />

        <MonthSelector v-model:selectedMonth="selectedMonth" v-model:selectedYear="selectedYear" :rides="rides"
            :monthly-breakdown="monthlyBreakdown" />

        <DataOverViewtable :stats="stats" />

        <div class="export-buttons">
            <button @click="exportCSV">CSV</button>
            <button @click="exportExcel">Excel</button>
            <button @click="exportPDF">PDF</button>
            <button @click="generateTestData">Test</button>
            <button @click="logout">Logout</button>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 0.75rem;
    justify-content: center;
    gap: 0.6rem;
}
h1 {
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    text-align: center;
}

.export-buttons {
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.export-buttons button {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 6px;
    background: #2d6cdf;
    color: white;
    font-size: 0.8rem;
}

.export-buttons button:hover {
    background: #1f56b3;
}
</style>