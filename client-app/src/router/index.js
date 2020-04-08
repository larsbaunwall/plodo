import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import Session from "../views/Session.vue";
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/start/:id?',
    name: 'Start',
    component: Start,
    props: true
  },
  {
    path: '/session/:id?',
    name: 'Session',
    component: Session,
    props: true
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Start' && !store.getters.isAuthenticated)
  {
    let dest = { name: 'Start', params: { id: to.params?.id } };
    next(dest)
  }
  else next()
})

export default router
