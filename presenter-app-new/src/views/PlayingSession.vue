<template>
  <div class="layout">
    <div class="tabs">
      <TabMenu />
    </div>
    <div class="content">
      <h1>Playing session</h1>
      <div class="row">
        <SmileyCounter :count="audience" />
        <SessionHealth :connected="connected" />
      </div>
      <div class="row">
        <button @click="toggleCelebrate(true)">Celebrate</button>
        <button @click="toggleCelebrate(false)">Stop</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '../stores/main';
import SmileyCounter from '../components/SmileyCounter.vue';
import SessionHealth from '../components/SessionHealth.vue';
import TabMenu from '../components/TabMenu.vue';
import { showCelebration, hideCelebration } from '../services/window';

const store = useMainStore();
const audience = computed(() => store.audience);
const connected = computed(() => store.stream.connected);

function toggleCelebrate(val: boolean) {
  store.toggleCelebration(val);
  if (val) showCelebration();
  else hideCelebration();
}
</script>
