<template>
    <div class="container">
        <div class="card">
            <label>
                Kilomeetreid kokku selles paevikus

            </label>
            <label>300</label>
        </div>

        <div class="card">
            <label>
                Summa kokku selles paevikus

            </label>
            <label>700</label>
        </div>
    </div>

</template>

<style scoped>
.container {
    margin-top: 1rem;
    display: flex;
    align-items: start;
    gap: 3rem;
}

.card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    background-color: gray;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>