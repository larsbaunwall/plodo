import Vue from "vue";
import Router from "vue-router";
import MainLayout from "../views/MainLayout.vue";
import SetupScreen from "../views/SetupScreen.vue";
import PlayingSession from "../views/PlayingSession.vue";
import CelebrationScreen from "../views/CelebrationScreen.vue";
import SettingsScreen from "../views/SettingsScreen.vue";
import store from "../store";

Vue.use(Router);

export default new Router({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  routes: [
    {
      path: "/",
      redirect: {
        name: "Start"
      }
    },
    {
      path: "/session",
      component: MainLayout,
      children: [{
        path: "",
        name: "Start",
        redirect: to => {
          if(store.getters.activeSession && store.getters.activeSession.id !== "")
            return {name: "PlayingSession"};

          return {name: "Setup"};
        },
      },
      {
        path: "new",
        name: "Setup",
        component: SetupScreen
      },
      {
        path: "active",
        name: "PlayingSession",
        component: PlayingSession
      }]
    },
    {
      path: "/settings",
      component: MainLayout,
      children: [{
        path: "",
        name: "Settings",
        component: SettingsScreen
      }]
    },
    {
      path: "/celebrate",
      name: "CelebrationScreen",
      component: CelebrationScreen
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
