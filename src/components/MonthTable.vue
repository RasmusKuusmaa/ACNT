<script setup lang="ts">
import type { Ride } from '../types/Ride'

defineProps<{
  rides: Ride[]
}>()
</script>

<template>
  <div class="table">
    <div class="table-inner">
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

      <div class="body">
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

        <div v-if="rides.length === 0" class="empty">
          Pole andmeid
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table {
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
}

.table-inner {
  display: flex;
  flex-direction: column;
  max-height: 60vh;
}

.body {
  overflow-y: auto;
}

.row {
  display: grid;
  grid-template-columns: 50px 120px 100px 100px 100px 80px 140px 120px;
  gap: 0.5rem;
  align-items: center;
  padding: 0.4rem;
  font-size: 0.85rem;
}

.header {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  background: #f7f7f7;
  position: sticky;
  top: 0;
  z-index: 1;
}

.empty {
  padding: 1rem;
  text-align: center;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: 40px 100px 90px 90px 90px 70px 120px 100px;
    font-size: 0.75rem;
  }
}
</style>