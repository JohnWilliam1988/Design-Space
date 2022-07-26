import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
//axios.defaults.baseURL = "http://192.168.1.161:5550";
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
