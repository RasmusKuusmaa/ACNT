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
        <h2>Ettevotte ja tootaja andmed</h2>

        <div class="row">
            <div class="column">
                <label>Ettevote nimi</label>
                <input type="text" placeholder="Ettevote nimi..." />
            </div>

            <div class="column">
                <label>Ettevote Registrikood</label>
                <input type="text" placeholder="Ettevote reg..." />
            </div>

            <div class="column">
                <label>Töötaja nimi</label>
                <input type="text" placeholder="Töötaja nimi..." />
            </div>

            <div class="column">
                <label>Kilomeetri Hind($)</label>
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

<style>
.card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.column {
    display: flex;
    flex-direction: column;
}

input {
    border-radius: 8px;
    padding: 0.3rem;
}
</style>