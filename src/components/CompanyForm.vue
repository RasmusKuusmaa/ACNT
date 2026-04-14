<script setup lang="ts">
const props = withDefaults(defineProps<{
  kmPrice: number
}>(), {
  kmPrice: 0.5
})

const emit = defineEmits<{
  (e: 'update:kmPrice', value: number): void
}>()

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  const raw = target.value

  if (raw === '') {
    emit('update:kmPrice', 0)
    return
  }

  const value = Number(raw)

  if (Number.isNaN(value)) return
  if (value < 0) return

  emit('update:kmPrice', Math.min(0.5, value))
}
</script>

<template>
  <div class="card">
    <h2>Ettevõtte ja töötaja andmed</h2>

    <div class="grid">
      <div class="field">
        <label>Ettevõte</label>
        <input type="text" />
      </div>

      <div class="field">
        <label>Registrikood</label>
        <input type="text" />
      </div>

      <div class="field">
        <label>Töötaja</label>
        <input type="text" />
      </div>

      <div class="field">
        <label>KM hind</label>
        <input
          type="number"
          :value="kmPrice"
          min="0"
          max="0.5"
          step="0.01"
          @input="onInput"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.6rem;
}

.field {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
}

input {
  border-radius: 6px;
  padding: 0.4rem;
  border: 1px solid #ccc;
}
</style>