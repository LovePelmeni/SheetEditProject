<script>

import { mapState } from "vuex";
import DynamicTableComponent from "../components/DynamicTableComponent.vue";

export default {
    name: "DynamicTableView",
    components: {
        DynamicTableComponent
    },
    template: `
        <div class="dynamicTableComponent"> 
            <dynamic-table-view :UploadedFileTable="CustomTable"></dynamic-table-view>
        </div>
    `,
    computed: {
        ...mapState(["CustomTable"])
    }
}

</script>
