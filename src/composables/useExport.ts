import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { Ref } from 'vue'
import type { Ride } from '@/types/Ride'

export function useExport(
  rides: Ref<Ride[]>,
  selectedMonth: Ref<number>,
  selectedYear: Ref<number>,
  kmPrice: Ref<number>
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
  type ExcelRow = {
    ID: number | string
    Kuupäev: string | ''
    Auto: string | ''
    Marsruut: string | ''
    Eesmärk: string
    Kilomeetrid: number | ''
    'Hüvitis (€)': number | ''
  }
  const fileName = () =>
    `soidud_${selectedYear.value}_${selectedMonth.value + 1}`

  const getCompensation = (km: number) => km * kmPrice.value

  const getTotalKm = (data: Ride[]) =>
    data.reduce((sum, r) => sum + r.km, 0)

  const getTotalComp = (data: Ride[]) =>
    data.reduce((sum, r) => sum + getCompensation(r.km), 0)

  const isLimitExceeded = (total: number) => total > 550

  function exportCSV() {
    const data = getFilteredRides()
    const totalKm = getTotalKm(data)
    const totalComp = getTotalComp(data)

    const header = [
      'ID',
      'Kuupäev',
      'Auto',
      'Marsruut',
      'Eesmärk',
      'Kilomeetrid',
      'Hüvitis (€)',
    ]

    const rows = data.map((r) => [
      r.id,
      r.date,
      r.car,
      r.route,
      r.purpose,
      r.km,
      getCompensation(r.km),
    ])

    rows.push(['', '', '', '', 'KOKKU', totalKm, totalComp])

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
    const data = getFilteredRides()
    const totalKm = getTotalKm(data)
    const totalComp = getTotalComp(data)

    const rows: ExcelRow[] = data.map((r) => ({
      ID: r.id,
      Kuupäev: r.date,
      Auto: r.car,
      Marsruut: r.route,
      Eesmärk: r.purpose,
      Kilomeetrid: r.km,
      'Hüvitis (€)': getCompensation(r.km),
    }))

    rows.push({
      ID: '',
      Kuupäev: '',
      Auto: '',
      Marsruut: '',
      Eesmärk: 'KOKKU',
      Kilomeetrid: totalKm,
      'Hüvitis (€)': totalComp,
    })

    const ws = XLSX.utils.json_to_sheet(rows)

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sõidud')
    XLSX.writeFile(wb, `${fileName()}.xlsx`)
  }

  function exportPDF() {
    const data = getFilteredRides()
    const totalKm = getTotalKm(data)
    const totalComp = getTotalComp(data)
    const limitExceeded = isLimitExceeded(totalComp)

    const doc = new jsPDF()

    doc.setFontSize(14)
    doc.text('Sõidupäeviku aruanne', 14, 15)

    const tableData = data.map((r) => [
      r.id,
      r.date,
      r.car,
      r.route,
      r.purpose,
      r.km,
      getCompensation(r.km).toFixed(2),
    ])

    tableData.push([
      '',
      '',
      '',
      '',
      'KOKKU',
      totalKm,
      totalComp.toFixed(2),
    ])

    autoTable(doc, {
      head: [
        [
          'ID',
          'Kuupäev',
          'Auto',
          'Marsruut',
          'Eesmärk',
          'KM',
          'Hüvitis (€)',
        ],
      ],
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