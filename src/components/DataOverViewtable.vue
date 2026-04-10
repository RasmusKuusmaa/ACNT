<script setup lang="ts">
import type { Stats } from '../types/Ride'

const props = defineProps<{
    stats: Stats
}>();



</script>

<template>
    <div class="container">


        <div class="card">
            <label>Kuu Soidukilomeetrid</label>
            <label>{{ stats.monthKm }}</label>
        </div>

        <div class="card">
            <label>Kuu Summa</label>
            <label>{{ stats.monthSum }}</label>
        </div>

        <div class="card">
            <label>Aasta Soidukilomeetrid</label>
            <label>{{ stats.yearKm }}</label>
        </div>

        <div class="card">
            <label>Aasta Summa</label>
            <label>{{ stats.yearSum }}</label>
        </div>
        <div class="card">
            <label>
                Kilomeetreid kokku selles paevikus

            </label>
            <label>{{ stats.totalKm }}</label>
        </div>

        <div class="card">
            <label>
                Summa kokku selles paevikus

            </label>
            <label>{{ stats.totalSum }}</label>
        </div>
    </div>

</template>

<style scoped>
.container {
    margin-top: 1rem;
    display: flex;
    align-items: start;
    gap: 3rem;
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