<script setup lang="ts">
import CompanyForm from './components/CompanyForm.vue';
import MilageFrom from './components/MilageFrom.vue';
import MonthSelector from './components/MonthSelector.vue';
import MonthTable from './components/MonthTable.vue';

</script>

<template>
  <div class="container">
    <h1>Soidupaeviku rakendus</h1>
    <CompanyForm />
    <MilageFrom />
    <MonthSelector/>
    <MonthTable/>
  </div>
</template>

<style scoped>
.container {
  margin: auto;
  padding: 1.5rem;
}

h1 {
  margin-bottom: 1.5rem;
}
</style>