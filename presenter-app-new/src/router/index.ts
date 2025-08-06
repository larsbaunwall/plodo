import { createRouter, createWebHistory } from 'vue-router';
import { useSessionStore } from '../stores/session';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'Start' }
    },
    {
      path: '/session',
      component: () => import('../views/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'Start',
          redirect: () => {
            const sessionStore = useSessionStore();
            if (sessionStore.isSessionActive) {
              return { name: 'PlayingSession' };
            }
            return { name: 'Setup' };
          }
        },
        {
          path: 'new',
          name: 'Setup',
          component: () => import('../views/SetupScreen.vue')
        },
        {
          path: 'active',
          name: 'PlayingSession',
          component: () => import('../views/PlayingSession.vue')
        }
      ]
    },
    {
      path: '/settings',
      component: () => import('../views/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'Settings',
          component: () => import('../views/SettingsScreen.vue')
        }
      ]
    },
    {
      path: '/celebrate',
      name: 'CelebrationScreen',
      component: () => import('../views/CelebrationScreen.vue')
    }
  ]
});

export default router;
