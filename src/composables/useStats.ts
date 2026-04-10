import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Ride, Stats } from '../types/Ride'

const MAX_KM_RATE = 0.5
const MONTHLY_CAP = 550

export function useStats(
    rides: Ref<Ride[]>,
    selectedMonth: Ref<number>,
    selectedYear: Ref<number>
) {
    const stats = computed<Stats>(() => {
        const filtered = rides.value.filter(r => {
            const date = new Date(r.date)
            return (
                date.getMonth() === selectedMonth.value &&
                date.getFullYear() === selectedYear.value
            )
        })

        const monthKm = filtered.reduce((sum, r) => sum + r.km, 0)

        const monthGross = monthKm * MAX_KM_RATE

        const monthTaxFree = Math.min(monthGross, MONTHLY_CAP)
        const monthTaxable = Math.max(0, monthGross - MONTHLY_CAP)

        const yearFiltered = rides.value.filter(r =>
            new Date(r.date).getFullYear() === selectedYear.value
        )

        const yearKm = yearFiltered.reduce((sum, r) => sum + r.km, 0)

        const yearGross = yearKm * MAX_KM_RATE
        const yearTaxFree = yearFiltered.reduce((sum, r) => {
            const monthly = Math.min(sum + r.km * MAX_KM_RATE, MONTHLY_CAP)
            return monthly
        }, 0)

        const totalKm = rides.value.reduce((sum, r) => sum + r.km, 0)
        const totalGross = totalKm * MAX_KM_RATE

        return {
            monthKm,
            monthSum: monthTaxFree,
            monthTaxable,

            yearKm,
            yearSum: yearTaxFree,

            totalKm,
            totalSum: totalGross
        }
    })

    return { stats }
}