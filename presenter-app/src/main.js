import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Trend from "vuetrend";
import ApiService from "./common/ApiService";

import "@/assets/scss/plodo2.scss";

Vue.config.productionTip = false;

Vue.use(Trend);

ApiService.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
