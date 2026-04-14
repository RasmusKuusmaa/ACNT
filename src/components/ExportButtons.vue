<script setup lang="ts">
defineProps<{
  onCSV: () => void
  onExcel: () => void
  onPDF: () => void
}>()
</script>

<template>
  <div class="export-buttons">
    <button @click="onCSV">CSV</button>
    <button @click="onExcel">Excel</button>
    <button @click="onPDF">PDF</button>
  </div>
</template>

<style scoped>
.export-buttons {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
  flex: 1;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  background: #2d6cdf;
  color: white;
}

button:hover {
  background: #1f56b3;
}
</style>