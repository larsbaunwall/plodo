import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ApiService from './common/ApiService'
import "./assets/scss/plodo.scss"

Vue.config.productionTip = false

ApiService.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
