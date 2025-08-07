import { createRouter, createWebHashHistory } from 'vue-router';
import MainLayout from '../views/MainLayout.vue';
import SetupScreen from '../views/SetupScreen.vue';
import PlayingSession from '../views/PlayingSession.vue';
import CelebrationScreen from '../views/CelebrationScreen.vue';
import SettingsScreen from '../views/SettingsScreen.vue';
import { useSessionStore } from '../stores/session';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Start'
      }
    },
    {
      path: '/session',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'Start',
          redirect: to => {
            const sessionStore = useSessionStore();
            if (sessionStore.activeSession && sessionStore.activeSession.id !== '') {
              return { name: 'PlayingSession' };
            }
            return { name: 'Setup' };
          },
        },
        {
          path: 'new',
          name: 'Setup',
          component: SetupScreen
        },
        {
          path: 'active',
          name: 'PlayingSession',
          component: PlayingSession
        }
      ]
    },
    {
      path: '/settings',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'Settings',
          component: SettingsScreen
        }
      ]
    },
    {
      path: '/celebrate',
      name: 'CelebrationScreen',
      component: CelebrationScreen
    }
  ]
});

export default router;