import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import { useSessionStore } from '../stores/session'
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
      { path: '', name: 'Root', component: SetupScreen },
      { path: 'new', name: 'Setup', component: SetupScreen },
      { path: 'active', name: 'PlayingSession', component: PlayingSession },
    ],
  },
  { path: '/settings', name: 'Settings', component: SettingsScreen },
  { path: '/celebrate', name: 'Celebration', component: CelebrationScreen },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const store = useSessionStore()
  const hasActive = !!store.sessionConfig?.id
  if (to.path === '/' || to.name === 'Root') {
    return next({ name: hasActive ? 'PlayingSession' : 'Setup' })
  }
  if (to.name === 'PlayingSession' && !hasActive) {
    return next({ name: 'Setup' })
  }
  next()
})

export default router
