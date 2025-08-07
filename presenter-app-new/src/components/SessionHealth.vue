<script setup>
import { computed } from 'vue';
import { useSessionStore } from '../stores/session';

const sessionStore = useSessionStore();

const isConnected = computed(() => {
  return sessionStore.sessionStream.connected;
});

const statusText = computed(() => {
  return isConnected.value ? 'Connected' : 'Disconnected';
});
</script>

<template>
  <div class="session-health">
    <div 
      class="session-health-indicator" 
      :class="{ 'connected': isConnected, 'disconnected': !isConnected }"
    ></div>
    <span>{{ statusText }}</span>
  </div>
</template>

<style scoped>
.session-health {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.session-health-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.session-health-indicator.connected {
  background-color: #23d160;
}

.session-health-indicator.disconnected {
  background-color: #ff3860;
}
</style>