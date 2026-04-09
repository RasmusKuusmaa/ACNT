<template>
    <div class="card">
        <h2>Ettevotte ja tootaja andmed</h2>

        <div class="row">
            <div class="column">
                <label>Ettevote nimi</label>
                <input type="text" placeholder="Ettevote nimi..."/>
            </div>

              <div class="column">
                <label>Ettevote Registrikood</label>
                <input type="text" placeholder="Ettevote reg..."/>
            </div>
        </div>

       <div class="row">
            <div class="column">
                <label>tootaja nimi</label>
                <input type="text" placeholder="Ettevote nimi..."/>
            </div>

              <div class="column">
                <label>Kilomeetri Hind($)</label>
                <input type="text" placeholder="Ettevote reg..."/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.row {
    display: flex;
    flex-direction: row;
    margin: 1rem;
}

.column {
    display: flex;
    flex-direction: column;
    margin: 0.5rem;
}
</style>