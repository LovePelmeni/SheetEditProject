<template>

<div class="sideColumnContainer">

<div class="columnName columnSectionTitle">
    <label class="columnDataValue">{{ UpperColumn.ColumnName }}</label>
</div>

<div :v-for="ColumnDataValue in UpperColumn.Values" class="columnSection">
    <label class="columnDataValue">{{ ColumnDataValue }}</label>
</div>
    
</div>

</template>

<script>

export default {
    name: "UpperColumnComponent",
    props: ["UpperColumn"],
}

</script>


<style lang='scss'>


.sideColumnContainer {
    // Describes the Column Container 
    background-color: #111;
    display: flex;
}

.columnDataValue {
    // Describes the Style for the Column Data Values
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 4rem;
}

.columnSectionTitle {
    // Column Section Title 
    border-radius: 10px 10px 0px 0px;
}
.columnSection {
    // Column Section
    background-color: #111;
    display: block;
}
</style>
