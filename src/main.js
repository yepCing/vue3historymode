import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as echarts from "echarts";
import axios from "axios";

const app = createApp(App);
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$axios = axios;

app.use(store).use(router).mount("#app");
// app.config.globalProperties.$echarts = echarts;
