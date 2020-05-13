import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import Session from "../views/Session.vue";
import Privacy from "../views/PrivacyPolicy.vue";
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: {name: "Start"}
  },
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
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
    props: true
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
    if (to.name === 'Session' && !store.getters.isAuthenticated)
    {
      let dest = { name: 'Start', params: { id: to.params?.id } };
      next(dest)
    }
    else next()
})

export default router
