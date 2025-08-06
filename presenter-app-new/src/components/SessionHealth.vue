<template>
  <div>
    <div v-if="sessionStore.sessionStream.connected" class="status-connected">
      <n-tag type="success" size="small">
        Connected
      </n-tag>
      <n-button 
        size="tiny" 
        quaternary 
        @click="reconnect"
        title="Reconnect"
        class="reconnect-btn"
      >
        <template #icon>
          <n-icon :component="RefreshOutline" />
        </template>
      </n-button>
    </div>
    <div v-else class="status-ready">
      <n-tag type="info" size="small">
        Ready
      </n-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTag, NButton, NIcon } from 'naive-ui';
import { RefreshOutline } from '@vicons/ionicons5';
import { useSessionStore } from '../stores/session';
import { apiService } from '../services/ApiService';

const sessionStore = useSessionStore();

function reconnect() {
  if (sessionStore.activeSession.id) {
    apiService.connectEventStream(sessionStore.activeSession.id);
  }
}
</script>

<style scoped>
.status-connected,
.status-ready {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reconnect-btn {
  cursor: pointer;
}
</style>
