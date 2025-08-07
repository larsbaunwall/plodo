import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import SetupScreen from '../views/SetupScreen.vue';
import PlayingSession from '../views/PlayingSession.vue';
import SettingsScreen from '../views/SettingsScreen.vue';
import CelebrationScreen from '../views/CelebrationScreen.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: SetupScreen },
  { path: '/play', component: PlayingSession },
  { path: '/settings', component: SettingsScreen },
  { path: '/celebrate', component: CelebrationScreen }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
