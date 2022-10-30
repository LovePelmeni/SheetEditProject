import { createApp } from 'vue/dist/vue.esm-bundler';
import App from './App.vue'

import newRouter from "./router/router.js";
import newStore from "./store/store.js";

createApp(App).use(newRouter).use(newStore).mount('#app')
