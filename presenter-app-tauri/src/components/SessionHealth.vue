<template>
  <div>
    <div v-if="sessionStream.connected" class="tags has-addons">
      <span
        :class="sessionStream.connected ? 'tag is-success' : 'tag is-danger'"
        >{{ sessionStream.connected ? 'Connected' : 'Connecting...' }}</span
      >
      <span
        class="tag has-background-grey-lighter has-text-primary connectBtn"
        @click="connectEventStream()"
        title="Reconnect"
      >
        <b-icon icon="undo" size="is-small" />
      </span>
    </div>
    <div v-else class="tags has-addons">
      <span class="tag is-success">Ready</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSessionStore } from '../stores/session'

// Use the session store to get connection state
const sessionStore = useSessionStore()

// For now, create a computed property based on session store state
// In the original, this was showing connection status to a websocket/event stream
// Here we'll use session active state as a proxy for "connected"
const sessionStream = computed(() => ({
  connected: sessionStore.isSessionActive,
}))

const connectEventStream = () => {
  // In the original, this was mapped from Vuex store actions
  // Here we would call the session store method or implement reconnection logic
  console.log('Connecting event stream...')
  // sessionStore.connectSessionStream() - would be implemented later
}
</script>

<style scoped>
.connectBtn {
  cursor: pointer;
}
</style>
