import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Ride, Stats } from '../types/Ride'

const MAX_KM_RATE = 0.5
const MONTHLY_CAP = 550

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function calcMonth(km: number, rate: number) {
  const gross = km * rate
  const taxFree = Math.min(gross, MONTHLY_CAP)
  const taxable = Math.max(0, gross - MONTHLY_CAP)
  return { km, gross, taxFree, taxable }
}

export function useStats(
  rides: Ref<Ride[]>,
  selectedMonth: Ref<number>,
  selectedYear: Ref<number>,
  kmPrice: Ref<number>
) {

  const rate = computed(() => Math.min(kmPrice.value, MAX_KM_RATE))

  const stats = computed(() => {

    const monthRides = rides.value.filter(r => {
      const d = new Date(r.date)
      return (
        d.getFullYear() === selectedYear.value &&
        d.getMonth() === selectedMonth.value
      )
    })

    const monthKm = monthRides.reduce((s, r) => s + r.km, 0)
    const month = calcMonth(monthKm, rate.value)

    const monthMap = new Map<string, number>()

    for (const r of rides.value) {
      const d = new Date(r.date)
      if (d.getFullYear() !== selectedYear.value) continue

      const key = getMonthKey(d)
      monthMap.set(key, (monthMap.get(key) ?? 0) + r.km)
    }

    let yearKm = 0
    let yearTaxFree = 0
    let yearTaxable = 0

    for (const km of monthMap.values()) {
      const res = calcMonth(km, rate.value)
      yearKm += km
      yearTaxFree += res.taxFree
      yearTaxable += res.taxable
    }

    const allMonths = new Map<string, number>()

    for (const r of rides.value) {
      const d = new Date(r.date)
      const key = getMonthKey(d)
      allMonths.set(key, (allMonths.get(key) ?? 0) + r.km)
    }

    let totalKm = 0
    let totalTaxFree = 0
    let totalTaxable = 0

    for (const km of allMonths.values()) {
      const res = calcMonth(km, rate.value)
      totalKm += km
      totalTaxFree += res.taxFree
      totalTaxable += res.taxable
    }

    return {
      monthKm,
      monthSum: month.taxFree,
      monthTaxable: month.taxable,

      yearKm,
      yearSum: yearTaxFree,
      yearTaxable,

      totalKm,
      totalSum: totalTaxFree,
      totalTaxable
    }
  })

  const monthlyBreakdown = computed(() => {

    const map = new Map<number, { km: number; sum: number; count: number }>()

    for (const r of rides.value) {
      const d = new Date(r.date)

      if (d.getFullYear() !== selectedYear.value) continue

      const m = d.getMonth()

      if (!map.has(m)) {
        map.set(m, { km: 0, sum: 0, count: 0 })
      }

      const entry = map.get(m)!
      entry.km += r.km
      entry.count += 1

      const gross = entry.km * rate.value
      entry.sum = Math.min(gross, MONTHLY_CAP)
    }

    return map
  })

  return {
    stats,
    monthlyBreakdown
  }
}