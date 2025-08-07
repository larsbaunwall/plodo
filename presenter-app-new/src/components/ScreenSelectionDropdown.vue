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

onMounted(async () => {
  // TODO: Replace mock data with actual monitor data from Tauri's monitor API
  // See: https://tauri.app/v1/api/js/modules/window/#getallmonitors
  // Example implementation:
  try {
    // const { getAllMonitors } = await import('@tauri-apps/api/window');
    // const monitors = await getAllMonitors();
    // sessionStore.setAllScreens(
    //   monitors.map((monitor, idx) => ({
    //     id: monitor.name || `monitor-${idx}`,
    //     size: { width: monitor.size.width, height: monitor.size.height },
    //     bounds: { x: monitor.position.x, y: monitor.position.y },
    //     isPrimary: monitor.isPrimary
    //   }))
    // );
    
    // Fallback: Mock data for now until Tauri monitor API is implemented
    sessionStore.setAllScreens([
      {
        id: 'primary',
        size: { width: 1920, height: 1080 },
        bounds: { x: 0, y: 0 },
        isPrimary: true
      }
    ]);
  } catch (e) {
    console.error('Failed to fetch monitors:', e);
    // Fallback to mock data
    sessionStore.setAllScreens([
      {
        id: 'primary',
        size: { width: 1920, height: 1080 },
        bounds: { x: 0, y: 0 },
        isPrimary: true
      }
    ]);
  }
});
</script>

<style scoped>
.screen-selection {
  min-width: 200px;
}
</style>
