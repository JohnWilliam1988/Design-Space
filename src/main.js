import Vue from "vue";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import "./style/reset.less";
import "./assets/font/iconfont.css";
import { fabric } from "fabric";
import store from "./store";
import bus from "@/utils/bus";
import router from "@/router";
//import axios from "axios";

Vue.prototype.$bus = bus;
Vue.config.productionTip = false;
Vue.use(Element, { size: "small", zIndex: 3000 });
//Vue.prototype.$axios = axios;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
