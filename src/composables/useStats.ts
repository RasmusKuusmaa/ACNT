import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Ride, Stats } from '../types/Ride'

const MAX_KM_RATE = 0.5
const MONTHLY_CAP = 550

function getMonthKey(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}`
}

export function useStats(
    rides: Ref<Ride[]>,
    selectedMonth: Ref<number>,
    selectedYear: Ref<number>,
    kmPrice: Ref<number>
) {
    const stats = computed<Stats>(() => {
        const effectiveRate = Math.min(kmPrice.value, MAX_KM_RATE)

        const monthRides = rides.value.filter(r => {
            const d = new Date(r.date)
            return (
                d.getFullYear() === selectedYear.value &&
                d.getMonth() === selectedMonth.value
            )
        })

        const monthKm = monthRides.reduce((sum, r) => sum + r.km, 0)
        const monthGross = monthKm * effectiveRate

        const monthTaxFree = Math.min(monthGross, MONTHLY_CAP)
        const monthTaxable = Math.max(0, monthGross - MONTHLY_CAP)

        const monthMap = new Map<string, number>()

        for (const r of rides.value) {
            const d = new Date(r.date)
            if (d.getFullYear() !== selectedYear.value) continue

            const key = getMonthKey(d)
            monthMap.set(key, (monthMap.get(key) ?? 0) + r.km)
        }

        let yearTaxFree = 0
        let yearTaxable = 0
        let yearKm = 0

        for (const km of monthMap.values()) {
            const gross = km * effectiveRate

            const taxFree = Math.min(gross, MONTHLY_CAP)
            const taxable = Math.max(0, gross - MONTHLY_CAP)

            yearTaxFree += taxFree
            yearTaxable += taxable
            yearKm += km
        }

        const totalKm = rides.value.reduce((sum, r) => sum + r.km, 0)

        let totalTaxFree = 0
        let totalTaxable = 0

        const allMonths = new Map<string, number>()

        for (const r of rides.value) {
            const d = new Date(r.date)
            const key = getMonthKey(d)
            allMonths.set(key, (allMonths.get(key) ?? 0) + r.km)
        }

        for (const km of allMonths.values()) {
            const gross = km * effectiveRate

            totalTaxFree += Math.min(gross, MONTHLY_CAP)
            totalTaxable += Math.max(0, gross - MONTHLY_CAP)
        }


        return {
            monthKm,
            monthSum: monthTaxFree,
            monthTaxable,

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

            const gross = entry.km * Math.min(kmPrice.value, MAX_KM_RATE)
            entry.sum = Math.min(gross, MONTHLY_CAP)
        }

        return map
    })
    return { stats, monthlyBreakdown }
}