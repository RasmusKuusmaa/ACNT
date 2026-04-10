<script setup lang="ts">
import CompanyForm from './components/CompanyForm.vue';
import DataOverViewtable from './components/DataOverViewtable.vue';
import MilageFrom from './components/MilageForm.vue';
import MonthSelector from './components/MonthSelector.vue';
import { ref } from 'vue';
import type { Ride } from './types/Ride';

const rides = ref<Ride[]>([]);

function addRide(ride: Ride) {
  rides.value.push({
    ...ride,
    id: Date.now()
  })
}
</script>

<template>
  <div class="container">
    <h1>Soidupaeviku rakendus</h1>
    <CompanyForm />
    <MilageFrom @add-ride="addRide"/>
    <MonthSelector :rides="rides"/>
    <DataOverViewtable/>
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