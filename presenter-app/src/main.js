import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import router from "./router";
import store from "./store";
import Trend from "vuetrend";
import TrendChart from "vue-trend-chart";
import ApiService from "./common/ApiService";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// internal icons
import {
  faPlay,
  faCog,
  faBullhorn,
  faAngleUp,
  faAngleDown,
  faQuestion,
  faUndo,
  faCopy,
  faSignOutAlt,
  faTv,
  faAsterisk,
  faInfoCircle,
  faSpinner,
  faExternalLinkAlt,

} from "@fortawesome/free-solid-svg-icons";

import {
  faHeart,
} from "@fortawesome/free-regular-svg-icons";

library.add(
  faPlay,
  faCog,
  faBullhorn,
  faAngleUp,
  faAngleDown,
  faQuestion,
  faUndo,
  faCopy,
  faSignOutAlt,
  faTv,
  faAsterisk,
  faInfoCircle,
  faSpinner,
  faExternalLinkAlt,
  faHeart
);

import "@/assets/scss/plodo.scss";

Vue.config.productionTip = false;

Vue.component("vue-fontawesome", FontAwesomeIcon);

Vue.use(TrendChart);
Vue.use(Trend);
Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
