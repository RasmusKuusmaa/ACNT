<script setup lang="ts">
import MonthTable from './MonthTable.vue';

</script>

<template>
    <div class="wrapper">
        <div class="year">
            <label>Year</label>
            <select>
                <option>2026</option>
                <option>2025</option>
                <option>2024</option>

            </select>
        </div>

        <div class="months">
            <button>Jan</button>
            <button>Feb</button>
            <button>Mar</button>
            <button class="active">Apr</button>
            <button>May</button>
            <button>Jun</button>
            <button>Jul</button>
            <button>Aug</button>
            <button>Sep</button>
            <button>Oct</button>
            <button>Nov</button>
            <button>Dec</button>
        </div>

        <div class="content">
            <MonthTable />

        </div>
    </div>
</template>


<style scoped>
.wrapper {
    border: 1px solid #ddd;
    padding: 1rem;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.year {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.4rem;
}

select {
    padding: 0.1rem;
}

.months {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.months .active {
    background-color: lightgreen;
}
</style>
