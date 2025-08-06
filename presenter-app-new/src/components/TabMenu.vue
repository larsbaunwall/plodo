<template>
  <nav class="tab-menu">
    <n-tabs type="line" animated>
      <n-tab-pane name="session" tab="Session">
        <template #tab>
          <n-icon :component="MegaphoneOutline" />
          <span>Session</span>
          <n-tag v-if="sessionStore.activeSession.id" size="small" type="info" class="session-tag">
            {{ sessionStore.activeSession.id }}
          </n-tag>
        </template>
      </n-tab-pane>
      <n-tab-pane name="settings" tab="Settings">
        <template #tab>
          <n-icon :component="SettingsOutline" />
          <span>Settings</span>
        </template>
      </n-tab-pane>
    </n-tabs>
  </nav>
</template>

<script setup lang="ts">
import { NTabs, NTabPane, NIcon, NTag } from 'naive-ui';
import { MegaphoneOutline, SettingsOutline } from '@vicons/ionicons5';
import { useSessionStore } from '../stores/session';

const sessionStore = useSessionStore();
</script>

<style scoped>
.tab-menu {
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
}

.session-tag {
  margin-left: 0.5rem;
  font-family: monospace;
  font-size: 0.7rem;
}
</style>
