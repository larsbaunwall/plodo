import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ApiService from './common/ApiService'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import "./assets/scss/plodo.scss"

Vue.use(Buefy)

Vue.config.productionTip = false

ApiService.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// eslint-disable-next-line no-console
console.log(`Welcome to plodo ❤\nThis is version ${store.getters.appVersion} of plodo\nHave a look at the source at https://www.github.com/larsbaunwall/plodo`)