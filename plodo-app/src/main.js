import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Argon from './plugins/argon-kit'
import '@/assets/scss/plodo.scss'
import BackendApi from "@/api";
import { VBTooltipPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BackendApi, { store });
Vue.use(Argon);
Vue.use(VBTooltipPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
