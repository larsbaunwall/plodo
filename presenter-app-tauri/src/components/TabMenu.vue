<template>
  <div class="tabs is-centered">
    <ul>
      <li
        :class="{
          'is-active':
            route.name === 'Setup' || route.name === 'PlayingSession',
        }"
      >
        <router-link :to="{ name: 'Setup' }">
          <span class="icon is-small">
            <i class="fas fa-bullhorn" aria-hidden="true" />
          </span>
          <span>Session</span>
          <span
            v-if="sessionStore.sessionConfig && sessionStore.sessionConfig.id"
            class="tag is-family-monospace session-tag"
            >{{ sessionStore.sessionConfig.id }}</span
          >
        </router-link>
      </li>
      <li :class="{ 'is-active': route.name === 'Settings' }">
        <router-link :to="{ name: 'Settings' }">
          <span class="icon is-small">
            <i class="fas fa-cog" aria-hidden="true" />
          </span>
          <span>Settings</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '../stores/session'
import { useRoute } from 'vue-router'

const sessionStore = useSessionStore()
const route = useRoute()
</script>

<style scoped>
.nav-section {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.session-tag {
  margin-left: 0.5em;
  font-size: 0.7rem;
}

.tabs {
  padding-top: 1rem;
  -webkit-app-region: drag;
}
</style>
