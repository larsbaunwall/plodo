import Vue from "vue";
import Router from "vue-router";
import MainWindow from "./views/MainWindow.vue";
import SetupScreen from "./views/SetupScreen.vue";
import PlayingSession from "./views/PlayingSession.vue";

Vue.use(Router);

export default new Router({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  routes: [
    {
      path: "/",
      name: "main",
      component: SetupScreen
    },
    {
      path: "/session",
      name: "PlayingSession",
      component: PlayingSession
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});
