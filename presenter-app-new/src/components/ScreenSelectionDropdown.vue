<template>
  <div class="screen-selection">
    <n-select
      v-model:value="selectedScreenId"
      :options="screenOptions"
      placeholder="Select screen"
      @update:value="onScreenChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { NSelect } from 'naive-ui';
import { useSessionStore } from '../stores/session';

const sessionStore = useSessionStore();

const selectedScreenId = computed({
  get: () => sessionStore.celebrationScreen?.id,
  set: (id: string) => {
    const screen = sessionStore.allScreens.find(s => s.id === id);
    if (screen) {
      sessionStore.setCelebrationScreen(screen);
    }
  }
});

const screenOptions = computed(() => {
  const options = [];
  
  const primaryScreen = sessionStore.allScreens.find(s => s.isPrimary);
  if (primaryScreen) {
    options.push({
      label: `Primary (${primaryScreen.size.width}x${primaryScreen.size.height})`,
      value: primaryScreen.id
    });
  }
  
  const externalScreens = sessionStore.allScreens.filter(s => !s.isPrimary);
  externalScreens.forEach((screen, index) => {
    options.push({
      label: `External ${index + 1}: (${screen.size.width}x${screen.size.height})`,
      value: screen.id
    });
  });
  
  return options;
});

function onScreenChange(screenId: string) {
  const screen = sessionStore.allScreens.find(s => s.id === screenId);
  if (screen) {
    sessionStore.setCelebrationScreen(screen);
  }
}

onMounted(() => {
  // Initialize with mock screen data for now
  // In a real implementation, this would come from Tauri's monitor API
  sessionStore.setAllScreens([
    {
      id: 'primary',
      size: { width: 1920, height: 1080 },
      bounds: { x: 0, y: 0 },
      isPrimary: true
    }
  ]);
});
</script>

<style scoped>
.screen-selection {
  min-width: 200px;
}
</style>
