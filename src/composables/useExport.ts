import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { Ref } from 'vue'
import type { Ride } from '@/types/Ride'

export function useExport(
  rides: Ref<Ride[]>,
  selectedMonth: Ref<number>,
  selectedYear: Ref<number>
) {
  const getFilteredRides = (): Ride[] => {
    return rides.value.filter((r) => {
      const date = new Date(r.date)
      return (
        date.getMonth() === selectedMonth.value &&
        date.getFullYear() === selectedYear.value
      )
    })
  }

  const fileName = () =>
    `rides_${selectedYear.value}_${selectedMonth.value + 1}`

  function exportCSV() {
    const header = ['ID', 'Date', 'Purpose', 'Distance (km)']

    const rows = getFilteredRides().map((r) => [
      r.id,
      r.date,
      r.purpose,
      r.km,
    ])

    const csv = [header, ...rows]
      .map(row =>
        row
          .map(val => `"${String(val).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${fileName()}.csv`
    link.click()

    URL.revokeObjectURL(url)
  }

  function exportExcel() {
    const data = getFilteredRides().map((r) => ({
      ID: r.id,
      Date: r.date,
      Purpose: r.purpose,
      Distance_km: r.km,
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(wb, ws, 'Rides')
    XLSX.writeFile(wb, `${fileName()}.xlsx`)
  }

  function exportPDF() {
    const doc = new jsPDF()

    doc.setFontSize(14)
    doc.text('Sõidupäeviku aruanne', 14, 15)

    const tableData = getFilteredRides().map((r) => [
      r.id,
      r.date,
      r.purpose,
      r.km,
    ])

    autoTable(doc, {
      head: [['ID', 'Date', 'Purpose', 'Distance (km)']],
      body: tableData,
      startY: 25,
    })

    doc.save(`${fileName()}.pdf`)
  }

  return {
    exportCSV,
    exportExcel,
    exportPDF,
  }
}