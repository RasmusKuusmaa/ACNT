<script setup lang="ts">
import { ref } from 'vue'

import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import CompanyForm from './components/CompanyForm.vue'
import DataOverViewtable from './components/DataOverViewtable.vue'
import MilageFrom from './components/MilageForm.vue'
import MonthSelector from './components/MonthSelector.vue'

import { useStats } from './composables/useStats'
import type { Ride } from './types/Ride'
import { generateDummyRides } from './composables/useDummyData'

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

const getFilteredRides = () => {
  return rides.value.filter((r: any) => {
    const date = new Date(r.date)
    return (
      date.getMonth() === selectedMonth.value &&
      date.getFullYear() === selectedYear.value
    )
  })
}


function exportCSV() {
  const header = ['ID', 'Date', 'Description', 'Distance (km)']

  const rows = getFilteredRides().map((r: any) => [
    r.id,
    r.date ?? '',
    r.description ?? '',
    r.distance ?? 0,
  ])

  const csv = [header, ...rows]
    .map(row => row.join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `rides_${selectedYear.value}_${selectedMonth.value + 1}.csv`
  link.click()

  URL.revokeObjectURL(url)
}



function exportExcel() {
  const data = getFilteredRides().map((r: any) => ({
    ID: r.id,
    Date: r.date,
    Description: r.description,
    Distance_km: r.distance,
  }))

  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Rides')

  XLSX.writeFile(
    workbook,
    `rides_${selectedYear.value}_${selectedMonth.value + 1}.xlsx`
  )
}

function exportPDF() {
  const doc = new jsPDF()

  doc.setFontSize(14)
  doc.text('Sõidupäeviku aruanne', 14, 15)

  const tableData = getFilteredRides().map((r: any) => [
    r.id,
    r.date ?? '',
    r.description ?? '',
    r.distance ?? 0,
  ])

  autoTable(doc, {
    head: [['ID', 'Date', 'Description', 'Distance (km)']],
    body: tableData,
    startY: 25,
  })

  doc.save(`rides_${selectedYear.value}_${selectedMonth.value + 1}.pdf`)
}

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

    <MonthSelector :rides="rides" v-model:selectedMonth="selectedMonth" v-model:selectedYear="selectedYear" />

    <DataOverViewtable :stats="stats" />

    <div class="export-buttons">
      <button @click="exportCSV">Export CSV</button>
      <button @click="exportExcel">Export Excel</button>
      <button @click="exportPDF">Export PDF</button>
      
      
      <!-- Remove FROM PROD!!!!!-->
      <button @click="generateTestData">
        Generate Dummy Data
      </button>



      
    </div>
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