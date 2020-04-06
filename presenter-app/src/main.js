import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Argon from "./plugins/argon-kit";
import Sparkline from "vue-sparklines";
import "@/assets/scss/plodo.scss";
import { VBTooltipPlugin } from "bootstrap-vue";
import ApiService from "./common/ApiService";

Vue.config.productionTip = false;

Vue.use(Argon);
Vue.use(VBTooltipPlugin);
Vue.use(Sparkline);

ApiService.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
