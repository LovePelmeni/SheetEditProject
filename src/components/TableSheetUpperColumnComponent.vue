<template>

<div class="sideColumnsContainer sideDraggable" style="justify-content: center; display: row;">

<div class="columnName columnSection">
    <label>{{ SideColumn.ColumnName }}</label>
</div>

<div :v-for="ColumnDataValue in SideColumn.ColumnDataSequence" class="columnSection">
    <div class="columnDataValue">{{ ColumnDataValue }}</div>
</div>
    
</template>

<script>

export default {
    name: "UpperColumnComponent",
    props: ["SideColumn"],
}
</script>


<style lang="scss">


.columnDataValue {
    // Describes the Style for the Column Data Values
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 4rem;
}

.columnSectionTitle {
    // Column Section Title 
    border-radius: 10px 10px 0 0;
}
.columnSection {
    // Column Section
    background-color: #111;
    display: block;
}
.sideDraggable {
    // Describes the Properties for the Side Draggable Column (CSS Properties)
}
</style>
