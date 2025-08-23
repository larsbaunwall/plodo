<template>
  <div id="app" class="is-clipped">
    <section class="main-section section is-fullheight">
      <router-view />
    </section>
    <footer class="footer has-background-white-ter">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <span class="has-text-weight-bold has-text-primary">Plodo</span>
          </div>
        </div>
        <div class="level-right" v-if="sessionStore.isSessionActive">
          <div class="level-item">
            <session-health :health="sessionStore.sessionHealth" />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '../stores/session'
import SessionHealth from '../components/SessionHealth.vue'

const sessionStore = useSessionStore()
</script>

<style scoped>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-section {
  flex: 1;
  overflow-y: auto;
}

.footer {
  margin-top: auto;
  padding: 0.5rem 1rem;
}
</style>
