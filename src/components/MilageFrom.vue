<template>
  <div class="card">
    <h2>Sõidu lisamine</h2>

    <div class="table">
      <div class="row header">
        <div>Sõidu kuupäev</div>
        <div>Auto number</div>
        <div>Läbisõidumõõdiku algnäit</div>
        <div>Läbisõidumõõdiku lõppnäit</div>
        <div>Kilomeetrid</div>
        <div>Sõidu eesmärk</div>
        <div>Summa</div>
      </div>

      
      <div class="row">
        <input type="date" />
        <input type="text" placeholder="ABC123" />
        <input type="number" placeholder="0" />
        <input type="number" placeholder="0" />
        <input type="number" placeholder="0" />
        <input type="text" placeholder="sõidu eesmärk" />
        <div>100</div>
      </div>
    </div>
    <button>Lisa Sõit</button>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 100%;
}

.table {
  border: 1px solid #ddd;
  padding: 0.5rem;
  overflow-x: auto;
}

.row {
  display: grid;
  grid-template-columns: 140px 120px 180px 180px 120px 200px 100px 50px;
  gap: 0.5rem;
  align-items: center;
  padding: 0.3rem 0;
}

.header {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
}
</style>