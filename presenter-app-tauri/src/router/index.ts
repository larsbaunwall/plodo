import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../views/MainLayout.vue'
import SetupScreen from '../views/SetupScreen.vue'
import PlayingSession from '../views/PlayingSession.vue'
import CelebrationScreen from '../views/CelebrationScreen.vue'
import SettingsScreen from '../views/SettingsScreen.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Setup',
        component: SetupScreen,
      },
      {
        path: '/session',
        name: 'PlayingSession',
        component: PlayingSession,
      },
      {
        path: '/celebration',
        name: 'Celebration',
        component: CelebrationScreen,
      },
      {
        path: '/settings',
        name: 'Settings',
        component: SettingsScreen,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
