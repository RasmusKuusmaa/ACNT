<script setup lang="ts">
defineProps<{
  onCSV: () => void
  onExcel: () => void
  onPDF: () => void
}>()
</script>

<template>
  <div class="export-buttons">
    <button @click="onCSV">Export CSV</button>
    <button @click="onExcel">Export Excel</button>
    <button @click="onPDF">Export PDF</button>
  </div>
</template>

<style scoped>
.export-buttons {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #2d6cdf;
  color: white;
}

button:hover {
  background: #1f56b3;
}
</style>