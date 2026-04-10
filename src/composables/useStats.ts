import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Ride, Stats } from '../types/Ride'

export function useStats(
    rides: Ref<Ride[]>,
    selectedMonth: Ref<number>,
    selectedYear: Ref<number>,
    kmPrice: Ref<number>
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
        const monthSum = filtered.reduce(
            (sum, r) => sum + r.km * kmPrice.value,
            0
        )

        const yearFiltered = rides.value.filter(r =>
            new Date(r.date).getFullYear() === selectedYear.value
        )

        const yearKm = yearFiltered.reduce((sum, r) => sum + r.km, 0)
        const yearSum = yearFiltered.reduce(
            (sum, r) => sum + r.km * kmPrice.value,
            0
        )

        const totalKm = rides.value.reduce((sum, r) => sum + r.km, 0)
        const totalSum = rides.value.reduce(
            (sum, r) => sum + r.km * kmPrice.value,
            0
        )

        return {
            monthKm,
            monthSum,
            yearKm,
            yearSum,
            totalKm,
            totalSum
        }
    })

    return { stats }
}