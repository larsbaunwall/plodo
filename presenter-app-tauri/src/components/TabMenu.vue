<template>
  <div class="tabs is-centered">
    <ul>
      <router-link tag="li" active-class="is-active" :to="{name: 'Setup'}">
        <a>
          <span class="icon is-small">
            <i class="fas fa-bullhorn" aria-hidden="true"></i>
          </span>
          <span>Session</span>
          <span
            v-if="sessionStore.sessionConfig && sessionStore.sessionConfig.id"
            class="tag is-family-monospace session-tag"
          >{{ sessionStore.sessionConfig.id }}</span>
        </a>
      </router-link>
      <router-link tag="li" active-class="is-active" :to="{name: 'Settings'}" exact>
        <a>
          <span class="icon is-small">
            <i class="fas fa-cog" aria-hidden="true"></i>
          </span>
          <span>Settings</span>
        </a>
      </router-link>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '../stores/session'

const sessionStore = useSessionStore()
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
