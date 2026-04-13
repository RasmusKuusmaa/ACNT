<script setup lang="ts">
import { ref, computed } from 'vue'
import MonthTable from './MonthTable.vue'
import type { Ride } from '../types/Ride'

const props = defineProps<{
    rides: Ride[]
}>()

const selectedMonth = ref<number>(3)
const selectedYear = ref<number>(2026)

function selectMonth(i: number) {
    selectedMonth.value = i
}

const filteredRides = computed<Ride[]>(() => {
    return props.rides.filter((r) => {
        if (!r.date) return false
        const d = new Date(r.date)

        return (
            d.getMonth() === selectedMonth.value &&
            d.getFullYear() === selectedYear.value
        )
    })
})
</script>
<template>
    <div class="table">

        <div class="row header">
            <div>#</div>
            <div>Kuupäev</div>
            <div>Auto</div>
            <div>Alg</div>
            <div>Lõpp</div>
            <div>KM</div>
            <div>Eesmärk</div>
            <div>Marsuut</div>
        </div>

        <div class="row" v-for="(r, i) in rides" :key="r.id">
            <div>{{ i + 1 }}</div>
            <div>{{ r.date }}</div>
            <div>{{ r.car }}</div>
            <div>{{ r.start_km }}</div>
            <div>{{ r.end_km }}</div>
            <div>{{ r.km }}</div>
            <div>{{ r.purpose }}</div>
            <div>{{ r.route }}</div>
        </div>

        <div v-if="rides.length === 0">
            Pole andmeid
        </div>

    </div>
</template>

<style scoped>
.card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    width: 100%;
}

.table {
    border: 1px solid #ddd;
    padding: 0.5rem;
    overflow-x: auto;
}

.row {
    display: grid;
    grid-template-columns: 50px 140px 120px 180px 180px 120px 200px 100px;
    gap: 0.5rem;
    align-items: center;
    padding: 0.3rem 0;
}

.header {
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;
}

.totals {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
}

.total-card {
    border: 1px solid #ddd;
    padding: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
    border-radius: 8px;
    background-color: gray;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>