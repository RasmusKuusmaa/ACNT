<template>
    <div class="table">
        <div class="row header">
            <label>Rida</label>
            <div>Sõidu kuupäev</div>
            <div>Auto number</div>
            <div>Läbisõidumõõdiku algnäit</div>
            <div>Läbisõidumõõdiku lõppnäit</div>
            <div>Kilomeetrid</div>
            <div>Sõidu eesmärk</div>
            <div>Summa</div>
        </div>


        <div class="row">
            <label>1</label>
            <input type="date" />
            <input type="text" placeholder="ABC123" />
            <input type="number" placeholder="0" />
            <input type="number" placeholder="0" />
            <input type="number" placeholder="0" />
            <input type="text" placeholder="sõidu eesmärk" />
            <div>100</div>
        </div>

        <div class="row">
            <label>2</label>
            <input type="date" />
            <input type="text" placeholder="ABC123" />
            <input type="number" placeholder="0" />
            <input type="number" placeholder="0" />
            <input type="number" placeholder="0" />
            <input type="text" placeholder="sõidu eesmärk" />
            <div>100</div>
        </div>

        <div class="totals">
            <div class="total-card">
                <label>Kuu Soidukilomeetrid</label>
                <label>500</label>
            </div>

            <div class="total-card">
                <label>Kuu Summa</label>
                <label>200</label>
            </div>

            <div class="total-card">
                <label>Aasta Soidukilomeetrid</label>
                <label>2300</label>
            </div>

            <div class="total-card">
                <label>Aasta Summa</label>
                <label>2200</label>
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
    width: 100%;
}

.table {
    border: 1px solid #ddd;
    padding: 0.5rem;
    overflow-x: auto;
}

.row {
    display: grid;
    grid-template-columns: 50px 140px 120px 180px 180px 120px 200px 100px;
    gap: 0.5rem;
    align-items: center;
    padding: 0.3rem 0;
}

.header {
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;
}

.totals {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
}

.total-card {
    border: 1px solid #ddd;
    padding: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
    border-radius: 8px;
    background-color: gray;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>