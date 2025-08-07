<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useSessionStore } from './stores/session';
import { apiService } from './services/api';
import { uiService } from './services/ui';

const sessionStore = useSessionStore();

onMounted(() => {
  // Initialize services
  apiService.init();
  uiService.init();
  
  // Connect to event stream if there's an active session
  if (sessionStore.activeSession.id !== '') {
    apiService.connectEventStream();
  }
});
</script>

<template>
  <RouterView />
</template>

<style>
@import './assets/scss/plodo.scss';

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
