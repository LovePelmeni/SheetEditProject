import Vuex from "vuex";

export default new Vuex.Store(
    {
        state: {
            CustomTable: {},
        },
        mutations: {
            UPLOAD_TABLE(state, uploadedTable) {
                // Uploading the Table to the Current State, with previously converting it to the JSON blob
                state.CustomTable = uploadedTable
            }
        },
    },
)
