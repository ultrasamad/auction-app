import { createApp } from 'vue'

import App from './App.vue'
import router from "./router";

import DashboardLayout from "./layouts/DashboardLayout.vue";
import SiteLayout from "./layouts/SiteLayout.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";

import './assets/main.css';

const app = createApp(App);

app.component('default-layout', DefaultLayout);
app.component('site-layout', SiteLayout);
app.component('dashboard-layout', DashboardLayout);

app.use(router);
app.mount('#app');
