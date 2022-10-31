<template>
    
</template>


<script>

export default {
    name: "SideColumnComponent",
    props: ["DataSequence"],
    mounted() {
        this.SetColumnValues()
    },
    methods: {
        SetColumnValues() {
            // Setting the Values to the Column, based on the Sequence of the Data, for these column
        }
    }
}
</script>
