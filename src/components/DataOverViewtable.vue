<script setup lang="ts">
import type { Stats } from '../types/Ride'

const props = defineProps<{
    stats: Stats
}>();



</script>

<template>
    <div class="container">

        <div class="card">
            <label>Kuu Kilomeetrid</label>
            <label>{{ stats.monthKm }}</label>
        </div>

        <div class="card">
            <label>Kuu Maksuvaba summa</label>
            <label>{{ stats.monthSum }}</label>
        </div>

        <div class="card">
            <label>Kuu Maksustatav osa (erisoodustus)</label>
            <label>{{ stats.monthTaxable }}</label>
        </div>

        <div class="card">
            <label>Aasta Kilomeetrid</label>
            <label>{{ stats.yearKm }}</label>
        </div>

        <div class="card">
            <label>Aasta Maksuvaba summa</label>
            <label>{{ stats.yearSum }}</label>
        </div>

        <div class="card">
            <label>Aasta Maksustatav osa</label>
            <label>{{ stats.yearTaxable }}</label>
        </div>

        <div class="card">
            <label>Kokku Kilomeetrid</label>
            <label>{{ stats.totalKm }}</label>
        </div>

        <div class="card">
            <label>Kokku Maksuvaba summa</label>
            <label>{{ stats.totalSum }}</label>
        </div>

        <div class="card">
            <label>Kokku Maksustatav osa</label>
            <label>{{ stats.totalTaxable }}</label>
        </div>

    </div>

</template>

<style scoped>
.container {
    margin-top: 1rem;
    display: flex;
    align-items: start;
    gap: 3rem;
    flex-direction: row;
}

.card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    background-color: gray;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}
</style>