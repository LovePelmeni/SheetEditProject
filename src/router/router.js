import { createRouter, createWebHistory } from "vue-router";
import UploadTableView from "../views/UploadTableView.vue";
import DynamicTableView from "../views/DynamicTableView.vue";

const routes = [
    {
      path: "/",
      name: "upload_table_view",
      component: UploadTableView,
    },
    {
      path: "/edit/table/",
      name: "edit_sheet_table",
      component: DynamicTableView,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
  
export default router;
