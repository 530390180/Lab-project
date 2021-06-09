import { createApp } from "vue";
import store from "@/store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
//process.env.NODE_ENV == "development" && require("@/mock/index.ts");

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
