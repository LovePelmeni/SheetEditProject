<template>

    <div class="sideColumnContainer">

        <!-- Upper Column Outside the Container -->

        <div class="ColumnSectionTitle">
           <label class="ColumnSectionTitle"> {{ SideColumn.ColumnName }} </label>
        </div>

        <!-- Upper Column Values blocks -->

        <div style="display: block;" class="ColumnValue" v-for="(ColumnValue, index) in SideColumn.Values" :key="index">
            <label class="ColumnSectionTitle">{{ ColumnValue }}</label>
        </div>
        
    </div>
</template>

<script>

export default {
    name: "SideColumnComponent",
    props: ["SideColumn"],
}

</script>


<style lang="scss">

.sideColumnContainer {
    background-color: #111;
    display: flex;
}

.ColumnSectionTitle {
    // Column Title Block Properties for the Column
    background-color: #111;
    border-radius: 10px 10px 0px 0;
}
.ColumnValue {
    // Column Value Block Properties for the Column
    background-color: #111;
}

</style>