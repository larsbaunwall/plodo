<template>
  <div class="layout">
    <div class="tabs">
      <TabMenu />
    </div>
    <div class="content">
      <h1>Settings</h1>
      <label>Celebration screen</label>
      <ScreenSelectionDropdown
        :screens="screens"
        :selected="selected"
        @select="onSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import ScreenSelectionDropdown from '../components/ScreenSelectionDropdown.vue';
import TabMenu from '../components/TabMenu.vue';
import { useMainStore } from '../stores/main';
import { fetchMonitors } from '../services/ui';
import { relocateCelebration } from '../services/window';

const store = useMainStore();
const screens = computed(() => store.screens);
const selected = computed(() => store.celebrationScreen);

onMounted(async () => {
  const monitors = await fetchMonitors();
  store.setScreens(monitors);
});

function onSelect(screen: any) {
  store.changeCelebrationScreen(screen);
  relocateCelebration();
}
</script>
